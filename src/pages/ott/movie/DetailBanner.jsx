// 영화 상세 배너

import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';

import { IoMdClose } from 'react-icons/io';

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../config';
import { useVideoStore } from '../../../store/useVideoStore';
import useAuthStore from '../../../store/useAuthStore';
import useMypageStore from '../../../store/useMypageStore';

const DetailBanner = () => {
    const [isOpen, setIsOpen] = useState(false); //영상 열렸는지아닌지
    const [origin, setOrigin] = useState('center center'); //애니메이션의 기준점
    const thumbRef = useRef(null); //이미지 위치(썸네일)
    const [like, setLike] = useState(false);
    const [recommended, setRecommended] = useState(false);
    const saveHistory = useVideoStore((s) => s.saveHistory);
    const user = useAuthStore((s) => s.user);
    const toggleVideoLike = useMypageStore((s) => s.toggleVideoLike);
    const videoLikes = useMypageStore((s) => s.videoLikes);
    const fetchVideoLikes = useMypageStore((s) => s.fetchVideoLikes);

    // localhost:3001/video?id=68ca9d15e0859865b492077f
    const play = () => {
        if (thumbRef.current) {
            const rect = thumbRef.current.getBoundingClientRect();
            const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
            const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
            setOrigin(`${x}%${y}%`);
        }
        if (user) {
            const userId = user._id;
            saveHistory(userId, '68ca9d15e0859865b492077f');
        }
        setIsOpen(true);
    };

    const clickLike = () => {
        setLike(!like);
        toggleVideoLike('68ca9d15e0859865b492077f');
    };
    const [videoData, setVideoData] = useState(null);
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(
                    `${API_URL.replace(/\/+$/, '')}/video/68ca9d15e0859865b492077f`,
                    {
                        withCredentials: true,
                    }
                );
                setVideoData(res.data);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    useEffect(() => {
        fetchVideoLikes();
    }, [fetchVideoLikes]);
    return (
        <div className="DetailBanner">
            <div className="title-box">
                <h2>{videoData?.koTitle}</h2>
                <strong>{videoData?.enTitle}</strong>
                {/* <strong>A Dog's Journey</strong> */}
                <ul>
                    <li>{videoData?.year}</li>
                    {/* <li>ALL</li> */}
                    <li>{videoData?.limit}</li>
                    {/* <li>모험ㆍ성장</li> */}
                    <li>{videoData?.category}</li>
                    {/* <li>1h 48s</li> */}
                    <li>{videoData?.runtimeMin}</li>
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
                        그들을 걱정하던 할아버지 이든은 환생견이자 자기 반려견인 베일리에게
                        <br />
                        다시 태어나도 사랑하는 손녀 씨제이를 지켜 달라고 부탁한다.
                    </p>
                    <ul>
                        <li>
                            <button onClick={clickLike}>
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
                        src={`https://www.youtube.com/embed/${videoData.youtubeId}?autoplay=1`}
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
