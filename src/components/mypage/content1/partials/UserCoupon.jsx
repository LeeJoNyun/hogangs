import React, { useMemo, useState } from "react";
import CouponItem from "../CouponItem";
import ExpiredCouponItem from "../ExpiredCouponItem";
import useMypageStore from "../../../../store/useMypageStore";
import { addMonths } from "date-fns";

const UserCoupon = () => {
  const [couponTab, setCouponTab] = useState(0); // 0: 사용 가능, 1: 만료
  const [periodTab, setPeriodTab] = useState(3);
  const userCoupons = useMypageStore((s) => s.userCoupons);

  const filtered = useMemo(() => {
    const arr = Array.isArray(userCoupons) ? userCoupons : [];
    const now = new Date();
    const end = addMonths(now, periodTab);

    return arr
      .filter((c) => c && typeof c === "object")
      .filter((c) => {
        const exp = c.expiresAt ? new Date(c.expiresAt) : null;
        if (couponTab === 0) {
          if (!exp) return false;
          return (
            exp >= now &&
            exp <= end &&
            (c.status === 0 || c.status === 1 || c.status === "available")
          );
        } else {
          if (exp && exp < now) return true;
          return (
            c.status === 2 || c.status === "expired" || c.status === "used"
          );
        }
      })
      .sort((a, b) => +new Date(a.expiresAt) - +new Date(b.expiresAt));
  }, [userCoupons, couponTab, periodTab]);

  const isEmpty = filtered.length === 0;
  const emptyText =
    couponTab === 0
      ? "사용 가능한 쿠폰이 없습니다."
      : "만료된 쿠폰이 없습니다.";

  return (
    <div className="coupon">
      <div className="title">
        <h2>쿠폰</h2>
      </div>

      {/* 탭 */}
      <div className="tab">
        <ul className="couponTab">
          <li
            className={couponTab === 0 ? "on" : ""}
            onClick={() => setCouponTab(0)}
          >
            사용 가능 쿠폰
          </li>
          <li
            className={couponTab === 1 ? "on" : ""}
            onClick={() => setCouponTab(1)}
          >
            사용기간 만료 쿠폰
          </li>
        </ul>
        <ul className="subTab">
          <li
            className={periodTab === 1 ? "on" : ""}
            onClick={() => setPeriodTab(1)}
          >
            1개월
          </li>
          <li
            className={periodTab === 3 ? "on" : ""}
            onClick={() => setPeriodTab(3)}
          >
            3개월
          </li>
          <li
            className={periodTab === 6 ? "on" : ""}
            onClick={() => setPeriodTab(6)}
          >
            6개월
          </li>
        </ul>
      </div>

      {/* 리스트 */}
      <div className="couponList" role="list">
        {isEmpty ? (
          <div className="empty" role="status" aria-live="polite">
            <p>{emptyText}</p>
            {couponTab === 0 && <small>기간: 오늘 ~ {periodTab}개월</small>}
          </div>
        ) : (
          filtered.map((c) =>
            couponTab === 0 ? (
              <CouponItem key={c._id ?? c.id} data={c} />
            ) : (
              <ExpiredCouponItem key={c._id ?? c.id} data={c} />
            )
          )
        )}
      </div>
    </div>
  );
};

export default UserCoupon;
