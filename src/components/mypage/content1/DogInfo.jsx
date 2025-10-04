import React, { useState, useEffect, useRef } from 'react';
import useMypageStore from '../../../store/useMypageStore';
import RadioInput from '../../common/RadioInput';

const DogInfo = ({ onSave, initialData }) => {
    const [name, setName] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [vaccinations, setVaccinations] = useState([]);
    const [parasites, setParasites] = useState([]);
    const [gender, setGender] = useState('');
    const [breed, setBreed] = useState('');
    const [weight, setWeight] = useState('');
    const [neutered, setNeutered] = useState('');
    const [hospital, setHospital] = useState('');
    const [healthNote, setHealthNote] = useState('');
    const [moreNote, setMoreNote] = useState('');
    const user = useMypageStore((s) => s.user);
    const setMyPets = useMypageStore((s) => s.setMyPets);

    // 프로필 이미지 상태
    const [profileImage, setProfileImage] = useState('/mypage/hogangprofile.webp');
    const fileInputRef = useRef(null);

    // 수정 모드일 경우 initialData로 state 초기화
    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setBirthYear(initialData.birthYear || '');
            setBirthMonth(initialData.birthMonth || '');
            setVaccinations(initialData.vaccinations || []);
            setParasites(initialData.parasites || []);
            setGender(initialData.gender || '');
            setBreed(initialData.breed || '');
            setWeight(initialData.weight || '');
            setNeutered(initialData.neutered || '');
            setHospital(initialData.hospital || '');
            setHealthNote(initialData.healthNote || '');
            setMoreNote(initialData.moreNote || '');
            setProfileImage(initialData.profileImage || '/mypage/hogangprofile.webp');
        }
    }, [initialData]);

    const handleSubmit = () => {
        const today = new Date();
        let age = null;

        if (birthYear) {
            age = today.getFullYear() - parseInt(birthYear, 10);
            if (birthMonth && today.getMonth() + 1 < parseInt(birthMonth, 10)) {
                age -= 1;
            }
        }
        const payload = {
            userId: user._id,
            name,
            birthYear,
            birthMonth,
            age: age !== null ? `${age}` : '미입력',
            vaccinations,
            parasites,
            gender,
            breed,
            weight,
            neutered,
            hospital,
            healthNote,
            moreNote,
            //  사진 수정 안했으면 기본 이미지 적용
            profileImage:
                profileImage === '/mypage/hogangprofile.webp'
                    ? '/mypage/hogangImg.webp'
                    : profileImage,
        };
        onSave(payload);
        setMyPets(payload);
    };

    //  예방접종 체크박스 선택 처리
    const handleCheck = (value) => {
        if (value === 'none') {
            setVaccinations(['none']);
        } else {
            setVaccinations((prev) =>
                prev.includes(value)
                    ? prev.filter((item) => item !== value)
                    : [...prev.filter((item) => item !== 'none'), value]
            );
        }
    };

    // 기생충 체크박스 선택 처리
    const handleParasiteCheck = (value) => {
        setParasites((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    // 사진 변경 핸들러
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result); // 미리보기로 반영
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImage = () => {
        setProfileImage('/mypage/hogangprofile.webp'); // 기본 이미지로 리셋
    };

    return (
        <div className="dogInfoBox" id="dogInfoBox">
            <div className="inner">
                <div className="infoForm">
                    <div className="title">
                        <h2>호강이의 정보를 입력해주세요.</h2>
                    </div>
                    <div className="infoFormBox">
                        <div className="infoLeft">
                            <div
                                className={`hogangprofile ${
                                    profileImage !== '/mypage/hogangprofile.webp'
                                        ? 'filled'
                                        : 'default'
                                }`}
                            >
                                <img src={profileImage} alt="hogangprofile" />
                            </div>

                            <div className="btnWrap">
                                <button type="button" onClick={handleUploadClick}>
                                    사진변경
                                </button>
                                <button type="button" onClick={handleDeleteImage}>
                                    삭제
                                </button>
                            </div>
                            {/* 숨겨진 파일 input */}
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="infoRight">
                            <div className="form-row">
                                <span className="label">이름</span>
                                <input
                                    type="text"
                                    placeholder="예) 호강이"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="form-row">
                                <span className="label">성별</span>

                                <div className="radioWrap">
                                    <RadioInput
                                        radioName="gender"
                                        radioValue="female"
                                        handler={() => setGender('female')}
                                        sel={gender}
                                        text="여자아이"
                                    />
                                    <RadioInput
                                        radioName="gender"
                                        radioValue="male"
                                        handler={() => setGender('male')}
                                        sel={gender}
                                        text="남자아이"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <span className="label">생일</span>
                                <div className="selectWrap">
                                    <select
                                        value={birthYear}
                                        onChange={(e) => setBirthYear(e.target.value)}
                                    >
                                        <option value="">년도</option>
                                        {Array.from(
                                            { length: 2025 - 1996 + 1 },
                                            (_, i) => 2025 - i
                                        ).map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        value={birthMonth}
                                        onChange={(e) => setBirthMonth(e.target.value)}
                                    >
                                        <option value="">월</option>
                                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                                            (month) => (
                                                <option key={month} value={month}>
                                                    {month}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <span className="label">견종</span>
                                <input
                                    type="text"
                                    placeholder="예) 비숑"
                                    value={breed}
                                    onChange={(e) => setBreed(e.target.value)}
                                />
                            </div>

                            <div className="form-row">
                                <span className="label">몸무게</span>
                                <input
                                    type="text"
                                    placeholder="예) 2.8"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                />
                                <p>kg</p>
                            </div>

                            <div className="form-row">
                                <span className="label">중성화</span>
                                <div className="radioWrap">
                                    <RadioInput
                                        radioName="neutered"
                                        radioValue="yes"
                                        handler={() => setNeutered('yes')}
                                        sel={neutered}
                                        text="했어요"
                                    />
                                    <RadioInput
                                        radioName="neutered"
                                        radioValue="no"
                                        handler={() => setNeutered('no')}
                                        sel={neutered}
                                        text="안했어요"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <span className="label">동물병원</span>
                                <input
                                    type="text"
                                    placeholder="예) 호강동물병원(강남구)"
                                    value={hospital}
                                    onChange={(e) => setHospital(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 예방접종 */}
                <div className="vaccination">
                    <div className="title">
                        <h2>지금까지 완료하신 예방접종 여부를 선택해주세요.</h2>
                        <span>중복 선택 가능</span>
                    </div>
                    <div className="checkBox-Group">
                        <label>
                            <input
                                type="checkbox"
                                checked={vaccinations.includes('rabies')}
                                onChange={() => handleCheck('rabies')}
                            />
                            <p>광견병</p>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={vaccinations.includes('combo')}
                                onChange={() => handleCheck('combo')}
                            />
                            <p>종합백신</p>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={vaccinations.includes('corona')}
                                onChange={() => handleCheck('corona')}
                            />
                            <p>코로나</p>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={vaccinations.includes('kennel')}
                                onChange={() => handleCheck('kennel')}
                            />
                            <p>켄넬코프</p>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={vaccinations.includes('none')}
                                onChange={() => handleCheck('none')}
                            />
                            <p>접종을 하지 않았습니다</p>
                        </label>
                    </div>
                </div>

                {/* 기생충 */}
                <div className="parasite">
                    <div className="title">
                        <h2>내/외부 기생충 관련 예방접종 여부를 선택해주세요.</h2>
                        <span>중복 선택 가능</span>
                    </div>
                    <div className="checkBox-Group">
                        <label>
                            <input
                                type="checkbox"
                                checked={parasites.includes('heartworm')}
                                onChange={() => handleParasiteCheck('heartworm')}
                            />
                            <p>심장사상충</p>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={parasites.includes('external')}
                                onChange={() => handleParasiteCheck('external')}
                            />
                            <p>외부기생충</p>
                        </label>
                    </div>
                </div>

                {/* 건강 정보 */}
                <div className="health">
                    <div className="title">
                        <h2>건강 관련 주의사항을 알려주세요!</h2>
                    </div>
                    <div className="txt">
                        <input
                            type="text"
                            placeholder="예) 알러지 음식, 슬개골 탈구, 피부병 등"
                            value={healthNote}
                            onChange={(e) => setHealthNote(e.target.value)}
                        />
                    </div>
                </div>

                {/* 참고사항 */}
                <div className="more">
                    <div className="title">
                        <h2>참고사항을 입력해주세요.</h2>
                    </div>
                    <div className="txt">
                        <input
                            type="text"
                            placeholder="예) 우리 강아지는 생식만 먹어요. 남자를 무서워해요!"
                            value={moreNote}
                            onChange={(e) => setMoreNote(e.target.value)}
                        />
                    </div>
                </div>

                <div className="btn">
                    <button onClick={handleSubmit}>{initialData ? '수정하기' : '등록하기'}</button>
                </div>
            </div>
        </div>
    );
};

export default DogInfo;
