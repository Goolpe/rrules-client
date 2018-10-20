import React from 'react';
import { FaVk, FaDiscord, FaYoutube, FaPatreon, FaTelegram, FaTwitch } from "react-icons/fa";

function Social(){
    return (
			<div className="social d-flex bg_card pt-3 pb-3 shadow justify-content-around flex-wrap">
				<a href="https://vk.com/rrules" className="social__link text_card" target="_blank" rel="noopener noreferrer"><FaVk /> Вконтакте</a>
				<a href="https://discordapp.com/invite/jPfXJ2s" className="social__link text_card" target="_blank" rel="noopener noreferrer"><FaDiscord /> Discord</a>
				<a href="https://www.youtube.com/randomrulez" className="social__link text_card" target="_blank" rel="noopener noreferrer"><FaYoutube /> Youtube</a>
				<a href="https://www.patreon.com/randomrules" className="social__link text_card" target="_blank" rel="noopener noreferrer"><FaPatreon /> Patreon</a>
				<a href="https://t.me/randomrules" className="social__link text_card" target="_blank" rel="noopener noreferrer"><FaTelegram /> Telegram</a>
				<a href="https://www.twitch.tv/random_rules" className="social__link text_card" target="_blank" rel="noopener noreferrer"><FaTwitch /> Twitch</a>
			</div>
    )
}
export default Social;
