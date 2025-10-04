import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
    {
        key: 'm1',
        label: '체크인 & 상담',
        lines: [
            '방문 시 보호자와 함께 강아지의 컨디션 체크와 스타일 상담을 진행합니다.',
            '피부 상태, 털 상태, 원하는 스타일을 꼼꼼하게 기록해요.',
        ],
        img: '/grooming/scroll/M1.webp',
    },
    {
        key: 'm2',
        label: '충분한 교감 시간',
        lines: [
            '강아지가 긴장하지 않도록 쓰담쓰담 교감 시간을 가져요.',
            '낯선 공간에서도 안심할 수 있도록 천천히 적응시킵니다.',
        ],
        img: '/grooming/scroll/M2.webp',
    },
    {
        key: 'm3',
        label: '목욕 & 스파 케어',
        lines: [
            '프리미엄 샴푸와 스파로 털과 피부를 케어합니다.',
            '마사지로 피로를 풀고, 기분까지 상쾌하게!',
        ],
        img: '/grooming/scroll/M3.webp',
    },
    {
        key: 'm4',
        label: '커트 & 스타일링',
        lines: [
            '강아지의 체형과 개성을 살린 디자인컷으로 완벽 변신!',
            '귀, 얼굴, 몸까지 맞춤 스타일로 마무리합니다.',
        ],
        img: '/grooming/scroll/M4.webp',
    },
    {
        key: 'm5',
        label: '포토타임 & 체크아웃',
        lines: ['예쁘게 변신한 모습을', '포토존에서 촬영 후 보호자에게 전송!'],
        img: '/grooming/scroll/M5.webp',
    },
];

const SIZES = [
    { w: 230, h: 310 }, // 1단계
    { w: 260, h: 350 }, // 2단계
    { w: 300, h: 400 }, // 3단계
    { w: 340, h: 460 }, // 4단계
    { w: 390, h: 520 }, // 5단계
];

const ScrollMobile = () => {
    const sectionRef = useRef(null);
    const barRef = useRef(null);
    const fillRef = useRef(null);
    const dotRef = useRef(null);
    const imgRefs = useRef([]);
    const [currentIdx, setCurrentIdx] = useState(0);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const bar = barRef.current;
            const fill = fillRef.current;
            const dot = dotRef.current;
            const imgs = imgRefs.current;

            const steps = MILESTONES.length - 1;
            const checkpoints = MILESTONES.map((_, i) => i / steps);

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: `+=${steps * 100}%`,
                pin: true,
                anticipatePin: 1,
                snap: {
                    snapTo: checkpoints,
                    duration: { min: 0.2, max: 0.5 },
                    delay: 0.03,
                    ease: 'power1.inOut',
                    inertia: false,
                },
                onUpdate(self) {
                    const p = self.progress;
                    gsap.set(fill, { width: `${p * 100}%` });

                    let idx = Math.floor(p * (steps + 1));
                    if (p >= 1) idx = steps;

                    if (idx !== currentIdx) {
                        imgs.forEach((img, i) => {
                            const { w, h } = SIZES[i];
                            if (i === idx) {
                                // 현재 단계 이미지
                                gsap.to(img, {
                                    x: 0,
                                    width: w,
                                    height: h,
                                    opacity: 1,
                                    duration: 0.6,
                                    ease: 'power2.out',
                                });
                            } else {
                                // 비활성 이미지
                                gsap.to(img, {
                                    x: i < idx ? '-100%' : '100%',
                                    opacity: 0,
                                    duration: 0.6,
                                    ease: 'power2.inOut',
                                });
                            }
                        });

                        // 진행바 dot 이동
                        const stepWidth = (bar.clientWidth - dot.offsetWidth) / steps;
                        gsap.to(dot, {
                            x: stepWidth * idx,
                            duration: 0.4,
                            ease: 'power2.out',
                        });

                        setCurrentIdx(idx);
                    }
                },
            });

            // ✅ 초기 이미지 세팅
            imgs.forEach((img, i) => {
                const { w, h } = SIZES[i];
                gsap.set(img, {
                    x: i === 0 ? 0 : '100%',
                    width: w,
                    height: h,
                    opacity: i === 0 ? 1 : 0,
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [currentIdx]);

    // ✅ 텍스트 전환 애니메이션
    useEffect(() => {
        gsap.fromTo(
            '.text',
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );
    }, [currentIdx]);

    return (
        <section id="grooming_scroll_mobile" ref={sectionRef}>
            <div className="viewport">
                {/* 이미지 영역 */}
                <div className="frame">
                    {MILESTONES.map((m, idx) => (
                        <div
                            className="img-slide"
                            key={m.key}
                            ref={(el) => (imgRefs.current[idx] = el)}
                            style={{ backgroundImage: `url(${m.img})` }}
                        ></div>
                    ))}
                </div>

                {/* 진행 바 */}
                <div className="pagination">
                    <div className="bar" ref={barRef}>
                        <div className="fill" ref={fillRef}></div>
                        <div className="dot" ref={dotRef}>
                            <img src="/grooming/scroll/hobokMobile.webp" alt="dot" />
                        </div>
                    </div>
                </div>

                {/* 텍스트 */}
                <div className="text">
                    <h2>{MILESTONES[currentIdx].label}</h2>
                    {MILESTONES[currentIdx].lines.map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ScrollMobile;
