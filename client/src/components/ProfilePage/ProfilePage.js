import ProfileCard from "./ProfileCard";
import WPMcard from "./WPMcard";
import UserWPM from "./UserWPM";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserDataAPI } from "../../actions/userAPI";
import { logout } from "../../state/userSlice";
import { keyframes } from "@emotion/react";
import Reveal from "react-awesome-reveal";
import Loader from "../Loader/Loader";

const Animation = keyframes`
  from {
    opacity: 0;
    transform: translateY(3rem);
  }

  to {
    opacity: 1;
    transform-origin: translateY(0);
  }
}
`;

export default function ProfilePage({
  setProfilePage,
  setForm,
  setTypePage,
  setResultPage,
  setLeaderboard,
}) {
  const userDataToken = useSelector((state) => state.userReducer.userData);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const [isLoading, setIsLoadig] = useState(true);

  useEffect(() => {
    async function getData() {
      if (userDataToken) {
        const res = await getUserDataAPI(userDataToken);
        setIsLoadig(false);
        if (res.status === 200) setUserData(res.data.userData);
        else {
          console.log("sd");
          setProfilePage(false);
          setResultPage(false);
          setForm(true);
          setTypePage(false);
          setLeaderboard(false);
          dispatch(logout());
        }
      }
      return;
    }
    getData();
  }, [userDataToken]);

  return (
    <>
      {isLoading && <Loader></Loader>}
      <Reveal keyframes={Animation} duration={1500}>
        <div className=" p-5">
          <ProfileCard data={userData}></ProfileCard>
          <WPMcard data={userData}></WPMcard>
          <UserWPM data={userData}></UserWPM>
        </div>
      </Reveal>
    </>
  );
}
