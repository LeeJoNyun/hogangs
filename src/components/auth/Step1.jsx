import React from "react";

const Step1 = ({ onNext, onClose }) => {
  return (
    <div className="join-overlay">
      <div className="join-modal">
        <div className="left">
          <img src="/auth/joinBg1.png" alt="" />
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
          <div className="join-inner">
            <div className="top">
              <h2>회원가입</h2>
              <ul className="steps">
                <li className="on">1</li>
                <li>2</li>
                <li>3</li>
              </ul>
            </div>
            <div className="bottom">
              <form>
                <input type="text" name="" id="" placeholder="이메일 주소" />
                <input type="text" name="" id="" placeholder="비밀번호" />
                <input type="text" name="" id="" placeholder="비밀번호 확인" />
              </form>
              <div className="next-btn">
                <button onClick={onNext}>다음</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
