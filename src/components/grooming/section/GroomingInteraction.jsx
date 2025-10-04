import GroomingInteractionSwiper from '../swiper/GroomingInteractionSwiper';

const col = ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp'];

const GroomingInteraction = () => {
    const srcUrl = '/grooming/roll';
    return (
        <section id="grooming_interaction">
            <div className="left">
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
                <div className="bottom">
                    <GroomingInteractionSwiper />
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

export default GroomingInteraction;
