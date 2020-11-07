import React from "react";

const SurveyField = (props) => {
  const {
    label,
    input,
    meta: { error, touched },
  } = props;
  console.log("meta ", props.meta);
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};

export default SurveyField;
