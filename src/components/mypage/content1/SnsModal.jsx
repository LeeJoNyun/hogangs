import React, { useEffect, useState } from 'react';
import useAuthStore from '../../../store/useAuthStore';
import {
    API_URL,
    GOOGLE_REGISTER_REDIRECT_URI,
    KAKAO_REDIRECT_URI,
    KAKAO_REGISTER_REDIRECT_URI,
} from '../../../config';
import axios from 'axios';
import { b64url, randomVerifier } from '../../../utils/GoogleLogin';
import useMypageStore from '../../../store/useMypageStore';

const SnsModal = ({ onClose }) => {
    const setLoginModal = useAuthStore((state) => state.setLoginModal);
    const [googleLink, setGoogleLink] = useState(false);
    const [kakaoLink, setKakaoLink] = useState(false);
    const snsLinks = useMypageStore((s) => s.snsLinks);
    const googleRegister = async () => {
        const GOOGLE_LOGIN_URL = import.meta.env.VITE_GOOGLE_LOGIN_URL;
        const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        const REDIRECT_URI = GOOGLE_REGISTER_REDIRECT_URI;

        const code_verifier = randomVerifier(64);
        const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(code_verifier));
        const code_challenge = b64url(hash);

        // 콜백에서 읽도록 저장(사용 후 AuthCallback에서 반드시 제거)
        localStorage.setItem('pkce_verifier', code_verifier);

        // (선택) CSRF 방지용 state도 저장해두면 더 안전
        const state = crypto.randomUUID();
        localStorage.setItem('oauth_state', state);

        // 2) 인가 URL 구성
        const params = new URLSearchParams({
            client_id: GOOGLE_CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            response_type: 'code',
            scope: 'openid email profile',
            code_challenge: code_challenge,
            code_challenge_method: 'S256',
            state,
        });

        let url = `${GOOGLE_LOGIN_URL}?${params.toString()}`;

        window.open(url, '_blank', 'width=500,height=600');
    };
    const kakaoRegister = () => {
        const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
        let url = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REGISTER_REDIRECT_URI}&response_type=code`;
        window.open(url, '_blank', 'width=500,height=600');
    };

    useEffect(() => {
        (() => {
            snsLinks.map((i) => {
                if (i.provider === 'google') {
                    setGoogleLink(true);
                } else if (i.provider === 'kakao') {
                    setKakaoLink(true);
                }
            });
        })();
    }, []);

    return (
        <div className="sns-overlay" id="sns-overlay">
            <div className="sns-modal">
                <div className="top">
                    <i className="close-btn" onClick={onClose}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <path
                                d="M15.9492 2.35254C16.4186 1.88319 17.1791 1.88319 17.6484 2.35254C18.1175 2.8219 18.1177 3.58249 17.6484 4.05176L11.6992 10L17.6484 15.9492C18.1177 16.4185 18.1176 17.1791 17.6484 17.6484C17.1791 18.1178 16.4186 18.1178 15.9492 17.6484L10 11.6992L4.05176 17.6484C3.58242 18.1178 2.8209 18.1178 2.35156 17.6484C1.88273 17.1791 1.88259 16.4184 2.35156 15.9492L8.30078 10L2.35254 4.05176C1.88321 3.58241 1.88321 2.82091 2.35254 2.35156C2.82185 1.88277 3.58257 1.88258 4.05176 2.35156L10 8.30078L15.9492 2.35254Z"
                                fill="#FEFEFE"
                            />
                        </svg>
                    </i>
                </div>
                <div className="bottom">
                    <div className="snsWrap">
                        <div className="sns google">
                            <div className="icon">
                                <img src="/auth/google.webp" alt="" />
                            </div>
                            <div className="txt">
                                <p>구글</p>
                                {!googleLink && <span onClick={googleRegister}>연동하기</span>}
                            </div>
                        </div>
                        <div className="sns kakao">
                            <div className="icon">
                                <img src="/auth/kakao.webp" alt="" />
                            </div>
                            <div className="txt">
                                <p>카카오</p>
                                {!kakaoLink && <span onClick={kakaoRegister}>연동하기</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modalOverlay" onClick={() => setLoginModal(false)} />
        </div>
    );
};

export default SnsModal;
