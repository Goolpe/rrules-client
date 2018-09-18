import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { FaVk, FaDiscord, FaYoutube, FaPatreon, FaTelegram, FaTwitch } from "react-icons/fa";

function Social(){
    return (
		<section id="social" className="pt-5 pb-5" >
			<div className="container text-white text-center">
				<h2>RANDOM RULES В СОЦСЕТЯХ:</h2><br/>
				<a href="https://vk.com/rrules" id="vkBtn" target="_blank" rel="noopener noreferrer" className="text-white"><FaVk size="4em" /></a>
			    <UncontrolledTooltip placement="bottom" className="mt-4" target="vkBtn">
			        Вконтакте
			    </UncontrolledTooltip>
				<a href="https://discordapp.com/invite/jPfXJ2s" id="discordBtn" target="_blank" rel="noopener noreferrer" className="text-white"><FaDiscord size="4em" /></a>
				<UncontrolledTooltip placement="bottom" className="mt-4" target="discordBtn">
			        Discord
			    </UncontrolledTooltip>
				<a href="https://www.youtube.com/randomrulez" id="youtubeBtn" target="_blank" rel="noopener noreferrer" className="text-white"><FaYoutube size="4em" /></a>
				<UncontrolledTooltip placement="bottom" className="mt-4" target="youtubeBtn">
			        Youtube
			    </UncontrolledTooltip>
				<a href="https://www.patreon.com/randomrules" id="patreonBtn" target="_blank" rel="noopener noreferrer" className="text-white"><FaPatreon size="4em" /></a>
				<UncontrolledTooltip placement="bottom" className="mt-4" target="patreonBtn">
			        Patreon
			    </UncontrolledTooltip>
				<a href="https://t.me/randomrules" id="telegramBtn" target="_blank" rel="noopener noreferrer" className="text-white"><FaTelegram size="4em" /></a>
				<UncontrolledTooltip placement="bottom" className="mt-4" target="telegramBtn">
			        Telegram
			    </UncontrolledTooltip>
				<a href="https://www.twitch.tv/random_rules" id="twitchBtn" target="_blank" rel="noopener noreferrer" className="text-white"><FaTwitch size="4em" /></a>
				<UncontrolledTooltip placement="bottom" className="mt-4" target="twitchBtn">
			        Twitch
			    </UncontrolledTooltip>
			</div>
		</section>
    )
}
export default Social;
