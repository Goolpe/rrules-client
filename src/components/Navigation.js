import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiShoppingBag, FiChevronsLeft, FiMail, FiChevronsRight, FiBookOpen,FiUsers, FiUser, FiFileText, FiImage, FiCode, FiPlay } from "react-icons/fi";
import { FaHome, FaHandsHelping } from 'react-icons/fa';
import { Badge,  UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from './actions/authActions';
import { fetchPlayer } from './actions/playerActions';
import { withRouter } from 'react-router-dom';
import { fetchGames } from './actions/gameActions';
import './style/navigation.css';

const MQ = window.matchMedia( "(min-width: 767.98px)" );


class Navigation extends Component{
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.getById = this.getById.bind(this);
    this.state = {
      isOpen: false,
      active: this.props.location.pathname,
      nav:true,
      read: 0
    };
  }

  componentDidMount() {

//checking media query and navigation
    if(MQ.matches){
      this.setState({
        isOpen: true
      })
    }
    else{
      this.setState({
        isOpen: false
      })
    }

// checking user
    if(this.props.auth.isAuthenticated){
      this.props.fetchPlayer(this.props.auth.user.name, this.props.history)
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.location.pathname !== prevProps.location.pathname){
      this.setState({
        active: this.props.location.pathname
      })
    }
  }

  getById(value){
    return document.getElementById(value).classList
  }

//handling navigation toggle in media query
  toggle() {
    if(!this.state.isOpen){
      this.getById('hr1').add("hr3");
      this.getById('hr1').add("position-absolute");
      this.getById('hr2').add("collapse");
      this.getById('hr3').add("hr1");
      this.getById('hr3').add("position-absolute");
      this.getById('Navigation').remove("close_nav");
      this.getById('Navigation').add("open_nav");
    }
    else{
      this.getById('hr1').remove("hr3");
      this.getById('hr1').remove("position-absolute");
      this.getById('hr2').remove("collapse");
      this.getById('hr3').remove("hr1");
      this.getById('hr3').remove("position-absolute");
      this.getById('Navigation').add("close_nav");
      this.getById('Navigation').remove("open_nav");
      
    }
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

//handling every link in nav
  handleClick(e){
    if(!MQ.matches){
      this.toggle();
      this.setState({
        isOpen: false
      })
    }
    this.setState({
      active: e.target.name
    })
  }

//handling fixed nav toggle
  handleToggle(){
    if(!this.state.nav){
      document.getElementById("Navigation").style.marginLeft = "0"; 
    }
    else{
      document.getElementById("Navigation").style.marginLeft = "-35px";
    }
    this.setState({
      nav: !this.state.nav
    })
  }

// handling logout button
  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render(){
    const {isAuthenticated, user} = this.props.auth;
    return(
      <React.Fragment>
        <button className="navbar-toggler position-absolute" onClick={this.toggle}><hr id="hr1" /><hr id="hr2" /><hr id="hr3" /></button>
        <div id="Navigation" className="navigation close_nav">
          <nav className="navigation__nav">
              {isAuthenticated ? 
              <React.Fragment>
                <Link to={`/@${user.name}`} id="TooltipUser" name="/@" onClick={this.handleClick} className={"navigation__link " + (this.state.active.includes(user.name) ? "navigation__link--active" : "text-white")}>
                  <FiUser /><span className="collapse link__text">{user.name}</span>
                </Link>
                <UncontrolledTooltip className="ml-2" placement="right" target="TooltipUser">
                  Профиль
                </UncontrolledTooltip>
                <Link to="/msgs" id="TooltipMsg" name="/msgs" onClick={this.handleClick} className={"navigation__link " + (this.state.active === "/msgs" ? "navigation__link--active" : "text-white")}>
                    {this.state.read ? <Badge color="danger">{this.state.read}</Badge> : <FiMail />}<span className="collapse link__text">Сообщения</span>
                </Link>
                <UncontrolledTooltip className="ml-2" placement="right" target="TooltipMsg">
                  {this.state.read === 1 ? "Новое сообщение" : this.state.read > 1 ? "Новые сообщения" : "Сообщения"}
                </UncontrolledTooltip>
              </React.Fragment>
              :
              <React.Fragment>
                <Link to="/auth" id="TooltipAuth" onClick={this.handleClick} name="/auth" className={"navigation__link " + (this.state.active === "/auth" ? "navigation__link--active" : "text-white")}>
                  <FiLogIn /><span className="collapse link__text">Авторизация</span>
                </Link>
                <UncontrolledTooltip className="ml-2" placement="right" target="TooltipAuth">
                  Авторизация
                </UncontrolledTooltip>
              </React.Fragment>
            }
              <Link to="/" id="TooltipHome" onClick={this.handleClick} name="/" className={"navigation__link " + (this.state.active === "/" ? "navigation__link--active" : "text-white")}>
                <FaHome/><span className="collapse link__text">Главная</span>
              </Link>
              <UncontrolledTooltip className="ml-2" placement="right" target="TooltipHome">
                Главная
              </UncontrolledTooltip>
              <Link to="/about-project" id="TooltipAbout" onClick={this.handleClick} name="/about-project" className={"navigation__link " + (this.state.active === "/about-project" ? "navigation__link--active" : "text-white")}>
                <FiCode/><span className="collapse link__text">О проекте</span>
              </Link>
              <UncontrolledTooltip className="ml-2" placement="right" target="TooltipAbout">
                О проекте
              </UncontrolledTooltip>
              <Link to="/games" id="TooltipGames" onClick={this.handleClick} name="/game" className={"navigation__link " + (this.state.active.includes("/game") ? "navigation__link--active" : "text-white")}>
                <FiPlay/><span className="collapse link__text">Игры</span>
              </Link>
              <UncontrolledTooltip className="ml-2" placement="right" target="TooltipGames">
                Игры
              </UncontrolledTooltip>
              <Link to="/library" id="TooltipLibrary" onClick={this.handleClick} name="/library" className={"navigation__link " + (this.state.active === "/library" ? "navigation__link--active" : "text-white")}>
                <FiBookOpen/><span className="collapse link__text">Библиотека</span>
              </Link>
              <UncontrolledTooltip className="ml-2" placement="right" target="TooltipLibrary">
                Библиотека
              </UncontrolledTooltip>
              <Link to="/masters" id="TooltipMasters" onClick={this.handleClick} name="/masters" className={"navigation__link " + (this.state.active === "/masters" || (this.state.active.includes("/@") && this.state.active.includes(!user.name)) ? "navigation__link--active" : "text-white")}>
                <FiUsers/><span className="collapse link__text">Мастера канала</span>
              </Link>
              <UncontrolledTooltip className="ml-2" placement="right" target="TooltipMasters">
                Мастера канала
              </UncontrolledTooltip>
              <Link to="/articles" id="TooltipNews" onClick={this.handleClick} name="/article" className={"navigation__link " + (this.state.active.includes("/article") ? "navigation__link--active" : "text-white")}>
                <FiFileText/><span className="collapse link__text">Новости</span>
              </Link>
              <UncontrolledTooltip className="ml-2" placement="right" target="TooltipNews">
                Новости
              </UncontrolledTooltip>
              <Link to="/art" id="TooltipArt" onClick={this.handleClick} name="/art" className={"navigation__link " + (this.state.active === "/art" ? "navigation__link--active" : "text-white")}>
                <FiImage/><span className="collapse link__text">Фан-арт</span>
              </Link>
              <UncontrolledTooltip className="ml-2" placement="right" target="TooltipArt">
                Фан-арт
              </UncontrolledTooltip> 
              <Link to="/shop" id="TooltipShop" onClick={this.handleClick} name="/shop" className={"navigation__link " + (this.state.active === "/shop" ? "navigation__link--active" : "text-white")}>
                <FiShoppingBag/><span className="collapse link__text">Магазин</span>
              </Link>
              <UncontrolledTooltip className="ml-2" placement="right" target="TooltipShop">
                Магазин
              </UncontrolledTooltip>
              <Link to="/support" id="TooltipSupport" onClick={this.handleClick} name="/support" className={"navigation__link " + (this.state.active === "/support" ? "navigation__link--active" : "text-white")}>
                <FaHandsHelping/><span className="collapse link__text">Поддержать проект</span>
              </Link>
              <UncontrolledTooltip className="ml-2" placement="right" target="TooltipSupport">
                Поддержать проект
              </UncontrolledTooltip>
              <a className="btn bg-transparent border-0 text-white" onClick={this.handleToggle} id="TooltipNavToggle">{this.state.nav ? <FiChevronsLeft/> : <FiChevronsRight/>}</a>
              <UncontrolledTooltip className="ml-2" placement="right" target="TooltipNavToggle">
                {this.state.nav ? "Скрыть меню" : "Зафиксировать меню"}
              </UncontrolledTooltip>
          </nav>
        </div>
      </React.Fragment>
    )
  }
}

Navigation.propTypes = {
  fetchPlayer: PropTypes.func,
  player: PropTypes.object,
  fetchGames: PropTypes.func,
  logoutUser: PropTypes.func,
  auth: PropTypes.object,
  games: PropTypes.array
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  player: state.player.item,
  games: state.games.items
})

export default connect(mapStateToProps, { fetchGames, fetchPlayer, logoutUser })(withRouter(Navigation));