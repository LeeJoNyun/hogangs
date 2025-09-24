import React, { useEffect, useState } from "react";
import DogInfo from "./DogInfo";
import CouponItem from "./CouponItem";
import ExpiredCouponItem from "./ExpiredCouponItem";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import HotelReservation from "../content2/HotelReservation";
import GroomingReservation from "../content2/GroomingReservation";
import SnsModal from "./SnsModal";
import useMypageStore from "../../../store/useMypageStore";
import UserCoupon from "./partials/UserCoupon";

const MyContent1 = ({ onUpdateDogProfile }) => {
  const [pageTab, setPageTab] = useState("default");
  const [loading, setLoading] = useState(false);
  // const [pets, setpets] = useState([]); // 항상 배열 보장
  const [editIndex, setEditIndex] = useState(null);

  const [activeTab, setActiveTab] = useState("upcoming");
  const [showSNSModal, setShowSNSModal] = useState(false);
  const [upComingReservations, setUpComingReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);

  const user = useMypageStore((s) => s.user);
  const reservations = useMypageStore((s) => s.reservations);
  const pets = useMypageStore((s) => s.myPets);
  const fetchMyPets = useMypageStore((s) => s.fetchMyPets);
  const upsertPet = useMypageStore((s) => s.upsertPet);

  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  // 내 반려견 목록 로드
  useEffect(() => {
    if (user?._id) fetchMyPets();
  }, [user?._id, fetchMyPets]);

  useEffect(() => {
    setLoading(true);

    // 예약 목록 가져오기
    if (reservations.length > 0) {
      const upcoming = [];
      const past = [];
      console.log(reservations);
      for (const res of reservations) {
        if (res.resType === "hotel") {
          const data = {
            id: res._id,
            type: res.resType, // 'hotel'
            startDate: res.startDate,
            endDate: res.endDate,
            status: res.status,
          };
          (res.status === 1 ? upcoming : past).push(data);
        } else {
          const data = {
            id: res._id,
            type: res.resType, // 'grooming'
            startDate: res.startDate,
            beautyTime: res.beautyTime,
            status: res.status,
          };
          (res.status === 1 ? upcoming : past).push(data);
        }
      }

      setUpComingReservations(upcoming);
      setPastReservations(past);
    } else {
      setUpComingReservations([]);
      setPastReservations([]);
    }

    setLoading(false);
  }, [reservations, user]);
  if (loading) {
    return (
      <section id="pay_result">
        <div className="inner">불러오는 중...</div>
      </section>
    );
  }
  const formatPhone = (phone) => {
    if (!phone) return "연락처 없음";
    return phone.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
  };

  return (
    <section id="mycontent1">
      <div className="inner">
        {pageTab === "default" && (
          <>
            {/* 🐶 강아지 정보 */}
            <div className="dogInfo">
              <div className="title">
                <h2>호강이의 정보를 입력해주세요.</h2>
              </div>
              <div className="infoBox">
                {/* 아무 것도 없을 때 */}
                {pets.length === 0 && (
                  <div className="infoBox-empty">
                    <div className="puppyImg">
                      <img src="/mypage/puppy.png" alt="" />
                    </div>
                    <div className="text">
                      <strong>반려동물의 프로필이 없습니다.</strong>
                      <p>
                        함께 키우시는 반려동물 프로필을 <br />
                        등록하시면 빠른 예약 진행이 가능합니다.
                      </p>
                    </div>
                    <div className="btn">
                      <button
                        onClick={() => {
                          setEditIndex(null);
                          setPageTab("dogInfo");
                        }}
                      >
                        등록하기
                      </button>
                    </div>
                  </div>
                )}

                {/* 등록된 강아지들 */}
                {pets.map((dog, index) => (
                  <div key={index} className="infoBox-add">
                    <div className="edit">
                      <span
                        onClick={() => {
                          setEditIndex(index);
                          setPageTab("dogInfo");
                        }}
                      >
                        프로필 수정하기
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="6"
                        height="9"
                        viewBox="0 0 6 9"
                        fill="none"
                      >
                        <path
                          d="M1 8.5L5 4.5L1 0.5"
                          stroke="#7ABAB6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="box">
                      <div className="top">
                        <div className="hogangPic">
                          <img
                            src={dog.profileImage || "/mypage/hogangPic.png"}
                            alt="hogangPic"
                            className="dog-photo"
                          />
                          <img
                            src="/mypage/bone.png"
                            alt="bone"
                            className="dog-bone"
                          />
                        </div>
                      </div>
                      <div className="bottom">
                        <div className="about">
                          <div className="name">{dog.name}</div>
                          <div className="age">{dog.age}살</div>
                        </div>
                        <div className="uses">
                          <div className="hotelUses">
                            <p>호텔 이용 횟수</p>
                            <strong>0</strong>
                          </div>
                          <div className="groomingUses">
                            <p>미용 이용 횟수</p>
                            <strong>0</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* 추가 버튼 */}
                {pets.length > 0 && (
                  <div className="infoBox-another">
                    <div className="puppyImg">
                      <img src="/mypage/puppy.png" alt="" />
                    </div>
                    <div className="text">
                      <strong>함께하는 호강이가 더 있나요?</strong>
                      <p>
                        함께 키우시는 반려동물 프로필을
                        <br />
                        등록하시면 빠른 예약 진행이 가능합니다.
                      </p>
                    </div>
                    <div className="btn">
                      <button
                        onClick={() => {
                          setEditIndex(null);
                          setPageTab("dogInfo");
                        }}
                      >
                        반려동물 추가
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 주인 정보 */}
            <div className="ownerInfo">
              <div className="title">
                <h2>주인님의 정보</h2>
                <span>수정 +</span>
              </div>
              <dl>
                <div className="row">
                  <dt>이름</dt>
                  <dd>{user?.name || "이름 없음"}</dd>
                </div>
                <div className="row">
                  <dt>연락처</dt>
                  <dd>{formatPhone(user?.phone)}</dd>
                </div>
                <div className="row">
                  <dt>이메일</dt>
                  <dd>{user?.email || "이메일 없음"}</dd>
                </div>
                <div className="actions">
                  <span className="sns" onClick={() => setShowSNSModal(true)}>
                    SNS 연동하기
                  </span>
                  <span
                    className="logout"
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                  >
                    로그아웃
                  </span>
                </div>
              </dl>
            </div>
            {showSNSModal && (
              <SnsModal onClose={() => setShowSNSModal(false)} />
            )}

            {/* 예약 현황 */}
            <div className="reservation">
              <div className="title">
                <h2>예약 현황</h2>
              </div>

              <ul className="tab">
                <li
                  className={activeTab === "upcoming" ? "on" : ""}
                  onClick={() => setActiveTab("upcoming")}
                >
                  다가오는 예약
                </li>
                <li
                  className={activeTab === "past" ? "on" : ""}
                  onClick={() => setActiveTab("past")}
                >
                  지난 예약
                </li>
              </ul>

              {activeTab === "upcoming" ? (
                upComingReservations.length === 0 ? (
                  <div className="reservationList empty">
                    <span>다가오는 예약이 없습니다.</span>
                  </div>
                ) : (
                  <div className="reservationList hasData">
                    {upComingReservations.map((res) =>
                      res.type === "hotel" ? (
                        <HotelReservation key={res.id} data={res} />
                      ) : (
                        <GroomingReservation key={res.id} data={res} />
                      )
                    )}
                  </div>
                )
              ) : pastReservations.length === 0 ? (
                <div className="reservationList empty">
                  <span>지난 예약이 없습니다.</span>
                </div>
              ) : (
                <div className="reservationList hasData">
                  {pastReservations.map((res) =>
                    res.type === "hotel" ? (
                      <HotelReservation key={res.id} isPast />
                    ) : (
                      <GroomingReservation key={res.id} isPast />
                    )
                  )}
                </div>
              )}
            </div>

            {/* 쿠폰 */}
            <UserCoupon />
          </>
        )}

        {/* 🐶 DogInfo 등록/수정 */}
        {pageTab === "dogInfo" && (
          <DogInfo
            initialData={editIndex !== null ? pets[editIndex] : null}
            isEdit={editIndex !== null}
            onSave={async (data) => {
              // edit이면 _id 유지
              const payload =
                editIndex !== null
                  ? { ...data, _id: pets[editIndex]?._id }
                  : data;

              await upsertPet(payload);

              // 첫 등록 시 상단 카드 업데이트
              if (
                editIndex === null &&
                pets.length === 0 &&
                onUpdateDogProfile
              ) {
                onUpdateDogProfile({
                  name: data.name || "호강이",
                  profileImage: data.profileImage || "/mypage/hogangImg.png",
                });
              }

              setEditIndex(null);
              setPageTab("default");
            }}
          />
        )}
      </div>
    </section>
  );
};

export default MyContent1;
