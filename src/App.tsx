import styled from "styled-components";
import { YearsBlock } from "./components/years-block/years-block";
import { SwiperBlock } from "./components/slider-block/slider-block";
import { useEffect, useState } from "react";
import data from "./events.json";
import { EventData } from "./types/event.interface";
import AnimatedCircleButtons from "./components/animated-circle-buttons/animated-circle-buttons";

function AppContainer({ className }: { className?: string }) {
  const defaultCategory = 0;
  const [currentCategory, setCurrentCategory] =
    useState<number>(defaultCategory);
  const [currentEvents, setCurrentEvents] = useState<EventData[]>(
    data[currentCategory].events
  );
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    setCurrentEvents(data[currentCategory].events);
  }, [currentCategory]);

  return (
    <div className={className}>
      <div className="container">
        <h1 className="title">
          Исторические <br /> даты
        </h1>
        <YearsBlock
          fromStartYear={data[defaultCategory].events[0].year}
          fromEndYear={data[defaultCategory].events.at(-1)!.year}
          toStartYear={currentEvents[0].year}
          toEndYear={currentEvents.at(-1)!.year}
          duration={duration}
        />
        <SwiperBlock currentEvents={currentEvents} duration={duration} />
        <AnimatedCircleButtons
          currentCategory={currentCategory}
          setDuration={setDuration}
          setCurrentCategory={setCurrentCategory}
        />
      </div>
    </div>
  );
}

const App = styled(AppContainer)`
  .container {
    position: relative;
    margin-left: 16.67vw;
    width: 100%;
    height: 49.64vw;
    max-width: 75vw;
    border-inline: 1px solid rgba(66, 86, 122, 0.1);
    padding-top: 6.25vw;

    @media (max-width: 768px) {
      margin-left: 0;
      width: 100%;
      height: 100vh;
      border-inline: none;
      max-width: none;
      padding-top: 18.75vw;
    }

    &::before {
      content: "";
      position: absolute;
      top: 45%;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: rgba(66, 86, 122, 0.1);

      @media (max-width: 768px) {
        display: none;
      }
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      width: 1px;
      height: 100%;
      background-color: rgba(66, 86, 122, 0.1);
      z-index: -1;

      @media (max-width: 768px) {
        display: none;
      }
    }
    .title {
      position: relative;
      font-size: 2.92vw;
      color: var(--black-blue);
      line-height: 120%;
      padding-left: 4.06vw;
      margin-bottom: 2.08vw;

      @media (max-width: 768px) {
        font-size: 6.25vw;
        padding-left: 6.25vw;
        margin-bottom: 17.5vw;
      }

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 0.26vw;
        height: 6.25vw;
        background: linear-gradient(180deg, var(--blue) 0%, var(--pink) 100%);

        @media (max-width: 768px) {
          display: none;
        }
      }
    }
  }
`;

export default App;
