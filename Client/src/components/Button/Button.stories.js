import { Button } from ".";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    status: {
      options: ["hovered", "disabled", "enabled"],
      control: { type: "select" },
    },
    icon: {
      options: ["inactive", "active"],
      control: { type: "select" },
    },
    iconDirection: {
      options: ["right", "left"],
      control: { type: "select" },
    },
    style: {
      options: ["fill", "outline"],
      control: { type: "select" },
    },
    size: {
      options: ["larg", "small"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    status: "hovered",
    icon: "inactive",
    iconDirection: "right",
    style: "fill",
    size: "larg",
    className: {},
    text: "Disabled",
    text1: "Enabled",
  },
};
