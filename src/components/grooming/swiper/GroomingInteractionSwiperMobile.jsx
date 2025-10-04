import { Swiper, SwiperSlide } from 'swiper/react'; // Swiper 컴포넌트
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // 모듈들 import

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SLIDE_DATA = [
    {
        src: '/grooming/roll/col1/3.webp',
        text: '우리 콩이가 처음 호텔에 묵었는데 너무 걱정했어요. 매일 보내주시는 사진과 영상 덕분에 출장 중에도 마음이 놓였답니다. 덕분에 콩이가 즐겁게 잘 쉬고 돌아왔어요!',
    },
    {
        src: '/grooming/roll/col2/6.webp',
        text: '처음 맡기는 거라 많이 불안했는데, 직원분들이 너무 친절하셨어요. 아이 성격을 바로 파악해주시고 세심히 챙겨주셔서 감동했답니다. 루비가 집처럼 편안하게 쉬다 와서 저도 행복했어요.',
    },
    {
        src: '/grooming/roll/col1/1.webp',
        text: '예민한 성격의 몽이가 낯선 공간에 잘 적응할까 걱정했는데, 호텔에 도착하자마자 웃는 사진을 보내주셔서 안심했어요. 섬세한 케어와 관심 덕분에 아이가 즐겁게 보내고 왔습니다.',
    },
    {
        src: '/grooming/roll/col3/3.webp',
        text: '실시간 CCTV가 있어서 언제든 확인할 수 있는 게 정말 좋아요. 아이의 모습을 직접 확인하니 마음이 놓이고 믿음이 생겼습니다. 다음에도 꼭 호강스를 이용할 거예요.',
    },
    {
        src: '/grooming/roll/col2/2.webp',
        text: '호텔 내부가 정말 깨끗하고 청결하게 관리되고 있었어요. 향도 은은하고 따뜻한 분위기라서 아이가 금방 편해졌습니다. 믿고 맡길 수 있는 곳을 찾아 너무 기쁩니다.',
    },
    {
        src: '/grooming/roll/col1/6.webp',
        text: '출장으로 장기간 집을 비워야 해서 걱정이 많았는데, 호텔에서 매일 아이 사진과 영상, 그리고 상세한 리포트를 보내주셨어요. 덕분에 멀리 있어도 두부와 마루가 행복하게 지내는 걸 느꼈습니다.',
    },
    {
        src: '/grooming/roll/col2/4.webp',
        text: '호텔에서 미용까지 함께 맡겼는데 너무 만족스러워요. 아이 털 상태도 부드럽고 스타일도 예쁘게 완성돼서 돌아왔답니다. 보리가 행복해 보여 저도 흐뭇했어요.',
    },
    {
        src: '/grooming/roll/col3/1.webp',
        text: '아이 성향에 맞춰 세심하게 케어해주셔서 정말 감사했어요. 사소한 부분까지 챙겨주시고, 아이가 편안하게 지낼 수 있도록 최선을 다해주시는 모습이 느껴졌습니다.',
    },
    {
        src: '/grooming/roll/col3/6.webp',
        text: '산책 서비스가 있다는 점이 너무 좋았어요! 호텔에서 지루하지 않게 매일 산책도 해주시고, 돌아와서 행복하게 쉬는 모습에 감동했습니다.',
    },
    {
        src: '/grooming/roll/col1/5.webp',
        text: '처음으로 호텔을 이용했는데 모든 것이 완벽했어요. 청결, 서비스, 그리고 세심한 배려까지 어느 하나 빠짐이 없었습니다. 다음에도 꼭 예약해서 아이에게 또 좋은 추억을 만들어주고 싶습니다.',
    },
];
const GroomingInteractionSwiperMobile = () => {
    return (
        <Swiper
            className="grooming_interaction_swiper"
            direction="vertical"
            modules={[Autoplay]} // 사용할 기능 등록
            spaceBetween={17} // 슬라이드 사이의 간격 (px)
            slidesPerView="auto" // 한 화면에 보여지는 슬라이드 개수
            loop={true} // 무한 반복 슬라이드
            autoplay={{ delay: 2000, disableOnInteraction: false }} // 자동 슬라이드
        >
            {SLIDE_DATA.map((item, idx) => (
                <SwiperSlide key={idx}>
                    <div className="inner">
                        <div className="profile">
                            <img src={item.src} alt="" />
                        </div>
                        <span className="reply">{item.text}</span>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default GroomingInteractionSwiperMobile;
