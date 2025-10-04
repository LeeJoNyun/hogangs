const Pagination = () => {
    return (
        <div className="pagination">
            <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
            >
                <img src="/ott/icon-prev.webp" alt="이전버튼" />
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
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPage))}
                disabled={currentPage === totalPage}
            >
                <span>다음</span>
                <img src="/ott/icon-next.webp" alt="다음버튼" />
            </button>
        </div>
    );
};

export default Pagination;
