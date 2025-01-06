import { useState, useRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "./Components/TextInput";
import { UserInformation } from "../types";
import { isEmailValid, isNameValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { formatPhoneNumber } from "../utils/transformations";
import { Phone } from "./Components/PhoneInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "City is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({
  setUserData,
}: {
  setUserData: React.Dispatch<React.SetStateAction<UserInformation | null>>;
}) => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [phoneInput, setPhoneInput] = useState(["", "", "", ""]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFirstNameInputValid: boolean = isNameValid(firstNameInput);
  const isLastNameInputValid: boolean = isNameValid(lastNameInput);
  const isEmailInputValid: boolean = isEmailValid(emailInput);
  const isCityInputValid: boolean = allCities.includes(cityInput);
  const isPhoneInputValid: boolean = formatPhoneNumber(phoneInput.join(""));

  const showFirstNameError = isSubmitted && !isFirstNameInputValid;
  const showLastNameError = isSubmitted && !isLastNameInputValid;
  const showEmailInputError = isSubmitted && !isEmailInputValid;
  const showCityInputError = isSubmitted && !isCityInputValid;
  const showPhoneInputError = isSubmitted && !isPhoneInputValid;

  const nameRef = useRef<HTMLInputElement>(null);

  const handleNameChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value.replace(/[^A-Za-z]/g, "");
      if (value.length > 0) {
        value = value.charAt(0).toUpperCase() + value.slice(1);
      }
      setter(value);
    };

  const passUserData = () => {
    if (
      isFirstNameInputValid &&
      isLastNameInputValid &&
      isEmailInputValid &&
      isCityInputValid &&
      isPhoneInputValid
    ) {
      setUserData({
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: emailInput,
        city: cityInput,
        phone: phoneInput.join("-"),
      });
      reset();
    }
  };

  const reset = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setCityInput("");
    setPhoneInput(["", "", "", ""]);
    setIsSubmitted(false);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsSubmitted(true);
        passUserData();
      }}
    >
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <TextInput
        inputProps={{
          onChange: handleNameChange(setFirstNameInput),
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
          onChange: handleNameChange(setLastNameInput),
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
      <div className="input-wrap">
        <label htmlFor="city">City</label>
        <select
          className="selectedCity"
          value={cityInput}
          onChange={(e) => {
            setCityInput(e.target.value);
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
      {showCityInputError && (
        <ErrorMessage
          message={cityErrorMessage}
          show={true}
        />
      )}

      {/* Phone Input */}
      <Phone
        phoneInput={phoneInput}
        setPhoneInput={setPhoneInput}
      />
      {showPhoneInputError && (
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
};
