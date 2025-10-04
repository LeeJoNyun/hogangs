import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section4Item from './Section4Item';

gsap.registerPlugin(ScrollTrigger);

const card = [
    {
        id: 1,
        name: '콩이님',
        star: '/main/star.webp',
        dog: '/main/Reviews-image01.webp',
        score: '5',
        description:
            '우리 콩이가 처음 호텔에 묵었는데 너무 걱정했어요. 매일 보내주시는 사진과 영상 덕분에 출장 중에도 마음이 놓였답니다. 덕분에 콩이가 즐겁게 잘 쉬고 돌아왔어요!',
    },
    {
        id: 2,
        name: '루비님',
        star: '/main/star.webp',
        dog: '/main/Reviews-image02.webp',
        score: '5',
        description:
            '처음 맡기는 거라 많이 불안했는데, 아이 성격을 바로 파악해주시고 세심히 챙겨주셔서 감동했답니다. 루비가 집처럼 편안하게 쉬다 와서 저도 행복했어요.',
    },
    {
        id: 3,
        name: '몽이님',
        star: '/main/star.webp',
        dog: '/main/Reviews-image03.webp',
        score: '5',
        description:
            '예민한 성격의 몽이가 낯선 공간에 잘 적응할까 걱정했는데, 호텔에 도착하자마자 웃는 사진을 보내주셔서 안심했어요. 섬세한 케어와 관심 덕분에 아이가 즐겁게 보내고 왔습니다.',
    },
    {
        id: 4,
        name: '해피님',
        star: '/main/star.webp',
        dog: '/main/Reviews-image04.webp',
        score: '5',
        description:
            '호텔 내부가 정말 깨끗하고 청결하게 관리되고 있었어요. 향도 은은하고 따뜻한 분위기라서 아이가 금방 편해졌습니다. \n 믿고 맡길 수 있는 곳을 찾아 너무 기쁩니다.',
    },
    {
        id: 5,
        name: '달콩님',
        star: '/main/star.webp',
        dog: '/main/Reviews-image05.webp',
        score: '5',
        description:
            '실시간 CCTV가 있어서 언제든 확인할 수 있는 게 정말 좋아요. 아이의 모습을 직접 확인하니 마음이 놓이고 믿음이 생겼습니다. \n다음에도 꼭 호강스를 이용할 거예요.',
    },
    {
        id: 6,
        name: '두부님',
        star: '/main/star.webp',
        dog: '/main/Reviews-image06.webp',
        score: '5',
        description:
            '출장으로 장기간 집을 비워야 해서 걱정이 많았는데, 호텔에서 매일 아이 사진과 영상을 보내주셔서 덕분에 멀리 있어도 두부와 마루가 행복하게 지내는 걸 느꼈습니다.',
    },
    {
        id: 7,
        name: '보리님',
        star: '/main/star.webp',
        dog: '/main/Reviews-image07.webp',
        score: '5',
        description:
            '호텔에서 미용까지 함께 맡겼는데 너무 만족스러워요. 아이 털 상태도 부드럽고 스타일도 예쁘게 완성돼서 돌아왔답니다.\n 보리가 행복해 보여 저도 흐뭇했어요.',
    },
    {
        id: 8,
        name: '쪼꼬님',
        star: '/main/star.webp',
        dog: '/main/Reviews-image08.webp',
        score: '5',
        description:
            '아이 성향에 맞춰 세심하게 케어해주셔서 정말 감사했어요. 사소한 부분까지 챙겨주시고,\n 아이가 편안하게 지낼 수 있도록 최선을 다해주시는 모습이 느껴졌습니다.',
    },
    {
        id: 9,
        name: '똘이님',
        star: '/main/star.webp',
        dog: '/main/Reviews-image09.webp',
        score: '5',
        description:
            '산책 서비스가 있다는 점이 너무 좋았어요! 호텔에서 지루하지 않게 매일 산책도 해주시고, 돌아와서 행복하게 쉬는 모습에 감동했습니다.',
    },
];

export default function Section4List() {
    const sectionRef = useRef(null);
    const bgRef = useRef(null);
    const itemsRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // ✅ 원형 배경 회전
            gsap.set(bgRef.current, { rotation: 0, transformOrigin: '50% 50%' });
            gsap.to(bgRef.current, {
                rotation: 360,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: '+=6000',
                    scrub: true,
                    // markers: true,
                },
            });

            // ✅ items 안에 들어있는 카드 배열
            const items = gsap.utils.toArray(
                itemsRef.current.querySelectorAll('.main_Section4item')
            );
            const k = 5000;
            // ✅ 가로 스크롤
            gsap.to(items, {
                xPercent: -70 * (items.length - 1),
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    scrub: 1,
                    start: '25% top',
                    end: () => `+=${k}`,
                    // markers: true,
                },
            });

            items.forEach((el, i) => {
                gsap.to(el.querySelector('.con1'), {
                    y: i % 2 === 0 ? 50 : -50,
                    rotation: i % 2 === 0 ? 8 : -8,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        scrub: 1.2,
                        start: 'center center',
                        end: () => `+=400`,
                        // markers: true,
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="main_Section4List" ref={sectionRef}>
            <div className="rotating-bg" ref={bgRef}></div>
            <div className="inner">
                <h2>호강이들과</h2>
                <div className="text">
                    <p>함께한 </p>
                    <span>이야기</span>
                </div>
                <div className="items" ref={itemsRef}>
                    {card.map((item) => (
                        <Section4Item key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}
