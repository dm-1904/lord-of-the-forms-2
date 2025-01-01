import { useState, useRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "./Components/TextInput";
import { UserInformation } from "../types";
import { isEmailValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { capitalize, formatPhoneNumber } from "../utils/transformations";
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

  const isFirstNameInputValid: boolean = firstNameInput.length > 2;
  const isLastNameInputValid: boolean = lastNameInput.length > 2;
  const isEmailInputValid: boolean = isEmailValid(emailInput);
  const isCityInputValid: boolean = allCities.includes(cityInput);
  const isPhoneInputValid: boolean = formatPhoneNumber(phoneInput.join(""));

  const showFirstNameError = isSubmitted && !isFirstNameInputValid;
  const showLastNameError = isSubmitted && !isLastNameInputValid;
  const showEmailInputError = isSubmitted && !isEmailInputValid;
  const showCityInputError = isSubmitted && !isCityInputValid;
  const showPhoneInputError = isSubmitted && !isPhoneInputValid;

  const nameRef = useRef<HTMLInputElement>(null);

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
    }
  };

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
        passUserData();
        setIsSubmitted(true);
        reset();
        setIsSubmitted(false);
      }}
    >
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <TextInput
        inputProps={{
          onChange: (e) => {
            setFirstNameInput(capitalize(e.target.value));
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
            setLastNameInput(capitalize(e.target.value));
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
      <div className="input-wrap">
        <label htmlFor="city">City</label>
        <select
          className="selectedCity"
          value={cityInput}
          onChange={(e) => {
            setCityInput(e.target.value);
            // setUserData((prev) => ({
            //   ...prev,
            //   city: cityInput,
            // }));
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
              // onChange={() => {
              //   setEmailInput(city);
              // }}
            >
              {city}
            </option>
          ))}
        </select>
      </div>
      {/* <TextInput
        inputProps={{
          onChange: (e) => {
            setCityInput(e.target.value);
          },
          value: cityInput,
          placeholder: "Hobbiton",
          ref: nameRef,
        }}
        labelText={"City"}
      /> */}
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
