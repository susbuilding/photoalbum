import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import PhotoView from './PhotoView';
// import PaginationTool from './Pagination';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Image Search</h2>
        </div>
        <p className="App-intro">
          <code>src/App.js</code>
        </p>
        <PhotoView />
      </div>
    );
  }
}

export default App;
