import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  // pass surveyId to backend
  deleteSurvey = async (surveyId) => {
    //console.log("surveyId ", surveyId);
    await axios.delete("/api/survey/" + surveyId);
    this.props.fetchSurveys();
  };

  renderSurveys = () => {
    return this.props.surveys.reverse().map((survey) => {
      return (
        <div className="card yellow lighten-5" key={survey._id}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">
              Sent on: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a className="blue-text">Yes: {survey.yes}</a>
            <a className="blue-text">No: {survey.no}</a>
            <a
              className="waves-effect waves-light right red lighten-2 btn-flat white-text"
              style={{ marginTop: "-5px" }}
              onClick={() => this.deleteSurvey(survey._id)}
            >
              <i className="material-icons right">delete</i>delete
            </a>
          </div>
        </div>
      );
    });
  };

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

const mapStateToProps = (reduxState) => {
  return { surveys: reduxState.surveys };
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
