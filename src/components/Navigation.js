import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiUser, FiEye, FiMail } from "react-icons/fi";
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
    this.state = {
      isOpen: false
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
              <Link to={`/@${user.name}`} id="TooltipUser"><li className="pb-2 pt-2"><FiUser color="white" size="1.2em" /></li></Link>
              <UncontrolledTooltip className="ml-1" placement="right" target="TooltipUser">
                Профиль
              </UncontrolledTooltip>
            </React.Fragment>
            :
            <React.Fragment>
              <Link to="/auth" id="TooltipAuth"><li className="pb-2 pt-2" ><FiLogIn color="white" size="1.2em" /></li></Link>
              <UncontrolledTooltip className="ml-1" placement="right" target="TooltipAuth">
                Авторизация
              </UncontrolledTooltip>
            </React.Fragment>
          }
            <Link to="/" id="TooltipHome"><li className="pb-2 pt-2" ><FaHome color="white" size="1.2em"/></li></Link>
            <UncontrolledTooltip className="ml-1" placement="right" target="TooltipHome">
              Главная
            </UncontrolledTooltip>
            <Link to="/about" id="TooltipAbout"><li className="pb-2 pt-2"><FaBook color="white" size="1.2em"/></li></Link>
            <UncontrolledTooltip className="ml-1" placement="right" target="TooltipAbout">
                Библиотека
              </UncontrolledTooltip>
            <Link to="/works" id="TooltipPortfolio"><li className="pb-2 pt-2"><FiEye color="white" size="1.2em"/></li></Link>
            <UncontrolledTooltip className="ml-1" placement="right" target="TooltipPortfolio">
                  Portfolio
              </UncontrolledTooltip> 
              <Link to="/contacts" id="TooltipContacts"><li className="pb-2 pt-2"><FiMail color="white" size="1.2em"/></li></Link>
            <UncontrolledTooltip className="ml-1" placement="right" target="TooltipContacts">
                  Contacts
              </UncontrolledTooltip>
          </ul>
          <ul className="text-center">
            <a href="https://drive.google.com/file/d/19JZKoj07JXDcXXVxltXzKr5bAzXOhJ6R/view?usp=sharing" rel="noopener noreferrer" target="_blank"><li className="pb-2 pt-2" id="TooltipCV">CV</li></a>
            <UncontrolledTooltip className="ml-1" placement="right" target="TooltipCV">
                  Curriculum vitae
              </UncontrolledTooltip>
            <a href="https://github.com/goolpe" rel="noopener noreferrer" target="_blank"><li className="pb-2 pt-2" id="TooltipGithub"><FaGithubAlt color="white" size="1.2em"/></li></a>
            <UncontrolledTooltip className="ml-1" placement="right" target="TooltipGithub">
                  Github
              </UncontrolledTooltip>
            <a href="https://www.linkedin.com/in/goolpe" rel="noopener noreferrer" target="_blank"><li className="pb-2 pt-2" id="TooltipLinkedin"><FaLinkedinIn color="white" size="1.2em"/></li></a>
            <UncontrolledTooltip className="ml-1" placement="right" target="TooltipLinkedin">
                  Linkedin
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