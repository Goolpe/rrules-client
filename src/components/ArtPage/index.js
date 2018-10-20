import React, { Component } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimesCircle } from "react-icons/fa";
import { FiImage } from "react-icons/fi";
import moment from 'moment';
import '../../styles/art.css';
import { fetchArt } from '../actions/artActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ArtPage extends Component{
 	constructor (props) {
    super(props)
    this.state = {
      bigPicture: false,
      selectedIndex: 0
    }
    this._TogglePrev = this._TogglePrev.bind(this);
    this._ToggleNext = this._ToggleNext.bind(this);
  }
  componentDidMount () {
    window.scrollTo(0,0);
    this.props.fetchArt();
  }

  _ToggleNext() {
    if(this.state.selectedIndex === this.props.art.length - 1)
      return;

    this.setState(prevState => ({
        selectedIndex: prevState.selectedIndex + 1
    }))
  }

  _TogglePrev() {
    if(this.state.selectedIndex === 0)
     return;

    this.setState(prevState => ({
        selectedIndex: prevState.selectedIndex - 1
    }))
  }

  render () {
    return (
      <main className="art">
        {this.state.bigPicture && 
        <section className="art__open-picture">
          <div className="row text-center text_card" style={{height: "100%"}}>
            <div className="col-2 col-md-4 d-flex align-items-center justify-content-center " style={{height: "100%", cursor: "pointer"}}  onClick={this._TogglePrev}>
              <button className="bg-transparent text-center text_card border-0 p-0"><FaChevronLeft size="3em" /></button>
            </div>
            <div className="col-8 col-md-4 d-flex align-items-center justify-content-center" style={{height: "100%", cursor: "pointer"}}>      
                <figure>
                  <img src={this.props.art[this.state.selectedIndex].photo_604} alt={this.props.art[this.state.selectedIndex].text} className="img-fluid"/>
                  <figcaption className="mt-2">{this.props.art[this.state.selectedIndex].text}</figcaption>
                </figure> 
            </div> 
            <div className="col-2 col-md-4 d-flex align-items-center justify-content-center"  style={{height: "100%", cursor: "pointer"}} onClick={this._ToggleNext}>
              <button className="bg-transparent text-center text_card border-0 p-0"><FaChevronRight size="3em" /></button> 
            </div>
            <button onClick={()=>{this.setState({bigPicture: false})}} className="fixed-top text-center text-white bg-transparent border-0 p-0" style={{top: "50px", left: "80%"}}><FaTimesCircle size="3em" /></button>
          </div>
        </section>
        }
        <section className="images">
          <h1 className="text_card">
            <FiImage size="1.5em"/> Фан-арт 
          </h1>
          <section className="image-block image-block--cards">
            {this.props.art.map((img, index) => 
              <figure className="image-block__card m-1" key={index}>
                <img  
                  className="card__image" 
                  alt={img.text} 
                  src={img.photo_604} />
                <figcaption className="card__caption" onClick={()=>{this.setState({ bigPicture: true, selectedIndex: index })}}>
                  <time className="card__date">{moment(img.date*1000).format('LL')}</time>
                  <p className="card__description">{img.text || "-"}</p>
                </figcaption>
              </figure>
            )}
          </section>
        </section>
      </main>
    )
  }
}

ArtPage.propTypes = {
  fetchArt: PropTypes.func,
  art: PropTypes.array
};

const mapStateToProps = state => ({
  art: state.art.items,
})

export default connect(mapStateToProps, { fetchArt })(ArtPage);
