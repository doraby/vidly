import React, {Component } from "react";
import {getMovies} from "../services/fakeMovieService";
import {getGenres} from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import {paginate} from "../util/paginate";
import MoviesTable from "./common/moviesTable";


export default class SearchList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allMovies: [],
            genres:[],
            pageSize: 4,
            currentPage: 1,
            selectedGenre: undefined,
        };
    }

    componentDidMount() {
        const genres = [{ name: 'All Genres' }, ...getGenres()];
        this.setState({ allMovies: getMovies(), genres });
        console.log(this.state.genres, this.state.selectedGenre ? 'a' : 'b');
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

    handleLike = (movie) => {
        const allMovies = [...this.state.allMovies];
        const index = allMovies.indexOf(movie);
        allMovies[index] = {...allMovies[index]};
        allMovies[index].liked = !allMovies[index].liked;
        this.setState({allMovies});
    };

    render() {
        if (this.state.n === 0) {return <p>There is no results </p>}
        const {currentPage, pageSize, allMovies, selectedGenre} = this.state;

        const filtered = selectedGenre && selectedGenre._id
            ? allMovies.filter(m => m.genre._id === selectedGenre._id)
            : allMovies;

        const movies = paginate(filtered, currentPage, pageSize);

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
                    <p>Showing {filtered.length} results</p>

                    <MoviesTable
                    movies={movies}
                    onLike={this.handleLike}
                    onDelete={this.handleDelete}/>

                    <Pagination
                        countItems={filtered.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPage={this.handlePageClick}
                    />
                </div>
            </div>
        );
    }
}