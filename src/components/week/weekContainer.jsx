import React from "react";
import Week from "./week";

const REACT_APP_GOOGLE_CLIENT_ID =
  "20406485661-r4d3m1gamht4qlilru5ijhj6doekghuh.apps.googleusercontent.com";
const API_KEY = "AIzaSyCiS_806-6e_UcHcRw_jQm51Cc3kr4JDaU";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.readonly",
  "https://www.googleapis.com/auth/plus.login",
];

class WeekContainer extends React.Component {
  state = {
    name: null,
  };
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
          clientId: REACT_APP_GOOGLE_CLIENT_ID,
        })
        .then(_onInit, _onError);
    });
    window.gapi.load("client", function () {
      window.gapi.client
        .init({
          apiKey: API_KEY,
          clientId: REACT_APP_GOOGLE_CLIENT_ID,
          scope: SCOPES,
          discoveryDocs: DISCOVERY_DOCS,
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
      });
    });
  };
  signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.setState({
        name: null,
      });
    });
  };
  getCalendarList = () => {
    return window.gapi.client
      .request({
        path: "https://www.googleapis.com/calendar/v3/users/me/calendarList",
        scope: SCOPES,
      })
      .then(
        (response) => {
          console.log(response.result);
        },
        (reason) => {
          console.log("Error: " + reason.result.error.message);
        }
      );
  };

  render() {
    const { name } = this.state;
    return (
      <Week
        signIn={this.signIn}
        signOut={this.signOut}
        name={name}
        getList={this.getCalendarList}
      />
    );
  }
}

export default WeekContainer;
