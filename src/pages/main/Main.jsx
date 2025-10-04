// src/pages/main/Main.jsx
import { useEffect, useRef, useState } from 'react';
import BubbleLanding from '../../components/main/BubbleLanding';
import ChannelTalk from '../../components/main/ChannelTalk';
import Visual from '../../components/main/Visual';
import { getCookie, setCookie } from '../../utils/Cookie';
import Section1 from '../../components/main/sections/Section1';
import Section2 from '../../components/main/sections/Section2';
import gsap from 'gsap';
import Section3 from '../../components/main/sections/Section3';
import Section4List from '../../components/main/sections/Section4List';
import Section5 from '../../components/main/sections/Section5';
import HogangsCursor from '../../components/util/HogangsCursor';
import BubbleCanvas from '../../components/main/BubbleCanvas';

const Main = () => {
    const [landingOn, setLandingOn] = useState(false);
    const pawRef = useRef(null);

    // ▶ 비눗방울 표시 구간(섹션1~2) 래퍼
    const bubbleRangeRef = useRef(null);
    // ▶ 고정 오버레이(항상 마운트; 스타일만 토글)
    const overlayRef = useRef(null);

    // 쿠키 확인
    useEffect(() => {
        const hidden = getCookie('landing');
        if (!hidden) setLandingOn(true);
    }, []);

    // body 스크롤 잠금 처리
    useEffect(() => {
        document.body.classList.toggle('no-scroll', landingOn);
    }, [landingOn]);

    // ChannelTalk 제어
    useEffect(() => {
        if (typeof window.ChannelIO !== 'function') return;
        if (landingOn) {
            window.ChannelIO('hideMessenger');
            window.ChannelIO('hideChannelButton');
        } else {
            window.ChannelIO('showChannelButton');
        }
    }, [landingOn]);

    // 랜딩 닫기(쿠키 1일)
    const handleCloseLanding = () => {
        setCookie('landing', '1', 1);
        setLandingOn(false);
    };

    // 커서 포인터
    useEffect(() => {
        const el = pawRef.current;
        if (!el) return;
        const setX = gsap.quickSetter(el, 'x', 'px');
        const setY = gsap.quickSetter(el, 'y', 'px');
        const onMove = (e) => {
            setX(e.clientX + 15);
            setY(e.clientY + 15);
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    // ✅ 섹션1~2 범위와 화면이 겹치면 오버레이 ON (opacity/visibility만 토글)
    useEffect(() => {
        const rangeEl = bubbleRangeRef.current;
        const overlayEl = overlayRef.current;
        if (!rangeEl || !overlayEl) return;

        let ticking = false;

        const measure = () => {
            const rect = rangeEl.getBoundingClientRect();
            const vh = window.innerHeight;
            const inRange = rect.bottom > vh * 0.05 && rect.top < vh * 0.95;
            overlayEl.style.opacity = inRange ? '1' : '0';
            overlayEl.style.visibility = inRange ? 'visible' : 'hidden';
        };

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                measure();
                ticking = false;
            });
        };

        const onResize = () => {
            measure();
        };

        measure();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);
        window.addEventListener('load', onResize);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            window.removeEventListener('load', onResize);
        };
    }, []);

    return (
        <>
            <div style={{ pointerEvents: landingOn ? 'none' : 'auto' }}>
                <Visual aria-hidden={landingOn} />

                {/* ▼▼▼ 여기만 비눗방울 보임: 섹션 1 + 섹션 2 ▼▼▼ */}
                <div ref={bubbleRangeRef}>
                    <Section1 />
                    <Section2 />
                </div>
                {/* ▲▲▲ 끝 ▲▲▲ */}

                {/* 섹션3부터는 비눗방울 안 보임 */}
                <Section3 />
                <Section4List />
                <Section5 />
            </div>

            {/* ✅ 항상 마운트된 화면 고정 오버레이 */}
            <div
                ref={overlayRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 99999,
                    pointerEvents: 'none',
                    opacity: 0, // 시작은 꺼둠 → 스크롤 때 토글
                    visibility: 'hidden',
                    transition: 'opacity 200ms ease',
                }}
            >
                <BubbleCanvas
                    /* ===== 레퍼런스 같은 '연-민트' 파스텔 세팅 ===== */
                    ringsBlend="normal"
                    ringAlpha={0.16}
                    outlineAlpha={0.035}
                    baseHue={174} // 민트 축
                    hueSpread={6} // 색 퍼짐 최소화
                    sat={28} // 채도 낮게
                    light={94} // 명도 높게(투명/파스텔)
                    rimSat={26} // 테두리 채도 낮게
                    rimLight={88} // 테두리 밝게
                    ringHueShift={4} // 링 색 거의 고정
                    ringHueSpread={12} // 살짝만 퍼지게
                    /* ===== 크기/개수/움직임 (네가 쓰던 값 유지) ===== */
                    count={3}
                    smallMin={62}
                    smallMax={78}
                    bigMin={90}
                    bigMax={120}
                    bigRatio={0.18}
                    scale={1.5} // 1.5배 확대
                    wobbleAmpScale={0.2} // 좌우 흔들림 폭 -80%
                    responsive={true}
                    baseWidth={1440}
                    speed={0.42}
                    variant="glossy"
                />
            </div>

            {landingOn && <BubbleLanding onClose={handleCloseLanding} />}

            <img ref={pawRef} src="/Paw.svg" alt="" className="paw-fixed" aria-hidden />
            <HogangsCursor src="/main/m.webp" size={150} speed={3} />
        </>
    );
};

export default Main;
