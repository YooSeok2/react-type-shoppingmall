import { useEffect, useState } from "react";

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