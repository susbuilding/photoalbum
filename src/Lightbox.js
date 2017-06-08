import React, { Component } from 'react';
import Lightbox from 'react-images';
import { Image } from 'react-bootstrap';

class LightboxView extends Component {
    constructor(props){
        super(props);
        this.state = {
            lightboxIsOpen: false,
            currentImage: 0,
            showThumbnails: true,
        };

        this.closeLightbox = this.closeLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.gotoImage = this.gotoImage.bind(this);
        this.handleClickImage = this.handleClickImage.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
    }

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

    renderGallery () {
        const images = this.props.photos;

        if (!images) return;

        const gallery = images.map((obj, i) =>
        {
            return (
                <a
                    href={obj.src}
                    key={i}
                    onClick={(e) => this.openLightbox(i, e)}
                >
                    <Image src={`https://farm${obj.farm}.staticflickr.com/${obj.server}/${obj.id}_${obj.secret}.jpg`} thumbnail />
                </a>
            )
        });

        return (
            <div>
                {gallery}
            </div>
        );
    }

    render() {
        return(
            <div>
                <div className="row">
                    <div className="col-xs">
                        <div className="box">
                            {this.renderGallery()}
                        </div>
                    </div>
                </div>
                <Lightbox
                    images={this.props.images}
                    currentImage={this.state.currentImage}
                    isOpen={this.state.lightboxIsOpen}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    onClose={this.closeLightbox}
                    showThumbnails={this.state.showThumbnails}
                    onClickThumbnail={this.gotoImage}
                />
            </div>
        );
    }
};

export default LightboxView;
