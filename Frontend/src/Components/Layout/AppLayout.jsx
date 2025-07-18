import React from 'react'
import SideBar from '../Common/SideBar'

const AppLayout = ({ showSideBar, children }) => {
  return (
    <div className="flex max-h-screen gap-4">
      {showSideBar && <SideBar />}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default AppLayout;
