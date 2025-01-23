import React, { RefObject, useEffect } from "react";

const InfiniteLoadingHook = (
  refDiv: RefObject<HTMLElement>,
  callback: () => void,
  loading: boolean
) => {
  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { threshold: 1 }
    );

    const currentRef = refDiv.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [loading, callback, refDiv]);
  return null;
};

export default InfiniteLoadingHook;
