import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

const SurveyFormReview = (props) => {
  const { onCancel, formValues, submitSurvey, history } = props;
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name} style={{ marginBottom: "30px" }}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });
  return (
    <div>
      <h6 style={{ marginBottom: "20px" }}>Please confirm your entries:</h6>
      <hr />
      {reviewFields}
      <hr style={{ marginBottom: "20px" }} />
      <button
        className="orange darken-2 btn-flat white-text"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green darken-3 btn-flat right white-text"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = (reduxState) => {
  //console.log("redux state ", reduxState);
  return { formValues: reduxState.form.surveyForm.values };
};

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
