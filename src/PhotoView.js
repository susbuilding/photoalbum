import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';

class PhotoView extends Component {
  constructor(){
    super();
    this.state = {
      searchValue: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  handleClick(e){

    /** Remember to make sure the string is not empty!!! **/

    console.log(this.state.searchValue)

    axios
      .get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=${this.state.searchValue}&api_key=baacda639199fa136ac1b35ec2cd3abc&format=json`)
      .then((res) => {
        console.log('res', res.data)
      })
      .then(data => {
        console.log('type', typeof data)
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
        <form>
          <FormGroup
            controlId="formBasicText"
          >
            <ControlLabel>Working example with validation</ControlLabel>
            <FormControl
              type="text"
              //value={this.state.searchValue}
              placeholder="Search Photos"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
            <HelpBlock>Validation is based on string length.</HelpBlock>
          </FormGroup>
        </form>
         <Button bsStyle="info" onClick={this.handleClick}>Submit</Button>
      </div>
    );
  }
}

export default PhotoView;
