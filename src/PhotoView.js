import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, FormControl, HelpBlock, Button } from 'react-bootstrap';
import Lightbox from 'react-images';

class PhotoView extends Component {
  constructor(){
    super();
    this.state = {
      searchValue: '',
      photos: [],
      lightboxIsOpen: false,
      currentImage: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.closeLightbox = this.closeLightbox.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.gotoPrevious = this.gotoPrevious.bind(this);
		this.gotoImage = this.gotoImage.bind(this);
		this.handleClickImage = this.handleClickImage.bind(this);
		this.openLightbox = this.openLightbox.bind(this);
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
          this.setState({...this.state, photos: [...this.state.photos, photo], lightboxIsOpen: true})
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

  openLightbox (index, event) {
		event.preventDefault();
		this.setState({
			currentImage: index,
			lightboxIsOpen: true,
		});
	}
	closeLightbox () {
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false,
		});
	}
	gotoPrevious () {
		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	}
	gotoNext () {
		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	}
	gotoImage (index) {
		this.setState({
			currentImage: index,
		});
	}
	handleClickImage () {
		if (this.state.currentImage === this.props.images.length - 1) return;

		this.gotoNext();
	}

  render() {
    const LIGHTBOX_IMAGE_SET = this.state.photos.slice(0, 10).map(pic => {
        return {src:`https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`}
    });

          // {/**{this.state.photos ?
          // //   this.state.photos.map(pic => {
          // //      return <img alt="search result" src={`https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`}></img>
          // //   })
          // //   :
          // //   null
          // // }
        // **/}
        console.log('SET', Array.isArray(LIGHTBOX_IMAGE_SET))
        console.log('SET', LIGHTBOX_IMAGE_SET)
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

        <Lightbox
          images={LIGHTBOX_IMAGE_SET}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.closeLightbox}
        />
      </div>
    );
  }
}

export default PhotoView;
