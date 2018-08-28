import React from 'react';
import ShopPage from '../ShopPage';
import { Link } from 'react-router-dom';

function Merch(props){
    return (
    	<section id="merch" >
    		<ShopPage />
    		<div className="container mt-2 pb-5 text-center">
    			<Link to='/shop' className="btn btn-secondary p-3">ПЕРЕЙТИ В МАГАЗИН</Link>
    		</div>
    	</section>
    )
}

export default Merch;
