// 영화 상세페이지 하단(탭)
import { useEffect, useState } from 'react';

import DetailBanner from './DetailBanner';

import Relate from '../movie/Relate';
import Photo from '../movie/Photo';
import Review from '../movie/Review';

const MovieDetail = () => {
    const videolist = [
        { id: 1, img: '/ott/detail-thumb9.png', title: '볼트' },
        { id: 2, img: '/ott/detail-thumb2.png', title: '말리와 나' },
        { id: 3, img: '/ott/detail-thumb3.png', title: '콜 오브 와일드' },
        { id: 4, img: '/ott/detail-thumb4.png', title: '마리강아지와 아이들' },
        { id: 5, img: '/ott/detail-thumb5.png', title: '레이싱 인더 레인' },
        { id: 6, img: '/ott/detail-thumb6.png', title: '도그' },
        { id: 7, img: '/ott/detail-thumb7.png', title: '더 웨이 홈' },
        { id: 8, img: '/ott/detail-thumb8.png', title: 'TOGO' },
    ];
    const person = [
        { id: 1, img: '/ott/person1.png', name: '게일 맨쿠소', type: '감독' },
        { id: 2, img: '/ott/person2.png', name: '애비 라이더', type: '주연 • 어린 씨제이' },
        { id: 3, img: '/ott/person3.png', name: '헨리', type: '조연 • 트렌트' },
        { id: 4, img: '/ott/person4.png', name: '데니스 퀘이드', type: '주연 • 이든' },
        { id: 5, img: '/ott/person5.png', name: '조시 게드', type: '주연 • 베일리' },
        { id: 6, img: '/ott/person6.png', name: '캐서린 프레스콧', type: '조연 • 씨제이' },
        { id: 7, img: '/ott/person7.png', name: '베티 길핀', type: '조연 • 글로리아' },
        { id: 8, img: '/ott/person8.png', name: '마그 헨젤버거', type: '조연 • 한나' },
    ];
    const photo = [
        { id: 1, img: '/ott/detail-photo1-2.png', title: '안녕베일리포토' },
        { id: 2, img: '/ott/detail-photo1-18.png', title: '안녕베일리포토' },
        { id: 3, img: '/ott/detail-photo1-3.png', title: '안녕베일리포토' },
        { id: 4, img: '/ott/detail-photo1-4.png', title: '안녕베일리포토' },
        { id: 5, img: '/ott/detail-photo1-5.png', title: '안녕베일리포토' },
        { id: 6, img: '/ott/detail-photo1-6.png', title: '안녕베일리포토' },
        { id: 7, img: '/ott/detail-photo1-7.png', title: '안녕베일리포토' },
        { id: 8, img: '/ott/detail-photo1-8.png', title: '안녕베일리포토' },
        { id: 9, img: '/ott/detail-photo1-9.png', title: '안녕베일리포토' },
        { id: 10, img: '/ott/detail-photo1-10.png', title: '안녕베일리포토' },
        { id: 11, img: '/ott/detail-photo1-11.png', title: '안녕베일리포토' },
        { id: 12, img: '/ott/detail-photo1-12.png', title: '안녕베일리포토' },
        { id: 13, img: '/ott/detail-photo1-13.png', title: '안녕베일리포토' },
        { id: 14, img: '/ott/detail-photo1-14.png', title: '안녕베일리포토' },
        { id: 15, img: '/ott/detail-photo1-15.png', title: '안녕베일리포토' },
        { id: 16, img: '/ott/detail-photo1-16.png', title: '안녕베일리포토' },
        { id: 17, img: '/ott/detail-photo1-17.png', title: '안녕베일리포토' },
        { id: 18, img: '/ott/detail-photo1-1.png', title: '안녕베일리포토' },
    ];
    const [activeTab, setActiveTab] = useState('relate');

    useEffect(() => {
        sessionStorage.setItem('activeTab', activeTab);
    }, [activeTab]);
    return (
        <div className="detail-page">
            {/* 상단비주얼배너 */}
            <DetailBanner />
            {/* 탭 메뉴 */}
            <nav className="tabs">
                <ul>
                    <li
                        className={activeTab === 'relate' ? 'active' : ''}
                        onClick={() => setActiveTab('relate')}
                    >
                        연관내용
                    </li>
                    <li
                        className={activeTab === 'photo' ? 'active' : ''}
                        onClick={() => setActiveTab('photo')}
                    >
                        포토
                    </li>
                    <li
                        className={activeTab === 'review' ? 'active' : ''}
                        onClick={() => setActiveTab('review')}
                    >
                        리뷰
                    </li>
                </ul>
            </nav>
            {/* 탭 콘텐츠 */}
            <section className="tab-content">
                {activeTab === 'relate' && <Relate videolist={videolist} person={person} />}
                {activeTab === 'photo' && <Photo photo={photo} />}
                {activeTab === 'review' && <Review videoId={'68ca9d15e0859865b492077f'} />}
            </section>
        </div>
    );
};

export default MovieDetail;
