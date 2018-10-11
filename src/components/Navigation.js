import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiUser } from "react-icons/fi";
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
import { fetchPlayer } from './actions/playerActions';
import { withRouter } from 'react-router-dom';
import { fetchGames } from './actions/gameActions';
import './style/navigation.css';

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

  componentDidMount() {

// checking user
    if(this.props.auth.isAuthenticated){
      this.props.fetchPlayer(this.props.auth.user.name, this.props.history)
    }
  }

//handling navigation toggle in media query
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
// handling logout button
  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render(){
    const {isAuthenticated, user} = this.props.auth;
    return(
      <React.Fragment>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarBrand tag={Link} to="/"><img alt="logo" src="../logo.png" className="navbar-brand__img"/></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink tag={Link} to="/" onClick={this.closeNav}>ГЛАВНАЯ</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    МЕНЮ
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem tag={Link} to="/about-project" onClick={this.closeNav}>
                      О ПРОЕКТЕ
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/library" onClick={this.closeNav}>
                      БИБЛИОТЕКА
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/masters" onClick={this.closeNav}>
                      МАСТЕРА КАНАЛА
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/art" onClick={this.closeNav}>
                      ФАН-АРТ
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/support" onClick={this.closeNav}>
                      ПОДДЕРЖАТЬ ПРОЕКТ
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <NavLink tag={Link} to="/articles" onClick={this.closeNav}>НОВОСТИ</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/shop" onClick={this.closeNav}>МАГАЗИН</NavLink>
                </NavItem>
                <NavItem >
                  <NavLink tag={Link} className="btn btn-danger rounded" to="/games" onClick={this.closeNav}>НАЙТИ ИГРУ</NavLink>
                </NavItem>
                {isAuthenticated ? 
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav>
                    <FiUser size="1.5em" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem tag={Link} to={`/@${user.name}`} onClick={this.closeNav}>
                      ПРОФИЛЬ
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/msgs" onClick={this.closeNav}>
                      СООБЩЕНИЯ {this.state.read ? <Badge color="danger">{this.state.read}</Badge> : ""}
                    </DropdownItem>
                    <DropdownItem tag={Link} to={`/edit/@${user.name}`} onClick={this.closeNav}>
                      НАСТРОЙКИ
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem >
                      ВЫЙТИ
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                :
                <NavItem>
                  <NavLink tag={Link} to="/auth" onClick={this.closeNav}><FiLogIn size="1.5em"/></NavLink>
                </NavItem>
                }
                
              </Nav>
            </Collapse>
          </div>
        </Navbar>
       
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