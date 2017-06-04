import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import axios from 'axios';

class PhotoView extends Component {
  constructor(){
    super();
    this.state = {
      searchValue: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

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
//https://farm5.staticflickr.com/4221/35041159256_058fcd88fe.jpg
//https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

  render() {
    return (
      <div>
      <section>
       <Input type='text' label='Name' name='name' value={this.state.searchValue} onChange={this.handleChange} />
      </section>
        <button onClick={this.handleClick} />
      </div>
    );
  }
}

export default PhotoView;
