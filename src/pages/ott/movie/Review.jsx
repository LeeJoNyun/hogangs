// src/components/video/Review.jsx
import { useEffect, useMemo, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import { AiFillLike } from 'react-icons/ai';
import useCommentStore from '../../../store/useCommentStore';
import useMypageStore from '../../../store/useMypageStore';
import { format, parseISO, isDate } from 'date-fns';

// 문자열/Date/숫자 모두 안전 변환
const toDate = (d) => (typeof d === 'string' ? parseISO(d) : isDate(d) ? d : new Date(d));

const SORTS = { latest: 0, starDesc: 1, starAsc: 2 };

const Review = ({ videoId }) => {
    const user = useMypageStore((s) => s.user);

    // 댓글 스토어 훅
    const byVideo = useCommentStore((s) => s.byVideo[videoId]);
    const fetchList = useCommentStore((s) => s.fetchVideoReplies);
    const stats = useCommentStore((s) => s.statsByVideo[videoId]);
    const fetchStats = useCommentStore((s) => s.fetchVideoStats);
    const create = useCommentStore((s) => s.createReply);
    const update = useCommentStore((s) => s.updateReply);
    const remove = useCommentStore((s) => s.deleteReply);
    const likeReply = useCommentStore((s) => s.likeReply);

    // 작성/수정 폼 상태
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [text, setText] = useState('');
    const [editingId, setEditingId] = useState(null);

    // 정렬/페이지
    const [sortType, setSortType] = useState(SORTS.latest);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    // 최초 로드
    useEffect(() => {
        if (!videoId) return;
        fetchList(videoId, 1, 200);
        fetchStats(videoId);
        setCurrentPage(1);
    }, [videoId, fetchList, fetchStats]);

    const raw = byVideo?.items || [];
    const loading = byVideo?.loading;

    // 나의 댓글 여부 + 포맷/정렬용 값
    const mapped = useMemo(() => {
        return raw.map((r) => {
            const dt = toDate(r.regDate);
            const ts = Number.isFinite(dt?.getTime?.()) ? dt.getTime() : 0;
            return {
                ...r,
                id: r._id,
                isMine: user?._id && String(r.userId) === String(user._id),
                dateStr: ts ? format(dt, 'yyyy-MM-dd') : '', // ✅ 문자열 포맷
                score: r.star ?? 0,
                ts, // ✅ 정렬용 숫자
            };
        });
    }, [raw, user?._id]);

    // 정렬
    const sorted = useMemo(() => {
        const arr = [...mapped];
        switch (sortType) {
            case SORTS.starDesc:
                return arr.sort((a, b) => b.score - a.score || b.ts - a.ts);
            case SORTS.starAsc:
                return arr.sort((a, b) => a.score - b.score || b.ts - a.ts);
            default: // 최신순
                return arr.sort((a, b) => b.ts - a.ts);
        }
    }, [mapped, sortType]);

    const totalPage = Math.max(1, Math.ceil(sorted.length / pageSize));
    const current = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handleSortToggle = () => {
        setSortType((prev) => (prev === SORTS.starAsc ? SORTS.latest : prev + 1));
        setCurrentPage(1);
    };
    const getSortText = () =>
        sortType === SORTS.starDesc
            ? '별점 높은순'
            : sortType === SORTS.starAsc
            ? '별점 낮은순'
            : '최신순';

    // 작성
    const onAdd = async () => {
        if (!user?._id) return alert('로그인이 필요합니다.');
        if (!rating || !text.trim()) return alert('별점과 리뷰를 입력해주세요.');
        try {
            await create({ userId: user._id, videoId, text, star: rating });
            setText('');
            setRating(0);
        } catch (e) {
            console.log(e);
            alert('등록 실패');
        }
    };

    // 수정 준비/저장
    const onEdit = (r) => {
        setEditingId(r.id);
        setText(r.text);
        setRating(r.score);
    };
    const onSave = async () => {
        try {
            await update({ replyId: editingId, videoId, patch: { text, star: rating } });
            setEditingId(null);
            setText('');
            setRating(0);
        } catch (e) {
            alert('수정 실패');
        }
    };

    // 삭제
    const onDel = async (id) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        try {
            await remove({ replyId: id, videoId });
        } catch (e) {
            alert('삭제 실패');
        }
    };

    // 좋아요(+1/-1)
    const [likedSet, setLikedSet] = useState(() => new Set());
    const onLike = async (id) => {
        const already = likedSet.has(id);
        try {
            await likeReply({ replyId: id, videoId, amount: already ? -1 : +1 });
            setLikedSet((s) => {
                const ns = new Set(s);
                already ? ns.delete(id) : ns.add(id);
                return ns;
            });
        } catch {}
    };

    return (
        <div className="review-wrapper">
            <div className="inner">
                <div className="reveiw-score">
                    <div className="stars-box">
                        <strong>{rating || 0}</strong>
                        <p>별점을 남겨주세요</p>
                        {[...Array(5)].map((_, i) => {
                            const v = i + 1;
                            return (
                                <FaStar
                                    key={i}
                                    size={34}
                                    color={v <= (hover || rating) ? '#4A9F99' : '#959595'}
                                    onClick={() => setRating(v)}
                                    onMouseEnter={() => setHover(v)}
                                    onMouseLeave={() => setHover(null)}
                                    style={{ cursor: 'pointer' }}
                                />
                            );
                        })}
                    </div>
                    <div className="average">
                        <strong>{Number(stats?.avgStar || 0).toFixed(1)}</strong>
                        <p>{stats?.count || 0}개의 별점</p>
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                size={34}
                                color={i < Math.round(stats?.avgStar || 0) ? '#4A9F99' : '#959595'}
                            />
                        ))}
                    </div>
                    <div className="bar">
                        <img src="/ott/bar.webp" alt="" />
                    </div>
                </div>

                <div className="review-form">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="이 작품에 대한 내 평가를 남겨보세요!"
                        rows="3"
                        style={{ resize: 'none' }}
                    />
                    {editingId ? (
                        <button onClick={onSave} disabled={!rating || !text.trim()}>
                            수정완료
                        </button>
                    ) : (
                        <button onClick={onAdd} disabled={!user?._id || !rating || !text.trim()}>
                            등록
                        </button>
                    )}
                </div>

                <div className="review-list">
                    <strong>리뷰 ({sorted.length})</strong>
                    <div className="like-filter">
                        <p onClick={handleSortToggle}>{getSortText()}</p>
                        <img src="/ott/icon-filter.webp" alt="정렬" />
                    </div>

                    {loading ? (
                        <div className="loading">불러오는 중…</div>
                    ) : current.length === 0 ? (
                        <div className="empty">아직 리뷰가 없습니다.</div>
                    ) : (
                        current.map((r, idx) => (
                            <div
                                key={r.id}
                                className={`review-item ${
                                    idx === current.length - 1 ? 'last' : ''
                                } ${r.isMine ? 'my-review' : ''}`}
                            >
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        size={24}
                                        color={i < r.score ? '#4A9F99' : '#959595'}
                                    />
                                ))}
                                <span className="score-length">{r.score}</span>
                                <span className="date">{r.dateStr}</span>
                                <p>{r.text}</p>

                                <button onClick={() => onLike(r.id)}>
                                    <AiFillLike
                                        size={20}
                                        color={likedSet.has(r.id) ? '#4A9F99' : '#959595'}
                                    />
                                    <span>{r.like ?? 0}</span>
                                </button>

                                <div className="more">
                                    <button
                                        onClick={() =>
                                            setEditingId(editingId === r.id ? null : r.id)
                                        }
                                    >
                                        <FiMoreVertical />
                                    </button>
                                    {editingId === r.id && (
                                        <ul className="dropdown" onClick={() => setEditingId(null)}>
                                            {r.isMine ? (
                                                <>
                                                    <li onClick={() => onEdit(r)}>수정</li>
                                                    <li onClick={() => onDel(r.id)}>삭제</li>
                                                </>
                                            ) : (
                                                <>
                                                    <li>스포일러로 신고</li>
                                                    <li>부적절한 표현으로 신고</li>
                                                </>
                                            )}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))
                    )}

                    <div className="pagination">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <img src="/ott/icon-prev.webp" alt="이전" />
                            <span>이전</span>
                        </button>
                        {Array.from({ length: totalPage }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`current ${currentPage === i + 1 ? 'active' : ''}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPage))}
                            disabled={currentPage === totalPage}
                        >
                            <span>다음</span>
                            <img src="/ott/icon-next.webp" alt="다음" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;
