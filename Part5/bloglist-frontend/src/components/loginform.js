import React from "react";
export default function Loginform(props) {
  console.log(props.handleLogin);
  console.log(props.username);
  console.log(props.password);
  return (
    <div>
      <form onSubmit={props.handleLogin}>
        <div>
          username
          <input onChange={props.username} />
        </div>
        <div>
          password
          <input type="password" onChange={props.password} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
}
