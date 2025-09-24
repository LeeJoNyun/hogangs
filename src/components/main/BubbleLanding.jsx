import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";

import { setCookie } from "../../utils/Cookie";
import HogangsCursor from "../util/HogangsCursor";

export default function BubbleLanding({ onClose }) {
  const [popped, setPopped] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [origin, setOrigin] = useState({ x: "50%", y: "50%" });
  const [startMarquee, setStartMarquee] = useState(false);

  const overlayRef = useRef(null);
  const bubbleWrapRef = useRef(null);
  const bubbleRef = useRef(null);
  const circleRef = useRef(null);
  const ulRef = useRef(null);
  const logoRef = useRef(null); // ✅ 로고 ref
  const shapeRef = useRef(null);
  const marqueeStopRef = useRef(null); // ticker 정리용

  const shapeFrameRef = useRef(null); // div.landing-shape
  const shapeTrackRef = useRef(null); // ul.shape-track

  const marchTl = useRef(null);

  useEffect(() => {
    const waitImages = async (el) => {
      const imgs = Array.from(el.querySelectorAll("img"));
      await Promise.all(
        imgs.map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((res) => {
                img.addEventListener("load", res, { once: true });
                img.addEventListener("error", res, { once: true });
              })
        )
      );
    };

    // ✅ ModifiersPlugin 없이 끊김 없는 무한 배너
    const startMarquee = async (speed = 160) => {
      const track = shapeTrackRef.current; // ul.shape-track
      if (!track) return;

      // 두 세트 구성(중복 방지)
      if (!track.dataset.cloned) {
        track.innerHTML += track.innerHTML;
        track.dataset.cloned = "true";
      }

      await waitImages(track);

      const half = track.scrollWidth / 2; // 원본 세트 길이
      if (!half) return;

      // 이전 루프 정리
      if (marqueeStopRef.current) marqueeStopRef.current();
      gsap.set(track, { x: 0 });

      let x = 0;
      const tick = () => {
        const dr = gsap.ticker.deltaRatio(); // 프레임 보정
        x -= (speed / 60) * dr; // px/frame
        if (x <= -half) x += half; // 랩핑
        gsap.set(track, { x });
      };

      gsap.ticker.add(tick);
      marqueeStopRef.current = () => gsap.ticker.remove(tick);
    };

    // 페이지 진입 시 스크롤 잠금
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const ul = ulRef.current;
    if (!ul) return;

    // 초기화 후 원본 2개만 구성
    ul.innerHTML = "";
    const originals = [
      { normal: "/main/ganady.png", variant: "/main/ganady01.png" },
      { normal: "/main/ganady.png", variant: "/main/ganady01.png" },
    ];
    originals.forEach(() => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="dog">
          <img src="/main/ganady.png" alt="dog" />
          <img class="variant" src="/main/ganady01.png" alt="dog-variant" />
        </div>`;
      ul.appendChild(li);
    });

    const originalCount = ul.children.length;

    const ensureWidth = () => {
      const need = window.innerWidth * 2;
      while (ul.scrollWidth < need) {
        for (let i = 0; i < originalCount; i++) {
          ul.appendChild(ul.children[i].cloneNode(true));
        }
      }
    };
    ensureWidth();
    window.addEventListener("resize", ensureWidth);

    // ===== 행진 타임라인(처음엔 pause) =====
    const hodus = ul.querySelectorAll(".dog");
    const tl = gsap.timeline({ repeat: -1, paused: true });

    const shift = (px) => {
      gsap.to(ul, {
        x: `-=${px}`,
        duration: px / 100, // 빠르게 이동
        ease: "linear",
        onUpdate: () => {
          const x = Math.abs(parseFloat(gsap.getProperty(ul, "x")) || 0);
          const half = ul.scrollWidth / 2;
          if (x >= half) gsap.set(ul, { x: -(x - half) });
        },
      });
    };

    tl.to(hodus, {
      rotation: -15,
      x: -6,
      duration: 0.7,
      ease: "sine.inOut",
      onStart: () => shift(100),
    })
      .to(hodus, {
        rotation: 15,
        x: 6,
        duration: 0.7,
        ease: "sine.inOut",
        onStart: () => shift(20),
      })
      .to(hodus, {
        rotation: 0,
        x: 0,
        scaleY: 0.72,
        scaleX: 1.18,
        duration: 0.28,
        ease: "power1.out",
      })
      .to(hodus, {
        scaleY: 1,
        scaleX: 1,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
        onStart: () => shift(20),
      });

    marchTl.current = tl;

    // ===== 인트로: 같은 행진 라인을 크게 보여주고 축소 =====
    gsap.set(ul, { scale: 1.5, opacity: 0, transformOrigin: "50% 50%" });
    gsap.set(bubbleWrapRef.current, { opacity: 0 });
    gsap.set(logoRef.current, { opacity: 0, y: -10 }); // ✅ 로고 처음엔 숨김
    gsap.set(shapeFrameRef.current, { opacity: 0, y: -10 }); // ✅ 로고 처음엔 숨김

    const introTl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        // 인트로가 끝나면 행진 시작 & 버블/로고 페이드인
        marchTl.current?.play();
        gsap.to(bubbleWrapRef.current, {
          opacity: 1,
          duration: 0.6,
          ease: "power1.out",
        });
        gsap.to(logoRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }); // ✅ 이제 로고 나타남
        gsap.to(shapeFrameRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            startMarquee(100);
          },
        }); // ✅ 이제 로고 나타남

        // 버블 둥실둥실
        if (bubbleRef.current) {
          const b = bubbleRef.current;
          const floatAmt = () =>
            (b.getBoundingClientRect().height || 400) * 0.045;
          gsap.to(b, {
            y: -floatAmt(),
            duration: 2.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      },
    });

    introTl
      .to(ul, { opacity: 1, duration: 0.35 })
      .to(ul, { duration: 0.6 }) // hold 시간(확대 상태 더 오래 보기)
      .to(ul, { scale: 1.0, duration: 1.4 }, "<");

    // ===== 버블 판정: "가까운 1개" + 더 안쪽에서만 바뀜 =====
    const tick = () => {
      const circle = circleRef.current;
      const list = ulRef.current;
      if (!circle || !list) return;

      const cRect = circle.getBoundingClientRect();
      const cx = cRect.left + cRect.width / 2;
      const cy = cRect.top + cRect.height / 2;
      const r = cRect.width / 2;

      const innerFactor = 0.74;
      const rInner2 = (r * innerFactor) ** 2;

      const items = Array.from(list.querySelectorAll("li"));
      let best = null;
      for (const li of items) {
        const rct = li.getBoundingClientRect();
        const lx = (rct.left + rct.right) / 2;
        const ly = (rct.top + rct.bottom) / 2;
        const dx = cx - lx;
        const dy = cy - ly;
        const d2 = dx * dx + dy * dy;
        if (best === null || d2 < best.d2) best = { li, d2 };
      }
      items.forEach((li) => li.classList.remove("in-bubble"));
      if (best && best.d2 <= rInner2) best.li.classList.add("in-bubble");
    };

    gsap.ticker.add(tick);
    window.addEventListener("resize", tick);

    return () => {
      document.body.style.overflow = prevOverflow;
      introTl.kill();
      marchTl.current?.kill();

      gsap.ticker.remove(tick);
      window.removeEventListener("resize", tick);
      window.removeEventListener("resize", ensureWidth);
    };
  }, []);

  // 파편
  const generateParticles = () => {
    const arr = [];
    for (let i = 0; i < 28; i++) {
      const ang = Math.random() * Math.PI * 2;
      const dist = 40 + Math.random() * 80;
      arr.push(
        <div
          key={i}
          className="bubble-particle"
          style={{
            "--x": `${Math.cos(ang) * dist}px`,
            "--y": `${Math.sin(ang) * dist}px`,
          }}
        />
      );
    }
    return arr;
  };

  // 팝 → 중앙에서 바깥으로 리빌
  const handlePop = () => {
    if (popped) return;
    const overlay = overlayRef.current;
    const bubble = bubbleRef.current;
    if (!overlay || !bubble) return;

    const o = overlay.getBoundingClientRect();
    const b = bubble.getBoundingClientRect();
    const cxPct = ((b.left + b.width / 2 - o.left) / o.width) * 100;
    const cyPct = ((b.top + b.height / 2 - o.top) / o.height) * 100;
    const cxPx = b.left + b.width / 2 - o.left;
    const cyPx = b.top + b.height / 2 - o.top;

    overlay.style.setProperty("--cx", `${cxPct}%`);
    overlay.style.setProperty("--cy", `${cyPct}%`);
    setOrigin({ x: `${cxPx}px`, y: `${cyPx}px` });

    setPopped(true);
    setShowParticles(true);

    // cookie 적용
    setCookie("landing", "1", 1);

    setTimeout(() => {
      overlay.classList.add("reveal");
      setTimeout(() => onClose && onClose(), 1200);
    }, 500);
  };

  return (
    <>
      <HogangsCursor
        src="/main/m.png" // <- 네가 넣은 경로
        size={150}
        speed={2} // 숫자 작을수록 빠름(초/회전)
      />
      <div
        ref={overlayRef}
        className={`landing-overlay ${popped ? "pop" : ""}`}
      >
        {/* ✅ 로고: 인트로 동안 숨김, 인트로 끝나고 페이드인 */}
        <h2
          ref={logoRef}
          className="landing-logo"
          aria-hidden={popped ? "true" : "false"}
        />

        {/* 강아지 행진 */}
        <div className="mung-content">
          <ul ref={ulRef}>
            {["/main/ganady.png", "/main/ganady01.png"].map((_, idx) => (
              <li key={idx}>
                <div className="dog">
                  <img src="/main/ganady.png" alt="" />
                  <img className="variant" src="/main/ganady01.png" alt="" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* 버블 (인트로 끝날 때 페이드인) */}
        <div
          ref={bubbleWrapRef}
          className="bubble-wrap"
          aria-hidden={popped ? "true" : "false"}
        >
          <svg
            ref={bubbleRef}
            className={`bubble ${popped ? "popping" : ""}`}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            overflow="visible"
            onClick={handlePop}
            aria-label="bubble"
            data-cursor="hogangs"
          >
            <defs>
              <radialGradient
                id="natural-bubble-grad"
                cx="30%"
                cy="30%"
                r="70%"
              >
                <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="30%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="70%" stopColor="rgba(200,230,255,0.05)" />
                <stop offset="90%" stopColor="rgba(255,200,255,0.08)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
              </radialGradient>
              <linearGradient
                id="subtle-rainbow"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(255,200,200,0.3)" />
                <stop offset="25%" stopColor="rgba(200,255,200,0.3)" />
                <stop offset="50%" stopColor="rgba(200,200,255,0.3)" />
                <stop offset="75%" stopColor="rgba(255,255,200,0.3)" />
                <stop offset="100%" stopColor="rgba(255,200,255,0.3)" />
              </linearGradient>
              <filter
                id="bubble-filter"
                x="-60%"
                y="-60%"
                width="220%"
                height="220%"
              >
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="0.3"
                  result="soft"
                />
                <feMerge>
                  <feMergeNode in="soft" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter
                id="bubble-shadow"
                x="-60%"
                y="-60%"
                width="220%"
                height="220%"
              >
                <feDropShadow
                  dx="0"
                  dy="10"
                  stdDeviation="10"
                  floodColor="rgba(0,0,0,0.28)"
                />
              </filter>
            </defs>

            <g filter="url(#bubble-shadow)">
              <circle
                ref={circleRef}
                cx="50"
                cy="50"
                r="48"
                fill="url(#natural-bubble-grad)"
                stroke="url(#subtle-rainbow)"
                strokeWidth="1"
                filter="url(#bubble-filter)"
              />
              <ellipse
                cx="40"
                cy="36"
                rx="12"
                ry="7"
                fill="rgba(255,255,255,0.4)"
              />
              <circle cx="45" cy="32" r="2" fill="rgba(255,255,255,0.5)" />
              <circle cx="60" cy="42" r="1.5" fill="rgba(255,255,255,0.3)" />
              <circle cx="35" cy="55" r="1.2" fill="rgba(255,255,255,0.25)" />
            </g>
          </svg>
        </div>

        {/* 팝 파편 */}
        <div
          className="particles-container"
          style={{ "--origin-x": origin.x, "--origin-y": origin.y }}
        >
          {showParticles && generateParticles()}
        </div>

        <div ref={shapeFrameRef} className="landing-shape">
          {" "}
          {/* 프레임: 고정 */}
          <ul ref={shapeTrackRef} className="shape-track">
            {" "}
            {/* 트랙: 이동 */}
            <li>
              <img className="bone" src="/main/Bone-shape.png" alt="" />
            </li>
            <li>
              <img className="bone" src="/main/Bone-shape.png" alt="" />
            </li>
            <li>
              <img className="bone" src="/main/Bone-shape.png" alt="" />
            </li>
            <li>
              <img className="bone" src="/main/Bone-shape.png" alt="" />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
