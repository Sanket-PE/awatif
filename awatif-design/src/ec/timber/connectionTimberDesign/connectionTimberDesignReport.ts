import { TemplateResult, html } from "lit-html";
import { renderMath } from "../utils/renderMath";
import {
  ConnectionTimberDesignerInput,
  ConnectionTimberDesignerOutput,
} from "./connectionTimberDesign";
import { container, setup3DCube } from "./utils/threejs3d";
import { ref } from "lit-html/directives/ref.js";

export function connectionTimberDesignReport(
  designInput: ConnectionTimberDesignerInput,
  designOutput: ConnectionTimberDesignerOutput
): TemplateResult {
  const i = designInput.connectionTimberDesign;
  let elementIndex = 0;

  let node = designInput.node;
  let elements = designOutput.designInput.map((v) => [v.element]).flat();
  let angles = designOutput.designInput.map((v) => [v.beamAngle]).flat();
  let heights = designOutput.designInput.map((v) => [v.height]).flat();
  let widths = designOutput.designInput.map((v) => [v.width]).flat();
  let axialForces = designOutput.designInput.map((v) => [
    v.axialForce.toFixed(0),
  ]);
  let beamAngles = designOutput.designInput.map((v) => [
    v.beamAngle.toFixed(0),
  ]);
  let sheetNumber = i.sheetNo;
  let sheetLength = designOutput.connectionTimberDesign
    .map((v) => [v.sheetLength])
    .flat();
  let sheetThickness = i.sheetThickness;
  let fastenerPositionX = designOutput.connectionTimberDesign
    .map((v) => [v.coordinatesX])
    .flat();
  let fastenerPositionZ = designOutput.connectionTimberDesign
    .map((v) => [v.coordinatesY])
    .flat();

  const o = designOutput.connectionTimberDesign[0];

  setup3DCube(
    angles,
    heights,
    widths,
    sheetNumber,
    sheetLength,
    sheetThickness,
    fastenerPositionX,
    fastenerPositionZ
  );

  function updateTable(elements: number[]): void {
    const table = document.getElementById("data-table") as HTMLTableElement; // Safely assert the element as HTMLTableElement

    elements.forEach((element, index) => {
      const row = table.insertRow(); // Insert a new row at the end of the table

      // Create a cell for each item and append text nodes with the data
      const cellNode = row.insertCell();
      const cellBeams = row.insertCell();
      const cellTimber = row.insertCell();
      const cellWidths = row.insertCell();
      const cellHeights = row.insertCell();
      const cellAngles = row.insertCell();
      const cellAxialLoads = row.insertCell();
      const cellFastenerCheck = row.insertCell();
      const cellBlockCheck = row.insertCell();
      const cellAxialCheck = row.insertCell();
      const cellStability = row.insertCell();

      // Assigning the text content for each cell based on the element's properties
      cellNode.textContent = node.toString();
      cellBeams.textContent = element.toString();
      cellTimber.textContent = i.timberGrade;
      cellWidths.textContent = `${widths[index]}mm`;
      cellHeights.textContent = `${heights[index]}mm`;
      cellAngles.textContent = `${beamAngles[index]}°`;
      cellAxialLoads.textContent = `${axialForces[index]}kN`;
      cellFastenerCheck.textContent = `${(
        designOutput.connectionTimberDesign[index].etaFastenerCheck * 100
      ).toFixed(0)}%`;
      cellBlockCheck.textContent = `${(
        designOutput.connectionTimberDesign[index].etaBlockFailure * 100
      ).toFixed(0)}%`;
      cellAxialCheck.textContent = `${(
        designOutput.connectionTimberDesign[index].etaAxialCheck * 100
      ).toFixed(0)}%`;
      cellStability.textContent = `${(
        designOutput.connectionTimberDesign[index].etaStability * 100
      ).toFixed(0)}%`;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    updateTable(elements);
  });

  let reportHeader = html` <br />
    <br />
    <header class="header">
      <div class="header-left">
        <h6>Timber Truss Designer</h6>
        <p class="bolt">Awatif.co</p>
        <p class="normal">20.05.2024</p>
      </div>
      <div class="header-right">
        <img src="./awatif-logo.png" id="headerLogo" height="60px" />
      </div>
    </header>`;

  let reportHeading = html`
    <br>
    <h1>Structural Report</h2>`;

  let reportSummary = html` <button class="collapsible">
      <h3>Connection Detail</h3>
    </button>
    <div class="content" style="display: none;">
      <div class="bolt">Connection Detail of Node ${node}</div>
      <div class="canvas-container" ref=${ref(container)}></div>
      <br />
      <div class="bolt">Summary Table</div>
      <br />
      <table id="data-table">
        <tr>
          <th>Node</th>
          <th>Beams</th>
          <th>Timber</th>
          <th>Width</th>
          <th>Height</th>
          <th>Angle</th>
          <th>Axial Load</th>
          <th>Fastener Check</th>
          <th>Block Failure</th>
          <th>Axial Member</th>
          <th>Stability Check</th>
        </tr>
        <!-- Rows will be added dynamically here -->
      </table>
      <br />
    </div>`;

  let reportLoadProperties = html` <button class="collapsible">
      <h3>Load Properties</h3>
    </button>
    <div class="content" style="display: none;">
      <p class="caption">EN 1995-1-1 Ch. 2.4</p>
      <p>
        Service class ${renderMath(`${i.serviceClass}`)} and Load duration:
        ${renderMath(`${i.loadDurationClass}`)} result in a modification factor
        of ${renderMath(`k_{mod} = ${o.kMod}`)}
      </p>
      <p>${renderMath(` \\gamma = 1.3`)}</p>
      <p>Resistance reduction factor</p>
      <p>${renderMath(` \\chi = \\frac{k_{mod}}{\\gamma} = ${o.chi}`)}</p>
    </div>`;

  let reportFastenerProperties = html`
    <button class="collapsible"><h3>Fastener Properties</h3></button>
    <div class="content" style="display: none;">
      <p class="caption">EN 1995-1-1 Ch. 8.5.1.1</p>
      <p>Characteristic value for the yield moment</p>
      <p>${renderMath(` M_{yRk} = f_{ub} \\cdot d^{2.6} = ${o.Myrk} Nmm`)}</p>
      <p>Characteristic tensile strength parallel to the grain</p>
      <p>
        ${renderMath(
          ` f_{h0k} = 0.082 \\cdot (1 - 0.01 \\cdot d) \\cdot \\rho_{k} = ${o.fh0k} \\frac{N}{mm^2}`
        )}
      </p>
    </div>
  `;

  let reportSpacings = html`
    <button class="collapsible"><h3>Spacings</h3></button>
    <div class="content" style="display: none;">
      <p><b>Timber Spacings</b></p>
      <p class="caption">EN 1995-1-1 Ch. 8.6 Tab.8.5</p>
      <table>
        <tr>
          <th>a<sub>1</sub></th>
          <th>a<sub>2</sub></th>
          <th>a<sub>3t</sub></th>
          <th>a<sub>3c</sub></th>
          <th>a<sub>4t</sub></th>
          <th>a<sub>4c</sub></th>
        </tr>
        <tr>
          <td>${o.minDistancesListTimber[0]} mm</td>
          <td>${o.minDistancesListTimber[1]} mm</td>
          <td>${o.minDistancesListTimber[2]} mm</td>
          <td>${o.minDistancesListTimber[3]} mm</td>
          <td>${o.minDistancesListTimber[4]} mm</td>
          <td>${o.minDistancesListTimber[5]} mm</td>
        </tr>
      </table>

      <p><b>Steel Spacings</b></p>
      <p class="caption">EN 1993-1-1 Ch.</p>

      <table>
        <tr>
          <th>a<sub>1</sub></th>
          <th>a<sub>2</sub></th>
          <th>a<sub>3</sub></th>
          <th>a<sub>4</sub></th>
        </tr>
        <tr>
          <td>${o.minDistancesListTimber[0]} mm</td>
          <td>${o.minDistancesListTimber[1]} mm</td>
          <td>${o.minDistancesListTimber[2]} mm</td>
          <td>${o.minDistancesListTimber[3]} mm</td>
        </tr>
      </table>

      <p><b>Final Spacings</b></p>

      <table>
        <p class="caption">Final spacings</p>
        <tr>
          <th>a<sub>1</sub></th>
          <th>a<sub>2</sub></th>
          <th>a<sub>3</sub></th>
          <th>a<sub>4</sub></th>
          <th>e<sub>1</sub></th>
        </tr>
        <tr>
          <td>${o.distancesFinal[0]} mm</td>
          <td>${o.distancesFinal[1]} mm</td>
          <td>${o.distancesFinal[2]} mm</td>
          <td>${o.distancesFinal[3]} mm</td>
          <td>${o.distancesFinal[4]} mm</td>
        </tr>
      </table>
    </div>
  `;

  let reportFastenerCapacity = html`
    <button class="collapsible"><h3>Fastener Capacity</h3></button>
    <div class="content" style="display: none;">
      <p class="caption">EN 1995-1-1 Ch. 8.2.3-8.11</p>
      <p>Characteristic fastener capacities</p>
      <p class="caption">Equation f</p>
      <p>${renderMath(` F_{vRkf} = f_{hk} \\cdot t_{1}*d = ${o.Fvrk_f} kN`)}</p>
      <p class="caption">Equation g</p>
      <p>
        ${renderMath(
          ` F_{vRkg} = f_{hk} \\cdot t_{2}*d \\cdot ( \\sqrt{2+ \\frac{4 \\cdot M_{yRk}}{f_{hk} \\cdot d \\cdot t_{1}^2}} ) = ${o.Fvrk_g} kN`
        )}
      </p>
      <p class="caption">Equation h</p>
      <p>
        ${renderMath(
          ` F_{vRkh} = 2.3 \\cdot \\sqrt{2 \\cdot M_{yRk} \\cdot f_{hk} \\cdot d} = ${o.Fvrk_h} kN`
        )}
      </p>
      <p>Characteristic fastener capacity</p>
      <p>${renderMath(` F_{vRk} = ${Math.max(o.Fvrk_1, o.Fvrk_2)} kN`)}</p>
      <p>Design fastener capacity</p>
      <p>${renderMath(` F_{vRd} = ${o.Fvrd} kN`)}</p>
    </div>
  `;

  let reportFastenerCapacityCheck = html`
    <button class="collapsible"><h3>Fastener Check</h3></button>
    <div class="content" style="display: none;">
      <table>
        <tr>
          <th>diameter</th>
          <th>no<sub>perp</sub></th>
          <th>no<sub>axial</sub></th>
          <th>no<sub>axial.eff</sub></th>
          <th>no<sub>total</sub></th>
          <th>no<sub>total.eff</sub></th>
          <th>F<sub>vRd.total</sub></th>
        </tr>
        <tr>
          <td>${i.fastenerDiameter} mm</td>
          <td>${o.noPerp}</td>
          <td>${o.noAxial}</td>
          <td>${o.noAxialEffective.toFixed(2)}</td>
          <td>${o.noTotal}</td>
          <td>${o.noTotalEffective.toFixed(2)}</td>
          <td>${o.FvrdTotal.toFixed(2)} kN</td>
        </tr>
      </table>

      <p>Fastener Capacity Check</p>
      <p>
        ${renderMath(
          ` \\eta = \\frac{N_{ed}}{F_{Rd.total}} = ${(
            o.etaFastenerCheck * 100
          ).toFixed(0)}`
        )}
        %
      </p>
    </div>
  `;

  let reportCompressionCheck = html`
    <button class="collapsible"><h3>Compression Check</h3></button>
    <div class="content" style="display: none;">
      <p class="caption">EN 1995-1-1 Abs. 6.1.7</p>
      <p>Member Compression Check</p>
      <p>Design load</p>
      <p>
        ${renderMath("N_{cd} = " + axialForces[elementIndex] + " \\text{ kN}")}
      </p>
      <p>Characteristic compressive strength</p>
      <p>${renderMath("f_{c0k} = " + o.fct0k + " \\frac{N}{mm^2}")}</p>
      <p>Design compressive strength</p>
      <p>
        ${renderMath(
          "f_{c0d} = f_{c0k} \\cdot \\chi \\cdot 0.4 = " +
            o.fctd +
            " \\frac{N}{mm^2}"
        )}
      </p>
      <p>Effective width</p>
      <p>
        ${renderMath(
          "b_{ef} = \\frac{B}{n_{sheet} + 1} - \\frac{t_{sheet}}{2} = " +
            o.befct +
            " \\text{ cm}"
        )}
      </p>
      <p>Effective area</p>
      <p>
        ${renderMath(
          "A_{net} = H \\cdot b_{ef} = " + o.Anet + " \\text{ cm}^2"
        )}
      </p>
      <p>Design compressive stress</p>
      <p>
        ${renderMath(
          "\\sigma_{c0d} = \\frac{N_{cd}}{A_{net}} = " +
            o.sigmact0d +
            " \\frac{N}{mm^2}"
        )}
      </p>
      <p>Utilization</p>
      <p class="caption">EN 1995-1-1 Eq. 6.2</p>
      <p>
        ${renderMath(
          "\\eta = \\frac{\\sigma_{c0d}}{f_{c0d}} = " +
            (o.etaAxialCheck * 100).toFixed(0) +
            " \\%"
        )}
      </p>
    </div>
  `;

  let reportTensionCheck = html`
    <button class="collapsible"><h3>Tension Check</h3></button>
    <div class="content" style="display: none;">
      <p class="caption">EN 1995-1-1 Abs. 6.1.7</p>
      <p>Member Tension Check</p>
      <p>Design load</p>
      <p>
        ${renderMath("N_{td} = " + axialForces[elementIndex] + " \\text{ kN}")}
      </p>
      <p>Characteristic tensile strength</p>
      <p>${renderMath("f_{t0k} = " + o.fct0k + " \\frac{N}{mm^2}")}</p>
      <p>Design tensile strength</p>
      <p>
        ${renderMath(
          "f_{t0d} = f_{t0k} \\cdot \\chi \\cdot 0.4 = " +
            o.fctd +
            " \\frac{N}{mm^2}"
        )}
      </p>
      <p>Effective width</p>
      <p>
        ${renderMath(
          "b_{ef} = \\frac{B}{n_{sheet} + 1} - \\frac{t_{sheet}}{2} = " +
            o.befct +
            " \\text{ cm}"
        )}
      </p>
      <p>Effective area</p>
      <p>
        ${renderMath(
          "A_{net} = H \\cdot b_{ef} - n_{perp} \\cdot d \\cdot b_{ef} = " +
            o.Anet +
            " \\text{ cm}^2"
        )}
      </p>
      <p>Design tensile stress</p>
      <p>
        ${renderMath(
          "\\sigma_{t0d} = \\frac{N_{td}}{A_{net}} = " +
            o.sigmact0d +
            " \\frac{N}{mm^2}"
        )}
      </p>
      <p>Utilization</p>
      <p class="caption">EN 1995-1-1 Eq. 6.1</p>
      <p>
        ${renderMath(
          "\\eta = \\frac{\\sigma_{t0d}}{f_{t0d}} = " +
            (o.etaAxialCheck * 100).toFixed(0) +
            " \\%"
        )}
      </p>
    </div>
  `;

  let reportAxialBlockFailureCheck = html`
    <button class="collapsible"><h3>Axial Block Failure Check</h3></button>
    <div class="content" style="display: none;">
      <p class="caption">EN 1995-1-1 Abs. 6.1.8</p>
      <p>Tensile strength</p>
      <p>${renderMath(`f_{u} = ${o.fub} \\frac{N}{mm^2}`)}</p>
      <p>${renderMath(`f_{y} = 435 \\frac{N}{mm^2}`)}</p>
      <p>${renderMath(`d_{0} = d + 0.6 mm = ${i.fastenerDiameter} + 6 `)} mm</p>
      <p>Effective areas</p>
      <p>${renderMath(` L_{h} = a_{2} \\cdot (n_{perp} - 1) = ${o.Lh} `)} mm</p>
      <p>
        ${renderMath(
          ` L_{v} = a_{1} \\cdot (n_{axial} - 1) + e_{1} = ${o.Lv} `
        )}
        mm
      </p>
      <p>
        ${renderMath(
          ` A_{nt} = (L_{h} - (n_{axial} - 1) \\cdot d_{0}) \\cdot t = ${o.Ant} cm^2`
        )}
      </p>
      <p>
        ${renderMath(
          ` A_{nv} = 2 \\cdot (L_{v} - (n_{perp} - 0.5) \\cdot d_{0}) \\cdot t = ${o.Anv} cm^2`
        )}
      </p>
      <p>Resistance</p>
      <p>
        ${renderMath(
          ` V_{eff.Rd} = \\frac{f_{u} \\cdot A_{nt}}{1.25} + \\frac{f_{y} \\cdot A_{nv}}{ \\sqrt{3} + 1 } = ${o.VeffRd} cm^2`
        )}
      </p>
      <p>Design axial load</p>
      <p>${renderMath(` N_{ed} = ${axialForces[elementIndex]} `)} kN</p>
      <p>Utilization</p>
      <p>
        ${renderMath(
          ` \\eta = \\frac{ N_{ed} }{ V_{eff.Rd}} = ${(
            o.etaBlockFailure * 100
          ).toFixed(0)} %`
        )}
      </p>
    </div>
  `;

  let reportStabilityCheck = html`
    <button class="collapsible"><h3>Axial Block Failure Check</h3></button>
    <div class="content" style="display: none;">
      <p class="caption">EN 1995-1-1 Abs. 6.1.8</p>
      <p>Tensile strength</p>
      <p>${renderMath(`f_{u} = ${o.fub} \\frac{N}{mm^2}`)}</p>
      <p>${renderMath(`f_{y} = 435 \\frac{N}{mm^2}`)}</p>
      <p>${renderMath(`d_{0} = d + 0.6 mm = ${i.fastenerDiameter} + 6 `)} mm</p>
      <p>Effective areas</p>
      <p>${renderMath(` L_{h} = a_{2} \\cdot (n_{perp} - 1) = ${o.Lh} `)} mm</p>
      <p>
        ${renderMath(
          ` L_{v} = a_{1} \\cdot (n_{axial} - 1) + e_{1} = ${o.Lv} `
        )}
        mm
      </p>
      <p>
        ${renderMath(
          ` A_{nt} = (L_{h} - (n_{axial} - 1) \\cdot d_{0}) \\cdot t = ${o.Ant} cm^2`
        )}
      </p>
      <p>
        ${renderMath(
          ` A_{nv} = 2 \\cdot (L_{v} - (n_{perp} - 0.5) \\cdot d_{0}) \\cdot t = ${o.Anv} cm^2`
        )}
      </p>
      <p>Resistance</p>
      <p>
        ${renderMath(
          ` V_{eff.Rd} = \\frac{f_{u} \\cdot A_{nt}}{1.25} + \\frac{f_{y} \\cdot A_{nv}}{ \\sqrt{3} + 1 } = ${o.VeffRd} cm^2`
        )}
      </p>
      <p>Design axial load</p>
      <p>${renderMath(` N_{ed} = ${axialForces[elementIndex]} `)} kN</p>
      <p>Utilization</p>
      <p>
        ${renderMath(
          ` \\eta = \\frac{ N_{ed} }{ V_{eff.Rd}} = ${(
            o.etaBlockFailure * 100
          ).toFixed(0)} %`
        )}
      </p>
    </div>
  `;

  let reportNoStabilityCheck = html`
    <button class="collapsible"><h3>Stability Check</h3></button>
    <div class="content" style="display: none;">
      <p>No stability check required.</p>
    </div>
  `;

  let reportMemberCheck;

  if (o.force > 0) {
    reportMemberCheck = reportTensionCheck;
  } else {
    reportMemberCheck = reportCompressionCheck;
  }

  if (o.force > 0) {
    reportStabilityCheck = reportNoStabilityCheck;
  } else {
    reportStabilityCheck = reportStabilityCheck;
  }

  let reportContent = html`
    ${reportHeader} ${reportHeading}
    <h2>Summary</h2>
    <br />
    ${reportSummary}
    <br />
    <h2>Input Parameters</h2>
    <br />
    ${reportLoadProperties}
    <br />
    ${reportFastenerProperties}
    <br />
    ${reportSpacings}
    <br />
    ${reportFastenerCapacity}
    <br />
    <h2>Connection Design</h2>
    <br />
    ${reportFastenerCapacityCheck}
    <br />
    ${reportAxialBlockFailureCheck}
    <br />
    <h2>Member Design</h2>
    <br />
    ${reportMemberCheck}
    <br />
    ${reportStabilityCheck}
    <br />
    <br />
  `;

  return reportContent;
}

// JavaScript for collapsible
document.addEventListener("DOMContentLoaded", () => {
  const coll = document.getElementsByClassName("collapsible");
  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      // @ts-ignore
      this.classList.toggle("active");
      // @ts-ignore
      const content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
});
