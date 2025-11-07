import { useEffect } from "react";

export const useKeyboard = (isActive: boolean, onClose: () => void) => {
  useEffect(() => {
    if (!isActive) return;

    const handleEscButton = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscButton);
    return () => document.removeEventListener("keydown", handleEscButton);
  }, [isActive, onClose]);
};
