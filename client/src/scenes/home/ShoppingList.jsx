import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state/cart";
import Item from "../../components/Item";
import constants from "../../constants.json";
import { Box, CircularProgress, Alert, Typography, Button } from "@mui/material";

const ShoppingList = ({ filters }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(8);
  const [totalCount, setTotalCount] = useState(0);

  async function getItems() {
    const accurateCount = totalCount !== 0 ? Math.min(totalCount, displayCount) : displayCount;

    const response = await fetch(
      `${constants.backendUrl}/api/items?populate=images&${filters}&fields[0]=name&fields[1]=price&fields[2]=shortDescription&fields[3]=onSale&fields[4]=discount&fields[5]=product_types&pagination[pageSize]=${accurateCount}`,
      { method: "GET" }
    );

    const itemsJson = await response.json();
    console.log(itemsJson)
    dispatch(setItems(itemsJson.data));
    setTotalCount(itemsJson.meta.pagination.total)
    setLoading(false);
  }

  useEffect(() => {
    getItems();
  }, [filters, displayCount]); // Re-run when filters change

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const handleShowMore = () => {
    setDisplayCount(displayCount + 8);
  };

  return (
    <Box mb={10}>
      {items && items.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: "30vh"
          }}
        >
          <Alert severity="error">
            <Typography variant="h6" component="strong">No Results</Typography>
            <Typography variant="body1">
              Sorry, no product matches that name.
            </Typography>
          </Alert>
        </Box>
      ) : (
        <div className="flex flex-row gap-6 flex-wrap sm:justify-start justify-center">
          {items.slice(0, displayCount).map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
          {displayCount < totalCount && (
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 4 }}>
                            <button
                className="py-2 px-12 text-[#B88E2F] text-lg bg-white text-[16px] border border-[#B88E2F]"
                onClick={handleShowMore}
              >
                
                show More
              </button>
            </Box>
          )}
        </div>
      )}
    </Box>
  );
};

export default ShoppingList;
