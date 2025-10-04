import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import React from 'react';

const formatKRDate = (value) => {
    return format(new Date(value), 'yy년 MM월 dd일', { locale: ko });
};
const HotelReservation = ({ data }) => {
    const { type, startDate, endDate, status } = data;

    return (
        <div id="hotelReservationBox" className={status === 0 ? 'past' : 'upcoming'}>
            <div className="left">
                <img src="/mypage/hotelDog.webp" alt="hotelDog" />
            </div>
            <div className="right">
                <p>호텔예약완료</p>
                <span className="date">
                    {formatKRDate(startDate)} - <br />
                    {formatKRDate(endDate)}
                </span>
            </div>
        </div>
    );
};

export default HotelReservation;
