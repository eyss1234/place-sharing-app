import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [{id:'u1', name:'Em', image:'https://source.unsplash.com/hwLAI5lRhdM', places:3}];

  return <UsersList items={USERS} />
};

export default Users;
