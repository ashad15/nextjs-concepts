"use client"

import Tabs from "./TabList";

export default function () {
    console.log(Tabs);
  return (
    <div>
      <Tabs defaultTab="home">
        <Tabs.List>
          <Tabs.Tab id="home">Home</Tabs.Tab>
          <Tabs.Tab id="profile">Profile</Tabs.Tab>
          <Tabs.Tab id="settings">Settings</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel id="home">
          <h1>Home Page</h1>
        </Tabs.Panel>

        <Tabs.Panel id="profile">
          <h1>Profile Page</h1>
        </Tabs.Panel>

        <Tabs.Panel id="settings">
          <h1>Settings Page</h1>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
