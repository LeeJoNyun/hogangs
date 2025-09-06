import React from "react";

const Step3 = ({ onClose }) => {
  return (
    <div className="join-overlay">
      <div className="join-modal">
        <div className="left">
          <img src="/auth/joinBg3.png" alt="" />
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
              <h2>가입 완료</h2>
            </div>
            <div className="bottom">
              <div className="success-box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="65"
                  height="65"
                  viewBox="0 0 65 65"
                  fill="none"
                >
                  <g clippath="url(#clip0_1574_4431)">
                    <path
                      d="M46.3107 27.8291C46.6807 27.446 46.8854 26.9329 46.8808 26.4003C46.8762 25.8677 46.6625 25.3583 46.2859 24.9817C45.9093 24.605 45.3998 24.3914 44.8673 24.3868C44.3347 24.3822 43.8216 24.5869 43.4385 24.9569L28.6104 39.785L21.9072 33.0819C21.5241 32.7119 21.011 32.5072 20.4784 32.5118C19.9459 32.5164 19.4364 32.73 19.0598 33.1067C18.6832 33.4833 18.4695 33.9927 18.4649 34.5253C18.4603 35.0579 18.665 35.571 19.035 35.9541L27.16 44.0791C27.541 44.4599 28.0575 44.6738 28.5961 44.6738C29.1347 44.6738 29.6513 44.4599 30.0322 44.0791L46.2822 27.8291H46.3107Z"
                      fill="#A8C686"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M32.5 0C14.5437 0 0 14.5437 0 32.5C0 50.4563 14.5437 65 32.5 65C50.4563 65 65 50.4563 65 32.5C65 14.5437 50.4563 0 32.5 0ZM4.0625 32.5C4.0625 16.7781 16.7781 4.0625 32.5 4.0625C48.2219 4.0625 60.9375 16.7781 60.9375 32.5C60.9375 48.2219 48.2219 60.9375 32.5 60.9375C16.7781 60.9375 4.0625 48.2219 4.0625 32.5Z"
                      fill="#A8C686"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1574_4431">
                      <rect width="65" height="65" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p>반려견의 호강 라이프, 호강스에서 만나보세요</p>
              </div>
              <div className="next-btn">
                <button onClick={onClose}>확인</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
