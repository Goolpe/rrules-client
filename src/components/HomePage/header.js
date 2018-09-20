import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiLogOut, FiShoppingBag, FiBookOpen, FiUser, FiFileText, FiImage, FiEye, FiPlay } from "react-icons/fi";
import { FaHome } from 'react-icons/fa';
import { Badge,  UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { fetchPlayer } from '../actions/playerActions';
import { withRouter } from 'react-router-dom';
import { fetchMsgs } from '../actions/msgActions';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

class Header extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
    this.state = {
      isOpen: false
    };
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
	return (
        <Navbar className="bg-transparent">
          <NavbarBrand className="pl-5"><img src="../logo.png" style={{height:"50px"}} alt="ГЛАВНАЯ"/></NavbarBrand>
            <Nav className="ml-auto">
                {isAuthenticated ? 
                  <NavItem>
                    <NavLink tag={Link} to="/" onClick={this.onLogout.bind(this)}><FiLogOut size="2em"/> Выйти</NavLink>
                  </NavItem>
                  :
                  <NavItem>
                    <NavLink tag={Link} to="/auth"><FiLogIn size="2em"/> Авторизация</NavLink>
                  </NavItem>
                }
              
            </Nav>
        </Navbar>
            
	)
	}
}

Header.propTypes = {
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

export default connect(mapStateToProps, { fetchMsgs, fetchPlayer, logoutUser })(withRouter(Header));