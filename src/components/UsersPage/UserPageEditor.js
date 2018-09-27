import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPlayer, changePlayerData } from "../actions/playerActions";
import { Col, Button, Form, FormGroup, Label, UncontrolledTooltip } from "reactstrap";
import { FaTimes } from "react-icons/fa";
import { withRouter, Link } from "react-router-dom";
import 'flatpickr/dist/themes/light.css'; 
import Flatpickr from 'react-flatpickr';
import { Russian } from "flatpickr/dist/l10n/ru.js"

class UserPageEditor extends Component {
  constructor(props){
    super(props);
    this.state = {
      fullName: this.props.player.fullName,
      photo: this.props.player.photo,
      bgphoto: this.props.player.bgphoto,
      selectedDay: this.props.player.dateBirth,
      gamesCount: this.props.player.gamesCount,
      about: this.props.player.about,
      skype: this.props.player.skype,
      discord: this.props.player.discord,
      systems: this.props.player.systems,
      setting: this.props.player.setting,
      paidGames: this.props.player.paidGames,
      leading: this.props.player.leading,
      cityLive: this.props.player.cityLive,
      otherContacts: this.props.player.otherContacts,
      example1:this.props.player.example1,
      example2:this.props.player.example2,
      example3:this.props.player.example3,
      example4:this.props.player.example4,
      sex:this.props.player.sex
    }
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0,0);
    if(this.props.auth.isAuthenticated){
      this.props.fetchPlayer(this.props.auth.user.name)
      this.props.history.push(`/edit/${this.props.auth.user.name}`)
    }
    else{
      this.props.history.push('/auth')
    }
  }

  componentWillReceiveProps(data) {
    this.setState({ 
      fullName: data.player.fullName,
      photo: data.player.photo,
      bgphoto: data.player.bgphoto,
      selectedDay: data.player.dateBirth,
      gamesCount: data.player.gamesCount,
      about: data.player.about,
      skype: data.player.skype,
      discord: data.player.discord,
      systems: data.player.systems,
      setting: data.player.setting,
      paidGames: data.player.paidGames,
      leading: data.player.leading,
      cityLive: data.player.cityLive,
      otherContacts: data.player.otherContacts,
      example1:data.player.example1,
      example2:data.player.example2,
      example3:data.player.example3,
      example4:data.player.example4,
      sex:data.player.sex
    });
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault();

    const playerData = {
          id: this.props.player._id,
          fullName: this.state.fullName,
          photo: this.state.photo,
          bgphoto: this.state.bgphoto,
          dateBirth: this.state.selectedDay,
          gamesCount: this.state.gamesCount,
          about: this.state.about,
          skype: this.state.skype,
          discord: this.state.discord,
          example1: this.state.example1,
          example2: this.state.example2,
          example3: this.state.example3,
          example4: this.state.example4,
          systems: this.state.systems,
          setting: this.state.setting,
          paidGames: this.state.paidGames,
          leading: this.state.leading,
          cityLive: this.state.cityLive,
          otherContacts: this.state.otherContacts,
          sex: this.state.sex
         }

    this.props.changePlayerData(playerData);
  }
  render() {
    return (
      <section id="userEditPage">    
        <div className="container text_card">
          <Form style={{maxWidth: "700px"}} onSubmit={this.handleSubmit} className="pl-5 pr-5 pb-3 mx-auto shadow bg_card">
            <div className="d-flex justify-content-end w-100 pt-3 pb-3" >
              <Link className="userpage__facog mt-2 text_card" style={{height:"1.5em"}} id="TooltipSetting" to={`/@${this.props.auth.user.name}`}>
                <FaTimes size="1.5em"/>
              </Link>
              <UncontrolledTooltip className="mr-2" placement="left" target="TooltipSetting">
                Выйти из настройки
              </UncontrolledTooltip>
            </div>
              <FormGroup className="pt-3" row>
                <Label sm={4}>Имя:</Label>
                <Col sm={8}>
                  <input type="text" className="w-100" value={this.state.fullName || ""} onChange={this.onChange} name="fullName"/>
                </Col>
              </FormGroup>
              <FormGroup className="pt-3" row>
                    <Label sm={4}>Пол:</Label>
                    <Col sm={3}>
                      <div className="custom-control custom-radio">
                          <input type="radio" className="custom-control-input" value={true} onChange={()=>{this.setState({sex: "Мужской"})}} checked={this.state.sex === "Мужской"} id="radiosex1" />
                          <label className="custom-control-label" htmlFor="radiosex1">Мужской</label>
                      </div>
                    </Col>
                    <Col sm={5}>
                      <div className="custom-control custom-radio">
                          <input type="radio" className="custom-control-input" value={false} onChange={()=>{this.setState({sex: "Женский"})}} checked={this.state.sex === "Женский"} id="radiosex2" />
                          <label className="custom-control-label" htmlFor="radiosex2">Женский</label>
                      </div>
                    </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4}>День рождения:</Label>
                <Col sm={8} className="text-dark ">
                <Flatpickr
                  value={this.state.selectedDay}
                  onChange={selectedDay => { this.setState({selectedDay}) }} 
                  options={{dateFormat: "d-m-Y", "locale": Russian}}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4}>Город:</Label>
                <Col sm={8}>
                  <input type="text" className="w-100" value={this.state.cityLive || ""} onChange={this.onChange} name="cityLive" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4}>О себе:</Label>
                <Col sm={8}>
                  <textarea className="w-100" value={this.state.about || ""} onChange={this.onChange} name="about" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4}>Любимые системы:</Label>
                <Col sm={8}>
                  <textarea className="w-100" value={this.state.systems || ""} onChange={this.onChange} name="systems"/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4}>Любимые сеттинги:</Label>
                <Col sm={8}>
                  <textarea className="w-100" value={this.state.setting || ""} onChange={this.onChange} name="setting"/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4}>Аватар:</Label>
                <Col sm={8}>
                  <input type="text" className="w-100" value={this.state.photo || ""} onChange={this.onChange} name="photo"/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4}>Фон:</Label>
                <Col sm={8}>
                  <input type="text" className="w-100" value={this.state.bgphoto || ""} onChange={this.onChange} name="bgphoto"/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4}>Водишь игры?</Label>
                <Col sm={2}>
                  <div className="custom-control custom-radio">
                      <input type="radio" className="custom-control-input" value={true} onChange={()=>{this.setState({leading: true})}} checked={this.state.leading === true} id="radio1" />
                      <label className="custom-control-label" htmlFor="radio1">Да</label>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="custom-control custom-radio">
                      <input type="radio" className="custom-control-input" value={false} onChange={()=>{this.setState({leading: false})}} checked={this.state.leading === false} id="radio2" />
                      <label className="custom-control-label" htmlFor="radio2">Нет</label>
                  </div>
                </Col>
              </FormGroup>
             {this.state.leading === true && <FormGroup>
                <Label>Примеры игр:</Label>
                  <input type="text" className="w-100 mb-3" value={this.state.example1} onChange={this.onChange} name="example1" />
                  <input type="text" className="w-100 mb-3" value={this.state.example2} onChange={this.onChange} name="example2" />
                  <input type="text" className="w-100 mb-3" value={this.state.example3} onChange={this.onChange} name="example3" />
                  <input type="text" className="w-100 mb-3" value={this.state.example4} onChange={this.onChange} name="example4" />
              </FormGroup>}
              <FormGroup row>
                <Label sm={4}>Skype:</Label>
                <Col sm={8}>
                  <input type="text" className="w-100" value={this.state.skype || ""} onChange={this.onChange} name="skype" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4}>Discord:</Label>
                <Col sm={8}>
                  <input type="text" className="w-100" value={this.state.discord || ""} onChange={this.onChange} name="discord"/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4}>Доп. контакты:</Label>
                <Col sm={8}>
                  <input type="text" className="w-100" value={this.state.otherContacts || ""} onChange={this.onChange} name="otherContacts"/>
                </Col>
              </FormGroup>
              <FormGroup className="mt-5 mb-4" row>
                <Button type="submit" color="info" className="mx-auto pl-5 pr-5">Сохранить</Button>
              </FormGroup>
          </Form>
        </div>
      </section>
    )
  }
}

UserPageEditor.propTypes = {
  fetchPlayer: PropTypes.func.isRequired,
  changePlayerData: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  player: state.players.item,
  auth: state.auth
})

export default connect(mapStateToProps, { fetchPlayer, changePlayerData })(withRouter(UserPageEditor));