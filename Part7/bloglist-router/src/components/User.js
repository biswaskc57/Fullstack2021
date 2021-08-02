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
        <h1>Users</h1>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Blogs</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user) => (
              <tr key={user.id}>
                <td style={{ width: "70%" }}>{user.name}:</td>
                <td style={{ width: "70%" }}> {user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default User;
