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
        <form>
          <FormGroup
            controlId="formBasicText"
          >
            <ControlLabel>Working example with validation</ControlLabel>
            <FormControl
              type="text"
              value={this.state.searchValue}
              placeholder="Enter text"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
            <HelpBlock>Validation is based on string length.</HelpBlock>
          </FormGroup>
        </form>
         <Button bsStyle="info" onClick={this.handleClick}>Info</Button>
      </div>
    );
  }
}

export default PhotoView;