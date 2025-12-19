import React from "react";
import { createRoot } from "react-dom/client";
import Calendar from "@nausikaa/calendar";

const root1 = createRoot(document.getElementById("calendar-demo-1"));
root1.render(
  <Calendar
    fetchEvents={async (startDate, endDate) => []}
    createEvent={async () => {}}
    updateEvent={async () => {}}
    deleteEvent={async () => {}}
  />,
);

const root2 = createRoot(document.getElementById("calendar-demo-2"));
root2.render(
  <Calendar
    fetchEvents={async (startDate, endDate) => {
      console.log(startDate, endDate);
      return [
        { start: new Date(), title: "Event sample", slug: "event-sample" },
      ];
    }}
    createEvent={async () => {}}
    updateEvent={async () => {}}
    deleteEvent={async () => {}}
  />,
);
