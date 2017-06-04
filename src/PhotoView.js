import React, { Component } from 'react';
import axios from 'axios';

class PhotoView extends Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
    //e.preventDefault();
    axios
      .get('https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=soccer&api_key=baacda639199fa136ac1b35ec2cd3abc&format=json')
      .then((res) => {
        console.log('res', res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }



  render() {
    return (
      <div>
      HELLOOOOO!!! PhOTO HEREEE
      <button onClick={this.handleClick}>
      </button>
      </div>
    );
  }
}

export default PhotoView;
