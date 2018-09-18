import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiUser } from "react-icons/fi";
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
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  closeNav(){
    this.setState({
      isOpen: false
    });
  }

  componentWillReceiveProps(nextProps){
    if(this.props.auth.isAuthenticated){
      this.setState({
        read: nextProps.msgs.filter(msg=> msg.read === false && msg.receiver === this.props.auth.user.playerId).length
      })
    }
  }

  componentWillMount(){
    if(this.props.auth.isAuthenticated){
      console.log(this.props.auth.user.playerId)
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
      <Navbar color="info" className="shadow" light expand="lg">
        <div className="container">
          <NavbarBrand tag={Link} onClick={this.closeNav} to="/" className="navbar-brand"><img src="../logo.png" style={{height:"50px"}} alt="ГЛАВНАЯ"/></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} onClick={this.closeNav} to="/" className="bg-transparent border-0 nav-link text-white btn btn-link">ГЛАВНАЯ</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="text-white btn btn-link" nav caret>МЕНЮ</DropdownToggle>
                <DropdownMenu  className="p-0">
                <DropdownItem tag={Link} onClick={this.closeNav} to="/about-project" className="p-2 rounded-top">О ПРОЕКТЕ</DropdownItem> 
                  <DropdownItem tag={Link} onClick={this.closeNav} to="/library" className="p-2 rounded-top">БИБЛИОТЕКА</DropdownItem> 
                  <DropdownItem tag={Link} onClick={this.closeNav} to="/masters" className="p-2">МАСТЕРА КАНАЛА</DropdownItem>
                  <DropdownItem tag={Link} onClick={this.closeNav} to="/art" className="p-2">ФАН-АРТ</DropdownItem>
                  <DropdownItem tag={Link} onClick={this.closeNav} to="/support" className="p-2 rounded-bottom">ПОДДЕРЖАТЬ ПРОЕКТ</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink tag={Link} onClick={this.closeNav} to="/streams" className="nav-link text-white btn btn-link">СТРИМЫ</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} onClick={this.closeNav} to="/articles" className="nav-link text-white btn btn-link">НОВОСТИ</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} onClick={this.closeNav} to="/shop" className="nav-link text-white btn btn-link">МАГАЗИН</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} onClick={this.closeNav} to="/games" className="nav-link text-white btn btn-danger rounded">НАЙТИ ИГРУ</NavLink>
             </NavItem>
              {isAuthenticated ?
              <UncontrolledDropdown nav inNavbar className="keyAuth">
                 
                <DropdownToggle className="text-white ml-2 p-0" style={{height:"40px"}} nav>   
                    {this.props.player.photo ? <img src={this.props.player.photo} alt="avatar" className="img-fluid rounded bg-white position-relative" style={{height:"100%", width:"30px"}}/>
                    : <FiUser size="2em" />}
                    <Badge color="danger" className="position-absolute" style={{top: -5,left:30}}>{this.state.read}</Badge>
                </DropdownToggle>
                
                <DropdownMenu  className="p-0">
                {isAuthenticated &&
                  <span>
                    <DropdownItem tag={Link} onClick={this.closeNav} to={`/@${user.name}`} className="p-2 rounded-top">Мой профиль</DropdownItem>
                    <DropdownItem tag={Link} onClick={this.closeNav} to={`/edit/@${user.name}`} className="p-2 rounded-top">Настройки</DropdownItem>
                    <DropdownItem tag={Link} onClick={this.closeNav} to="/messages" className="p-2 rounded-top">Сообщения
                      <Badge color="danger" className="ml-2">{this.state.read}</Badge>
                    </DropdownItem>
                    <hr className="m-0"/>
                    <DropdownItem onClick={this.onLogout.bind(this)} className="p-2 rounded-top">Выйти</DropdownItem>
                  </span>                      
                }
                </DropdownMenu>
              </UncontrolledDropdown>
               : 
               <React.Fragment>
                  <Link to="/auth" className="text-white" id="AuthToggle"><FiLogIn className="ml-2 mt-1" size="2em" /></Link>
                  <UncontrolledTooltip placement="bottom" target="AuthToggle">
                      Авторизация
                  </UncontrolledTooltip>
                </React.Fragment>
              }
            </Nav>
          </Collapse>
        </div>
      </Navbar>
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