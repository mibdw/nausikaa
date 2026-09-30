import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { addDays, format, subDays } from "date-fns";
import DatePicker from "../utilities/DatePicker/index.js";

const InlineDemo = () => {
  const [range, setRange] = useState({ start: subDays(new Date(), 3), end: addDays(new Date(), 5) });
  return <><DatePicker inline startDate={range.start} endDate={range.end} onChange={(start, end) => setRange({ start, end })} /><p className="date-picker-output">{range.start && range.end ? `Selected: ${format(range.start, "MMMM d, yyyy")} – ${format(range.end, "MMMM d, yyyy")}` : "Choose a date range."}</p></>;
};

const DropdownDemo = () => {
  const [range, setRange] = useState({ start: null, end: null });
  return <div className="date-picker-demo-dropdown"><DatePicker startDate={range.start} endDate={range.end} onChange={(start, end) => setRange({ start, end })} label="Filter by date" /><p className="date-picker-output">{range.start && range.end ? `Filter: ${format(range.start, "MMMM d, yyyy")} – ${format(range.end, "MMMM d, yyyy")}` : "Open the control and apply a range."}</p></div>;
};

const inlineRoot = document.getElementById("date-picker-demo-inline");
if (inlineRoot) createRoot(inlineRoot).render(<InlineDemo />);
const dropdownRoot = document.getElementById("date-picker-demo-dropdown");
if (dropdownRoot) createRoot(dropdownRoot).render(<DropdownDemo />);
