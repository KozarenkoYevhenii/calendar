import React from "react";
import Week from "./week";

const REACT_APP_GOOGLE_CLIENT_ID =
  "20406485661-r4d3m1gamht4qlilru5ijhj6doekghuh.apps.googleusercontent.com";

class WeekContainer extends React.Component {
    state = {
        name: null,
      }
  componentDidMount() {
    const _onInit = (auth2) => {
      console.log("init OK", auth2);
    };
    const _onError = (err) => {
      console.log("error", err);
    };
    window.gapi.load("auth2", function () {
      window.gapi.auth2
        .init({
          client_id: REACT_APP_GOOGLE_CLIENT_ID,
        })
        .then(_onInit, _onError);
    });
  }
  signIn = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn().then((googleUser) => {
      const profile = googleUser.getBasicProfile();
      this.setState({
        name: profile.getName(),
      })
    });
  };
  signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
        this.setState({
            name: null,
          })
    });
  };
    render() {
        const { name } = this.state
        return <Week signIn={this.signIn} signOut={this.signOut} name={name} />;
  }
}

export default WeekContainer;
