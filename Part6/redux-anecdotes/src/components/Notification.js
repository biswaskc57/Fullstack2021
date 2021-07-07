import React from "react";

import { connect } from "react-redux";
const Notification = (props) => {
  console.log(props.notification);
  let notification = props.notification;
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  if (notification !== null) return <div style={style}>{notification}</div>;
  else return <div></div>;
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};
const ConnectedNotifications = connect(mapStateToProps)(Notification);
export default ConnectedNotifications;
