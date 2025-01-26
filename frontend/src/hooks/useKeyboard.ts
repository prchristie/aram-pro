import { useEffect, useState } from "react";

export function useKeyCapture(
  onKeydown: (e: KeyboardEvent) => void,
  startsActive: boolean,
  keys: Set<string>
) {
  const [active, setActive] = useState(startsActive);

  useEffect(() => {
    function keydownWrapper(e: KeyboardEvent) {
      if (keys.has(e.key)) {
        onKeydown(e);
      }
    }

    if (active) {
      document.addEventListener("keydown", keydownWrapper);
    } else {
      document.removeEventListener("keydown", keydownWrapper);
    }

    return () => document.removeEventListener("keydown", keydownWrapper);
  }, [active, keys, onKeydown]);

  return {
    activateKeyboard: () => setActive(true),
    deactivateKeyboard: () => setActive(false),
  };
}
