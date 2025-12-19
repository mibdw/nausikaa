import React from "react";
import { createRoot } from "react-dom/client";
import Calendar from "@nausikaa/calendar";

// Very small demo wiring so the calendar renders without a backend.
const CalendarDemo = () => (
  <Calendar
    fetchEvents={async () => []}
    createEvent={async () => {}}
    updateEvent={async () => {}}
    deleteEvent={async () => {}}
  />
);

const root = createRoot(document.getElementById("calendar-demo-1"));
root.render(<CalendarDemo />);
