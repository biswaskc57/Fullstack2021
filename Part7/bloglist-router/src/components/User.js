/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import { initialUsers } from "../reducers/userInfoReducer";
import { useDispatch, useSelector } from "react-redux";

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userList);
  useEffect(() => {
    const user = dispatch(initialUsers());
    console.log(user);
  }, [dispatch]);

  console.log(user);

  if (user === null) {
    return <div></div>;
  } else
    return (
      <div>
        <h1>Blogs</h1>

        {user.map((user) => (
          <ul key={user.id}>
            <li>{user.name}</li>
          </ul>
        ))}
      </div>
    );
};

export default User;
