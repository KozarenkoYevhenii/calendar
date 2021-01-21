import React from "react";
import Week from "./week";
import {
  REACT_APP_GOOGLE_CLIENT_ID,
  API_KEY,
  DISCOVERY_DOCS,
  SCOPES,
} from "../../api/config";

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
          this.getEvents("primary"); //response.result.items[2].id
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
          this.setState({ events: response.result.items });
          console.log(response.result.items);
        },
        (reason) => {
          console.log("Error: " + reason.result.error.message);
        }
      );
  };
  initClient = () => {
    window.gapi.client
      .init({
        apiKey: API_KEY,
        clientId: REACT_APP_GOOGLE_CLIENT_ID,
        scope: SCOPES,
        discoveryDocs: DISCOVERY_DOCS,
      })
      .then(() => {
        const googleAuth = window.gapi.auth2.getAuthInstance();
        googleAuth.signIn().then((googleUser) => {
          const profile = googleUser.getBasicProfile();
          this.setState({
            name: profile.getName(),
            isAuth: true,
          });
          this.getCalendarList();
        }, this._onError);
      });
  };
  signIn = () => {
    window.gapi.load("client:auth2", this.initClient);
  };
  signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.setState({
        name: null,
        isAuth: false,
      });
    });
  };
  createEvent = (hour, date, month, year) => {
    console.log(this.state.events);
    const summary = prompt("Enter summary for event");
    summary &&
      window.gapi.client.calendar.events
        .insert({
          calendarId: "primary",
          resource: {
            end: {
              dateTime: `${year}-${
                month > 9 ? month : "0" + (month + 1)
              }-${date}T${hour + 1}:00:00+02:00`,
            },
            start: {
              dateTime: `${year}-${
                month > 9 ? month : "0" + (month + 1)
              }-${date}T${hour}:00:00+02:00`,
            },
            summary,
          },
        })
        .execute();
    window.setTimeout(() => this.getEvents("primary"), 500)
  };
  deleteEvent = (eventId) => {
    console.log(this.state.events);
    window.gapi.client.calendar.events.delete({
      calendarId: "primary",
      eventId: eventId,
    }).execute();
    window.setTimeout(() => this.getEvents("primary"), 500)
  };
  handleClick = (eventId, hour, date, month, year) => {
    if (eventId) {
      window.confirm("Delete event?") && this.deleteEvent(eventId);
    } else {
      this.createEvent(hour, date, month, year);
    }
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
        handleClick={this.handleClick}
      />
    );
  }
}

export default WeekContainer;
