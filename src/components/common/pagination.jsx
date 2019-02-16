import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ({ countItems, pageSize, onPage, currentPage }) => {
    const pageCount = Math.ceil(countItems / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);

    return (
        <nav className="">
            <ul className="pagination">
                {pages.map(page =>
                    <li key={page} className={ page === currentPage ? "page-item active" : "page-item" }>
                        <a onClick={() => onPage(page)} className="page-link">{page}</a>
                    </li>
                )}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    countItems: PropTypes.number.isRequired,
    pageSize:PropTypes.number.isRequired,
    onPage:PropTypes.func.isRequired,
    currentPage:PropTypes.number.isRequired
};

export default Pagination;