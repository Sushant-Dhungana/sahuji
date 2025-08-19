import { RefObject } from "react";

export const useDropdownPosition = (ref: RefObject<HTMLDivElement>) => {
  const getDropdownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };

    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 240;
    //calculate the position of the dropdown
    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    //check if dropdown goes to right edge of screen
    if (left + dropdownWidth > window.innerWidth) {
      left = rect.right + window.scrollX - dropdownWidth;

      if (left < 0) {
        left = window.innerWidth - dropdownWidth - 16;
      }
    }
    //ensure dropdown doesn't go off the left edge of the screen
    if (left < 0) {
      left = 16; // 16px padding from the left edge
    }

    return { top, left };
  };
  return { getDropdownPosition };
};
