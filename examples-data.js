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
  N: { name: "North", color: "forest" },
  S: { name: "South", color: "royal" },
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
  branch: i % 3 === 2 ? "S" : "N",
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
].map((publisher, i) => ({ ...publisher, id: String(672100 + i * 211), branch: "N" }));

export const suppliers = [
  { name: "Phaeacian Book Distribution", city: "Scheria", country: "Greece" },
  { name: "Mentor Wholesale", city: "Rotterdam", country: "Netherlands" },
  { name: "Telemachus Libri", city: "Milan", country: "Italy" },
].map((supplier, i) => ({ ...supplier, id: String(675900 + i * 61), branch: "N" }));

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

// New titles that are being described before they go to the customers.
const draftStates = {
  draft: { name: "Draft", color: "" },
  review: { name: "In review", color: "yellow" },
  ready: { name: "Ready", color: "green" },
  sent: { name: "Sent", color: "blue" },
};
export const drafts = Array.from({ length: 14 }, (_, i) => {
  const product = products[(i * 5 + 2) % products.length];
  const state = ["draft", "review", "ready", "draft", "sent", "review", "ready"][i % 7];
  // How much of the description is filled in
  const complete = state === "sent" || state === "ready" ? 100 : state === "review" ? 70 + ((i * 7) % 25) : 20 + ((i * 13) % 45);
  return {
    id: String(30418 + i * 3),
    product,
    state: { key: state, ...draftStates[state] },
    complete,
    subject: ["Art history", "Classics", "Archaeology", "Literature"][i % 4],
    editor: clerks[i % clerks.length],
    changed: new Date(today.getTime() - (i * 2 + 1) * day),
    summoning: i === 3 || i === 8, // still being looked up at the publisher
  };
});
export const draftCounts = Object.entries(draftStates).map(([key, state]) => ({ key, ...state, count: drafts.filter((draft) => draft.state.key === key).length }));

// The figures for the dashboard example, counted from the orders above.
export const statistics = (() => {
  const share = (count) => Math.round((count / orders.length) * 100);
  const byStatus = countBy(orders, (order) => order.status, (key) => statuses[key].name).map((row) => ({ ...row, color: statuses[row.key].color, share: share(row.count) }));
  const byCountry = countBy(orders, (order) => order.customer.country);
  const flags = Object.fromEntries(customers.map((customer) => [customer.country, customer.flag]));

  // The last twelve months, the oldest first
  const perMonth = Array.from({ length: 12 }, (_, i) => {
    const start = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 11 + i, 1));
    const inMonth = orders.filter((order) => order.date.getUTCFullYear() === start.getUTCFullYear() && order.date.getUTCMonth() === start.getUTCMonth());
    return {
      label: months[start.getUTCMonth()],
      year: start.getUTCFullYear(),
      count: inMonth.length,
      // Last year is made up as well: a little less, with its own rhythm
      before: Math.max(1, Math.round(inMonth.length * 0.8 + ((i * 5) % 3) - 1)),
      amount: inMonth.reduce((sum, order) => sum + order.total, 0),
    };
  });

  const amountPer = (keyOf) => {
    const totals = new Map();
    for (const order of orders) {
      if (order.status === "cancelled") continue;
      const key = keyOf(order);
      totals.set(key, (totals.get(key) ?? 0) + order.total);
    }
    return [...totals].map(([item, amount]) => ({ item, amount })).sort((a, b) => b.amount - a.amount);
  };

  const delivered = orders.filter((order) => order.status === "delivered");
  return {
    orders: orders.length,
    amount: orders.filter((order) => order.status !== "cancelled").reduce((sum, order) => sum + order.total, 0),
    byStatus,
    byCountry: byCountry.map((row) => ({ ...row, flag: flags[row.key], value: Math.round((row.count / byCountry[0].count) * 100) })),
    perMonth,
    maxPerMonth: Math.max(...perMonth.map((month) => Math.max(month.count, month.before))),
    topCustomers: amountPer((order) => order.customer).slice(0, 5),
    topPublishers: amountPer((order) => order.product.publisher).slice(0, 5),
    delivered: delivered.length,
    open: orders.filter((order) => order.status === "on-order" || order.status === "claimed").length,
    average: delivered.reduce((sum, order) => sum + order.total, 0) / delivered.length,
  };
})();

export default { today, formatDate, formatMoney, branches, customers, publishers, suppliers, products, statuses, positions, orders, ordersView, invoice, drafts, draftCounts, statistics };
