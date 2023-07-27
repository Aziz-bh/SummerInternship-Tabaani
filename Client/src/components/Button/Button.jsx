/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import "./style.css";

export const Button = ({
  status,
  icon,
  iconDirection,
  style,
  size,
  className,
  text = "Disabled",
  text1 = "Enabled",
}) => {
  const [state, dispatch] = useReducer(reducer, {
    status: status || "enabled",
    icon: icon || "active",
    iconDirection: iconDirection || "left",
    style: style || "fill",
    size: size || "larg",
  });

  return (
    <div
      className={`button ${state.size} ${state.iconDirection} ${state.style} ${state.status} ${state.icon} ${className}`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      {state.icon === "active" && (
        <>
          <div className="icon-free">
            {state.iconDirection === "left" && <div className="icon"></div>}

            {state.status === "enabled" && state.iconDirection === "right" && <>{text1}</>}

            {state.status === "hovered" && state.iconDirection === "right" && <>Hovered</>}

            {state.iconDirection === "right" && state.status === "disabled" && <>{text}</>}
          </div>
          <div className="label-text">
            {state.status === "enabled" && state.iconDirection === "left" && <>{text1}</>}

            {state.iconDirection === "right" && <div className="icon-i"></div>}

            {state.status === "hovered" && state.iconDirection === "left" && <>Hovered</>}

            {state.iconDirection === "left" && state.status === "disabled" && <>{text}</>}
          </div>
        </>
      )}

      {state.icon === "inactive" && (
        <div className="div">
          {state.status === "enabled" && <>{text1}</>}

          {state.status === "hovered" && <>Hovered</>}

          {state.status === "disabled" && <>{text}</>}
        </div>
      )}
    </div>
  );
};

function reducer(state, action) {
  if (
    state.icon === "active" &&
    state.iconDirection === "left" &&
    state.size === "larg" &&
    state.status === "hovered" &&
    state.style === "fill"
  ) {
    switch (action) {
      case "mouse_leave":
        return {
          icon: "active",
          iconDirection: "left",
          size: "larg",
          status: "disabled",
          style: "fill",
        };
    }
  }

  if (
    state.icon === "active" &&
    state.iconDirection === "right" &&
    state.size === "larg" &&
    state.status === "hovered" &&
    state.style === "fill"
  ) {
    switch (action) {
      case "mouse_leave":
        return {
          icon: "active",
          iconDirection: "right",
          size: "larg",
          status: "disabled",
          style: "fill",
        };
    }
  }

  if (
    state.icon === "inactive" &&
    state.iconDirection === "left" &&
    state.size === "larg" &&
    state.status === "hovered" &&
    state.style === "fill"
  ) {
    switch (action) {
      case "mouse_leave":
        return {
          icon: "inactive",
          iconDirection: "left",
          size: "larg",
          status: "disabled",
          style: "fill",
        };
    }
  }

  if (
    state.icon === "active" &&
    state.iconDirection === "left" &&
    state.size === "larg" &&
    state.status === "hovered" &&
    state.style === "outline"
  ) {
    switch (action) {
      case "mouse_leave":
        return {
          icon: "active",
          iconDirection: "left",
          size: "larg",
          status: "disabled",
          style: "outline",
        };
    }
  }

  if (
    state.icon === "active" &&
    state.iconDirection === "right" &&
    state.size === "larg" &&
    state.status === "hovered" &&
    state.style === "outline"
  ) {
    switch (action) {
      case "mouse_leave":
        return {
          icon: "active",
          iconDirection: "right",
          size: "larg",
          status: "disabled",
          style: "outline",
        };
    }
  }

  if (
    state.icon === "inactive" &&
    state.iconDirection === "left" &&
    state.size === "larg" &&
    state.status === "hovered" &&
    state.style === "outline"
  ) {
    switch (action) {
      case "mouse_leave":
        return {
          icon: "inactive",
          iconDirection: "left",
          size: "larg",
          status: "disabled",
          style: "outline",
        };
    }
  }

  if (
    state.icon === "active" &&
    state.iconDirection === "left" &&
    state.size === "small" &&
    state.status === "hovered" &&
    state.style === "fill"
  ) {
    switch (action) {
      case "mouse_leave":
        return {
          icon: "active",
          iconDirection: "left",
          size: "small",
          status: "disabled",
          style: "fill",
        };
    }
  }

  if (
    state.icon === "active" &&
    state.iconDirection === "right" &&
    state.size === "small" &&
    state.status === "hovered" &&
    state.style === "fill"
  ) {
    switch (action) {
      case "mouse_leave":
        return {
          icon: "active",
          iconDirection: "right",
          size: "small",
          status: "disabled",
          style: "fill",
        };
    }
  }

  if (
    state.icon === "inactive" &&
    state.iconDirection === "left" &&
    state.size === "small" &&
    state.status === "hovered" &&
    state.style === "fill"
  ) {
    switch (action) {
      case "mouse_leave":
        return {
          icon: "inactive",
          iconDirection: "left",
          size: "small",
          status: "disabled",
          style: "fill",
        };
    }
  }

  if (
    state.icon === "active" &&
    state.iconDirection === "left" &&
    state.size === "small" &&
    state.status === "hovered" &&
    state.style === "outline"
  ) {
    switch (action) {
      case "mouse_leave":
        return {
          icon: "active",
          iconDirection: "left",
          size: "small",
          status: "disabled",
          style: "outline",
        };
    }
  }

  if (
    state.icon === "active" &&
    state.iconDirection === "right" &&
    state.size === "small" &&
    state.status === "hovered" &&
    state.style === "outline"
  ) {
    switch (action) {
      case "mouse_leave":
        return {
          icon: "active",
          iconDirection: "right",
          size: "small",
          status: "disabled",
          style: "outline",
        };
    }
  }

  if (
    state.icon === "inactive" &&
    state.iconDirection === "left" &&
    state.size === "small" &&
    state.status === "hovered" &&
    state.style === "outline"
  ) {
    switch (action) {
      case "mouse_leave":
        return {
          icon: "inactive",
          iconDirection: "left",
          size: "small",
          status: "disabled",
          style: "outline",
        };
    }
  }

  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        status: "hovered",
      };
  }

  return state;
}

Button.propTypes = {
  status: PropTypes.oneOf(["hovered", "disabled", "enabled"]),
  icon: PropTypes.oneOf(["inactive", "active"]),
  iconDirection: PropTypes.oneOf(["right", "left"]),
  style: PropTypes.oneOf(["fill", "outline"]),
  size: PropTypes.oneOf(["larg", "small"]),
  text: PropTypes.string,
  text1: PropTypes.string,
};
