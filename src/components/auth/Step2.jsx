import React from 'react';

import { hashPassword } from '../../utils/Crypto';
import axios from 'axios';
import useAuthStore from '../../store/useAuthStore';
import { API_URL } from '../../config';

const Step2 = ({ setStep, step, user, setUser }) => {
    const setJoinModal = useAuthStore((state) => state.setJoinModal);

    const years = Array.from({ length: 100 }, (_, i) => 2011 - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const handleTelChange = (e) => {
        let { name, value } = e.target;

        if (name === 'telFirst') {
            value = value.replace(/\D/g, '').slice(0, 4);
        }
        setUser((prev) => {
            const [first, middle, last] = prev.tel.split('-');

            const telFirst = name === 'telFirst' ? value : first || '010';
            const telMiddle = name === 'telMiddle' ? value : middle || '';
            const telLast = name === 'telLast' ? value : last || '';

            return { ...prev, tel: `${telFirst}-${telMiddle}-${telLast}` };
        });
    };
    const handleBirthChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => {
            const [y, m, d] = (prev.birth || '--').split('-');
            const year = name === 'birthYear' ? value : y;
            const month = name === 'birthMonth' ? value : m;
            const day = name === 'birthDay' ? value : d;
            return { ...prev, birth: `${year}-${month}-${day}` };
        });
    };
    const [birthYear, birthMonth, birthDay] = (user.birth || '--').split('-');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };
    const handleNext = async (e) => {
        e.preventDefault();
        if (!user.name?.trim()) {
            alert('이름을 입력해주세요');
            return;
        }
        const [year, month, day] = (user.birth || '--').split('-');
        if (!year || !month || !day) {
            alert('생년월일을 선택해주세요');
            return;
        }

        const [first, middle, last] = user.tel.split('-');
        if (!first || !middle || !last) {
            alert('휴대폰 번호를 입력해주세요');
            return;
        }
        if (middle.length !== 4 || last.length !== 4) {
            alert('휴대폰 번호 4자리씩 입력');
            return;
        }

        const phoneNumber = user.tel.replace(/-/g, '');
        const birthDate = `${year}${month.padStart(2, '0')}${day.padStart(2, '0')}`;

        const newUser = {
            name: user.name,
            email: user.email,
            password: hashPassword(user.password),
            phone: phoneNumber, //0101234567
            birth: birthDate, //19900605
        };

        const res = await axios.post(`${API_URL.replace(/\/+$/, '')}/user`, newUser);
        console.log(res.data);
        if (res.data.error === 0) {
            setStep(step + 1);
        } else {
            alert('다시 확인해주세요.');
        }
    };
    const [telFirst, telMiddle, telLast] = user.tel.split('-');

    return (
        <div className="join-overlay">
            <div className="join-modal">
                <div className="left">
                    <img src="/auth/joinBg2.webp" alt="" />
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
                    <div className="join-inner2">
                        <div className="top">
                            <h2>회원가입</h2>
                            <ul className="steps">
                                <li className={step >= 1 ? 'on' : ''} onClick={() => setStep(1)}>
                                    1
                                </li>
                                <li className={step >= 2 ? 'on' : ''} onClick={() => setStep(2)}>
                                    2
                                </li>
                                <li className={step === 3 ? 'on' : ''}>3</li>
                            </ul>
                        </div>
                        <div className="bottom">
                            <form>
                                <input
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                    placeholder="실명입력"
                                    autoFocus
                                />
                                <div className="birth">
                                    <span>생년월일</span>
                                    <div className="selects">
                                        <div className="wrap">
                                            <select
                                                className="year"
                                                name="birthYear"
                                                value={birthYear || ''}
                                                onChange={handleBirthChange}
                                            >
                                                <option value="">년도</option>
                                                {years.map((y) => (
                                                    <option key={y} value={y}>
                                                        {y}
                                                    </option>
                                                ))}
                                            </select>
                                            <span>년</span>
                                        </div>
                                        <div className="wrap">
                                            <select
                                                className="month"
                                                name="birthMonth"
                                                value={birthMonth || ''}
                                                onChange={handleBirthChange}
                                            >
                                                <option value="">월</option>
                                                {months.map((m) => (
                                                    <option key={m} value={m}>
                                                        {m}
                                                    </option>
                                                ))}
                                            </select>
                                            <span>월</span>
                                        </div>
                                        <div className="wrap">
                                            <select
                                                className="day"
                                                name="birthDay"
                                                value={birthDay || ''}
                                                onChange={handleBirthChange}
                                            >
                                                <option value="">일</option>
                                                {days.map((d) => (
                                                    <option key={d} value={d}>
                                                        {d}
                                                    </option>
                                                ))}
                                            </select>
                                            <span>일</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="phone">
                                    <span>휴대폰 번호</span>
                                    <div className="selects">
                                        <select
                                            name="telFirst"
                                            value={telFirst || '010'}
                                            onChange={handleTelChange}
                                        >
                                            <option value="010">010</option>
                                            <option value="011">011</option>
                                            <option value="016">016</option>
                                            <option value="017">017</option>
                                            <option value="018">018</option>
                                            <option value="019">019</option>
                                        </select>
                                        <span>-</span>
                                        <input
                                            type="text"
                                            name="telMiddle"
                                            value={telMiddle || ''}
                                            onChange={handleTelChange}
                                        />
                                        <span>-</span>
                                        <input
                                            type="text"
                                            name="telLast"
                                            value={telLast || ''}
                                            onChange={handleTelChange}
                                        />
                                    </div>
                                </div>
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

export default Step2;
