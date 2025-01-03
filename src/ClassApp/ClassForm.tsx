import { Component, createRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { isEmailValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { capitalize, formatPhoneNumber } from "../utils/transformations";
import { UserInformation } from "../types";
import { ClassTextInput } from "./ClassComponents/ClassTextInput";
import { Phone, PhoneInput } from "./ClassComponents/ClassPhoneInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "City is Invalid";
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
    phoneInput: ["", "", "", ""] as PhoneInput,
    isSubmitted: false,
  };

  isFirstNameInputValid = () => this.state.firstNameInput.length >= 2;
  isLastNameInputValid = () => this.state.lastNameInput.length > 2;
  isEmailInputValid = () => isEmailValid(this.state.emailInput);
  isCityInputValid = () => allCities.includes(this.state.cityInput);
  isPhoneInputValid = () => formatPhoneNumber(this.state.phoneInput.join(""));

  showFirstNameError = () =>
    this.state.isSubmitted && !this.isFirstNameInputValid();
  showLastNameError = () =>
    this.state.isSubmitted && !this.isLastNameInputValid();
  showEmailInputError = () =>
    this.state.isSubmitted && !this.isEmailInputValid();
  showCityInputError = () => this.state.isSubmitted && !this.isCityInputValid();
  showPhoneInputError = () =>
    this.state.isSubmitted && !this.isPhoneInputValid();

  nameRef = createRef<HTMLInputElement>();

  reset = () => {
    this.setState({
      firstNameInput: "",
      lastNameInput: "",
      emailInput: "",
      cityInput: "",
      phoneInput: ["", "", "", ""] as PhoneInput,
      isSubmitted: false,
    });
  };

  passUserData = () => {
    if (
      this.isFirstNameInputValid() &&
      this.isLastNameInputValid() &&
      this.isEmailInputValid() &&
      this.isCityInputValid() &&
      this.isPhoneInputValid()
    ) {
      this.props.setUserData({
        firstName: this.state.firstNameInput,
        lastName: this.state.lastNameInput,
        email: this.state.emailInput,
        city: this.state.cityInput,
        phone: this.state.phoneInput.join("-"),
      });
      this.reset();
    }
  };

  logState = () => {
    console.log("state", this.state);
  };

  setPhoneInput = (newPhoneInput: PhoneInput) => {
    this.setState({ phoneInput: newPhoneInput });
  };

  render() {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.setState({ isSubmitted: true });
          this.passUserData();
        }}
      >
        <u>
          <h3>User Information Form</h3>
        </u>

        <ClassTextInput
          inputProps={{
            onChange: (e) => {
              const capitalizedValue = capitalize(e.target.value);
              this.setState({ firstNameInput: capitalizedValue });
            },
            value: this.state.firstNameInput,
            placeholder: "Bilbo",
            ref: this.nameRef,
          }}
          labelText={"First Name"}
        />

        {this.showFirstNameError() && (
          <ErrorMessage
            message={firstNameErrorMessage}
            show={true}
          />
        )}

        <ClassTextInput
          inputProps={{
            onChange: (e) => {
              const capitalizedValue = capitalize(e.target.value);
              this.setState({ lastNameInput: capitalizedValue });
            },
            value: this.state.lastNameInput,
            placeholder: "Baggins",
            ref: this.nameRef,
          }}
          labelText={"Last Name"}
        />
        {this.showLastNameError() && (
          <ErrorMessage
            message={lastNameErrorMessage}
            show={true}
          />
        )}

        <ClassTextInput
          inputProps={{
            onChange: (e) => {
              const capitalizedValue = capitalize(e.target.value);
              this.setState({ emailInput: capitalizedValue });
            },
            value: this.state.emailInput,
            placeholder: "bilbo-baggins@adventurehobbits.net",
            ref: this.nameRef,
          }}
          labelText={"Email"}
        />
        {this.showEmailInputError() && (
          <ErrorMessage
            message={emailErrorMessage}
            show={true}
          />
        )}

        <div className="input-wrap">
          <label>{"City"}:</label>
          <select
            className="selectedCity"
            value={this.state.cityInput}
            onChange={(e) => {
              this.setState({ cityInput: e.target.value });
            }}
          >
            <option
              value=""
              disabled
              selected
              className="disabled-option"
            >
              Hobbiton
            </option>
            {allCities.map((city, i) => (
              <option
                key={i}
                value={city}
              >
                {city}
              </option>
            ))}
          </select>
        </div>
        {this.showCityInputError() && (
          <ErrorMessage
            message={cityErrorMessage}
            show={true}
          />
        )}

        <Phone
          phoneInput={this.state.phoneInput}
          setPhoneInput={this.setPhoneInput}
        />
        {this.showPhoneInputError() && (
          <ErrorMessage
            message={phoneNumberErrorMessage}
            show={true}
          />
        )}

        <input
          type="submit"
          value="Submit"
        />
      </form>
    );
  }
}
