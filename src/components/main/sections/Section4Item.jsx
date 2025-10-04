import { useMemo } from 'react';

function pseudoRandom(seed, min, max) {
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    const frac = x - Math.floor(x);
    return +(min + (max - min) * frac).toFixed(2);
}

const Section4Item = ({ item, index }) => {
    const { id, name, star, dog, score, description } = item;

    const seed = id ?? index;

    const tiltDeg = useMemo(() => pseudoRandom(seed, -10, 15), [seed]);
    const shiftY = useMemo(() => pseudoRandom(seed * 7, -10, 10), [seed]);

    const style = {
        backgroundImage:
            seed % 2 === 1
                ? "url('/main/ReviewsContent01.webp')"
                : "url('/main/ReviewsContent02.webp')",
        transform: `rotate(${tiltDeg}deg) translateY(${shiftY}px)`,
    };

    return (
        <section className="main_Section4item">
            <div className="con1" style={style}>
                <div className="cilp">
                    <img src="/main/clip.webp" alt="" />
                </div>
                <div className="h3">{name}</div>
                <img src={dog} alt={id} />
                <div className="star">
                    <img src={star} alt={id} />
                    <span>{score}</span>
                </div>
                <p>{description}</p>
            </div>
        </section>
    );
};

export default Section4Item;
