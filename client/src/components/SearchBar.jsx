import React, { useEffect, useState } from 'react'
import { IconButton, InputBase, useMediaQuery, useTheme } from "@mui/material";


import { Search } from "@mui/icons-material";
import FlexBetween from './FlexBetween';

const SearchBar = ({onSearch}) => {
const [enteredName, setEnteredName] = useState("");
// const [placeholder, setPlaceholder] = useState("Search...");
const [isEnteredName, setIsEnteredName] = useState(false);

const onValidUsername = (val) => {
  const usernameRegex = /^[a-z0-9_.]+$/
  return usernameRegex.test(val)
}

useEffect(() => {
  const isEmpty = enteredName === "";
  // console.log(isValid);
  setIsEnteredName(isEmpty)
},[enteredName])

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;

  const handleSearch = () => {
    const isValid = onValidUsername(enteredName);
    if(!isValid) {
      // setPlaceholder("Incorrect username");
      return
    };
    onSearch(enteredName);
  }

  return (
    <>
      {isNonMobileScreens && (
        <FlexBetween
          backgroundColor={neutralLight}
          borderRadius="9px"
          gap="3rem"
          padding="0.1rem 1.5rem"
        >
          <InputBase placeholder="Search..." value={enteredName} onChange={e => setEnteredName(e.target.value)}/>
          <IconButton disabled={isEnteredName} onClick={handleSearch}>
            <Search />
          </IconButton>
        </FlexBetween>
      )}
    </>
  )
}

export default SearchBar