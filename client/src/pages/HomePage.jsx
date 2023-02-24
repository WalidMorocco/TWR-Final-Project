import useLocation from "../hooks/useLocation";
import { Filters } from "../components/Filters/Filters";
import { Search } from "../components/Search/Search";
import { StoresList } from "../components/StoresList";
import { ScrollBox } from "../components/ScrollBox/ScrollBox";
import { useState } from "react";

export const HomePage = () => {
  const { loaded, coordinates } = useLocation();

  const [filter, setFilter] = useState(null);

  const onFilterChange = (selectedFilter) => {
    console.log(selectedFilter);
    setFilter(selectedFilter);
  };

  const location = useLocation();
  
  return (
    <>
      <Filters onFilterChange={onFilterChange} />
      {/* <Search /> */}
      {location.loaded && <Search location={location}/>}
      <ScrollBox>
        {loaded && <StoresList location={coordinates} filter={filter} />}
      </ScrollBox>
    </>
  );
};

export default HomePage;
