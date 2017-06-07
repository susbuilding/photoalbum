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
          <h2>Photo Gallery</h2>
        </div>
        <p className="App-intro">

        </p>
        <PhotoView />
      </div>
    );
  }
}

export default App;
