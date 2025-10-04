// 메인con2-best
import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { useNavigate } from 'react-router-dom';

const Best = () => {
    const best5 = [
        {
            id: 1,
            img: '/ott/movie3.webp',
            title: '도그',
            desc: '말썽꾸러기 도그와 함께 떠나는 \n 엉뚱하고 따뜻한 힐링 로드트립',
            date: '2022',
        },
        {
            id: 2,
            img: '/ott/movie9.webp',
            title: '더 웨이 홈',
            desc: '집으로 돌아가기 위한 강아지의 \n 감동 여정을 담은 이야기',
            date: '2019',
        },
        {
            id: 3,
            img: '/ott/movie1.webp',
            title: '안녕 베일리',
            desc: '환생을 통해 반려인 곁을 지키는 \n충직하고 사랑스러운 강아지 이야기',
            date: '2019',
        },
        {
            id: 4,
            img: '/ott/movie7.webp',
            title: '볼트',
            desc: '슈퍼히어로라 믿던 강아지 볼트가 \n 모험을 통해 진짜 용기를 찾아가는 이야기',
            date: '2008',
        },
        {
            id: 5,
            img: '/ott/movie5.webp',
            title: '말리와 나',
            desc: '천방지축 강아지 말리와 함께 \n 유쾌하고 사랑스러운 가족 이야기',
            date: '2008',
        },
    ];

    const navigate = useNavigate();
    const swiperRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [hoverLeft, setHoverLeft] = useState(false);
    const [hoverRight, setHoverRight] = useState(false);

    const updateActiveSlide = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            const swiper = swiperRef.current.swiper;
            const slides = swiper.slides;

            // 모든 클래스 제거
            slides.forEach((slide) => {
                slide.classList.remove('first-active', 'first-slide');
            });

            const activeSlide = slides[swiper.activeIndex];
            if (activeSlide) {
                activeSlide.classList.add('first-active');
                // 현재 활성화된 슬라이드가 첫 번째면 first-slide도 추가
                if (swiper.realIndex === 0) {
                    activeSlide.classList.add('first-slide');
                }
            }
        }
    };

    const handleNext = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };

    const handlePrev = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    const handleSlideChange = (swiper) => {
        setCurrentIndex(swiper.realIndex);
        setTimeout(updateActiveSlide, 50);
    };

    useEffect(() => {
        setTimeout(updateActiveSlide, 100);
    }, []);

    return (
        <div className="best-movie">
            <div className="left">
                <strong>인기 영화 TOP 5</strong>
                <h2>{best5[currentIndex].title}</h2>
                <p>{best5[currentIndex].desc}</p>
                <span className="bg">
                    BEST <br />
                    MOVIE
                </span>
                <span className="bg1">BEST</span>
                <span className="bg2">MOVIE</span>
            </div>

            <div className="right">
                <Swiper
                    ref={swiperRef}
                    slidesPerView={3.5}
                    slidesPerGroup={1}
                    spaceBetween={80}
                    loop={true}
                    // loopAdditionalSlides={5}
                    autoHeight={false}
                    centeredSlides={false}
                    onSlideChange={handleSlideChange}
                    onSwiper={updateActiveSlide}
                    className="slide-wrapper"
                    breakpoints={{
                        0: {
                            slidesPerView: 1.7, // 모바일 → 2.5개씩 보이게
                            spaceBetween: 0, // 모바일 간격
                        },
                        601: {
                            slidesPerView: 3.5, // PC
                            spaceBetween: 80,
                        },
                    }}
                >
                    {best5.map((movie, idx) => (
                        <SwiperSlide key={movie.id} className={idx === 0 ? 'first-slide' : ''}>
                            <div className="poster">
                                <img src={movie.img} alt={movie.title} draggable={false} />
                                <p className="title">{movie.title}</p>
                                <span className="date">{movie.date}</span>
                                <div
                                    className="btn"
                                    onClick={() => navigate(`/video/movie/${movie.id}`)}
                                >
                                    <p>지금보러가기</p>
                                    <p>
                                        <img src="/ott/icon-paw.webp" alt="지금보러가기" />
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="btns">
                    <button
                        className="icon-btn"
                        onMouseEnter={() => setHoverLeft(true)}
                        onMouseLeave={() => setHoverLeft(false)}
                        onClick={handlePrev}
                    >
                        <span className={`icon ${hoverLeft ? 'hide' : 'show'}`}>
                            <img src="/ott/button_prev.svg" alt="이전버튼" />
                        </span>
                        <span className={`icon ${hoverLeft ? 'show' : 'hide'}`}>
                            <img src="/ott/button_prev-hover.svg" alt="이전버튼" />
                        </span>
                    </button>

                    <button
                        className="icon-btn"
                        onMouseEnter={() => setHoverRight(true)}
                        onMouseLeave={() => setHoverRight(false)}
                        onClick={handleNext}
                    >
                        <span className={`icon ${hoverRight ? 'hide' : 'show'}`}>
                            <img src="/ott/button_next.svg" alt="다음 버튼" />
                        </span>
                        <span className={`icon ${hoverRight ? 'show' : 'hide'}`}>
                            <img src="/ott/button_next-hover.svg" alt="다음 버튼" />
                        </span>
                    </button>
                </div>

                <div className="progress">
                    <div
                        className="bar"
                        style={{
                            width: `${(window.innerWidth <= 600 ? 30 : 1076) / best5.length}px`,
                            transform: `translateX(${
                                ((window.innerWidth <= 600 ? 300 : 1076) / best5.length) *
                                currentIndex
                            }px)`,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Best;
