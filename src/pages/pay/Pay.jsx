import { useEffect, useState } from 'react';
import Cancel from '../../components/pay/Cancel';
import Coupon from '../../components/pay/Coupon';
import Payment from '../../components/pay/Payment';
import PaymentInfo from '../../components/pay/PaymentInfo';
import ReservationTerms from '../../components/pay/ReservationTerms';
import { useNavigate } from 'react-router-dom';
import useReservationStore from '../../store/useReservationStore';

const Pay = () => {
    const reservationForm = useReservationStore((s) => s.reservationForm);
    const isNormalLogic = useReservationStore((s) => s.isNormalLogic);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 정상 접근이 아닌경우 Main으로 리디렉션
        if (!isNormalLogic) {
            navigate('/');
        }
        if (!reservationForm) {
            navigate('/');
        }
    }, [isNormalLogic]);

    // reservationForm 데이터 불러오기
    useEffect(() => {
        console.log(reservationForm);
        // if (!reservationForm) return;
        setLoading(false);
    }, [reservationForm]);
    if (loading) {
        return (
            <section id="pay_result">
                <div className="inner">불러오는 중...</div>
            </section>
        );
    }
    const { resType } = reservationForm;

    return (
        <>
            <section id="pay_top">
                <ul className="res_nav">
                    <li className={resType === 'hotel' ? 'active' : ''}>Hotel 예약</li>
                    <li className={resType === 'grooming' ? 'active' : ''}>Grooming 예약</li>
                </ul>
            </section>
            <PaymentInfo resType={resType} form={reservationForm} />
            <Coupon />
            <ReservationTerms />
            <Cancel />
            <Payment />
        </>
    );
};

export default Pay;
