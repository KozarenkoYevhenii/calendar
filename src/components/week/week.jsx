import React from "react";
import "./week.css";

const Week = (props) => {
  let hours = [];
  for (let i = 0; i <= 23; i++) {
    hours = [...hours, `${i}:00`];
  }
  return (
    <div className="calendar">
      <header>
        <div className="user-info">
          <h3>{props.name}</h3>
        </div>
        <div className="calendar-title">
          <div className="icon secondary">‹</div>
          <h1 className="icon-header">
            <strong>18 JAN – 24 JAN</strong> 2016
          </h1>
          <div className="icon secondary">›</div>
        </div>
        <div className="log">
          {!props.name && (
            <button className="log-button" onClick={props.signIn}>
              Log in
            </button>
            
          )}
          <button onClick={props.getList}>Get list</button>
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
              <th>Mon, 18</th>
              <th>Tue, 19</th>
              <th className="today">Wed, 20</th>
              <th>Thu, 21</th>
              <th>Fri, 22</th>
              <th className="secondary">Sat, 23</th>
              <th className="secondary">Sun, 24</th>
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
