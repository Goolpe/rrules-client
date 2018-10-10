import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import { FaChevronLeft, FaChevronRight, FaTimesCircle } from "react-icons/fa";
import { FiImage } from "react-icons/fi";
import moment from 'moment';
import '../style/art.css';

class ArtPage extends Component{
 	constructor (props) {
    super(props)
    this.state = {
      bigPicture: false,
      pictures: [],
      selectedIndex: 0
    }
    this._TogglePrev = this._TogglePrev.bind(this);
    this._ToggleNext = this._ToggleNext.bind(this);
  }
  componentDidMount () {
    window.scrollTo(0,0);

    fetchJsonp('https://api.vk.com/method/photos.get?owner_id=-117179920&album_id=246570102&access_token=0989ad1e0989ad1e0989ad1ead09ec15a7009890989ad1e52f0d8c1830196143cdb8f23&v=5.52')
      .then(
        res => res.json()
      )
      .then(json => {
        this.setState({pictures: json.response.items.reverse()});
      })
      .catch(err => {
        console.log(err)
      })
  }

  _ToggleNext() {
    if(this.state.selectedIndex === this.state.pictures.length - 1)
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
                  <img src={this.state.pictures[this.state.selectedIndex].photo_604} alt={this.state.pictures[this.state.selectedIndex].text} className="img-fluid"/>
                  <figcaption className="mt-2">{this.state.pictures[this.state.selectedIndex].text}</figcaption>
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
            {this.state.pictures.map((img, index) => 
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

export default ArtPage;
