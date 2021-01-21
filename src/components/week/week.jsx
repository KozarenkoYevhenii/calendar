import React from "react";
import "./week.css";

const Week = ({
  name,
  prevWeek,
  nextWeek,
  signIn,
  signOut,
  isAuth,
  events,
  now,
  handleClick,
}) => {
  let hours = [];
  for (let i = 0; i <= 23; i++) {
    hours = [...hours, `${i}:00`];
  }

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const datesOfWeek = [];
  const today = new Date();
  const currentDate = now.getDate();
  const currentDay = now.getDay();
  const currentWeekDay = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(now);
  const currentMonth = new Intl.DateTimeFormat("en-US", {
    month: "short",
  }).format(now);

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
          <h3>{name}</h3>
        </div>
        <div className="calendar-title">
          <button className="icon secondary" onClick={prevWeek}>
            ‹
          </button>
          <h1 className="icon-header">
            <strong>
              {datesOfWeek[0] + " " + currentMonth} – 
              {datesOfWeek[6] + " " + currentMonth}{" "}
            </strong>{" "}
            {now.getFullYear()}
          </h1>
          <button className="icon secondary" onClick={nextWeek}>
            ›
          </button>
        </div>
        <div className="log">
          {!name && (
            <button className="log-button" onClick={signIn}>
              Log in
            </button>
          )}
          {!!name && (
            <button className="log-button" onClick={signOut}>
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
                if (
                  today.getDate() === currentDate &&
                  daysOfWeek[index] === currentWeekDay
                )
                  className = "today";
                return (
                  <th className={className} id={index} key={index}>
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
              {hours.map((hour, hourIndex) => {
                return (
                  <tr id={hourIndex} key={hourIndex}>
                    <td className="headcol" id={hourIndex} key={hourIndex}>
                      {hour}
                    </td>
                    {datesOfWeek.map((date, i) => {
                      if (events && isAuth) {
                        const filteredEvents = events.filter((event) => {
                          const eventDate = new Date(event.start.dateTime);
                          return (
                            eventDate.getHours() === hourIndex &&
                            eventDate.getDate() === date &&
                            eventDate.getMonth() === now.getMonth()
                          );
                        });
                        return (
                          <td
                            id={i}
                            key={i}
                            className={filteredEvents[0] ? "event double" : ""}
                            onClick={() => {handleClick(filteredEvents[0]?.id,  hourIndex,
                                  date,
                                  now.getMonth(),
                                  now.getFullYear() )}}
                          >
                            {filteredEvents[0] ? filteredEvents[0].summary : ""}
                          </td>
                        );
                      } else {
                        return <td id={i} key={i}></td>;
                      }
                    })}
                  </tr>
                );
              })}
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Week;
