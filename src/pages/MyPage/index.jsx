import React, { useEffect, useState } from 'react';
import MyContent1 from '../../components/mypage/content1/MyContent1';
import MyContent3 from '../../components/mypage/content3/MyContent3';
import useMypageStore from '../../store/useMypageStore';

const MyPage = () => {
    const [activeTab, setActiveTab] = useState('content1');

    // 기본 프로필 상태
    const [dogProfile, setDogProfile] = useState({
        name: '호강이',
        profileImage: '/mypage/hogangImg.webp',
    });

    // 초기 스토어 fetch
    const fetchAllForuser = useMypageStore((s) => s.fetchAllForUser);
    useEffect(() => {
        (async () => {
            fetchAllForuser();
        })();
    }, []);
    useEffect(() => {
        // 팝업이 아니면(부모창이면) 리스너 등록
        if (window.opener) return;

        const handleMessage = (data) => {
            const { type } = data || {};
            if (type === 'REGISTER_SUCCESS') {
                // 정리
                window.removeEventListener('message', onWinMsg);
                bc?.removeEventListener('message', onBC);
                bc?.close();

                // 마이페이지에서 열어놨다면 그냥 새로고침
                if (window.location.pathname.startsWith('/mypage')) {
                    window.location.reload();
                } else {
                    // 그렇지 않다면 마이페이지로 이동(히스토리 덮어쓰기 원하면 replace)
                    window.location.assign('/mypage');
                    // 또는: window.location.replace('/mypage');
                }
            }
        };

        // BroadcastChannel
        const bc = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('auth') : null;
        const onBC = (e) => handleMessage(e.data);
        bc?.addEventListener('message', onBC);

        // postMessage
        const onWinMsg = (e) => {
            if (e.origin !== window.location.origin) return; // 동일 오리진만
            handleMessage(e.data);
        };
        window.addEventListener('message', onWinMsg);

        return () => {
            window.removeEventListener('message', onWinMsg);
            bc?.removeEventListener('message', onBC);
            bc?.close();
        };
    }, []);
    return (
        <div className="myPage" id="myPage">
            <div className="topheader">
                <div className="topName">
                    <div className="topName-box">
                        <img src={dogProfile.profileImage} alt="강아지 프로필" />
                        <p>{dogProfile.name}님</p>
                    </div>
                </div>
                <div className="nav">
                    <ul>
                        <li
                            className={activeTab === 'content1' ? 'active' : ''}
                            onClick={() => setActiveTab('content1')}
                        >
                            MyPage
                        </li>
                        <li
                            className={activeTab === 'content3' ? 'active' : ''}
                            onClick={() => setActiveTab('content3')}
                        >
                            Videos
                        </li>
                    </ul>
                </div>
            </div>
            <div className="contents">
                {activeTab === 'content1' && <MyContent1 onUpdateDogProfile={setDogProfile} />}
                {activeTab === 'content3' && <MyContent3 />}
            </div>
        </div>
    );
};

export default MyPage;
