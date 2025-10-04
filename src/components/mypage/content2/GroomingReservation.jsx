import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const formatKRDate = (value) => {
    return format(new Date(value), 'yy년 MM월 dd일', { locale: ko });
};
const GroomingReservation = ({ data }) => {
    const { type, startDate, endDate, status, beautyTime } = data;
    return (
        <div
            id="groomingReservationBox"
            className={`groomingReservationBox ${status} === 0 ? "past" : "upcoming"`}
        >
            <div className="left">
                <img src="/mypage/groomingDog.webp" alt="groomingDog" />
            </div>
            <div className="right">
                <p>미용예약완료</p>
                <span className="date">
                    {formatKRDate(startDate)} <br />
                    {beautyTime}
                </span>
            </div>
        </div>
    );
};

export default GroomingReservation;
