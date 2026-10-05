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

const CalendarMonth = ({ periodData }) => {
  const { start, incoming, outgoing, eventList, isBefore: isBef } = periodData;
  const [incomingDone, setIncomingDone] = useState(false);

  useEffect(() => {
    if (incoming) {
      setTimeout(() => {
        setIncomingDone(true);
      }, 10);
    }
  }, [incoming]);

  let days = [];
  let day = startOfISOWeek(new Date(start)).toISOString();
  const end = endOfISOWeek(endOfMonth(new Date(start))).toISOString();

  while (isBefore(new Date(day), new Date(end))) {
    days.push(
      <CalendarDay
        key={format(new Date(day), "yyyy-MM-dd")}
        {...{
          current: start,
          day,
          end,
          eventList: eventList.filter(
            (event) =>
              event.due &&
              event.due &&
              isSameDay(new Date(event.due), new Date(day)),
          ),
        }}
      />,
    );

    day = add(new Date(day), { days: 1 });
  }

  return (
    <div
      className={`calendar-month ${incoming && !incomingDone ? (isBef ? "incoming-left" : "incoming-right") : ""} ${outgoing ? (isBef ? "outgoing-left" : "outgoing-right") : ""}`}
    >
      <div className="weekday-name">Mon</div>
      <div className="weekday-name">Tue</div>
      <div className="weekday-name">Wed</div>
      <div className="weekday-name">Thu</div>
      <div className="weekday-name">Fri</div>
      <div className="weekday-name">Sat</div>
      <div className="weekday-name">Sun</div>

      {days}
    </div>
  );
};

export default CalendarMonth;
