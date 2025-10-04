import React, { useEffect, useState } from 'react';

const IMAGES = [
    '/about/Hobok1.webp',
    '/about/Hobok2.webp',
    '/about/Hobok3.webp',
    '/about/Hobok4.webp',
];

const Hobok = () => {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // 3초마다 이미지 자동 변경
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % IMAGES.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [isPaused]);

    return (
        <section id="dogAbout">
            <div
                className="dogImg"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <img src={IMAGES[current]} alt={`Hobok${current + 1}`} />
            </div>

            <div className="about">
                <div className="name">
                    <h2>호복이</h2>
                    <img src="/about/Line.webp" alt="" />
                </div>
                <div className="section">
                    <div className="title">
                        <strong>세심하고 따뜻한 케어, 호복이가 함께해요!</strong>
                    </div>
                    <div className="content">
                        <p>
                            호복이는 미용실의 작은 마법사이자 반려견의 스타일을 책임지는 전문가예요.{' '}
                            <br />
                            작고 귀여운 손길로 털 한 올까지 세심하게 다듬으며, <br />
                            아이가 스트레스 없이 미용을 즐길 수 있도록 따뜻하게 다가갑니다. <br />
                            낯가림이 심한 아이도 호복이 앞에서는 마음을 열게 돼요.
                        </p>
                    </div>
                </div>
                <div className="section">
                    <div className="title">
                        <strong>&quot;오늘도 더 예쁘고 건강하게, 호복이가 완성할게요!&quot;</strong>
                    </div>
                    <div className="content">
                        <p>
                            호복이가 있는 호강스 미용실은 아이들이 편안하게 머무르고 즐겁게 변신하는
                            공간이 됩니다. <br />
                            호텔에서 쉬던 아이가 미용까지 자연스럽게 이어지도록, <br />
                            호강스의 하루를 완벽하게 마무리하는 존재예요. <br />
                            반려견의 특별한 변신을 함께 완성하는 호복이를 만나보세요.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hobok;
