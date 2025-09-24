import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Section3() {
  const rootRef = useRef(null);
  const leftDoorRef = useRef(null);
  const rightDoorRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const videoRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // 초기 상태 세팅
      gsap.set([leftDoorRef.current, rightDoorRef.current], {
        xPercent: 0, // 서로 중앙에서 맞붙은 상태
        opacity: 1,
        willChange: "transform, opacity",
      });
      gsap.set([titleRef.current, descRef.current], { opacity: 0, y: 20 });
      gsap.set(videoRef.current, { opacity: 0, y: 30 });

      // 스크롤 타임라인(핀 + 스크럽)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=160%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          // markers: true,
        },
        defaults: { ease: "power3.out" },
      });

      // 문 열기(좌우로 50% → 100% 밖으로, 살짝 바운스)
      tl.to(leftDoorRef.current, { xPercent: -100, duration: 1 }, 0)
        .to(rightDoorRef.current, { xPercent: 100, duration: 1 }, 0)
        .to(leftDoorRef.current, { xPercent: -94, duration: 0.25 }, ">-0.1")
        .to(leftDoorRef.current, { xPercent: -100, duration: 0.25 }, ">-0.02")
        .to(rightDoorRef.current, { xPercent: 94, duration: 0.25 }, "<")
        .to(rightDoorRef.current, { xPercent: 100, duration: 0.25 }, ">-0.02")
        .to(
          [leftDoorRef.current, rightDoorRef.current],
          { opacity: 0, duration: 0.4 },
          ">-0.1"
        );

      // 컨텐츠 페이드인
      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.25")
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.6 }, "<0.1")
        .to(videoRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.2");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="section3" ref={rootRef}>
      {/* 이미지 문 패널 (좌/우) */}
      <div
        className="s3-door s3-door--left s3-door--img"
        ref={leftDoorRef}
        aria-hidden="true"
      />
      <div
        className="s3-door s3-door--right s3-door--img"
        ref={rightDoorRef}
        aria-hidden="true"
      />

      <div className="inner">
        <div className="textcontent">
          <h2 ref={titleRef}>PawFlix</h2>
          <p ref={descRef}>소중한 반려견과 함께하는 달콤한 휴식</p>
        </div>
      </div>

      <div className="video">
        <div className="video-frame" ref={videoRef}>
          <video
            src="https://port-0-teampf-be-mfuk3dbl08000d12.sel3.cloudtype.app/video/dog.mp4?raw=true"
            loop
            muted
            autoPlay
            playsInline
            width="1800"
            height="817"
          />
        </div>
      </div>
    </section>
  );
}
