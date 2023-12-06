import { userInputsUl, solutionOutput } from "../helpers.js";
import { NUM_ROWS, NUM_COLS } from "../config.js";

/**
 * Generates and inserts input markup for the matrix into the userInputsUl element.
 * @param {number} NR - Number of rows in the matrix.
 * @param {number} NC - Number of columns in the matrix.
 * @returns {Object} - An object containing the number of rows (NR) and columns (NC).
 */
const generateMarkupInputs = (NR = NUM_ROWS(), NC = NUM_COLS() + 1) => {
  try {
    userInputsUl.innerHTML = ``;

    for (let i = 0; i < NR; i++) {
      const li = document.createElement("li");

      for (let j = 0; j < NC; j++) {
        const input = document.createElement("input");
        li.appendChild(input);
        input.classList.add(`inputMat`, `column${j + 1}`, `Row${i + 1}`);
        input.setAttribute("type", "text");
      }
      userInputsUl.appendChild(li);
    }
    return { NR, NC };
  } catch (error) {
    console.error(error);
    userInputsUl.innerHTML = error.message;
  }
};

/**
 * Collects the input values from the matrix and returns an object containing the matrix array, number of rows, and number of columns.
 * @returns {Object} - An object containing the matrix array (arr), number of rows (NR), and number of columns (NC).
 */
const addElementsToMatrix = () => {
  try {
    const NR = NUM_ROWS();
    const NC = NUM_COLS() + 1;
    let arr = [];
    let row = [];
    document.querySelectorAll("input.inputMat").forEach((ele, index) => {
      row.push(parseFloat(ele.value) || 0);
      if ((index + 1) % NC === 0) {
        arr.push(row);
        row = [];
      }
    });
    return { arr, NR, NC };
  } catch (error) {
    console.error(error);
    userInputsUl.innerHTML = error.message;
  }
};

/**
 * Selects an element and focuses on it, highlighting its content.
 * @param {HTMLElement} element - The HTML element to be selected.
 */
const selectElement = (element) => {
  if (element.tagName.toLowerCase() === "input") {
    setTimeout(() => {
      element.focus();
      element.setSelectionRange(0, element.value.length);
    }, 0);
  } else {
    element.focus();
  }
};

/**
 * Concatenates the given matrix with its identity matrix and returns the resulting matrix.
 * @param {Array<Array<number>>} matrix - The input matrix.
 * @returns {Array<Array<number>>} - The matrix concatenated with its identity matrix.
 * @throws Will throw an error if the matrix is not square or if its determinant is zero.
 */
function concatenateWithIdentity(matrix) {
  try {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    if (numRows !== numCols) {
      throw new Error("matrix is not square");
    }
    const identityMatrix = Array.from({ length: numRows }, (_, i) =>
      Array.from({ length: numRows }, (_, j) => (i === j ? 1 : 0))
    );
    const resultMatrix = matrix.map((row, i) => row.concat(identityMatrix[i]));

    if (determinant(matrix) === 0) throw new Error("No Inverse, det = 0");
    return resultMatrix;
  } catch (error) {
    console.error(error);
    solutionOutput.innerHTML = error.message;
  }
}

/**
 * Calculates the determinant of a given square matrix using recursion.
 * @param {Array<Array<number>>} array - The square matrix for which to calculate the determinant.
 * @returns {number} - The determinant of the matrix.
 */
export const determinant = (array) =>
  array.length == 1
    ? array[0][0]
    : array.length == 2
    ? array[0][0] * array[1][1] - array[0][1] * array[1][0]
    : array[0].reduce(
        (r, e, i) =>
          r +
          (-1) ** (i + 2) *
            e *
            determinant(array.slice(1).map((c) => c.filter((_, j) => i != j))),
        0
      );

/**
 * The model object containing functions related to matrix manipulation and calculation.
 * @type {Object}
 */
const model = {
  generateMarkupInputs,
  addElementsToMatrix,
  selectElement,
  concatenateWithIdentity,
  determinant,
};

export default model;
