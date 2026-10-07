import React from "react";
import { endOfISOWeek } from "date-fns";

import { CalendarTable } from "./CalendarMonth.js";

const CalendarWeek = ({ periodData }) => (
  <CalendarTable
    periodData={periodData}
    end={endOfISOWeek(new Date(periodData.start)).toISOString()}
  />
);

export default CalendarWeek;
