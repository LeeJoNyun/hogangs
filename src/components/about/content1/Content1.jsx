import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FINAL_W = 462;
const FINAL_H = 637;
const FINAL_R = 400;

const LARGE_IMG = '/about/about_visual.webp'; // 풀배경
const SMALL_IMG = '/about/Brandstory.webp'; // 프레임 안
const TEXT_GIF = '/about/hobock.gif';
const TEXT_GIF2 = '/about/hogang.gif';

export default function Content1() {
    const sectionRef = useRef(null);
    const stageRef = useRef(null);
    const frameRef = useRef(null);
    const bgRef = useRef(null);
    const imgSmallRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    const gifRef1 = useRef(null);
    const gifRef2 = useRef(null);

    const visibleRef = useRef(false);
    const wavedOnceRef = useRef(false);
    const waveTweenRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const section = sectionRef.current;
            const stage = stageRef.current;
            const frame = frameRef.current;
            const bg = bgRef.current;
            const imgS = imgSmallRef.current;
            const left = leftRef.current;
            const right = rightRef.current;
            const gif1 = gifRef1.current;
            const gif2 = gifRef2.current;

            if (!section || !stage || !frame || !bg || !imgS || !left || !right) return;

            // 글자 쪼개기 (중복 방지)
            const splitPreserve = (el) => {
                if (!el || el.dataset.split === 'true') return;
                const walk = (node) => {
                    for (const n of Array.from(node.childNodes)) {
                        if (n.nodeType === 3) {
                            const text = n.nodeValue ?? '';
                            const frag = document.createDocumentFragment();
                            for (const ch of text) {
                                const s = document.createElement('span');
                                s.className = 'ch';
                                s.textContent = ch === ' ' ? '\u00A0' : ch;
                                frag.appendChild(s);
                            }
                            n.replaceWith(frag);
                        } else if (n.nodeType === 1) {
                            if (n.classList?.contains?.('ch')) continue;
                            walk(n);
                        }
                    }
                };
                walk(el);
                el.dataset.split = 'true';
            };
            splitPreserve(left);
            splitPreserve(right);

            // 초기 상태 세팅
            gsap.set(stage, { yPercent: 0 });
            gsap.set(bg, { autoAlpha: 1 });
            gsap.set(frame, { width: '100%', borderRadius: 0 });
            gsap.set(imgS, { autoAlpha: 0 });
            gsap.set([left, right], { autoAlpha: 0 });
            gsap.set([gif1, gif2].filter(Boolean), { autoAlpha: 1 });

            const showText = () => {
                if (visibleRef.current) return;
                visibleRef.current = true;
                gsap.to([left, right], {
                    autoAlpha: 1,
                    duration: 0.12,
                    overwrite: 'auto',
                });
            };

            const hideText = () => {
                if (!visibleRef.current) return;
                visibleRef.current = false;
                gsap.to([left, right], {
                    autoAlpha: 0,
                    duration: 0.12,
                    overwrite: 'auto',
                });
            };

            // ScrollTrigger 타임라인
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: '+=160%',
                    scrub: 1.2,
                    pin: true,
                    anticipatePin: 1,
                    onUpdate(self) {
                        const p = self.progress;
                        stage.classList.toggle('with-sides', p >= 0.65);
                        if (p >= 0.7 && p <= 1) showText();
                        else hideText();
                        if (p >= 0.92) {
                            if (!wavedOnceRef.current) {
                                wavedOnceRef.current = true;
                                startWave(section, waveTweenRef);
                            }
                        } else {
                            wavedOnceRef.current = false;
                        }
                    },
                    onLeaveBack() {
                        stage.classList.remove('with-sides');
                        hideText();
                        wavedOnceRef.current = false;
                        if (waveTweenRef.current) {
                            waveTweenRef.current.kill();
                            waveTweenRef.current = null;
                        }
                    },
                },
                defaults: { ease: 'power2.inOut' },
            });

            // 애니메이션 시퀀스
            tl.fromTo(stage, { yPercent: -10 }, { yPercent: 0, duration: 1.0 }, 0);
            tl.to(
                frame,
                {
                    width: FINAL_W,
                    height: FINAL_H,
                    borderRadius: `${FINAL_R}px`,
                    duration: 1.2,
                },
                0
            );
            tl.to(bg, { autoAlpha: 0, duration: 0.6 }, 0.45);
            tl.to(imgS, { autoAlpha: 1, duration: 0.6 }, 0.45);
            if (gif1 || gif2) {
                tl.to([gif1, gif2].filter(Boolean), { autoAlpha: 0, duration: 0.6 }, 0.2);
            }

            // ✅ 글자 + dot 웨이브
            function startWave(section, waveTweenRef) {
                const chars = Array.from(section.querySelectorAll('.ch'));
                const dots = Array.from(section.querySelectorAll('.dot-inner'));

                const pairs = chars.map((ch, i) => [ch, dots[i % dots.length]].filter(Boolean));

                gsap.killTweensOf([...chars, ...dots]);
                gsap.set([...chars, ...dots], { y: 0 });

                const waveTl = gsap.timeline();
                pairs.forEach((pair, i) => {
                    waveTl.to(
                        pair,
                        {
                            keyframes: [
                                { y: -14, duration: 0.28, ease: 'power2.out' },
                                { y: -5, duration: 0.18, ease: 'sine.inOut' },
                                { y: 0, duration: 0.24, ease: 'power1.out' },
                            ],
                        },
                        i * 0.08
                    );
                });

                waveTweenRef.current = waveTl;
            }
        }, sectionRef);

        return () => {
            ctx.revert();

            if (waveTweenRef.current) {
                waveTweenRef.current.kill();
                waveTweenRef.current = null;
            }

            //  현재 section에 걸린 ScrollTrigger만 제거
            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === sectionRef.current) {
                    st.kill();
                }
            });
        };
    }, []);

    return (
        <section id="content1" ref={sectionRef}>
            <div className="stage" ref={stageRef}>
                <div
                    className="bg-cover"
                    ref={bgRef}
                    style={{ backgroundImage: `url(${LARGE_IMG})` }}
                    aria-hidden
                />
                <div
                    className="gif-cover1"
                    ref={gifRef1}
                    style={{ backgroundImage: `url(${TEXT_GIF})` }}
                    aria-hidden
                />
                <div
                    className="gif-cover2"
                    ref={gifRef2}
                    style={{ backgroundImage: `url(${TEXT_GIF2})` }}
                    aria-hidden
                />

                <h2 className="side left with-reflect" ref={leftRef}>
                    <span className="accent">호강</span>의&nbsp;시작
                    <ul className="dots">
                        <li className="dot">
                            <span className="dot-inner"></span>
                        </li>
                        <li className="dot">
                            <span className="dot-inner"></span>
                        </li>
                    </ul>
                </h2>

                <figure className="hero-frame" ref={frameRef}>
                    <img
                        ref={imgSmallRef}
                        className="img-small"
                        src={SMALL_IMG}
                        alt="브랜드 스토리"
                    />
                </figure>

                <h2 className="side right with-reflect" ref={rightRef}>
                    <span className="accent">호강스</span>에서
                    <ul className="dots">
                        <li className="dot">
                            <span className="dot-inner"></span>
                        </li>
                        <li className="dot">
                            <span className="dot-inner"></span>
                        </li>
                        <li className="dot">
                            <span className="dot-inner"></span>
                        </li>
                    </ul>
                </h2>
            </div>

            <div className="text_marquee_area">
                <div className="marquee_wrapper">
                    <div className="marquee__inner">
                        <span>Hogangs</span>
                        <span>Hogangs</span>
                        <span>Hogangs</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
