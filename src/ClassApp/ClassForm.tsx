import { Component, createRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { isEmailValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { formatPhoneNumber } from "../utils/transformations";
import { UserInformation } from "../types";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

interface ClassFormProps {
  setUserData: (userData: Partial<UserInformation>) => void;
}

export class ClassForm extends Component<ClassFormProps> {
  state = {
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    cityInput: "",
    phoneInput: ["", "", "", ""],
    isSubmitted: false,
  };

  isFirstNameInputValid: boolean = this.state.firstNameInput.length > 2;
  isLastNameInputValid: boolean = this.state.lastNameInput.length > 2;
  isEmailInputValid: boolean = isEmailValid(this.state.emailInput);
  isCityInputValid: boolean = allCities.includes(this.state.cityInput);
  isPhoneInputValid: boolean = formatPhoneNumber(
    this.state.phoneInput.join("")
  );

  showFirstNameError = this.state.isSubmitted && !this.isFirstNameInputValid;
  showLastNameError = this.state.isSubmitted && !this.isLastNameInputValid;
  showEmailInputError = this.state.isSubmitted && !this.isEmailInputValid;
  showCityInputError = this.state.isSubmitted && !this.isCityInputValid;
  showPhoneInputError = this.state.isSubmitted && !this.isPhoneInputValid;

  nameRef = createRef<HTMLInputElement>();

  passUserData = () => {
    if (
      this.isFirstNameInputValid &&
      this.isLastNameInputValid &&
      this.isEmailInputValid &&
      this.isCityInputValid &&
      this.isPhoneInputValid
    ) {
      this.props.setUserData({
        firstName: this.state.firstNameInput,
        lastName: this.state.lastNameInput,
        email: this.state.emailInput,
        city: this.state.cityInput,
        phone: this.state.phoneInput.join(""),
      });
    }
  };

  render() {
    console.log(this.props);
    return (
      <form>
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <div className="input-wrap">
          <label>{"First Name"}:</label>
          <input placeholder="Bilbo" />
        </div>
        <ErrorMessage
          message={firstNameErrorMessage}
          show={true}
        />

        {/* last name input */}
        <div className="input-wrap">
          <label>{"Last Name"}:</label>
          <input placeholder="Baggins" />
        </div>
        <ErrorMessage
          message={lastNameErrorMessage}
          show={true}
        />

        {/* Email Input */}
        <div className="input-wrap">
          <label>{"Email"}:</label>
          <input placeholder="bilbo-baggins@adventurehobbits.net" />
        </div>
        <ErrorMessage
          message={emailErrorMessage}
          show={true}
        />

        {/* City Input */}
        <div className="input-wrap">
          <label>{"City"}:</label>
          <input placeholder="Hobbiton" />
        </div>
        <ErrorMessage
          message={cityErrorMessage}
          show={true}
        />

        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap">
            <input
              type="text"
              id="phone-input-1"
              placeholder="55"
            />
            -
            <input
              type="text"
              id="phone-input-2"
              placeholder="55"
            />
            -
            <input
              type="text"
              id="phone-input-3"
              placeholder="55"
            />
            -
            <input
              type="text"
              id="phone-input-4"
              placeholder="5"
            />
          </div>
        </div>

        <ErrorMessage
          message={phoneNumberErrorMessage}
          show={true}
        />

        <input
          type="submit"
          value="Submit"
        />
      </form>
    );
  }
}
