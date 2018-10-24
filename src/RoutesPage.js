import React, { Component } from 'react';
import {
  Router,
  Route,
  Switch,
  Redirect,
  NavLink,
  Link,
} from 'react-router-dom';
import history from './history';

import { FiLogIn, FiUser } from 'react-icons/fi';
import {
  Badge,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

import HomePage from './components/HomePage';
import Footer from './components/Footer';
import ArrowUp from './components/ArrowUp';
import error404Page from './components/error404Page';
import AboutPage from './components/AboutPage';
import LibraryPage from './components/LibraryPage';
import ArtPage from './components/ArtPage';
import ArticlesPage from './components/ArticlesPage';
import ArticlePage from './components/ArticlesPage/ArticlePage';
import ArticleForm from './components/ArticlesPage/ArticleForm';
import ShopPage from './components/ShopPage';

import MastersPage from './components/UsersPage/MastersPage';
import UserPage from './components/UsersPage/UserPage';
import UserPageEditor from './components/UsersPage/UserPageEditor';
import MessagesPage from './components/MessagesPage';

import AgreementPage from './components/AgreementPage';
import SupportPage from './components/SupportPage';
import TechWorksPage from './components/TechWorksPage';
import AuthPage from './components/AuthPage';
import SocialAuth from './components/AuthPage/SocialAuth';
import GamesPage from './components/GamesPage';
import CreateGamePage from './components/GamesPage/CreateGamePage';
import GamePage from './components/GamesPage/GamePage';
import GameEditPage from './components/GamesPage/GameEditPage';
import EmailVerif from './components/AuthPage/EmailVerif';
import StreamsPage from './components/StreamsPage';

import setAuthToken from './components/setAuthToken';
import { setCurrentUser, logoutUser } from './components/actions/authActions';
import './styles/navigation.css';
import store from './components/store';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser(this.history));
    window.location.href = '/auth';
  }
}

class RoutesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      techs: false,
      isOpen: false,
    };
    this.onLogout = this.onLogout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.closeNav = this.closeNav.bind(this);
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
    this.props.logoutUser(history);
    this.setState({
      isOpen: false
    });
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <Router history={history}>
        <React.Fragment>
          {this.state.techs
            ?
          <Switch>
            <Route path="/" exact={true} component={TechWorksPage} />
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
            :
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
                      <NavLink
                        to='/' exact={true}
                        onClick={this.closeNav}
                        activeClassName = 'nav-link--active'
                        className='nav-link'
                      >
                        ГЛАВНАЯ
                      </NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        МЕНЮ
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem tag={NavLink}
                            to='/about-project'
                            onClick={this.closeNav}
                            activeClassName = 'dropdown-item--active'
                          >
                            О ПРОЕКТЕ
                        </DropdownItem>
                        <DropdownItem tag={NavLink}
                          to='/library'
                          onClick={this.closeNav}
                          activeClassName = 'dropdown-item--active'
                          className='dropdown-item'
                          tabIndex='0'
                        >
                          БИБЛИОТЕКА
                        </DropdownItem>
                        <DropdownItem tag={NavLink}
                          to='/masters'
                          onClick={this.closeNav}
                          activeClassName = 'dropdown-item--active'
                          className='dropdown-item'
                          tabIndex='0'
                        >
                          МАСТЕРА КАНАЛА
                        </DropdownItem>
                        <DropdownItem tag={NavLink}
                          to='/art'
                          onClick={this.closeNav}
                          activeClassName = 'dropdown-item--active'
                          className='dropdown-item'
                          tabIndex='0'
                        >
                          ФАН-АРТ
                        </DropdownItem>
                        <DropdownItem tag={NavLink}
                          to='/support'
                          onClick={this.closeNav}
                          activeClassName = 'dropdown-item--active'
                          className='dropdown-item'
                          tabIndex='0'
                        >
                          ПОДДЕРЖАТЬ ПРОЕКТ
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    <NavItem>
                      <NavLink
                        to='/streams'
                        onClick={this.closeNav}
                        activeClassName = 'nav-link--active'
                        className='nav-link'
                      >
                        СТРИМЫ
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to='/articles'
                        onClick={this.closeNav}
                        activeClassName = 'nav-link--active'
                        className='nav-link'
                      >
                        НОВОСТИ
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to='/shop'
                        onClick={this.closeNav}
                        activeClassName = 'nav-link--active'
                        className='nav-link'
                      >
                        МАГАЗИН
                      </NavLink>
                    </NavItem>
                    <NavItem >
                      <NavLink className='btn-danger nav-link' to='/games' onClick={this.closeNav}>
                        НАЙТИ ИГРУ
                      </NavLink>
                    </NavItem>
                    {isAuthenticated ? 
                      <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav>
                          <FiUser size='1.5em' />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem tag={NavLink}
                            to={`/@${user.name}`}
                            onClick={this.closeNav}
                            activeClassName = 'dropdown-item--active'
                            className='dropdown-item'
                          >
                            ПРОФИЛЬ
                          </DropdownItem>
                          <DropdownItem tag={NavLink}
                            to='/msgs'
                            onClick={this.closeNav}
                            activeClassName = 'dropdown-item--active'
                            className='dropdown-item'
                          >
                            СООБЩЕНИЯ {this.state.read ? <Badge color='danger'>{this.state.read}</Badge> : ''}
                          </DropdownItem>
                          <DropdownItem tag={NavLink}
                            to={`/edit/${user.name}`}
                            onClick={this.closeNav}
                            activeClassName = 'dropdown-item--active'
                            className='dropdown-item'
                          >
                            НАСТРОЙКИ
                          </DropdownItem>
                          <div className="dropdown-divider"></div>
                          <DropdownItem tag={NavLink} to='/auth' className='dropdown-item' onClick={this.onLogout} >
                            ВЫЙТИ
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    :
                    <NavItem>
                      <NavLink
                        to='/auth'
                        onClick={this.closeNav}
                        activeClassName = 'nav-link--active'
                        className='nav-link'
                      >
                        <FiLogIn size='1.5em'/>
                      </NavLink>
                    </NavItem>
                    }
                  </Nav>
                </Collapse>
              </div>
            </Navbar>
            <Switch>
              <Route path="/" exact={true} component={HomePage} />
              <Route path="/about-project" component={AboutPage} />
              <Route path="/library" component={LibraryPage} />
              <Route path="/art" component={ArtPage} />
              <Route path="/articles" component={ArticlesPage} />
              <Route path="/article/:id" component={ArticlePage} />
              <Route path="/shop" component={ShopPage} />
              <Route path="/masters" component={MastersPage} />
              <Route path="/support" component={SupportPage} />
              <Route path="/agreement" component={AgreementPage} />
              <Route path="/games" component={GamesPage} />
              <Route path="/game/:id" component={GamePage} />
              <Route path="/@:nickname" component={UserPage} />
              <Route path="/msgs" component={MessagesPage} />
              <Route path="/auth" component={AuthPage} />
              <Route path="/streams" component={StreamsPage} />
              <Route path="/social-auth/:id" component={SocialAuth} />
              <Route path="/email-verification" component={EmailVerif} />
              <Route path="/article-new" component={ArticleForm} />
              <Route path="/edit/:nickname" component={UserPageEditor} />
              <Route path="/game-create" component={CreateGamePage} />
              <Route path="/game-edit/:id" component={GameEditPage} />
              <Route path="*" component={error404Page} />
            </Switch>
            <Footer />
            <ArrowUp />
          </React.Fragment>
          }
        </React.Fragment>
      </Router>
    );
  }
}

RoutesPage.propTypes = {
  auth: PropTypes.object,
  logoutUser: PropTypes.func,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(RoutesPage);
