import React, { Component } from "react";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      signInFailed: false,
      emptyFormFields: {
        status: false,
        response: "",
      },
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user === "Error: Incorrect Form Submission!") {
          const { signInEmail, signInPassword } = this.state;
          const formField = [];
          if (!signInEmail) formField.push("Email");
          if (!signInPassword) formField.push("Password");

          const formList = formField.map((field) => (
            <li key={field}>{field}</li>
          ));

          const markup = (
            <div className="lh-copy ba bw2 b--dark-red mt3 bg-light-red f6 fw8 dark-red db">
              Oops! The following field(s) were left empty:
              <br />
              <ul className="f6 fw8 dark-red db tj">{formList}</ul>
            </div>
          );

          this.setState({
            emptyFormFields: {
              status: true,
              response: markup,
            },
          });
        } else {
          if (user.id) {
            this.props.loadUser(user);
            this.props.onRouteChange("home");
          } else {
            this.setState({ signInFailed: true });
          }
        }
      });
  };

  render() {
    const { signInFailed, emptyFormFields } = this.state;
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p className="f6 fw6 black db">
                Not Registered? Click "Register" above.
              </p>
            </div>
            {signInFailed && (
              <div className="lh-copy mt3">
                <p className="f6 fw6 red db">
                  User not found! Please register!
                </p>
              </div>
            )}
            {emptyFormFields.status && emptyFormFields.response}
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
