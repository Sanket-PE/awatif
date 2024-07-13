import { Pane } from "tweakpane";
import { Model, SettingsState } from "./types";

export function settings(model: Model, settingsState: SettingsState) {
  // init
  const pane = new Pane({ title: "Settings", expanded: false });
  const container = pane.element.parentElement;

  // update
  if (container) {
    container.style.top = "0px";
    container.style.bottom = "inherit";
    container.style.left = "8px";
    container.style.width = "300px";
    container.style.zIndex = "3";
  }

  pane.addBinding(settingsState.displayScale, "val", {
    label: "Display scale",
    min: -10,
    max: 10,
    step: 1,
  });

  if (model.nodes) {
    pane.addBinding(settingsState.nodes, "val", { label: "Nodes" });
    pane.addBinding(settingsState.elements, "val", {
      label: "Elements",
    });
    pane.addBinding(settingsState.nodesIndexes, "val", {
      label: "Nodes indexes",
    });
    pane.addBinding(settingsState.elementsIndexes, "val", {
      label: "Elements indexes",
    });
    pane.addBinding(settingsState.orientations, "val", {
      label: "Orientations",
    });
  }

  if (model.analysisInputs) {
    const inputs = pane.addFolder({ title: "Analysis Inputs" });

    inputs.addBinding(settingsState.supports, "val", { label: "Supports" });
    inputs.addBinding(settingsState.loads, "val", { label: "Loads" });
  }

  if (model.analysisOutputs) {
    const outputs = pane.addFolder({ title: "Analysis Outputs" });

    outputs.addBinding(settingsState.elementResults, "val", {
      options: {
        none: "none",
        normal: "normal",
        shearY: "shearY",
        shearZ: "shearZ",
        torsion: "torsion",
        bendingY: "bendingY",
        bendingZ: "bendingZ",
      },
      label: "Element results",
    });
    outputs.addBinding(settingsState.nodeResults, "val", {
      options: {
        none: "none",
        deformation: "deformation",
        reaction: "reaction",
      },
      label: "Node results",
    });
    outputs.addBinding(settingsState.deformedShape, "val", {
      label: "Deformed shape",
    });
  }
}
