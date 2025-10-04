import React, { useEffect, useState } from 'react';

const PriceModal = ({ hotel, onClose }) => {
    const [src, setSrc] = useState('');

    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prev;
        };
    }, [onClose]);

    useEffect(() => {
        if (hotel) {
            setSrc('/reservation/hotel_price.webp');
        } else {
            setSrc('/reservation/grooming_price.webp');
        }
    }, [hotel]);
    return (
        // overlay를 클릭했을 때만 닫히도록: target === currentTarget 체크
        <div
            className="imgmodal-overlay"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="imgmodal-content">
                <img src={src} draggable={false} />
                {/* 우상단 닫기 버튼(옵션) */}
                <button className="imgmodal-close" onClick={onClose}>
                    ×
                </button>
            </div>
        </div>
    );
};

export default PriceModal;
