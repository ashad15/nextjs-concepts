"use client";

import { useState, ReactNode, createContext, useContext } from "react";
import Modal from "../modal/Modal";

type contextType = Record<string, any>;

export const UserContainerContext = createContext<contextType | null>(null);

type UserContainerType = React.FC<{ children: ReactNode }> & {
  UserCard: React.FC<{ user: Record<string, string> }>;
};

const UserCard = function ({ user }: { user: Record<string, string> }) {
  const containerContext = useContext(UserContainerContext);
  if (containerContext === null) {
    return null;
  }
  return (
    <section style={{ margin: "20px" }}>
      <h1>{user.name}</h1>
      <button onClick={() => containerContext.setCurrentSelectedUser(user)}>
        {" "}
        getDetails
      </button>
    </section>
  );
};

const UserContainer: UserContainerType = Object.assign(
  function ({ children }: { children: ReactNode }) {
    const [currentSelectedUser, setCurrentSelectedUser] =
      useState<null | Record<any, any>>(null);

    return (
      <div>
        <UserContainerContext.Provider
          value={{ setCurrentSelectedUser, currentSelectedUser }}
        >
          <h1>this page containerer</h1>
          {children}
          {!currentSelectedUser ? null : currentSelectedUser?.id ? (
            <Modal />
          ) : null}
        </UserContainerContext.Provider>
      </div>
    );
  },
  { UserCard },
);

export default UserContainer;
