import { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";

export const FunctionalApp = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: "",
  });
  console.log(userData);
  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={userData} />
      <FunctionalForm
        setUserData={setUserData}
        userData={userData}
      />
    </>
  );
};
