const nav = [
  {
    title: "Documentation",
    slug: "documentation",
    nav: [
      {
        title: "Foundations",
        slug: "foundations",
        color: "gray",
        description: [
          "The <em>Foundations</em> explain how Nausikaä works as a whole: how to add it to a page, how the light and dark themes and the colors work, and what Nausikaä does for accessibility and different screen sizes.",
        ],
        nav: [
          {
            title: "Getting started",
            slug: "getting-started",
            icon: "flag",
            description:
              "Add Nausikaä to a page and learn the principles behind it.",
            nav: [
              {
                title: "Adding Nausikaä",
                slug: "installation",
              },
              {
                title: "Plain HTML first",
                slug: "plain-html",
              },
              {
                title: "Icons",
                slug: "icons",
              },
              {
                title: "Browser support",
                slug: "browser-support",
              },
            ],
          },
          {
            title: "Theming",
            slug: "theming",
            icon: "color-fill",
            description:
              "Light and dark themes, the color palette, and how to adjust colors and sizes.",
            nav: [
              {
                title: "Light and dark",
                slug: "light-and-dark",
              },
              {
                title: "Color palette",
                slug: "colors",
              },
              {
                title: "Customizing",
                slug: "customizing",
              },
              {
                title: "Component colors",
                slug: "component-colors",
              },
            ],
          },
          {
            title: "Accessibility",
            slug: "accessibility",
            icon: "users",
            description:
              "What Nausikaä takes care of, what is up to you, and its known limitations.",
            nav: [
              {
                title: "What Nausikaä does",
                slug: "what-nausikaa-does",
              },
              {
                title: "Your part",
                slug: "your-part",
              },
              {
                title: "Known limitations",
                slug: "limitations",
              },
            ],
          },
          {
            title: "Responsive design",
            slug: "responsive-design",
            icon: "fullscreen",
            description:
              "How layouts and components adapt to phones, tablets and large screens.",
            nav: [
              {
                title: "Viewport",
                slug: "viewport",
              },
              {
                title: "Breakpoints",
                slug: "breakpoints",
              },
              {
                title: "Page layout",
                slug: "layout",
              },
              {
                title: "Components",
                slug: "components",
              },
              {
                title: "Tips",
                slug: "tips",
              },
            ],
          },
        ],
      },
      {
        title: "Elements",
        slug: "elements",
        color: "yellow",
        description: [
          "The majority of elements in Hypertext Markup Language (HTML) are covered in the <em>Elements</em> section. These are the building blocks of every website, with no to little CSS classes to be learned. All basic tags like <code>&lt;a&gt;</code>, <code>&lt;ul&gt;</code>, <code>&lt;table&gt;</code> and <code>&lt;img&gt;</code> are covered. As well as <code>&lt;form&gt;</code> tags like <code>&lt;input&gt;</code>, <code>&lt;select&gt;</code> and <code>&lt;textarea&gt;</code>.",
          "Newer form controls from the HTML5 spec are covered too: <code>&lt;meter&gt;</code>, <code>&lt;input type=\"range\"&gt;</code> and <code>&lt;input type=\"color\"&gt;</code>. If you have any requests, please let me know!",
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
                slug: "unordered-lists",
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
            nav: [
              {
                title: "Inline links",
                slug: "inline",
              },
              {
                title: "Knobs",
                slug: "knobs",
              },
              {
                title: "Buttons",
                slug: "buttons",
              },
            ],
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
              {
                title: "Range sliders",
                slug: "range",
              },
              {
                title: "Color pickers",
                slug: "color",
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
            nav: [
              {
                title: "Basic images",
                slug: "basic",
              },
              {
                title: "Captions",
                slug: "captions",
              },
              {
                title: "Alignment",
                slug: "alignment",
              },
              {
                title: "Responsive images",
                slug: "responsive",
              },
            ],
          },
          {
            title: "Tables",
            slug: "tables",
            icon: "table",
            description:
              "Information presented in a two-dimensional table comprised of rows and columns of cells",
            nav: [
              {
                title: "Basic",
                slug: "basic",
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
              "Indicators showing the completion of a task, and meters for measurements within a range.",
            nav: [
              {
                title: "Default",
                slug: "default",
              },
              {
                title: "Indeterminate",
                slug: "indeterminate",
              },
              {
                title: "Labels",
                slug: "labels",
              },
              {
                title: "Colors",
                slug: "colors",
              },
              {
                title: "Meters",
                slug: "meters",
              },
              {
                title: "Demo",
                slug: "demo",
              },
            ],
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
              {
                title: "Demo",
                slug: "in-action",
              },
            ],
          },
          {
            title: "Dropdowns",
            slug: "dropdowns",
            icon: "star",
            description:
              "Toggle contextual overlays for displaying lists of links and more. When you can't give everything at once.",
            nav: [
              {
                title: "Basic",
                slug: "basic",
              },
              {
                title: "Locations",
                slug: "locations",
              },
              {
                title: "Links",
                slug: "links",
              },
              {
                title: "Filters",
                slug: "filters",
              },
            ],
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
            nav: [
              {
                title: "Regular",
                slug: "regular",
              },
              {
                title: "Colors",
                slug: "color",
              },
              {
                title: "Icons",
                slug: "icons",
              },
              {
                title: "Links",
                slug: "links",
              },
              {
                title: "Badges",
                slug: "badges",
              },
            ],
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
            nav: [
              {
                title: "Structure",
                slug: "structure",
              },
              {
                title: "Sections",
                slug: "sections",
              },
            ],
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
              {
                title: "Integrated labels in groups",
                slug: "integrated-label-groups",
              },
              {
                title: "Fieldsets",
                slug: "fieldsets",
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
          "<em>Utilities</em> are small, single-purpose components that provide additional functionality to a website. They are often used in combination with other elements, components, or collections to enhance the user experience. <strong>React</strong> is required to make use of <em>Utilities</em> in <u>Nausikaä</u>.",
        ],
        nav: [
          {
            title: "Calendar",
            slug: "calendar",
            icon: "calendar-view",
            description:
              "A simple calendar layout to display dates and events.",
            nav: [
              {
                title: "Basic calendar",
                slug: "basic-calendar",
              },
              {
                title: "Calendar events",
                slug: "calendar-events",
              },
              {
                title: "Event behaviour",
                slug: "event-behaviour",
              },
              {
                title: "Props",
                slug: "calendar-props",
              },
            ],
          },
          {
            title: "Date picker",
            slug: "date-picker",
            icon: "date-picker",
            description:
              "An interactive component for selecting dates from a calendar view.",
            nav: [
              {
                title: "Inline",
                slug: "inline-date-picker",
              },
              {
                title: "Dropdown",
                slug: "dropdown-date-picker",
              },
              {
                title: "Behaviour",
                slug: "date-picker-behaviour",
              },
              {
                title: "Props",
                slug: "date-picker-props",
              },
            ],
          },
          {
            title: "Editor",
            slug: "editor",
            icon: "edit",
            description:
              "A rich text editor for creating and formatting content directly within the browser. Based on <strong>Tiptap</strong>.",
            nav: [
              {
                title: "Large editor",
                slug: "large-editor",
              },
              {
                title: "Toolbar presets",
                slug: "editor-sizes",
              },
              {
                title: "Content and synchronization",
                slug: "editor-state",
              },
              {
                title: "Formatting and media",
                slug: "editor-features",
              },
              {
                title: "Props",
                slug: "editor-props",
              },
            ],
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
