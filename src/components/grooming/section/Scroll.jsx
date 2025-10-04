import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useLayoutEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.normalizeScroll(true); // 관성으로 넘치는 것 방지(권장)

const SIZES = [
    { w: 960, h: 280 },
    { w: 1200, h: 340 },
    { w: 1400, h: 400 },
    { w: 1600, h: 480 },
    { w: 1920, h: 560 },
];
const IMAGES = [
    '/grooming/scroll/1.webp',
    '/grooming/scroll/2.webp',
    '/grooming/scroll/3.webp',
    '/grooming/scroll/4.webp',
    '/grooming/scroll/5.webp',
];

const MILESTONES = [
    {
        key: 'm1',
        label: '체크인 & 상담',
        p: 0.0,
        lines: [
            '방문 시 보호자와 함께 강아지의 컨디션 체크와 스타일 상담을 진행합니다.',
            '피부 상태, 털 상태, 원하는 스타일을 꼼꼼하게 기록해요.',
        ],
    },
    {
        key: 'm2',
        label: '충분한 교감 시간',
        p: 0.25,
        lines: [
            '강아지가 긴장하지 않도록 쓰담쓰담 교감 시간을 가져요.',
            '낯선 공간에서도 안심할 수 있도록 천천히 적응시킵니다.',
        ],
    },
    {
        key: 'm3',
        label: '목욕 & 스파 케어',
        p: 0.5,
        lines: [
            '프리미엄 샴푸와 스파로  털과 피부를 케어합니다.',
            '마사지로 피로를 풀고, 기분까지 상쾌하게!',
        ],
    },
    {
        key: 'm4',
        label: '커트 & 스타일링',
        p: 0.75,
        lines: [
            '강아지의 체형과 개성을 살린 디자인컷으로 완벽 변신!',
            '귀, 얼굴, 몸까지 맞춤 스타일로 마무리합니다.',
        ],
    },
    {
        key: 'm5',
        label: '포토타임 & 체크아웃',
        p: 1.0,
        lines: ['예쁘게 변신한 모습을', '포토존에서 촬영 후 보호자에게 전송!'],
    },
];

const Scroll = () => {
    const sectionRef = useRef(null);
    const viewPortRef = useRef(null);
    const imgRef = useRef(null);
    const barRef = useRef(null);
    const fillRef = useRef(null);
    const dotRef = useRef(null);
    const ticksRef = useRef(null);

    const [currentIdx, setCurrentIdx] = useState(0);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const bar = barRef.current;
            const fill = fillRef.current;
            const dot = dotRef.current;
            const img = imgRef.current;

            let currentIdx = 0;
            const steps = SIZES.length - 1;
            const checkpoints = SIZES.map((_, i) => i / steps);

            // 초기 상태
            gsap.set(sectionRef.current, {
                backgroundColor: '#fff',
                paddingTop: 84,
            });

            gsap.set(img, { width: SIZES[0].w, height: SIZES[0].h });
            gsap.set(fill, { width: 0 });
            gsap.set(dot, { x: 0 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: `top top`,
                    end: '+=500%',
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    // markers: true,
                    pin: true,
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
                        gsap.set(dot, { x: p * bar.clientWidth });

                        const idx = Math.round(p * steps);
                        if (idx === currentIdx) return;
                        const { w, h } = SIZES[idx];
                        gsap.to(img, {
                            width: w,
                            height: h,
                            duration: 0.35,
                            ease: 'power2.inOut',
                            overwrite: 'auto',
                        });
                        setCurrentIdx(idx);

                        const ticks = Array.from(ticksRef.current?.querySelectorAll('li') ?? []);
                        ticks.forEach((li, i) => li.classList.toggle('active', i === idx));
                        currentIdx = idx;
                    },
                },
                defaults: { ease: 'none' },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="grooming_scroll_section" ref={sectionRef}>
            <div className="viewport" ref={viewPortRef}>
                <div className="frame">
                    <img
                        ref={imgRef}
                        src={IMAGES[currentIdx]}
                        alt={`${currentIdx + 1}`}
                        style={{ width: SIZES[currentIdx].w, height: SIZES[currentIdx].h }}
                    />
                </div>
                <div className="pagination">
                    <div className="pagination_inner">
                        <div className="bar" ref={barRef}>
                            <div className="fill" ref={fillRef}></div>
                            <div className="dot" ref={dotRef}>
                                <i />
                            </div>

                            {/* 마일스톤 틱/라벨 */}
                            <ul className="ticks" ref={ticksRef}>
                                {MILESTONES.map((m) => (
                                    <li key={m.key} style={{ left: `${m.p * 100}%` }}>
                                        <span className="tick" />
                                        <span className="label">{m.label}</span>
                                        <div className="desc">
                                            {m.lines?.map((line, i) => (
                                                <p key={i}>{line}</p>
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Scroll;
