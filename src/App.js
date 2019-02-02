import React, { Component } from 'react';
import './App.css';
import Searchlist from "./components/movies";

class App extends Component {


  render() {
    return (
      <main className="container">
        <h1>результаты поиска</h1>
      <Searchlist />
      </main>
    );
  }
}

export default App;
