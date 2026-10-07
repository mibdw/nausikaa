import { useRef } from "react";

// An id that is unique on the page, so that several editors or calendars
// can sit side by side. (React 18 has useId, but React 17 is supported too.)
let lastId = 0;

export const useUniqueId = (prefix) => {
  const id = useRef(null);
  if (id.current === null) {
    lastId += 1;
    id.current = `${prefix}-${lastId}`;
  }
  return id.current;
};
