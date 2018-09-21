import React, { Component } from 'react';
import { Card } from 'reactstrap';
import fetchJsonp from 'fetch-jsonp';
import LazyLoad from 'react-lazy-load';
import { FaChevronLeft, FaChevronRight, FaTimesCircle } from "react-icons/fa";
import { FiImage } from "react-icons/fi";

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
        res => res.json(),
        err => console.log(err)
      )
      .then(json => {
        this.setState({pictures: json.response.items.reverse()});
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
      <section id="artpage" className="p-0">
       {this.state.bigPicture && 
        <div className="blackBG" style={{zIndex: "999"}}>
          <div className="row text-center text-white" style={{height: "100%"}}>
            <div className="col-2 col-md-4 d-flex align-items-center justify-content-center " style={{height: "100%", cursor: "pointer"}}  onClick={this._TogglePrev}>
               <button className="bg-transparent text-center text-white border-0 p-0"><FaChevronLeft size="3em" /></button>
            </div>
            <div className="col-8 col-md-4 d-flex align-items-center justify-content-center" style={{height: "100%", cursor: "pointer"}}>    
                        
              <div className="row"> 
                <div className="col-12">
                  <img src={this.state.pictures[this.state.selectedIndex].photo_604} alt={this.state.pictures[this.state.selectedIndex].text} className="img-fluid"/>
                  <div onClick={()=>{this.setState({bigPicture: false})}} className="fixed-top text-center text-white bg-transparent border-0 p-0" style={{top: "50px", left: "60%"}}><FaTimesCircle size="3em" /></div>
                </div>
                <div className="col-12">
                  <p className=" mt-2">{this.state.pictures[this.state.selectedIndex].text}</p>
                </div>
              </div>

            </div> 
            <div className="col-2 col-md-4 d-flex align-items-center justify-content-center"  style={{height: "100%", cursor: "pointer"}} onClick={this._ToggleNext}>
              <button className="bg-transparent text-center text-white border-0 p-0"><FaChevronRight size="3em" /></button> 
            </div>
          </div>
        </div>}

        <div className="container pt-5 pb-5">
          <span className="text-white">
            <FiImage size="1.5em"/> Фан-арт 
          </span>
          <div className="row pt-5">
            {this.state.pictures.map((img, index) => 
              <div className="col-12 col-md-6 col-lg-3" key={img.id}>
                <LazyLoad height={350}>
                <Card className="shadow border-0" style={{height: "300px"}}>
                  <button onClick={()=>{
                  this.setState({ bigPicture: true, selectedIndex: index })}} className="text-center border-0" title={img.text}  style={{ height:"100%", backgroundPosition: "top", backgroundImage: `url(${img.photo_604})` }}></button>
                </Card>  
                </LazyLoad>         
              </div>
              

              )}
          </div>
           
        </div>
      </section>
    )
  }
}

export default ArtPage;
