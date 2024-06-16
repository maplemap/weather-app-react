// import {routes as authorizationsRoutes} from './routes';
import {SearchBar} from '@/components/search-bar';

export const ForecastPage = () => {
  return (
    <div>
      <SearchBar
        onChange={(query) => console.log('SearchBar.onChange', query)}
      />
    </div>
  );
};
