import React, {Component}  from 'react';
import Like from "./like";
import Table from "./table";

class MoviesTable extends Component {
    columns = [
        { path: "title", label: "Title"},
        { path: "genre.name", label: "Genre"},
        { path: "numberInStock", label: "Stock"},
        { path: "dailyRentalRate", label: "Rate"},
        { key: "like", content: movie =>
            <Like
            onLike={() => this.props.onLike(movie)}
            liked={movie.liked}
            />
        },
        {key: "delete", content: movie =>
            <button
            onClick={() => this.props.onDelete(movie)}
            type="button"
            className="btn btn-danger"
            >
                Delete
            </button>
        }
    ];

    render() {
        const { movies, onSort, sortColumn } = this.props;
        return (
            <Table
                columns={this.columns}
                data={movies}
                sortColumn={sortColumn}
                onSort={onSort}
            />
        );
    }
}


MoviesTable.propTypes = {
};

export default MoviesTable;