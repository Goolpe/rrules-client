import React from 'react';

function Videos(props){	
	    return (
	    	<div className="pt-5" id="videos">
	    		<div className="container">
					<p className="text-white font-weight-bold">СМОТРИ</p>
					<p className="text-white font-weight-bold">УЧАВСТВУЙ</p>
		    		<div className="row text-white">
		    			<div className="col-12 col-md-6 col-lg-3 mt-2">
		    			<iframe width="100%" title="video1" height="300" src="https://www.youtube.com/embed/videoseries?list=UU-Hexiu7bmDvDlE6tA7LECw" frameBorder="0" allowFullScreen></iframe>
		    			</div>
		    			<div className="col-12 col-md-6 col-lg-3 mt-2">
		    			<iframe width="100%" title="video2" height="300" src="https://www.youtube.com/embed/videoseries?list=UU-Hexiu7bmDvDlE6tA7LECw&index=1" frameBorder="0" allowFullScreen></iframe>
		    			</div>
						<div className="col-12 col-md-6 col-lg-3 mt-2">
		    			<iframe width="100%" title="video3" height="300" src="https://www.youtube.com/embed/videoseries?list=UU-Hexiu7bmDvDlE6tA7LECw&index=2" frameBorder="0" allowFullScreen></iframe>
						</div>
						<div className="col-12 col-md-6 col-lg-3 mt-2">
		    			<iframe width="100%" title="video4" height="300" src="https://www.youtube.com/embed/videoseries?list=UU-Hexiu7bmDvDlE6tA7LECw&index=3" frameBorder="0" allowFullScreen></iframe>
						</div>
		    		</div>
	    		</div>
	    	</div>
	    )
}
export default Videos;
<Navbar className="bg-transparent" light expand="lg">
        <div className="container">
          <NavbarBrand tag={Link} onClick={this.closeNav} to="/" className="navbar-brand"><img src="../logo.png" style={{height:"50px"}} alt="ГЛАВНАЯ"/></NavbarBrand>
          <button className="navbar-toggler" onClick={this.toggle}><hr id="hr1"/><hr id="hr2"/><hr id="hr3"/></button>
          <div className={this.state.isOpen ? "collapse show navbar-collapse" : "collapse navbar-collapse"} id="colNav">
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
                    {this.props.player.photo ? <img src={this.props.player.photo} alt="avatar" className="img-fluid rounded bg-white" style={{height:"100%", width:"30px"}}/>
                    : <FiUser size="2em" className="mt-2" />}
                    <Badge color="danger" className="ml-2" >{this.state.read}</Badge>
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
                    <DropdownItem tag={Link} to="/auth" onClick={this.onLogout.bind(this)} className="p-2 rounded-top">Выйти</DropdownItem>
                  </span>                      
                }
                </DropdownMenu>
              </UncontrolledDropdown>
               : 
               <NavItem>
                  <NavLink tag={Link} to="/auth" onClick={this.closeNav} className="nav-link text-white pt-1" id="AuthToggle"><FiLogIn size="2em" /></NavLink>
                  <UncontrolledTooltip placement="bottom" target="AuthToggle">
                      Авторизация
                  </UncontrolledTooltip>
                </NavItem>
              }
            </Nav>
          </div>
        </div>
      </Navbar>
