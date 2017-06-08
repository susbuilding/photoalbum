import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import LightboxView from './Lightbox';
import { Pagination } from 'react-bootstrap';

// TODO: searching multiple times adds onto the state.photos, does not reset

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

  /** Sets search term from input form */
  handleChange = (e) => {
    this.setState({...this.state, searchValue: e.target.value });
  };

  handleClick(e){
    e.preventDefault();

    /** Make sure the string is not empty */
    if(this.state.searchValue.length < 1) return <div>You didn't enter anything!</div>;

    /** Make a call to flickr API using search value and requests JSON.*/
    axios
      .get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=${this.state.searchValue}&api_key=baacda639199fa136ac1b35ec2cd3abc&format=json&nojsoncallback=1`)
      .then((res) => {
        return res.data
      })
      .then(data => {
        // TODO: currently only handles response page 1 (100 photos) by accessing data.photos.photo
        return data.photos.photo.forEach(photo => {
          this.setState({...this.state, photos: [...this.state.photos, photo]})
        })
      })
      .then((photoData) => {
        // TODO can set a const here for each photo instead of in render method https://facebook.github.io/react/docs/lists-and-keys.html
      })
      .catch((err) => {
        console.error(err)
      })
  }

  render() {
    /** Sets the index range for 10 photos shown on active page in */
    let startIdx = +((this.state.activePage - 1).toString() + '0');
    let endIdx = +((this.state.activePage).toString() + '0');

    /** Maps each set of 10 photos to src
     Format is https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
    */

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
              placeholder="Enter Search Term"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <Button className="Search-button" type="submit" bsStyle="primary" onClick={this.handleClick}>Search</Button>
        </form>

        <LightboxView photos={this.state.photos.slice(startIdx, endIdx)} images={LIGHTBOX_IMAGE_SET} />

        <Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={this.state.photos.length ? this.state.photos.length/10 : 1}
        maxButtons={5}
        activePage={this.state.activePage}
        onSelect={this.handlePageSelect} />
      </div>
    );
  }
}

export default PhotoView;
