import React, {Component } from "react";
import {getMovies} from "../services/fakeMovieService";
import {getGenres} from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import {paginate} from "../util/paginate";
import MoviesTable from "./common/moviesTable";
import  _ from 'lodash';
import {Link} from "react-router-dom";


export default class SearchList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allMovies: [],
            genres:[],
            pageSize: 4,
            currentPage: 1,
            selectedGenre: undefined,
            sortColumn: { path: 'title', order: 'asc'}
        };
    }

    componentDidMount() {
        const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];
        this.setState({ allMovies: getMovies(), genres });
    }

    handleGenresSelect = (genre) => {
        this.setState({ selectedGenre: genre, currentPage: 1 })
    };

    handlePageClick = (selectedPage) =>{
        this.setState({ currentPage: selectedPage });
    };

    handleDelete = (movie) => {
        const movies = this.state.allMovies.filter(m => m._id !== movie._id);
        this.setState ({allMovies: movies, n : this.state.n - 1});
    };

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    };

    handleLike = (movie) => {
        const allMovies = [...this.state.allMovies];
        const index = allMovies.indexOf(movie);
        allMovies[index] = {...allMovies[index]};
        allMovies[index].liked = !allMovies[index].liked;
        this.setState({allMovies});
    };

    getPagedData = () => {
        const {currentPage, pageSize, allMovies, selectedGenre, sortColumn} = this.state;
        const filtered = selectedGenre && selectedGenre._id
            ? allMovies.filter(m => m.genre._id === selectedGenre._id)
            : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies }
    };

    render() {
        const {currentPage, pageSize, sortColumn} = this.state;
        if (this.state.n === 0) {return <p>There is no results </p>}

        const { totalCount, data: movies} = this.getPagedData();
        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup
                        items={this.state.genres}
                        onItemSelect={this.handleGenresSelect}
                        selectedItem={this.state.selectedGenre}
                    />
                </div>
                <div className="col">
                    <button
                        className="btn btn-primary">
                         <Link to={"/movies/new"}>New Movie</Link>
                    </button>
                    <p>Showing {totalCount} results</p>

                    <MoviesTable
                    movies={movies}
                    sortColumn={sortColumn}
                    onLike={this.handleLike}
                    onDelete={this.handleDelete}
                    onSort={this.handleSort}/>

                    <Pagination
                        countItems={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPage={this.handlePageClick}
                    />
                </div>
            </div>
        );
    }
}