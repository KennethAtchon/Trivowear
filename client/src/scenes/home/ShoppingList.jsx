import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";
import Item from "../../components/Item";
import constants from "../../constants.json";

const ShoppingList = ({ filters }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  async function getItems() {
    const items = await fetch(
      `${constants.backendUrl}/api/items?populate=images&${filters}`,
      { method: "GET" }
    );
    
    const itemsJson = await items.json();
    console.log(itemsJson)
    dispatch(setItems(itemsJson.data));
  }

  useEffect(() => {
    getItems();
  }, [filters]); // Re-run when filters change

  return (
    <div className="w-auto my-10">
      <div
        className="grid justify-center gap-6 "
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))" }}
      >
        {
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))
        }
      </div>
    </div>
  );
};

export default ShoppingList;
