import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payments extends Component {
  render() {
    //debugger;
    return (
      <StripeCheckout
        name="Survey Mailer (Test mode)"
        description={`Use test card: 4242 4242 4242 4242`}
        amount={500}
        token={(token) => {
          this.props.handleToken(token);
        }}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
      >
        <button className="teal lighten-2 btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
