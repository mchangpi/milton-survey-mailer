import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

//testing in the browser
import axios from "axios";
window.axios = axios;
const survey = {
  title: "my title",
  subject: "Give Us feedback",
  body: "We would love the hear you if you enjoy our services",
  recipients: "mchangpi@gmail.com",
};

const initState = {};

const store = createStore(reducers, initState, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

//console.log("stripe public key ", process.env.REACT_APP_STRIPE_PUBLIC_KEY);
