import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";

export const updateAuth = () => async (dispatch) => {
  const result = await axios.get("/api/current_user");
  //console.log(result.data);
  dispatch({ type: FETCH_USER, payload: result.data });
};

export const handleToken = (token) => async (dispatch) => {
  const result = await axios.post("/api/stripe", token);
  console.log(result.data);
  dispatch({ type: FETCH_USER, payload: result.data });
};

export const submitSurvey = (formValues, routerHistory) => async (dispatch) => {
  const result = await axios.post("/api/surveys", formValues);
  routerHistory.push("/surveys");
  dispatch({ type: FETCH_USER, payload: result.data });
};

export const fetchSurveys = () => async (dispatch) => {
  const result = await axios.get("/api/surveys");
  dispatch({ type: FETCH_SURVEYS, payload: result.data });
};
