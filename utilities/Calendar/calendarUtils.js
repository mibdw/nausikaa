import { useContext } from "react";
import { CalendarContext } from "./calendarContext.js";

export const useCalendar = () => {
  const ctx = useContext(CalendarContext);
  if (!ctx) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return ctx;
};
