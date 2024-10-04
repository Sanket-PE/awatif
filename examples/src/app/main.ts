import van from "vanjs-core";
import * as THREE from "three";
import { sheets, viewer, layout, title, grid, marketing } from "awatif-ui";
import { html, TemplateResult } from "lit-html";

// init
const inputPolyline = van.state([
  [0, 0, 0],
  [5, 0, 5],
  [10, 0, 0],
]);
const outputLines = van.state([]);
const lines = new THREE.Line(
  new THREE.BufferGeometry(),
  new THREE.LineBasicMaterial()
);
const objects3D = van.state([lines]);
const sheetsObj = new Map();

// update
sheetsObj.set("polyline", {
  text: "Polyline",
  columns: [
    { field: "0", text: "X-coordinate", editable: { type: "float" } },
    { field: "1", text: "Y-coordinate", editable: { type: "float" } },
    { field: "2", text: "Z-coordinate", editable: { type: "float" } },
  ],
  data: inputPolyline,
});

// events
const onSheetChange = ({ data }) => (inputPolyline.val = data);

// on inputPolyline change: render lines
van.derive(() => {
  lines.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(inputPolyline.val.flat(), 3)
  );

  objects3D.val = [...objects3D.rawVal]; // trigger rendering
});

// on inputPolyline change: compute length
van.derive(() => {
  const lengths = [];

  for (let i = 0; i < inputPolyline.val.length - 1; i++) {
    lengths.push([
      getLength(inputPolyline.rawVal[i], inputPolyline.rawVal[i + 1]).toFixed(
        2
      ),
      `${i} - ${i + 1}`,
    ]);
  }

  outputLines.val = lengths;
});

document.body.append(
  layout({
    topLeft: { element: title("App Example") },
    topRight: {
      element: marketing({
        getStarted: getGetStartedHtml(),
        author: getAuthorHtml(),
      }),
    },
    main: { element: sheets(sheetsObj, onSheetChange), title: "Inputs" },
    preview: {
      element: grid(
        [
          { field: "0", text: "Line Length" },
          { field: "1", text: "Between" },
        ],
        outputLines
      ),
      title: "Outputs",
    },
    right: { element: viewer({ objects3D }) },
  })
);

// Utils
function getLength(point1: number[], point2: number[]): number {
  return Math.sqrt(
    Math.pow(point2[0] - point1[0], 2) +
      Math.pow(point2[1] - point1[1], 2) +
      Math.pow(point2[2] - point1[2], 2)
  );
}

function getGetStartedHtml(): TemplateResult {
  return html`<p>
      In this short video you will learn why we build the app and how to use it:
    </p>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/SDsDUmGxNXo?si=37wdyNkapXZcaDsD"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>`;
}

function getAuthorHtml(): TemplateResult {
  return html`<p style="line-height: 1.6">
      Hi, I'm Mohamed Adil, a passionate structural engineer and software
      developer based in Amsterdam, with extensive experience in both fields.
      While working on the design of high-rise buildings, I realized that the
      structural design process was inefficient, leading to wasted time and
      materials. This inspired me to focus on solving these challenges,
      resulting in the creation of Awatif, an open-source, web-based platform
      built with modern optimization and programming techniques to streamline
      structural design.
    </p>

    <p>
      If you'd like to chat about structural engineering, software development,
      or anything else, feel free to connect with me on LinkedIn:
      <a href="https://www.linkedin.com/in/madil4/" target="_blank"
        >https://www.linkedin.com/in/madil4/</a
      >
    </p>

    <img
      width="200"
      height="200"
      src="https://awatif.co/img/automate/mohamed.jpg"
    /> `;
}
