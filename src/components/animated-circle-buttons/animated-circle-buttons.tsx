import { useRef, useEffect, Dispatch, SetStateAction } from "react";
import data from "../../events.json";
import gsap from "gsap";
import { Button } from "../button/button";
import arrowLeft from "../../assets/icons/arrow-left.svg";
import arrowRight from "../../assets/icons/arrow-right.svg";
import styled from "styled-components";
import { handleCircleResize } from "../../utils/handleCircleResize";

const CircleWrapper = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 27.6vw;
  height: 27.6vw;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CircleBase = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid rgba(66, 86, 122, 0.1);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CircleButtonWrapper = styled.div`
  position: absolute;
  border-radius: 50%;
  top: 45%;
  left: 45%;
  cursor: pointer;
  display: flex;
  column-gap: 1.04vw;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CategoryName = styled.p`
  color: var(--black-blue);
  font-weight: bold;
  font-size: 1.04vw;
  display: none;

  @media (max-width: 768px) {
    display: none;
  }
`;

const PrevNextBlock = styled.div`
  position: absolute;
  top: 67%;
  left: 4.17vw;

  @media (max-width: 768px) {
    left: 6.25vw;
    top: 88%;
    height: fit-content;
  }
`;

const CategoryNumber = styled.p`
  margin-bottom: 0.78vw;
  color: var(--black-blue);

  @media (max-width: 768px) {
    margin-bottom: 3.2vw;
  }
`;

const PrevNextButtonsWrapper = styled.div`
  display: flex;
  column-gap: 0.78vw;

  @media (max-width: 768px) {
    column-gap: 2.5vw;
  }
`;

export default function AnimatedCircleButtons({
  currentCategory,
  setCurrentCategory,
  setDuration,
}: {
  currentCategory: number;
  setCurrentCategory: Dispatch<SetStateAction<number>>;
  setDuration: Dispatch<SetStateAction<number>>;
}) {
  const circleWrapperRef = useRef<HTMLDivElement | null>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const buttonsWrapperRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      handleCircleResize({
        buttonsWrapperRef,
        buttonsRef,
        data,
        circleWrapperRef,
        currentCategory,
      });
    });

    handleCircleResize({
      buttonsWrapperRef,
      buttonsRef,
      data,
      circleWrapperRef,
      currentCategory,
    });
  }, []);

  const handleMouseEnter = (index: number) => {
    if (!buttonsRef.current) return;
    if (currentCategory === index) return;

    gsap.to(buttonsRef.current[index], {
      scale: 1,
      duration: 0.3,
      backgroundColor: "var(--background)",
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index: number) => {
    if (!buttonsRef.current) return;
    if (currentCategory === index) return;

    gsap.to(buttonsRef.current[index], {
      scale: 10 / 56,
      backgroundColor: "var(--black-blue)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleButtonClick = (clickedIndex: number) => {
    if (clickedIndex === currentCategory) return;

    const angleStep = (2 * Math.PI) / data.length;
    const startOffset = -60 * (Math.PI / 180);
    const radius = 265;

    buttonsWrapperRef.current.forEach((button, index) => {
      if (!button) return;

      const newIndex = (index - clickedIndex + data.length) % data.length;
      const targetAngle = startOffset + newIndex * angleStep;

      const currentX = gsap.getProperty(button, "x") as number;
      const currentY = gsap.getProperty(button, "y") as number;
      const currentAngle = Math.atan2(currentY, currentX);

      let angleDiff = targetAngle - currentAngle;
      if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
      if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

      const duration = Math.abs(+angleDiff.toFixed(1) / 3);
      const roundedDuration = Number(String(duration).slice(0, 3));

      setDuration(roundedDuration);

      //анимация вращения категорий
      gsap.to(button, {
        duration: roundedDuration,
        ease: "power3.out",
        onUpdate: function () {
          const progress = this.progress();
          const angle = currentAngle + angleDiff * progress;

          gsap.set(button, {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
          });
        },
        overwrite: "auto",
      });

      setCurrentCategory(clickedIndex);

      if (index !== clickedIndex) {
        gsap.to(buttonsRef.current[index], {
          scale: 10 / 56,
          backgroundColor: "var(--black-blue)",
          duration: roundedDuration,
          ease: "power2.out",
        });
        gsap.to(button.querySelector("p"), {
          display: "none",
          duration: roundedDuration,
        });
      } else {
        gsap.to(buttonsRef.current[index], {
          scale: 1,
          duration: roundedDuration,
          backgroundColor: "var(--background)",
          ease: "power2.out",
          onComplete: () => {
            gsap.to(button.querySelector("p"), {
              display: "block",
            });
          },
        });
      }
    });
  };

  return (
    <>
      <CircleWrapper ref={circleWrapperRef}>
        <CircleBase />
        {data.map((data, index) => (
          <CircleButtonWrapper
            key={data.category}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            ref={(el: HTMLDivElement | null) => {
              buttonsWrapperRef.current[index] = el;
            }}
          >
            <Button
              ref={(el: HTMLButtonElement | null) => {
                buttonsRef.current[index] = el;
              }}
              onClick={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundColor = "#f4f5f9";
                handleButtonClick(Number(target.innerText) - 1);
              }}
            >
              {index + 1}
            </Button>
            <CategoryName>{data.category}</CategoryName>
          </CircleButtonWrapper>
        ))}
      </CircleWrapper>
      <PrevNextBlock>
        <CategoryNumber>
          0{currentCategory + 1}/0{data.length}
        </CategoryNumber>
        <PrevNextButtonsWrapper>
          <Button
            size={2.6}
            onClick={() => handleButtonClick(currentCategory - 1)}
            disabled={currentCategory === 0}
          >
            <img src={arrowLeft} alt="arrow-left" />
          </Button>
          <Button
            size={2.6}
            onClick={() => handleButtonClick(currentCategory + 1)}
            disabled={currentCategory === data.length - 1}
          >
            <img src={arrowRight} alt="arrow-right" />
          </Button>
        </PrevNextButtonsWrapper>
      </PrevNextBlock>
    </>
  );
}
