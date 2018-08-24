import React from 'react';
import shop from "./shop.json"

function ShopPage(props){
	  const listItems = shop.map((thing) =>
	    	<div className="col-12 col-md-4" key={thing.id}>
				<div className="card text-center">
				  <img className="card-img-top" src={thing.picture} alt={thing.title} />
				  <div className="card-body">
				    <h5 className="card-title">{thing.title}</h5>
				    <ul className="list-group list-group-flush">
					    <li className="list-group-item">{thing.price}</li>
					</ul>
					<br />
				    <a href="#home" className="btn btn-secondary">Заказать</a>
				  </div>
				</div>
			</div>
	  );
	  return (
    	<section id="merch">
	    		<div className="container pt-5 pb-5">
					<h1 className="text-dark text-center m-5">МЕРЧ RANDOM RULES</h1>
					<div className="row">
						{listItems}
					</div>
				</div>
	    	</section>
	  );
	}

export default ShopPage;

