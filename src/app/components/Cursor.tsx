"use client";

import { RefObject, useEffect, useRef } from "react";

const CustomCursor = ({
  container,
}: {
  container: RefObject<HTMLDivElement | null>;
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const Imagecrousel = container.current
  useEffect(() => {
    const cursor = cursorRef.current;

    const moveCursor = (e: MouseEvent) => {
      if (cursor) {
        const { clientX, clientY } = e;
        cursor.style.left = `${clientX - 25}px`; // Offset to center the cursor (half of 50px width)
        cursor.style.top = `${clientY - 25}px`; // Offset to center the cursor (half of 50px height)
      }
    };

    // Add event listeners for mouse movement
    Imagecrousel?.addEventListener("mousemove", moveCursor);

    // Cleanup event listeners
    return () => {
      Imagecrousel?.removeEventListener("mousemove", moveCursor);
    };
  }, [Imagecrousel]);

  // Optional: Add touch support
  useEffect(() => {
    const cursor = cursorRef.current;

    const moveCursorTouch = (e: TouchEvent) => {
      if (cursor && e.touches[0]) {
        const { clientX, clientY } = e.touches[0];
        cursor.style.left = `${clientX - 25}px`;
        cursor.style.top = `${clientY - 25}px`;
      }
    };

    Imagecrousel?.addEventListener("touchmove", moveCursorTouch, {
      passive: true,
    });

    return () => {
      Imagecrousel?.removeEventListener("touchmove", moveCursorTouch);
    };
  }, [Imagecrousel]);

  return (
    <div ref={cursorRef} className="custom-cursor">
      Drag
    </div>
  );
};

export default CustomCursor;
