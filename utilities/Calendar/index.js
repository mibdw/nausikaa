import React, { useState, useEffect } from "react";
import {
  startOfMonth,
  startOfISOWeek,
  endOfMonth,
  endOfISOWeek,
  isBefore,
} from "date-fns";

import {
  DEFAULT_CALENDAR_VIEW,
  CALENDAR_VIEW_OPTIONS,
  MAX_EVENTS_PER_DAY_MONTHLY,
  MAX_EVENTS_PER_DAY_WEEKLY,
  CONTROL_YEAR_OPTIONS,
  CalendarContext,
} from "./calendarContext.js";

import CalendarMonth from "./CalendarMonth.js";
import CalendarWeek from "./CalendarWeek.js";
import CalendarControls from "./CalendarControls.js";
import CalendarDialog from "./CalendarDialog.js";

const TRANSITION_TIMEOUT_MS = 300;

const Calendar = ({ fetchEvents, createEvent, updateEvent, deleteEvent }) => {
  const [period, setPeriod] = useState(new Date());
  const [periods, setPeriods] = useState([]);
  const [periodChanging, setPeriodChanging] = useState(false);
  const [eventDetail, setEventDetail] = useState(null);
  const [calendarView, setCalendarView] = useState("month");

  useEffect(() => {
    if (periods.length === 2) {
      const timeout = setTimeout(() => {
        setPeriods((current) => {
          const nextPeriod = current.find((p) => !p.outgoing);
          if (!nextPeriod) return current;
          return [{ ...nextPeriod, incoming: false }];
        });
        setPeriodChanging(false);
      }, TRANSITION_TIMEOUT_MS);

      return () => clearTimeout(timeout);
    }
  }, [periods]);

  useEffect(() => {
    (async () => {
      const newPeriod =
        calendarView == "week"
          ? startOfISOWeek(new Date(period))
          : startOfMonth(new Date(period)).toISOString();
      const startDate =
        calendarView == "week"
          ? newPeriod
          : startOfISOWeek(new Date(newPeriod)).toISOString();
      const endDate =
        calendarView == "week"
          ? endOfISOWeek(new Date(startDate))
          : endOfISOWeek(endOfMonth(new Date(startDate))).toISOString();

      const eventList = await fetchEvents(startDate, endDate);

      setPeriods((currentPeriods) => {
        if (!currentPeriods || currentPeriods.length == 0) {
          return [
            {
              start: newPeriod,
              incoming: false,
              outgoing: false,
              isBefore: false,
              eventList,
            },
          ];
        } else if (
          currentPeriods.length == 1 &&
          currentPeriods[0].start != newPeriod
        ) {
          setPeriodChanging(true);
          return [
            {
              ...currentPeriods[0],
              outgoing: true,
              isBefore: isBefore(currentPeriods[0].start, period),
            },
            {
              start: newPeriod,
              incoming: true,
              outgoing: false,
              isBefore: isBefore(period, currentPeriods[0].start),
              eventList,
            },
          ];
        } else if (currentPeriods.length == 2) {
          setPeriodChanging(false);

          let newPeriods = currentPeriods.filter((tP) => tP.start == newPeriod);
          newPeriods[0].incoming = false;
          return newPeriods;
        }

        return currentPeriods;
      });
    })();
  }, [period, fetchEvents, calendarView]);

  return (
    <CalendarContext.Provider
      value={{
        period,
        setPeriod,
        periodChanging,
        setPeriodChanging,
        eventDetail,
        setEventDetail,
        calendarView,
        setCalendarView,
        createEvent,
        updateEvent,
        deleteEvent,
        DEFAULT_CALENDAR_VIEW,
        CALENDAR_VIEW_OPTIONS,
        MAX_EVENTS_PER_DAY_MONTHLY,
        MAX_EVENTS_PER_DAY_WEEKLY,
        CONTROL_YEAR_OPTIONS,
      }}
    >
      <div className="calendar">
        <CalendarControls />

        <div className="calendar-wrapper">
          {periods.map((periodData) => {
            return calendarView == "week" ? (
              <CalendarWeek key={periodData.start} {...{ periodData }} />
            ) : (
              <CalendarMonth key={periodData.start} {...{ periodData }} />
            );
          })}
        </div>

        {eventDetail && <CalendarDialog />}
      </div>
    </CalendarContext.Provider>
  );
};

export default Calendar;
