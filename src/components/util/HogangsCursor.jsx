import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * 호버 타겟(selector) 위에 마우스를 올리면
 * - 네이티브/전역 커서(발바닥 포함) 완전 숨김
 * - 회전 이미지 + 중앙 텍스트를 커서 위치에 표시
 */
export default function HogangsCursor({
    src, // 회전 이미지(svg/webp 등)
    size = 160,
    speed = 0.3, // 1바퀴(sec)
    centerText = '클릭하개',
    centerColor = '#fff',
    centerFontSize = 18,
    centerWeight = 800,
    selector = '[data-cursor="hogangs"]',
}) {
    const wrapRef = useRef(null);
    const ringRef = useRef(null);

    // 원래 cursor 값을 복구하기 위해 저장
    const prevCursor = useRef({ html: '', body: '' });

    useEffect(() => {
        const wrap = wrapRef.current;
        const ring = ringRef.current;
        if (!wrap || !ring) return;

        Object.assign(wrap.style, {
            position: 'fixed',
            left: '-9999px',
            top: '-9999px',
            width: `${size}px`,
            height: `${size}px`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: '2147483647',
            opacity: '0',
            visibility: 'hidden',
            transition: 'opacity .15s ease',
        });

        const spin = gsap.to(ring, {
            rotation: 360,
            ease: 'none',
            duration: 5,
            repeat: -1,
            paused: true,
            transformOrigin: '50% 50%',
        });

        const onMove = (e) => {
            wrap.style.left = `${e.clientX}px`;
            wrap.style.top = `${e.clientY}px`;
        };

        const forceHideNativeCursor = () => {
            const html = document.documentElement;
            const body = document.body;
            // 현재 인라인 cursor 값을 저장했다가 복구
            prevCursor.current.html = html.style.cursor;
            prevCursor.current.body = body.style.cursor;
            html.style.cursor = 'none';
            body.style.cursor = 'none';
            html.setAttribute('data-hgc', 'on'); // 선택적으로 전역 스타일 토글도 유지
        };

        const restoreNativeCursor = () => {
            const html = document.documentElement;
            const body = document.body;
            html.style.cursor = prevCursor.current.html || '';
            body.style.cursor = prevCursor.current.body || '';
            html.removeAttribute('data-hgc');
        };

        const show = () => {
            if (wrap.style.visibility === 'visible') return;
            document.addEventListener('pointermove', onMove, { passive: true });
            forceHideNativeCursor();
            wrap.style.visibility = 'visible';
            wrap.style.opacity = '1';
            spin.play();
        };

        const hide = () => {
            if (wrap.style.visibility === 'hidden') return;
            document.removeEventListener('pointermove', onMove);
            restoreNativeCursor();
            wrap.style.opacity = '0';
            wrap.style.visibility = 'hidden';
            wrap.style.left = '-9999px';
            wrap.style.top = '-9999px';
            spin.pause();
        };

        let currentEl = null;

        const over = (e) => {
            const t = e.target.closest(selector);
            if (t) {
                currentEl = t;
                show();
            }
        };
        const out = (e) => {
            if (!currentEl) return;
            const to = e.relatedTarget;
            if (!to || !currentEl.contains(to)) {
                currentEl = null;
                hide();
            }
        };

        document.addEventListener('pointerover', over, true);
        document.addEventListener('pointerout', out, true);
        window.addEventListener('blur', hide, true);
        document.addEventListener('visibilitychange', () => document.hidden && hide(), true);

        return () => {
            document.removeEventListener('pointerover', over, true);
            document.removeEventListener('pointerout', out, true);
            window.removeEventListener('blur', hide, true);
            document.removeEventListener('visibilitychange', hide, true);
            hide();
            spin.kill();
        };
    }, [size, speed, selector]);

    return (
        <>
            {/* 안전빵: 전역 스타일도 한 번 더 (우선순위 싸움 대비) */}
            <style>{`
        html[data-hgc="on"], html[data-hgc="on"] * { cursor: none !important; }
        ${selector}, ${selector} * { cursor: none !important; }
        .hic-center{
          position:absolute;left:50%;top:50%;
          transform:translate(-50%,-50%);
          color:${centerColor};font-size:${centerFontSize}px;font-weight:${centerWeight};
          text-shadow:0 1px 2px rgba(0,0,0,.35);
          white-space:nowrap;pointer-events:none;user-select:none;
        }
        .hic-ring{ width:100%; height:100%; display:block; pointer-events:none; user-select:none; }
      `}</style>

            <div ref={wrapRef} aria-hidden>
                <img ref={ringRef} className="hic-ring" src={src} alt="" />
                {centerText ? <div className="hic-center">{centerText}</div> : null}
            </div>
        </>
    );
}
