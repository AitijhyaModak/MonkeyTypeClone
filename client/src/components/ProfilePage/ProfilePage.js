import ProfileCard from "./ProfileCard";
import WPMcard from "./WPMcard";
import UserWPM from "./UserWPM";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserDataAPI } from "../../actions/userAPI";
import { logout } from "../../state/userSlice";

export default function ProfilePage({
  setProfilePage,
  setForm,
  setTypePage,
  setResultPage,
  setLeaderBoard,
}) {
  const userDataToken = useSelector((state) => state.userReducer.userData);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("h");
    async function getData() {
      if (userDataToken) {
        const returnVal = await getUserDataAPI(userDataToken);

        if (returnVal && returnVal.status === 200)
          setUserData(returnVal.data.userData);
        else {
          setProfilePage(false);
          setResultPage(false);
          setForm(true);
          setTypePage(false);
          setLeaderBoard(false);
          dispatch(logout());
        }
      }
      return;
    }
    getData();
  }, [userDataToken]);

  return (
    <div className=" p-5">
      <ProfileCard data={userData}></ProfileCard>
      <WPMcard data={userData}></WPMcard>
      <UserWPM data={userData}></UserWPM>
    </div>
  );
}
