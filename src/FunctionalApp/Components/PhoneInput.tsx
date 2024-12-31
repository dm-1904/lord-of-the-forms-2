import { ChangeEventHandler, useRef } from "react";

export type PhoneInput = ["", "", "", ""];
export const Phone = ({
  phoneInput,
  setPhoneInput,
}: {
  phoneInput: string[];
  setPhoneInput: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const ref0 = useRef<HTMLInputElement>(null);
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);

  const refs = [ref0, ref1, ref2, ref3];

  const createOnChangeHandler =
    (index: 0 | 1 | 2 | 3): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const lengths = [2, 2, 2, 1];
      const currentMaxLength = lengths[index];
      const nextRef = refs[index + 1];
      const prevRef = refs[index - 1];
      const rawValue = e.target.value;
      const sanitizedValue = rawValue
        .replace(/[^0-9]/g, "")
        .slice(0, currentMaxLength);
      const newState = phoneInput.map((phoneValue, phoneValueIndex) =>
        phoneValueIndex === index ? sanitizedValue : phoneValue
      ) as PhoneInput;
      setPhoneInput(newState);
      if (sanitizedValue.length === currentMaxLength && nextRef?.current) {
        nextRef.current.focus();
      }
      if (
        rawValue.length < phoneInput[index].length &&
        prevRef?.current &&
        sanitizedValue.length === 0
      ) {
        prevRef.current.focus();
      }
    };

  return (
    <div className="input-wrap">
      <label htmlFor="">Phone:</label>
      <div id="phone-input-wrap">
        <input
          type="text"
          id="phone-input-1"
          placeholder="55"
          ref={ref0}
          value={phoneInput[0]}
          onChange={createOnChangeHandler(0)}
        />
        -
        <input
          type="text"
          id="phone-input-2"
          placeholder="55"
          ref={ref1}
          value={phoneInput[1]}
          onChange={createOnChangeHandler(1)}
        />
        -
        <input
          type="text"
          id="phone-input-3"
          placeholder="55"
          ref={ref2}
          value={phoneInput[2]}
          onChange={createOnChangeHandler(2)}
        />
        -
        <input
          type="text"
          id="phone-input-4"
          placeholder="5"
          ref={ref3}
          value={phoneInput[3]}
          onChange={createOnChangeHandler(3)}
        />
      </div>
    </div>
  );
};
