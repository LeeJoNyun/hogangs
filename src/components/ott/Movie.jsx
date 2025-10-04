// 메인 con3-#강아지랑 보면 더 재밌는 영화
import { useState } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Movie = () => {
    const poster = [
        { id: 1, img: '/ott/movie1.webp', title: '말리와 나', type: '코미디', date: '2008' },
        {
            id: 2,
            img: '/ott/movie2.webp',
            title: '마리와 강아지 이야기',
            type: '드라마',
            date: '2007',
        },
        { id: 3, img: '/ott/movie3.webp', title: '토고', type: '서바이벌', date: '2019' },
        { id: 4, img: '/ott/movie4.webp', title: '콜 오브 와일드', type: '모험', date: '2020' },
        { id: 5, img: '/ott/movie5.webp', title: '말리와 나', type: '어드벤처', date: '2008' },
        { id: 6, img: '/ott/movie6.webp', title: '도그', type: '코미디', date: '2022' },
        {
            id: 7,
            img: '/ott/movie7.webp',
            title: '레이싱 인 더 레인',
            type: '스포츠',
            date: '2019',
        },
        { id: 8, img: '/ott/movie8.webp', title: '더 웨이 홈', type: '모험', date: '2019' },
        { id: 9, img: '/ott/movie9.webp', title: '안녕 베일리', type: '모험', date: '2019' },
        {
            id: 10,
            img: '/ott/movie10.webp',
            title: '마이펫의 이중생활',
            type: '코미디',
            date: '2016',
        },
    ];
    const navigate = useNavigate();

    return (
        <div className="movie-list">
            <strong>
                <img src="/ott/icon-paw-green.svg" alt="발바닥" />
                호강이와 함께하는 <span>힐링 무비</span>
            </strong>
            <Swiper
                modules={[Navigation, Pagination]}
                navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev',
                }}
                pagination={{ clickable: true }}
                slidesPerView={5}
                slidesPerGroup={5}
                loop={true}
                spaceBetween={20}
                breakpoints={{
                    0: {
                        // 모바일 (0px ~ 600px)
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                        spaceBetween: 10,
                    },
                    601: {
                        // 태블릿 이상
                        slidesPerView: 5,
                        slidesPerGroup: 5,
                        // spaceBetween: 15,
                    },
                }}
            >
                {poster.map((poster) => (
                    <SwiperSlide key={poster.id}>
                        <img
                            src={poster.img}
                            alt={poster.title}
                            onClick={() => navigate(`/video/movie/${poster.id}`)}
                        />
                        <p>{poster.title}</p>
                        <div className="info">
                            <span className="type">{poster.type}</span>
                            <span className="date">{poster.date}</span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* <div className="btn">
                <PiArrowCircleLeftThin className="custom-prev" size={48} />
                <PiArrowCircleRightThin className="custom-next" size={48} />
            </div> */}
        </div>
    );
};

export default Movie;
