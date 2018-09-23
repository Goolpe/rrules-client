import React, { Component } from 'react';
import shop from "./shop.json"
import { FaShoppingBag } from "react-icons/fa";

class ShopPage extends Component {
	componentDidMount() {
	    window.scrollTo(0,0);
	  }
	 render(){
	const listItems = shop.map((thing) =>
		<div className="col-12 col-md-4 mb-4" key={thing.id}>
			<div className="bg_card text-center text_card border-0 shadow">
			  <img className="card-img-top" src={thing.picture} alt={thing.title} />
			  <i className="fas fa-external-link-alt text-dark position-absolute fa-2x" style={{top:"5%",left:"85%"}}></i>
			  <div className="card-body">
			    <h5 className="card-title">{thing.name}</h5>
			    <p>{thing.price}</p>
			    <a href={thing.url} target="_blank" className="btn btn-info pl-5 pr-5">Заказать</a>
			  </div>
			</div>
		</div>
	)
	return (
	<section id="shop">
			<div className="container">
				<span className="text_card">
		            <FaShoppingBag size="1.5em"/> Товары Random Rules
		        </span> 
				<div className="row pt-5">
					{listItems}
				</div>
			</div>
		</section>
	)
}
}

export default ShopPage;

