import React, { useEffect, useState } from "react";
import {
  isBefore,
  format,
  add,
  startOfISOWeek,
  endOfISOWeek,
  endOfMonth,
  isSameDay,
} from "date-fns";

import CalendarDay from "./CalendarDay.js";
import { useCalendar } from "./calendarUtils.js";

// The names of the days above the columns: short on screen, in full for
// screen readers, in the language of the calendar.
export const WeekdayNames = () => {
  const { locale } = useCalendar();
  const monday = startOfISOWeek(new Date());

  return (
    <thead>
      <tr>
        {Array.from({ length: 7 }, (_, i) => {
          const day = add(monday, { days: i });
          return (
            <th scope="col" className="weekday-name" key={i}>
              <span aria-hidden="true">{format(day, "EEE", { locale })}</span>
              <span className="visually-hidden">
                {format(day, "EEEE", { locale })}
              </span>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

// A table of the days from start to end, a row for every week.
export const CalendarTable = ({ periodData, end }) => {
  const { start, incoming, outgoing, eventList, isBefore: isBef } = periodData;
  const [incomingDone, setIncomingDone] = useState(false);

  useEffect(() => {
    if (incoming) {
      setTimeout(() => {
        setIncomingDone(true);
      }, 10);
    }
  }, [incoming]);

  let weeks = [];
  let day = startOfISOWeek(new Date(start)).toISOString();

  while (isBefore(new Date(day), new Date(end))) {
    if (weeks.length === 0 || weeks[weeks.length - 1].length === 7) {
      weeks.push([]);
    }

    weeks[weeks.length - 1].push(
      <CalendarDay
        key={format(new Date(day), "yyyy-MM-dd")}
        {...{
          current: start,
          day,
          end,
          eventList: eventList.filter(
            (event) =>
              event.due && isSameDay(new Date(event.due), new Date(day)),
          ),
        }}
      />,
    );

    day = add(new Date(day), { days: 1 });
  }

  return (
    <table
      className={`calendar-month ${incoming && !incomingDone ? (isBef ? "incoming-left" : "incoming-right") : ""} ${outgoing ? (isBef ? "outgoing-left" : "outgoing-right") : ""}`}
      aria-hidden={outgoing ? "true" : undefined}
    >
      <WeekdayNames />
      <tbody>
        {weeks.map((week, i) => (
          <tr key={i}>{week}</tr>
        ))}
      </tbody>
    </table>
  );
};

const CalendarMonth = ({ periodData }) => (
  <CalendarTable
    periodData={periodData}
    end={endOfISOWeek(endOfMonth(new Date(periodData.start))).toISOString()}
  />
);

export default CalendarMonth;
