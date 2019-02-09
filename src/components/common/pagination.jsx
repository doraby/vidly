import React from 'react';
import _ from 'lodash'

const Pagination = props => {
    const {countItems, pageSize} = props;

    const pageCount = Math.floor(countItems / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);

    return (
        <nav className="">
            <ul className="pagination">
                {pages.map(page =>
                    <li key={page} className="page-item">
                        <a className="page-link">{page}</a>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;