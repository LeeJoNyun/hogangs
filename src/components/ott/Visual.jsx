// 메인 con1-비주얼

const posters = [
    '/ott/movie1.webp',
    '/ott/movie2.webp',
    '/ott/movie3.webp',
    '/ott/movie4.webp',
    '/ott/movie5.webp',
    '/ott/movie6.webp',
    '/ott/movie7.webp',
    '/ott/movie8.webp',
    '/ott/movie9.webp',
    '/ott/movie10.webp',
];

const Visual = () => {
    return (
        <div className="ottmain-visual">
            <div className="title">
                <strong>
                    소중한 <span>반려견과 함께</span>하는 달콤한 <span>휴식</span>
                </strong>
                <h2>PawFlix</h2>
            </div>
            <div className="movie-film">
                <div className="film-inner">
                    <div className="posterlist">
                        {Array.from({ length: 20 }, (_, i) => (
                            <div className="poster" key={i}>
                                <img
                                    src={posters[i % posters.length]}
                                    alt="poster"
                                    draggable={false}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="img ">
                <img src="/ott/dog.webp" alt="강아지이미지" draggable={false} />
            </div>
        </div>
    );
};

export default Visual;
