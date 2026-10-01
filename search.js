// Search for the documentation. The index is built from the documentation
// pages themselves: every page and every section of a page is an entry, with
// its title and the text that explains it. The demonstrations and code blocks
// on those pages are left out, so their sample content doesn't turn up in the
// results. The pages under Examples are added with their descriptions.
import fs from "node:fs";
import path from "node:path";
import ejs from "ejs";
import nav from "./navigation.js";

const views = path.join(import.meta.dirname, "views");
const documentation = nav.find((lane) => lane.slug === "documentation");

// Elements whose content isn't indexed.
const skippedTags = new Set(["script", "style", "pre", "svg"]);
const skippedClasses = /\b(section-example|code-example)\b/;
const voidTags = new Set(["br", "hr", "img", "input", "meta", "link", "source", "wbr"]);

const entities = { lt: "<", gt: ">", amp: "&", quot: '"', apos: "'", nbsp: " ", euro: "€", dollar: "$", pound: "£" };
const decode = (text) =>
  text.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (_, name) => {
    if (name[0] !== "#") return entities[name.toLowerCase()] ?? " ";
    const code = name[1].toLowerCase() === "x" ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
    return String.fromCodePoint(code);
  });
const tidy = (text) =>
  decode(text)
    .replace(/\s+/g, " ")
    .replace(/ ([.,;:!?)])/g, "$1") // tags leave a space in front of punctuation
    .trim();

// Splits the HTML of a page into its sections: [{ id, title, text }]. The
// text outside any section comes first, with an empty id.
const sectionsOf = (html) => {
  const sections = [{ id: "", title: "", text: "" }];
  let current = sections[0];
  let skip = null; // { tag, depth } while inside an element that is left out
  let heading = null; // collects the text of the <h2> of a section
  let last = 0;
  const tags = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][\w-]*)([^>]*)>/g;

  const add = (text) => {
    if (skip) return;
    if (heading !== null) heading += text;
    else current.text += text;
  };

  for (let m; (m = tags.exec(html)); ) {
    add(html.slice(last, m.index));
    last = tags.lastIndex;
    if (!m[2]) continue; // a comment
    const [, closing, name, attributes] = m;
    const tag = name.toLowerCase();
    const selfClosing = voidTags.has(tag) || attributes.endsWith("/");

    if (skip) {
      if (tag === skip.tag && !selfClosing) skip.depth += closing ? -1 : 1;
      if (skip.depth === 0) skip = null;
      continue;
    }
    if (!closing && !selfClosing && (skippedTags.has(tag) || skippedClasses.test(attributes))) {
      skip = { tag, depth: 1 };
      continue;
    }

    if (tag === "section" && !closing) {
      const id = /\bid="([^"]*)"/.exec(attributes)?.[1] ?? "";
      // The introduction belongs to the page as a whole
      current = id && id !== "introduction" ? { id, title: "", text: "" } : sections[0];
      if (current !== sections[0]) sections.push(current);
    } else if (tag === "section") {
      current = sections[0];
    } else if (tag === "h1" || (tag === "h2" && !current.title && current !== sections[0])) {
      // The <h1> repeats the page title; the first <h2> names the section
      if (!closing) heading = "";
      else {
        if (tag === "h2") current.title = tidy(heading);
        heading = null;
      }
    } else {
      add(" "); // tags separate words
    }
  }
  add(html.slice(last));
  return sections.map((section) => ({ ...section, text: tidy(section.text) }));
};

