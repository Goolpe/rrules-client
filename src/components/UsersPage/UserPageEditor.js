import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers, changePlayerData } from '../actions/playerActions';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class UserPageEditor extends Component {
  constructor(props){
    super(props);
    this.state ={
      username: '',
      fullName: '',
      photo: '',
      dateBirth: '',
      rating: 0,
      gamesCount: 0,
      about: '',
      master: false,
      skype: '',
      discord: '',
      examples: [],
      systems: '',
      setting: '',
      paidGames: false,
      leading: false,
      cityLive: '',
      otherContacts: '',
      playerId:''
    }
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0,0);
    if(this.props.auth.isAuthenticated){
      this.props.history.push(`/edit/${this.props.auth.user.name}`)
    }

  }
  componentWillMount() {
      this.props.fetchPlayers();
    }

  handleSubmit(e){
    e.preventDefault();
    const playerData = {
          id: this.props.players.find(player => this.props.auth.user.name === player.username)._id,
          fullName: this.state.fullName,
          photo: this.state.photo,
          dateBirth: this.state.dateBirth,
          rating: this.state.rating,
          gamesCount: this.state.gamesCount,
          about: this.state.about,
          master: this.state.master,
          skype: this.state.skype,
          discord: this.state.discord,
          examples: this.state.examples,
          systems: this.state.systems,
          setting: this.state.setting,
          paidGames: this.state.paidGames,
          leading: this.state.leading,
          cityLive: this.state.cityLive,
          otherContacts: this.state.otherContacts
         }

    this.props.changePlayerData(playerData);
  }
  onChange(e){
    this.setState({ [e.target.name]: e.target.value})
  }
  render() {
    const {isAuthenticated, user} = this.props.auth;   

    const playerNow = this.props.players.filter(player => user.name === player.username)
    .map(player =>
        <Form key={player._id} style={{maxWidth: "700px"}} onSubmit={this.handleSubmit} className="pl-5 pr-5 pt-3 pb-3 mx-auto shadow bg-white">
        
        <h4 className="text-muted">Информация о себе</h4>
        <hr />
        <FormGroup className="pt-3" row>
          <Label sm={4}>Имя:</Label>
          <Col sm={8}>
            <Input type="text" value={this.state.fullName} onChange={this.onChange} name="fullName" placeholder={player.fullName} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>День рождения:</Label>
          <Col sm={8}>
            <Input type="date" name="dateBirth" value={this.state.dateBirth} onChange={this.onChange} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>Город:</Label>
          <Col sm={8}>
            <Input type="text" value={this.state.cityLive} onChange={this.onChange} name="cityLive" placeholder={player.cityLive}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>О себе:</Label>
          <Col sm={8}>
            <Input type="textarea" value={this.state.about} onChange={this.onChange} name="about" placeholder={player.about}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>Любимые системы:</Label>
          <Col sm={8}>
            <Input type="textarea" value={this.state.systems} onChange={this.onChange} name="systems" placeholder={player.systems}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>Любимые сеттинги:</Label>
          <Col sm={8}>
            <Input type="textarea" value={this.state.setting} onChange={this.onChange} name="setting" placeholder={player.setting}/>
          </Col>
        </FormGroup>
       {/* <FormGroup row>
          <Label sm={4}>Аватар</Label>
          <Col sm={8}>
            <Input type="file" name="file" id="exampleFile" />
            <FormText color="muted">
              jpeg, png формат
            </FormText>
          </Col>
        </FormGroup>*/}
        <FormGroup row>
              <Label sm={4}>Водишь игры?</Label>
              <Col sm={8}>
                <div className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" value={true} onChange={()=>{this.setState({leading: true})}} checked={this.state.leading === true} id="radio1" />
                    <label className="custom-control-label" htmlFor="radio1">Да</label>
                </div>
                <div className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" value={false} onChange={()=>{this.setState({leading: false})}} checked={this.state.leading === false} id="radio2" />
                    <label className="custom-control-label" htmlFor="radio2">Нет</label>
                </div>
              </Col>
        </FormGroup>
{/*        {this.state.leading === true && <FormGroup row>
          <Label sm={4}>Примеры игр:</Label>
          <Col sm={8}>
            <Input type="string" value={this.state.examples[0]} onChange={this.onChange} name="nameUser" placeholder=""/>
            <Input type="string" value={this.state.examples[1]} onChange={this.onChange} name="nameUser" placeholder=""/>
          </Col>
        </FormGroup>}*/}
        <FormGroup row>
          <Label sm={4}>Skype:</Label>
          <Col sm={8}>
            <Input type="text" value={this.state.skype} onChange={this.onChange} name="skype" placeholder={player.skype}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>Discord:</Label>
          <Col sm={8}>
            <Input type="text" value={this.state.discord} onChange={this.onChange} name="discord" placeholder={player.discord}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>Доп. контакты:</Label>
          <Col sm={8}>
            <Input type="text" value={this.state.otherContacts} onChange={this.onChange} name="otherContacts" placeholder={player.otherContacts}/>
          </Col>
        </FormGroup>
        <FormGroup className="mt-5 mb-4" row>
          <Button type="submit" color="info" className="mx-auto pl-5 pr-5">Сохранить</Button>
        </FormGroup>
      </Form>
      )
	  return (
  	  <section id="userEditPage" style={{minHeight: "100vh"}}>	  
  	  	<div className="container pt-5 pb-5">
          {playerNow}
        
      	</div>
    	</section>
	  )
	}
}

UserPageEditor.propTypes = {
  fetchPlayers: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
  changePlayerData: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  players: state.players.items,
  auth: state.auth,
  player: state.data
})

export default connect(mapStateToProps, { fetchPlayers, changePlayerData })(withRouter(UserPageEditor));
