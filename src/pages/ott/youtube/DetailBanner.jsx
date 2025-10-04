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
        <div className="DetailBanner youtube-detail">
            <div className="title-box">
                <h2>
                    강아지 짖지마
                    <br />
                    교육법
                </h2>

                <ul>
                    <li>2023</li>
                    <li>ALL</li>
                    <li>훈련</li>
                    <li>20m 31s</li>
                </ul>
            </div>
            <div className="line"></div>
            <div className="desc-box">
                <div className="left" ref={thumbRef}>
                    <img src="/ott/detail-sub2.webp" alt="4가지기본훈련이미지" />
                    <button onClick={play}>
                        <img src="/ott/play-button.webp" alt="플레이버튼" />
                    </button>
                </div>
                <div className="center">
                    <p>
                        반려견과 함께하는 삶을 바꾸는 4가지 기본 훈련. <br />
                        앉아, 기다려, 이리 와, 엎드려. <br />
                        단순한 명령이 아닌, 신뢰와 안전을 만드는 첫걸음.
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
                {/* <div className="right">
                    <img src="/ott/score.webp" alt="별점" />
                </div> */}
            </div>
            {isOpen && (
                <div className="video-fullscreen" style={{ '--origin': origin }}>
                    <iframe
                        title="youtubevideo"
                        src="https://www.youtube.com/embed/C9pzA6vEr30?autoplay=1"
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
