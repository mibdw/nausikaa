import React from "react";
import { useCalendar } from "./calendarUtils.js";
import { sub, format, isAfter, isSameMonth, isSameDay } from "date-fns";

const CalendarDay = ({ current, day, end, eventList }) => {
  const { setEventDetail } = useCalendar();

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

  return (
    <div
      className={`calendar-day ${
        isSameMonth(new Date(day), new Date(current))
          ? "same-month"
          : "other-month"
      } ${isSameDay(new Date(day), new Date()) ? "today" : ""} weekday-${format(
        new Date(day),
        "i",
      )} ${
        isAfter(new Date(day), new Date(sub(new Date(end), { weeks: 1 })))
          ? "last-week"
          : ""
      }`}
      onClick={(e) => {
        if (e.target.classList && e.target.classList.contains("calendar-day")) {
          setEventDetail("new");
        }
      }}
    >
      <span className="date-number">{format(new Date(day), "d")}</span>
      {eventList &&
        eventList.length > 0 &&
        eventList
          .filter((_, i) => i < 7)
          .map((event) => (
            <div className="calendar-event-wrapper">
              <a
                title={event.title}
                className={`calendar-event calendar-event-slug-${event.slug} ${
                  event.allday ? "tag" : ""
                } ${
                  event.categories && event.categories.length > 0
                    ? event.categories[0].color
                    : ""
                }`}
                key={format(new Date(day), "yyyy-MM-dd-") + event.slug}
                tabIndex="0"
                role="button"
                onClick={() => setEventDetail(event)}
                onMouseEnter={() => relatedEventsEnter(event.slug)}
                onMouseLeave={() => relatedEventsLeave(event.slug)}
              >
                <span className="calendar-event-title">{event.title}</span>
              </a>

              {event.categories &&
                event.categories.length > 1 &&
                event.categories
                  .filter((_, i) => i > 0)
                  .map((event) => (
                    <a
                      title={event.title}
                      className={`calendar-event calendar-event-category-addition calendar-event-slug-${event.slug} ${
                        event.allday ? "tag" : ""
                      } ${cat.color}`}
                      key={
                        format(new Date(day), "yyyy-MM-dd-") +
                        event.slug +
                        cat.slug
                      }
                      tabIndex="0"
                      role="button"
                      onClick={() => setEventDetail(event)}
                      onMouseEnter={() => relatedEventsEnter(event.slug)}
                      onMouseLeave={() => relatedEventsLeave(event.slug)}
                    ></a>
                  ))}
            </div>
          ))}

      {eventList && eventList.length > 7 && (
        <div className="more-events dropdown">
          <a tabIndex="0" role="button" className="more-events-button">
            +{eventList.length - 7} more
          </a>
          <div className="panel arrow bottom center">
            <ul>
              {eventList
                .filter((_, i) => i > 6)
                .map((event) => (
                  <li className="calendar-event-wrapper">
                    <a
                      title={event.title}
                      className={`calendar-event calendar-event-slug-${event.slug} ${
                        event.allday ? "tag" : ""
                      } ${
                        event.categories && event.categories.length > 0
                          ? event.categories[0].color
                          : ""
                      }`}
                      key={format(new Date(day), "yyyy-MM-dd-") + event.slug}
                      tabIndex="0"
                      role="button"
                      onClick={() => setEventDetail(event)}
                      onMouseEnter={() => relatedEventsEnter(event.slug)}
                      onMouseLeave={() => relatedEventsLeave(event.slug)}
                    >
                      <span className="calendar-event-title">
                        {event.title}
                      </span>
                    </a>

                    {event.categories &&
                      event.categories.length > 1 &&
                      event.categories
                        .filter((_, i) => i > 0)
                        .map((cat) => (
                          <a
                            title={event.title}
                            className={`calendar-event calendar-event-category-addition calendar-event-slug-${event.slug} ${
                              event.allday ? "tag" : ""
                            } ${cat.color}`}
                            key={
                              format(new Date(day), "yyyy-MM-dd-") +
                              event.slug +
                              cat.slug
                            }
                            tabIndex="0"
                            role="button"
                            onMouseEnter={() => relatedEventsEnter(event.slug)}
                            onMouseLeave={() => relatedEventsLeave(event.slug)}
                          ></a>
                        ))}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarDay;
