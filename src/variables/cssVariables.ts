/** @desc Re-export parsed and typed scss variables (required in the code) */

import * as cssVariables from './variables-export.scss';

const vars = cssVariables as TCssVariables;

const {
  // Colors
  primaryColor,
  blueTintedDarkenColor,

  // Tresholds
  extraWideTreshold,
  wideTreshold,
  mobileTreshold,
  smallTreshold,
} = vars;

const extraWideTresholdPx = parseInt(extraWideTreshold);
const wideTresholdPx = parseInt(wideTreshold);
const mobileTresholdPx = parseInt(mobileTreshold);
const smallTresholdPx = parseInt(smallTreshold);

// See pre-exports in `variables-export.scss`
export interface TCssVariables {
  primaryColor: string;
  blueTintedDarkenColor: string;

  extraWideTreshold: string;
  extraWideTresholdPx: number;
  wideTreshold: string;
  wideTresholdPx: number;
  mobileTreshold: string;
  mobileTresholdPx: number;
  smallTreshold: string;
  smallTresholdPx: number;
}

export {
  // Colors
  primaryColor,
  blueTintedDarkenColor,

  // Tresholds as is...
  extraWideTreshold,
  wideTreshold,
  mobileTreshold,
  smallTreshold,

  // Tresholds as numbers...
  extraWideTresholdPx,
  wideTresholdPx,
  mobileTresholdPx,
  smallTresholdPx,
};
