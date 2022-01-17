import React, { useContext } from "react";
import classNames from "classnames";

const style = {
  base: "block border rounded-md w-full text-sm focus:outline-none  form-input leading-5",
  active: "focus:border-secondary focus:shadow-outline-green",
  disabled: "cursor-not-allowed opacity-50 bg-grey-light ",
  valid:
    "border-secondary  focus:border-secondary  focus:shadow-outline-green ",
  invalid: "border-red-600 focus:border-red-400  focus:shadow-outline-red",
  radio:
    "text-secondary form-radio focus:border-secondary focus:outline-none focus:shadow-outline-green",
  checkbox:
    "text-secondary form-checkbox focus:border-secondary focus:outline-none focus:shadow-outline-green",
};

interface Props extends React.ComponentPropsWithRef<"input"> {
  /**
   * Defines the color of the input
   */
  valid?: boolean;
  /**
   * Defines if the input is disabled
   */
  disabled?: boolean;
  /**
   * Defines the type of the input
   */
  type?: string;
}

const Input = React.forwardRef<HTMLInputElement, Props>(function Input(
  props,
  ref
) {
  const { valid, disabled, className, type = "text", ...other } = props;

  const input = style;

  const baseStyle = input.base;
  const activeStyle = input.active;
  const disabledStyle = input.disabled;
  const validStyle = input.valid;
  const invalidStyle = input.invalid;
  const radioStyle = input.radio;
  const checkStyle = input.checkbox;

  // show password
  function showPassword(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const input = e.currentTarget.previousSibling as HTMLInputElement;
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  }

  function hasValidation(valid: boolean | undefined) {
    return valid !== undefined;
  }

  function validationStyle(valid: boolean | undefined): string {
    if (hasValidation(valid)) {
      return valid ? validStyle : invalidStyle;
    }
    return "";
  }

  function typeStyle(type: string): string {
    switch (type) {
      case "radio":
        return radioStyle;
      case "checkbox":
        return checkStyle;
      default:
        return baseStyle;
    }
  }

  const cls = classNames(
    typeStyle(type),
    // don't apply activeStyle if has valid or disabled
    !hasValidation(valid) && !disabled && activeStyle,
    // don't apply disabledStyle if has valid
    !hasValidation(valid) && disabled && disabledStyle,
    validationStyle(valid),
    className
  );

  return type === "password" ? (
    <div className="relative">
      <input
        ref={ref}
        className={cls}
        type={type}
        disabled={disabled}
        {...other}
      />
      <button
        className="absolute right-0 top-0 bottom-0 m-2"
        onClick={showPassword}
      >
        {"\u{1F512}"}
      </button>
    </div>
  ) : (
    <input
      ref={ref}
      className={cls}
      type={type}
      disabled={disabled}
      {...other}
    />
  );
});

export default Input;
