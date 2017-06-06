import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';

//class PhotoView extends Component
// const PaginationAdvanced = React.createClass({
class PaginationTool extends Component {
    constructor(){
        super();
        this.state = {
            activePage: 1
        }
    };

  handleSelect = (eventKey) => {
    this.setState({
      activePage: eventKey
    });
  };

  render() {
      console.log('page state', this.state.activePage)
    return (
      <Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={20}
        maxButtons={5}
        activePage={this.state.activePage}
        onSelect={this.handleSelect} />
    );
  }
};

export default PaginationTool;
