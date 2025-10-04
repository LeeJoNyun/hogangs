import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';

import { IoMdClose } from 'react-icons/io';

import { useRef, useState } from 'react';

const DetailBanner = () => {
    const [isOpen, setIsOpen] = useState(false); //영상 열렸는지아닌지
    const [origin, setOrigin] = useState('center center'); //애니메이션의 기준점
    const thumbRef = useRef(null); //이미지 위치(썸네일)
    const [like, setLike] = useState(false);
    const [recommended, setRecommended] = useState(false);
    // localhost:3001/video?id=68ca9d15e0859865b492077f
    const play = () => {
        if (thumbRef.current) {
            const rect = thumbRef.current.getBoundingClientRect();
            const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
            const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
            setOrigin(`${x}%${y}%`);
        }
        setIsOpen(true);
    };
    return (
        <div className="DetailBanner">
            <div className="title-box">
                <h2>안녕 베일리</h2>
                <strong>A Dog's Journey</strong>
                <ul>
                    <li>2019</li>
                    <li>ALL</li>
                    <li>모험ㆍ성장</li>
                    <li>1h 48s</li>
                </ul>
            </div>
            <div className="line"></div>
            <div className="desc-box">
                <div className="left" ref={thumbRef}>
                    <img src="/ott/detail-sub1.webp" alt="안녕베일리영상이미지" />
                    <button onClick={play}>
                        <img src="/ott/play-button.webp" alt="플레이버튼" />
                    </button>
                </div>
                <div className="center">
                    <p>
                        남편을 잃은 후 상심에 빠져있는 글로리아와 그의 딸 씨제이. <br />
                        그들을 걱정하던 할아버지 이든은 환생견이자 자기 반려견인 베일리에게 <br />
                        다시 태어나도 사랑하는 손녀 씨제이를 지켜 달라고 부탁한다.
                    </p>
                    <ul>
                        <li>
                            <button onClick={() => setLike(!like)}>
                                {like ? (
                                    <FaHeart style={{ color: 'red' }} size={14} />
                                ) : (
                                    <FaRegHeart size={14} />
                                )}
                                {like ? '찜했다 멍!' : '찜할까 멍?'}
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setRecommended(!recommended)}>
                                {recommended ? (
                                    <AiFillLike size={18} color="#B7E2DF" />
                                ) : (
                                    <AiOutlineLike size={18} />
                                )}
                                {recommended ? '추천했다 멍!' : '추천할까 멍?'}
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="right">
                    <img src="/ott/score.webp" alt="별점" />
                </div>
            </div>
            {isOpen && (
                <div className="video-fullscreen" style={{ '--origin': origin }}>
                    <iframe
                        title="youtubevideo"
                        src="https://www.youtube.com/embed/5flznyCvAxQ?autoplay=1"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    />
                    <button className="close" onClick={() => setIsOpen(false)}>
                        <IoMdClose />
                    </button>
                </div>
            )}
        </div>
    );
};

export default DetailBanner;
