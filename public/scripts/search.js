// Suggestions for the search field in the navbar. Without this script the
// field still works: it sends the visitor to the page with all results.
(function () {
  var search = document.getElementById("search");
  if (!search || !window.fetch) return;
  var input = search.querySelector("input[type='search']");
  var panel = search.querySelector(".panel");
  var timer, request = 0;

  var escapeHtml = function (text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };

  // Wraps the words that were searched for in <mark>
  var marked = function (text, words) {
    var html = escapeHtml(text);
    if (!words.length) return html;
    var pattern = words.map(function (word) {
      return escapeHtml(word).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    });
    return html.replace(new RegExp("(" + pattern.join("|") + ")", "gi"), "<mark>$1</mark>");
  };

  var close = function () {
    search.classList.remove("open");
    input.setAttribute("aria-expanded", "false");
    panel.innerHTML = "";
  };

  var show = function (found) {
    var all = "/search?q=" + encodeURIComponent(found.query);
    var items = found.results.map(function (result) {
      return (
        '<li><a href="' + escapeHtml(result.url) + '">' +
        '<svg class="icon"><use xlink:href="/images/icons.svg#' + escapeHtml(result.icon) + '"></use></svg>' +
        marked(result.title, found.words) +
        (result.page ? " <small>" + escapeHtml(result.page) + "</small>" : "") +
        "</a></li>"
      );
    });
    if (!found.total) {
      items.push('<li class="disabled"><a>Nothing found for “' + escapeHtml(found.query) + "”</a></li>");
    } else if (found.total > found.results.length) {
      items.push('<li class="seperator"></li>');
      items.push('<li><a href="' + all + '">All ' + found.total + " results</a></li>");
    }
    panel.innerHTML = "<ul>" + items.join("") + "</ul>";
    search.classList.add("open");
    input.setAttribute("aria-expanded", "true");
  };

  var suggest = function () {
    var query = input.value.trim();
    if (query.length < 2) return close();
    var current = ++request;
    fetch("/search.json?q=" + encodeURIComponent(query))
      .then(function (response) { return response.json(); })
      .then(function (found) {
        // Only the answer to the latest question counts
        if (current === request && input.value.trim().length >= 2) show(found);
      })
      .catch(function () {});
  };

  input.setAttribute("aria-expanded", "false");
  input.addEventListener("input", function () {
    clearTimeout(timer);
    timer = setTimeout(suggest, 120);
  });

  // Arrow keys walk through the suggestions, Escape closes the field
  search.addEventListener("keydown", function (event) {
    var links = Array.prototype.slice.call(panel.querySelectorAll("a[href]"));
    var at = links.indexOf(document.activeElement);
    if (event.key === "ArrowDown" && links.length) {
      event.preventDefault();
      links[Math.min(at + 1, links.length - 1)].focus();
    } else if (event.key === "ArrowUp" && at !== -1) {
      event.preventDefault();
      (at === 0 ? input : links[at - 1]).focus();
    } else if (event.key === "Escape") {
      input.value = "";
      close();
      document.activeElement.blur();
    }
  });

  // Typing "/" anywhere on the page opens the search field
  document.addEventListener("keydown", function (event) {
    if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey) return;
    var target = event.target;
    if (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
    event.preventDefault();
    input.focus();
  });
})();
