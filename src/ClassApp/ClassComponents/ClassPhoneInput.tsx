import { Component, ChangeEvent, createRef } from "react";

export type PhoneInput = ["", "", "", ""]; // Fixed type of phoneInput to have exactly 4 elements

interface PhoneProps {
  phoneInput: PhoneInput; // Ensure type is PhoneInput
  setPhoneInput: (newPhoneInput: PhoneInput) => void; // Function to update phoneInput
}

export class Phone extends Component<PhoneProps> {
  private ref0 = createRef<HTMLInputElement>();
  private ref1 = createRef<HTMLInputElement>();
  private ref2 = createRef<HTMLInputElement>();
  private ref3 = createRef<HTMLInputElement>();

  createOnChangeHandler =
    (index: 0 | 1 | 2 | 3) => (e: ChangeEvent<HTMLInputElement>) => {
      const { phoneInput, setPhoneInput } = this.props;
      const lengths = [2, 2, 2, 1];
      const currentMaxLength = lengths[index];

      const rawValue = e.target.value;
      const sanitizedValue = rawValue
        .replace(/[^0-9]/g, "")
        .slice(0, currentMaxLength);

      const newPhoneInput = phoneInput.map((value, i) =>
        i === index ? sanitizedValue : value
      ) as PhoneInput;
      setPhoneInput(newPhoneInput);

      if (
        sanitizedValue.length === currentMaxLength &&
        index + 1 < lengths.length
      ) {
        const nextRef =
          index === 0 ? this.ref1 : index === 1 ? this.ref2 : this.ref3;
        nextRef.current?.focus();
      }

      if (
        rawValue.length < phoneInput[index].length &&
        sanitizedValue.length === 0 &&
        index - 1 >= 0
      ) {
        const prevRef =
          index === 3 ? this.ref2 : index === 2 ? this.ref1 : this.ref0;
        prevRef.current?.focus();
      }
    };

  render() {
    const { phoneInput } = this.props;

    return (
      <div className="input-wrap">
        <label>Phone:</label>
        <div id="phone-input-wrap">
          <input
            type="text"
            id="phone-input-1"
            placeholder="12"
            ref={this.ref0}
            value={phoneInput[0]}
            onChange={this.createOnChangeHandler(0)}
          />
          <input
            type="text"
            id="phone-input-2"
            placeholder="34"
            ref={this.ref1}
            value={phoneInput[1]}
            onChange={this.createOnChangeHandler(1)}
          />
          <input
            type="text"
            id="phone-input-3"
            placeholder="56"
            ref={this.ref2}
            value={phoneInput[2]}
            onChange={this.createOnChangeHandler(2)}
          />
          <input
            type="text"
            id="phone-input-4"
            placeholder="7"
            ref={this.ref3}
            value={phoneInput[3]}
            onChange={this.createOnChangeHandler(3)}
          />
        </div>
      </div>
    );
  }
}
