// Sample data for the examples. Every name, number and title is made up.

// A day that never changes, so the examples look the same tomorrow.
const today = new Date(Date.UTC(2026, 8, 30));
const day = 24 * 60 * 60 * 1000;
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const pad = (n) => String(n).padStart(2, "0");
export const formatDate = (date) => `${pad(date.getUTCDate())}-${pad(date.getUTCMonth() + 1)}-${date.getUTCFullYear()}`;
export const formatMoney = (amount, currency = "EUR") =>
  `${currency} ${amount.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// The same "random" numbers on every run.
const random = (() => {
  let seed = 20260930;
  return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
})();
const pick = (list) => list[Math.floor(random() * list.length)];

export const branches = {
  NW: { name: "Northwest", color: "sky" },
  SE: { name: "Southeast", color: "pink" },
};

export const customers = [
  { name: "Alcinous University Library", city: "Scheria", country: "Greece", flag: "🇬🇷" },
  { name: "Arete College of Arts", city: "Corfu", country: "Greece", flag: "🇬🇷" },
  { name: "Ithaca Institute of Classics", city: "Vathy", country: "Greece", flag: "🇬🇷" },
  { name: "Bibliothek der Phäaken", city: "Tübingen", country: "Germany", flag: "🇩🇪" },
  { name: "Institut Homerische Studien", city: "Leipzig", country: "Germany", flag: "🇩🇪" },
  { name: "Bibliothèque Nausicaa", city: "Lyon", country: "France", flag: "🇫🇷" },
  { name: "Médiathèque des Phéaciens", city: "Nantes", country: "France", flag: "🇫🇷" },
  { name: "Ogygia Research Library", city: "Leiden", country: "Netherlands", flag: "🇳🇱" },
  { name: "Scylla & Charybdis Reading Room", city: "Messina", country: "Italy", flag: "🇮🇹" },
  { name: "Aeolus School of Navigation", city: "Bristol", country: "United Kingdom", flag: "🇬🇧" },
].map((customer, i) => ({
  ...customer,
  id: String(210400 + i * 137),
  branch: i % 3 === 2 ? "SE" : "NW",
  department: ["Acquisitions", "Library", "Periodicals department", "", "Central library"][i % 5],
  street: ["Palace Road 1", "Harbour Street 24", "Olive Grove 7", "Am Markt 12", "Lindenallee 3", "Rue des Quais 18", "Place du Port 5", "Kade 44", "Via dello Stretto 9", "Dock Lane 2"][i],
  zip: ["491 00", "491 31", "283 00", "72070", "04109", "69002", "44000", "2311 EZ", "98122", "BS1 4RW"][i],
  contact: ["Ms N. Kallergi", "", "Mr T. Vlachos", "Frau L. Brandt", "", "Mme C. Arnaud", "", "Mr J. de Ruiter", "", "Ms P. Whitcombe"][i],
  // The centre of the town, for the map; the customers themselves don't exist
  location: [[39.6200, 19.9190], [39.6243, 19.9217], [38.3646, 20.7186], [48.5216, 9.0576], [51.3397, 12.3731], [45.7640, 4.8357], [47.2184, -1.5536], [52.1601, 4.4970], [38.1938, 15.5540], [51.4545, -2.5879]][i],
}));

export const publishers = [
  { name: "Demodocus Press", city: "Athens", country: "Greece" },
  { name: "Laodamas & Sons", city: "London", country: "United Kingdom" },
  { name: "Halius Verlag", city: "Munich", country: "Germany" },
  { name: "Éditions Euryale", city: "Paris", country: "France" },
  { name: "Pontonous Academic", city: "Leiden", country: "Netherlands" },
  { name: "Edizioni Clitoneo", city: "Florence", country: "Italy" },
].map((publisher, i) => ({ ...publisher, id: String(672100 + i * 211), branch: "NW" }));

export const suppliers = [
  { name: "Phaeacian Book Distribution", city: "Scheria", country: "Greece" },
  { name: "Mentor Wholesale", city: "Rotterdam", country: "Netherlands" },
  { name: "Telemachus Libri", city: "Milan", country: "Italy" },
].map((supplier, i) => ({ ...supplier, id: String(675900 + i * 61), branch: "NW" }));

const images = [
  "/images/sandrart.jpg",
  "/images/lastman.jpg",
  "/images/dunlop.jpg",
  "/images/1878_Frederick_Leighton_-_Nausicaa.jpg",
  "/images/m.-heinrich-eddelein-nausikaa-and-her-maids-bringing-clothes-to-odysseus.jpg",
  "/images/ma-31767197.jpg",
  "/images/Nausicaa_and_her_Maidens_brought_to_Odysseus_food_and_wine.gif",
];

export const products = [
  ["Painting the Odyssey: Scenes from Homer, 1600–1900", "Thea Kallistou", 2024, 112.5, "Hardcover", 320],
  ["Washing Day at the River: Everyday Life in the Odyssey", "Marit van Ooijen", 2023, 48.75, "Paperback", 420],
  ["The Princess on the Shore: Nausicaä in Art and Literature", "Ilse Brandhorst", 2025, 39.95, "Hardcover", 208],
  ["Ships That Steer Themselves: The Phaeacians and the Sea", "Corin Halloway", 2022, 64.0, "Hardcover", 276],
  ["A Stranger and a Suppliant: Hospitality in Homer", "Nadine Ferrand", 2021, 29.5, "Paperback", 188],
  ["The Gardens of Alcinous", "Paolo Sartori", 2024, 85.0, "Hardcover", 144],
  ["Demodocus Sings: Bards and Memory", "Elke Vossen, Jurre Aalbers", 2020, 54.9, "Paperback", 356],
  ["Ball Games on the Beach: Play in Antiquity", "Rhea Stavrou", 2025, 24.95, "Paperback", 132],
  ["Scheria: An Atlas of an Island That Never Was", "Hugo Lindqvist", 2023, 149.0, "Hardcover", 96],
  ["Olive Oil and Linen: Material Culture of the Epics", "Anouk Desmet", 2022, 72.4, "Hardcover", 264],
  ["The Homecoming: A Commentary on Books 6 to 8", "Wendel Okafor", 2019, 135.0, "Hardcover", 612],
  ["Arete: The Queen Who Decides", "Solène Marchetti", 2026, 34.0, "Paperback", 224],
].map(([title, author, year, price, binding, pages], i) => ({
  id: String(881200 + i * 97),
  title,
  author,
  year,
  price,
  binding,
  pages,
  publisher: publishers[i % publishers.length],
  isbn: `97890${String(10000000 + i * 7340011).slice(0, 8)}`,
  // Not every product has a picture
  image: i % 3 === 1 ? null : images[i % images.length],
  series: i % 4 === 0 ? `Studies in the Epics, ${12 + i}` : "",
  edition: i % 5 === 3 ? "2nd revised edition" : "",
  prices: i % 3 === 0 ? [["EUR", price], ["GBP", Math.round(price * 86) / 100]] : [["EUR", price]],
  availability: [["Available", "green"], ["Available", "green"], ["Forthcoming", "blue"], ["Out of print", "red"], ["Temporarily out of stock", "yellow"]][i % 5],
  newTitle: i % 3 === 0, // offered to the customers as a new title
  ebook: i % 6 === 4,
}));

export const statuses = {
  delivered: { name: "Delivered", color: "green" },
  "on-order": { name: "On order", color: "yellow" },
  claimed: { name: "Claimed", color: "blue" },
  cancelled: { name: "Cancelled", color: "red" },
};
const statusOdds = ["delivered", "delivered", "delivered", "delivered", "delivered", "on-order", "on-order", "on-order", "claimed", "cancelled"];
const clerks = ["Naomi Aerts", "Jonas Lykke", "Farah Idrissi", "Pieter Okonkwo"];

// Where an order stands, how it came in and what kind of order it is.
export const positions = {
  IB: { name: "Order entered", color: "navy" },
  BS: { name: "Ordered", color: "blue" },
  IK: { name: "Purchased", color: "green" },
  DL: { name: "Partial delivery", color: "sapphire" },
  VW: { name: "Removed", color: "red" },
};
const positionOf = { "on-order": ["BS", "IB"], delivered: ["IK", "IK"], claimed: ["DL", "BS"], cancelled: ["VW", "VW"] };
const methods = ["Email", "Website", "EDI", "Telephone"];
const types = ["Firm order", "Firm order", "Firm order", "Standing order", "Approval plan"];
const budgets = ["Humanities 2026", "Classics fund", "General collection", ""];
const noteTexts = [
  "Customer asked for the paperback if the hardcover takes longer than a month.",
  "Supplier confirmed delivery for next week.",
  "Second copy is a gift for the reading room; invoice separately.",
];
const initialsOf = (name) => name.split(" ").map((part) => part[0]).join("");
const later = (date, days) => new Date(date.getTime() + days * day);

// Orders of the last twelve months, the newest first.
export const orders = Array.from({ length: 64 }, (_, i) => {
  const product = pick(products);
  const customer = pick(customers);
  const status = i < 4 ? "on-order" : pick(statusOdds);
  const quantity = random() < 0.8 ? 1 : 1 + Math.floor(random() * 4);
  const date = new Date(today.getTime() - Math.floor(i * 5.2 + random() * 24) * day);
  const clerk = pick(clerks);
  const supplier = suppliers[(i + product.pages) % suppliers.length];
  const position = positionOf[status][i % 2];
  const purchased = status === "delivered" || status === "claimed";
  const discount = [20, 25, 30][i % 3];
  return {
    id: String(5474900 - i * 13 - Math.floor(random() * 9)),
    date,
    product,
    customer,
    supplier,
    branch: customer.branch,
    status,
    quantity,
    received: status === "delivered" ? quantity : 0,
    total: product.price * quantity,
    clerk,
    // What the overview shows on top of that
    position: { id: position, ...positions[position] },
    method: methods[i % methods.length],
    type: types[i % types.length],
    notes: i % 5 === 1 ? { count: 1 + (i % 3), author: clerks[(i + 1) % clerks.length], text: noteTexts[i % noteTexts.length], ago: `${2 + (i % 9)} days ago` } : null,
    customerOrdered: later(date, -2),
    enteredBy: initialsOf(clerk),
    purchasedAt: purchased ? later(date, 3) : null,
    purchasedBy: initialsOf(clerks[(i + 2) % clerks.length]),
    purchasePrice: Math.round(product.price * (100 - discount)) / 100,
    discount,
    purchaseInvoice: status === "delivered" ? { date: later(date, 20), id: String(1496000 + i * 7) } : null,
    salesInvoice: status === "delivered" && i % 4 !== 3 ? { date: later(date, 25), id: String(5002200 + i * 3), by: initialsOf(clerk) } : null,
    budget: budgets[i % budgets.length],
    reference: i % 3 === 0 ? `PO-${2026000 + i * 17}` : "",
  };
});

const first = (value) => (Array.isArray(value) ? value[0] : value);
const list = (value) => (value === undefined ? [] : Array.isArray(value) ? value : [value]).filter(Boolean);

// Counts the orders per value of a field, the largest group first.
const countBy = (rows, keyOf, nameOf = (key) => key) => {
  const counts = new Map();
  for (const row of rows) counts.set(keyOf(row), (counts.get(keyOf(row)) ?? 0) + 1);
  return [...counts].map(([key, count]) => ({ key, name: nameOf(key), count })).sort((a, b) => b.count - a.count || (a.name < b.name ? -1 : 1));
};

const text = (a, b) => a.localeCompare(b);
const sorts = {
  "order-id": { name: "Order ID", compare: (a, b) => text(a.id, b.id) },
  "customer-id": { name: "Customer ID", compare: (a, b) => text(a.customer.id, b.customer.id) },
  "publisher-id": { name: "Publisher ID", compare: (a, b) => text(a.product.publisher.id, b.product.publisher.id) },
  "supplier-id": { name: "Supplier ID", compare: (a, b) => text(a.supplier.id, b.supplier.id) },
  title: { name: "Title", compare: (a, b) => text(a.product.title, b.product.title) },
  "order-date": { name: "Order date (customer)", compare: (a, b) => a.customerOrdered - b.customerOrdered },
  "entry-date": { name: "Entry date", compare: (a, b) => a.date - b.date },
  "purchase-date": { name: "Purchase date", compare: (a, b) => (a.purchasedAt ?? 0) - (b.purchasedAt ?? 0) },
};

// What can be filtered on, in the order of the sidebar. A location is one
// choice; of the others several can be checked.
const facetList = [
  { key: "location", name: "Locations", valueOf: (order) => order.branch, nameOf: (key) => branches[key]?.name ?? key },
  { key: "position", name: "Order position", valueOf: (order) => order.position.id, nameOf: (key) => positions[key]?.name ?? key },
  { key: "method", name: "Order method", valueOf: (order) => order.method },
  { key: "status", name: "Order status", valueOf: (order) => order.type },
  { key: "customer", name: "Customers", valueOf: (order) => order.customer.name, searchable: true },
  { key: "publisher", name: "Publishers", valueOf: (order) => order.product.publisher.name, searchable: true },
  { key: "supplier", name: "Suppliers", valueOf: (order) => order.supplier.name },
  { key: "budget", name: "Budgets", valueOf: (order) => order.budget },
];

// What the order overview shows for the query in the address: the search
// term, the checked filters, the sorting, the page and its length.
export const ordersView = (query = {}) => {
  const started = process.hrtime.bigint();
  const q = String(first(query.q) ?? "").trim().slice(0, 80);
  const filters = Object.fromEntries(facetList.map((facet) => [facet.key, list(query[facet.key])]));
  const sort = sorts[first(query.sort)] ? first(query.sort) : "entry-date";
  const dir = first(query.dir) === "asc" ? "asc" : "desc";
  const size = Math.min(Math.max(parseInt(first(query.size), 10) || 15, 1), 200);

  // Builds the address for a changed query, leaving out what is default
  const url = (changes = {}) => {
    const next = { q, ...filters, sort, dir, size, p: 1, ...changes };
    const params = new URLSearchParams();
    if (next.q) params.set("q", next.q);
    for (const facet of facetList) for (const value of next[facet.key]) params.append(facet.key, value);
    if (next.sort !== "entry-date") params.set("sort", next.sort);
    if (next.dir !== "desc") params.set("dir", next.dir);
    if (next.size !== 15) params.set("size", next.size);
    if (next.p > 1) params.set("p", next.p);
    if (next.state) params.set("state", next.state);
    const string = params.toString();
    return "/examples/orders" + (string ? "?" + string : "");
  };

  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const searched = orders.filter((order) => {
    const haystack = [order.id, order.product.title, order.product.author, order.product.isbn, order.customer.name, order.product.publisher.name, order.supplier.name].join(" ").toLowerCase();
    return words.every((word) => haystack.includes(word));
  });
  const matches = (order, except) => facetList.every((facet) => facet.key === except || !filters[facet.key].length || filters[facet.key].includes(facet.valueOf(order)));
  const found = searched.filter((order) => matches(order)).sort(sorts[sort].compare);
  if (dir === "desc") found.reverse();

  const pages = Math.max(1, Math.ceil(found.length / size));
  const page = Math.min(Math.max(parseInt(first(query.p), 10) || 1, 1), pages);

  return {
    q,
    filters,
    sort,
    dir,
    size,
    sorts: Object.entries(sorts).map(([key, { name }]) => ({ key, name, url: url({ sort: key }), active: key === sort })),
    total: found.length,
    rows: found.slice((page - 1) * size, page * size),
    page,
    pages,
    loading: first(query.state) === "loading",
    url,
    // The filters that are in use, each with the address that removes it
    active: facetList.flatMap((facet) =>
      filters[facet.key].map((value) => ({
        group: facet.name,
        name: facet.nameOf ? facet.nameOf(value) : value,
        url: url({ [facet.key]: filters[facet.key].filter((other) => other !== value) }),
      })),
    ),
    clearUrl: url(Object.fromEntries(facetList.map((facet) => [facet.key, []]))),
    // What can be filtered on; a count ignores the filter it belongs to
    facets: facetList.map((facet) => ({
      ...facet,
      options: countBy(searched.filter((order) => matches(order, facet.key)), facet.valueOf, facet.nameOf).filter((option) => option.key),
    })),
    milliseconds: () => Math.max(1, Math.round(Number(process.hrtime.bigint() - started) / 1e6)),
  };
};

// One sales invoice: what a customer is charged for the orders that were
// delivered. The amounts are counted in cents, so the totals add up.
export const invoice = (() => {
  const cents = (amount) => Math.round(amount * 100);
  const deliveredTo = (customer) => orders.filter((order) => order.customer === customer && order.status === "delivered");
  // A customer with a few delivered orders, one of them for more than one copy
  const customer = customers.find((c) => deliveredTo(c).length >= 3 && deliveredTo(c).some((order) => order.quantity > 1)) ?? customers[1];
  const delivered = deliveredTo(customer).sort((a, b) => b.quantity - a.quantity).slice(0, 4);
  const lines = delivered.map((order, i) => {
    const each = cents(order.product.price); // the price of one copy
    const gross = each * order.quantity;
    const adjustment = [-5, 0, -10, 0][i % 4]; // the customer's discount, in percent
    const net = Math.round((gross * (100 + adjustment)) / 100);
    const vatRate = order.product.ebook ? 21 : 9;
    const vat = Math.round((net * vatRate) / 100);
    return {
      order,
      quantity: order.quantity,
      each: each / 100,
      gross: gross / 100,
      adjustment,
      net: net / 100,
      vatRate,
      vatName: vatRate === 9 ? "low rate" : "high rate",
      vat: vat / 100,
      total: (net + vat) / 100,
      // The price in the currency of the publisher, when that is not the euro
      original: order.product.prices[1] ?? null,
      comment: i === 1 ? "Gift for the reading room" : "",
    };
  });
  const sum = (field) => lines.reduce((total, line) => total + cents(line[field]), 0) / 100;
  const vatByRate = {};
  for (const line of lines) vatByRate[line.vatRate] = (cents(vatByRate[line.vatRate] ?? 0) + cents(line.vat)) / 100;
  const date = new Date(today.getTime() - 12 * day);
  return {
    id: "5002311",
    branch: customer.branch,
    type: "Invoice",
    customer,
    currency: "EUR",
    date,
    due: later(date, 30),
    docket: "05218 4417 6602 18",
    invoicedBy: { name: clerks[0], initials: initialsOf(clerks[0]) },
    synced: "less than a minute ago",
    lines,
    items: lines.reduce((total, line) => total + line.quantity, 0),
    net: sum("net"),
    vatByRate,
    total: sum("total"),
    notes: [
      { author: clerks[1], date: later(date, 4), text: "Customer asked for a copy of the invoice by post as well. Sent on Monday." },
      { author: clerks[0], date: later(date, 0), text: "Invoiced together with the delivery of last week, as agreed with the library." },
    ],
  };
})();

// More titles, for the lists that are longer than the products above.
const moreTitles = [
  "The Loom and the Shuttle: Weaving in the Epics", "Harbours of the Ionian Sea", "Twelve Kings and a Thirteenth", "Songs at the Feast: Music in Homer",
  "A Mule Cart to the Washing Pools", "The Olive and the Wild Olive", "Shipwreck and Shelter", "Gifts for a Guest: Exchange in Early Greece",
  "The Dancers of Scheria", "Purple Wool by Firelight", "Orchards without Winter", "A Raft of Twenty Trees", "The Veil of Ino",
  "Nine Days Adrift", "Golden Dogs at the Door: Palaces in Poetry", "The Bath, the Oil and the Cloak", "Homeric Islands: A Gazetteer",
  "The Stone Ship: Legends of the Harbour", "Running, Wrestling, Leaping: Games of the Phaeacians", "The Bard's Three Songs", "A Princess Unafraid",
  "Wine Dark and Honey Sweet", "Letters on the Sixth Book", "The Shore at Dawn: Paintings 1850–1910",
];

// Catalogue progress: new titles that are being described before they go to
// the customers. A description starts as a draft.
const cataloguingStates = {
  draft: { name: "Draft", color: "" },
  review: { name: "In review", color: "yellow" },
  ready: { name: "Ready", color: "green" },
  sent: { name: "Sent", color: "blue" },
};
export const cataloguing = Array.from({ length: 35 }, (_, i) => {
  // Every row its own title: first the products, then the titles above
  const product = i < products.length
    ? products[(i * 5 + 2) % products.length]
    : { title: moreTitles[i - products.length], author: products[(i * 7) % products.length].author, publisher: publishers[i % publishers.length], year: 2019 + (i % 8) };
  const state = ["draft", "review", "ready", "draft", "sent", "review", "ready"][i % 7];
  // How much of the description is filled in
  const complete = state === "sent" || state === "ready" ? 100 : state === "review" ? 70 + ((i * 7) % 25) : 20 + ((i * 13) % 45);
  return {
    id: String(30418 + i * 3),
    product,
    state: { key: state, ...cataloguingStates[state] },
    complete,
    subject: ["Art history", "Classics", "Archaeology", "Literature"][i % 4],
    editor: clerks[i % clerks.length],
    changed: new Date(today.getTime() - (i * 2 + 1) * day),
    summoning: i === 3 || i === 8, // still being looked up at the publisher
  };
});
export const cataloguingCounts = Object.entries(cataloguingStates).map(([key, state]) => ({ key, ...state, count: cataloguing.filter((description) => description.state.key === key).length }));

// New title drafts: the work list and the editor of the example of that
// name. A draft holds what is known about a title so far; every part of it
// can be edited before the title is sent on.
export const titleStatuses = {
  draft: { name: "Draft", color: "yellow" },
  review: { name: "Review", color: "blue" },
  sent: { name: "Sent", color: "green" },
};
export const titleFlags = [
  ["book", "Book", "📕"],
  ["national", "From Nat.Bibl.", "🏛️"],
  ["revised", "Revised ed.", "✏️"],
  ["translation", "Translation", "🌐"],
  ["raisonne", "Raisonee Cat.", "🎨"],
  ["exhibition", "Exhibition Cat.", "🖼️"],
  ["collection", "Collection Cat.", "🗂️"],
  ["multivolume", "Multivolume", "📚"],
  ["dissertation", "Dissertation", "🎓"],
  ["textbook", "Textbook", "📘"],
  ["facsimile", "Facsimile", "📜"],
  ["reprint", "Reprint", "🖨️"],
  ["second", "Second ed.", "2️⃣"],
  ["secondVolume", "Sec. vol. series", "📑"],
  ["inHand", "Book in hand", "🤲"],
];
const subjectList = [["420", "Art history"], ["310", "Classical studies"], ["335", "Archaeology"], ["510", "Literature"], ["140", "Philosophy"], ["260", "History"]];
const languages = { Greece: "Greek", "United Kingdom": "English", Germany: "German", France: "French", Netherlands: "English", Italy: "Italian" };
// "3h", "2d", "5w": how long ago, in as few letters as possible
const shortAgo = (date) => {
  const hours = Math.max(0, Math.round((today.getTime() + 10 * 60 * 60 * 1000 - date.getTime()) / (60 * 60 * 1000)));
  if (hours < 1) return "now";
  if (hours < 24) return hours + "h";
  if (hours < 24 * 7) return Math.floor(hours / 24) + "d";
  if (hours < 24 * 60) return Math.floor(hours / (24 * 7)) + "w";
  return Math.floor(hours / (24 * 30)) + "mo";
};

export const titleDrafts = Array.from({ length: 23 }, (_, i) => {
  const product = products[(i * 7 + 3) % products.length];
  const publisher = product.publisher;
  const status = i % 6 === 4 ? "sent" : i % 4 === 1 ? "review" : "draft";
  const [title, subtitle = ""] = product.title.split(": ");
  const authors = product.author.split(", ").map((name) => {
    const parts = name.split(" ");
    return { family: parts.slice(1).join(" "), given: parts[0] };
  });
  const created = new Date(today.getTime() - (i * 31 + 5) * 60 * 60 * 1000);
  const edited = i % 3 === 0 ? null : new Date(created.getTime() + (i + 2) * 60 * 60 * 1000);
  const flags = titleFlags.filter((flag, f) => f === 0 || (i + f) % 7 === 0).map(([key]) => key);
  return {
    id: String(60418 + i * 7),
    status,
    branch: i % 4 === 3 ? "SE" : "NW",
    product,
    // A title that is new to everyone has no product to show yet
    matched: i % 5 !== 2,
    createdBy: clerks[i % clerks.length],
    created,
    createdAgo: shortAgo(created),
    editedBy: edited ? clerks[(i + 1) % clerks.length] : null,
    edited,
    editedAgo: edited ? shortAgo(edited) : "",
    // Prices that were looked up at the suppliers
    prices: i % 3 === 1 ? suppliers.slice(0, 2 + (i % 2)).map((supplier, n) => ({ supplier: supplier.name, amount: Math.round(product.price * (78 + n * 4)) / 100, note: ["In stock", "2 weeks", "On demand"][n] })) : [],
    // What the editor shows and changes
    fields: {
      title,
      subtitle,
      isbn: product.isbn,
      series: product.series ? product.series.split(", ")[0] : "",
      volume: product.series ? product.series.split(", ")[1] : "",
      authors,
      editors: i % 4 === 2 ? [{ family: "Vossen", given: "Elke" }] : [],
      // Not every publisher is known yet: such a draft can't be sent
      publisherMatched: i % 5 !== 3,
      publisher: publisher.name,
      publisherId: publisher.id,
      place: publisher.city,
      country: publisher.country,
      date: new Date(Date.UTC(product.year, (i * 5) % 12, 1 + ((i * 11) % 27))),
      pages: product.pages,
      illustrations: ["64 color ill.", "", "12 maps", "illustrated"][i % 4],
      language: languages[publisher.country],
      binding: product.binding,
      subjects: [subjectList[i % subjectList.length], subjectList[(i + 2) % subjectList.length]].slice(0, 1 + (i % 2)),
      currency: "EUR",
      price: product.price,
      flags,
      abstract: i % 3 === 2 ? "" : `${title} looks at the sixth book of the Odyssey and at what later readers made of it. The study follows the scene on the shore through painting, poetry and the stage, and asks why it kept its hold.`,
      info: i % 4 === 0 ? "We invite your continuation order." : "",
      remark: i % 5 === 1 ? "Check the price with the publisher" : "",
      source: ["Publisher catalogue", "National bibliography", "Website"][i % 3],
      edition: i % 6 === 0 ? "Hbk." : "",
      otherEditions: i % 6 === 0 ? [["Pbk.", "Edition"], ["E-book", "Edition"]] : [],
    },
  };
});

const titleSorts = {
  updated: { name: "Last updated", compare: (a, b) => (a.edited ?? a.created) - (b.edited ?? b.created) },
  created: { name: "Date created", compare: (a, b) => a.created - b.created },
  title: { name: "Title", compare: (a, b) => text(a.fields.title, b.fields.title) },
  author: { name: "Author", compare: (a, b) => text(a.fields.authors[0].family, b.fields.authors[0].family) },
  publisher: { name: "Publisher", compare: (a, b) => text(a.fields.publisher, b.fields.publisher) },
  status: { name: "Status", compare: (a, b) => text(a.status, b.status) },
};
const titleFacets = [
  { key: "status", name: "Status", valueOf: (draft) => draft.status, nameOf: (key) => titleStatuses[key]?.name ?? key, tagOf: (key) => titleStatuses[key]?.color ?? "" },
  { key: "location", name: "Database", valueOf: (draft) => draft.branch, nameOf: (key) => branches[key]?.name ?? key, tagOf: (key) => branches[key]?.color ?? "" },
  { key: "by", name: "Created by", valueOf: (draft) => draft.createdBy },
];

// What the page of the drafts shows for the query in the address: the search
// term, the filters, the sorting, the page, the open draft and the part of
// it that is being edited.
export const titleDraftsView = (query = {}) => {
  const q = String(first(query.q) ?? "").trim().slice(0, 80);
  const filters = Object.fromEntries(titleFacets.map((facet) => [facet.key, list(query[facet.key])]));
  const sort = titleSorts[first(query.sort)] ? first(query.sort) : "updated";
  const dir = first(query.dir) === "asc" ? "asc" : "desc";
  const size = Math.min(Math.max(parseInt(first(query.size), 10) || 8, 1), 200);
  // Without a choice in the address the page opens on the first draft, with
  // its publication being edited: that shows the page at work straight away.
  const defaultDraft = titleDrafts[0].id;
  const openId = first(query.draft) === "none" ? "" : String(first(query.draft) ?? defaultDraft);
  const defaultEdit = (id) => (id === defaultDraft ? "publication" : "");
  const editing = first(query.edit) === "none" ? "" : String(first(query.edit) ?? defaultEdit(openId));

  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const searched = titleDrafts.filter((draft) => {
    const haystack = [draft.id, draft.product.title, draft.product.author, draft.fields.isbn, draft.fields.publisher].join(" ").toLowerCase();
    return words.every((word) => haystack.includes(word));
  });
  const matches = (draft, except) => titleFacets.every((facet) => facet.key === except || !filters[facet.key].length || filters[facet.key].includes(facet.valueOf(draft)));
  const found = searched.filter((draft) => matches(draft)).sort(titleSorts[sort].compare);
  if (dir === "desc") found.reverse();

  const pages = Math.max(1, Math.ceil(found.length / size));
  const page = Math.min(Math.max(parseInt(first(query.p), 10) || 1, 1), pages);

  // Builds the address for a changed query, leaving out what is default
  const url = (changes = {}) => {
    const next = { q, ...filters, sort, dir, size, p: page, draft: openId, edit: editing, ...changes };
    // Another draft opens the way it would without a choice in the address
    if ("draft" in changes && !("edit" in changes)) next.edit = defaultEdit(next.draft);
    const params = new URLSearchParams();
    if (next.q) params.set("q", next.q);
    for (const facet of titleFacets) for (const value of next[facet.key]) params.append(facet.key, value);
    if (next.sort !== "updated") params.set("sort", next.sort);
    if (next.dir !== "desc") params.set("dir", next.dir);
    if (next.size !== 8) params.set("size", next.size);
    if (next.p > 1) params.set("p", next.p);
    if (next.draft !== defaultDraft) params.set("draft", next.draft || "none");
    // "none" says that nothing is being edited where the page would open a part
    if (next.edit !== defaultEdit(next.draft)) params.set("edit", next.edit || "none");
    if (next.saved) params.set("saved", "1");
    const string = params.toString();
    return "/examples/new-title-drafts" + (string ? "?" + string : "");
  };

  return {
    q,
    filters,
    filterCount: titleFacets.reduce((count, facet) => count + filters[facet.key].length, 0),
    sort,
    dir,
    size,
    sorts: Object.entries(titleSorts).map(([key, { name }]) => ({ key, name, url: url({ sort: key, p: 1 }), active: key === sort })),
    total: found.length,
    rows: found.slice((page - 1) * size, page * size),
    page,
    pages,
    open: titleDrafts.find((draft) => draft.id === openId) ?? null,
    defaultDraft,
    editing,
    // What a form has to send along to keep the part that is being edited
    editParam: editing === defaultEdit(openId) ? "" : editing || "none",
    saved: first(query.saved) === "1",
    url,
    facets: titleFacets.map((facet) => ({
      ...facet,
      options: countBy(searched.filter((draft) => matches(draft, facet.key)), facet.valueOf, facet.nameOf).map((option) => ({ ...option, tag: facet.tagOf ? facet.tagOf(option.key) : "" })),
    })),
  };
};

// The statistics example works on its own, much larger set of orders: only
// what is needed to count them. They are made up with their own row of
// "random" numbers, so the rest of the sample data stays as it is.
const statRandom = (() => {
  let seed = 19970212;
  return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
})();
// Picks an index; the earlier ones are picked more often
const skewed = (length, power = 2) => Math.floor(statRandom() ** power * length);

const statPositions = {
  ...positions,
  FA: { name: "Invoiced", color: "green" },
  UV: { name: "Supplied from stock", color: "purple" },
  TB: { name: "Ordered by telephone", color: "peach" },
  RS: { name: "Reserved", color: "pink" },
  NO: { name: "Zero order", color: "yellow" },
};
const statPositionOdds = ["FA", "FA", "FA", "FA", "FA", "FA", "FA", "IK", "IK", "IK", "BS", "BS", "BS", "VW", "VW", "UV", "DL", "IB", "TB", "RS", "NO"];
const statStatuses = ["Firm order", "Standing order", "Approval plan", "Continuation", "New title service", "Rush order", "Subscription", "Prepaid order", "On approval", "Replacement copy", "Gift"];
const statGroups = ["Monographs", "Series", "Exhibition catalogues", "E-books", "Journals", "Reference works", "Conference proceedings", "Text editions", "Facsimiles", "Maps and atlases", "Dissertations", "Music scores", "Audio and video"];
const statPublishers = [
  ...publishers,
  ...[
    ["Alcinous House", "SE"], ["Arete Editions", "NW"], ["Nausithous Verlag", "NW"], ["Echeneus Books", "SE"], ["Polybus & Daughters", "NW"],
    ["Euryalus University Press", "NW"], ["Editions du Rivage", "SE"], ["Clytoneus Editore", "NW"], ["Dymas Maritime Press", "SE"], ["Elatreus Academic", "NW"],
    ["Thoon Libri", "SE"], ["Amphialus Verlag", "NW"],
  ].map(([name, branch], i) => ({ name, branch, id: String(673480 + i * 173) })),
];
const statProducts = [
  ...products.map((product) => ({ id: product.id, title: product.title, branch: "NW", publisher: statPublishers.indexOf(product.publisher) })),
  ...moreTitles.map((title, i) => ({ id: String(882500 + i * 131), title, branch: i % 3 === 2 ? "SE" : "NW", publisher: (i * 5 + 6) % statPublishers.length })),
].map((product, i) => ({ ...product, group: (i * 7) % 4 === 0 ? 0 : skewed(statGroups.length) }));

const statFirstYear = today.getUTCFullYear() - 10;
// One row per order: [time, branch, status, product, position, quantity]
const statOrders = [];
for (let year = statFirstYear; year <= today.getUTCFullYear(); year++) {
  for (let month = 0; month < 12; month++) {
    const start = Date.UTC(year, month, 1);
    if (start > today.getTime()) break;
    const days = Math.min(new Date(Date.UTC(year, month + 1, 0)).getUTCDate(), year === today.getUTCFullYear() && month === today.getUTCMonth() ? today.getUTCDate() : 31);
    // Every year a little more, quiet summers, a busy autumn, and one lean year
    const season = [1.05, 1, 1.1, 0.95, 0.95, 0.85, 0.6, 0.55, 1.1, 1.25, 1.2, 0.8][month];
    const count = Math.round((150 + (year - statFirstYear) * 11) * season * (year === 2020 ? 0.72 : 1) * (0.85 + statRandom() * 0.3));
    for (let i = 0; i < count; i++) {
      const product = skewed(statProducts.length, 1.7);
      statOrders.push([
        start + Math.floor(statRandom() * days) * day,
        statRandom() < (statProducts[product].branch === "SE" ? 0.8 : 0.22) ? "SE" : "NW",
        skewed(statStatuses.length, 2.4),
        product,
        statPositionOdds[Math.floor(statRandom() * statPositionOdds.length)],
        statRandom() < 0.82 ? 1 : 2 + skewed(9, 3),
      ]);
    }
  }
}

const statPeriods = [["30d", "Last 30 days"], ["3m", "Last 3 months"], ["6m", "Last 6 months"], ["1y", "Last year"], ["ytd", "Current year"], ["all", "All time"]];
const statPeriodStart = (period) => {
  const back = (monthsBack) => Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - monthsBack, today.getUTCDate());
  return { "30d": today.getTime() - 30 * day, "3m": back(3), "6m": back(6), "1y": back(12), ytd: Date.UTC(today.getUTCFullYear(), 0, 1), all: 0 }[period];
};
const statFacets = [
  { key: "status", name: "Order status", open: true, valueOf: (order) => statStatuses[order[2]], nameOf: (key) => key },
  { key: "group", name: "Product groups", open: true, valueOf: (order) => statGroups[statProducts[order[3]].group], nameOf: (key) => key },
  { key: "publisher", name: "Publishers", open: false, valueOf: (order) => statPublishers[statProducts[order[3]].publisher].id, nameOf: (key) => statPublishers.find((publisher) => publisher.id === key).name },
];
const statCount = (rows, keyOf) => {
  const counts = new Map();
  for (const row of rows) counts.set(keyOf(row), (counts.get(keyOf(row)) ?? 0) + 1);
  return [...counts].map(([key, count]) => ({ key, count })).sort((a, b) => b.count - a.count || (String(a.key) < String(b.key) ? -1 : 1));
};
// The options of the filters keep their counts, whatever is filtered
const statOptions = statFacets.map((facet) => ({ ...facet, options: statCount(statOrders, facet.valueOf).map((option) => ({ ...option, name: facet.nameOf(option.key) })) }));
const statLocations = statCount(statOrders, (order) => order[1]);

// The figures for the statistics example: the location, the filters and the
// periods of the two top lists come from the address.
export const statisticsView = (query = {}) => {
  const location = branches[first(query.location)] ? first(query.location) : "";
  const filters = Object.fromEntries(statFacets.map((facet) => [facet.key, list(query[facet.key]).map(String)]));
  const periodOf = (value) => (statPeriods.some(([key]) => key === first(value)) ? first(value) : "30d");
  const periods = { products: periodOf(query["product-period"]), publishers: periodOf(query["publisher-period"]) };

  const rows = statOrders.filter((order) => (!location || order[1] === location) && statFacets.every((facet) => !filters[facet.key].length || filters[facet.key].includes(facet.valueOf(order))));
  const total = rows.length;
  const share = (count) => (total ? ((count / total) * 100).toFixed(1) + "%" : "—");

  // The last 72 months as six lines of twelve months, the oldest first
  const perMonth = new Map();
  for (const order of rows) {
    const date = new Date(order[0]);
    const key = date.getUTCFullYear() * 12 + date.getUTCMonth();
    perMonth.set(key, (perMonth.get(key) ?? 0) + 1);
  }
  const last = today.getUTCFullYear() * 12 + today.getUTCMonth();
  const series = Array.from({ length: 6 }, (_, s) => {
    const points = Array.from({ length: 12 }, (_, i) => {
      const key = last - 71 + s * 12 + i;
      return { label: months[key % 12], year: Math.floor(key / 12), count: perMonth.get(key) ?? 0 };
    });
    const from = points[0].year, to = points[11].year;
    return { points, label: from === to ? String(from) : `${from}–${String(to).slice(2)}` };
  });

  const perYear = new Map();
  for (const order of rows) {
    const year = new Date(order[0]).getUTCFullYear();
    perYear.set(year, (perYear.get(year) ?? 0) + 1);
  }
  const byYear = Array.from({ length: 11 }, (_, i) => ({ year: statFirstYear + i, count: perYear.get(statFirstYear + i) ?? 0 })).filter((year) => year.count);

  const top = (period, keyOf, itemOf) => {
    const start = statPeriodStart(period);
    return statCount(rows.filter((order) => order[0] >= start), keyOf).slice(0, 15).map((row) => ({ ...itemOf(row.key), value: row.count }));
  };

  const url = (changes = {}) => {
    const next = { location, ...filters, "product-period": periods.products, "publisher-period": periods.publishers, ...changes };
    const params = new URLSearchParams();
    if (next.location) params.set("location", next.location);
    for (const facet of statFacets) for (const value of next[facet.key]) params.append(facet.key, value);
    for (const key of ["product-period", "publisher-period"]) if (next[key] !== "30d") params.set(key, next[key]);
    const string = params.toString();
    return "/examples/statistics" + (string ? "?" + string : "");
  };

  const count = (keyOf) => statCount(rows, keyOf);
  return {
    location,
    filters,
    periods,
    periodOptions: statPeriods,
    locations: statLocations.map((option) => ({ ...option, ...branches[option.key] })),
    facets: statOptions,
    active: (location ? 1 : 0) + statFacets.reduce((sum, facet) => sum + filters[facet.key].length, 0),
    clearUrl: url({ location: "", ...Object.fromEntries(statFacets.map((facet) => [facet.key, []])) }),
    url,
    total,
    share,
    branches: Object.keys(branches).map((key) => ({ key, ...branches[key], count: rows.filter((order) => order[1] === key).length })),
    quantity: rows.reduce((sum, order) => sum + order[5], 0),
    series,
    byPosition: count((order) => order[4]).map((row) => ({ ...row, ...statPositions[row.key] })),
    byStatus: count(statFacets[0].valueOf).slice(0, 12),
    byGroup: count(statFacets[1].valueOf).slice(0, 15),
    byYear,
    topProducts: top(periods.products, (order) => order[3], (index) => statProducts[index]),
    topPublishers: top(periods.publishers, (order) => statProducts[order[3]].publisher, (index) => statPublishers[index]),
  };
};

// Shipment schedule: a calendar full of parcels going out, deliveries coming
// in and returns. Every day is made up from its own date, so a month always
// shows the same shipments, whichever month is asked for first.
const carriers = [
  { key: "aeolus", name: "Aeolus Express", color: "blue" },
  { key: "phaeacian", name: "Phaeacian Freight", color: "green" },
  { key: "ithaca", name: "Ithaca Post", color: "yellow" },
  { key: "trident", name: "Trident Sea Cargo", color: "navy" },
  { key: "hermes", name: "Winged Sandal Courier", color: "peach" },
  { key: "own", name: "Own delivery", color: "mauve" },
];
const shipmentTypes = { outgoing: "Outgoing", incoming: "Incoming", return: "Return" };
const shipmentStatuses = {
  planned: { name: "Planned", color: "" },
  packed: { name: "Packed", color: "yellow" },
  transit: { name: "In transit", color: "blue" },
  delivered: { name: "Delivered", color: "green" },
  delayed: { name: "Delayed", color: "red" },
};
const recipients = [
  ...customers,
  ...[
    ["Laertes Agricultural College", "Kefalonia", "Greece", "🇬🇷"], ["Penelope Textile Museum", "Sparta", "Greece", "🇬🇷"],
    ["Stadtbibliothek Kalypso", "Bremen", "Germany", "🇩🇪"], ["Kirke Institut für Pharmazie", "Marburg", "Germany", "🇩🇪"],
    ["Bibliothèque des Sirènes", "Marseille", "France", "🇫🇷"], ["Institut Télémaque", "Bordeaux", "France", "🇫🇷"],
    ["Eumaeus Rural Library", "Deventer", "Netherlands", "🇳🇱"], ["Polyphemus Observatory", "Catania", "Italy", "🇮🇹"],
    ["Biblioteca Eolo", "Lipari", "Italy", "🇮🇹"], ["Mentor Teacher Training College", "Durham", "United Kingdom", "🇬🇧"],
    ["Lotus Eaters Botanical Society", "Kew", "United Kingdom", "🇬🇧"], ["Biblioteca Nausícaa", "Valencia", "Spain", "🇪🇸"],
    ["Odysseus Maritime Academy", "Gothenburg", "Sweden", "🇸🇪"], ["Argos Veterinary Faculty", "Ghent", "Belgium", "🇧🇪"],
  ].map(([name, city, country, flag], i) => ({ name, city, country, flag, id: String(212100 + i * 149), branch: i % 3 === 1 ? "SE" : "NW" })),
];
const shipmentDays = new Map();
const shipmentsOn = (date) => {
  const iso = date.toISOString().slice(0, 10);
  if (shipmentDays.has(iso)) return shipmentDays.get(iso);
  // The number of the day, stirred well: days next to each other must not look alike
  let seed = Math.imul(Math.floor(date.getTime() / day), 2654435761) >>> 0;
  seed = Math.imul(seed ^ (seed >>> 15), 2246822519) >>> 0;
  seed = ((seed ^ (seed >>> 13)) >>> 0) % 2147483646 + 1;
  const next = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const pickFrom = (items, power = 1) => items[Math.floor(next() ** power * items.length)];
  const weekday = date.getUTCDay();
  // Busy on working days, quiet on Saturday, nearly nothing on Sunday
  const count = weekday === 0 ? (next() < 0.25 ? 1 : 0) : weekday === 6 ? Math.floor(next() * 4) : 6 + Math.floor(next() * 9);
  const age = Math.round((date.getTime() - today.getTime()) / day);
  const shipments = Array.from({ length: count }, (_, i) => {
    const roll = next();
    const type = roll < 0.68 ? "outgoing" : roll < 0.9 ? "incoming" : "return";
    const party = type === "incoming" ? pickFrom(suppliers) : pickFrom(recipients, 1.4);
    // Suppliers send with a carrier; only what goes out can go with the own van
    const carrier = pickFrom(type === "incoming" ? carriers.slice(0, -1) : carriers, 1.5);
    const late = next() < 0.07;
    const status = age > 1 ? "planned" : age >= 0 ? pickFrom(["planned", "packed", "packed", "transit"]) : late ? "delayed" : age > -4 ? pickFrom(["transit", "delivered"]) : "delivered";
    const parcels = 1 + Math.floor(next() ** 2 * 14);
    return {
      id: `${iso.slice(2).replace(/-/g, "")}${pad(i + 1)}`,
      date,
      type,
      party,
      carrier,
      status: { key: status, ...shipmentStatuses[status] },
      branch: party.branch,
      // A delivery from a supplier comes at a time; the rest goes out with the day's collection
      time: type === "incoming" ? `${pad(8 + Math.floor(next() * 9))}:${pickFrom(["00", "15", "30", "45"])}` : "",
      parcels,
      weight: Math.round(parcels * (1.5 + next() * 9) * 10) / 10,
      orders: 1 + Math.floor(next() * parcels * 3),
      service: next() < 0.2 ? "Express" : "Standard",
      tracking: `${carrier.key.slice(0, 2).toUpperCase()}${String(Math.floor(next() * 1e9)).padStart(9, "0")}${party.country.slice(0, 2).toUpperCase()}`,
    };
  }).sort((a, b) => (a.time || "99").localeCompare(b.time || "99"));
  shipmentDays.set(iso, shipments);
  return shipments;
};

const shipmentFacets = [
  { key: "carrier", name: "Carriers", open: true, valueOf: (shipment) => shipment.carrier.key, nameOf: (key) => carriers.find((carrier) => carrier.key === key).name, colorOf: (key) => carriers.find((carrier) => carrier.key === key).color },
  { key: "type", name: "Direction", open: true, valueOf: (shipment) => shipment.type, nameOf: (key) => shipmentTypes[key] },
  { key: "status", name: "Status", open: true, valueOf: (shipment) => shipment.status.key, nameOf: (key) => shipmentStatuses[key].name },
  { key: "location", name: "Locations", open: false, valueOf: (shipment) => shipment.branch, nameOf: (key) => branches[key].name, colorOf: (key) => branches[key].color },
  { key: "party", name: "Customers and suppliers", open: false, searchable: true, valueOf: (shipment) => shipment.party.name, nameOf: (key) => key },
];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// What the shipment schedule shows: the month, the filters and the shipment
// that is opened all come from the address.
export const shipmentScheduleView = (query = {}) => {
  const filters = Object.fromEntries(shipmentFacets.map((facet) => [facet.key, list(query[facet.key]).map(String)]));
  const openId = /^\d{8}$/.test(first(query.shipment) ?? "") ? first(query.shipment) : "";
  const current = `${today.getUTCFullYear()}-${pad(today.getUTCMonth() + 1)}`;
  const years = Array.from({ length: 11 }, (_, i) => today.getUTCFullYear() - 5 + i);
  const asked = /^(\d{4})-(\d{2})$/.exec(first(query.month) ?? "") ?? (first(query.y) && first(query.m) ? [null, first(query.y), first(query.m)] : null);
  let year = asked ? parseInt(asked[1], 10) : today.getUTCFullYear();
  let month = asked ? parseInt(asked[2], 10) - 1 : today.getUTCMonth();
  if (!years.includes(year) || !(month >= 0 && month < 12)) [year, month] = [today.getUTCFullYear(), today.getUTCMonth()];
  const key = `${year}-${pad(month + 1)}`;

  // Whole weeks, from the Monday before the first to the Sunday after the last
  const firstOfMonth = new Date(Date.UTC(year, month, 1));
  const start = new Date(firstOfMonth.getTime() - ((firstOfMonth.getUTCDay() + 6) % 7) * day);
  const lastOfMonth = new Date(Date.UTC(year, month + 1, 0));
  const end = new Date(lastOfMonth.getTime() + ((7 - lastOfMonth.getUTCDay()) % 7) * day);
  const dates = [];
  for (let time = start.getTime(); time <= end.getTime(); time += day) dates.push(new Date(time));

  const all = dates.flatMap((date) => shipmentsOn(date));
  const matches = (shipment, except) => shipmentFacets.every((facet) => facet.key === except || !filters[facet.key].length || filters[facet.key].includes(facet.valueOf(shipment)));
  const shown = all.filter((shipment) => matches(shipment));

  const url = (changes = {}) => {
    const next = { month: key, ...filters, shipment: "", ...changes };
    const params = new URLSearchParams();
    if (next.month !== current) params.set("month", next.month);
    for (const facet of shipmentFacets) for (const value of next[facet.key]) params.append(facet.key, value);
    if (next.shipment) params.set("shipment", next.shipment);
    const string = params.toString();
    return "/examples/shipment-schedule" + (string ? "?" + string : "");
  };
  const shift = (by) => {
    const target = new Date(Date.UTC(year, month + by, 1));
    return years.includes(target.getUTCFullYear()) ? url({ month: `${target.getUTCFullYear()}-${pad(target.getUTCMonth() + 1)}` }) : "";
  };

  return {
    year,
    month: month + 1,
    monthName: monthNames[month],
    monthNames,
    years,
    isCurrent: key === current,
    todayUrl: url({ month: current }),
    previousUrl: shift(-1),
    nextUrl: shift(1),
    filters,
    active: shipmentFacets.reduce((sum, facet) => sum + filters[facet.key].length, 0),
    clearUrl: url(Object.fromEntries(shipmentFacets.map((facet) => [facet.key, []]))),
    url,
    total: shown.length,
    days: dates.map((date) => ({
      date,
      iso: date.toISOString().slice(0, 10),
      number: date.getUTCDate(),
      weekday: ((date.getUTCDay() + 6) % 7) + 1,
      sameMonth: date.getUTCMonth() === month,
      today: date.getTime() === today.getTime(),
      lastWeek: end.getTime() - date.getTime() < 7 * day,
      shipments: shown.filter((shipment) => shipment.date.getTime() === date.getTime()),
    })),
    // Every filter counts what the other filters leave, so an option says
    // how many shipments it would show
    facets: shipmentFacets.map((facet) => {
      const counts = new Map();
      for (const shipment of all) counts.set(facet.valueOf(shipment), 0);
      for (const shipment of all) if (matches(shipment, facet.key)) counts.set(facet.valueOf(shipment), counts.get(facet.valueOf(shipment)) + 1);
      const options = [...counts].map(([value, count]) => ({ key: value, name: facet.nameOf(value), color: facet.colorOf ? facet.colorOf(value) : "", count }));
      const checked = (option) => (filters[facet.key].includes(option.key) ? 0 : 1);
      return { ...facet, options: options.sort((a, b) => checked(a) - checked(b) || b.count - a.count || text(a.name, b.name)) };
    }),
    open: openId ? all.find((shipment) => shipment.id === openId) ?? null : null,
  };
};

export default { today, formatDate, formatMoney, branches, customers, publishers, suppliers, products, statuses, positions, orders, ordersView, invoice, cataloguing, cataloguingCounts, titleStatuses, titleFlags, titleDrafts, titleDraftsView, statisticsView, shipmentScheduleView };
