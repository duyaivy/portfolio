"use client";

import type { PointerEvent, ReactNode } from "react";
import { useCallback, useRef } from "react";

interface Props {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  wrapperClassName?: string;
  innerClassName?: string;
}

export default function Magnet({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.5s ease-in-out",
  wrapperClassName = "",
  innerClassName = "",
  ...props
}: Props) {
  const magnetRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<DOMRect | null>(null);
  const frameRef = useRef<number | null>(null);

  const moveInner = useCallback(
    (x: number, y: number, transition: string) => {
      if (!innerRef.current) return;

      innerRef.current.style.transition = transition;
      innerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    },
    []
  );

  const handlePointerEnter = useCallback(() => {
    if (disabled || !magnetRef.current) return;
    boundsRef.current = magnetRef.current.getBoundingClientRect();
  }, [disabled]);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (disabled || !boundsRef.current) return;

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      const { left, top, width, height } = boundsRef.current;
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const pointerX = event.clientX;
      const pointerY = event.clientY;

      frameRef.current = requestAnimationFrame(() => {
        const distX = Math.abs(centerX - pointerX);
        const distY = Math.abs(centerY - pointerY);

        if (distX < width / 2 + padding && distY < height / 2 + padding) {
          moveInner(
            (pointerX - centerX) / magnetStrength,
            (pointerY - centerY) / magnetStrength,
            activeTransition
          );
        } else {
          moveInner(0, 0, inactiveTransition);
        }
      });
    },
    [
      activeTransition,
      disabled,
      inactiveTransition,
      magnetStrength,
      moveInner,
      padding
    ]
  );

  const handlePointerLeave = useCallback(() => {
    boundsRef.current = null;
    moveInner(0, 0, inactiveTransition);
  }, [inactiveTransition, moveInner]);

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ position: "relative", display: "inline-block" }}
      {...props}
    >
      <div
        ref={innerRef}
        className={innerClassName}
        style={{
          transform: "translate3d(0, 0, 0)",
          transition: inactiveTransition,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}
