import React from 'react';
import { Link } from 'react-router-dom';

const VideosContent1 = () => {
    return (
        <section id="vidoescontent1">
            <div className="topbar">
                <div className="topheader">
                    <img src="/mypage/image103.webp" alt="" />
                    <p>호강이님</p>
                </div>
            </div>
            <div className="nav">
                <Link to={'/mypage'}>
                    <ul>
                        <li>MyPage</li>
                    </ul>
                </Link>
                <ul>
                    <li>Videos</li>
                </ul>
                <ul>
                    <li>Hotel</li>
                </ul>
                <ul>
                    <li>Groomig</li>
                </ul>
            </div>
        </section>
    );
};

export default VideosContent1;
