import { t as toDate, c as constructFrom, m as millisecondsInHour, b as millisecondsInMinute, r as reactExports, j as jsxRuntimeExports, a as clientExports } from "./assets/addLeadingZeros-DEClPGYx.js";
import { j as format, a as addMonths, d as startOfMonth, k as isSameDay, g as isSameMonth, h as isAfter, i as isBefore, c as startOfISOWeek, e as endOfISOWeek, f as endOfMonth, b as addDays, s as subDays } from "./assets/subDays-DIUeprOL.js";
function parseISO(argument, options) {
  const invalidDate = () => constructFrom(options?.in, NaN);
  const additionalDigits = 2;
  const dateStrings = splitDateString(argument);
  let date;
  if (dateStrings.date) {
    const parseYearResult = parseYear(dateStrings.date, additionalDigits);
    date = parseDate(parseYearResult.restDateString, parseYearResult.year);
  }
  if (!date || isNaN(+date)) return invalidDate();
  const timestamp = +date;
  let time = 0;
  let offset;
  if (dateStrings.time) {
    time = parseTime(dateStrings.time);
    if (isNaN(time)) return invalidDate();
  }
  if (dateStrings.timezone) {
    offset = parseTimezone(dateStrings.timezone);
    if (isNaN(offset)) return invalidDate();
  } else {
    const tmpDate = new Date(timestamp + time);
    const result = toDate(0, options?.in);
    result.setFullYear(
      tmpDate.getUTCFullYear(),
      tmpDate.getUTCMonth(),
      tmpDate.getUTCDate()
    );
    result.setHours(
      tmpDate.getUTCHours(),
      tmpDate.getUTCMinutes(),
      tmpDate.getUTCSeconds(),
      tmpDate.getUTCMilliseconds()
    );
    return result;
  }
  return toDate(timestamp + time + offset, options?.in);
}
const patterns = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
};
const dateRegex = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
const timeRegex = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
const timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function splitDateString(dateString) {
  const dateStrings = {};
  const array = dateString.split(patterns.dateTimeDelimiter);
  let timeString;
  if (array.length > 2) {
    return dateStrings;
  }
  if (/:/.test(array[0])) {
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
    if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
      dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
      timeString = dateString.substr(
        dateStrings.date.length,
        dateString.length
      );
    }
  }
  if (timeString) {
    const token = patterns.timezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], "");
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }
  return dateStrings;
}
function parseYear(dateString, additionalDigits) {
  const regex = new RegExp(
    "^(?:(\\d{4}|[+-]\\d{" + (4 + additionalDigits) + "})|(\\d{2}|[+-]\\d{" + (2 + additionalDigits) + "})$)"
  );
  const captures = dateString.match(regex);
  if (!captures) return { year: NaN, restDateString: "" };
  const year = captures[1] ? parseInt(captures[1]) : null;
  const century = captures[2] ? parseInt(captures[2]) : null;
  return {
    year: century === null ? year : century * 100,
    restDateString: dateString.slice((captures[1] || captures[2]).length)
  };
}
function parseDate(dateString, year) {
  if (year === null) return /* @__PURE__ */ new Date(NaN);
  const captures = dateString.match(dateRegex);
  if (!captures) return /* @__PURE__ */ new Date(NaN);
  const isWeekDate = !!captures[4];
  const dayOfYear = parseDateUnit(captures[1]);
  const month = parseDateUnit(captures[2]) - 1;
  const day = parseDateUnit(captures[3]);
  const week = parseDateUnit(captures[4]);
  const dayOfWeek = parseDateUnit(captures[5]) - 1;
  if (isWeekDate) {
    if (!validateWeekDate(year, week, dayOfWeek)) {
      return /* @__PURE__ */ new Date(NaN);
    }
    return dayOfISOWeekYear(year, week, dayOfWeek);
  } else {
    const date = /* @__PURE__ */ new Date(0);
    if (!validateDate(year, month, day) || !validateDayOfYearDate(year, dayOfYear)) {
      return /* @__PURE__ */ new Date(NaN);
    }
    date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
    return date;
  }
}
function parseDateUnit(value) {
  return value ? parseInt(value) : 1;
}
function parseTime(timeString) {
  const captures = timeString.match(timeRegex);
  if (!captures) return NaN;
  const hours = parseTimeUnit(captures[1]);
  const minutes = parseTimeUnit(captures[2]);
  const seconds = parseTimeUnit(captures[3]);
  if (!validateTime(hours, minutes, seconds)) {
    return NaN;
  }
  return hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * 1e3;
}
function parseTimeUnit(value) {
  return value && parseFloat(value.replace(",", ".")) || 0;
}
function parseTimezone(timezoneString) {
  if (timezoneString === "Z") return 0;
  const captures = timezoneString.match(timezoneRegex);
  if (!captures) return 0;
  const sign = captures[1] === "+" ? -1 : 1;
  const hours = parseInt(captures[2]);
  const minutes = captures[3] && parseInt(captures[3]) || 0;
  if (!validateTimezone(hours, minutes)) {
    return NaN;
  }
  return sign * (hours * millisecondsInHour + minutes * millisecondsInMinute);
}
function dayOfISOWeekYear(isoWeekYear, week, day) {
  const date = /* @__PURE__ */ new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  const fourthOfJanuaryDay = date.getUTCDay() || 7;
  const diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}
const daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}
function validateDate(year, month, date) {
  return month >= 0 && month <= 11 && date >= 1 && date <= (daysInMonths[month] || (isLeapYearIndex(year) ? 29 : 28));
}
function validateDayOfYearDate(year, dayOfYear) {
  return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year) ? 366 : 365);
}
function validateWeekDate(_year, week, day) {
  return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}
function validateTime(hours, minutes, seconds) {
  if (hours === 24) {
    return minutes === 0 && seconds === 0;
  }
  return seconds >= 0 && seconds < 60 && minutes >= 0 && minutes < 60 && hours >= 0 && hours < 25;
}
function validateTimezone(_hours, minutes) {
  return minutes >= 0 && minutes <= 59;
}
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
  onChange
}) => {
  const initialMonth = startDate || /* @__PURE__ */ new Date();
  const [leftMonth, setLeftMonth] = reactExports.useState(initialMonth);
  const [hoverDate, setHoverDate] = reactExports.useState(null);
  const [draftStart, setDraftStart] = reactExports.useState(startDate || null);
  const [draftEnd, setDraftEnd] = reactExports.useState(endDate || null);
  reactExports.useEffect(() => {
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
    return draftStart && rangeEnd && isAfter(date, draftStart) && isBefore(date, rangeEnd);
  };
  const renderCalendar = (month, side) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `calendar-grid ${side}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "calendar-weekdays", children: weekDays.map((day) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: day }, day)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "calendar-days", children: calendarDays(month).map((day) => {
      const selectedStart = draftStart && isSameDay(day, draftStart);
      const selectedEnd = draftEnd && isSameDay(day, draftEnd);
      const selected = selectedStart || selectedEnd;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: `calendar-day ${!isSameMonth(day, month) ? "other-month" : ""} ${isSameDay(day, /* @__PURE__ */ new Date()) ? "today" : ""} ${selected ? "selected" : ""} ${selectedStart ? "selected-start" : ""} ${selectedEnd ? "selected-end" : ""} ${isInRange(day) ? "in-range" : ""}`,
          onClick: () => selectDate(day),
          onMouseEnter: () => setHoverDate(day),
          onMouseLeave: () => setHoverDate(null),
          "aria-label": format(day, "MMMM d, yyyy"),
          children: format(day, "d")
        },
        format(day, "yyyy-MM-dd")
      );
    }) })
  ] });
  const rightMonth = addMonths(leftMonth, 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "date-picker-panel panel arrow top left", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "previous",
            onClick: () => setLeftMonth(addMonths(leftMonth, -1)),
            "aria-label": "Previous month",
            children: "‹"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: format(leftMonth, "MMMM yyyy") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: format(rightMonth, "MMMM yyyy") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "next",
            onClick: () => setLeftMonth(addMonths(leftMonth, 1)),
            "aria-label": "Next month",
            children: "›"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "calendars", children: [
      renderCalendar(leftMonth, "left"),
      renderCalendar(rightMonth, "right")
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "secondary",
          onClick: () => setLeftMonth(startOfMonth(/* @__PURE__ */ new Date())),
          children: "Today"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "date",
          "aria-label": "From date",
          value: draftStart ? format(draftStart, "yyyy-MM-dd") : "",
          onChange: (event) => setStartDate(event.target.value)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "date",
          "aria-label": "To date",
          value: draftEnd ? format(draftEnd, "yyyy-MM-dd") : "",
          onChange: (event) => setEndDate(event.target.value)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spacer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
        pick(null, null);
        onClear();
      }, children: "Clear" }),
      !inline && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "primary", onClick: () => onApply(draftStart, draftEnd), children: "Apply" })
    ] })
  ] });
};
const DatePicker = ({
  startDate = null,
  endDate = null,
  onChange = () => {
  },
  inline = false,
  label = "Date range"
}) => {
  const [open, setOpen] = reactExports.useState(false);
  const displayText = startDate && endDate ? `${format(startDate, "MMM d, yyyy")} – ${format(endDate, "MMM d, yyyy")}` : startDate ? format(startDate, "MMM d, yyyy") : label;
  if (inline) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "date-picker date-picker-inline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      DatePickerPanel,
      {
        startDate,
        endDate,
        inline: true,
        onChange,
        onClear: () => onChange(null, null)
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "date-picker date-picker-dropdown dropdown", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: "#date-picker",
        className: "knob transparent",
        role: "button",
        tabIndex: "0",
        "aria-expanded": open,
        onClick: (event) => {
          event.preventDefault();
          setOpen(!open);
        },
        children: [
          displayText,
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "icon last", children: /* @__PURE__ */ jsxRuntimeExports.jsx("use", { xlinkHref: "/images/icons.svg#chevron-down" }) })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DatePickerPanel,
      {
        startDate,
        endDate,
        onApply: (nextStart, nextEnd) => {
          onChange(nextStart, nextEnd);
          setOpen(false);
        },
        onClear: () => {
          onChange(null, null);
          setOpen(false);
        }
      }
    )
  ] });
};
const InlineDemo = () => {
  const [range, setRange] = reactExports.useState({ start: subDays(/* @__PURE__ */ new Date(), 3), end: addDays(/* @__PURE__ */ new Date(), 5) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { inline: true, startDate: range.start, endDate: range.end, onChange: (start, end) => setRange({ start, end }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "date-picker-output", children: range.start && range.end ? `Selected: ${format(range.start, "MMMM d, yyyy")} – ${format(range.end, "MMMM d, yyyy")}` : "Choose a date range." })
  ] });
};
const DropdownDemo = () => {
  const [range, setRange] = reactExports.useState({ start: null, end: null });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "date-picker-demo-dropdown", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { startDate: range.start, endDate: range.end, onChange: (start, end) => setRange({ start, end }), label: "Filter by date" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "date-picker-output", children: range.start && range.end ? `Filter: ${format(range.start, "MMMM d, yyyy")} – ${format(range.end, "MMMM d, yyyy")}` : "Open the control and apply a range." })
  ] });
};
const inlineRoot = document.getElementById("date-picker-demo-inline");
if (inlineRoot) clientExports.createRoot(inlineRoot).render(/* @__PURE__ */ jsxRuntimeExports.jsx(InlineDemo, {}));
const dropdownRoot = document.getElementById("date-picker-demo-dropdown");
if (dropdownRoot) clientExports.createRoot(dropdownRoot).render(/* @__PURE__ */ jsxRuntimeExports.jsx(DropdownDemo, {}));
//# sourceMappingURL=date-picker-demo.js.map
