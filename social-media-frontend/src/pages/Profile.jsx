import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "./NavBar";
import FriendList from "./../components/widgets/FriendList";
import MyPost from "./../components/widgets/MyPost";
import Posts from "./../components/widgets/AllPosts";
import User from "./../components/widgets/User";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data) {
        setUser(data);
      } else {
        throw error;
      }
    } catch (error) {
      console.error("error during user details");
    }
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <User userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendList userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          // mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* <MyPost picturePath={user.picturePath} /> */}
          {/* <Box m="2rem 0" /> */}
          <Posts userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
