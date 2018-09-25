import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiShoppingBag, FiChevronsLeft, FiChevronsRight, FiBookOpen,FiUsers, FiUser, FiFileText, FiImage, FiCode, FiPlay } from "react-icons/fi";
import { FaHome, FaHandsHelping } from 'react-icons/fa';
import { Badge,  UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from './actions/authActions';
import { fetchPlayer } from './actions/playerActions';
import { withRouter } from 'react-router-dom';
import { fetchMsgs } from './actions/msgActions';

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

  componentWillReceiveProps(nextProps){
    if(this.props.auth.isAuthenticated && this.props.msgs !== nextProps.msgs){
      this.setState({
        read: this.props.msgs.filter(msg => msg.receiver === this.props.auth.user.player && msg.messages.find(msg => msg.read === false)).length
      })        
    }
    if(this.props.location.pathname !== nextProps.location.pathname){
      this.setState({
        active: nextProps.location.pathname
      })
    }
  }

  componentDidMount() {
    // this.interval = setInterval(() => {
    //     this.props.auth.isAuthenticated &&
    //     this.props.fetchMsgs(this.props.auth.user.player)
    //   }, 1000);
    if(this.props.auth.isAuthenticated){
      this.props.fetchMsgs(this.props.auth.user.player)
      this.props.fetchPlayer(this.props.auth.user.name, this.props.history)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleClick(e){
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
      <div id="Navigation" className="position-absolute">
        <div className="d-flex flex-column justify-content-between w-100" style={{height: "100%"}}>
          <ul className="text-center">
            {isAuthenticated ? 
            <React.Fragment>
              <Link to={`/@${user.name}`} id="TooltipUser" name="/@" onClick={this.handleClick}><li className={this.state.active.includes(user.name) ? "pb-2 pt-2 active" : "pb-2 pt-2 text-white"}>{this.state.read ? <Badge color="danger">{this.state.read}</Badge> : <FiUser />}</li></Link>
              <UncontrolledTooltip className="ml-2" placement="right" target="TooltipUser">
                {this.state.read ? "Новые сообщения" : "Профиль"}
              </UncontrolledTooltip>
            </React.Fragment>
            :
            <React.Fragment>
              <Link to="/auth" id="TooltipAuth" onClick={this.handleClick} name="/auth"><li className={this.state.active === "/auth" ? "pb-2 pt-2 active" : "pb-2 pt-2 text-white"}><FiLogIn /></li></Link>
              <UncontrolledTooltip className="ml-2" placement="right" target="TooltipAuth">
                Авторизация
              </UncontrolledTooltip>
            </React.Fragment>
          }
            <Link to="/" id="TooltipHome" onClick={this.handleClick} name="/"><li className={this.state.active === "/" ? "pb-2 pt-2 active" : "pb-2 pt-2 text-white"} ><FaHome/></li></Link>
            <UncontrolledTooltip className="ml-2" placement="right" target="TooltipHome">
              Главная
            </UncontrolledTooltip>
            <Link to="/about-project" id="TooltipAbout" onClick={this.handleClick} name="/about-project"><li className={this.state.active === "/about-project" ? "pb-2 pt-2 active" : "pb-2 pt-2 text-white"}><FiCode/></li></Link>
            <UncontrolledTooltip className="ml-2" placement="right" target="TooltipAbout">
              О проекте
            </UncontrolledTooltip>
            <Link to="/games" id="TooltipGames" onClick={this.handleClick} name="/game"><li className={this.state.active.includes("/game") ? "pb-2 pt-2 active" : "pb-2 pt-2 text-white"}><FiPlay/></li></Link>
            <UncontrolledTooltip className="ml-2" placement="right" target="TooltipGames">
              Игры
            </UncontrolledTooltip>
            <Link to="/library" id="TooltipLibrary" onClick={this.handleClick} name="/library"><li className={this.state.active === "/library" ? "pb-2 pt-2 active" : "pb-2 pt-2 text-white"}><FiBookOpen/></li></Link>
            <UncontrolledTooltip className="ml-2" placement="right" target="TooltipLibrary">
              Библиотека
            </UncontrolledTooltip>
            <Link to="/masters" id="TooltipMasters" onClick={this.handleClick} name="/masters"><li className={this.state.active === "/masters" || (this.state.active.includes("/@") && this.state.active.includes(!user.name)) ? "pb-2 pt-2 active" : "pb-2 pt-2 text-white"}><FiUsers/></li></Link>
            <UncontrolledTooltip className="ml-2" placement="right" target="TooltipMasters">
              Мастера канала
            </UncontrolledTooltip>
            <Link to="/articles" id="TooltipNews" onClick={this.handleClick} name="/article"><li className={this.state.active.includes("/article") ? "pb-2 pt-2 active" : "pb-2 pt-2 text-white"}><FiFileText/></li></Link>
            <UncontrolledTooltip className="ml-2" placement="right" target="TooltipNews">
              Новости
            </UncontrolledTooltip>
            <Link to="/art" id="TooltipArt" onClick={this.handleClick} name="/art"><li className={this.state.active === "/art" ? "pb-2 pt-2 active" : "pb-2 pt-2 text-white"}><FiImage/></li></Link>
            <UncontrolledTooltip className="ml-2" placement="right" target="TooltipArt">
              Фан-арт
            </UncontrolledTooltip> 
            <Link to="/shop" id="TooltipShop" onClick={this.handleClick} name="/shop"><li className={this.state.active === "/shop" ? "pb-2 pt-2 active" : "pb-2 pt-2 text-white"}><FiShoppingBag/></li></Link>
            <UncontrolledTooltip className="ml-2" placement="right" target="TooltipShop">
              Магазин
            </UncontrolledTooltip>
            <Link to="/support" id="TooltipSupport" onClick={this.handleClick} name="/support"><li className={this.state.active === "/support" ? "pb-2 pt-2 active" : "pb-2 pt-2 text-white"}><FaHandsHelping/></li></Link>
            <UncontrolledTooltip className="ml-2" placement="right" target="TooltipSupport">
              Поддержать проект
            </UncontrolledTooltip>
            <a className="btn bg-transparent border-0 text-white" onClick={this.handleToggle} id="TooltipNavToggle">{this.state.nav ? <FiChevronsLeft/> : <FiChevronsRight/>}</a>
            <UncontrolledTooltip className="ml-2" placement="right" target="TooltipNavToggle">
              {this.state.nav ? "Скрыть меню" : "Зафиксировать меню"}
            </UncontrolledTooltip>
          </ul>

        </div>
      </div>
      </React.Fragment>
    )
  }
}
Navigation.propTypes = {
  fetchPlayer: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  fetchMsgs: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  msgs: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  player: state.player.item,
  msgs: state.msgs.items
})

export default connect(mapStateToProps, { fetchMsgs, fetchPlayer, logoutUser })(withRouter(Navigation));