const nav = [
  {
    title: "Documentation",
    slug: "documentation",
    nav: [
      {
        title: "Elements",
        slug: "elements",
        color: "yellow",
        description: [
          "The majority of elements in Hypertext Markup Language (HTML) are covered in the <em>Elements</em> section. These are the building blocks of every website, with no to little CSS classes to be learned. All basic tags like <code>&lt;a&gt;</code>, <code>&lt;ul&gt;</code>, <code>&lt;table&gt;</code> and <code>&lt;img&gt;</code> are covered. As well as <code>&lt;form&gt;</code> tags like <code>&lt;input&gt;</code>, <code>&lt;select&gt;</code> and <code>&lt;textarea&gt;</code>.",
          'Newer elements from the HTML5 spec are still in development, like <code>&lt;meter&gt;</code>, <code>&lt;input type="range"&gt;</code> and <code>&lt;input type="color"&gt;</code>. The goal is for someday to make <u>Nausikaä</u> HTML5 complete one day. If you have any elements you would like to see, please let me know.',
        ],
        nav: [
          {
            title: "Typography",
            slug: "typography",
            icon: "typography",
            description:
              "Include global settings, headings, body text, inline elements, lists, blocquotes and more.",
            nav: [
              {
                title: "Headings",
                slug: "headings",
              },
              {
                title: "Inline text elements",
                slug: "inline-text-elements",
              },
              {
                title: "Blockquotes",
                slug: "blockquotes",
              },
              {
                title: "(Un)Ordered lists",
                slug: "un-ordered-lists",
              },
              {
                title: "Description lists",
                slug: "description-lists",
              },
              {
                title: "Horizontal rule",
                slug: "horizontal-rule",
              },
              {
                title: "Pre",
                slug: "pre",
              },
            ],
          },
          {
            title: "Links",
            slug: "links",
            icon: "link",
            description:
              "Arguably the most important element on the internet. Where would we go without it?",
          },
          {
            title: "Buttons",
            slug: "buttons",
            icon: "buttons",
            description:
              "The button indicates a possible user action, meant to look and behave as an interative element",
            nav: [
              {
                title: "Regular",
                slug: "regular",
              },
              {
                title: "Colors",
                slug: "colors",
              },
              {
                title: "Loading",
                slug: "loading",
              },
              {
                title: "Labels",
                slug: "labels",
              },
              {
                title: "Sizes",
                slug: "sizes",
              },
              {
                title: "Groups",
                slug: "groups",
              },
            ],
          },
          {
            title: "Input fields",
            slug: "input-fields",
            icon: "inputs",
            description:
              "A place to write down your dreams and hopes. Or just sign up for that ole newsletter.",
            nav: [
              {
                title: "Text fields",
                slug: "text-fields",
              },
              {
                title: "Select fields",
                slug: "select-fields",
              },
              {
                title: "Textarea",
                slug: "textarea",
              },
              {
                title: "Attached buttons",
                slug: "attached-buttons",
              },
              {
                title: "Attached labels",
                slug: "attached-labels",
              },
              {
                title: "Icons",
                slug: "icons",
              },
              {
                title: "Mixed",
                slug: "mixed",
              },
              {
                title: "File upload",
                slug: "file-upload",
              },
              {
                title: "Suggestions",
                slug: "suggestions",
              },
            ],
          },
          {
            title: "Checkboxes & Radios",
            slug: "checkboxes-radios",
            icon: "checkbox",
            description:
              "Allows a user to select a value from a small set of options, often binary",
            nav: [
              {
                title: "Checkboxes",
                slug: "checkboxes",
              },
              {
                title: "Radios buttons",
                slug: "radios",
              },
              {
                title: "Inline boxes",
                slug: "inline-boxes",
              },
              {
                title: "Button styles",
                slug: "button-styles",
              },
            ],
          },
          {
            title: "Images",
            slug: "images",
            icon: "photo",
            description:
              "Embed graphic representations of cats, among other things.",
          },
          {
            title: "Tables",
            slug: "tables",
            icon: "table",
            description:
              "Information presented in a two-dimensional table comprised of rows and columns of cells",
            nav: [
              {
                title: "Regular",
                slug: "regular",
              },
              {
                title: "Striped",
                slug: "striped",
              },
              {
                title: "Bordered",
                slug: "bordered",
              },
              {
                title: "Outlined",
                slug: "outlined",
              },
            ],
          },
          {
            title: "Progress bars",
            slug: "progress-bars",
            icon: "progress",
            description:
              "An indicator showing the completion progress of a task",
          },
        ],
      },
      {
        title: "Components",
        slug: "components",
        color: "red",
        description: [
          "<em>Components</em> are made up of multiple <em>Elements</em> and together fulfill a simple function. They enrich the user experience and provide builders with greater flexibility. <u>Nausikaä</u> has a small set of <em>Components</em> commonly found on the internet. Some CSS classes come in to play here. Javascript is <strong>not</strong> required.",
        ],
        nav: [
          {
            title: "Breadcrumbs",
            slug: "breadcrumbs",
            icon: "arrow-right",
            description:
              "Indicate the users current location within a navigational hierarchy. Watch out for houses made of candy.",
            nav: [
              {
                title: "Regular",
                slug: "regular",
              },
              {
                title: "Knobs",
                slug: "knobs",
              },
              {
                title: "Steps",
                slug: "steps",
              },
            ],
          },
          {
            title: "Containers",
            slug: "containers",
            icon: "container",
            description:
              "Simple boxes for complicated stuff. When you don't know where to put it, put it in a container.",
            nav: [
              {
                title: "Regular",
                slug: "regular",
              },
              {
                title: "Colors",
                slug: "colors",
              },
              {
                title: "Mock browser",
                slug: "mock-browser",
              },
            ],
          },
          {
            title: "Dialogs",
            slug: "dialogs",
            icon: "dialog",
            description:
              "A classic modal overlay, in which you can include any content you want. Also known as <em>popup</em>.",
            nav: [
              {
                title: "Regular",
                slug: "regular",
              },
              {
                title: "Width",
                slug: "width",
              },
            ],
          },
          {
            title: "Dropdowns",
            slug: "dropdowns",
            icon: "star",
            description:
              "Toggle contextual overlays for displaying lists of links and more. When you can't give everything at once.",
          },
          {
            title: "Notifications",
            slug: "notifications",
            icon: "notify",
            description:
              "Provide contextual feedback messages for typical user actions.",
            nav: [
              {
                title: "Regular",
                slug: "regular",
              },
              {
                title: "Close",
                slug: "close",
              },
              {
                title: "Icons",
                slug: "icons",
              },
              {
                title: "Colors",
                slug: "colors",
              },
              {
                title: "Sticky",
                slug: "sticky",
              },
            ],
          },
          {
            title: "Pagination",
            slug: "pagination",
            icon: "pagination",
            description: "A way for users to navigate paginated content.",
            nav: [
              {
                title: "Regular",
                slug: "regular",
              },
              {
                title: "Rounded",
                slug: "rounded",
              },
              {
                title: "Bullets",
                slug: "bullets",
              },
            ],
          },
          {
            title: "Panels",
            slug: "panels",
            icon: "panel",
            description: "A composable panel, for compact controls.",
            nav: [
              {
                title: "Regular",
                slug: "regular",
              },
              {
                title: "Subnav",
                slug: "subnav",
              },
              {
                title: "Icons",
                slug: "icons",
              },
              {
                title: "Colors",
                slug: "colors",
              },
              {
                title: "Arrows",
                slug: "arrows",
              },
              {
                title: "Filters",
                slug: "filters",
              },
              {
                title: "Forms",
                slug: "forms",
              },
            ],
          },
          {
            title: "Tags ",
            slug: "tags",
            icon: "tag",
            description: "Small tag labels to insert anywhere.",
          },
        ],
      },
      {
        title: "Collections",
        slug: "collections",
        color: "blue",
        description: [
          "<em>Collections</em> are patterns commonly found on websites, made up of multiple <em>Elements</em> and <em>Components</em>. The number of <em>Collections</em> in <u>Nausikaä</u> is small, but hopefully more will be developed in the future.",
        ],
        nav: [
          {
            title: "Articles",
            slug: "articles",
            icon: "article",
            description:
              "A self-contained composition which is intended to be independently distributable or reusable.",
          },
          {
            title: "Navbar",
            slug: "navbar",
            icon: "navbar",
            description:
              "A responsive horizontal navbar that can support a menu, links, buttons, and dropdowns.",
            nav: [
              {
                title: "Overview",
                slug: "overview",
              },
              {
                title: "Branding",
                slug: "branding",
              },
              {
                title: "Menu",
                slug: "menu",
              },
              {
                title: "Search",
                slug: "search",
              },
              {
                title: "Links",
                slug: "links",
              },
              {
                title: "Spacer",
                slug: "spacer",
              },
            ],
          },
          {
            title: "Gallery",
            slug: "gallery",
            icon: "gallery",
            description:
              "Collections of images displayed on a grid or as a slideshow",
            nav: [
              {
                title: "Regular",
                slug: "regular",
              },
              {
                title: "Fit",
                slug: "fit",
              },
              {
                title: "Sizes",
                slug: "sizes",
              },
              {
                title: "Ratio",
                slug: "ratio",
              },
              {
                title: "Position",
                slug: "position",
              },
              {
                title: "Slideshow",
                slug: "slideshow",
              },
            ],
          },
          {
            title: "Forms",
            slug: "forms",
            icon: "forms",
            description:
              "Allows a user to enter data, using a combination of checkboxes, radio buttons, or text and select fields",
            nav: [
              {
                title: "Basic",
                slug: "basic",
              },
              {
                title: "Login",
                slug: "login",
              },
              {
                title: "Integrated labels",
                slug: "integrated-labels",
              },
            ],
          },
          {
            title: "Products",
            slug: "products",
            icon: "cart",
            description:
              "An article or substance that is manufactured or refined for sale.",
            nav: [
              {
                title: "Card",
                slug: "card",
              },
              {
                title: "List",
                slug: "list",
              },
              {
                title: "Detail",
                slug: "detail",
              },
            ],
          },
        ],
      },
      {
        title: "Utilities",
        slug: "utilities",
        color: "green",
        description: [
          "<em>Utilities</em> are small, single-purpose components that provide additional functionality to a website. They are often used in combination with other elements, components, or collections to enhance the user experience. Most require some JavaScript to function properly.",
        ],
        nav: [
          {
            title: "Calendar",
            slug: "calendar",
            icon: "calendar-view",
            description:
              "A simple calendar layout to display dates and events.",
          },
          {
            title: "Date picker",
            slug: "date-picker",
            icon: "date-picker",
            description:
              "An interactive component for selecting dates from a calendar view.",
          },
          {
            title: "Editor",
            slug: "editor",
            icon: "edit",
            description:
              "A rich text editor for creating and formatting content directly within the browser.",
          },
        ],
      },
    ],
  },
  {
    title: "Examples",
    slug: "examples",
    nav: [
      {
        title: "Checkout form",
        slug: "checkout-form",
      },
      {
        title: "Order tracing",
        slug: "order-tracing",
      },
      {
        title: "Product detail",
        slug: "product-detail",
      },
      {
        title: "Complex form",
        slug: "complex-form",
      },
      {
        title: "Library services",
        slug: "library-services",
      },
    ],
  },
  {
    title: "About",
    slug: "about",
  },
  {
    title: "Download",
    slug: "download",
  },
];

export default nav;
