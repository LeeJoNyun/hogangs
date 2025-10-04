import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';
import HotelInteractionSwiperMobile from '../swiper/HotelInteractionSwiperMobile';

const col = ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp'];

const HotelInteractionMobile = () => {
    const srcUrl = '/hotel/roll';

    return (
        <section id="hotel_interactionMobile">
            <div className="inner">
                <div className="top">
                    <div className="title">
                        <strong>우리 아이의 두 번째 집</strong>
                        <span>호강스 호텔</span>
                    </div>
                    <div className="context">
                        <p>호강스 호텔은 단순히 반려견을 맡기는 곳이 아니에요.</p>
                        <p>아이의 안전, 편안함, 그리고 즐거움을 최우선으로 생각하며</p>
                        <p>마치 집처럼 따뜻하고 아늑한 공간을 제공합니다.</p>
                        <br />
                        <p>전문 케어 시스템과 세심한 돌봄으로</p>
                        <p>엄마 아빠가 없는 시간에도 아이가 행복하게 지낼 수 있도록</p>
                        <p>호강스가 함께합니다.</p>
                    </div>
                </div>

                {/* 후기 Swiper */}
                <div className="review">
                    <HotelInteractionSwiperMobile />
                </div>

                {/* rolling_area → 가로 스와이퍼로 변경 */}
                <div className="rolling_area_mobile">
                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{ delay: 2000, disableOnInteraction: false }}
                        loop={true}
                        slidesPerView={1.2} // 화면에 1.2개 보여줌 (가운데 + 양쪽 살짝)
                        centeredSlides={true} // ✅ 가운데 정렬
                        spaceBetween={8}
                    >
                        {col.map((src, i) => (
                            <SwiperSlide key={i}>
                                <img src={`${srcUrl}/col1/${src}`} alt={`dog-${i}`} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default HotelInteractionMobile;
