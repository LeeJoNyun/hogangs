import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section5 = () => {
    const sectionRef = useRef(null);
    const pinSectionRef = useRef(null);
    const cardsWrapRef = useRef(null);
    const instaDog1Ref = useRef(null);
    const instaDog2Ref = useRef(null);
    const gridWrapRef = useRef(null);

    const cardTextRef = useRef(null);
    const instaText1Ref = useRef(null);
    const instaText2Ref = useRef(null);

    const images = Array.from({ length: 18 }, (_, i) => `/main/instaDog${i + 1}.webp`);

    const isMobile = window.innerWidth <= 600;

    useEffect(() => {
        if (!pinSectionRef.current) return;

        let isMounted = true; // ✅ 언마운트 플래그

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: pinSectionRef.current,
                    start: 'top top',
                    end: isMobile ? '+=150%' : '+=300%',
                    scrub: true,
                    pin: true,
                },
            });

            if (cardTextRef.current) {
                tl.fromTo(
                    cardTextRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.5 }
                );
                tl.to(cardTextRef.current, {
                    y: 100,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                });
            }

            if (instaDog1Ref.current) {
                tl.to(instaDog1Ref.current, {
                    width: isMobile ? '100%' : 890,
                    height: isMobile ? 358 : 890,
                    x: isMobile ? 0 : '-455px',
                    y: isMobile ? -200 : 0,
                    ease: 'power2.out',
                    duration: 1.2,
                });
            }

            if (instaDog2Ref.current) {
                tl.fromTo(
                    instaDog2Ref.current,
                    {
                        width: isMobile ? '100%' : 890,
                        height: isMobile ? 358 : 890,
                        opacity: 0,
                        x: isMobile ? 0 : '100vw',
                        y: isMobile ? 200 : 0,
                    },
                    {
                        opacity: 1,
                        x: isMobile ? 0 : '455px',
                        y: isMobile ? '170px' : 0,
                        ease: 'power2.out',
                        duration: 1.2,
                    },
                    '<'
                );
            }

            if (instaText1Ref.current && instaText2Ref.current) {
                tl.fromTo(
                    [instaText1Ref.current, instaText2Ref.current],
                    { opacity: 0, scale: 0.9 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        ease: 'power2.out',
                        delay: 0.3,
                    }
                );
            }

            if (gridWrapRef.current) {
                if (!isMobile) {
                    gsap.set(gridWrapRef.current, {
                        scale: 3.1,
                        opacity: 0,
                        display: 'none',
                    });

                    tl.to(cardsWrapRef.current, {
                        opacity: 0,
                        scale: 0.5,
                        duration: 0.6,
                        ease: 'power1.inOut',
                    });

                    tl.to(
                        gridWrapRef.current,
                        {
                            scale: 1,
                            opacity: 1,
                            duration: 1.2,
                            ease: 'power2.out',
                            onStart: () => {
                                if (isMounted && gridWrapRef.current) {
                                    gridWrapRef.current.style.display = 'grid';
                                }
                            },
                            onReverseComplete: () => {
                                if (isMounted && gridWrapRef.current) {
                                    gridWrapRef.current.style.display = 'none';
                                }
                            },
                        },
                        '<'
                    );
                } else {
                    gsap.set(gridWrapRef.current, { opacity: 0, display: 'grid' });

                    gsap.to(gridWrapRef.current, {
                        opacity: 1,
                        duration: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: gridWrapRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    });
                }
            }
        }, sectionRef);

        return () => {
            isMounted = false; // ✅ 언마운트 시 플래그 false
            ctx.revert();
        };
    }, []);

    useEffect(() => {
        const instaUrl = 'https://www.instagram.com/p/DO34Ee6Erkc/';

        const handleClick = (e) => {
            const t = e.target.closest('[data-cursor="hogangs"]');
            if (t) {
                window.open(instaUrl, '_blank', 'noopener,noreferrer');
            }
        };

        const section = sectionRef.current;
        if (section) {
            section.addEventListener('click', handleClick, true);
        }

        return () => {
            if (section) {
                section.removeEventListener('click', handleClick, true);
            }
        };
    }, []);

    return (
        <section id="main_section5" ref={sectionRef} className="section5">
            <div className="title">
                <p>Instagram</p>
                <h2>
                    오늘도 <span>예쁘개</span> 찰칵
                </h2>
            </div>

            <div ref={pinSectionRef} className="pin-section">
                <div ref={cardsWrapRef} className="cards-wrap">
                    <img
                        ref={instaDog1Ref}
                        src={isMobile ? '/main/instaDogMobile.webp' : '/main/instaDog9.webp'}
                        alt="instaDog1"
                        className="insta-dog1"
                    />

                    <div className="card-text" ref={cardTextRef} data-cursor="hogangs">
                        @hogangs
                    </div>

                    <img
                        ref={instaDog2Ref}
                        src="/main/instaDog10.webp"
                        alt="instaDog2"
                        className="insta-dog2"
                    />

                    <div className="insta-text insta-text1" ref={instaText1Ref}>
                        즐겁게 놀고 <br /> 예쁘게 돌아오는 곳
                    </div>

                    <div
                        className="insta-text insta-text2"
                        ref={instaText2Ref}
                        data-cursor="hogangs"
                    >
                        @hogangs
                    </div>
                </div>

                <div ref={gridWrapRef} className="grid-wrap">
                    {(isMobile ? images.slice(0, 8) : images).map((src, i) => (
                        <img key={i} src={src} alt={`instaDog${i + 1}`} className="grid-item" />
                    ))}
                </div>
            </div>

            <p data-cursor="hogangs">@hogangs</p>
        </section>
    );
};

export default Section5;
