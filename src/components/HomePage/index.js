import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Games from '../GamesPage/GamesBlock';
import NewsBlock from './news';
import Social from './social';
import { FaGlobe } from 'react-icons/fa';
import '../../styles/home.css';
import { FiList, FiImage } from "react-icons/fi";
import { fetchArt } from '../actions/artActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class HomePage extends Component {
  componentDidMount () {
    window.scrollTo(0,0);
    this.props.fetchArt();
  }
  render(){
  	const artItems = this.props.art.map((img, index) => 
			<div className="col-12 col-md-6 col-lg-3 mt-3 mb-3 text-center" style={{height: "200px", overflow: "hidden"}} key={index}>
        <img  
          className="art-block__image img-fluid shadow" 
          alt={img.text} 
          src={img.photo_604} key={index}/>
    		</div>
    ).slice(0,4)
    return (
    	<main>
        <NewsBlock />
        <section className="container text_card">
        	<div className="row">
        		<section className="col-12 col-lg-8">
        			<div className="bg-info p-3 text-center shadow mb-4 d-block w-100">
	  						ИГРЫ
	  					</div>
	            <Games />
	            <Link to="/games" className="text_card"><FiList size="1.5em"/> Все игры</Link>
        		</section>
        		<section className="col-12 col-lg-4">
        			<Link to="/streams">
				  			<figure className="w-100 text-white shadow mb-4">
				  				<div className="figure__block">
				  					<img src="https://pp.userapi.com/c846021/v846021388/10f4ea/4TMo1_2jp7A.jpg" alt="streams" className="img-fluid"/>
				  				</div>
				  				<figcaption className="bg-info p-3 text-center w-100">
				  					СТРИМЫ
				  				</figcaption>
				  			</figure>
			  			</Link>
			  			<Link to="/masters">
				  			<figure className="w-100 text-white shadow mb-4" >
				  				<div className="figure__block">
				  					<img src="https://pp.userapi.com/c840623/v840623180/3e1d8/lOYin3JrLgA.jpg" alt="masters" className="img-fluid"/>
				  				</div>
				  				<figcaption className="bg-info p-3 text-center w-100">
				  					МАСТЕРА
				  				</figcaption>
				  			</figure>
			  			</Link>
			  			<Link to="/library">
				  			<figure className="w-100 text-white shadow mb-4">
				  				<div className="figure__block">
				  					<img src="https://image-assets.access.myfave.gdn/attachments/9fb835d8ad0c30a9a0fd64b90329b22ca85b4448/store/fill/800/500/44f292f9c602af7a497a1beb01302417e08902fe2385f7e69e764f4fd223/The+Magic+Library-3.jpg" alt="library" className="img-fluid"/>
				  				</div>
				  				<figcaption className="bg-info p-3 text-center w-100">
				  					БИБЛИОТЕКА
				  				</figcaption>
				  			</figure>
			  			</Link>
			  			<Link to="/shop">
				  			<figure className="w-100 text-white shadow">
				  				<div className="figure__block">
				  					<img src="https://orig00.deviantart.net/60d4/f/2014/239/8/2/82c77da07b7ac9afdc58985ae99a1fd1-d7ww2hj.jpg" alt="shop" className="img-fluid"/>
				  				</div>
				  				<figcaption className="bg-info p-3 text-center w-100">
				  					МАГАЗИН
				  				</figcaption>
				  			</figure>
			  			</Link>
        		</section>
          </div>

          <h1>
            <FiImage size="1.5em"/> Фан-арт
          </h1>
          <Link to="/art">
	          <div className="row mb-4">
	           {artItems}
	          </div>
          </Link>

          <h1>
            <FaGlobe size="1.5em"/> В социальных сетях
          </h1>
          <Social />
        </section>
		  </main>
    )
  } 
}

HomePage.propTypes = {
  fetchArt: PropTypes.func,
  art: PropTypes.array
};

const mapStateToProps = state => ({
  art: state.art.items,
})

export default connect(mapStateToProps, { fetchArt })(HomePage);
