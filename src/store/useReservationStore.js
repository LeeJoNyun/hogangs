import axios from 'axios';
import { create } from 'zustand';
import { API_URL } from '../config';
const initialSteps = [
    { id: 1, process: 'ing' },
    { id: 2, process: 'none' },
    { id: 3, process: 'none' },
    { id: 4, process: 'none' },
    { id: 5, process: 'none' },
];
const initialPaySteps = [
    { id: 'user', process: false },
    { id: 'terms', process: false },
    { id: 'cancel', process: false },
    { id: 'payment', process: false },
];

const ALERT_BY_ID = {
    user: '회원 정보를 모두 입력해 주세요.',
    terms: '모든 약관에 동의해 주세요.',
    cancel: '취소/환불 규정에 동의해 주세요.',
    payment: '결제 수단을 선택해 주세요.',
};

const ORDER = ['user', 'terms', 'cancel', 'payment'];

// 로컬스토리지 값 가져오기
const getLocalStorage = (k) => {
    try {
        return JSON.parse(localStorage.getItem(k) ?? '{}');
    } catch {
        return {};
    }
};

const useReservationStore = create((set, get) => ({
    steps: initialSteps,
    isNormalLogic: false,
    paymentProcesses: initialPaySteps,
    selectedCouponId: '',
    totalPrice: 0,
    reservationForm: getLocalStorage('reservationForm') ?? {},
    form: {},

    init: () => {
        set({ steps: initialSteps, form: {} });
        localStorage.removeItem('reservationForm');
    },
    setStepProcesses: (updates) => {
        set((state) => {
            console.log(updates);
            return {
                steps: state.steps.map((s) =>
                    updates[s.id] ? { ...s, process: updates[s.id] } : s
                ),
            };
        });
    },
    setPaymentProcesses: (id, value) =>
        set((state) => ({
            paymentProcesses: state.paymentProcesses.map((p) =>
                p.id === id ? { ...p, process: Boolean(value) } : p
            ),
        })),
    setFormField: (key, value) =>
        set((state) => {
            const form = { ...state.form, [key]: value };
            // ← 필드 바뀔 때마다 자동 저장하고 싶으면 아래 3줄 유지
            try {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('reservationForm', JSON.stringify(form));
                }
            } catch (e) {
                console.error('localStorage save error:', e);
            }
            return { form };
        }),

    // 수동 저장이 필요할 때 호출
    setLocalStorageForm: () => {
        try {
            if (typeof window !== 'undefined') {
                const form = get().form;
                localStorage.setItem('reservationForm', JSON.stringify(form));
            }
        } catch (e) {
            console.error('localStorage save error:', e);
        }
    },
    // 앱 시작 시 불러오기용(옵션)
    loadLocalStorageForm: () => {
        try {
            if (typeof window !== 'undefined') {
                const raw = localStorage.getItem('reservationForm');
                if (raw) set({ form: JSON.parse(raw) });
            }
        } catch (e) {
            console.error('localStorage load error:', e);
        }
    },

    //예약중
    setBeingReservation: () => {
        set({ isNormalLogic: true });
    },

    // 총 결제금액 입력
    setTotalPrice: (p) => {
        set({ totalPrice: p });
    },

    paymentProcessValidate: () => {
        const { paymentProcesses } = get();
        // id → boolean 맵
        const status = Object.fromEntries(paymentProcesses.map((p) => [p.id, Boolean(p.process)]));

        // 정해둔 순서대로 첫 실패 찾기
        for (const id of ORDER) {
            if (!status[id]) {
                return { ok: false, id, message: ALERT_BY_ID[id] || '필수 항목을 완료해 주세요.' };
            }
        }
        return { ok: true };
    },
    // 결제시 쿠폰 선택
    setCouponId: (c) => {
        set({ selectedCouponId: c });
    },
    // 결제하기
    doPay: async () => {
        //회원정보
        const user = getLocalStorage('user');
        //예약폼 데이터

        //쿠폰선택항목

        const { totalPrice, selectedCouponId, reservationForm } = get();

        const {
            checkOut,
            checkOutTime,
            endDate,
            groomingService,
            nights,
            option,
            requestMessage,
            resType,
            size,
            startDate,
            type,
            resTime,
        } = reservationForm;

        const payload = {
            userId: user._id,
            resType, // prop으로 받는 값
            name: user.name,
            email: user.email,
            phone: user.phone,
            regDate: new Date(),
            startDate,
            endDate,
            lateCheckOutTime: checkOutTime ?? '', // 없으면 빈값/undefined 중 택1 (DTO @IsOptional이면 undefined 추천)
            beautyTime: resTime ?? '',
            size: size ?? '',
            beautyType: type ?? '',
            beautyOption: option ?? '',
            totalPrice: totalPrice,
            couponId: selectedCouponId,
            request: requestMessage ?? '',
        };
        // coupon 사용
        if (selectedCouponId) {
            await axios.patch(`${API_URL.replace(/\/+$/, '')}/user-coupons/${selectedCouponId}/use`);
        }
        const res = await axios.post(`${API_URL.replace(/\/+$/, '')}/reservation`, payload, {
            headers: { 'Content-Type': 'application/json' },
        });
        const { data, error, message } = res.data;

        if (error === 0) {
            localStorage.removeItem('reservationForm');
            return data;
        }
    },

    cancelReservation: async (resId, couponId) => {

        const { res } = await axios.patch(
            `${API_URL.replace(/\/+$/, '')}/reservation/${resId}/cancel`,
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );
        // coupon 사용 취소 처리
        if (res.error === 0) {
            const { res2 } = await axios.patch(
                `${API_URL.replace(/\/+$/, '')}/user-coupon/${couponId}/cancel`,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            return res2.error;
        }
    },
}));

export default useReservationStore;
