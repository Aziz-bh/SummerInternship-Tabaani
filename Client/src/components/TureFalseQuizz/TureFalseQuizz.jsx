/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { TureFalse } from "../TureFalse";
import "./style.css";

export const TureFalseQuizz = ({ className }) => {
  return (
    <div className={`ture-false-quizz ${className}`}>
      <p className="lorem-ipsum-dolor">
        Lorem Ipsum Dolor Sit Amet Consectetur. Odio Auctor Tincidunt Pellentesque Sapien Sed Mauris A. Amet Mauris
        Tellus Eu Leo Habitant Malesuada Egestas. Tellus Nibh Sed Eu Lobortis Scelerisque?
      </p>
      <TureFalse className="ture-false-instance" text="TRUE" />
      <TureFalse className="design-component-instance-node" text="FALSE" trueClassName="ture-false-2" />
    </div>
  );
};
