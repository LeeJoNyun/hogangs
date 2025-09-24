import { useEffect, useRef, useState } from "react";

const CouponSelect = ({
  coupons = [],
  value,
  onChange,
  placeholder = "사용하실 쿠폰을 선택해주세요.",
  fmtKorean,
}) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const selected = coupons.find((c) => (c._id ?? c.id) === value) || null;

  useEffect(() => {
    const onDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div className="coupon-select" ref={wrapRef}>
      <button
        type="button"
        className={`sel_trigger ${open ? "open" : ""} ${selected ? "" : "ph"}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="txt">
          {selected
            ? `${selected.name} ${fmtKorean(selected.expiresAt)}`
            : placeholder}
        </span>

        <i className="chev">
          <img src="/arrow_down.png" alt="" />
        </i>
      </button>

      {open && (
        <div className="sel_panel" role="listbox">
          <div className="optlist">
            {coupons
              .filter((c) => c?.status === 0)
              .map((c) => {
                const id = c._id ?? c.id;
                const isSel = id === value;
                return (
                  <div
                    key={id}
                    role="option"
                    aria-selected={isSel}
                    className={`opt ${isSel ? "selected" : ""}`}
                    onClick={() => {
                      onChange?.(id);
                      setOpen(false);
                    }}
                  >
                    <span className="label">{c.name}</span>
                    <span className="hint">{fmtKorean(c.expiresAt)}</span>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponSelect;
