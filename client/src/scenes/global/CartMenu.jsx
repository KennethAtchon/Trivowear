import { useSelector, useDispatch } from "react-redux";
import { FiX, FiPlus, FiMinus } from "react-icons/fi";
import { decreaseCount, increaseCount, removeFromCart, setIsCartOpen } from "../../state/cart";
import { useNavigate } from "react-router-dom";
import constants from "../../constants.json"; // Adjust the path as per your project structure

// Import MUI components
import {
  Drawer,
  IconButton,
  Typography,
  Box,
  Button,
  Divider,
} from '@mui/material';

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  // console.log(cart);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price;
  }, 0).toFixed(2);

  return (
    <Drawer
      anchor="right"
      open={isCartOpen}
      onClose={() => dispatch(setIsCartOpen({}))}
    >
      <Box p={3} width="450px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">SHOPPING BAG ({cart.length})</Typography>
          <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
            <FiX />
          </IconButton>
        </Box>

        {/* CART LIST */}
        <Box>
          {cart.map((item) => (
            <Box key={`${item.attributes.name}-${item.id}`} mb={3}>
              <Box display="flex" p={2}>
                <Box flex="1">
                  <img
                    alt={item?.name}
                    className="object-fit"
                    style={{ width: "auto", height: "164px" }}
                    src={`${constants.backendUrl}${item?.attributes?.images?.data[0]?.attributes?.formats?.medium?.url}`}
                  />
                </Box>
                <Box flex="1" ml={2}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6">{item.attributes.name}</Typography>
                    <IconButton onClick={() => dispatch(removeFromCart({ id: item.id }))}>
                      <FiX />
                    </IconButton>
                  </Box>
                  <Typography>{item.attributes.shortDescription[0].children[0].text}</Typography>
                  <Box display="flex" alignItems="center" mt={2}>
                    <Box display="flex" alignItems="center" border="1px solid grey">
                      <IconButton onClick={() => dispatch(decreaseCount({ id: item.id }))}>
                        <FiMinus />
                      </IconButton>
                      <Typography>{item.count}</Typography>
                      <IconButton onClick={() => dispatch(increaseCount({ id: item.id }))}>
                        <FiPlus />
                      </IconButton>
                    </Box>
                    <Typography variant="h6" ml={2}>${item.attributes.price}</Typography>
                  </Box>
                </Box>
              </Box>
              <Divider />
            </Box>
          ))}
        </Box>

        {/* ACTIONS */}
        <Box mt={3}>
          <Box display="flex" justifyContent="space-between" m={2}>
            <Typography variant="h6">SUBTOTAL</Typography>
            <Typography variant="h6">${totalPrice}</Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              navigate("/checkout");
              dispatch(setIsCartOpen({}));
            }}
          >
            CHECKOUT
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartMenu;
