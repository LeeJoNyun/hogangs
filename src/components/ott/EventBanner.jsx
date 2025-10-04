// 메인con4-이벤트배너
import { useEffect, useState } from 'react';

const EventBanner = () => {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % 2);
        }, 4000);
        return () => clearInterval(timer);
    }, []);
    return (
        <div className="eventbanner-slider">
            <div className="slide-list" style={{ transform: `translateX(-${index * 100}%)` }}>
                <div className="slide">
                    <p>영화도 호강, 호텔도 호강!</p>
                    <strong>
                        오늘 하루, <span> 호강 </span>예약 완료
                    </strong>

                    <div className="imgs">
                        <img src="/ott/con4_img1.webp" alt="호텔들어가는이미지" draggable={false} />
                        <img src="/ott/con4_img2.webp" alt="영화보는이미지" draggable={false} />
                    </div>
                </div>
                <div className="slide">
                    <p>우리 아이를 위한 최고의 선택</p>
                    <strong>
                        엄마! 나도
                        <span> 호</span>
                        <span> 강</span>
                        <span>스 </span>
                        갈래요!
                    </strong>
                    <div className="imgs">
                        <div className="left">
                            <img src="/ott/con4_dog1.webp" alt="강아지1" draggable={false} />
                            <img src="/ott/con4_dog2.webp" alt="강아지2" draggable={false} />
                            <img src="/ott/con4_dog3.webp" alt="강아지3" draggable={false} />
                        </div>
                        <div className="right">
                            <img src="/ott/con4_dog4.webp" alt="강아지4" draggable={false} />
                            <img src="/ott/con4_dog5.webp" alt="강아지5" draggable={false} />
                            <img src="/ott/con4_dog6.webp" alt="강아지6" draggable={false} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventBanner;
