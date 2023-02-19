import useLocation from "../hooks/useLocation";
import { Filters } from "../components/Filters/Filters";
import { Search } from "../components/Search/Search";
import { StoresList } from "../components/StoresList";
import { ScrollBox } from "../components/ScrollBox/ScrollBox";
import { useState } from "react";

export const HomePage = () => {
  const location = useLocation();

  const [filter, setFilter] = useState(null);

  const onFilterChange = (selectedFilter) => {
    console.log(selectedFilter);
    setFilter(selectedFilter);
  };

  return (
    <>
      <Filters onFilterChange={onFilterChange} />
      <Search />
      <ScrollBox>
        {location.loaded && <StoresList location={location} filter={filter} />}
      </ScrollBox>
    </>
  );
};

export default HomePage;
