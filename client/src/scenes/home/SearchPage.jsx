import React from 'react';
import { useLocation } from 'react-router-dom';
import ShoppingList from './ShoppingList';

const SearchPage = () => {
  const location = useLocation();

  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query') || ''; // Get the 'query' parameter

  // Construct the filters string for Strapi
  const filters = `filters[name][$contains]=${encodeURIComponent(query)}`;

  return (
    <div className='mt-20'>
      <p className="text-[48px] font-bold text-center">Search Results</p>
      <ShoppingList filters={filters} />
    </div>
  );
};

export default SearchPage;
