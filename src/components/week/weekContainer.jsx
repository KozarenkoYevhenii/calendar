import React from "react";
import Week from "./week";

const REACT_APP_GOOGLE_CLIENT_ID =
  "20406485661-r4d3m1gamht4qlilru5ijhj6doekghuh.apps.googleusercontent.com";
const API_KEY = "AIzaSyDiIYokkSj7GcHHb1yk6QVeJeR5IiiQlNc";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/calendar";

class WeekContainer extends React.Component {
  state = {
    name: null,
    now: new Date(),
    events: null,
    isAuth: false,
  };
  _onError = (err) => {
    console.log("error", err);
  };
  getCalendarList = () => {
    return window.gapi.client
      .request({
        path: "https://www.googleapis.com/calendar/v3/users/me/calendarList",
      })
      .then(
        (response) => {
          this.getEvents("primary")   //response.result.items[2].id
        },
        (reason) => {
          console.log("Error: " + reason.result.error.message);
        }
      );
  };
  getEvents = (calendarId) => {
    return window.gapi.client
      .request({
        path: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?timeMin=${this.state.now.toISOString()}`,
      })
      .then(
        (response) => {
          this.setState({events : response.result.items})
          console.log(this.state.events);
        },
        (reason) => {
          console.log("Error: " + reason.result.error.message);
        }
      );
  }
  initClient = () => {
    window.gapi.client.init({
      apiKey: API_KEY,
      clientId: REACT_APP_GOOGLE_CLIENT_ID,
      scope: SCOPES,
      discoveryDocs: DISCOVERY_DOCS,
    }).then(() => {
      const googleAuth = window.gapi.auth2.getAuthInstance();
      googleAuth.signIn().then((googleUser) => {
        const profile = googleUser.getBasicProfile();
          this.setState({
            name: profile.getName(),
          });
        this.getCalendarList()
      }, this._onError)
    })
  };
  signIn = () => {
    window.gapi.load("client:auth2", this.initClient);
    this.setState({
      isAuth: true
    });
  };
  signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.setState({
        name: null,
        isAuth: false
      });
    });
  };
  nextWeek = () =>
    this.setState({ now: new Date(Date.parse(this.state.now) + 604800000) });
  prevWeek = () => this.setState({ now: new Date(this.state.now - 604800000) });
  render() {
    const { name, now } = this.state;
    return (
      <Week
        signIn={this.signIn}
        signOut={this.signOut}
        name={name}
        now={now}
        nextWeek={this.nextWeek}
        prevWeek={this.prevWeek}
        events={this.state.events}
        isAuth={this.state.isAuth}
      />
    );
  }
}

export default WeekContainer;
