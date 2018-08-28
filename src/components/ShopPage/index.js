import React, { Component } from 'react';
import shop from "./shop.json"


class ShopPage extends Component {
	componentDidMount() {
	    window.scrollTo(0,0);
	  }
	 render(){
	const listItems = shop.map((thing) =>
		<div className="col-12 col-md-4" key={thing.id}>
			<div className="card text-center border-0 shadow-sm ">
			  <img className="card-img-top" src={thing.picture} alt={thing.title} />
			  <i className="fas fa-external-link-alt text-dark position-absolute fa-2x" style={{top:"5%",left:"85%"}}></i>
			  <div className="card-body">
			    <h5 className="card-title">{thing.title}</h5>
			    <ul className="list-group list-group-flush">
				    <li className="list-group-item">{thing.price}</li>
				</ul>
				<br />
			    <a href={thing.url} target="_blank" className="btn btn-info pl-5 pr-5">Заказать</a>
			  </div>
			</div>
		</div>
	)
	return (
	<section id="shop">
			<div className="container pt-5 pb-5">
				<h1 className="text-dark text-center mb-5">ТОВАРЫ RANDOM RULES</h1>
				<div className="row">
					{listItems}
				</div>
			</div>
		</section>
	)
}
}

export default ShopPage;

