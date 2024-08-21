import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state/cart";
import Item from "../../components/Item";
import constants from "../../constants.json";
import { Box, CircularProgress, Alert, Pagination } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const containerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, 300px)",
  gridAutoRows: "480px",
  gap: "16px",
};

const ShoppingList = ({ filters }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Track total pages from the API

  const itemsPerPage = 12;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  async function getItems() {
    try {
      const response = await fetch(
        `${constants.backendUrl}/api/items?populate=images${filters}&fields[0]=name&fields[1]=price&fields[2]=onSale&fields[3]=discount&fields[4]=product_types&pagination[pageSize]=${itemsPerPage}&pagination[page]=${page}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const itemsJson = await response.json();
      console.log("Items Json", itemsJson);

      // Set items in Redux store
      dispatch(setItems(itemsJson.data));

      // Update total pages
      setTotalPages(itemsJson.meta.pagination.pageCount);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    getItems();
  }, [filters, page]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box mb={10}>
      {items && items.length === 0 ? (
        <Alert
          severity="error"
          sx={{
            mx: 2,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <strong>No Results</strong>
          <p>Sorry, no product matches that name.</p>
        </Alert>
      ) : (
        <div>
          <div style={containerStyle}>
            {items.map((item) => (
              <Item item={item} key={`${item.attributes.name}-${item.id}`} />
            ))}
          </div>

          {totalPages > 1 && (
                <ThemeProvider theme={darkTheme}>
                  <CssBaseline />
            <Box display="flex" justifyContent="center" mt={4} >
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                
              />
            </Box>
            </ThemeProvider>
          )}
        </div>
      )}
    </Box>
  );
};

export default ShoppingList;
