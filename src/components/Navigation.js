import React, {Component} from 'react';
import {
  Link
} from 'react-router-dom';

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


class Navigation extends Component{
     constructor(props) {
    super(props);
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
  render(){
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
              <NavItem>
                <NavLink tag={Link} onClick={this.closeNav} to="/about-project" className="bg-transparent border-0 nav-link text-white btn btn-link">О ПРОЕКТЕ</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="text-white btn btn-link" nav caret>НАВИГАЦИЯ</DropdownToggle>
                <DropdownMenu  className="p-0">
                  <DropdownItem tag={Link} onClick={this.closeNav} to="/library" className="p-2 rounded-top">БИБЛИОТЕКА</DropdownItem> 
                  <DropdownItem tag={Link} onClick={this.closeNav} to="/masters" className="p-2">РЕЗЮМЕ МАСТЕРОВ</DropdownItem>
                  <DropdownItem tag={Link} onClick={this.closeNav} to="/art" className="p-2">АРТ</DropdownItem>
                  <DropdownItem tag={Link} onClick={this.closeNav} to="/support" className="p-2 rounded-bottom">ПОДДЕРЖАТЬ ПРОЕКТ</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink tag={Link} onClick={this.closeNav} to="/streams" className="nav-link text-white btn btn-link">СТРИМЫ</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} onClick={this.closeNav} to="/articles" className="nav-link text-white btn btn-link">СТАТЬИ</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} onClick={this.closeNav} to="/shop" className="nav-link text-white btn btn-danger rounded">МАГАЗИН</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar className="keyAuth">
                <DropdownToggle className="text-white ml-2" nav><i className={this.props.auth ? "fas fa-user-circle fa-2x" : "fab fa-expeditedssl fa-2x"}></i></DropdownToggle>
                <DropdownMenu  className="p-0">
                {this.props.auth ?
                  <span>
                  <DropdownItem tag={Link} onClick={this.closeNav} to="/id/:id" className="p-2 rounded-top">Профиль</DropdownItem>
                  <DropdownItem onClick={this.props.signout} className="p-2 rounded-top">Выйти</DropdownItem></span>
                :
                 <DropdownItem tag={Link} onClick={this.closeNav} to="/id/:id" className="p-2 rounded-top">Войти</DropdownItem>                      
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

export default Navigation