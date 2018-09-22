import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { FaVk, FaDiscord, FaYoutube, FaPatreon, FaTelegram, FaTwitch } from "react-icons/fa";

function Social(){
    return (
		<div id="social" className="pt-3 pb-3">
			<div className="bg_card pt-5 pb-5 shadow">
				<a href="https://vk.com/rrules" target="_blank" rel="noopener noreferrer"><FaVk /> Вконтакте</a>
				<a href="https://discordapp.com/invite/jPfXJ2s" target="_blank" rel="noopener noreferrer"><FaDiscord /> Discord</a>
				<a href="https://www.youtube.com/randomrulez" target="_blank" rel="noopener noreferrer"><FaYoutube /> Youtube</a>
				<a href="https://www.patreon.com/randomrules" target="_blank" rel="noopener noreferrer"><FaPatreon /> Patreon</a>
				<a href="https://t.me/randomrules" target="_blank" rel="noopener noreferrer"><FaTelegram /> Telegram</a>
				<a href="https://www.twitch.tv/random_rules" target="_blank" rel="noopener noreferrer"><FaTwitch /> Twitch</a>
			</div>
		</div>
    )
}
export default Social;
