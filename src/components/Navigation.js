import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiShoppingBag, FiBookOpen, FiUser, FiFileText, FiImage, FiEye, FiPlay, FiMail } from "react-icons/fi";
import { FaHome, FaBook, FaGithubAlt, FaLinkedinIn } from 'react-icons/fa';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Badge,
  DropdownItem,
  UncontrolledTooltip } from 'reactstrap';
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
    this.state = {
      isOpen: false,
      active: "home"
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
        read: nextProps.msgs.filter(msg => msg.read === false && msg.receiver === this.props.auth.user.name).length
      })
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
        this.props.auth.isAuthenticated &&
        this.props.fetchMsgs(this.props.auth.user.playerId)
      }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentWillMount(){
    if(this.props.auth.isAuthenticated){
      this.props.fetchMsgs(this.props.auth.user.playerId)
      this.props.fetchPlayer(this.props.auth.user.name, this.props.history)
    }
  }

  handleClick(e){
    this.setState({
      active: e.target.id
    })
    console.log(e.target)
  }

  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render(){
    const {isAuthenticated, user} = this.props.auth;
    return(
      <div id="Navigation" className="position-absolute">
        <div className="d-flex flex-column justify-content-between" style={{height: "100%"}}>
          <ul className="text-center">
            {isAuthenticated ? 
            <React.Fragment>
              <Link to={`/@${user.name}`} id="TooltipUser" onClick={this.handleClick}><li className={this.state.active === "TooltipUser" ? "pb-2 pt-2 active" : "pb-2 pt-2 text-white"}>{this.state.read ? <Badge color="danger" className="ml-2" >{this.state.read}</Badge> : <FiUser />}</li></Link>
              <UncontrolledTooltip className="ml-1" placement="right" target="TooltipUser">
                Профиль
              </UncontrolledTooltip>
            </React.Fragment>
            :
            <React.Fragment>
              <Link to="/auth" id="TooltipAuth" onClick={this.handleClick}><li className={this.state.active === "TooltipAuth" ? "pb-2 pt-2 active" : "pb-2 pt-2 text-white"}><FiLogIn /></li></Link>
              <UncontrolledTooltip className="ml-1" placement="right" target="TooltipAuth">
                Авторизация
              </UncontrolledTooltip>
            </React.Fragment>
          }
            <Link to="/" id="TooltipHome" onClick={this.handleClick}><li className={this.state.active === "TooltipHome" ? "pb-2 pt-2 active" : "pb-2 pt-2 text-white"} ><FaHome/></li></Link>
            <UncontrolledTooltip className="ml-1" placement="right" target="TooltipHome">
              Главная
            </UncontrolledTooltip>
            <Link to="/about-project" id="TooltipAbout" onClick={this.handleClick}><li className={this.state.active === "TooltipAbout" ? "pb-2 pt-2 active" : "pb-2 pt-2 text-white"}><FiEye/></li></Link>
            <UncontrolledTooltip className="ml-1" placement="right" target="TooltipAbout">
              О проекте
            </UncontrolledTooltip>
            <Link to="/games" id="TooltipGames" onClick={this.handleClick}><li className={this.state.active === "TooltipGames" ? "pb-2 pt-2 active" : "pb-2 pt-2 text-white"}><FiPlay/></li></Link>
            <UncontrolledTooltip className="ml-1" placement="right" target="TooltipGames">
              Игры
            </UncontrolledTooltip>
            <Link to="/library" id="TooltipLibrary" onClick={this.handleClick}><li className={this.state.active === "TooltipLibrary" ? "pb-2 pt-2 active" : "pb-2 pt-2 text-white"}><FiBookOpen/></li></Link>
            <UncontrolledTooltip className="ml-1" placement="right" target="TooltipLibrary">
              Библиотека
            </UncontrolledTooltip>
            <Link to="/articles" id="TooltipNews" onClick={this.handleClick}><li className={this.state.active === "TooltipNews" ? "pb-2 pt-2 active" : "pb-2 pt-2 text-white"}><FiFileText/></li></Link>
            <UncontrolledTooltip className="ml-1" placement="right" target="TooltipNews">
              Новости
            </UncontrolledTooltip>
            <Link to="/art" id="TooltipArt" onClick={this.handleClick}><li className={this.state.active === "TooltipArt" ? "pb-2 pt-2 active" : "pb-2 pt-2 text-white"}><FiImage/></li></Link>
            <UncontrolledTooltip className="ml-1" placement="right" target="TooltipArt">
              Фан-арт
            </UncontrolledTooltip> 
            <Link to="/shop" id="TooltipShop" onClick={this.handleClick}><li className={this.state.active === "TooltipShop" ? "pb-2 pt-2 active" : "pb-2 pt-2 text-white"}><FiShoppingBag/></li></Link>
            <UncontrolledTooltip className="ml-1" placement="right" target="TooltipShop">
              Магазин
            </UncontrolledTooltip>
          </ul>
        </div>
      </div>
      
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