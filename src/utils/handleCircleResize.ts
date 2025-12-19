import { RefObject } from "react";
import { calculateButtonsPosition } from "./calculateButtonsPosition";
import { EventData } from "../types/event.interface";
import gsap from "gsap";

interface Props {
  buttonsWrapperRef: RefObject<(HTMLDivElement | null)[]>;
  data: { category: string; events: EventData[] }[];
  circleWrapperRef: RefObject<HTMLDivElement | null>;
  currentCategory: number;
  buttonsRef: RefObject<(HTMLButtonElement | null)[]>;
}

export const handleCircleResize = ({
  buttonsWrapperRef,
  data,
  circleWrapperRef,
  currentCategory,
  buttonsRef,
}: Props) => {
  buttonsWrapperRef.current.forEach((button, index) => {
    if (!button) return;

    const { x, y } = calculateButtonsPosition(
      index,
      data,
      circleWrapperRef.current!.offsetWidth
    );

    gsap.set(button, {
      x,
      y,
    });

    if (currentCategory !== index) {
      gsap.set(buttonsRef.current[index], {
        scale: 10 / 56,
        backgroundColor: "var(--black-blue)",
        ease: "power2.in",
      });
    } else {
      gsap.set(button.querySelector("p"), {
        display: "block",
      });
    }
  });
};
