import { useEffect, useState } from 'react';
import DetailBanner from '../youtube/DetailBanner';
import Picks from './Picks';
import '../../../styles/index.scss';
import Episode from './Episode';

const YoutubeDetail = () => {
    const videolist = [
        { id: 1, img: '/ott/youtube1.webp', title: '말리와 나' },
        { id: 2, img: '/ott/youtube2.webp', title: '콜 오브 와일드' },
        { id: 3, img: '/ott/youtube3.webp', title: '마리강아지와 아이들' },
        { id: 4, img: '/ott/youtube4.webp', title: '레이싱 인더 레인' },
        { id: 5, img: '/ott/youtube5.webp', title: '더 웨이 홈' },
        { id: 6, img: '/ott/youtube6.webp', title: '도그' },
        { id: 7, img: '/ott/youtube7.webp', title: 'TOGO' },
    ];
    const person = [{ id: 1, img: '/ott/person9.webp', name: '강아지 수의사 윤쌤', type: ' 주연' }];
    const videos = [
        {
            id: 1,
            img: '/ott/video1.webp',
            title: '강아지 건강검진',
            desc: '반려견과 함께하는 삶을 바꾸는 4가지 기본 훈련.\n앉아, 기다려, 이리 와, 엎드려.\n단순한 명령이 아닌, 신뢰와 안전을 만드는 첫걸음.',
        },
        {
            id: 2,
            img: '/ott/video2.webp',
            title: '강아지 응급처치 요령',
            desc: '위험한 순간, 단 한 번의 부름이 강아지를 지켜냅니다.\n이리 와 훈련은 보호자와 반려견 사이의 가장 강력한 연결.\n신뢰와 안전을 만드는 특별한 방법이 지금 시작됩니다.',
        },
        {
            id: 3,
            img: '/ott/video3.webp',
            title: '이럴땐 병원에 데려가보셔야 합니다',
            desc: '끝없는 짖음, 그 뒤에 숨은 불안과 습관.\n짖지마 훈련은 단순히 소음을 멈추는 것이 아닙니다.\n특별한 교육법을 만나보세요."',
        },
        {
            id: 4,
            img: '/ott/video4.webp',
            title: '당뇨병이 의심됩니다',
            desc: '실외 배변을 실내 배변으로 바꾸는 훈련.\n환경이 달라져도 이어지는 규칙, 그리고 변하지 않는 신뢰.\n또 하나의 동행이 시작됩니다."',
        },
        {
            id: 5,
            img: '/ott/video5.webp',
            title: '강아지는 사람 말을 얼마나 이해할까',
            desc: '강아지가 세상을 배우는 첫걸음, 바로 사회화 교육.\n필요한 시기는 생후 몇 달, 단 한 번뿐인 결정적 순간.\n효과적인 사회화 교육, 그 모든 것을 지금 확인하세요."',
        },
        {
            id: 6,
            img: '/ott/video6.webp',
            title: '우린 이제껏 개아련에 속았다',
            desc: '강아지와 함께하는 첫걸음, 기본 훈련법.\n그리고 기다림 속에서 신뢰를 쌓는 기다려.\n단순한 명령이 아닌, 평생을 함께할 약속이 됩니다."',
        },
        {
            id: 7,
            img: '/ott/video7.webp',
            title: 'AI시대 수의사는 필요없다?',
            desc: '강아지의 마음을 이해하고, 신뢰를 지켜내는 과정이죠.\n 하지만 잘못하면 오히려 두려움과\n불안을 남길 수도 있습니다.',
        },
        {
            id: 8,
            img: '/ott/video8.webp',
            title: '강아지가 사람보다 좋은 이유 10가지',
            desc: '신뢰를 시작하는 눈맞추기, 차분함을 배우는 앉아,\n안정을 찾는 엎드려.\n단순한 훈련이 아닌, 평생을 함께할 기본기가 됩니다."',
        },
        {
            id: 9,
            img: '/ott/video9.webp',
            title: '더운 여름철 강아지 건강 관리 요령',
            desc: '단순한 장난일까, 아니면 스트레스의 신호일까.\n원인을 알면 해결이 보입니다.\n지금 그 해답을 확인하세요."',
        },
        {
            id: 10,
            img: '/ott/video10.webp',
            title: '댕댕이 체온 어떻게 관리해요?',
            desc: '어디서든 안전을 지켜주는 이동장 훈련,\n 그리고 생활의 기본을 만드는 크레이트 훈련. \n강아지와 보호자 모두를 지금 시작해보세요."',
        },
    ];
    const [activeTab, setActiveTab] = useState('episode');

    useEffect(() => {
        sessionStorage.setItem('activeTab', activeTab);
    }, [activeTab]);
    return (
        <div className="detail-page">
            <DetailBanner />
            <nav className="tabs">
                <ul>
                    <li
                        className={activeTab === 'episode' ? 'active' : ''}
                        onClick={() => setActiveTab('episode')}
                    >
                        에피소드
                    </li>
                    <li
                        className={activeTab === 'picks' ? 'active' : ''}
                        onClick={() => setActiveTab('picks')}
                    >
                        추천 영상
                    </li>
                </ul>
            </nav>
            {/* 탭 콘텐츠 */}
            <section className="tab-content">
                {activeTab === 'episode' && <Episode videos={videos} />}
                {activeTab === 'picks' && <Picks person={person} videolist={videolist} />}
            </section>
        </div>
    );
};

export default YoutubeDetail;
