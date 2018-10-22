import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from "lodash";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FiUsers} from "react-icons/fi";
import '../../styles/masters.css';
import { fetchPersons } from '../actions/personActions';

class MastersPage extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      viewList: true,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchPersons();
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render(){
    var mastersSort = _.sortBy(this.props.persons, ['rating']).reverse()

    const mastersView = mastersSort.filter(master => master.status === "мастер")
      .map((master, index) =>
        <div className="col-12 col-md-6 col-lg-4 mb-5" key={index}>
          <Link to={`/@${master.name}`}>
            <div className="master__wrapper shadow" style={ { backgroundImage: `url(${master.photo})`} }>
              <div className="master__card text_card d-flex align-items-center justify-content-center rounded-0" >
                <h1 style={{textShadow: 'black 0 0 20px'}}>{master.name.toUpperCase()}</h1>
              </div>
            </div>
          </Link>
        </div>,
      )

    const mastersList = mastersSort.filter(master => master.status === "мастер")
      .map((master, index) => 
        <div className="col-12" key={index}>
          <Link to={`/@${master.name}`}>  
            <div className="row p-3 text-left align-items-start text_card bg_card mb-4 shadow">
              <div className="col-12 col-md-4">
                <p className="m-0">{master.name}</p>
              </div>
              <div className="col-12 col-md-4">
                <i className="fas fa-star text-warning fa-1x"></i> - {master.rating}/5
              </div>
              <div className="col-12 col-md-4">
                <p className="m-0">Количество игр: {master.gamesCount || "0"}</p>
              </div>
            </div>
          </Link>
        </div>,
      ) 
    return (
      <main>
        <section className="container">
          <h1 className="text_card">
            <FiUsers size="1.5em"/> Мастера канала
          </h1>
          <div className="d-flex justify-content-end align-items-center text_card pb-2">
            <p className="m-0">Вид:</p>
            <button className="btn bg-transparent ml-2" onClick={ () => this.setState({ viewList: false }) }>
              <i className={"fas fa-th-large fa-2x " + (this.state.viewList ? "text-secondary" : "text_card")}>
              </i>
            </button>
            <button className="btn bg-transparent" onClick={ () => this.setState({ viewList: true }) }>
              <i  className={"fas fa-th-list fa-2x " + (this.state.viewList ? "text_card" : "text-secondary")}>
              </i>
            </button>
          </div>
          <div className="row">
            {this.state.viewList ? mastersList : mastersView }
          </div>
        </section>
      </main>
    );
  }
}

MastersPage.propTypes = {
  fetchPersons: PropTypes.func,
  persons: PropTypes.array,
};

const mapStateToProps = state => ({
  persons: state.persons.items,
});

export default connect(mapStateToProps, { fetchPersons })(MastersPage);