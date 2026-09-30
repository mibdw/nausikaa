import React from "react";
import { createRoot } from "react-dom/client";
import { eachDayOfInterval, format, startOfDay } from "date-fns";
import Calendar from "@nausikaa/calendar";

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
  { slug: "darkgray", color: "darkgray" },
];

const seededNumber = (seed) => {
  let value = 0;
  for (let index = 0; index < seed.length; index += 1) {
    value = (value * 31 + seed.charCodeAt(index)) >>> 0;
  }
  return value;
};

const pickForDay = (day, offset, values) =>
  values[seededNumber(`${format(day, "yyyy-MM-dd")}-${offset}`) % values.length];

const createEventsForPeriod = (startDate, endDate) => {
  const start = startOfDay(new Date(startDate));
  const end = startOfDay(new Date(endDate));

  return eachDayOfInterval({ start, end }).flatMap((day) => {
    const dayKey = format(day, "yyyy-MM-dd");
    const eventCount =
      seededNumber(`${dayKey}-overflow`) % 11 === 0
        ? (seededNumber(`${dayKey}-overflow-count`) % 5) + 8
        : (seededNumber(dayKey) % 5) + 1;

    return Array.from({ length: eventCount }, (_, index) => {
      const title = pickForDay(day, `title-${index}`, eventTitles);
      const category = pickForDay(day, `category-${index}`, eventCategories);
      return {
        slug: `${title.toLowerCase().replaceAll(" ", "-")}-${dayKey}-${index}`,
        title,
        due: day.toISOString(),
        allday: true,
        categories: [category],
      };
    });
  });
};

const emptyEvents = async () => [];
const generatedEvents = async (startDate, endDate) => createEventsForPeriod(startDate, endDate);
const noOperation = async () => {};

const basicCalendar = document.getElementById("calendar-demo-1");
if (basicCalendar) {
  createRoot(basicCalendar).render(<Calendar fetchEvents={emptyEvents} createEvent={noOperation} updateEvent={noOperation} deleteEvent={noOperation} />);
}

const eventCalendar = document.getElementById("calendar-demo-2");
if (eventCalendar) {
  createRoot(eventCalendar).render(<Calendar fetchEvents={generatedEvents} createEvent={noOperation} updateEvent={noOperation} deleteEvent={noOperation} />);
}
