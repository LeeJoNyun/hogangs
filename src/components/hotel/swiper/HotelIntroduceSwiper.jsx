import { Swiper, SwiperSlide } from 'swiper/react'; // Swiper 컴포넌트
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // 모듈들 import

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const data = [
    {
        badge: '산책 서비스',
        title: '하루 두 번 즐거운 산책 타임',
        t1: '하루에 두 번, 신나게 뛰어놀아요!',
        t2: '비가 오면 실내에서 재미있는 놀이로 대신해요',
        t3: '덕분에 매일매일 몸도 마음도 건강해진답니다.',
    },
    {
        badge: '하루를 기록해드려요',
        title: '오늘 하루는 이렇게 보냈어요',
        t1: '아이의 하루를 사진과 영상으로',
        t2: '보호자님께 전송해드려요.',
        t3: '멀리 있어도 안심할 수 있어요.',
    },
    {
        badge: '친구들이랑 노는 자유시간',
        title: '친구들이랑 함께 놀아요!',
        t1: '호텔에서 만난 친구들과 ',
        t2: '마음껏 뛰고 장난치며',
        t3: '사회성도 키우고, 즐거운 하루를 보내요.',
    },
    {
        badge: '믿을 수 있는 선생님들',
        title: '안심하고 맡길 수 있어요',
        t1: '훈련받은 전문가 선생님들이',
        t2: '사랑과 책임감으로',
        t3: '반려견을 세심하게 돌봐드려요.',
    },
    {
        badge: '깨끗하고 상쾌한 공간',
        title: '숨쉬기 편안한 깨끗한 공기',
        t1: '24시간 공기 청정 시스템으로',
        t2: '늘 상쾌하고 쾌적하게!',
        t3: '편안하게 머물 수 있어요.',
    },
    {
        badge: '나에게 딱 맞는 방',
        title: '내 몸에 꼭 맞는 공간',
        t1: '아늑한 소형견 전용룸부터',
        t2: '프리미엄 룸까지',
        t3: '아이의 성격과 크기에 맞게 선택할 수 있어요.',
    },
];
const HotelIntroduceSwiper = () => {
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
            className="hotel_introduce_swiper"
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
                        <img src={`/hotel/introduce/${idx + 1}.webp`} alt="" className="img" />
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

export default HotelIntroduceSwiper;
