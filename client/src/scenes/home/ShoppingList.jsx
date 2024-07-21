import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state/cart";
import Item from "../../components/Item";
import constants from "../../constants.json";
import { Box, CircularProgress, Alert, Typography } from "@mui/material";

const ShoppingList = ({ filters }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(true);

  async function getItems() {
    const response = await fetch(
      `${constants.backendUrl}/api/items?populate=images&${filters}`,
      { method: "GET" }
    );

    const itemsJson = await response.json();
    dispatch(setItems(itemsJson.data));
    setLoading(false);
  }

  useEffect(() => {
    getItems();
  }, [filters]); // Re-run when filters change

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box my={10}>
      {items.length === 0 ? (
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
        <Box
          display="grid"
          justifyContent="center"
          gap={6}
          justifyItems="center"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))" }}
        >
          {items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ShoppingList;
