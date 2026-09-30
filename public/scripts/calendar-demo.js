import { t as toDate, c as constructFrom, r as reactExports, a as clientExports, j as jsxRuntimeExports$1 } from "./assets/addLeadingZeros-DEClPGYx.js";
import { a as addMonths, b as addDays, n as normalizeDates, s as subDays, c as startOfISOWeek, d as startOfMonth, e as endOfISOWeek, f as endOfMonth, i as isBefore, g as isSameMonth, h as isAfter, j as format, k as isSameDay, l as startOfDay } from "./assets/subDays-DIUeprOL.js";
function add(date, duration, options) {
  const {
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0
  } = duration;
  const _date = toDate(date, options?.in);
  const dateWithMonths = months || years ? addMonths(_date, months + years * 12) : _date;
  const dateWithDays = days || weeks ? addDays(dateWithMonths, days + weeks * 7) : dateWithMonths;
  const minutesToAdd = minutes + hours * 60;
  const secondsToAdd = seconds + minutesToAdd * 60;
  const msToAdd = secondsToAdd * 1e3;
  return constructFrom(date, +dateWithDays + msToAdd);
}
function normalizeInterval(context, interval) {
  const [start, end] = normalizeDates(context, interval.start, interval.end);
  return { start, end };
}
function eachDayOfInterval(interval, options) {
  const { start, end } = normalizeInterval(options?.in, interval);
  let reversed = +start > +end;
  const endTime = reversed ? +start : +end;
  const date = reversed ? end : start;
  date.setHours(0, 0, 0, 0);
  let step = 1;
  const dates = [];
  while (+date <= endTime) {
    dates.push(constructFrom(start, date));
    date.setDate(date.getDate() + step);
    date.setHours(0, 0, 0, 0);
  }
  return reversed ? dates.reverse() : dates;
}
function subMonths(date, amount, options) {
  return addMonths(date, -amount, options);
}
function sub(date, duration, options) {
  const {
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0
  } = duration;
  const withoutMonths = subMonths(date, months + years * 12, options);
  const withoutDays = subDays(withoutMonths, days + weeks * 7, options);
  const minutesToSub = minutes + hours * 60;
  const secondsToSub = seconds + minutesToSub * 60;
  const msToSub = secondsToSub * 1e3;
  return constructFrom(date, +withoutDays - msToSub);
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production = {};
var hasRequiredReactJsxRuntime_production;
function requireReactJsxRuntime_production() {
  if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
  hasRequiredReactJsxRuntime_production = 1;
  var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
  function jsxProd(type, config, maybeKey) {
    var key = null;
    void 0 !== maybeKey && (key = "" + maybeKey);
    void 0 !== config.key && (key = "" + config.key);
    if ("key" in config) {
      maybeKey = {};
      for (var propName in config)
        "key" !== propName && (maybeKey[propName] = config[propName]);
    } else maybeKey = config;
    config = maybeKey.ref;
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type,
      key,
      ref: void 0 !== config ? config : null,
      props: maybeKey
    };
  }
  reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
  reactJsxRuntime_production.jsx = jsxProd;
  reactJsxRuntime_production.jsxs = jsxProd;
  return reactJsxRuntime_production;
}
var hasRequiredJsxRuntime;
function requireJsxRuntime() {
  if (hasRequiredJsxRuntime) return jsxRuntime.exports;
  hasRequiredJsxRuntime = 1;
  {
    jsxRuntime.exports = requireReactJsxRuntime_production();
  }
  return jsxRuntime.exports;
}
var jsxRuntimeExports = requireJsxRuntime();
const DEFAULT_CALENDAR_VIEW = "month";
const CALENDAR_VIEW_OPTIONS = [
  { value: "month", label: "Month" },
  { value: "week", label: "Week" },
  { value: "day", label: "Day" }
];
const MAX_EVENTS_PER_DAY_MONTHLY = 7;
const MAX_EVENTS_PER_DAY_WEEKLY = 25;
const CONTROL_YEAR_OPTIONS = Array.from(
  { length: 61 },
  (_, i) => (/* @__PURE__ */ new Date()).getFullYear() - 30 + i
);
const CalendarContext = reactExports.createContext();
const useCalendar = () => {
  const ctx = reactExports.useContext(CalendarContext);
  if (!ctx) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return ctx;
};
const CalendarDay = ({ current, day, end, eventList }) => {
  const { setEventDetail, MAX_EVENTS_PER_DAY_MONTHLY: MAX_EVENTS_PER_DAY_MONTHLY2 } = useCalendar();
  const relatedEventsEnter = (slug) => {
    const relatedEvents = document.querySelectorAll(
      `.calendar-event-slug-${slug}`
    );
    if (relatedEvents && relatedEvents.length > 1) {
      for (let t in relatedEvents) {
        if (relatedEvents[t] && relatedEvents[t].classList) {
          relatedEvents[t].classList.add("hover");
        }
      }
    }
  };
  const relatedEventsLeave = (slug) => {
    const relatedEvents = document.querySelectorAll(
      `.calendar-event-slug-${slug}`
    );
    if (relatedEvents && relatedEvents.length > 1) {
      for (let t in relatedEvents) {
        if (relatedEvents[t] && relatedEvents[t].classList) {
          relatedEvents[t].classList.remove("hover");
        }
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `calendar-day ${isSameMonth(new Date(day), new Date(current)) ? "same-month" : "other-month"} ${isSameDay(new Date(day), /* @__PURE__ */ new Date()) ? "today" : ""} weekday-${format(
        new Date(day),
        "i"
      )} ${isAfter(new Date(day), new Date(sub(new Date(end), { weeks: 1 }))) ? "last-week" : ""}`,
      onClick: (e) => {
        if (e.target.classList && e.target.classList.contains("calendar-day")) {
          setEventDetail("new");
        }
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "date-number", children: format(new Date(day), "d") }),
        eventList && eventList.length > 0 && eventList.filter((_, i) => i < MAX_EVENTS_PER_DAY_MONTHLY2).map((event) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "calendar-event-wrapper", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              title: event.title,
              className: `calendar-event calendar-event-slug-${event.slug} ${event.allday ? "tag" : ""} ${event.categories && event.categories.length > 0 ? event.categories[0].color : ""}`,
              tabIndex: "0",
              role: "button",
              onClick: () => setEventDetail(event),
              onMouseEnter: () => relatedEventsEnter(event.slug),
              onMouseLeave: () => relatedEventsLeave(event.slug),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "calendar-event-title", children: event.title })
            },
            format(new Date(day), "yyyy-MM-dd-") + event.slug
          ),
          event.categories && event.categories.length > 1 && event.categories.filter((_, i) => i > 0).map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              title: event.title,
              className: `calendar-event calendar-event-category-addition calendar-event-slug-${event.slug} ${event.allday ? "tag" : ""} ${cat.color}`,
              tabIndex: "0",
              role: "button",
              onClick: () => setEventDetail(event),
              onMouseEnter: () => relatedEventsEnter(event.slug),
              onMouseLeave: () => relatedEventsLeave(event.slug)
            },
            format(new Date(day), "yyyy-MM-dd-") + event.slug + cat.slug
          ))
        ] }, event.slug)),
        eventList && eventList.length > MAX_EVENTS_PER_DAY_MONTHLY2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "more-events dropdown", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { tabIndex: "0", role: "button", className: "more-events-button", children: [
            "+",
            eventList.length - MAX_EVENTS_PER_DAY_MONTHLY2,
            " more"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel arrow bottom center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: eventList.filter((_, i) => i >= MAX_EVENTS_PER_DAY_MONTHLY2).map((event) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "calendar-event-wrapper", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                title: event.title,
                className: `calendar-event calendar-event-slug-${event.slug} ${event.allday ? "tag" : ""} ${event.categories && event.categories.length > 0 ? event.categories[0].color : ""}`,
                tabIndex: "0",
                role: "button",
                onClick: () => setEventDetail(event),
                onMouseEnter: () => relatedEventsEnter(event.slug),
                onMouseLeave: () => relatedEventsLeave(event.slug),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "calendar-event-title", children: event.title })
              },
              format(new Date(day), "yyyy-MM-dd-") + event.slug
            ),
            event.categories && event.categories.length > 1 && event.categories.filter((_, i) => i > 0).map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                title: event.title,
                className: `calendar-event calendar-event-category-addition calendar-event-slug-${event.slug} ${event.allday ? "tag" : ""} ${cat.color}`,
                tabIndex: "0",
                role: "button",
                onMouseEnter: () => relatedEventsEnter(event.slug),
                onMouseLeave: () => relatedEventsLeave(event.slug)
              },
              format(new Date(day), "yyyy-MM-dd-") + event.slug + cat.slug
            ))
          ] })) }) })
        ] })
      ]
    }
  );
};
const CalendarMonth = ({ periodData }) => {
  const { start, incoming, outgoing, eventList, isBefore: isBef } = periodData;
  const [incomingDone, setIncomingDone] = reactExports.useState(false);
  reactExports.useEffect(() => {
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CalendarDay,
        {
          ...{
            current: start,
            day,
            end,
            eventList: eventList.filter(
              (event) => event.due && event.due && isSameDay(new Date(event.due), new Date(day))
            )
          }
        },
        format(new Date(day), "yyyy-MM-dd")
      )
    );
    day = add(new Date(day), { days: 1 });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `calendar-month ${incoming && !incomingDone ? isBef ? "incoming-left" : "incoming-right" : ""} ${outgoing ? isBef ? "outgoing-left" : "outgoing-right" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "weekday-name", children: "Mon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "weekday-name", children: "Tue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "weekday-name", children: "Wed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "weekday-name", children: "Thu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "weekday-name", children: "Fri" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "weekday-name", children: "Sat" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "weekday-name", children: "Sun" }),
        days
      ]
    }
  );
};
const CalendarWeek = ({ periodData }) => {
  const { start, incoming, outgoing, eventList, isBefore: isBef } = periodData;
  const [incomingDone, setIncomingDone] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (incoming) {
      setTimeout(() => {
        setIncomingDone(true);
      }, 10);
    }
  }, [incoming]);
  let days = [];
  let day = startOfISOWeek(new Date(start)).toISOString();
  const end = endOfISOWeek(new Date(start)).toISOString();
  while (isBefore(new Date(day), new Date(end))) {
    days.push(
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CalendarDay,
        {
          ...{
            current: start,
            day,
            end,
            eventList: eventList.filter(
              (event) => event.due && event.due && isSameDay(new Date(event.due), new Date(day))
            )
          }
        },
        format(new Date(day), "yyyy-MM-dd")
      )
    );
    day = add(new Date(day), { days: 1 });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `calendar-month ${incoming && !incomingDone ? isBef ? "incoming-left" : "incoming-right" : ""} ${outgoing ? isBef ? "outgoing-left" : "outgoing-right" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "weekday-name", children: "Mon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "weekday-name", children: "Tue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "weekday-name", children: "Wed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "weekday-name", children: "Thu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "weekday-name", children: "Fri" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "weekday-name", children: "Sat" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "weekday-name", children: "Sun" }),
        days
      ]
    }
  );
};
const TaskControls = ({ pos }) => {
  const {
    period,
    setPeriod,
    periodChanging,
    CALENDAR_VIEW_OPTIONS: CALENDAR_VIEW_OPTIONS2,
    CONTROL_YEAR_OPTIONS: CONTROL_YEAR_OPTIONS2
  } = useCalendar();
  let yearOptions = CONTROL_YEAR_OPTIONS2.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: y, children: y }, y));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `calendar-controls ${pos}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spacer" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "calendar-month-controls", children: [
      !isSameMonth(/* @__PURE__ */ new Date(), new Date(period)) && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          tabIndex: "0",
          role: "button",
          onClick: () => !periodChanging ? setPeriod(/* @__PURE__ */ new Date()) : void 0,
          className: `knob ${periodChanging ? "disabled" : ""}`,
          children: "Today"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "pagination no-toggle", children: [
        isAfter(new Date(period), new Date(CONTROL_YEAR_OPTIONS2[0], 0, 1)) ? /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            className: `knob ${periodChanging ? "disabled" : ""}`,
            tabIndex: "0",
            role: "button",
            onClick: () => setPeriod(new Date(sub(new Date(period), { months: 1 }))),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { style: { transform: "rotate(90deg)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("use", { xlinkHref: "/images/icons.svg#chevron-down" }) })
          }
        ) }) : "",
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            disabled: periodChanging,
            value: format(new Date(period), "M"),
            onChange: (e) => setPeriod(
              new Date(
                Number(format(new Date(period), "yyyy")),
                Number(e.target.value) - 1,
                1
              )
            ),
            style: { paddingRight: "2em", minWidth: "16ch" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1", children: "January" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2", children: "February" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "3", children: "March" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "4", children: "April" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "5", children: "May" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "6", children: "June" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "7", children: "July" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "8", children: "August" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "9", children: "September" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "10", children: "October" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "11", children: "November" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "12", children: "December" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            disabled: periodChanging,
            value: format(new Date(period), "yyyy"),
            onChange: (e) => setPeriod(
              new Date(
                Number(e.target.value),
                Number(format(new Date(period), "M")) - 1,
                1
              )
            ),
            style: { paddingRight: "2em", minWidth: "10ch" },
            children: yearOptions
          }
        ) }),
        isBefore(
          new Date(period),
          new Date(
            CONTROL_YEAR_OPTIONS2[CONTROL_YEAR_OPTIONS2.length - 1],
            11,
            31
          )
        ) ? /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            className: `knob ${periodChanging ? "disabled" : ""}`,
            tabIndex: "0",
            onClick: () => setPeriod(new Date(add(new Date(period), { months: 1 }))),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { style: { transform: "rotate(-90deg)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("use", { xlinkHref: "/images/icons.svg#chevron-down" }) })
          }
        ) }) : ""
      ] })
    ] })
  ] });
};
const CalendarDialog = () => {
  const { eventDetail, setEventDetail } = useCalendar();
  return [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dialog", { className: "calendar-dialog", open: eventDetail !== null, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "calendar-dialog-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          className: "control close",
          tabIndex: "0",
          role: "button",
          onClick: () => {
            setEventDetail(null);
          },
          onKeyDown: (e) => {
            if (e.key == "Enter") {
              setEventDetail(null);
            }
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx("use", { xlinkHref: "/images/icons.svg#clear" }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Event Title" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { children: JSON.stringify(eventDetail, null, 2) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "backdrop", onClick: () => setEventDetail(null) })
  ];
};
const TRANSITION_TIMEOUT_MS = 300;
const Calendar = ({ fetchEvents, createEvent, updateEvent, deleteEvent }) => {
  const [period, setPeriod] = reactExports.useState(/* @__PURE__ */ new Date());
  const [periods, setPeriods] = reactExports.useState([]);
  const [periodChanging, setPeriodChanging] = reactExports.useState(false);
  const [eventDetail, setEventDetail] = reactExports.useState(null);
  const [calendarView, setCalendarView] = reactExports.useState("month");
  reactExports.useEffect(() => {
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
  reactExports.useEffect(() => {
    (async () => {
      const newPeriod = calendarView == "week" ? startOfISOWeek(new Date(period)) : startOfMonth(new Date(period)).toISOString();
      const startDate = calendarView == "week" ? newPeriod : startOfISOWeek(new Date(newPeriod)).toISOString();
      const endDate = calendarView == "week" ? endOfISOWeek(new Date(startDate)) : endOfISOWeek(endOfMonth(new Date(newPeriod))).toISOString();
      const eventList = await fetchEvents(startDate, endDate);
      setPeriods((currentPeriods) => {
        if (!currentPeriods || currentPeriods.length == 0) {
          return [
            {
              start: newPeriod,
              incoming: false,
              outgoing: false,
              isBefore: false,
              eventList
            }
          ];
        } else if (currentPeriods.length == 1 && currentPeriods[0].start != newPeriod) {
          setPeriodChanging(true);
          return [
            {
              ...currentPeriods[0],
              outgoing: true,
              isBefore: isBefore(currentPeriods[0].start, period)
            },
            {
              start: newPeriod,
              incoming: true,
              outgoing: false,
              isBefore: isBefore(period, currentPeriods[0].start),
              eventList
            }
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CalendarContext.Provider,
    {
      value: {
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
        CONTROL_YEAR_OPTIONS
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "calendar", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TaskControls, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "calendar-wrapper", children: periods.map((periodData) => {
          return calendarView == "week" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarWeek, { ...{ periodData } }, periodData.start) : /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarMonth, { ...{ periodData } }, periodData.start);
        }) }),
        eventDetail && /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDialog, {})
      ] })
    }
  );
};
const eventTitles = ["Design review", "Team lunch", "Release planning", "Customer interview", "Write project brief", "Research session", "Sprint retrospective", "Product demo"];
const eventCategories = [
  { slug: "rosewater", color: "rosewater" },
  { slug: "flamingo", color: "flamingo" },
  { slug: "pink", color: "pink" },
  { slug: "mauve", color: "mauve" },
  { slug: "purple", color: "purple" },
  { slug: "red", color: "red" },
  { slug: "maroon", color: "maroon" },
  { slug: "peach", color: "peach" },
  { slug: "orange", color: "orange" },
  { slug: "yellow", color: "yellow" },
  { slug: "planning", color: "blue" },
  { slug: "research", color: "teal" },
  { slug: "team", color: "green" },
  { slug: "sky", color: "sky" },
  { slug: "sapphire", color: "sapphire" },
  { slug: "lavender", color: "lavender" },
  { slug: "navy", color: "navy" },
  { slug: "olive", color: "olive" },
  { slug: "salmon", color: "salmon" },
  { slug: "magenta", color: "magenta" },
  { slug: "cyan", color: "cyan" },
  { slug: "lightgray", color: "lightgray" },
  { slug: "darkgray", color: "darkgray" }
];
const seededNumber = (seed) => {
  let value = 0;
  for (let index = 0; index < seed.length; index += 1) {
    value = value * 31 + seed.charCodeAt(index) >>> 0;
  }
  return value;
};
const pickForDay = (day, offset, values) => values[seededNumber(`${format(day, "yyyy-MM-dd")}-${offset}`) % values.length];
const createEventsForPeriod = (startDate, endDate) => {
  const start = startOfDay(new Date(startDate));
  const end = startOfDay(new Date(endDate));
  return eachDayOfInterval({ start, end }).flatMap((day) => {
    const dayKey = format(day, "yyyy-MM-dd");
    const eventCount = seededNumber(`${dayKey}-overflow`) % 11 === 0 ? seededNumber(`${dayKey}-overflow-count`) % 5 + 8 : seededNumber(dayKey) % 5 + 1;
    return Array.from({ length: eventCount }, (_, index) => {
      const title = pickForDay(day, `title-${index}`, eventTitles);
      const category = pickForDay(day, `category-${index}`, eventCategories);
      return {
        slug: `${title.toLowerCase().replaceAll(" ", "-")}-${dayKey}-${index}`,
        title,
        due: day.toISOString(),
        allday: true,
        categories: [category]
      };
    });
  });
};
const emptyEvents = async () => [];
const generatedEvents = async (startDate, endDate) => createEventsForPeriod(startDate, endDate);
const noOperation = async () => {
};
const basicCalendar = document.getElementById("calendar-demo-1");
if (basicCalendar) {
  clientExports.createRoot(basicCalendar).render(/* @__PURE__ */ jsxRuntimeExports$1.jsx(Calendar, { fetchEvents: emptyEvents, createEvent: noOperation, updateEvent: noOperation, deleteEvent: noOperation }));
}
const eventCalendar = document.getElementById("calendar-demo-2");
if (eventCalendar) {
  clientExports.createRoot(eventCalendar).render(/* @__PURE__ */ jsxRuntimeExports$1.jsx(Calendar, { fetchEvents: generatedEvents, createEvent: noOperation, updateEvent: noOperation, deleteEvent: noOperation }));
}
//# sourceMappingURL=calendar-demo.js.map
