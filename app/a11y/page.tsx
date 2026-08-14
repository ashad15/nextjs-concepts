"use client"
import { useState } from "react";
import UserContainer from "./userContainer/UserContainer";
import { userInfo } from "./const/constant";

function UserInformation() {
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  return (
    <div style={{minHeight: '100vh', display : 'flex', alignItems : 'center', justifyContent : 'center'}}>
      <div
        style={{
            backgroundColor: "grey",
            width: "600px",
          height: "600px",
          display: "flex",
          flexDirection : 'column',
          alignItems: "center",
          background : 'pink'
        }}
      >
        <header>This page contain user info of the system</header>
        <UserContainer>
          {userInfo.map((user, index) => (
            <UserContainer.UserCard  key={user?.id} user={user}></UserContainer.UserCard>
          ))}
        </UserContainer>
      </div>
    </div>
  );
}

export default UserInformation;
