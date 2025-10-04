import HotelInteractionSwiper from '../swiper/HotelInteractionSwiper';

const col = ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp'];

const HotelInteraction = () => {
    const srcUrl = '/hotel/roll';
    return (
        <section id="hotel_interaction">
            <div className="left">
                <div className="top">
                    <div className="title">
                        <strong>우리 아이의 두 번째 집</strong>
                        <span>호강스 호텔</span>
                    </div>
                    <div className="context">
                        <p>호강스 호텔은 단순히 반려견을 맡기는 곳이 아니에요.</p>
                        <p>아이의 안전, 편안함, 그리고 즐거움을 최우선으로</p>
                        <p>생각하며 마치 집처럼 따뜻하고 아늑한 공간을 제공합니다.</p>
                        <br />
                        <p>전문 케어 시스템과 세심한 돌봄으로</p>
                        <p>엄마 아빠가 없는 시간에도 아이가 행복하게 지낼 수 있도록</p>
                        <p>호강스가 함께합니다.</p>
                    </div>
                </div>
                <div className="bottom">
                    <HotelInteractionSwiper />
                </div>
            </div>
            <div className="rolling_area">
                <div className="col up">
                    <div className="track">
                        {[...col, ...col].map((src, i) => (
                            <img key={i} src={srcUrl + '/col1/' + src} alt="" />
                        ))}
                    </div>
                </div>

                <div className="col down">
                    <div className="track">
                        {[...col, ...col].map((src, i) => (
                            <img key={i} src={srcUrl + '/col2/' + src} alt="" />
                        ))}
                    </div>
                </div>

                <div className="col up">
                    <div className="track">
                        {[...col, ...col].map((src, i) => (
                            <img key={i} src={srcUrl + '/col3/' + src} alt="" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HotelInteraction;
