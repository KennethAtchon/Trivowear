
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state/cart";
import Item from "../../components/Item";
import constants from "../../constants.json";
import { Box, CircularProgress, Alert } from "@mui/material";

const containerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, 290px)",
  justifyContent: "center",
  gap: "20px",
};

/**
 * A functional component that renders a shopping list based on the provided filters.
 * It fetches items from the backend API, handles loading and error states, and allows the user to show more items.
 *
 * @param {object} filters - An object containing filters to apply to the shopping list
 * @return {JSX.Element} The rendered shopping list component
 */
const ShoppingList = ({ filters }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(8);
  const [totalCount, setTotalCount] = useState(0);


  /**
   * Fetches items from the backend API based on the provided filters and updates the state.
   *
   * @return {Promise<void>} Resolves when the items are fetched and the state is updated.
   */
  async function getItems() {

    console.log(filters)
    try {

    const response = await fetch(`${constants.backendUrl}/api/items?populate=images${filters}&fields[0]=name&fields[1]=price&fields[2]=shortDescription&fields[3]=onSale&fields[4]=discount&fields[5]=product_types&fields[6]=shippingDetails&fields[7]=optionsProduct&pagination[pageSize]=${displayCount}`,
      { method: "GET" }
    );


    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(response)

    const itemsJson = await response.json();
    console.log("Items Json", itemsJson)
    dispatch(setItems(itemsJson.data));
    setTotalCount(itemsJson.meta.pagination.total)
  } catch (error) {
      console.error("Failed to fetch items:", error);
    
    } finally {
      setLoading(false);
    }

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

  /**
   * Increases the display count by 8, allowing the user to see more items.
   *
   * @return {void} This function does not return anything.
   */
  const handleShowMore = () => {
    setDisplayCount(displayCount + 8);
  };

  return (
    <Box mb={10} >
      {items && items.length === 0 ? (
            <Alert
            severity="error"
            sx={{
              mx: 2,
              borderRadius: 2, // Rounded corners for Alert
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            <strong>No Results</strong>
            <p>Sorry, no product matches that name.</p>
          </Alert>
      ) : (
        <div>

          <div style={containerStyle} >

            {items && items.slice(0, displayCount).map((item) => (
              <Item item={item} key={`${item.name}-${item.id}`} />
            ))}

          </div>

          <div>
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

        </div>

      )}
    </Box>
  );
};

export default ShoppingList;
