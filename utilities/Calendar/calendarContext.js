import { createContext } from "react";

export const DEFAULT_CALENDAR_VIEW = "month";
export const CALENDAR_VIEW_OPTIONS = [
  { value: "month", label: "Month" },
  { value: "week", label: "Week" },
  { value: "day", label: "Day" },
];

export const MAX_EVENTS_PER_DAY_MONTHLY = 7;
export const MAX_EVENTS_PER_DAY_WEEKLY = 25;

export const CONTROL_YEAR_OPTIONS = Array.from(
  { length: 61 },
  (_, i) => new Date().getFullYear() - 30 + i,
);

export const CalendarContext = createContext();
