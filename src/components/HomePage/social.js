import React from 'react';

function Social (){
    return (
		<section id="social" className="pt-5 pb-5" >
			<div className="container text-white text-center">
				<div className="row mt-3">
					<div className="col-12 col-md-6  mb-3">
						<h2>RANDOM RULES В СОЦСЕТЯХ:</h2> 
					</div>
					<div className="col-12 col-md-6">
						<a href="https://vk.com/rrules" target="_blank" rel="noopener noreferrer" data-toggle="tooltip" data-placement="bottom" title="Вконтакте" className="text-white"><i className="fab fa-vk fa-2x ml-2 mr-2" ></i></a>
						<a href="https://discordapp.com/invite/jPfXJ2s" data-toggle="tooltip" data-placement="bottom" title="Discord" target="_blank" rel="noopener noreferrer" className="text-white"><i className="fab fa-discord fa-2x  ml-2 mr-2"></i></a>
						<a href="https://www.youtube.com/randomrulez" data-toggle="tooltip" data-placement="bottom" title="Youtube" target="_blank" rel="noopener noreferrer" className="text-white"><i className="fab fa-youtube fa-2x ml-2 mr-2"></i></a>
						<a href="https://www.patreon.com/randomrules" data-toggle="tooltip" data-placement="bottom" title="Patreon" target="_blank" rel="noopener noreferrer" className="text-white"><i className="fab fa-patreon fa-2x ml-2 mr-2"></i></a>
						<a href="https://t.me/randomrules" data-toggle="tooltip" data-placement="bottom" title="Telegram" target="_blank" rel="noopener noreferrer" className="text-white"><i className="fab fa-telegram-plane fa-2x ml-2 mr-2"></i></a>
						<a href="https://www.twitch.tv/random_rules" data-toggle="tooltip" data-placement="bottom" title="Twitch" target="_blank" rel="noopener noreferrer" className="text-white"><i className="fab fa-twitch fa-2x ml-2 mr-2"></i></a>
					</div>
				</div>
			</div>
		</section>
    )
}

export default Social;
