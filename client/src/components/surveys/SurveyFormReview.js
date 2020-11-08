import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";

const SurveyFormReview = (props) => {
  const { onCancel, formValues } = props;
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });
  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button className="yellow darken-3 btn-flat" onClick={onCancel}>
        Back
      </button>
    </div>
  );
};

const mapStateToProps = (reduxState) => {
  //console.log("redux state ", reduxState);
  return { formValues: reduxState.form.surveyForm.values };
};

export default connect(mapStateToProps)(SurveyFormReview);
