import { useState, useRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "./Components/TextInput";
import { UserInformation } from "../types";
import { isEmailValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "City is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({
  userData,
  setUserData,
}: {
  userData: UserInformation | null;
  setUserData: React.Dispatch<
    React.SetStateAction<{
      firstName: string;
      lastName: string;
      email: string;
      city: string;
      phone: string;
    }>
  >;
}) => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [phoneInput, setPhoneInput] = useState(["", "", "", ""]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFirstNameInputValid: boolean = firstNameInput.length > 2;
  const isLastNameInputValid: boolean = lastNameInput.length > 2;
  const isEmailInputValid: boolean = isEmailValid(emailInput);
  const isCityInputValid: boolean = allCities.includes(cityInput);

  const showFirstNameError = isSubmitted && !isFirstNameInputValid;
  const showLastNameError = isSubmitted && !isLastNameInputValid;
  const showEmailInputError = isSubmitted && !isEmailInputValid;
  const showCityInputError = isSubmitted && !isCityInputValid;

  const nameRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setCityInput("");
    setPhoneInput(["", "", "", ""]);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsSubmitted(true);
        reset();
      }}
    >
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <TextInput
        inputProps={{
          onChange: (e) => {
            setFirstNameInput(e.target.value);
            // setUserData({
            //   ...userData,
            //   firstName: e.target.value
            // })
          },
          value: firstNameInput,
          placeholder: "Bilbo",
          ref: nameRef,
        }}
        labelText={"First Name"}
      />
      {showFirstNameError && (
        <ErrorMessage
          message={firstNameErrorMessage}
          show={true}
        />
      )}

      {/* last name input */}
      <TextInput
        inputProps={{
          onChange: (e) => {
            setLastNameInput(e.target.value);
          },
          value: lastNameInput,
          placeholder: "Baggins",
          ref: nameRef,
        }}
        labelText={"Last Name"}
      />
      {showLastNameError && (
        <ErrorMessage
          message={lastNameErrorMessage}
          show={true}
        />
      )}

      {/* Email Input */}
      <TextInput
        inputProps={{
          onChange: (e) => {
            setEmailInput(e.target.value);
          },
          value: emailInput,
          placeholder: "bilbo-baggins@adventurehobbits.net",
          ref: nameRef,
        }}
        labelText={"Email"}
      />
      {showEmailInputError && (
        <ErrorMessage
          message={emailErrorMessage}
          show={true}
        />
      )}

      {/* City Input */}
      <TextInput
        inputProps={{
          onChange: (e) => {
            setCityInput(e.target.value);
          },
          value: cityInput,
          placeholder: "Hobbiton",
          ref: nameRef,
        }}
        labelText={"City"}
      />
      {showCityInputError && (
        <ErrorMessage
          message={cityErrorMessage}
          show={true}
        />
      )}

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
};
