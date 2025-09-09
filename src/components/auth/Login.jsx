import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onJoin, onClose }) => {
    const navigate = useNavigate();
    const socialLogin = (sns) => {
        switch (sns) {
            case 'google':
                const GOOGLE_LOGIN_URL = import.meta.env.VITE_GOOGLE_LOGIN_URL;
                const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
                const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

                const url =
                    `${GOOGLE_LOGIN_URL}?` +
                    `client_id=${GOOGLE_CLIENT_ID}` +
                    `&redirect_uri=${GOOGLE_REDIRECT_URI}` +
                    `&response_type=code` +
                    `&scope=email profile openid`;

                window.open(url, '_blank', 'width=500,height=600');
                break;
        }
    };
    return (
        <div className="login-overlay">
            <div className="login-modal">
                <div className="left">
                    <img src="/auth/loginBg.png" alt="" />
                </div>
                <div className="right">
                    <i className="close-btn" onClick={onClose}>
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
                                <input type="text" name="" id="" placeholder="이메일" autoFocus />
                                <input type="text" name="" id="" placeholder="비밀번호" />
                            </form>
                        </div>
                        <div className="bottom">
                            <div className="btnWrap">
                                <button>로그인</button>
                                <span
                                    className="join-btn"
                                    onClick={() => {
                                        onJoin();
                                    }}
                                >
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
                                        src="/auth/google.png"
                                        alt=""
                                    />
                                    <img src="/auth/kakao.png" alt="" />
                                    <img src="/auth/naver.png" alt="" />
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
