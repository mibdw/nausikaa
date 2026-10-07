import React from "react";
import { useCalendar } from "./calendarUtils.js";
import { sub, format, isAfter, isSameMonth, isSameDay } from "date-fns";

const CalendarDay = ({ current, day, end, eventList }) => {
  const { setEventDetail, locale, MAX_EVENTS_PER_DAY_MONTHLY } = useCalendar();

  const relatedEventsEnter = (slug) => {
    const relatedEvents = document.querySelectorAll(
      `.calendar-event-slug-${slug}`,
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
      `.calendar-event-slug-${slug}`,
    );
    if (relatedEvents && relatedEvents.length > 1) {
      for (let t in relatedEvents) {
        if (relatedEvents[t] && relatedEvents[t].classList) {
          relatedEvents[t].classList.remove("hover");
        }
      }
    }
  };

  const today = isSameDay(new Date(day), new Date());

  // An event is a button that opens it. The extra categories are colored
  // strips next to it: the mouse can click them too, but for the keyboard
  // and screen readers the button is enough.
  const renderEvent = (event, Wrapper) => (
    <Wrapper className="calendar-event-wrapper" key={event.slug}>
      <button
        type="button"
        title={event.title}
        className={`calendar-event calendar-event-slug-${event.slug} ${
          event.allday ? "tag" : ""
        } ${
          event.categories && event.categories.length > 0
            ? event.categories[0].color
            : ""
        }`}
        onClick={() => setEventDetail(event)}
        onMouseEnter={() => relatedEventsEnter(event.slug)}
        onMouseLeave={() => relatedEventsLeave(event.slug)}
      >
        <span className="calendar-event-title">{event.title}</span>
      </button>

      {event.categories &&
        event.categories.length > 1 &&
        event.categories
          .filter((_, i) => i > 0)
          .map((cat) => (
            <span
              aria-hidden="true"
              className={`calendar-event calendar-event-category-addition calendar-event-slug-${event.slug} ${
                event.allday ? "tag" : ""
              } ${cat.color}`}
              key={cat.slug}
              onClick={() => setEventDetail(event)}
              onMouseEnter={() => relatedEventsEnter(event.slug)}
              onMouseLeave={() => relatedEventsLeave(event.slug)}
            ></span>
          ))}
    </Wrapper>
  );

  return (
    <td
      className={`calendar-day ${
        isSameMonth(new Date(day), new Date(current))
          ? "same-month"
          : "other-month"
      } ${today ? "today" : ""} weekday-${format(new Date(day), "i")} ${
        isAfter(new Date(day), new Date(sub(new Date(end), { weeks: 1 })))
          ? "last-week"
          : ""
      }`}
      aria-current={today ? "date" : undefined}
      onClick={(e) => {
        if (e.target.classList && e.target.classList.contains("calendar-day")) {
          setEventDetail("new");
        }
      }}
    >
      {/* The number of the day is also the button for a new event on it */}
      <button
        type="button"
        className="control date-number"
        aria-label={`${format(new Date(day), "d")}, ${format(new Date(day), "PPPP", { locale })}: add an event`}
        onClick={() => setEventDetail("new")}
      >
        {format(new Date(day), "d")}
      </button>

      {eventList &&
        eventList.length > 0 &&
        eventList
          .filter((_, i) => i < MAX_EVENTS_PER_DAY_MONTHLY)
          .map((event) => renderEvent(event, "div"))}

      {eventList && eventList.length > MAX_EVENTS_PER_DAY_MONTHLY && (
        <details className="more-events dropdown">
          <summary className="more-events-button">
            +{eventList.length - MAX_EVENTS_PER_DAY_MONTHLY} more
          </summary>
          <div className="panel arrow bottom center">
            <ul>
              {eventList
                .filter((_, i) => i >= MAX_EVENTS_PER_DAY_MONTHLY)
                .map((event) => renderEvent(event, "li"))}
            </ul>
          </div>
        </details>
      )}
    </td>
  );
};

export default CalendarDay;
