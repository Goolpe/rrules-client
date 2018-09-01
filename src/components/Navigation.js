import React, {Component} from 'react';
import { Link } from 'react-router-dom';
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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from './actions/authActions';
import { withRouter } from 'react-router-dom';

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
  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }
  render(){
    const {isAuthenticated, user} = this.props.auth;

    return(
      <Navbar color="dark" className="bg-Nav" light expand="lg">
        <div className="container">
          <NavbarBrand tag={Link} onClick={this.closeNav} to="/" className="navbar-brand"><img src="../logo.png" alt="ГЛАВНАЯ"/></NavbarBrand>
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
              <UncontrolledDropdown nav inNavbar className="keyAuth">
                <DropdownToggle className="text-white ml-2 p-0"  style={{height:"40px"}} nav>{isAuthenticated ?   <i className= "fas fa-address-book ml-2 mt-1 fa-2x"></i> : <i className= "fas fa-key ml-2 mt-1 fa-2x"></i>}</DropdownToggle>
                <DropdownMenu  className="p-0">
                {isAuthenticated ?
                  <span>
                    <DropdownItem tag={Link} onClick={this.closeNav} to={`/@${user.name}`} className="p-2 rounded-top">Мой профиль</DropdownItem>
                    <DropdownItem tag={Link} onClick={this.closeNav} to={`/edit/@${user.name}`} className="p-2 rounded-top">Настройки</DropdownItem>
                    <hr className="m-0"/>
                    <DropdownItem onClick={this.onLogout.bind(this)} className="p-2 rounded-top">Выйти </DropdownItem>
                  </span>
                :
                 <DropdownItem tag={Link} onClick={this.closeNav} to="/auth" className="p-2 rounded-top">Авторизация</DropdownItem>                      
                }
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    )
  }
}
Navigation.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navigation));