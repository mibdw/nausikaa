import React, { useEffect, useState } from "react";
import { colorTypes, canShowModal, useModalDialog } from "./editorUtils.js";
import { useUniqueId } from "../useUniqueId.js";

const rgbToHex = (rgb) => {
  if (!rgb) return "";

  const arr = rgb
    .replace("rgb(", "")
    .replace(")", "")
    .split(", ")
    .map((d) => Number(d));

  return (
    "#" +
    arr
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};

const EditorColorPicker = ({
  editor,
  colorPickerActive,
  setColorPickerActive,
  icons,
}) => {
  const [activeColor, setActiveColor] = useState(false);
  const active = Boolean(colorPickerActive && colorPickerActive.length > 0);
  const dialog = useModalDialog(active, () => setColorPickerActive(false));
  const titleId = useUniqueId("editor-color-picker-title");

  useEffect(() => {
    if (colorPickerActive && colorPickerActive == "text-color") {
      setActiveColor(rgbToHex(editor.getAttributes("textStyle").color));
    } else if (colorPickerActive && colorPickerActive == "highlight") {
      setActiveColor(
        colorTypes.findIndex((c) =>
          editor.isActive("highlight", { color: c.hex }),
        ) == -1
          ? false
          : colorTypes[
              colorTypes.findIndex((c) =>
                editor.isActive("highlight", { color: c.hex }),
              )
            ].hex,
      );
    } else {
      setActiveColor(false);
    }
  }, [colorPickerActive]);

  const setColor = (color) => {
    if (colorPickerActive && colorPickerActive == "text-color")
      editor.chain().focus().setColor(color).run();
    if (colorPickerActive && colorPickerActive == "highlight")
      editor.chain().focus().toggleHighlight({ color }).run();
    if (colorPickerActive && colorPickerActive == "cell-color") {
      editor.chain().focus().setCellAttribute("backgroundColor", color).run();
    }

    setColorPickerActive(false);
  };

  const unsetColor = () => {
    if (colorPickerActive && colorPickerActive == "text-color")
      editor.chain().focus().unsetColor().run();
    if (colorPickerActive && colorPickerActive == "highlight")
      editor.chain().focus().unsetHighlight().run();
    if (colorPickerActive && colorPickerActive == "cell-color")
      editor
        .chain()
        .focus()
        .setCellAttribute("backgroundColor", "transparent")
        .run();

    setColorPickerActive(false);
  };

  return [
    <dialog
      ref={dialog}
      className="editor-color-picker"
      key="dialog"
      open={canShowModal ? undefined : active}
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="control close"
        aria-label="Close"
        onClick={() => setColorPickerActive(false)}
      >
        <svg className="icon" aria-hidden="true">
          <use xlinkHref={`${icons}#clear`}></use>
        </svg>
      </button>
      <header id={titleId}>
        Set{" "}
        <em>
          text
          {colorPickerActive == "highlight" ? " background " : " "}
        </em>
        color:
      </header>
      <div className="color-grid">
        {colorTypes.map((c, i) => (
          <button
            type="button"
            key={"color-picker-" + i}
            className={`tag ${activeColor == c.hex ? "active" : ""}`}
            aria-pressed={activeColor == c.hex ? "true" : "false"}
            onClick={() => setColor(c.hex)}
            style={{ backgroundColor: c.hex, color: c.text }}
          >
            {c.name.charAt(0).toUpperCase() + c.name.slice(1)}
          </button>
        ))}
        <button
          type="button"
          className="tag nothing"
          onClick={() => unsetColor()}
        >
          No color
        </button>
      </div>
    </dialog>,
    !canShowModal && (
      <div
        key="color-picker-backdrop"
        className="backdrop"
        style={{ zIndex: 100148, display: active ? "block" : "none" }}
        onClick={() => setColorPickerActive(false)}
      />
    ),
  ];
};

export default EditorColorPicker;
