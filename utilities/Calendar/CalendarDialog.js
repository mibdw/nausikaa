import React, { useEffect, useRef } from "react";

import { useCalendar } from "./calendarUtils.js";
import { useUniqueId } from "../useUniqueId.js";

// showModal() keeps the focus inside the dialog, closes it with Escape and
// returns the focus afterwards. Browsers without it (Safari before 15.4,
// Firefox before 98) get an open dialog with a backdrop of its own.
const canShowModal =
  typeof HTMLDialogElement !== "undefined" &&
  typeof HTMLDialogElement.prototype.showModal === "function";

const CalendarDialog = () => {
  const { eventDetail, setEventDetail, icons } = useCalendar();
  const dialog = useRef(null);
  const titleId = useUniqueId("calendar-dialog-title");

  useEffect(() => {
    const element = dialog.current;
    if (!canShowModal || !element) return;

    if (!element.open) element.showModal();
    const onClose = () => setEventDetail(null);
    element.addEventListener("close", onClose);

    return () => {
      element.removeEventListener("close", onClose);
      if (element.open) element.close();
    };
  }, [setEventDetail]);

  const close = () =>
    canShowModal && dialog.current
      ? dialog.current.close()
      : setEventDetail(null);

  // A click on the backdrop lands on the dialog itself, outside its box
  const onDialogClick = (e) => {
    if (e.target !== dialog.current) return;
    const box = dialog.current.getBoundingClientRect();
    const inside =
      e.clientX >= box.left &&
      e.clientX <= box.right &&
      e.clientY >= box.top &&
      e.clientY <= box.bottom;
    if (!inside) close();
  };

  return (
    <>
      <dialog
        ref={dialog}
        className="calendar-dialog"
        open={canShowModal ? undefined : true}
        aria-labelledby={titleId}
        onClick={onDialogClick}
      >
        <div className="calendar-dialog-content">
          <button
            type="button"
            className="control close"
            aria-label="Close"
            onClick={close}
          >
            <svg className="icon" aria-hidden="true">
              <use xlinkHref={`${icons}#clear`}></use>
            </svg>
          </button>
          <h2 id={titleId}>
            {eventDetail === "new"
              ? "New event"
              : (eventDetail && eventDetail.title) || "Event"}
          </h2>
          <pre>{JSON.stringify(eventDetail, null, 2)}</pre>
        </div>
      </dialog>
      {!canShowModal && <div className="backdrop" onClick={close} />}
    </>
  );
};

export default CalendarDialog;
