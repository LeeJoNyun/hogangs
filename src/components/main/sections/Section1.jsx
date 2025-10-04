import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
gsap.registerPlugin(ScrollTrigger);

const PHOTOS = [
    '/main/Mainbubble-01.webp',
    '/main/Mainbubble-02.webp',
    '/main/Mainbubble-03.webp',
    '/main/Mainbubble-04.webp',
    '/main/Mainbubble-05.webp',
];

export default function Section1() {
    const root = useRef(null);
    const bgRef = useRef(null);

    const navigate = useNavigate();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const photos = root.current.querySelectorAll('.photo');
            const lines = root.current.querySelectorAll('.copy-line'); // 2개 그룹 (겹쳐 놓기)
            const copyEl = root.current.querySelector('.copy');

            // 텍스트 초기값 (opacity/visibility만)
            gsap.set(lines, { autoAlpha: 0, yPercent: 10, willChange: 'opacity, transform' });

            // 섹션 안에서만 copy 레이어 보이기
            ScrollTrigger.create({
                trigger: root.current,
                start: 'top bottom',
                end: 'bottom top',
                onEnter: () => gsap.to(copyEl, { autoAlpha: 1, duration: 0.2 }),
                onEnterBack: () => gsap.to(copyEl, { autoAlpha: 1, duration: 0.2 }),
                onLeave: () => gsap.to(copyEl, { autoAlpha: 0, duration: 0.2 }),
                onLeaveBack: () => gsap.to(copyEl, { autoAlpha: 0, duration: 0.2 }),
            });

            // 배경 오버레이: 스크롤할수록 서서히 드러남
            if (bgRef.current) {
                gsap.set(bgRef.current, {
                    opacity: 0,
                    scale: 0.85,
                    willChange: 'opacity, transform',
                });
                gsap.fromTo(
                    bgRef.current,
                    { opacity: 0, scale: 0.85 },
                    {
                        opacity: 1,
                        scale: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: root.current,
                            start: 'top top',
                            end: 'bottom top',
                            scrub: true,
                            onLeave: () => gsap.set(bgRef.current, { opacity: 0 }),
                            onLeaveBack: () => gsap.set(bgRef.current, { opacity: 0 }),
                        },
                    }
                );
            }

            // 진행도에 따라 한 그룹만 보여주기
            let current = -1;
            const D_IN = 0.25;
            const D_OUT = 0.25;

            const showOnly = (idx) => {
                if (idx === current) return;
                current = idx;

                gsap.to(lines, {
                    autoAlpha: 0,
                    yPercent: -10,
                    duration: D_OUT,
                    ease: 'power1.out',
                    overwrite: true,
                });

                if (idx >= 0 && lines[idx]) {
                    gsap.to(lines[idx], {
                        autoAlpha: 1,
                        yPercent: 0,
                        duration: D_IN,
                        ease: 'power1.out',
                        overwrite: true,
                    });
                }
            };

            ScrollTrigger.create({
                trigger: root.current,
                start: 'top top',
                end: 'bottom bottom',
                onUpdate: (self) => {
                    const p = self.progress;
                    if (p < 0.1) showOnly(-1);
                    else if (p < 0.4) showOnly(0);
                    else if (p < 0.6) showOnly(-1);
                    else if (p < 0.9) showOnly(1);
                    else showOnly(-1);
                },
            });

            // 이미지 파랄럭스
            photos.forEach((el, i) => {
                gsap.to(el, {
                    y: -(60 + i * 12),
                    ease: 'none',
                    force3D: true,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 0.6,
                    },
                });
            });

            // 이미지 로딩 후 refresh
            const imgs = root.current.querySelectorAll('.photo img');
            let loaded = 0;
            const refresh = () => ScrollTrigger.refresh();
            imgs.forEach((img) => {
                if (img.complete) loaded++;
                else
                    img.addEventListener(
                        'load',
                        () => {
                            if (++loaded === imgs.length) refresh();
                        },
                        { once: true }
                    );
            });
            if (loaded === imgs.length) refresh();
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <section className="section1" ref={root}>
            <div ref={bgRef} className="section1__bg" aria-hidden />

            <div className="photo-list">
                {PHOTOS.map((src, i) => (
                    <figure className={`photo ${i % 2 ? 'left' : 'right'}`} key={i}>
                        <img src={src} alt="" loading="lazy" decoding="async" />
                    </figure>
                ))}
            </div>
            <div className="inner">
                <div className="copy">
                    <div
                        className="copy-line"
                        data-cursor="hogangs"
                        onClick={() => {
                            navigate('/hotel');
                        }}
                    >
                        <h3>강아지의 두 번째 집, 호강스 호텔</h3>
                        <p>편안한 휴식과 안전한 돌봄</p>
                        <span>호텔 예약 현황 확인하기</span>
                    </div>
                    <div
                        className="copy-line"
                        data-cursor="hogangs"
                        onClick={() => {
                            navigate('/hotel');
                        }}
                    >
                        <h3>건강하게, 예쁘게, 호강스 미용</h3>
                        <p>사랑을 담은 세심한 케어</p>
                        <span>미용 예약 현황 확인하기</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
