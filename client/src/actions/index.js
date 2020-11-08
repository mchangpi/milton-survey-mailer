import axios from "axios";
import { FETCH_USER, SUBMIT_SURVEY } from "./types";

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

export const submitSurvey = (values) => {
  return { type: SUBMIT_SURVEY };
};
