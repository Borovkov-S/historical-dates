import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styled from "styled-components";

interface Props {
  fromStartYear: string;
  fromEndYear: string;
  toStartYear: string;
  toEndYear: string;
  duration: number;
  className?: string;
}

function YearsBlockContainer({
  className,
  fromStartYear,
  fromEndYear,
  toStartYear,
  toEndYear,
  duration,
}: Props) {
  const [displayStartYear, setDisplayStartYear] =
    useState<string>(fromStartYear);
  const [displayEndYear, setDisplayEndYear] = useState<string>(fromEndYear);
  const startYearRef = useRef<HTMLParagraphElement>(null);
  const endYearRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const startYear = startYearRef.current;
    const endYear = endYearRef.current;

    if (!startYear || !endYear) return;

    gsap.to(startYear, {
      duration,
      ease: "power2.out",
      innerText: toStartYear,
      snap: { innerText: 1 },
      onUpdate: function () {
        setDisplayStartYear(startYear.innerText);
      },
    });

    gsap.to(endYear, {
      duration,
      ease: "power2.out",
      innerText: toEndYear,
      snap: { innerText: 1 },
      onUpdate: function () {
        setDisplayEndYear(endYear.innerText);
      },
    });
  }, [fromStartYear, toStartYear, toEndYear]);

  return (
    <div className={className}>
      <p className="text--blue" ref={startYearRef}>
        {displayStartYear}
      </p>
      <p className="text--pink" ref={endYearRef}>
        {displayEndYear}
      </p>
    </div>
  );
}

export const YearsBlock = styled(YearsBlockContainer)`
  font-size: 10.42vw;
  font-weight: bold;
  display: flex;
  justify-content: center;
  column-gap: 5.21vw;

  @media (max-width: 768px) {
    font-size: 17.5vw;
    justify-content: space-between;
    padding-inline: 6.25vw;
  }

  .text--blue {
    color: #5d5fef;
  }

  .text--pink {
    color: var(--pink);
  }
`;
