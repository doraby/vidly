import React, {Component } from "react";
import {getMovies} from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";

export default class SearchList extends Component {
    constructor(props) {
        super(props);

        let moviesArray = getMovies();
        this.state = {
            movies: moviesArray,
            pageSize: 4
        };

        this.handleDelete = this.handleDelete.bind(this);
    }
    handlePageSize = () =>{

    };
    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState ({movies: movies, n : this.state.n - 1});
};
    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    };

    render() {
        if (this.state.n === 0) {return <p>There is no results </p>};
        const { length: count } = this.state.movies;

        return (
            <div>
                <p>Showing {count} results</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Gentre</th>
                            <th scope="col" >Stock</th>
                            <th scope="col">Rate</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map((movie) => (
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
                            <td><button onClick={() => this.handleDelete(movie)} type="button" className="btn btn-danger" >Delete</button></td>
                            </tr>)
                        )}
                    </tbody>

                </table>
                <Pagination
                    countItems={count}
                    pageSize={this.state.pageSize}
                    onPageSize={this.handlePageSize}
                />
            </div>
        );
    }
}

// SearchList.propTypes = {};
