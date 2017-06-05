import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, FormControl, HelpBlock, Button } from 'react-bootstrap';

class PhotoView extends Component {
  constructor(){
    super();
    this.state = {
      searchValue: '',
      photos: {}
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
        data.photos.photo.forEach(photo => {
          this.setState({...this.state, photos: Object.assign(this.state.photos, photo)})
        })
      })
      .then(() => {
        console.log('the state after', this.state )
      })
      .catch((err) => {
        console.error(err)
      })
  }
//https://farm5.staticflickr.com/4221/35041159256_058fcd88fe.jpg
//https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

  render() {
    let pic = this.state.photos;

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
            {/**<HelpBlock>Validation is based on string length.</HelpBlock>**/}
          </FormGroup>
          <Button type="submit" bsStyle="info" onClick={this.handleClick}>Submit</Button>
        </form>

         <div>
          {this.state.searchValue ?
            <img alt="search result" src={`https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`}></img>
            :
            null
          }
         </div>
      </div>
    );
  }
}

export default PhotoView;
