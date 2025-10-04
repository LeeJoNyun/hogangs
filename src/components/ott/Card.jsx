import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { useNavigate } from 'react-router-dom';

const cards = [
    { id: 1, front: '/ott/card-front1.webp', back: '/ott/card-back1.webp' },
    { id: 2, front: '/ott/card-front2.webp', back: '/ott/card-back2.webp' },
    { id: 3, front: '/ott/card-front3.webp', back: '/ott/card-back3.webp' },
    { id: 4, front: '/ott/card-front4.webp', back: '/ott/card-back4.webp' },
    { id: 5, front: '/ott/card-front5.webp', back: '/ott/card-back5.webp' },
];

const Card = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flip, setFlip] = useState({});
    const navigate = useNavigate();

    const toggleFlip = (id, index) => {
        if (index !== currentIndex) return;
        setFlip((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const getClassName = (index) => {
        if (index === currentIndex) return 'card-wrap center';
        if (index === (currentIndex - 1 + cards.length) % cards.length) return 'card-wrap left-1';
        if (index === (currentIndex - 2 + cards.length) % cards.length) return 'card-wrap left-2';
        if (index === (currentIndex + 1) % cards.length) return 'card-wrap right-1';
        if (index === (currentIndex + 2) % cards.length) return 'card-wrap right-2';
        return 'card-wrap hidden';
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
    };

    return (
        <div className="card">
            <strong>
                우리의 오늘을 특별하게 <span>호강스 pick !</span>
            </strong>
            <p>쉿! 카드 뒤에 호강이 PICK 영상이 숨어있어요!</p>
            <div className="nav-arrow left" onClick={handlePrev}></div>
            <div className="carousel-track">
                {cards.map((card, index) => (
                    <div key={card.id} className={getClassName(index)}>
                        <ReactCardFlip isFlipped={flip[card.id]} flipDirection="horizontal">
                            {/* 앞면 */}
                            <div
                                className="card-front"
                                onClick={() => toggleFlip(card.id, index)}
                                style={{ cursor: index === currentIndex ? 'pointer' : 'default' }}
                            >
                                <img src={card.front} alt={`카드 ${card.id} 앞면`} />
                            </div>

                            {/* 뒷면 */}
                            <div
                                className="card-back"
                                onClick={() => toggleFlip(card.id, index)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img src={card.back} alt={`카드 ${card.id} 뒷면`} />
                                <button onClick={() => navigate(`/video/movie/${card.id}`)}>
                                    <span>지금보러가기</span>{' '}
                                    <img src="/ott/icon-paw.webp" alt="" />
                                </button>
                            </div>
                        </ReactCardFlip>
                    </div>
                ))}
            </div>

            <div className="nav-arrow right" onClick={handleNext}></div>
            <p className="desc">
                <img src="/ott/icon-bone.svg" alt="뼈다귀아이콘" />
                <span>클릭해보개, </span>
                카드의 뒷면이 있다구! 멍멍!
            </p>
        </div>
    );
};

export default Card;
