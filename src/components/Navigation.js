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

const MQ = window.matchMedia( "(min-width: 767.98px)" );

class Navigation extends Component{
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      isOpen: false,
      active: this.props.location.pathname,
      nav:true,
      read: 0
    };
  }

  componentDidMount() {
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
    if(this.props.auth.isAuthenticated){
      this.props.fetchPlayer(this.props.auth.user.name, this.props.history)
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.location.pathname !== prevProps.location.pathname){
      this.setState({
        active: this.props.location.pathname
      })
    }
  }

  toggle() {
    if(!this.state.isOpen){
      document.getElementById('hr1').classList.add("hr3");
      document.getElementById('hr2').classList.add("collapse");
      document.getElementById('hr3').classList.add("hr1");
    }
    else{
      document.getElementById('hr1').classList.remove("hr3");
      document.getElementById('hr2').classList.remove("collapse");
      document.getElementById('hr3').classList.remove("hr1");
    }
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  closeNav(){
    document.getElementById('hr1').classList.remove("hr3");
    document.getElementById('hr2').classList.remove("collapse");
    document.getElementById('hr3').classList.remove("hr1");
    this.setState({
      isOpen: false
    });
  }

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

  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render(){
    const {isAuthenticated, user} = this.props.auth;
    return(
      <React.Fragment>
        <button className="navbar-toggler position-absolute" onClick={this.toggle}><hr id="hr1" /><hr id="hr2" /><hr id="hr3" /></button>
        {this.state.isOpen && <div id="Navigation" className="position-absolute">
          <div className="d-flex flex-column justify-content-between w-100" style={{height: "100%"}}>
            <ul className="text-center">
              {isAuthenticated ? 
              <React.Fragment>
                <Link to={`/@${user.name}`} id="TooltipUser" name="/@" onClick={this.handleClick}>
                  <li className={"pb-2 pt-2 " + (this.state.active.includes(user.name) ? "active" : "text-white")}>
                  <FiUser /><span className="collapse nav_link">{user.name}</span>
                  </li>
                </Link>
                <UncontrolledTooltip className="ml-2" placement="right" target="TooltipUser">
                  Профиль
                </UncontrolledTooltip>
                <Link to="/msgs" id="TooltipMsg" name="/msgs" onClick={this.handleClick}>
                  <li className={"pb-2 pt-2 " + (this.state.active === "/msgs" ? "active" : "text-white")}>
                    {this.state.read ? <Badge color="danger">{this.state.read}</Badge> : <FiMail />}<span className="collapse nav_link">Сообщения</span>
                  </li>
                </Link>
                <UncontrolledTooltip className="ml-2" placement="right" target="TooltipMsg">
                  {this.state.read === 1 ? "Новое сообщение" : this.state.read > 1 ? "Новые сообщения" : "Сообщения"}
                </UncontrolledTooltip>
              </React.Fragment>
              :
              <React.Fragment>
                <Link to="/auth" id="TooltipAuth" onClick={this.handleClick} name="/auth">
                  <li className={"pb-2 pt-2 " + (this.state.active === "/auth" ? "active" : "text-white")}>
                    <FiLogIn /><span className="collapse nav_link">Авторизация</span>
                  </li>
                </Link>
                <UncontrolledTooltip className="ml-2" placement="right" target="TooltipAuth">
                  Авторизация
                </UncontrolledTooltip>
              </React.Fragment>
            }
              <Link to="/" id="TooltipHome" onClick={this.handleClick} name="/">
                <li className={"pb-2 pt-2 " + (this.state.active === "/" ? "active" : "text-white")}>
                  <FaHome/><span className="collapse nav_link">Главная</span>
                </li>
              </Link>
              <UncontrolledTooltip className="ml-2" placement="right" target="TooltipHome">
                Главная
              </UncontrolledTooltip>
              <Link to="/about-project" id="TooltipAbout" onClick={this.handleClick} name="/about-project">
                <li className={"pb-2 pt-2 " + (this.state.active === "/about-project" ? "active" : "text-white")}>
                  <FiCode/><span className="collapse nav_link">О проекте</span>
                </li>
              </Link>
              <UncontrolledTooltip className="ml-2" placement="right" target="TooltipAbout">
                О проекте
              </UncontrolledTooltip>
              <Link to="/games" id="TooltipGames" onClick={this.handleClick} name="/game">
                <li className={"pb-2 pt-2 " + (this.state.active.includes("/game") ? "active" : "text-white")}>
                  <FiPlay/><span className="collapse nav_link">Игры</span>
                </li>
              </Link>
              <UncontrolledTooltip className="ml-2" placement="right" target="TooltipGames">
                Игры
              </UncontrolledTooltip>
              <Link to="/library" id="TooltipLibrary" onClick={this.handleClick} name="/library">
                <li className={"pb-2 pt-2 " + (this.state.active === "/library" ? "active" : "text-white")}>
                  <FiBookOpen/><span className="collapse nav_link">Библиотека</span>
                </li>
              </Link>
              <UncontrolledTooltip className="ml-2" placement="right" target="TooltipLibrary">
                Библиотека
              </UncontrolledTooltip>
              <Link to="/masters" id="TooltipMasters" onClick={this.handleClick} name="/masters">
                <li className={"pb-2 pt-2 " + (this.state.active === "/masters" || (this.state.active.includes("/@") && this.state.active.includes(!user.name)) ? "active" : "text-white")}>
                  <FiUsers/><span className="collapse nav_link">Мастера канала</span>
                </li>
              </Link>
              <UncontrolledTooltip className="ml-2" placement="right" target="TooltipMasters">
                Мастера канала
              </UncontrolledTooltip>
              <Link to="/articles" id="TooltipNews" onClick={this.handleClick} name="/article">
                <li className={"pb-2 pt-2 " + (this.state.active.includes("/article") ? "active" : "text-white")}>
                  <FiFileText/><span className="collapse nav_link">Новости</span>
                </li>
              </Link>
              <UncontrolledTooltip className="ml-2" placement="right" target="TooltipNews">
                Новости
              </UncontrolledTooltip>
              <Link to="/art" id="TooltipArt" onClick={this.handleClick} name="/art">
                <li className={"pb-2 pt-2 " + (this.state.active === "/art" ? "active" : "text-white")}>
                  <FiImage/><span className="collapse nav_link">Фан-арт</span>
                </li>
              </Link>
              <UncontrolledTooltip className="ml-2" placement="right" target="TooltipArt">
                Фан-арт
              </UncontrolledTooltip> 
              <Link to="/shop" id="TooltipShop" onClick={this.handleClick} name="/shop">
                <li className={"pb-2 pt-2 " + (this.state.active === "/shop" ? "active" : "text-white")}>
                  <FiShoppingBag/><span className="collapse nav_link">Магазин</span>
                </li>
              </Link>
              <UncontrolledTooltip className="ml-2" placement="right" target="TooltipShop">
                Магазин
              </UncontrolledTooltip>
              <Link to="/support" id="TooltipSupport" onClick={this.handleClick} name="/support">
                <li className={"pb-2 pt-2 " + (this.state.active === "/support" ? "active" : "text-white")}>
                  <FaHandsHelping/><span className="collapse nav_link">Поддержать проект</span>
                </li>
              </Link>
              <UncontrolledTooltip className="ml-2" placement="right" target="TooltipSupport">
                Поддержать проект
              </UncontrolledTooltip>
              <a className="btn bg-transparent border-0 text-white" onClick={this.handleToggle} id="TooltipNavToggle">{this.state.nav ? <FiChevronsLeft/> : <FiChevronsRight/>}</a>
              <UncontrolledTooltip className="ml-2" placement="right" target="TooltipNavToggle">
                {this.state.nav ? "Скрыть меню" : "Зафиксировать меню"}
              </UncontrolledTooltip>
            </ul>
          </div>
        </div>}
      </React.Fragment>
    )
  }
}

Navigation.propTypes = {
  fetchPlayer: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  fetchGames: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  games: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  player: state.player.item,
  games: state.games.items
})

export default connect(mapStateToProps, { fetchGames, fetchPlayer, logoutUser })(withRouter(Navigation));