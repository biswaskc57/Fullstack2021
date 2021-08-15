/* eslint-disable react/jsx-key */
import React from "react";

const UserInfo = ({ userList, match }) => {
  console.log(userList);
  console.log(match.params.id);

  const user = match
    ? userList.find((user) => user.id === match.params.id)
    : null;
  console.log(user);

  if (!user) {
    return null;
  }
  return (
    <div>
      <h1>
        {user.name} {"'s blog"}:
      </h1>
      <h3>Added blogs:</h3>
      <ul>
        {user.blogs.map((user) => (
          <li key={user.id}>{user.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserInfo;
