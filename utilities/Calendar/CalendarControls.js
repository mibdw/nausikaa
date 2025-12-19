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
          <a
            tabIndex="0"
            role="button"
            onClick={() =>
              !periodChanging ? setPeriod(new Date()) : undefined
            }
            className={`knob ${periodChanging ? "disabled" : ""}`}
          >
            Today
          </a>
        )}

        <ul className="pagination no-toggle">
          {isAfter(new Date(period), new Date(CONTROL_YEAR_OPTIONS[0], 0, 1)) ? (
            <li>
              <a
                className={`knob ${periodChanging ? "disabled" : ""}`}
                tabIndex="0"
                role="button"
                onClick={() =>
                  setPeriod(new Date(sub(new Date(period), { months: 1 })))
                }
              >
                <svg style={{ transform: "rotate(90deg)" }}>
                  <use xlinkHref="/images/icons.svg#chevron-down" />
                </svg>
              </a>
            </li>
          ) : (
            ""
          )}
          <li>
            <select
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
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">Juli</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </li>
          <li>
            <select
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
              <a
                className={`knob ${periodChanging ? "disabled" : ""}`}
                tabIndex="0"
                onClick={() =>
                  setPeriod(new Date(add(new Date(period), { months: 1 })))
                }
              >
                <svg style={{ transform: "rotate(-90deg)" }}>
                  <use xlinkHref="/images/icons.svg#chevron-down" />
                </svg>
              </a>
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
