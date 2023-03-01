import { Filters } from "../components/Filters/Filters";
import { Search } from "../components/Search/Search";
import { StoresList } from "../components/StoresList";
import { ScrollBox } from "../components/ScrollBox/ScrollBox";
import { useContext, useState } from "react";
import { LocationContext } from "../context/LocationContext";

export const HomePage = () => {
  const { settings, loading } = useContext(LocationContext);
  const [filter, setFilter] = useState(null);

  const onFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <>
      <Filters filter={filter} onFilterChange={onFilterChange} />
      <Search />
      <ScrollBox>
        {!loading && <StoresList locationSettings={settings} filter={filter} />}
      </ScrollBox>
    </>
  );
};

export default HomePage;
