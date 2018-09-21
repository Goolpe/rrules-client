import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { UncontrolledCollapse, CardBody, Card } from 'reactstrap';
import { FiCode } from "react-icons/fi";

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }
  componentDidMount() {
    window.scrollTo(0,0);
  }
  toggle(id) {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
    	<section id="aboutPage">
    		<div className="container">
	    		<span className="text-white">
		            <FiCode size="1.5em"/> О проекте 
		        </span>
	    		<button id="toggler1" className="bg_card btn shadow text-white p-4 mt-5 mb-3 w-100 text-left">
			      - Что такое настольные ролевые игры?
			    </button>
			    <UncontrolledCollapse toggler="#toggler1">
			      <Card>
			        <CardBody>
			         <p>Если вы хоть раз играли в компьютерные RPG, то без особых проблем поймете, что тут к чему. "Настолки" по сути являются прародителями RPG, такие игры как Baldurs Gate, Neverwinter Nights, Tides Of Numenera и пр. основаны на них. В роли компьютера выступает "Мастер". Этот человек рассказывает сюжет, описывает, что происходит вокруг игроков и выдает им "квесты". Остальные участники управляют своими игровыми персонажами, описывая их действия, успешность которых определяется бросками игральных кубиков по специальным системам.</p><br />

					<p>Если этого объяснения вам не достаточно - просто загуглите "настольные ролевые игры" и немного посмотрите наши стримы. Вскоре вы все поймете.</p><br />

					<p>Random Rules существует для того, чтобы любой желающий мог приобщиться к этому хобби. Мы даем возможность поиграть всем, вне зависимости от вашего местоположения, опыта и чего-либо еще.</p>
			        </CardBody>
			      </Card>
			    </UncontrolledCollapse><br />

	    		<button id="toggler2" className="bg_card btn shadow text-white p-4 mb-3 w-100 text-left">
			      - Когда проходят игры/стримы?
			    </button>
			    <UncontrolledCollapse toggler="#toggler2">
			      <Card>
			        <CardBody>
			         <p>Расписание можно найти в ссылках группы или в информации о канале на Twitch.</p>
			        </CardBody>
			      </Card>
			    </UncontrolledCollapse><br />

		        <button id="toggler3" className="bg_card btn shadow text-white p-4 mb-3 w-100 text-left">
			      - Как принять участие?
			    </button>
			    <UncontrolledCollapse toggler="#toggler3">
			      <Card>
			        <CardBody>
			         <p>Примерно раз в неделю у нас проходит игра OneShot - короткий сюжет на 3-4 часа. За пару дней до нее мы даем объявление группу и набираем несколько человек по заявкам на участие.</p><br />
					<p>Если вы не хотите ждать, надеясь, что именно вашу заявку одобрят, можете ознакомиться с этой темой и поучаствовать в платных играх:
					https://vk.com/topic-117179920_35947657</p><br />

					<p>На нашем канале в Discord также можно найти как игроков, так и мастеров. Просто зайдите в специальный чат - LFG.</p>
			        </CardBody>
			      </Card>
			    </UncontrolledCollapse><br />

		        <button id="toggler4" className="bg_card btn shadow text-white p-4 mb-3 w-100 text-left">
			      - Что нужно, чтобы играть?
			    </button>
			    <UncontrolledCollapse toggler="#toggler4">
			      <Card>
			        <CardBody>
			        	<ListGroup flush>
			         <ListGroupItem>1) Микрофон. Строго обязательно. Вся игра идет голосом.</ListGroupItem>
				        <ListGroupItem>2) Программа Discord и/или Skype. Голосовая конференция собирается именно там.</ListGroupItem>
				        <ListGroupItem>3) Регистрация на сайте https://roll20.net/ - это виртуальный стол, который мы используем для игры.</ListGroupItem>
				        <ListGroupItem>4) Необходимо ознакомиться с игровой системой. Книги по D&D прикреплены к этому посту. "Книга правил" - минимальные знания, необходимые для игры. "Книга игрока" - полные правила. Учтите, что мы изменяем часть правил под сеттинги (особенно магию).</ListGroupItem>
				        <ListGroupItem>5) По желанию вы можете использовать веб-камеру. Ее наличие не обязательно.</ListGroupItem>
				        </ListGroup>
			        </CardBody>
			      </Card>
			    </UncontrolledCollapse>
			</div>
		</section>
    );
}
}

export default AboutPage;
