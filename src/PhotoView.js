import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, FormControl, HelpBlock, Button } from 'react-bootstrap';
import LightboxView from './Lightbox';
import { Pagination } from 'react-bootstrap';

class PhotoView extends Component {
  constructor(){
    super();
    this.state = {
      searchValue: '',
      photos: [],
      activePage: 1,
      currentPagePhotos: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePageSelect = this.handlePageSelect.bind(this)
  }

  handlePageSelect = (eventKey) => {
    this.setState({
      activePage: eventKey
    });
  };

  /** Sets search term from input form **/
  handleChange = (e) => {
    this.setState({...this.state, searchValue: e.target.value });
  };

  handleClick(e){
    e.preventDefault();
    /** Make sure the string is not empty!!! **/
    if(this.state.searchValue.length < 1) return;

    console.log('state', this.state)

    axios
      .get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=${this.state.searchValue}&api_key=baacda639199fa136ac1b35ec2cd3abc&format=json&nojsoncallback=1`)
      .then((res) => {
        //console.log('res', res.data)
        return res.data
      })
      .then(data => {
        //console.log('parsing', data.photos.photo)
        // TODO: currently only handles 100 photos
        return data.photos.photo.forEach(photo => {
          this.setState({...this.state, photos: [...this.state.photos, photo]})
        })
      })
      .then((photoData) => {
        //console.log('photodata', photoData)
        console.log('the state after', this.state )
        // TODO can set a const here for each photo instead of in render method https://facebook.github.io/react/docs/lists-and-keys.html
      })
      .catch((err) => {
        console.error(err)
      })
  }
//https://farm5.staticflickr.com/4221/35041159256_058fcd88fe.jpg
//https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

  render() {
    let startIdx = +((this.state.activePage - 1).toString() + '0');
    let endIdx = +((this.state.activePage).toString() + '0');

    const LIGHTBOX_IMAGE_SET = this.state.photos.slice(startIdx, endIdx).map(pic => {
        return {src:`https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`}
    });

    return (
      <div>
        <form>
          <FormGroup
            controlId="formBasicText"
          >
            <FormControl
              type="text"
              placeholder="Search Photos"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <Button type="submit" bsStyle="info" onClick={this.handleClick}>Submit</Button>
        </form>
        <LightboxView photos={this.state.photos.slice(startIdx, endIdx)} images={LIGHTBOX_IMAGE_SET} />

        <Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={10}
        maxButtons={5}
        activePage={this.state.activePage}
        onSelect={this.handlePageSelect} />
      </div>
    );
  }
}

export default PhotoView;
