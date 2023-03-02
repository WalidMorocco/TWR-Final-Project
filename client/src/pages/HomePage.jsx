import { Filters } from "../components/Filters/Filters";
import { Search } from "../components/Search/Search";
import { StoresList } from "../components/StoresList";
import { ScrollBox } from "../components/ScrollBox/ScrollBox";
import { useContext, useState } from "react";
import { LocationContext } from "../context/LocationContext";
import { Reviews } from "../components/Reviews/Reviews";

export const HomePage = () => {
  const { settings, loading } = useContext(LocationContext);
  const [filter, setFilter] = useState(null);

  const onFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <>
      {/* <Reviews/> */}
      <Filters filter={filter} onFilterChange={onFilterChange} />
      {/* {!loading && <Search location={settings.location} />} */}
      <ScrollBox>
        {!loading && <StoresList locationSettings={settings} filter={filter} />}
      </ScrollBox>
    </>
  );
};

export default HomePage;
