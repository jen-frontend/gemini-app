import { useState, useEffect, use } from "react";

const MOBILE_BREAKPOINT = 600;

export default function useIsMobile(initial = false) {
  const [isMobile, setIsMobile] = useState<boolean>(initial);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile(e.matches);

    handleChange(mq);
    mq.addEventListener("change", handleChange);

    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}
