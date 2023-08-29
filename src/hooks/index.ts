import { useEffect, useState, useRef } from "react";

export const useMenuBorder = () => {
  const [border, setBorder] = useState(false);
  useEffect(() => {
    function onScroll() {
      const { scrollY } = window;
      if (scrollY > 0) {
        setBorder(true);
      } else {
        setBorder(false);
      }
    }
    const options:{once?: boolean, passive?: boolean, capture?: boolean} = { passive: true };

    window.addEventListener('scroll', onScroll, options);
    return () => {
      window.removeEventListener('scroll', onScroll, options);
    };
  }, []);
  return border;
}

export const useRefCurrent = <T>() => {
  const targetRef = useRef<T>(null);
  const [current, setCurrent] = useState<T>(null);
  useEffect(()=>{
    setCurrent(targetRef.current);
  }, [targetRef])
  return [targetRef, current] as [typeof targetRef, typeof current];
}