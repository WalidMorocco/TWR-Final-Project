import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar/Navar';


export const Layout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet />
    </div>
  );
};
