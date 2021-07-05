import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  let notification = useSelector((state) => state.notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  if (notification !== null) return <div style={style}>{notification}</div>;
  else return <div></div>;
};

export default Notification;
