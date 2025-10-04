import { Swiper, SwiperSlide } from 'swiper/react'; // Swiper 컴포넌트
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // 모듈들 import

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const data = [
    {
        badge: '충분한 교감',
        title: '두근두근 교감타임',
        t1: '선생님이 꼭 눈 맞추고 쓰담쓰담~',
        t2: '무섭지 않게 천천히 교감해주셔서',
        t3: '저는 미용 시간이 점점 즐거워요.',
    },
    {
        badge: '대형견도 문제없어요',
        title: '덩치 큰 친구도 OK!',
        t1: '저처럼 덩치가 커도 괜찮아요!',
        t2: '호강스에는 중형, 대형 친구들을 위한',
        t3: '맞춤 미용이 준비되어 있어요.',
    },
    {
        badge: '디자인컷 전문',
        title: '스타일링 마법사',
        t1: '저한테 꼭 맞는 스타일은',
        t2: '전문가 선생님들의 손길에서 완성돼요.',
        t3: '저는 매번 달라지는 모습에 신나요!',
    },
    {
        badge: ' 다양한 미용 서비스',
        title: '목욕 그 이상 풀케어 서비스!',
        t1: '저는 목욕만 하는 게 아니에요!',
        t2: ' 피부도 촉촉하게 관리받고,',
        t3: ' 스파랑 마사지로 기분까지 좋아져요.',
    },
    {
        badge: '호텔링 중 이용 가능',
        title: '호텔&미용 올인원 케어',
        t1: '호텔에 쉬러 와도 걱정 없어요!',
        t2: '필요하면 호텔 생활 중에도',
        t3: '미용을 바로 받을 수 있답니다.',
    },
    {
        badge: '포토존 사진 촬영',
        title: '오늘의 댕스타그램',
        t1: '예쁘게 변신한 제 모습은 그냥 두지 않아요!',
        t2: '포토존에서 사진 찍어',
        t3: '엄마 아빠한테 바로 보여드려요.',
    },
];

const GroomingIntroduceSwiper = () => {
    const swiperRef = useRef(null);
    useEffect(() => {
        if (!swiperRef) return;
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.swiper-slide');
            cards.map((card, i) => {
                const duration = gsap.utils.random(0.8, 1.5);
                const yMovePx = gsap.utils.random(10, 20);

                gsap.to(card, {
                    y: `-=${yMovePx}`,
                    ease: `linear`,
                    duration: duration,
                    repeat: -1,
                    yoyo: true,
                });
            });
        }, swiperRef);
        return () => ctx.revert();
    }, []);
    return (
        <Swiper
            ref={swiperRef}
            className="grooming_introduce_swiper"
            modules={[Autoplay]}
            slidesPerView="auto" // 슬라이드 너비는 CSS에서 고정
            spaceBetween={64} // ✅ gap 대신 Swiper 옵션으로
            centeredSlides={true} // ✅ 가운데 슬라이드가 활성
            loop={true}
            // loopAdditionalSlides={1} // 소수 슬라이드에서 루프 끊김 방지
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            speed={600}
        >
            {data.map((card, idx) => (
                <SwiperSlide key={idx}>
                    <div className="slide_inner">
                        <div className="top">
                            <div className="title">{card.badge}</div>
                            <strong>{card.title}</strong>
                        </div>
                        <img src={`/grooming/introduce/${idx + 1}.webp`} alt="" className="img" />
                        <div className="bottom">
                            <p>
                                {card.t1}
                                <br />
                                {card.t2}
                                <br />
                                {card.t3}
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default GroomingIntroduceSwiper;
