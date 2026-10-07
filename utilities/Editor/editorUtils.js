import { useEffect, useRef } from "react";

// showModal() keeps the focus inside a dialog, closes it with Escape and
// returns the focus afterwards. Browsers without it (Safari before 15.4,
// Firefox before 98) get an open dialog with a backdrop of its own.
export const canShowModal =
  typeof HTMLDialogElement !== "undefined" &&
  typeof HTMLDialogElement.prototype.showModal === "function";

// Opens the dialog in the returned ref as a modal while `active` is true, and
// calls onClose when the browser closes it (Escape).
export const useModalDialog = (active, onClose) => {
  const dialog = useRef(null);
  const closeHandler = useRef(onClose);
  closeHandler.current = onClose;

  useEffect(() => {
    const element = dialog.current;
    if (!canShowModal || !element) return;
    if (active && !element.open) element.showModal();
    if (!active && element.open) element.close();
  }, [active]);

  useEffect(() => {
    const element = dialog.current;
    if (!canShowModal || !element) return;
    const handler = () => closeHandler.current();
    element.addEventListener("close", handler);
    return () => element.removeEventListener("close", handler);
  }, []);

  return dialog;
};

export const blockTypes = [
  {
    slug: "paragraph",
    title: "Normal",
    toggle: (editor) => editor.commands.clearNodes(),
  },
  {
    slug: "h1",
    title: "Large heading",
    toggle: (editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    slug: "h2",
    title: "Medium heading",
    toggle: (editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    slug: "h3",
    title: "Small heading",
    toggle: (editor) =>
      editor.chain().focus().toggleHeading({ level: 3 }).run(),
  },
  {
    slug: "ol",
    title: "Ordered list",
    toggle: (editor) => editor.chain().focus().toggleOrderedList().run(),
  },
  {
    slug: "ul",
    title: "Unordered list",
    toggle: (editor) => editor.chain().focus().toggleBulletList().run(),
  },
  {
    slug: "quote",
    title: "Quote",
    toggle: (editor) => editor.chain().focus().toggleBlockquote().run(),
  },
  {
    slug: "code",
    title: "Code block",
    toggle: (editor) => editor.chain().focus().toggleCodeBlock().run(),
  },
];

export const alignTypes = [
  {
    slug: "align-left",
    title: "Left align",
    toggle: (editor) => editor.chain().focus().setTextAlign("left").run(),
  },
  {
    slug: "align-right",
    title: "Right align",
    toggle: (editor) => editor.chain().focus().setTextAlign("right").run(),
  },
  {
    slug: "align-center",
    title: "Center align",
    toggle: (editor) => editor.chain().focus().setTextAlign("center").run(),
  },
  {
    slug: "align-justify",
    title: "Justify align",
    toggle: (editor) => editor.chain().focus().setTextAlign("justify").run(),
  },
];

// Black or white, whichever reads better on a background color given as
// #rgb or #rrggbb. Other notations keep the text color around them.
export const readableTextOn = (background) => {
  const match = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(background || "");
  if (!match) return "inherit";
  const hex =
    match[1].length === 3
      ? match[1].replace(/./g, (c) => c + c)
      : match[1];
  const [r, g, b] = [0, 2, 4].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  // Contrast with black against contrast with white
  return (luminance + 0.05) / 0.05 >= 1.05 / (luminance + 0.05)
    ? "#000"
    : "#fff";
};

export const colorTypes = [
  {
    name: "red",
    hex: "#cb4335",
    text: "#fff",
  },
  {
    name: "yellow",
    hex: "#f1c40f",
    text: "#000",
  },
  {
    name: "blue",
    hex: "#2980d7",
    text: "#fff",
  },
  {
    name: "green",
    hex: "#28b463",
    text: "#000",
  },
  {
    name: "purple",
    hex: "#9933ff",
    text: "#fff",
  },
  {
    name: "orange",
    hex: "#d35400",
    text: "#fff",
  },
  {
    name: "pink",
    hex: "#ffc0cb",
    text: "#000",
  },
  {
    name: "teal",
    hex: "#008080",
    text: "#fff",
  },
  {
    name: "olive",
    hex: "#808000",
    text: "#fff",
  },
  {
    name: "navy",
    hex: "#000080",
    text: "#fff",
  },
  {
    name: "salmon",
    hex: "#fa8072",
    text: "#fff",
  },
  {
    name: "magenta",
    hex: "#ff00ff",
    text: "#fff",
  },
  {
    name: "cyan",
    hex: "#00ffff",
    text: "#000",
  },
  {
    name: "lightgray",
    hex: "#cccccc",
    text: "#000",
  },
  {
    name: "chocolate",
    hex: "#663300",
    text: "#fff",
  },
  {
    name: "black",
    hex: "#000000",
    text: "#fff",
  },
  {
    name: "white",
    hex: "#ffffff",
    text: "#000",
  },
  {
    name: "amsterdam",
    hex: "#006b57",
    text: "#fff",
  },
  {
    name: "paris",
    hex: "#005c90",
    text: "#fff",
  },
];
