import React from "react";

const SurveyField = (props) => {
  //console.log("SurveyField input callback ", props.input);
  const eventHandler = props.input;
  return (
    <div>
      <input {...eventHandler} />
    </div>
  );
};

export default SurveyField;
