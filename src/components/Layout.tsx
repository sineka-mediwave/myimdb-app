import { useEffect } from "react";
import React from "react";
import Nav from "../components/Nav";

interface ILayout {
  title: string;
  children?: React.ReactNode;
}
const Layout: React.FC<ILayout> = ({ title, children }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return (
    <>
      <Nav />
      <main className="container-fluid">{children}</main>
    </>
  );
};

export default Layout;
