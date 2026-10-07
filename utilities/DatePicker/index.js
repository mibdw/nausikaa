import React, { useEffect, useRef, useState } from "react";
import {
  addDays,
  addMonths,
  endOfISOWeek,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfISOWeek,
  startOfMonth,
} from "date-fns";

// The days of the week, Monday first, in the language of the date picker
const weekDays = (locale) => {
  const monday = startOfISOWeek(new Date());
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i)).map((day) => ({
    short: format(day, "EEEEEE", { locale }),
    full: format(day, "EEEE", { locale }),
  }));
};

const calendarDays = (month) => {
  const days = [];
  let day = startOfISOWeek(startOfMonth(month));
  const end = endOfISOWeek(endOfMonth(month));

  while (day <= end) {
    days.push(day);
    day = addDays(day, 1);
  }

  return days;
};

const DatePickerPanel = ({
  startDate,
  endDate,
  inline,
  onApply,
  onClear,
  onChange,
  locale,
}) => {
  const initialMonth = startDate || new Date();
  const [leftMonth, setLeftMonth] = useState(initialMonth);
  const [hoverDate, setHoverDate] = useState(null);
  const [draftStart, setDraftStart] = useState(startDate || null);
  const [draftEnd, setDraftEnd] = useState(endDate || null);

  useEffect(() => {
    setDraftStart(startDate || null);
    setDraftEnd(endDate || null);
  }, [startDate, endDate]);

  const pick = (nextStart, nextEnd) => {
    setDraftStart(nextStart);
    setDraftEnd(nextEnd);
    if (inline) onChange(nextStart, nextEnd);
  };

  const selectDate = (date) => {
    if (!draftStart || draftEnd) {
      pick(date, null);
    } else if (isBefore(date, draftStart)) {
      pick(date, draftStart);
    } else {
      pick(draftStart, date);
    }
  };

  const setStartDate = (value) => {
    const nextStart = value ? parseISO(value) : null;
    if (nextStart && draftEnd && isAfter(nextStart, draftEnd)) {
      pick(draftEnd, nextStart);
    } else {
      pick(nextStart, draftEnd);
    }
  };

  const setEndDate = (value) => {
    const nextEnd = value ? parseISO(value) : null;
    if (nextEnd && draftStart && isBefore(nextEnd, draftStart)) {
      pick(nextEnd, draftStart);
    } else {
      pick(draftStart, nextEnd);
    }
  };

  const isInRange = (date) => {
    const rangeEnd = draftEnd || hoverDate;
    return (
      draftStart &&
      rangeEnd &&
      isAfter(date, draftStart) &&
      isBefore(date, rangeEnd)
    );
  };

  const renderCalendar = (month, side) => (
    <div className={`calendar-grid ${side}`}>
      <div className="calendar-weekdays">
        {weekDays(locale).map((day) => (
          <div key={day.full}>
            <span aria-hidden="true">{day.short}</span>
            <span className="visually-hidden">{day.full}</span>
          </div>
        ))}
      </div>
      <div className="calendar-days">
        {calendarDays(month).map((day) => {
          const selectedStart = draftStart && isSameDay(day, draftStart);
          const selectedEnd = draftEnd && isSameDay(day, draftEnd);
          const selected = selectedStart || selectedEnd;

          // The days of the months next to it only keep the grid in place:
          // they can't be seen, so they can't be reached either
          if (!isSameMonth(day, month)) {
            return (
              <span
                key={format(day, "yyyy-MM-dd")}
                className="calendar-day other-month"
                aria-hidden="true"
              />
            );
          }

          return (
            <button
              key={format(day, "yyyy-MM-dd")}
              type="button"
              className={`calendar-day ${
                isSameDay(day, new Date()) ? "today" : ""
              } ${
                selected ? "selected" : ""
              } ${selectedStart ? "selected-start" : ""} ${
                selectedEnd ? "selected-end" : ""
              } ${isInRange(day) ? "in-range" : ""}`}
              onClick={() => selectDate(day)}
              onMouseEnter={() => setHoverDate(day)}
              onMouseLeave={() => setHoverDate(null)}
              aria-label={format(day, "PPPP", { locale })}
              aria-pressed={selected ? "true" : "false"}
              aria-current={isSameDay(day, new Date()) ? "date" : undefined}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );

  const rightMonth = addMonths(leftMonth, 1);

  return (
    <div className="date-picker-panel panel arrow top left">
      <header>
        <div className="left">
          <button
            type="button"
            className="previous"
            onClick={() => setLeftMonth(addMonths(leftMonth, -1))}
            aria-label="Previous month"
          >
            ‹
          </button>
          <strong>{format(leftMonth, "LLLL yyyy", { locale })}</strong>
        </div>
        <div className="right">
          <strong>{format(rightMonth, "LLLL yyyy", { locale })}</strong>
          <button
            type="button"
            className="next"
            onClick={() => setLeftMonth(addMonths(leftMonth, 1))}
            aria-label="Next month"
          >
            ›
          </button>
        </div>
      </header>
      <div className="calendars">
        {renderCalendar(leftMonth, "left")}
        {renderCalendar(rightMonth, "right")}
      </div>
      <footer>
        <button
          type="button"
          className="secondary"
          onClick={() => setLeftMonth(startOfMonth(new Date()))}
        >
          Today
        </button>
        <input
          type="date"
          aria-label="From date"
          value={draftStart ? format(draftStart, "yyyy-MM-dd") : ""}
          onChange={(event) => setStartDate(event.target.value)}
        />
        <input
          type="date"
          aria-label="To date"
          value={draftEnd ? format(draftEnd, "yyyy-MM-dd") : ""}
          onChange={(event) => setEndDate(event.target.value)}
        />
        <div className="spacer" />
        <button type="button" onClick={() => { pick(null, null); onClear(); }}>
          Clear
        </button>
        {!inline && (
          <button type="button" className="primary" onClick={() => onApply(draftStart, draftEnd)}>
            Apply
          </button>
        )}
      </footer>
    </div>
  );
};

const DatePicker = ({
  startDate = null,
  endDate = null,
  onChange = () => {},
  inline = false,
  label = "Date range",
  icons = "/images/icons.svg",
  // A date-fns locale, for the names of the days and months
  locale,
}) => {
  const [open, setOpen] = useState(false);
  const wrapper = useRef(null);
  const trigger = useRef(null);
  const displayText =
    startDate && endDate
      ? `${format(startDate, "PP", { locale })} – ${format(endDate, "PP", { locale })}`
      : startDate
        ? format(startDate, "PP", { locale })
        : label;

  // Escape closes the panel and puts the focus back on the button
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        if (trigger.current) trigger.current.focus();
      }
    };
    const element = wrapper.current;
    element.addEventListener("keydown", onKeyDown);
    return () => element.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (inline) {
    return (
      <div className="date-picker date-picker-inline">
        <DatePickerPanel
          startDate={startDate}
          endDate={endDate}
          inline
          locale={locale}
          onChange={onChange}
          onClear={() => onChange(null, null)}
        />
      </div>
    );
  }

  return (
    <div className="date-picker date-picker-dropdown dropdown" ref={wrapper}>
      <button
        type="button"
        ref={trigger}
        className="knob transparent"
        aria-expanded={open}
        aria-label={startDate ? `${label}: ${displayText}` : undefined}
        onClick={() => setOpen(!open)}
      >
        {displayText}
        <svg className="icon last" aria-hidden="true"><use xlinkHref={`${icons}#chevron-down`} /></svg>
      </button>
      {open && (
        <DatePickerPanel
          startDate={startDate}
          endDate={endDate}
          locale={locale}
          onApply={(nextStart, nextEnd) => { onChange(nextStart, nextEnd); setOpen(false); }}
          onClear={() => { onChange(null, null); setOpen(false); }}
        />
      )}
    </div>
  );
};

export { DatePicker };
export default DatePicker;
