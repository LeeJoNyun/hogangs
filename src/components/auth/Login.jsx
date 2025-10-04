import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { hashPassword } from '../../utils/Crypto';
import { b64url, randomVerifier } from '../../utils/GoogleLogin';
import { KAKAO_REDIRECT_URI, GOOGLE_REDIRECT_URI, API_URL } from '../../config';

const Login = () => {
    const setLoginModal = useAuthStore((state) => state.setLoginModal);
    const setJoinModal = useAuthStore((state) => state.setJoinModal);
    const setLogin = useAuthStore((state) => state.setLogin);
    const setUser = useAuthStore((state) => state.setUser);

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const KAKAO_JAVASCRIPT_KEY = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

    const socialLogin = async (sns) => {
        let url = '';
        switch (sns) {
            case 'google':
                const GOOGLE_LOGIN_URL = import.meta.env.VITE_GOOGLE_LOGIN_URL;
                const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
                const REDIRECT_URI = GOOGLE_REDIRECT_URI;

                const code_verifier = randomVerifier(64);
                const hash = await crypto.subtle.digest(
                    'SHA-256',
                    new TextEncoder().encode(code_verifier)
                );
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

                    // access_type: 'offline', // refresh_token이 필요하면 사용
                    // prompt: 'consent',      // 매번 동의가 필요하면 사용
                });

                url = `${GOOGLE_LOGIN_URL}?${params.toString()}`;

                window.open(url, '_blank', 'width=500,height=600');
                break;
            case 'kakao':
                const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
                url = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI.replace(
                    /\/+$/,
                    ''
                )}&response_type=code`;
                window.open(url, '_blank', 'width=500,height=600');
                break;
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await axios.post(`${API_URL.replace(/\/+$/, '')}/login`, {
            email,
            password: hashPassword(password),
        });

        if (res.data.error === 0) {
            setLogin(true);
            setUser(res.data.user);
            navigate('/');
            setLoginModal(false);
        } else {
            alert('이메일 또는 비밀번호가 일치하지 않습니다.');
        }
    };
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
        script.async = true;
        script.onload = () => {
            if (window.Kakao && !window.Kakao.isInitialized()) {
                window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
                console.log('Kakao SDK initialized');
            }
        };
        document.head.appendChild(script);
    }, []);
    return (
        <div className="login-overlay">
            <div className="login-modal">
                <div className="left">
                    <img src="/auth/loginBg.webp" alt="" />
                </div>
                <div className="right">
                    <i className="close-btn" onClick={() => setLoginModal(false)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <path
                                d="M2.29214 19.1407L0.355469 17.2604L8.10214 9.7393L0.355469 2.21817L2.29214 0.337891L10.0388 7.85902L17.7855 0.337891L19.7221 2.21817L11.9755 9.7393L19.7221 17.2604L17.7855 19.1407L10.0388 11.6196L2.29214 19.1407Z"
                                fill="#454545"
                            />
                        </svg>
                    </i>
                    <div className="login-inner">
                        <div className="top">
                            <h2>로그인</h2>
                            <form>
                                <input
                                    type="text"
                                    value={email}
                                    name=""
                                    id="email"
                                    placeholder="이메일"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    autoFocus
                                />
                                <input
                                    type="password"
                                    value={password}
                                    name=""
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="비밀번호"
                                />
                            </form>
                        </div>
                        <div className="bottom">
                            <div className="btnWrap">
                                <button type="submit" onClick={handleLogin}>
                                    로그인
                                </button>
                                <span className="join-btn" onClick={() => setJoinModal(true)}>
                                    회원가입
                                </span>
                            </div>
                            <div className="snsBox">
                                <div className="text">SNS 간편로그인</div>
                                <div className="snsWrap">
                                    <img
                                        onClick={() => {
                                            socialLogin('google');
                                        }}
                                        src="/auth/google.webp"
                                        alt=""
                                    />

                                    <img
                                        onClick={() => {
                                            socialLogin('kakao');
                                        }}
                                        src="/auth/kakao.webp"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
