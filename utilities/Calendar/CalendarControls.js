import React from "react";
import { add, sub, format, isAfter, isBefore, isSameMonth } from "date-fns";

import { useCalendar } from "./calendarUtils.js";

const TaskControls = ({ pos }) => {
  const {
    period,
    setPeriod,
    periodChanging,
    CALENDAR_VIEW_OPTIONS,
    CONTROL_YEAR_OPTIONS,
    icons,
    locale,
  } = useCalendar();

  let yearOptions = CONTROL_YEAR_OPTIONS.map((y) => (
    <option key={y} value={y}>
      {y}
    </option>
  ));

  return (
    <div className={`calendar-controls ${pos}`}>
      <div className="spacer" />
      <div className="calendar-month-controls">
        {!isSameMonth(new Date(), new Date(period)) && (
          <button
            type="button"
            className="knob"
            disabled={periodChanging}
            onClick={() => setPeriod(new Date())}
          >
            Today
          </button>
        )}

        <ul className="pagination no-toggle">
          {isAfter(
            new Date(period),
            new Date(CONTROL_YEAR_OPTIONS[0], 0, 1),
          ) ? (
            <li>
              <button
                type="button"
                className="knob"
                disabled={periodChanging}
                aria-label="Previous month"
                onClick={() =>
                  setPeriod(new Date(sub(new Date(period), { months: 1 })))
                }
              >
                <svg style={{ transform: "rotate(90deg)" }} aria-hidden="true">
                  <use xlinkHref={`${icons}#chevron-down`} />
                </svg>
              </button>
            </li>
          ) : (
            ""
          )}
          <li>
            <select
              aria-label="Month"
              disabled={periodChanging}
              value={format(new Date(period), "M")}
              onChange={(e) =>
                setPeriod(
                  new Date(
                    Number(format(new Date(period), "yyyy")),
                    Number(e.target.value) - 1,
                    1,
                  ),
                )
              }
              style={{ paddingRight: "2em", minWidth: "16ch" }}
            >
              {Array.from({ length: 12 }, (_, m) => (
                <option key={m} value={m + 1}>
                  {format(new Date(2000, m, 1), "LLLL", { locale })}
                </option>
              ))}
            </select>
          </li>
          <li>
            <select
              aria-label="Year"
              disabled={periodChanging}
              value={format(new Date(period), "yyyy")}
              onChange={(e) =>
                setPeriod(
                  new Date(
                    Number(e.target.value),
                    Number(format(new Date(period), "M")) - 1,
                    1,
                  ),
                )
              }
              style={{ paddingRight: "2em", minWidth: "10ch" }}
            >
              {yearOptions}
            </select>
          </li>
          {isBefore(
            new Date(period),
            new Date(
              CONTROL_YEAR_OPTIONS[CONTROL_YEAR_OPTIONS.length - 1],
              11,
              31,
            ),
          ) ? (
            <li>
              <button
                type="button"
                className="knob"
                disabled={periodChanging}
                aria-label="Next month"
                onClick={() =>
                  setPeriod(new Date(add(new Date(period), { months: 1 })))
                }
              >
                <svg style={{ transform: "rotate(-90deg)" }} aria-hidden="true">
                  <use xlinkHref={`${icons}#chevron-down`} />
                </svg>
              </button>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
};

export default TaskControls;
