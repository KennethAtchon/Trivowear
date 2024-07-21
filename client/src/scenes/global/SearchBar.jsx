import React, { useState } from 'react';
import { Drawer, Box, TextField, IconButton } from '@mui/material';
import { MdSearch, MdClose } from 'react-icons/md'; // Import the MdClose icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SearchBar = ({ open, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const performSearch = () => {
    // Navigate to SearchPage with the search query
    navigate(`/searchpage?query=${encodeURIComponent(searchQuery)}`);
    onClose(); // Close the drawer after navigation
  };

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  };

  return (
    <Drawer anchor="top" open={open} onClose={onClose}>
      <Box
        display="flex"
        alignItems="center"
        p={1}
        px={4}
        bgcolor="white"
        boxShadow={1}
        width="100%"
        position="relative" // Ensure the Box is positioned relative
      >
        <IconButton
          onClick={onClose}
          style={{
            position: 'absolute', // Position the close button absolutely
            top: '50%',
            right: 40,
            transform: 'translateY(-50%)',
            zIndex: 1, // Ensure the button is above other elements
          }}
        >
          <MdClose />
        </IconButton>
        <TextField
          fullWidth
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <IconButton onClick={performSearch}>
                <MdSearch />
              </IconButton>
            ),
          }}
          style={{ paddingRight: 56 }} // Add padding to the right for space for the close button
        />
      </Box>
    </Drawer>
  );
};

export default SearchBar;
