import React, {Component } from "react";
import {getMovies, deleteMovie} from "../services/movieService";
import {getGenres} from "../services/genreService";
import {toast} from 'react-toastify';
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import {paginate} from "../util/paginate";
import MoviesTable from "./common/moviesTable";
import SearchBox from "./searchBox";
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
            searchQuery:"",
            selectedGenre: null,
            sortColumn: { path: 'title', order: 'asc'}
        };
    }

    async componentDidMount() {
        const {data} = await getGenres();
        const genres = [{ _id: '', name: 'All Genres' }, ...data];
        const {data: movies} =  await getMovies();
        this.setState({ allMovies: movies, genres });
    }

    handleGenresSelect = (genre) => {
        this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 })
    };

    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 })
    }

    handlePageClick = (selectedPage) =>{
        this.setState({ currentPage: selectedPage });
    };

    handleDelete = async movie => {
        const originalMovies = this.state.allMovies;
        const movies = originalMovies.filter(m => m._id !== movie._id);
        this.setState ({allMovies: movies});

        try {
            await deleteMovie(movie._id);
        } catch (ex){
            if (ex.response && ex.response.status === 404)
                toast.error("This movie has already been deleted");
            this.setState({ movies: originalMovies});
        }
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
        const {currentPage, pageSize, allMovies, selectedGenre, sortColumn, searchQuery} = this.state;
        let filtered = allMovies;
        if (searchQuery)
            filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        else if (selectedGenre && selectedGenre._id)
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies }
    };

    render() {
        const {currentPage, pageSize, sortColumn, searchQuery} = this.state;
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
                    <SearchBox
                        value={searchQuery}
                        onChange={this.handleSearch}
                    />
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