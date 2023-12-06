import { numMatInputs, numMatInputsCols } from "./helpers.js";

/**
 * Returns the number of rows for the matrix.
 * @function
 * @returns {number} The number of rows.
 */
export const NUM_ROWS = () => +numMatInputs.value || 3;

/**
 * Returns the number of columns for the matrix.
 * @function
 * @returns {number} The number of columns.
 */
export const NUM_COLS = () => +numMatInputsCols.value || 3;

// Listen for changes in the number of rows input
numMatInputs.addEventListener("input", () => {
  // Notify any components or functions that depend on NUM_ROWS that it has changed
  // For example, you might emit a custom event or update components as needed.
  // Dispatch events
  const event = new Event("numRowsChanged");
  window.dispatchEvent(event);
});

// Listen for changes in the number of columns input
numMatInputsCols.addEventListener("input", () => {
  // Notify any components or functions that depend on NUM_COLS that it has changed
  // For example, you might emit a custom event or update components as needed.
  // Dispatch events
  const event = new Event("numRowsChanged");
  window.dispatchEvent(event);
});
