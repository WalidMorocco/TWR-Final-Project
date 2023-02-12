import useLocation from "../hooks/useLocation";
import { Filters } from "../components/Filters/Filters";
import { Search } from "../components/Search/Search";
import { StoresList } from "../components/StoresList";
import { ScrollBox } from "../components/ScrollBox/ScrollBox";
import { useRef, useEffect} from "react";
import { Reviews } from "../components/Reviews/Reviews";

export const HomePage = () => {
  const location = useLocation();

  return (
    <>
      <Filters />
      <Search />

      {/* {location.loaded && <StoresList location={location} />} */}

      {/* <Reviews/> */}
      {/**<ScrollBox/>**/}
    </>
  );
};

export default HomePage;
