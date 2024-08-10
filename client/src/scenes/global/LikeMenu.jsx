import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiX } from "react-icons/fi";
import { removeFromLikes, setIsLikeMenuOpen } from "../../state/likes"; // Import setIsLikeMenuOpen
import { useNavigate } from "react-router-dom";
import constants from "../../constants.json";

const LikeMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const likedItems = useSelector((state) => state.likes.likedItems);
  const isLikeMenuOpen = useSelector((state) => state.likes.isLikeMenuOpen);
  // console.log(likedItems)

  return (
    <div className={`fixed inset-0 z-50 flex justify-end ${isLikeMenuOpen ? "block" : "hidden"}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => dispatch(setIsLikeMenuOpen(false))}></div>
      <div className="relative bg-white w-96 h-full shadow-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Liked Items</h2>
          <FiX className="cursor-pointer" onClick={() => dispatch(setIsLikeMenuOpen(false))} />
        </div>
        <div className="p-4">
          {likedItems.length > 0 ? (
            likedItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-4">
                <div className="flex flex-row">
                  <div className="w-[120px] h-[96px]">
                    <img
                      alt={item.name}
                      className="w-full h-full object-fit"
                      src={`${constants.backendUrl}${item.attributes.images[0].url}`}
                    />
                  </div>
                  <div className="ml-3 w-full">
                    <h3 className="font-semibold text-[14px] mb-2">{item.attributes.name}</h3>
                  </div>
                </div>
                <div className="flex flex-col items-end pl-3">
                  <FiX className="cursor-pointer text-lg" onClick={() => dispatch(removeFromLikes({ id: item.id }))} />
                </div>
              </div>
            ))
          ) : (
            <p>No items liked yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikeMenu;
