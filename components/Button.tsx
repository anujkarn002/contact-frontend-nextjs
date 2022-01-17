import classNames from "classnames";
import React, { ReactNode } from "react";
import warn from "../utils/warning";

const style = {
  base: "align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none",
  block: "w-full",
  size: {
    larger: "px-10 py-4 rounded-lg",
    large: "px-5 py-3 rounded-lg",
    regular: "px-4 py-2 rounded-lg text-sm",
    small: "px-3 py-1 rounded-md text-sm",
    icon: {
      larger: "p-4 rounded-lg",
      large: "p-3 rounded-lg",
      regular: "p-2 rounded-lg",
      small: "p-2 rounded-md",
    },
    pagination: "px-3 py-1 rounded-md text-xs",
  },
  // styles applied to the SVG icon
  icon: {
    larger: "h-5 w-5",
    large: "h-5 w-5",
    regular: "h-5 w-5",
    small: "h-3 w-3",
    left: "mr-2 -ml-1",
    right: "ml-2 -mr-1",
  },
  primary: {
    base: "text-white bg-secondary border border-transparent",
    active:
      "active:bg-secondary hover:bg-secondary-washed-out focus:shadow-outline-green",
    disabled: "opacity-50 cursor-not-allowed",
  },
  secondary: {
    base: "text-grey bg-black border border-transparent",
    active:
      "active:bg-background hover:bg-black-darkest focus:shadow-outline-green",
    disabled: "opacity-50 cursor-not-allowed",
  },
  outline: {
    base: "text-grey-darker border-grey-light border focus:outline-none",
    active:
      "active:bg-transparent hover:border-grey-dark focus:border-grey-dark active:text-grey-dark focus:shadow-outline-gray",
    disabled: "opacity-50 cursor-not-allowed bg-grey-light",
  },
  link: {
    base: "text-blue-dark focus:outline-none border border-transparent",
    active:
      "active:bg-transparent hover:text-blue hover:text-blue-500 focus:shadow-outline-gray",
    disabled: "opacity-50 cursor-not-allowed",
  },
  // this is the button that lives inside the DropdownItem
  dropdownItem: {
    base: "inline-flex items-center cursor-pointer w-full px-2 py-1 text-sm font-medium transition-colors duration-150 rounded-md hover:bg-grey-lightest hover:text-grey-light dark:hover:bg-grey-light dark:hover:text-gray-lighter",
  },
};

type IconType =
  | string
  | React.FunctionComponent<{ className: string; "aria-hidden": boolean }>
  | React.ComponentClass<{ className: string; "aria-hidden": boolean }>;

interface Props {
  children?: React.ReactNode;
  /**
   * Defines if the button is disabled
   */
  disabled?: boolean;
  /**
   * The size of the button
   */
  size?: "larger" | "large" | "regular" | "small" | "pagination";
  /**
   * Shows only one icon inside the button; defaults to left
   */
  icon?: IconType;
  /**
   * Shows an icon inside the button, left aligned
   */
  iconLeft?: IconType;
  /**
   * Shows an icon inside the button, right aligned
   */
  iconRight?: IconType;
  /**
   * The style of the button
   */
  layout?: "outline" | "link" | "primary" | "secondary" | "__dropdownItem";
  /**
   * Shows the button as a block (full width)
   */
  block?: boolean;
}

export interface ButtonAsButtonProps
  extends Props,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The element that should be rendered as a button
   */
  tag?: "button";
  /**
   * The native HTML button type
   */
  type?: "button" | "submit" | "reset";
}

export interface ButtonAsAnchorProps
  extends Props,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  tag: "a";
}

export interface ButtonAsOtherProps
  extends Props,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  tag: string;
}

export type ButtonProps =
  | ButtonAsButtonProps
  | ButtonAsAnchorProps
  | ButtonAsOtherProps;

type Ref = ReactNode | HTMLElement | string;
export default React.forwardRef<Ref, ButtonProps>(function Button(props, ref) {
  const {
    tag = "button",
    // Fix https://github.com/estevanmaito/windmill-react-ui/issues/7
    type = tag === "button" ? "button" : undefined,
    disabled = false,
    size = "regular",
    layout = "primary",
    block = false,
    icon,
    iconLeft,
    iconRight,
    className,
    children,
    ...other
  } = props;

  const button = style;

  function hasIcon() {
    return !!icon || !!iconLeft || !!iconRight;
  }

  warn(
    hasIcon() && !other["aria-label"] && !children,
    "Button",
    'You are using an icon button, but no "aria-label" attribute was found. Add an "aria-label" attribute to work as a label for screen readers.'
  );

  const IconLeft = iconLeft || icon;
  const IconRight = iconRight;

  const baseStyle = button.base;
  const blockStyle = button.block;
  const sizeStyles = {
    larger: button.size.larger,
    large: button.size.large,
    regular: button.size.regular,
    small: button.size.small,
    /**
     * Only used in Pagination.
     * Not meant for general use.
     */
    pagination: button.size.pagination,
  };
  const iconSizeStyles = {
    larger: button.size.icon.larger,
    large: button.size.icon.large,
    regular: button.size.icon.regular,
    small: button.size.icon.small,
    pagination: button.size.icon.regular,
  };
  const iconStyle = button.icon[size];
  const layoutStyles = {
    primary: button.primary.base,
    secondary: button.secondary.base,
    outline: button.outline.base,
    link: button.link.base,
  };
  const activeStyles = {
    primary: button.primary.active,
    secondary: button.secondary.active,
    outline: button.outline.active,
    link: button.link.active,
  };
  const disabledStyles = {
    primary: button.primary.disabled,
    secondary: button.secondary.disabled,
    outline: button.outline.disabled,
    link: button.link.disabled,
  };

  /**
   * Only used in DropdownItem.
   * Not meant for general use.
   */
  const dropdownItemStyle = button.dropdownItem.base;

  const buttonStyles =
    layout === "__dropdownItem"
      ? classNames(dropdownItemStyle, className)
      : classNames(
          baseStyle,
          // has icon but no children
          hasIcon() && !children && iconSizeStyles[size],
          // has icon and children
          hasIcon() && children && sizeStyles[size],
          // does not have icon
          !hasIcon() && sizeStyles[size],
          layoutStyles[layout],
          disabled ? disabledStyles[layout] : activeStyles[layout],
          block ? blockStyle : null,
          className
        );

  const iconLeftStyles = classNames(
    iconStyle,
    children ? button.icon.left : ""
  );
  const iconRightStyles = classNames(
    iconStyle,
    children ? button.icon.right : ""
  );

  return React.createElement(
    tag,
    {
      className: buttonStyles,
      ref,
      disabled,
      type,
      ...other,
    },
    IconLeft
      ? React.createElement(IconLeft, {
          className: iconLeftStyles,
          "aria-hidden": true,
        })
      : null,
    children,
    IconRight
      ? React.createElement(IconRight, {
          className: iconRightStyles,
          "aria-hidden": true,
        })
      : null
  );
});
