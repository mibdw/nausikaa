import React from "react";

import { useCalendar } from "./calendarUtils.js";

const CalendarDialog = () => {
  const { eventDetail, setEventDetail } = useCalendar();

  return [
    <dialog className="calendar-dialog" open={eventDetail !== null}>
      <div className="calendar-dialog-content">
        <a
          className="control close"
          tabIndex="0"
          role="button"
          onClick={() => {
            setEventDetail(null);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              setEventDetail(null);
            }
          }}
        >
          <svg className="icon">
            <use xlinkHref="/images/icons.svg#clear"></use>
          </svg>
        </a>
        <h2>Event Title</h2>
        <pre>{JSON.stringify(eventDetail, null, 2)}</pre>
      </div>
    </dialog>,
    <div className="backdrop" onClick={() => setEventDetail(null)} />,
  ];
};

export default CalendarDialog;
