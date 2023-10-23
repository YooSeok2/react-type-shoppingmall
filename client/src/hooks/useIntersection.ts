import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

const useIntersection = (targetRef: RefObject<HTMLDivElement>) => {
  const observerRef = useRef<IntersectionObserver>(null);
  const [isIntersect, setIsIntersect] = useState(false);

  const getObserver = useCallback(() => {
    if(!observerRef.current) {
      observerRef.current = new IntersectionObserver(([entry])=>{
        setIsIntersect(entry.isIntersecting);
      })
    }
    return observerRef.current;
  },[]);

  useEffect(()=>{
    getObserver().observe(targetRef.current);
  },[]);
  return isIntersect;
}

export default useIntersection;