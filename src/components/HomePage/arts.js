import React from 'react';
import {
  Link
} from 'react-router-dom';

function Arts (props){
	const artsMems = [{
		id:1,
		url: "https://pp.userapi.com/c846522/v846522612/2cc67/Tpri9nQ03dM.jpg",
		link: "/art",
		name: "АРТ"
	},
	{
		id:2,
		url: "https://pp.userapi.com/c841234/v841234068/248de/-NbfkIst47I.jpg",
		link: "/masters",
		name: "РЕЗЮМЕ МАСТЕРОВ"
	},
	{
		id:3,
		url: "https://pp.userapi.com/c844321/v844321415/d617/VvyY4yxfLQc.jpg",
		link: "/articles",
		name: "СТАТЬИ"
	},
	{
		id:4,
		url: "https://pp.userapi.com/c845421/v845421486/b4c46/KW2bbOiQsWY.jpg",
		link: "/streams",
		name: "СТРИМЫ"
	}]

	const arts = artsMems.map((thing) =>
		<div className="col-12 col-md-6 p-0" key={thing.id}>
			<Link to={thing.link} className="text-white">
			<div className="wrapper" style={ { backgroundImage: `url(${thing.url})` } }>
				<div className="card rounded-0 border-0" >
			  		<div className="card-body font-weight-bold pl-0">
				    	<h1 className="card-subtitle mt-5 mb-2 pl-3" style={{textShadow: 'black 0 0 5px'}}>{thing.name}</h1>
			  		</div>
				</div>
			</div>	
			</Link>
		</div>
		)
    return (
	    	<section id="arts">
	    		<div className="container-fluid text-white">
	    			<div className="row">
	    				{arts}
	    			</div>
	    		</div>
				
	    	</section>
    );
}

export default Arts;