const buildIndex = () => {
  const entries = [];
  for (const group of documentation.nav) {
    for (const page of group.nav) {
      const file = path.join(views, "documentation", group.slug, page.slug + ".ejs");
      if (!fs.existsSync(file)) continue;
      const params = { s1: group.slug, s2: page.slug };
      const html = ejs.render(fs.readFileSync(file, "utf8"), { nav, lane: "documentation", params }, { filename: file });
      const url = `/documentation/${group.slug}/${page.slug}`;
      const shared = { page: page.title.trim(), group: group.title, color: group.color, icon: page.icon };
      const [intro, ...sections] = sectionsOf(html);

      entries.push({
        ...shared,
        title: page.title.trim(),
        url,
        text: tidy(page.description.replace(/<[^>]+>/g, "") + " " + intro.text),
        isPage: true,
      });
      for (const section of sections) {
        const title = section.title || page.nav?.find((item) => item.slug === section.id)?.title;
        if (!title) continue;
        entries.push({ ...shared, title, url: `${url}/#${section.id}`, text: section.text, isPage: false });
      }
    }
  }
  // The examples: found by their name and by what they show
  const examples = nav.find((lane) => lane.slug === "examples");
  for (const example of examples.nav) {
    entries.push({
      title: example.title,
      page: "",
      group: "Examples",
      color: "blue",
      icon: example.icon,
      url: `/examples/${example.slug}`,
      text: example.description,
      isPage: true,
    });
  }

  // Lowercase copies to search in
  for (const entry of entries) {
    entry.lowerTitle = entry.title.toLowerCase();
    entry.lowerPage = entry.page.toLowerCase();
    entry.lowerText = entry.text.toLowerCase();
  }
  return entries;
};

let index;
const getIndex = () => (index ??= buildIndex());

// How well a word matches a text: as a whole word, as the start of a word,
// or anywhere inside one.
const matchOf = (text, word) => {
  let best = 0;
  for (let at = text.indexOf(word); at !== -1 && best < 3; at = text.indexOf(word, at + 1)) {
    const starts = at === 0 || !/[\p{L}\p{N}]/u.test(text[at - 1]);
    const end = at + word.length;
    const ends = end === text.length || !/[\p{L}\p{N}]/u.test(text[end]);
    best = Math.max(best, starts && ends ? 3 : starts ? 2 : 1);
  }
  return best;
};

const scoreOf = (entry, words, phrase) => {
  let score = 0;
  for (const word of words) {
    // In the text a word has to match from its start: "zo" finds "zone", but
    // not "horizontal". A title is short enough to allow a match inside a word.
    const inTitle = matchOf(entry.lowerTitle, word);
    const inPage = entry.isPage ? 0 : matchOf(entry.lowerPage, word);
    const inText = Math.max(matchOf(entry.lowerText, word) - 1, 0);
    // Every word has to be found somewhere
    if (!inTitle && !inPage && !inText) return 0;
    score += inTitle * 10 + inPage * 3 + inText;
  }
  if (entry.lowerTitle === phrase) score += 30;
  else if (entry.lowerTitle.startsWith(phrase)) score += 10;
  if (entry.isPage) score += 5;
  return score;
};

// A piece of the text around the first word that is found in it.
const snippetOf = (entry, words, length = 180) => {
  let at = -1;
  for (const word of words) {
    const found = entry.lowerText.search(new RegExp("(?<![\\p{L}\\p{N}])" + word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "u"));
    if (found !== -1 && (at === -1 || found < at)) at = found;
  }
  if (at === -1) at = 0;
  let start = Math.max(0, at - 50);
  if (start > 0) start = entry.text.indexOf(" ", start) + 1;
  let end = Math.min(entry.text.length, start + length);
  if (end < entry.text.length) end = entry.text.lastIndexOf(" ", end);
  return (start > 0 ? "… " : "") + entry.text.slice(start, end) + (end < entry.text.length ? " …" : "");
};

// Returns { query, words, total, results }; results holds at most `limit`
// entries, the best match first.
export const search = (query, limit = 8) => {
  const phrase = String(query ?? "").toLowerCase().replace(/\s+/g, " ").trim().slice(0, 100);
  const words = [...new Set(phrase.split(" ").filter(Boolean))];
  if (!words.length) return { query: phrase, words, total: 0, results: [] };

  const found = [];
  getIndex().forEach((entry, order) => {
    const score = scoreOf(entry, words, phrase);
    if (score) found.push({ entry, score, order });
  });
  found.sort((a, b) => b.score - a.score || a.order - b.order);

  return {
    query: phrase,
    words,
    total: found.length,
    results: found.slice(0, limit).map(({ entry }) => ({
      title: entry.title,
      page: entry.isPage ? "" : entry.page,
      group: entry.group,
      color: entry.color,
      icon: entry.icon,
      url: entry.url,
      snippet: snippetOf(entry, words),
    })),
  };
};
