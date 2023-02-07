import useLocation from "../hooks/useLocation";
import { Filters } from "../components/Filters/Filters";
import { Search } from "../components/Search/Search";
import { StoresList } from "../components/StoresList";
import { ScrollBox } from "../components/ScrollBox/ScrollBox";

export const HomePage = () => {
  const location = useLocation();

  return (
    <>
      <Filters />
      <Search />
      {location.loaded && <StoresList location={location} />}
      {/**<ScrollBox/>**/}
    </>
  );
};

export default HomePage;
