import React, { useState, useEffect } from "react";

export function AnimNum({ value, prefix = "", suffix = "", duration = 1200 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0, step = value / (duration / 16);
    const t = setInterval(() => {
      start += step;
      if (start >= value) { setDisplay(value); clearInterval(t); }
      else setDisplay(Math.floor(start));
    }, 16);
    return () => clearInterval(t);
  }, [value, duration]);
  return <span>{prefix}{display.toLocaleString()}{suffix}</span>;
}
