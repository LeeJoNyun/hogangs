import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';
import GroomingInteractionSwiperMobile from '../swiper/GroomingInteractionSwiperMobile';

const col = ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp'];

const GroomingInteractionMobile = () => {
    const srcUrl = '/grooming/roll';

    return (
        <section id="grooming_interactionMobile">
            <div className="inner">
                <div className="top">
                    <div className="title">
                        <strong>우리 호강이의 첫 미용</strong>
                        <p>
                            <span className="color">호강스</span>
                            <span>에서 시작해요</span>
                        </p>
                    </div>
                    <div className="context">
                        <p>호강스 미용은 단순히 예쁘게 만드는 곳이 아니에요.</p>
                        <p>강아지의 건강, 안전, 그리고 행복을 최우선으로 생각하며</p>
                        <p>편안하고 즐거운 뷰티 케어를 제공합니다.</p>
                        <br />
                        <p>세심한 관리와 전문적인 터치로</p>
                        <p>우리 아이가 빛나는 하루를 완성할 수 있도록</p>
                        <p> 호강스가 함께합니다.</p>
                    </div>
                </div>

                {/* 후기 Swiper */}
                <div className="review">
                    <GroomingInteractionSwiperMobile />
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

export default GroomingInteractionMobile;
