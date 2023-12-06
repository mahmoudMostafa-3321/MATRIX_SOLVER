"use strict";
import model from "./model/model.js";
import view from "./view/view.js";
import inverseView from "./view/inverseView.js";

/**
 * @augments (no)
 * @author (mahmoud mostafa)
 * @todo "Initialization app, According to the MVC rules"
 * @module (model)
 * @module (view)
 * @module (inverseView)
 */
const init = function () {
  model.generateMarkupInputs();
  model.addElementsToMatrix();
  view.userInputsHandler();
  view.numMatInputsHandler();
  inverseView.countInputsSize();
};

init();
