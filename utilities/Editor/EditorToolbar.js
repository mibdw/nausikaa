import React, { useState, useCallback } from "react";
import {
  blockTypes,
  alignTypes,
  colorTypes,
  canShowModal,
  useModalDialog,
} from "./editorUtils.js";
import { useUniqueId } from "../useUniqueId.js";

const EditorToolbar = ({
  editor,
  editorSize,
  activeBlock,
  activeAlign,
  setColorPickerActive,
  imageUploadUrl,
  icons,
}) => {
  const [imageDialogActive, setImageDialogActive] = useState(false);
  const [youtubeDialogActive, setYoutubeDialogActive] = useState(false);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  return [
    <div className="editor-toolbar" key="editor-toolbar">
      {(editorSize == "large" || editorSize == "medium") && [
        <button
          key="undo-button"
          title="Undo"
          aria-label="Undo"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <svg className="icon" aria-hidden="true">
            <use xlinkHref={`${icons}#undo`} />
          </svg>
        </button>,
        <button
          key="redo-button"
          title="Redo"
          aria-label="Redo"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <svg className="icon" aria-hidden="true">
            <use xlinkHref={`${icons}#redo`} />
          </svg>
        </button>,
        <div key="undo-redo-divider" className="divider" />,
      ]}
      {(editorSize == "large" || editorSize == "medium") && [
        <div className="dropdown editor-block-types" key="editor-block-types">
          <button
            title={activeBlock && activeBlock.title ? activeBlock.title : ""}
          >
            <svg className="icon" aria-hidden="true">
              <use
                xlinkHref={`${icons}#${
                  activeBlock && activeBlock.slug ? activeBlock.slug : ""
                }`}
              />
            </svg>
            <span>
              {activeBlock && activeBlock.title ? activeBlock.title : ""}
            </span>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref={`${icons}#chevron-down`} />
            </svg>
          </button>
          <div className="panel arrow">
            <ul>
              {blockTypes &&
                blockTypes.length > 0 &&
                blockTypes.map((block) => (
                  <li
                    key={"block-type-" + block.slug}
                    className={block.slug == activeBlock.slug ? "active" : ""}
                  >
                    <button
                      type="button"
                      className="link"
                      onClick={() => block.toggle(editor)}
                    >
                      <svg className="icon" aria-hidden="true">
                        <use
                          xlinkHref={`${icons}#${block.slug}`}
                        />
                      </svg>
                      {block.title}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>,
        <div className="divider" key="editor-block-divider" />,
      ]}

      <button
        title="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "active" : ""}
      >
        <svg className="icon" aria-hidden="true">
          <use xlinkHref={`${icons}#bold`} />
        </svg>
      </button>
      <button
        title="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "active" : ""}
      >
        <svg className="icon" aria-hidden="true">
          <use xlinkHref={`${icons}#italic`} />
        </svg>
      </button>
      {editorSize == "small" && (
        <button
          title="Underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "active" : ""}
        >
          <svg className="icon" aria-hidden="true">
            <use xlinkHref={`${icons}#underline`} />
          </svg>
        </button>
      )}

      {(editorSize == "large" || editorSize == "small") && (
        <button
          key="editor-link-button"
          title="Insert link"
          onClick={setLink}
          disabled={!setLink}
          className={editor.isActive("link") ? "active" : ""}
        >
          <svg className="icon" aria-hidden="true">
            <use xlinkHref={`${icons}#link`} />
          </svg>
        </button>
      )}

      {editorSize != "small" && (
        <div className="dropdown">
          <button title="More options">
            <svg className="icon" aria-hidden="true">
              <use xlinkHref={`${icons}#more-horizontal`} />
            </svg>
          </button>
          <div className="panel arrow">
            <ul>
              <li className={editor.isActive("underline") ? "active" : ""}>
                <button
                  type="button"
                  className="link"
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                >
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref={`${icons}#underline`} />
                  </svg>
                  Underline
                </button>
              </li>
              <li className={editor.isActive("strike") ? "active" : ""}>
                <button
                  type="button"
                  className="link"
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref={`${icons}#strikethrough`} />
                  </svg>
                  Strikethrough
                </button>
              </li>
              <li className={editor.isActive("code") ? "active" : ""}>
                <button
                  type="button"
                  className="link"
                  onClick={() => editor.chain().focus().toggleCode().run()}
                >
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref={`${icons}#format-code`} />
                  </svg>
                  Code
                </button>
              </li>

              {editorSize == "medium" && (
                <li className={editor.isActive("link") ? "active" : ""}>
                  <button type="button" className="link" onClick={setLink}>
                    <svg className="icon" aria-hidden="true">
                      <use xlinkHref={`${icons}#link`} />
                    </svg>
                    Link
                  </button>
                </li>
              )}
              {editorSize != "large" && [
                <li className="seperator" key="toolbar-dropdown-seperator" />,
                <li className="toolbar-colors" key="toolbar-dropdown-colors-1">
                  <button
                    type="button"
                    className="link"
                    onClick={() => setColorPickerActive("text-color")}
                  >
                    <svg className="icon" aria-hidden="true">
                      <use xlinkHref={`${icons}#color-text`} />
                    </svg>
                    <span>Text color</span>
                    <div className="spacer" />
                    <span
                      className={`tag current-color ${
                        !editor.getAttributes("textStyle").color
                          ? "nothing"
                          : ""
                      }`}
                      style={{
                        backgroundColor:
                          editor.getAttributes("textStyle").color,
                      }}
                    />
                  </button>
                </li>,
                <li className="toolbar-colors" key="toolbar-dropdown-colors-2">
                  <button
                    type="button"
                    className="link"
                    onClick={() => setColorPickerActive("highlight")}
                  >
                    <svg className="icon" aria-hidden="true">
                      <use xlinkHref={`${icons}#color-fill`} />
                    </svg>
                    <span>Background color</span>
                    <div className="spacer" />
                    <span
                      className={`tag current-color ${
                        colorTypes.findIndex((c) =>
                          editor.isActive("highlight", { color: c.hex }),
                        ) == -1
                          ? "nothing"
                          : ""
                      }`}
                      style={{
                        backgroundColor:
                          colorTypes.findIndex((c) =>
                            editor.isActive("highlight", { color: c.hex }),
                          ) == -1
                            ? ""
                            : colorTypes[
                                colorTypes.findIndex((c) =>
                                  editor.isActive("highlight", {
                                    color: c.hex,
                                  }),
                                )
                              ].hex,
                      }}
                    />
                  </button>
                </li>,
              ]}
            </ul>
          </div>
        </div>
      )}

      {editorSize == "small" && (
        <button
          type="button"
          title="Insert image"
          aria-label="Insert image"
          onClick={() => setImageDialogActive(true)}
        >
          <svg className="icon" aria-hidden="true">
            <use xlinkHref={`${icons}#image`} />
          </svg>
        </button>
      )}

      {editorSize == "large" && [
        <div className="divider" key="button-color-divider" />,
        <button
          key={"editor-tooltip-text-color"}
          title="Text color"
          onClick={() => setColorPickerActive("text-color")}
          className="color-picker"
        >
          <svg className="icon" aria-hidden="true">
            <use xlinkHref={`${icons}#color-text`} />
          </svg>
          <span
            className={`tag current-color ${
              !editor.getAttributes("textStyle").color ? "nothing" : ""
            }`}
            style={{
              backgroundColor: editor.getAttributes("textStyle").color,
            }}
          />
        </button>,
        <button
          key={"editor-tooltip-highlight"}
          title="Background color"
          onClick={() => setColorPickerActive("highlight")}
          className="color-picker"
        >
          <svg className="icon" aria-hidden="true">
            <use xlinkHref={`${icons}#color-fill`} />
          </svg>
          <span
            className={`tag current-color ${
              colorTypes.findIndex((c) =>
                editor.isActive("highlight", { color: c.hex }),
              ) == -1
                ? "nothing"
                : ""
            }`}
            style={{
              backgroundColor:
                colorTypes.findIndex((c) =>
                  editor.isActive("highlight", { color: c.hex }),
                ) == -1
                  ? ""
                  : colorTypes[
                      colorTypes.findIndex((c) =>
                        editor.isActive("highlight", { color: c.hex }),
                      )
                    ].hex,
            }}
          />
        </button>,
      ]}

      {editorSize != "small" && [
        <div className="divider" key="yet-another-divider" />,
        <div
          className="dropdown"
          style={{ marginRight: ".5em" }}
          key="alignment-dropdown"
        >
          <button
            title={activeAlign && activeAlign.title ? activeAlign.title : ""}
          >
            <svg className="icon" aria-hidden="true">
              <use
                xlinkHref={`${icons}#${
                  activeAlign && activeAlign.slug ? activeAlign.slug : ""
                }`}
              />
            </svg>
          </button>
          <div className="panel arrow">
            <ul>
              {alignTypes &&
                alignTypes.length > 0 &&
                alignTypes.map((align) => (
                  <li
                    key={"align-type-" + align.slug}
                    className={align.slug == activeAlign.slug ? "active" : ""}
                  >
                    <button
                      type="button"
                      className="link"
                      onClick={() => align.toggle(editor)}
                    >
                      <svg className="icon" aria-hidden="true">
                        <use
                          xlinkHref={`${icons}#${align.slug}`}
                        />
                      </svg>
                      {align.title}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>,
        <div className="dropdown" key="table-dropdown">
          <button title="Insert table">
            <svg className="icon" aria-hidden="true">
              <use xlinkHref={`${icons}#table`} />
            </svg>
            <span>Table</span>
          </button>
          <div className="panel arrow">
            <ul>
              <li>
                <button
                  type="button"
                  className="link"
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .insertTable({ rows: 3, cols: 3 })
                      .run()
                  }
                >
                  Insert table
                </button>
              </li>
              <li className="seperator" />
              <li>
                <button
                  type="button"
                  className="link"
                  onClick={() => editor.chain().focus().addColumnBefore().run()}
                >
                  Add column before
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="link"
                  onClick={() => editor.chain().focus().addColumnAfter().run()}
                >
                  Add column after
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="link"
                  onClick={() => editor.chain().focus().deleteColumn().run()}
                >
                  Delete column
                </button>
              </li>
              <li className="seperator" />
              <li>
                <button
                  type="button"
                  className="link"
                  onClick={() => editor.chain().focus().addRowBefore().run()}
                >
                  Add row before
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="link"
                  onClick={() => editor.chain().focus().addRowAfter().run()}
                >
                  Add row after
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="link"
                  onClick={() => editor.chain().focus().deleteRow().run()}
                >
                  Delete row
                </button>
              </li>
              <li className="seperator" />
              <li>
                <button
                  type="button"
                  className="link"
                  onClick={() => editor.chain().focus().toggleHeaderRow().run()}
                >
                  Toggle header row
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="link"
                  onClick={() => editor.chain().focus().mergeOrSplit().run()}
                >
                  Merge or split
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="link"
                  onClick={() => setColorPickerActive("cell-color")}
                >
                  Cell background color
                </button>
              </li>
            </ul>
          </div>
        </div>,
        <div className="dropdown" key="media-dropdown">
          <button title="Insert media">
            <svg className="icon" aria-hidden="true">
              <use xlinkHref={`${icons}#plus`} />
            </svg>
            <span>Insert</span>
          </button>
          <div className="panel arrow">
            <ul>
              <li>
                <button
                  type="button"
                  className="link"
                  onClick={() => setImageDialogActive(true)}
                >
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref={`${icons}#image`} />
                  </svg>
                  Image
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="link"
                  onClick={() => setYoutubeDialogActive(true)}
                >
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref={`${icons}#movie`} />
                  </svg>
                  YouTube
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="link"
                  onClick={() =>
                    editor.commands.insertContent(
                      `<ul data-type="taskList"><li data-type="taskItem" data-checked="true">A list item</li><li data-type="taskItem" data-checked="false">And another one</li></ul>`,
                    )
                  }
                >
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref={`${icons}#checklist`} />
                  </svg>
                  Task list
                </button>
              </li>
            </ul>
          </div>
        </div>,
      ]}
    </div>,
    <ImageDialog
      key="image-dialog"
      {...{ editor, imageDialogActive, setImageDialogActive, icons }}
      imageUploadUrl={imageUploadUrl}
    />,
    <YoutubeDialog
      key="youtube-dialog"
      {...{ editor, youtubeDialogActive, setYoutubeDialogActive, icons }}
    />,
    !canShowModal && (
    <div
      key="editor-toolbar-backdrop"
      className="backdrop"
      style={{
        zIndex: 100148,
        display: imageDialogActive || youtubeDialogActive ? "block" : "none",
      }}
      onClick={() => {
        setImageDialogActive(false);
        setYoutubeDialogActive(false);
      }}
    />
    ),
  ];
};

const ImageDialog = ({
  editor,
  imageDialogActive,
  setImageDialogActive,
  imageUploadUrl,
  icons,
}) => {
  const [imgUrl, setImgUrl] = useState("");
  const [addImage, setAddImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(false);
  const [altText, setAltText] = useState("");
  const [titleText, setTitleText] = useState("");

  const closeDialog = () => {
    setImagePreview(false);
    setAltText("");
    setImgUrl("");
    setTitleText("");
    setImageDialogActive(false);
  };
  const dialog = useModalDialog(imageDialogActive, closeDialog);
  const uid = useUniqueId("editor-image");

  const uploadFile = async (e) => {
    if (e.target.files && e.target.files[0]) {
      setAddImage(e.target.files[0]);
      setUploadingImage(true);

      if (e.target.files[0].type.indexOf("image") == -1) {
        setUploadingImage(false);
      } else {
        let formData = new FormData();
        formData.append("file", e.target.files[0]);
        try {
          const uploadedImage = await fetch(imageUploadUrl, {
            method: "PUT",
            body: formData,
          })
            .then((res) => res.json())
            .then((json) => (json.src ? { src: json.src } : json));

          if (
            uploadedImage &&
            (uploadedImage.src ||
              (uploadedImage.fileName && uploadedImage.folderLocation))
          ) {
            setImagePreview(uploadedImage);
            setImgUrl("");
          }
        } catch (error) {
          console.error("Image upload failed:", error);
        } finally {
          setUploadingImage(false);
        }
      }
    }
  };

  return (
    <dialog
      ref={dialog}
      className="image-dialog"
      open={canShowModal ? undefined : imageDialogActive}
      aria-labelledby={`${uid}-title`}
    >
      <button
        type="button"
        className="control close"
        aria-label="Close"
        onClick={closeDialog}
      >
        <svg className="icon" aria-hidden="true">
          <use xlinkHref={`${icons}#clear`}></use>
        </svg>
      </button>
      <h4 id={`${uid}-title`}>Insert image</h4>

      <div className="basic-form">
        <label htmlFor={`${uid}-upload`}>Upload</label>
        <div style={{ display: "flex" }}>
          <input
            type="file"
            name="images-upload"
            onChange={uploadFile}
            accept="image/*"
            id={`${uid}-upload`}
          />
          <label
            htmlFor={`${uid}-upload`}
            className="button"
            style={{ padding: "0px 1.4em 5px 1.1em" }}
          >
            <svg className="icon" aria-hidden="true">
              <use xlinkHref={`${icons}#images`}></use>
            </svg>
          </label>

          <div className="group" style={{ width: "100%" }}>
            <input
              type="text"
              className={`append-icon ${
                addImage &&
                addImage.type &&
                addImage.type.indexOf("image") == -1
                  ? "invalid"
                  : ""
              }`}
              placeholder="Upload image"
              value={
                addImage && addImage.type && addImage.name && addImage.size
                  ? `${addImage.name} (${addImage.type} / ${(
                      addImage.size / 1000
                    ).toFixed(2)}kb)`
                  : ""
              }
              readOnly={true}
            />
            {uploadingImage ? (
              <svg className="icon uploading">
                <use xlinkHref={`${icons}#refresh`}></use>
              </svg>
            ) : addImage &&
              addImage.type &&
              addImage.type.indexOf("image") == -1 ? (
              <svg className="icon" style={{ fill: "#f00" }}>
                <use xlinkHref={`${icons}#warning`}></use>
              </svg>
            ) : (
              <svg className="icon" aria-hidden="true">
                <use xlinkHref={`${icons}#upload`}></use>
              </svg>
            )}
          </div>
        </div>
        <label htmlFor={`${uid}-url`}>URL</label>
        <input
          type="url"
          id={`${uid}-url`}
          placeholder="Link to image, https://example.com/picture.jpg"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />
      </div>
      <div className="image-preview">
        {imagePreview ? (
          <img src={imagePreview.src || `${imagePreview.folderLocation}${imagePreview.fileName}`} />
        ) : imgUrl ? (
          <img src={imgUrl} />
        ) : (
          <div className="no-images">Image preview</div>
        )}
        <div className="additional-options">
          <label htmlFor={`${uid}-alt`}>Alt text</label>
          <input
            disabled={!imagePreview && !imgUrl}
            type="text"
            id={`${uid}-alt`}
            placeholder="Textual replacement for the image, for accessibility"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />

          <label htmlFor={`${uid}-title-text`}>Title text</label>
          <input
            type="text"
            id={`${uid}-title-text`}
            disabled={!imagePreview && !imgUrl}
            placeholder="Supplemental captioning information"
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
          />
        </div>
      </div>

      <footer>
        <div className="spacer" />
        <button
          onClick={() => {
            setImagePreview(false);
            setAltText("");
            setTitleText("");
            setImgUrl("");
            setImageDialogActive(false);
          }}
        >
          Cancel
        </button>

        <button
          className="primary"
          disabled={!imagePreview && !imgUrl}
          onClick={async () => {
            let imgObj = {
              src: imagePreview
                ? imagePreview.src || imagePreview.folderLocation + imagePreview.fileName
                : imgUrl && imgUrl.length > 0
                  ? imgUrl
                  : "",
            };
            if (altText && altText.length > 0) imgObj["alt"] = altText;
            if (titleText && titleText.length > 0) imgObj["title"] = titleText;

            editor.commands.setImage(imgObj);

            setImagePreview(false);
            setAltText("");
            setTitleText("");
            setImgUrl("");
            setImageDialogActive(false);
          }}
        >
          Insert image
        </button>
      </footer>
    </dialog>
  );
};

const YoutubeDialog = ({
  editor,
  youtubeDialogActive,
  setYoutubeDialogActive,
  icons,
}) => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [youtubeWidth, setYoutubeWidth] = useState("");
  const [youtubeHeight, setYoutubeHeight] = useState("");

  const closeDialog = () => {
    setYoutubeLink("");
    setYoutubeHeight("");
    setYoutubeWidth("");
    setYoutubeDialogActive(false);
  };
  const dialog = useModalDialog(youtubeDialogActive, closeDialog);
  const uid = useUniqueId("editor-youtube");

  return (
    <dialog
      ref={dialog}
      className="youtube-dialog"
      open={canShowModal ? undefined : youtubeDialogActive}
      aria-labelledby={`${uid}-title`}
    >
      <button
        type="button"
        className="control close"
        aria-label="Close"
        onClick={closeDialog}
      >
        <svg className="icon" aria-hidden="true">
          <use xlinkHref={`${icons}#clear`}></use>
        </svg>
      </button>
      <h4 id={`${uid}-title`}>Insert YouTube video</h4>
      <div className="basic-form">
        <label htmlFor={`${uid}-link`}>Link</label>
        <input
          type="url"
          id={`${uid}-link`}
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        />
        <label htmlFor={`${uid}-width`}>Width</label>
        <input
          type="number"
          id={`${uid}-width`}
          value={youtubeWidth}
          onChange={(e) => setYoutubeWidth(e.target.value)}
          placeholder="640"
          style={{ gridColumnEnd: "-8" }}
        />
        <label htmlFor={`${uid}-height`}>Height</label>
        <input
          type="number"
          id={`${uid}-height`}
          value={youtubeHeight}
          onChange={(e) => setYoutubeHeight(e.target.value)}
          placeholder="480"
          style={{ gridColumnEnd: "-8" }}
        />
      </div>

      <footer>
        <div className="spacer" />
        <button
          onClick={() => {
            setYoutubeLink("");
            setYoutubeHeight("");
            setYoutubeWidth("");
            setYoutubeDialogActive(false);
          }}
        >
          Cancel
        </button>

        <button
          className="primary"
          disabled={!youtubeLink || youtubeLink.length < 20}
          onClick={async () => {
            let youtubeObj = {
              src: youtubeLink,
            };
            if (youtubeWidth && !isNaN(youtubeWidth))
              youtubeObj["width"] = Number(youtubeWidth);
            if (youtubeHeight && !isNaN(youtubeHeight))
              youtubeObj["height"] = Number(youtubeHeight);

            editor.commands.setYoutubeVideo(youtubeObj);

            setYoutubeLink("");
            setYoutubeHeight("");
            setYoutubeWidth("");
            setYoutubeDialogActive(false);
          }}
        >
          Insert video
        </button>
      </footer>
    </dialog>
  );
};

export default EditorToolbar;
