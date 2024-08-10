import React from 'react';
import { useLocation } from 'react-router-dom';
import Shop from './ShopAll';

const SearchPage = () => {
  const location = useLocation();

  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query') || ''; // Get the 'query' parameter

  // Construct the filters string for Strapi
  const filters = `&filters[name][$contains]=${encodeURIComponent(query)}`;

  return (
    <>
      <Shop searchQuery={filters} />
    </>
  );
};

export default SearchPage;
