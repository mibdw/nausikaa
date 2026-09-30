import React, { useEffect, useState } from "react";
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

const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

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
        {weekDays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="calendar-days">
        {calendarDays(month).map((day) => {
          const selectedStart = draftStart && isSameDay(day, draftStart);
          const selectedEnd = draftEnd && isSameDay(day, draftEnd);
          const selected = selectedStart || selectedEnd;

          return (
            <button
              key={format(day, "yyyy-MM-dd")}
              type="button"
              className={`calendar-day ${
                !isSameMonth(day, month) ? "other-month" : ""
              } ${isSameDay(day, new Date()) ? "today" : ""} ${
                selected ? "selected" : ""
              } ${selectedStart ? "selected-start" : ""} ${
                selectedEnd ? "selected-end" : ""
              } ${isInRange(day) ? "in-range" : ""}`}
              onClick={() => selectDate(day)}
              onMouseEnter={() => setHoverDate(day)}
              onMouseLeave={() => setHoverDate(null)}
              aria-label={format(day, "MMMM d, yyyy")}
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
          <strong>{format(leftMonth, "MMMM yyyy")}</strong>
        </div>
        <div className="right">
          <strong>{format(rightMonth, "MMMM yyyy")}</strong>
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
}) => {
  const [open, setOpen] = useState(false);
  const displayText =
    startDate && endDate
      ? `${format(startDate, "MMM d, yyyy")} – ${format(endDate, "MMM d, yyyy")}`
      : startDate
        ? format(startDate, "MMM d, yyyy")
        : label;

  if (inline) {
    return (
      <div className="date-picker date-picker-inline">
        <DatePickerPanel
          startDate={startDate}
          endDate={endDate}
          inline
          onChange={onChange}
          onClear={() => onChange(null, null)}
        />
      </div>
    );
  }

  return (
    <div className="date-picker date-picker-dropdown dropdown">
      <a
        href="#date-picker"
        className="knob transparent"
        role="button"
        tabIndex="0"
        aria-expanded={open}
        onClick={(event) => { event.preventDefault(); setOpen(!open); }}
      >
        {displayText}
        <svg className="icon last"><use xlinkHref="/images/icons.svg#chevron-down" /></svg>
      </a>
      {open && (
        <DatePickerPanel
          startDate={startDate}
          endDate={endDate}
          onApply={(nextStart, nextEnd) => { onChange(nextStart, nextEnd); setOpen(false); }}
          onClear={() => { onChange(null, null); setOpen(false); }}
        />
      )}
    </div>
  );
};

export default DatePicker;
