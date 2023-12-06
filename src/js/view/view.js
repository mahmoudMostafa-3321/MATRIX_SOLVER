import model from "../model/model.js";
import { userInputsUl, numMatInputs, numMatInputsCols } from "../helpers.js";
import { NUM_ROWS, NUM_COLS } from "../config.js";
import solveMatrix from "../model/modelMatrixSolver.js";

/**
 * Constructor function for the view.
 * @class
 * @constructor
 */
const view = function () {};

/**
 * Handles user inputs, allowing the use of the "Enter" key and restricting input to numbers only.
 * @todo Inputs handler using keyboard "Enter", only numbers.
 */
view.prototype.userInputsHandler = function () {
  try {
    userInputsUl.addEventListener("keydown", (event) => {
      if (
        (event.key === "Enter" || /^[0-9]$/.test(event.key)) &&
        !event.ctrlKey &&
        !event.altKey
      ) {
        if (event.key === "Enter") {
          event.preventDefault();
          model.addElementsToMatrix();
          solveMatrix(model.addElementsToMatrix().arr);
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Handles the number of matrix inputs, allowing the use of the "Enter" key and restricting input to numbers only.
 * Prevents errors from the user when entering zero. It is not possible to create a matrix without columns or rows.
 * @todo Inputs handler using keyboard 'Enter'.
 * @todo Prevent errors from the user when entering zero. It is not possible to create a matrix without columns or rows.
 */
view.prototype.numMatInputsHandler = function () {
  numMatInputs.focus();
  [numMatInputs, numMatInputsCols].forEach((ele) =>
    ele.addEventListener("keydown", (event) => {
      try {
        // prettier-ignore
        if (
          (event.key === "Enter" || /^[0-9]$/.test(event.key)) &&
          !event.ctrlKey &&
          !event.altKey
        ) {
          if (event.key === "Enter" || event.key === "Tab") {
            event.preventDefault();
            model.generateMarkupInputs(NUM_ROWS(), NUM_COLS());
            if (isNaN(model.generateMarkupInputs().NR))
              throw Error(`"${NUM_ROWS() || numMatInputs.value}" isn't a number`);

            if (isNaN(model.generateMarkupInputs().NC))
              throw Error(`"${NUM_COLS() || numMatInputsCols.value}" isn't a number`);

            if (model.generateMarkupInputs().NC <= 0 || model.generateMarkupInputs().NC > 600)
              throw Error(`can't create matrix with "${model.generateMarkupInputs().NC}" Cols`);

            if (model.generateMarkupInputs().NR <= 0 ||model.generateMarkupInputs().NR > 600)
              throw Error(`can't create matrix with "${model.generateMarkupInputs().NR}" Rows`);
          }
        }
      } catch (error) {
        console.error(error);
        userInputsUl.innerHTML = error.message;
      }
    })
  );
};

export default new view();
