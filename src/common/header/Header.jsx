import { useState } from "react";
import Login from "../../components/auth/Login";

import { Link } from "react-router-dom";
import Join from "../../components/auth/join";

const Header = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  return (
    <header id="header">
      <div className="inner">
        <h2 className="logo">logo</h2>

        <nav>
          <ul>
            <li>
              <Link to="/about">AboutUs</Link>
            </li>
            <li>Videos</li>
            <li>Hotel</li>
            <li>Grooming</li>
          </ul>
        </nav>

        <ul className="top-menu">
          <li className="btn" onClick={() => setLoginModal(true)}>
            Login
          </li>
          <li className="bar"></li>
          <li className="btn" onClick={() => setJoinModal(true)}>
            Join
          </li>
          <li>
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M13.999 11.6736H13.304L13.0576 11.4362C13.6075 10.7978 14.0093 10.0458 14.2344 9.23408C14.4595 8.42235 14.5023 7.57091 14.3597 6.74072C13.9462 4.29625 11.905 2.34419 9.44155 2.04523C8.57547 1.93573 7.6958 2.02569 6.86986 2.30822C6.04392 2.59076 5.29359 3.05838 4.6763 3.67531C4.059 4.29224 3.5911 5.04213 3.3084 5.86759C3.0257 6.69305 2.93569 7.5722 3.04526 8.43777C3.3444 10.8998 5.2976 12.9398 7.7435 13.3531C8.57418 13.4956 9.42611 13.4528 10.2383 13.2278C11.0505 13.0029 11.803 12.6012 12.4417 12.0517L12.6793 12.2979V12.9926L16.4185 16.7296C16.7793 17.0901 17.3687 17.0901 17.7295 16.7296C18.0902 16.3691 18.0902 15.78 17.7295 15.4195L13.999 11.6736ZM8.7201 11.6736C6.52935 11.6736 4.76091 9.90621 4.76091 7.71674C4.76091 5.52728 6.52935 3.75987 8.7201 3.75987C10.9109 3.75987 12.6793 5.52728 12.6793 7.71674C12.6793 9.90621 10.9109 11.6736 8.7201 11.6736Z"
                  fill="#FEFEFC"
                />
              </svg>
            </i>
          </li>
        </ul>
      </div>
      {loginModal && (
        <Login
          onJoin={() => {
            setLoginModal(false);
            setJoinModal(true);
          }}
          onClose={() => setLoginModal(false)}
        />
      )}
      {joinModal && <Join onClose={() => setJoinModal(false)} />}
    </header>
  );
};

export default Header;
