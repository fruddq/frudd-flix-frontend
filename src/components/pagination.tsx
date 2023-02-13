import { navigate } from "wouter/use-location";

const PAGE_RANGE = 5;

const getPageNumbers = (page: number, totalPages: number) => {
  const maxPage = totalPages;
  let startPage = Math.max(1, page - Math.floor(PAGE_RANGE / 2));
  let endPage = Math.min(maxPage, page + Math.floor(PAGE_RANGE / 2));
  if (endPage - startPage + 1 < PAGE_RANGE) {
    if (page < Math.floor(PAGE_RANGE / 2)) {
      endPage = Math.min(
        maxPage,
        endPage + (PAGE_RANGE - (endPage - startPage + 1))
      );
    } else {
      startPage = Math.max(1, startPage - (PAGE_RANGE - (endPage - startPage + 1)));
    }
  }
  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
};

export const Pagination: React.FC<{
  page: number;
  totalPages: number;
}> = ({ page, totalPages }) => {
  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <div className="pagination-container">
      <button disabled={page === 1} onClick={handlePrevPage}>
        Previous
      </button>
      {pageNumbers[0] > 1 && (
        <>
          <button onClick={() => navigate(`/movies/1`)}>1</button>
          {pageNumbers[0] > 2 && <span>...</span>}
        </>
      )}
      {pageNumbers.map((pageNumber) => (
        <button key={pageNumber} className={pageNumber === page ? "current" : ""} onClick={() => navigate(`/movies/${pageNumber}`)}>
          {pageNumber}
        </button>
      ))}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <span>...</span>}
          <button onClick={() => navigate(`/movies/${totalPages}`)}>{totalPages}</button>
        </>
      )}
      <button disabled={page === totalPages} onClick={handleNextPage}>
        Next
      </button>
    </div>
  );
};