import React from "react";
import "./week.css";

const Week = (props) => {
  let hours = [];
  for (let i = 0; i <= 23; i++) {
    hours = [...hours, `${i}:00`];
  }
  
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const datesOfWeek = [];
  const today = new Date()
  const now = props.now;
  const currentDate = now.getDate();
  const currentDay = now.getDay();
  const currentWeekDay = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(now)
  const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(now)
  
  switch (currentDay) {
    case 0:
      for (let i = 0; i < 7; i++) datesOfWeek[i] = currentDate - (i + 6);
      break;
    case 1:
      for (let i = 0; i < 7; i++) datesOfWeek[i] = currentDate + i;
      break;
    case 2:
      for (let i = 0; i < 7; i++) datesOfWeek[i] = currentDate + i - 1;
      break;
    case 3:
      for (let i = 0; i < 7; i++) datesOfWeek[i] = currentDate + i - 2;
      break;
    case 4:
      for (let i = 0; i < 7; i++) datesOfWeek[i] = currentDate + i - 3;
      break;
    case 5:
      for (let i = 0; i < 7; i++) datesOfWeek[i] = currentDate + i - 4;
      break;
    case 6:
      for (let i = 0; i < 7; i++) datesOfWeek[i] = currentDate + i - 5;
      break;
    default:
      console.log("date error");
  }

  return (
    <div className="calendar">
      <header>
        <div className="user-info">
          <h3>{props.name}</h3>
        </div>
        <div className="calendar-title">
          <button className="icon secondary" onClick={props.prevWeek}>‹</button>
          <h1 className="icon-header">
            <strong>{datesOfWeek[0] +" "+ currentMonth} – {datesOfWeek[6] +" "+ currentMonth} </strong> {now.getFullYear()}
          </h1>
          <button className="icon secondary" onClick={props.nextWeek}>›</button>
        </div>
        <div className="log">
          {!props.name && (
            <button className="log-button" onClick={props.signIn}>
              Log in
            </button>
          )}
          {!!props.name && (
            <button className="log-button" onClick={props.signOut}>
              Log out
            </button>
          )}
        </div>
      </header>
      <div className="outer">
        <table>
          <thead>
            <tr>
              <th className="headcol"></th>
              {daysOfWeek.map((day, index) => {
                let className = "";
                if (index === 5 || index === 6) className = "secondary";
                if (today.getDate() === currentDate && daysOfWeek[index] === currentWeekDay )
                  className = "today";
                return (
                  <th className={className}>
                    {day}, {datesOfWeek[index]}
                  </th>
                );
              })}
            </tr>
          </thead>
        </table>
        <div className="wrap">
          <table className="offset">
            <tbody>
              {hours.map((hour) => {
                return (
                  <tr>
                    <td className="headcol">{hour}</td>
                    <td></td>
                    <td></td>
                    <td className="past"></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                );
              })}
              {/* <tr>
                <td className="headcol"></td>
                <td></td>
                <td className="now"></td>
                <td></td>
                <td></td>
                <td>
                  <div className="event double">
                    <input id="check" type="checkbox" className="checkbox" />
                    <label htmlFor="check"></label>8:30–9:30 Yoga
                  </div>
                </td>
                <td></td>
                <td></td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Week;
