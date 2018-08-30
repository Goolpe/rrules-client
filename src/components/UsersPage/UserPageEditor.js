import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/playerActions';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


class UserPageEditor extends Component {
  constructor(props){
    super(props);
    this.state ={
      pictureEdit: false,
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
      paidGames: false
    }
    this.onChange = this.onChange.bind(this);

  }
  componentDidMount() {
    window.scrollTo(0,0);

  }
  componentWillMount() {
      this.props.fetchPlayers();
    }
  onChange(e){
    this.setState({ [e.target.name]: e.target.value})
  }
  render() {
    const { selectedDay} = this.state;

    const searchId = this.props.players.filter(player=> player.username === this.props.match.params.nickname)
    .map(player =>
        <div key={player.userId}>
           
          </div>)
	  return (
  	  <section id="masterPage" style={{minHeight: "100vh"}}>	  
  	  	<div className="container pt-5 pb-5">
        
        <Form style={{maxWidth: "700px"}} className="pl-5 pr-5 pt-3 pb-3 mx-auto shadow bg-white">
        <h4 className="text-muted">Информация о себе</h4>
        <hr />
        <FormGroup className="pt-3" row>
          <Label htmlFor="examplePassword" sm={4}>Имя:</Label>
          <Col sm={8}>
            <Input type="string" value={this.state.nameUser} onChange={this.onChange} name="nameUser" placeholder=""/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>День рождения:</Label>
          <Col sm={8}>
            <Input type="date" name="date" id="exampleDate" placeholder="date placeholder" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="examplePassword" sm={4}>Город:</Label>
          <Col sm={8}>
            <Input type="string" value={this.state.nameUser} onChange={this.onChange} name="nameUser" placeholder=""/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="exampleText" sm={4}>О себе:</Label>
          <Col sm={8}>
            <Input type="textarea" value={this.state.nameUser} onChange={this.onChange} name="nameUser" placeholder=""/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="exampleText" sm={4}>Любимые системы:</Label>
          <Col sm={8}>
            <Input type="textarea" value={this.state.nameUser} onChange={this.onChange} name="nameUser" placeholder=""/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="exampleText" sm={4}>Любимые сеттинги:</Label>
          <Col sm={8}>
            <Input type="textarea" value={this.state.nameUser} onChange={this.onChange} name="nameUser" placeholder=""/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="exampleFile" sm={4}>Аватар</Label>
          <Col sm={8}>
            <Input type="file" name="file" id="exampleFile" />
            <FormText color="muted">
              jpeg, png формат
            </FormText>
          </Col>
        </FormGroup>
        <FormGroup row>
              <Label sm={4}>Водишь игры?</Label>
              <Col sm={8}>
                <div className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" value="sortByTypeOnline" onChange={()=>{this.setState({selectedOption: 'sortByTypeOnline'})}} checked={this.state.selectedOption === 'sortByTypeOnline'} id="radio1" />
                    <label className="custom-control-label" htmlFor="radio1">Да</label>
                </div>
                <div className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" value="sortByTypeIRL" onChange={()=>{this.setState({selectedOption: 'sortByTypeIRL'})}} checked={this.state.selectedOption === 'sortByTypeIRL'} id="radio2" />
                    <label className="custom-control-label" htmlFor="radio2">Нет</label>
                </div>
              </Col>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="examplePassword" sm={4}>Skype:</Label>
          <Col sm={8}>
            <Input type="string" value={this.state.nameUser} onChange={this.onChange} name="nameUser" placeholder=""/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="examplePassword" sm={4}>Discord:</Label>
          <Col sm={8}>
            <Input type="string" value={this.state.nameUser} onChange={this.onChange} name="nameUser" placeholder=""/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="examplePassword" sm={4}>Доп. контакты:</Label>
          <Col sm={8}>
            <Input type="string" value={this.state.nameUser} onChange={this.onChange} name="nameUser" placeholder=""/>
          </Col>
        </FormGroup>
        <FormGroup className="mt-5 mb-4" row>
          <Button color="info" className="mx-auto pl-5 pr-5">Сохранить</Button>
        </FormGroup>
      </Form>
      	</div>
    	</section>
	  )
	}
}

UserPageEditor.propTypes = {
  fetchPlayers: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  players: state.players.items
})

export default connect(mapStateToProps, { fetchPlayers })( UserPageEditor);
