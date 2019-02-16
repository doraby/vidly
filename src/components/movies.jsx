import React, {Component } from "react";
import {getMovies} from "../services/fakeMovieService";
import {getGenres} from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import {paginate} from "../util/paginate";

export default class SearchList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allMovies: [],
            genres:[],
            pageSize: 4,
            currentPage: 1,
            selectedGenre: {},
        };
    }

    componentDidMount() {
        this.setState({allMovies: getMovies(), genres: getGenres()});
    }

    handleGenresSelect = (genre) => {
        this.setState({ selectedGenre: genre })
        console.log(genre);
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
        const {currentPage, pageSize, allMovies} = this.state;
        const { length: count } = allMovies;

        const movies = paginate(allMovies, currentPage, pageSize);

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
                    <p>Showing {count} results</p>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col" >Stock</th>
                            <th scope="col">Rate</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {movies.map((movie) => (
                            <tr key={movie._id}>
                                <td >{movie.title}</td>
                                <td >{movie.genre.name}</td>
                                <td >{movie.numberInStock}</td>
                                <td >{movie.dailyRentalRate}</td>
                                <td >
                                    <Like
                                        onLike={() => this.handleLike(movie)}
                                        liked={movie.liked}
                                    />
                                </td>
                                <td><button
                                    onClick={() => this.handleDelete(movie)}
                                    type="button"
                                    className="btn btn-danger" >Delete</button></td>
                            </tr>)
                        )}
                        </tbody>

                    </table>
                    <Pagination
                        countItems={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPage={this.handlePageClick}
                    />
                </div>
            </div>
        );
    }
}