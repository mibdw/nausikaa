"use strict";
const require$$0 = require("react");
const dateFns = require("date-fns");
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_production;
function requireReactJsxRuntime_production() {
  if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
  hasRequiredReactJsxRuntime_production = 1;
  var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
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
var reactJsxRuntime_development = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_development;
function requireReactJsxRuntime_development() {
  if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
  hasRequiredReactJsxRuntime_development = 1;
  "production" !== process.env.NODE_ENV && function() {
    function getComponentNameFromType(type) {
      if (null == type) return null;
      if ("function" === typeof type)
        return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
      if ("string" === typeof type) return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
        case REACT_ACTIVITY_TYPE:
          return "Activity";
      }
      if ("object" === typeof type)
        switch ("number" === typeof type.tag && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), type.$$typeof) {
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_CONTEXT_TYPE:
            return type.displayName || "Context";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
            return type;
          case REACT_MEMO_TYPE:
            return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x) {
            }
        }
      return null;
    }
    function testStringCoercion(value) {
      return "" + value;
    }
    function checkKeyStringCoercion(value) {
      try {
        testStringCoercion(value);
        var JSCompiler_inline_result = false;
      } catch (e) {
        JSCompiler_inline_result = true;
      }
      if (JSCompiler_inline_result) {
        JSCompiler_inline_result = console;
        var JSCompiler_temp_const = JSCompiler_inline_result.error;
        var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
        JSCompiler_temp_const.call(
          JSCompiler_inline_result,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          JSCompiler_inline_result$jscomp$0
        );
        return testStringCoercion(value);
      }
    }
    function getTaskName(type) {
      if (type === REACT_FRAGMENT_TYPE) return "<>";
      if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
        return "<...>";
      try {
        var name = getComponentNameFromType(type);
        return name ? "<" + name + ">" : "<...>";
      } catch (x) {
        return "<...>";
      }
    }
    function getOwner() {
      var dispatcher = ReactSharedInternals.A;
      return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
      return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
      if (hasOwnProperty.call(config, "key")) {
        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
        if (getter && getter.isReactWarning) return false;
      }
      return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
      function warnAboutAccessingKey() {
        specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          displayName
        ));
      }
      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, "key", {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }
    function elementRefGetterWithDeprecationWarning() {
      var componentName = getComponentNameFromType(this.type);
      didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      ));
      componentName = this.props.ref;
      return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
      var refProp = props.ref;
      type = {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        props,
        _owner: owner
      };
      null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
        enumerable: false,
        get: elementRefGetterWithDeprecationWarning
      }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
      type._store = {};
      Object.defineProperty(type._store, "validated", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: 0
      });
      Object.defineProperty(type, "_debugInfo", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: null
      });
      Object.defineProperty(type, "_debugStack", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugStack
      });
      Object.defineProperty(type, "_debugTask", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugTask
      });
      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
      return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
      var children = config.children;
      if (void 0 !== children)
        if (isStaticChildren)
          if (isArrayImpl(children)) {
            for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
              validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else validateChildKeys(children);
      if (hasOwnProperty.call(config, "key")) {
        children = getComponentNameFromType(type);
        var keys = Object.keys(config).filter(function(k) {
          return "key" !== k;
        });
        isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
        didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(
          'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
          isStaticChildren,
          children,
          keys,
          children
        ), didWarnAboutKeySpread[children + isStaticChildren] = true);
      }
      children = null;
      void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
      hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
      if ("key" in config) {
        maybeKey = {};
        for (var propName in config)
          "key" !== propName && (maybeKey[propName] = config[propName]);
      } else maybeKey = config;
      children && defineKeyPropWarningGetter(
        maybeKey,
        "function" === typeof type ? type.displayName || type.name || "Unknown" : type
      );
      return ReactElement(
        type,
        children,
        maybeKey,
        getOwner(),
        debugStack,
        debugTask
      );
    }
    function validateChildKeys(node) {
      isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
      return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = require$$0, REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
      return null;
    };
    React = {
      react_stack_bottom_frame: function(callStackForError) {
        return callStackForError();
      }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(
      React,
      UnknownOwner
    )();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
    reactJsxRuntime_development.jsx = function(type, config, maybeKey) {
      var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
      return jsxDEVImpl(
        type,
        config,
        maybeKey,
        false,
        trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
      );
    };
    reactJsxRuntime_development.jsxs = function(type, config, maybeKey) {
      var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
      return jsxDEVImpl(
        type,
        config,
        maybeKey,
        true,
        trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
      );
    };
  }();
  return reactJsxRuntime_development;
}
if (process.env.NODE_ENV === "production") {
  jsxRuntime.exports = requireReactJsxRuntime_production();
} else {
  jsxRuntime.exports = requireReactJsxRuntime_development();
}
var jsxRuntimeExports = jsxRuntime.exports;
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
const CalendarContext = require$$0.createContext();
const useCalendar = () => {
  const ctx = require$$0.useContext(CalendarContext);
  if (!ctx) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return ctx;
};
const CalendarDay = ({ current, day, end, eventList }) => {
  const { setEventDetail } = useCalendar();
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
      className: `calendar-day ${dateFns.isSameMonth(new Date(day), new Date(current)) ? "same-month" : "other-month"} ${dateFns.isSameDay(new Date(day), /* @__PURE__ */ new Date()) ? "today" : ""} weekday-${dateFns.format(
        new Date(day),
        "i"
      )} ${dateFns.isAfter(new Date(day), new Date(dateFns.sub(new Date(end), { weeks: 1 }))) ? "last-week" : ""}`,
      onClick: (e) => {
        if (e.target.classList && e.target.classList.contains("calendar-day")) {
          setEventDetail("new");
        }
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "date-number", children: dateFns.format(new Date(day), "d") }),
        eventList && eventList.length > 0 && eventList.filter((_, i) => i < 7).map((event) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "calendar-event-wrapper", children: [
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
            dateFns.format(new Date(day), "yyyy-MM-dd-") + event.slug
          ),
          event.categories && event.categories.length > 1 && event.categories.filter((_, i) => i > 0).map((event2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              title: event2.title,
              className: `calendar-event calendar-event-category-addition calendar-event-slug-${event2.slug} ${event2.allday ? "tag" : ""} ${cat.color}`,
              tabIndex: "0",
              role: "button",
              onClick: () => setEventDetail(event2),
              onMouseEnter: () => relatedEventsEnter(event2.slug),
              onMouseLeave: () => relatedEventsLeave(event2.slug)
            },
            dateFns.format(new Date(day), "yyyy-MM-dd-") + event2.slug + cat.slug
          ))
        ] })),
        eventList && eventList.length > 7 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "more-events dropdown", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { tabIndex: "0", role: "button", className: "more-events-button", children: [
            "+",
            eventList.length - 7,
            " more"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel arrow bottom center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: eventList.filter((_, i) => i > 6).map((event) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "calendar-event-wrapper", children: [
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
              dateFns.format(new Date(day), "yyyy-MM-dd-") + event.slug
            ),
            event.categories && event.categories.length > 1 && event.categories.filter((_, i) => i > 0).map((cat2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                title: event.title,
                className: `calendar-event calendar-event-category-addition calendar-event-slug-${event.slug} ${event.allday ? "tag" : ""} ${cat2.color}`,
                tabIndex: "0",
                role: "button",
                onMouseEnter: () => relatedEventsEnter(event.slug),
                onMouseLeave: () => relatedEventsLeave(event.slug)
              },
              dateFns.format(new Date(day), "yyyy-MM-dd-") + event.slug + cat2.slug
            ))
          ] })) }) })
        ] })
      ]
    }
  );
};
const CalendarMonth = ({ periodData }) => {
  const { start, incoming, outgoing, eventList, isBefore: isBef } = periodData;
  const [incomingDone, setIncomingDone] = require$$0.useState(false);
  require$$0.useEffect(() => {
    if (incoming) {
      setTimeout(() => {
        setIncomingDone(true);
      }, 10);
    }
  }, [incoming]);
  let days = [];
  let day = dateFns.startOfISOWeek(new Date(start)).toISOString();
  const end = dateFns.endOfISOWeek(dateFns.endOfMonth(new Date(start))).toISOString();
  while (dateFns.isBefore(new Date(day), new Date(end))) {
    days.push(
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CalendarDay,
        {
          ...{
            current: start,
            day,
            end,
            eventList: eventList.filter(
              (event) => event.due && event.due && dateFns.isSameDay(new Date(event.due), new Date(day))
            )
          }
        },
        dateFns.format(new Date(day), "yyyy-MM-dd")
      )
    );
    day = dateFns.add(new Date(day), { days: 1 });
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
  const [incomingDone, setIncomingDone] = require$$0.useState(false);
  require$$0.useEffect(() => {
    if (incoming) {
      setTimeout(() => {
        setIncomingDone(true);
      }, 10);
    }
  }, [incoming]);
  let days = [];
  let day = dateFns.startOfISOWeek(new Date(start)).toISOString();
  const end = dateFns.endOfISOWeek(new Date(start)).toISOString();
  while (dateFns.isBefore(new Date(day), new Date(end))) {
    days.push(
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CalendarDay,
        {
          ...{
            current: start,
            day,
            end,
            eventList: eventList.filter(
              (event) => event.due && event.due && dateFns.isSameDay(new Date(event.due), new Date(day))
            )
          }
        },
        dateFns.format(new Date(day), "yyyy-MM-dd")
      )
    );
    day = dateFns.add(new Date(day), { days: 1 });
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
      !dateFns.isSameMonth(/* @__PURE__ */ new Date(), new Date(period)) && /* @__PURE__ */ jsxRuntimeExports.jsx(
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
        dateFns.isAfter(new Date(period), new Date(CONTROL_YEAR_OPTIONS2[0], 0, 1)) ? /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            className: `knob ${periodChanging ? "disabled" : ""}`,
            tabIndex: "0",
            role: "button",
            onClick: () => setPeriod(new Date(dateFns.sub(new Date(period), { months: 1 }))),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { style: { transform: "rotate(90deg)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("use", { xlinkHref: "/images/icons.svg#chevron-down" }) })
          }
        ) }) : "",
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            disabled: periodChanging,
            value: dateFns.format(new Date(period), "M"),
            onChange: (e) => setPeriod(
              new Date(
                Number(dateFns.format(new Date(period), "yyyy")),
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "7", children: "Juli" }),
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
            value: dateFns.format(new Date(period), "yyyy"),
            onChange: (e) => setPeriod(
              new Date(
                Number(e.target.value),
                Number(dateFns.format(new Date(period), "M")) - 1,
                1
              )
            ),
            style: { paddingRight: "2em", minWidth: "10ch" },
            children: yearOptions
          }
        ) }),
        dateFns.isBefore(
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
            onClick: () => setPeriod(new Date(dateFns.add(new Date(period), { months: 1 }))),
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
  const [period, setPeriod] = require$$0.useState(/* @__PURE__ */ new Date());
  const [periods, setPeriods] = require$$0.useState([]);
  const [periodChanging, setPeriodChanging] = require$$0.useState(false);
  const [eventDetail, setEventDetail] = require$$0.useState(null);
  const [calendarView, setCalendarView] = require$$0.useState("month");
  require$$0.useEffect(() => {
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
  require$$0.useEffect(() => {
    (async () => {
      const newPeriod = calendarView == "week" ? dateFns.startOfISOWeek(new Date(period)) : dateFns.startOfMonth(new Date(period)).toISOString();
      const startDate = calendarView == "week" ? newPeriod : dateFns.startOfISOWeek(new Date(newPeriod)).toISOString();
      const endDate = calendarView == "week" ? dateFns.endOfISOWeek(new Date(startDate)) : dateFns.endOfISOWeek(dateFns.endOfMonth(new Date(startDate))).toISOString();
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
              isBefore: dateFns.isBefore(currentPeriods[0].start, period)
            },
            {
              start: newPeriod,
              incoming: true,
              outgoing: false,
              isBefore: dateFns.isBefore(period, currentPeriods[0].start),
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
module.exports = Calendar;
//# sourceMappingURL=index.cjs.map
