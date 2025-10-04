import { Outlet, useNavigate } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import ChannelTalk from '../components/main/ChannelTalk';
import { useEffect, useState } from 'react';
import HeaderMobile from './header/HeaderMobile';

const Layout = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    // 버튼별 hover 상태
    const [hover1, setHover1] = useState(false);
    const [hover2, setHover2] = useState(false);
    const [hover3, setHover3] = useState(false);
    const [hover4, setHover4] = useState(false); // footer button2

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 600);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="wrap">
            {isMobile ? <HeaderMobile /> : <Header />}
            <main className="main">
                <ChannelTalk />

                {/* footer 버튼 1 */}
                <div className="footer-buttons1" aria-label="quick buttons">
                    <img
                        src={hover1 ? '/footer/Hotel.webp' : '/footer/Hotel-1.webp'}
                        alt="호텔 버튼"
                        onClick={() => navigate('/Hotel')}
                        onMouseEnter={() => setHover1(true)}
                        onMouseLeave={() => setHover1(false)}
                        style={{ cursor: 'pointer' }}
                    />
                    <img
                        src={hover2 ? '/footer/Grooming.webp' : '/footer/Grooming-1.webp'}
                        alt="그루밍 버튼"
                        onClick={() => navigate('/Grooming')}
                        onMouseEnter={() => setHover2(true)}
                        onMouseLeave={() => setHover2(false)}
                        style={{ cursor: 'pointer' }}
                    />
                    <img
                        src={
                            hover3
                                ? '/footer/Reservation-Button-2.webp'
                                : '/footer/Reservation-Button-1.webp'
                        }
                        alt="예약 버튼"
                        onClick={() => navigate('/Reservation')}
                        onMouseEnter={() => setHover3(true)}
                        onMouseLeave={() => setHover3(false)}
                        style={{ cursor: 'pointer' }}
                    />
                </div>

                {/* footer 버튼 2 */}
                <div className="footer-buttons2" aria-label="quick buttons">
                    <img
                        src={hover4 ? '/footer/button2-hover.webp' : '/footer/button2.webp'}
                        alt="맨위로 버튼"
                        onClick={handleScrollTop}
                        onMouseEnter={() => setHover4(true)}
                        onMouseLeave={() => setHover4(false)}
                        style={{ cursor: 'pointer' }}
                    />
                </div>

                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
