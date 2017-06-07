import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, FormControl, HelpBlock, Button } from 'react-bootstrap';
import LightboxView from './Lightbox';

class PhotoView extends Component {
  constructor(){
    super();
    this.state = {
      searchValue: '',
      photos: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

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
        console.log('res', res.data)
        return res.data
      })
      .then(data => {
        console.log('parsing', data.photos.photo)
        return data.photos.photo.forEach(photo => {
          this.setState({...this.state, photos: [...this.state.photos, photo]})
        })
      })
      .then((photoData) => {
        console.log('photodata', photoData)
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
    const LIGHTBOX_IMAGE_SET = this.state.photos.slice(0, 10).map(pic => {
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

        {/**{this.state.photos ?
            this.state.photos.map(pic => {
              return <img alt="search result" src={`https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`}></img>
            })
        :
           null
        }**/}

        <LightboxView photos={this.state.photos} images={LIGHTBOX_IMAGE_SET} />
      </div>
    );
  }
}

export default PhotoView;
