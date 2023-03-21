import { useEffect, useRef } from "react";

function useRenderCounter() {
  const counter = useRef(0);
  
  useEffect(() => {
    counter.current += 1;
  });

  return counter.current;
}

export default useRenderCounter;