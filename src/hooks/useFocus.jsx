import { useEffect } from "react";

const useFocus = (ref, action) => {
  useEffect(() => {
    const handleOnFocus = () => {
      if (ref.current && !ref.current.focus()) {
        action();
        ref.current.focus();
      }
    };

    if (ref.current) ref.current.addEventListener("focus", handleOnFocus);
  }, [ref, action]);
};

export default useFocus;
