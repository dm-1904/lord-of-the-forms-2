import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { UserInformation } from "../types";
import { ProfileInformation } from "../ProfileInformation";
type State = { userInformation: UserInformation | null };

// const defaultUser: UserInformation = {
//   email: "default@default.com",
//   firstName: "Default",
//   lastName: "Default",
//   phone: "1234567",
//   city: "Hobbiton",
// };
// console.log(this.State);

export class ClassApp extends Component<Record<string, never>, State> {
  state: State = {
    userInformation: null,
  };

  setUserData = () => {
    this.setState(() => ({
      userInformation: {
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        city: "",
      },
    }));
  };

  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={this.state.userInformation} />
        <ClassForm setUserData={this.setUserData} />
      </>
    );
  }
}
