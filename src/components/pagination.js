import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { range } from 'utils';

const PaginationItem = ({ page, currentPage, url }) => {
  const liClassess = classNames({
    'page-item': true,
    active: currentPage === page,
  });
  return (
    <li className={liClassess}>
      <Link to={`${url}?page=${page}`} className="page-link">
        {page}
      </Link>
    </li>
  );
};

const Pagination = ({ total, limit, url, currentPage }) => {
  const pagesCount = Math.ceil(total / limit);
  const pages = range(1, pagesCount);
  return (
    <ul className="pagination">
      {pages.map((page) => (
        <PaginationItem
          key={page}
          page={page}
          currentPage={currentPage}
          url={url}
        />
      ))}
    </ul>
  );
};

export { Pagination };
