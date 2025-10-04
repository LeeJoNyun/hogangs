import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DURATION = 5000;
const slides = [
    {
        id: '01',
        title: '따뜻한 두 번째 집',
        desc: '보호자가 믿고 맡길 수 있는\n 신뢰감 있는 호텔 & 미용 서비스',
        img: '/about/doghead.webp',
        focal: '50% 42%',
    },
    {
        id: '02',
        title: '귀엽고 즐거운 경험',
        desc: '강아지의 행복한 표정과\n 즐거움을 최우선으로',
        img: '/about/doghead.webp',
        focal: '50% 42%',
    },
    {
        id: '03',
        title: '사랑을 담은 세심한 케어',
        desc: '단순 관리가 아닌 반려견을\n 가족처럼 아끼는 브랜드 철학',
        img: '/about/doghead.webp',
        focal: '50% 42%',
    },
];

export default function Content3() {
    const [index, setIndex] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const pinSectionRef = useRef(null);
    const titleRef = useRef(null);

    // 스크롤로 index 전환 (핀 구간 300%)
    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: pinSectionRef.current,
                start: 'top top',
                end: '+=300%',
                scrub: true,
                pin: true,
                // markers: true,
                onEnter: () => {
                    setIsActive(true);
                    setIndex(0);
                },
                onLeave: () => setIsActive(false),
                onLeaveBack: () => setIsActive(false),
                onUpdate: (self) => {
                    const newIndex = Math.min(
                        slides.length - 1,
                        Math.floor(self.progress * slides.length)
                    );
                    setIndex(newIndex);
                },
            });
        }, pinSectionRef);
        return () => ctx.revert();
    }, []);

    // 자동 전환 (5초)
    useEffect(() => {
        const t = setTimeout(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, DURATION);
        return () => clearTimeout(t);
    }, [index]);

    useEffect(() => {
        const titleEl = titleRef.current;
        if (!titleEl) return;

        const text = slides[index].title;
        titleEl.innerHTML = '';

        // 글자 단위로 span 생성
        const letters = text.split('').map((ch) => {
            const span = document.createElement('span');
            span.className = 'letter';
            span.textContent = ch === ' ' ? '\u00A0' : ch;
            titleEl.appendChild(span);
            return span;
        });

        // 애니메이션 (위에서 떨어지는 느낌)
        letters.forEach((span, i) => {
            gsap.fromTo(
                span,
                { opacity: 0, y: -80, rotateX: 90 }, // 시작: 위쪽 + 기울어진 상태
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    delay: i * 0.05, // 순차 등장
                    duration: 0.6,
                    ease: 'back.out(1.2)', // 떨어지는 듯한 탄성 효과
                }
            );
        });
    }, [index]);

    const { id, title, desc, img, focal } = slides[index];

    return (
        <section id="content3" ref={pinSectionRef}>
            <div className="content-box fade" key={id}>
                <div className="visual">
                    <img src={img} alt="" style={{ objectFit: 'cover', objectPosition: focal }} />
                </div>

                <div className="texts">
                    <strong className="title" ref={titleRef}></strong>
                    <p
                        className="desc"
                        data-aos="zoom-in"
                        data-aos-delay="800" // 0.2초 후 실행
                        data-aos-duration="1000"
                        data-aos-easing="zoom-in"
                    >
                        {desc}
                    </p>
                </div>
            </div>

            <div className="pagination" aria-label="slides">
                {slides.map(({ id }, i) => (
                    <button
                        key={id}
                        className={index === i ? 'active' : ''}
                        onClick={() => setIndex(i)}
                        aria-current={index === i ? 'true' : 'false'}
                    >
                        <svg className="progress-ring" viewBox="0 0 36 36">
                            <circle className="bg" cx="18" cy="18" r="16" />
                            {index === i && (
                                <circle
                                    className="progress"
                                    cx="18"
                                    cy="18"
                                    r="16"
                                    style={{ animationDuration: `${DURATION}ms` }}
                                />
                            )}
                        </svg>
                        <span className="label">{id}</span>
                    </button>
                ))}
            </div>

            <div className="boneBanner" aria-hidden="true" />
        </section>
    );
}
