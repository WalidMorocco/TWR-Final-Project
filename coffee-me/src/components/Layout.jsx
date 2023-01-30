import { Outlet, redirect } from 'react-router-dom';
import { Navbar } from './Navbar/Navbar';
import { Footer } from "../components/Footer/Footer";

export const Layout = () => {
  return (
    <div style={{backgroundColor:'#D9BBA9'}}>
      <Navbar/>
      <Outlet />
      <Footer/>
    </div>
  );
};
