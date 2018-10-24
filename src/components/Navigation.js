import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import { FiLogIn, FiUser } from 'react-icons/fi';
import {
  Badge,
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
import { fetchGames } from './actions/gameActions';
import '../styles/navigation.css';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.state = {
      isOpen: false,
    };
  }

//handling navigation toggle in media query
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  closeNav() {
    this.setState({
      isOpen: false
    });
  }
// handling logout button
  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
    this.setState({
      isOpen: false
    });
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    return(
      <React.Fragment>
        <Navbar dark expand='md'>
          <div className='container'>
            <NavbarBrand tag={Link} to='/'>
              <img alt='logo' src='../logo.png' className='navbar-brand__img'/>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                <NavItem>
                  <NavLink tag={Link}
                    to='/'
                    onClick={this.closeNav}
                    className={this.props.history.location.pathname === '/' ? 'nav-link--active' : ''}
                  >
                    ГЛАВНАЯ
                  </NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret 
                    className={
                      this.props.history.location.pathname === '/about-project' ||
                      this.props.history.location.pathname === '/library' ||
                      this.props.history.location.pathname === '/masters' ||
                      this.props.history.location.pathname === '/art' ||
                      this.props.history.location.pathname === '/support' ? 'nav-link--active' : ''}>
                    МЕНЮ
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem tag={Link}
                      to='/about-project'
                      onClick={this.closeNav}
                      className={this.props.history.location.pathname === '/about-project' ?
                        'dropdown-item--active' : ''}
                    >
                      О ПРОЕКТЕ
                    </DropdownItem>
                    <DropdownItem tag={Link}
                      to='/library'
                      onClick={this.closeNav}
                      className={this.props.history.location.pathname === '/library' ?
                        'dropdown-item--active' : ''}
                    >
                      БИБЛИОТЕКА
                    </DropdownItem>
                    <DropdownItem tag={Link}
                      to='/masters'
                      onClick={this.closeNav}
                      className={this.props.history.location.pathname === '/masters' ?
                        'dropdown-item--active' : ''}
                    >
                      МАСТЕРА КАНАЛА
                    </DropdownItem>
                    <DropdownItem tag={Link}
                      to='/art'
                      onClick={this.closeNav}
                      className={this.props.history.location.pathname === '/art' ?
                      'dropdown-item--active' : ''}>
                      ФАН-АРТ
                    </DropdownItem>
                    <DropdownItem tag={Link}
                      to='/support'
                      onClick={this.closeNav}
                      className={this.props.history.location.pathname === '/support' ?
                        'dropdown-item--active' : ''}
                    >
                      ПОДДЕРЖАТЬ ПРОЕКТ
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <NavLink tag={Link}
                    to='/streams'
                    onClick={this.closeNav}
                    className={this.props.history.location.pathname === '/streams' ? 'nav-link--active' : ''}
                  >
                    СТРИМЫ
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link}
                    to='/articles'
                    onClick={this.closeNav}
                    className={this.props.history.location.pathname.includes('/article') ?
                      'nav-link--active' : ''}
                  >
                    НОВОСТИ
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link}
                    to='/shop'
                    onClick={this.closeNav}
                    className={this.props.history.location.pathname === '/shop' ? 'nav-link--active' : ''}
                  >
                    МАГАЗИН
                  </NavLink>
                </NavItem>
                <NavItem >
                  <NavLink tag={Link} className='btn-danger' to='/games' onClick={this.closeNav}>
                    НАЙТИ ИГРУ
                  </NavLink>
                </NavItem>
                {isAuthenticated ? 
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav
                      className={
                      this.props.history.location.pathname.includes('/@' + user.name) ||
                      this.props.history.location.pathname === '/msgs' ||
                      this.props.history.location.pathname.includes('/edit') ? 'nav-link--active' : ''}
                    >
                      <FiUser size='1.5em' />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag={Link}
                        to={`/@${user.name}`}
                        onClick={this.closeNav}
                        className={this.props.history.location.pathname.includes('/@' + user.name) ?
                          'dropdown-item--active' : ''}
                      >
                        ПРОФИЛЬ
                      </DropdownItem>
                      <DropdownItem tag={Link}
                        to='/msgs'
                        onClick={this.closeNav}
                        className={this.props.history.location.pathname === '/msgs' ?
                        'dropdown-item--active' : ''}
                      >
                        СООБЩЕНИЯ {this.state.read ? <Badge color='danger'>{this.state.read}</Badge> : ''}
                      </DropdownItem>
                      <DropdownItem tag={Link}
                        to={`/edit/${user.name}`}
                        onClick={this.closeNav}
                        className={this.props.history.location.pathname.includes('/edit/') ?
                        'dropdown-item--active' : ''}
                      >
                        НАСТРОЙКИ
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={this.onLogout} >
                        ВЫЙТИ
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                :
                <NavItem>
                  <NavLink tag={Link}
                    to='/auth'
                    onClick={this.closeNav}
                    className={this.props.history.location.pathname === '/auth' ? 'nav-link--active' : ''}
                  >
                    <FiLogIn size='1.5em'/>
                  </NavLink>
                </NavItem>
                }
                
              </Nav>
            </Collapse>
          </div>
        </Navbar>
       
      </React.Fragment>
    );
  }
}

Navigation.propTypes = {
  fetchGames: PropTypes.func,
  logoutUser: PropTypes.func,
  auth: PropTypes.object,
  games: PropTypes.array,
};

const mapStateToProps = state => ({
  auth: state.auth,
  games: state.games.items,
});

export default connect(mapStateToProps, { fetchGames, logoutUser })(withRouter(Navigation));