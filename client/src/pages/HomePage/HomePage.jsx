import { Filters } from '../../components/Filters/Filters';
import { Search } from '../../components/Search/Search';
import { StoresList } from '../../components/StoresList/StoresList';
import { ScrollBox } from '../../components/ScrollBox/ScrollBox';
import { useContext, useState } from 'react';
import { LocationContext } from '../../context/LocationContext';
import { TopLocation } from '../../components/TopLocation/TopLocation';
import './styles.css';

export const HomePage = () => {
  const { settings, loading } = useContext(LocationContext);
  const [filter, setFilter] = useState(
    sessionStorage.getItem('lastSetFilter') ?? 'aroundyou'
  );

  const onFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <>
      <div className='home-container'>
        <div className='home-content'>
          <TopLocation locationSettings={settings} />
          <Filters
            filter={filter}
            onFilterChange={onFilterChange}
          />
          {!loading && <Search />}
          <ScrollBox>
            {!loading && (
              <StoresList
                locationSettings={settings}
                filter={filter}
              />
            )}
          </ScrollBox>
        </div>
      </div>
    </>
  );
};

export default HomePage;
