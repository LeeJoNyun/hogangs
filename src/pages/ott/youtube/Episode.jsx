import { useEffect, useState } from 'react';

const Episode = ({ videos }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [displayVideos, setDisplayVideos] = useState(videos);

    const videosPerPage = 10;
    const totalPage = 2;

    const shuffleArray = (array) => {
        return [...array].sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        if (currentPage === 1) {
            setDisplayVideos(videos);
        } else {
            setDisplayVideos(shuffleArray(videos));
        }
    }, [currentPage]);

    return (
        <div className="episode">
            {/* 에피소드 아이템들을 별도의 그리드 컨테이너로 분리 */}
            <div className="episode-grid">
                {displayVideos.map((video) => (
                    <div className="episode-item" key={video.id}>
                        <img src={video.img} alt={video.title} />
                        <div className="text-wrap">
                            <strong>{video.title}</strong>
                            <p>{video.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 페이지네이션을 그리드 외부로 분리 */}
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    <img src="/ott/icon-prev.webp" alt="이전버튼" />
                    <span>이전</span>
                </button>
                {Array.from({ length: totalPage }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`current ${currentPage === i + 1 ? 'active' : ''}`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPage))}
                    disabled={currentPage === totalPage}
                >
                    <span>다음</span>
                    <img src="/ott/icon-next.webp" alt="다음버튼" />
                </button>
            </div>
        </div>
    );
};

export default Episode;
