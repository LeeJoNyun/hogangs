import React, { useLayoutEffect, useRef, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Content2 = () => {
    const rootRef = useRef(null);

    useEffect(() => {
        AOS.init({ duration: 800, easing: 'ease-out', once: false, offset: 0 });
        AOS.refresh();
    }, []);

    useLayoutEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const lines = Array.from(root.querySelectorAll('.texttitle .textline'));

        // 텍스트 split (중복 방지)
        // lines.forEach((line) => {
        //     if (line.dataset.split === 'done') return;

        //     const original = line.textContent;
        //     line.setAttribute('aria-label', original);
        //     line.textContent = '';

        //     const tokens = original.split(/(\s+)/);
        //     const wordIndices = tokens.map((t, i) => ({ i, t })).filter((x) => x.t.trim() !== '');
        //     const order = [...wordIndices.keys()].sort(() => Math.random() - 0.5);

        //     let wordCounter = 0;
        //     tokens.forEach((tok) => {
        //         if (tok.trim() === '') {
        //             line.appendChild(document.createTextNode('\u00A0'.repeat(tok.length)));
        //         } else {
        //             const span = document.createElement('span');
        //             span.className = 'word';
        //             span.style.setProperty('--i', String(order[wordCounter] ?? 0));
        //             span.textContent = tok;
        //             line.appendChild(span);
        //             wordCounter++;
        //         }
        //     });

        //     line.dataset.split = 'done';
        // });

        // ScrollTrigger
        const triggers = lines.map((el) =>
            ScrollTrigger.create({
                trigger: el,
                start: 'top 85%',
                end: 'bottom 20%',
                onEnter: () => el.classList.add('is-in'),
                onLeaveBack: () => el.classList.remove('is-in'),
            })
        );

        return () => {
            triggers.forEach((t) => t.kill());
            ScrollTrigger.getAll().forEach((t) => t.kill()); // ✅ 안전하게 전체 정리
        };
    }, []);

    return (
        <section id="content2" ref={rootRef}>
            <div className="slogan">
                <img src="/about/TitleBox.webp" alt="" />
                <span
                    data-aos="fade-up"
                    data-aos-delay="200" // 0.2초 후 실행
                    data-aos-duration="2000"
                    data-aos-easing="zoom-in"
                >
                    HOGANGS
                </span>
                <h3
                    data-aos="fade-up"
                    data-aos-delay="800" // 0.6초 후 실행 (span보다 늦게)
                    data-aos-duration="2000"
                    data-aos-easing="zoom-in"
                >
                    Brandstory
                </h3>
            </div>

            <ul className="texttitle">
                <li className="textline">
                    호강스는 ‘반려견도 가족이다’ 라는 마음으로 시작되었습니다.
                </li>
                <li className="textline">
                    우리 아이가 집처럼 편안하게 머물고, 보호자가 안심할 수 있는 공간을 만들고자
                    합니다.
                </li>
                <li className="textline">
                    맞춤형 호텔 서비스와 전문적인 미용을 통해 단순한 돌봄이 아닌 특별한 경험을
                    제공합니다.
                </li>
                <li className="textline">
                    작은 발자국 하나에도 행복이 묻어나는 순간, 호강스는 반려견과 보호자가 함께하는
                    모든 시간을 더욱 특별하게 만듭니다.
                </li>
            </ul>

            <div className="dogicon">
                <span data-aos="fade-up" data-aos-duration="2000" data-aos-delay="1000">
                    <img src="/about/01.webp" alt="" />
                </span>
                <span data-aos="fade-up" data-aos-duration="2000" data-aos-delay="1500">
                    <img src="/about/02.webp" alt="" />
                </span>
                <span data-aos="fade-up" data-aos-duration="2000" data-aos-delay="2000">
                    <img src="/about/03.webp" alt="" />
                </span>
            </div>
        </section>
    );
};

export default Content2;
