import { format } from "date-fns";
import { ko } from "date-fns/locale";

const toDateSafe = (v) => {
  if (!v) return null;
  if (v instanceof Date) return v;
  const s = String(v);

  // 1) ISO 우선
  const iso = parseISO(s);
  if (isValid(iso)) return iso;

  // 2) yyyy-MM-dd 같은 로컬 날짜
  const ymd = parse(s, "yyyy-MM-dd", new Date());
  return isValid(ymd) ? ymd : null;
};

const CouponItem = ({ data }) => {
  const { name, type, expiresAt, status } = data;
  const exp = toDateSafe(expiresAt);
  // 오늘(로컬) 기준으로 해당 날짜의 '끝'까지 유효 → 그 이후면 만료
  const isExpired = exp ? isBefore(endOfDay(exp), new Date()) : false;

  // 파생 상태: 0=사용 가능, 1=사용 완료(서버), 2=만료(클라이언트 계산)
  const derivedStatus = isExpired ? 2 : status;
  return (
    <div
      className={status === 0 ? "couponItem" : "ExpiredCouponItem"}
      id={status === 0 ? "couponItem" : "ExpiredCouponItem"}
    >
      <div className="couponImg">
        <div className="txt">
          <span>{type === "pass" ? "이용권" : "할인권"}</span>
          <h3>{name}</h3>
          {status === 0 && (
            <p>
              {format(new Date(expiresAt), "M월 d일", { locale: ko })} 까지
              이용가능
            </p>
          )}
          {derivedStatus === 1 && <p>사용완료</p>}
          {derivedStatus === 2 && <p>만료됨</p>}
        </div>
      </div>
    </div>
  );
};

export default CouponItem;
