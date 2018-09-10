import React, { Component } from 'react';
import { Card } from 'reactstrap';
import fetchJsonp from 'fetch-jsonp';
import LazyLoad from 'react-lazy-load';

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
      .then(res => res.json())
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
      <section id="artpage" style={{minHeight:"100vh"}}>
       {this.state.bigPicture && 
        <div className="blackBG" style={{marginTop: "-85px"}}>
          <div className="row text-center text-white" style={{height: "100%"}}>
            <div className="col-2 col-md-4 d-flex align-items-center justify-content-center " style={{height: "100%", cursor: "pointer"}}  onClick={this._TogglePrev}>
               <button className="fas fa-chevron-left fa-3x bg-transparent text-center text-white border-0 p-0"></button>
            </div>
            <div className="col-8 col-md-4 d-flex align-items-center justify-content-center" style={{height: "100%", cursor: "pointer"}}>    
                        
              <div className="row"> 
                <div className="col-12">
                  <img src={this.state.pictures[this.state.selectedIndex].photo_604} alt={this.state.pictures[this.state.selectedIndex].text} className="img-fluid"/>
                  <div onClick={()=>{this.setState({bigPicture: false})}} className="fixed-top fas fa-times-circle fa-4x text-center text-white bg-transparent border-0 p-0" style={{top: "50px", left: "60%"}}></div>
                </div>
                <div className="col-12">
                  <p className=" mt-2">{this.state.pictures[this.state.selectedIndex].text}</p>
                </div>
              </div>

            </div> 
            <div className="col-2 col-md-4 d-flex align-items-center justify-content-center"  style={{height: "100%", cursor: "pointer"}} onClick={this._ToggleNext}>
              <button className="fas fa-chevron-right fa-3x text-center text-white bg-transparent border-0 p-0"></button> 
            </div>
          </div>
        </div>}

        <h1 className="text-center pt-5 mb-5">ФАН-АРТ</h1>
        <div className="container">
          <div className="row">
            {this.state.pictures.map((img, index) => 
              <div className="col-12 col-md-6 col-lg-3" key={img.id}>
                <LazyLoad height={350}>
                <Card style = {{height: "300px"}}>
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
