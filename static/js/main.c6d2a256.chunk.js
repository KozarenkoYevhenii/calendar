(this.webpackJsonpcalendar=this.webpackJsonpcalendar||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n(1),r=n.n(c),i=n(3),s=n.n(i),o=(n(14),n(15),n(4)),l=n(5),u=n(8),d=n(6),h=n(7),g=(n(16),function(e){for(var t=e.name,n=e.prevWeek,c=e.nextWeek,r=e.signIn,i=e.signOut,s=e.isAuth,o=e.events,l=e.now,u=e.handleClick,d=[],g=0;g<=23;g++)d=[].concat(Object(h.a)(d),["".concat(g,":00")]);var m=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],j=[],w=new Date,v=l.getDate(),f=l.getDay(),b=new Intl.DateTimeFormat("en-US",{weekday:"short"}).format(l),p=new Intl.DateTimeFormat("en-US",{month:"short"}).format(l);switch(f){case 0:for(var O=0;O<7;O++)j[O]=new Date(l.now()-8645e4*(O+6)).getDate();break;case 1:for(var x=0;x<7;x++)j[x]=new Date(l.now()+8645e4*x).getDate();break;case 2:for(var k=0;k<7;k++)j[k]=new Date(l.getTime()+8645e4*(k-1)).getDate();break;case 3:for(var D=0;D<7;D++)j[D]=new Date(l.getTime()+8645e4*(D-2)).getDate();break;case 4:for(var y=0;y<7;y++)j[y]=new Date(l.getTime()+8645e4*(y-3)).getDate();break;case 5:for(var I=0;I<7;I++)j[I]=new Date(l.getTime()+8645e4*(I-4)).getDate();break;case 6:for(var N=0;N<7;N++)j[N]=new Date(l.getTime()+8645e4*(N-5)).getDate();break;default:console.log("date error")}return Object(a.jsxs)("div",{className:"calendar",children:[Object(a.jsxs)("header",{children:[Object(a.jsx)("div",{className:"user-info",children:Object(a.jsx)("h3",{children:t})}),Object(a.jsxs)("div",{className:"calendar-title",children:[Object(a.jsx)("button",{className:"icon secondary",onClick:n,children:"\u2039"}),Object(a.jsxs)("h1",{className:"icon-header",children:[Object(a.jsxs)("strong",{children:[j[0]+" "+p," \u2013\xa0",j[6]+" "+p," "]})," ",l.getFullYear()]}),Object(a.jsx)("button",{className:"icon secondary",onClick:c,children:"\u203a"})]}),Object(a.jsxs)("div",{className:"log",children:[!t&&Object(a.jsx)("button",{className:"log-button",onClick:r,children:"Log in"}),!!t&&Object(a.jsx)("button",{className:"log-button",onClick:i,children:"Log out"})]})]}),Object(a.jsxs)("div",{className:"outer",children:[Object(a.jsx)("table",{children:Object(a.jsx)("thead",{children:Object(a.jsxs)("tr",{children:[Object(a.jsx)("th",{className:"headcol"}),m.map((function(e,t){var n="";return 5!==t&&6!==t||(n="secondary"),w.getDate()===v&&m[t]===b&&(n="today"),Object(a.jsxs)("th",{className:n,id:t,children:[e,", ",j[t]]},t)}))]})})}),Object(a.jsx)("div",{className:"wrap",children:Object(a.jsx)("table",{className:"offset",children:Object(a.jsx)("tbody",{children:d.map((function(e,t){return Object(a.jsxs)("tr",{id:t,children:[Object(a.jsx)("td",{className:"headcol",id:t,children:e},t),j.map((function(e,n){if(o&&s){var c=o.filter((function(n){var a=new Date(n.start.dateTime);return a.getHours()===t&&a.getDate()===e&&a.getMonth()===l.getMonth()}));return Object(a.jsx)("td",{id:n,className:c[0]?"event double":"",onClick:function(){var n;u(null===(n=c[0])||void 0===n?void 0:n.id,t,e,l.getMonth(),l.getFullYear())},children:c[0]?c[0].summary:""},n)}return Object(a.jsx)("td",{id:n},n)}))]},t)}))})})})]})]})}),m="20406485661-r4d3m1gamht4qlilru5ijhj6doekghuh.apps.googleusercontent.com",j="AIzaSyDiIYokkSj7GcHHb1yk6QVeJeR5IiiQlNc",w=["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],v="https://www.googleapis.com/auth/calendar",f=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(o.a)(this,n);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={name:null,now:new Date,events:null,isAuth:!1},e._onError=function(e){console.log("error",e)},e.getCalendarList=function(){return window.gapi.client.request({path:"https://www.googleapis.com/calendar/v3/users/me/calendarList"}).then((function(t){e.getEvents("primary")}),(function(e){console.log("Error: "+e.result.error.message)}))},e.getEvents=function(t){return window.gapi.client.request({path:"https://www.googleapis.com/calendar/v3/calendars/".concat(t,"/events?timeMin=").concat(e.state.now.toISOString())}).then((function(t){e.setState({events:t.result.items})}),(function(e){console.log("Error: "+e.result.error.message)}))},e.initClient=function(){window.gapi.client.init({apiKey:j,clientId:m,scope:v,discoveryDocs:w}).then((function(){window.gapi.auth2.getAuthInstance().signIn().then((function(t){var n=t.getBasicProfile();e.setState({name:n.getName(),isAuth:!0}),e.getCalendarList()}),e._onError)}))},e.signIn=function(){window.gapi.load("client:auth2",e.initClient)},e.signOut=function(){window.gapi.auth2.getAuthInstance().signOut().then((function(){e.setState({name:null,isAuth:!1})}))},e.createEvent=function(t,n,a,c){var r=prompt("Enter summary for event");r&&window.gapi.client.calendar.events.insert({calendarId:"primary",resource:{end:{dateTime:"".concat(c,"-").concat(a>9?a:"0"+(a+1),"-").concat(n,"T").concat(t+1,":00:00+02:00")},start:{dateTime:"".concat(c,"-").concat(a>9?a:"0"+(a+1),"-").concat(n,"T").concat(t,":00:00+02:00")},summary:r}}).execute(),window.setTimeout((function(){return e.getEvents("primary")}),500)},e.deleteEvent=function(t){window.gapi.client.calendar.events.delete({calendarId:"primary",eventId:t}).execute(),window.setTimeout((function(){return e.getEvents("primary")}),500)},e.handleClick=function(t,n,a,c,r){t?window.confirm("Delete event?")&&e.deleteEvent(t):e.createEvent(n,a,c,r)},e.nextWeek=function(){return e.setState({now:new Date(Date.parse(e.state.now)+6048e5)})},e.prevWeek=function(){return e.setState({now:new Date(e.state.now-6048e5)})},e}return Object(l.a)(n,[{key:"render",value:function(){var e=this.state,t=e.name,n=e.now;return Object(a.jsx)(g,{signIn:this.signIn,signOut:this.signOut,name:t,now:n,nextWeek:this.nextWeek,prevWeek:this.prevWeek,events:this.state.events,isAuth:this.state.isAuth,handleClick:this.handleClick})}}]),n}(r.a.Component);var b=function(){return Object(a.jsx)("div",{className:"App",children:Object(a.jsx)(f,{})})},p=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,18)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),a(e),c(e),r(e),i(e)}))};s.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(b,{})}),document.getElementById("root")),p()}},[[17,1,2]]]);
//# sourceMappingURL=main.c6d2a256.chunk.js.map