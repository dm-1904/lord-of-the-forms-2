import { Component, ComponentProps } from "react";

interface ClassTextInputProps {
  labelText: string;
  inputProps: ComponentProps<"input">;
}

export class ClassTextInput extends Component<ClassTextInputProps> {
  render() {
    return (
      <div className="input-wrap">
        <label>{this.props.labelText}</label>
        <input
          type="text"
          {...this.props.inputProps}
        />
      </div>
    );
  }
}
