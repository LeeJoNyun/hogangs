import React, { useEffect, useState } from 'react';

const IMAGES = [
    '/about/Hogang1.webp',
    '/about/Hogang2.webp',
    '/about/Hogang3.webp',
    '/about/Hogang4.webp',
];

const Hogang = () => {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // 2초마다 이미지 변경
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
                <img src={IMAGES[current]} alt={`Hogang${current + 1}`} />
            </div>
            <div className="about">
                <div className="name">
                    <h2>호강이</h2>
                    <img src="/about/Line.webp" alt="" />
                </div>
                <div className="section">
                    <div className="title">
                        <strong>안전하고 편안한 휴식, 호강이와 함께해요!</strong>
                    </div>
                    <div className="content">
                        <p>
                            호강이는 반려견들이 안심하고 머무를 수 있도록 호텔을 지켜주는 든든한
                            친구예요. <br />
                            따뜻하고 꼼꼼한 성격을 가진 호강이는, 호텔을 찾은 아이들이 집처럼
                            편안하게 <br /> 머무를 수 있도록 늘 세심하게 살피고 있어요. <br /> 낯선
                            공간에 온 아이들이 불안해하지 않도록 다정한 목소리와 눈빛으로 안심시켜
                            주고, <br /> 24시간 CCTV와 청결 관리까지 책임지는 믿음직스러운
                            존재랍니다.
                        </p>
                    </div>
                </div>
                <div className="section">
                    <div className="title">
                        <strong>&quot;오늘도 내가 호텔을 지킨다!&quot;</strong>
                    </div>
                    <div className="content">
                        <p>
                            낮에는 함께 놀아주고, 밤에는 호텔을 돌며 안전을 확인하며 <br /> 보호자가
                            없는 시간에도 아이들이 행복할 수 있도록 호강이는 언제나 곁에 있어요.
                            <br /> 호강이는 ‘호텔링’이라는 단어의 의미처럼, 휴식, 안전, 행복을 모두
                            책임지는 존재입니다.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hogang;
