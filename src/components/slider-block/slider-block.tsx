import { EventData } from "../../types/event.interface";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import gsap from "gsap";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styled from "styled-components";
import { useRef } from "react";

interface Props {
  className?: string;
  currentEvents: EventData[];
  duration: number;
}

function SwiperBlockContainer({ className, currentEvents, duration }: Props) {
  const swiperRef = useRef(null);

  const swiper = swiperRef.current;

  gsap.set(swiper, {
    opacity: 0,
    onComplete: () => {
      gsap.to(swiper, {
        opacity: 1,
        delay: 0.3,
        duration: duration,
      });
    },
  });
  return (
    <div className={className} ref={swiperRef}>
      <Swiper
        slidesPerView={3}
        freeMode={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        spaceBetween={80}
        modules={[FreeMode, Navigation, Pagination]}
        watchOverflow={true}
        watchSlidesProgress={true}
        breakpoints={{
          320: {
            slidesPerView: 1.4,
            spaceBetween: 25,
            pagination: {
              clickable: true,
            },
          },
          1024: {
            slidesPerView: 3,
            pagination: false,
          },
        }}
      >
        {currentEvents.map(({ year, event, id }) => (
          <SwiperSlide key={id} className="event-card">
            <p className="year">{year}</p>
            <p className="text">{event}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export const SwiperBlock = styled(SwiperBlockContainer)`
  position: relative;
  padding-inline: 4.17vw;
  height: 19.79vw;
  display: flex;
  align-items: end;

  @media (max-width: 768px) {
    height: 88vw;
    padding: 0;
  }

  .swiper {
    position: static;
    
    @media (max-width: 768px) {
      padding-top: 6.25vw;
      padding-left: 6.25vw;
      padding-bottom: 25vw;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      width: calc(100vw - 12.5vw);
      height: 1px;
      background-color:rgba(66, 86, 122, 0.1);
    }

    .swiper-pagination-bullet-active {
      background-color: var(--black-blue);
    }
  }

    .swiper-wrapper {
      display: flex;

        .year {
          color: var(--blue);
          font-size: 1.3vw;
          line-height: 120%;
          margin-bottom: 0.78vw;
          font-family: BebasNeue;

          @media (max-width: 768px) {
            font-size: 5vw;
            line-height: 120%;
            margin-bottom: 4.69vw;
          }
        }

        .text {
          font-size: 1.04vw;
          line-height: 150%;
          color: var(--black-blue);

          @media (max-width: 768px) {
            font-size: 4.38vw;
            line-height: 145%;
          }
        }
      }
    }
    .swiper-button-prev,
    .swiper-button-next {
      background-color: #fff;
      border-radius: 50%;
      box-shadow: 0 0 15px 0 rgba(56, 119, 238, 0.1);
      width: 2.08vw;
      height: 2.08vw;
      color: var(--blue);
      z-index: 100;

      @media (max-width: 768px) {
        display: none;
      }
    }

    .swiper-button-prev {
      top: 75%;
      left: 1.04vw;
    }

    .swiper-button-next {
      top: 75%;
      right: 1.04vw;
    }

    .swiper-button-disabled {
      display: none;
    }

    .swiper-navigation-icon {
      width: 0.42vw;
    }
  }
`;
