import React from 'react';
import useAuthStore from '../../store/useAuthStore';
import axios from 'axios';
import { API_URL } from '../../config';

const Step1 = ({ setStep, step, user, setUser }) => {
    const setJoinModal = useAuthStore((state) => state.setJoinModal);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };
    const handleNext = async () => {
        if (!user.email || !user.email.includes('@') || !user.email.endsWith('.com')) {
            alert('옳바른 이메일 주소를 입력해주세요.');
            return;
        }
        if (!user.password || user.password.length < 5) {
            alert('비밀번호는 6자리 이상이어야 합니다.');
            return;
        }
        if (!user.passwordCheck || user.password !== user.passwordCheck) {
            alert('비밀번호가 일치하지 않습니다');
            return;
        }

        const res = await axios.post(`${API_URL.replace(/\/+$/, '')}/user/duplicate`, {
            email: user.email,
        });

        if (res.data.error === 0) {
            setStep(step + 1);
        } else {
            alert('이미 가입된 이메일입니다.');
        }
    };

    return (
        <div className="join-overlay">
            <div className="join-modal">
                <div className="left">
                    <img src="/auth/joinBg1.webp" alt="" />
                </div>
                <div className="right">
                    <i className="close-btn" onClick={() => setJoinModal(false)}>
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
                    <div className="join-inner">
                        <div className="top">
                            <h2>회원가입</h2>
                            <ul className="steps">
                                <li className={step >= 1 ? 'on' : ''}>1</li>
                                <li className={step >= 2 ? 'on' : ''}>2</li>
                                <li className={step === 3 ? 'on' : ''}>3</li>
                            </ul>
                        </div>
                        <div className="bottom">
                            <form>
                                <input
                                    type="text"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    placeholder="이메일 주소"
                                    autoFocus
                                />
                                <input
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    placeholder="비밀번호(6자리 이상)"
                                />
                                <input
                                    type="password"
                                    name="passwordCheck"
                                    value={user.passwordCheck}
                                    onChange={handleChange}
                                    placeholder="비밀번호 확인"
                                />
                            </form>
                            <div className="next-btn">
                                <button type="button" onClick={handleNext}>
                                    다음
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step1;
