import { axisBottom, axisLeft } from "d3-axis";
import { scaleLinear } from "d3-scale";
import { select, selectAll } from "d3-selection";
import { area, line } from "d3-shape";

/** Constants */
const PLOT_WIDTH = 200;
const PLOT_HEIGHT = 150;
const PLOT_PADDING = 0.1 * ((PLOT_WIDTH + PLOT_HEIGHT) / 2);

const PLOT_PANE_WIDTH = PLOT_WIDTH - 2 * PLOT_PADDING;
const PLOT_PANE_HEIGHT = PLOT_HEIGHT - 2 * PLOT_PADDING;

const FUNCTION = (x: number) => x ** 2;

const DOMAIN_START = -0.5;
const DOMAIN_STOP = 2.5;
const DOMAIN = [DOMAIN_START, DOMAIN_STOP];
const DOMAIN_WIDTH = Math.abs(DOMAIN_STOP - DOMAIN_START);
const DOMAIN_SCALE = scaleLinear().domain(DOMAIN).range([0, PLOT_PANE_WIDTH]);
const DOMAIN_AXIS = axisBottom(DOMAIN_SCALE)
  .tickSizeOuter(0)
  .ticks(Math.floor(DOMAIN_WIDTH));

const RANGE_START = DOMAIN_START;
const RANGE_STOP = 5; // f is monotonically increasing
const RANGE = [RANGE_START, RANGE_STOP];
// const RANGE_WIDTH = Math.abs(RANGE_STOP - RANGE_START);
const RANGE_SCALE = scaleLinear().domain(RANGE).range([PLOT_PANE_HEIGHT, 0]);
const RANGE_AXIS = axisLeft(RANGE_SCALE)
  .tickSizeOuter(0)
  .ticks(Math.floor(DOMAIN_WIDTH));

const NUM_POINTS = 500;
const STEP_SIZE = NUM_POINTS > 1 ? DOMAIN_WIDTH / (NUM_POINTS - 1) : 0;
const POINTS = new Array<[number, number]>(NUM_POINTS);
for (let i = 0; i < NUM_POINTS; i++) {
  const x = DOMAIN_START + STEP_SIZE * i;
  const y = FUNCTION(x);
  POINTS[i] = [x, y];
}

const LINE_GENERATOR = line()
  .x(([x, _]) => DOMAIN_SCALE(x) + PLOT_PADDING)
  .y(([_, y]) => RANGE_SCALE(y) + PLOT_PADDING);

/** Methods */
// Area
function loadAreaPlot(): void {
  // Arrange
  const plotRoot = select(".plot#area");
  const plotPane = plotRoot.select<SVGSVGElement>(".pane");
  const plotPlots = plotPane.select<SVGGElement>(".plots");
  const layer = plotPlots.append("g").attr("class", "area");
  const [x0, x1] = [1, 2];
  const xStepSize = NUM_POINTS > 1 ? Math.abs(x1 - x0) / (NUM_POINTS - 1) : 0;
  const areaGenerator = area()
    .x(([x, _]) => PLOT_PADDING + DOMAIN_SCALE(x))
    .y0(PLOT_PADDING + RANGE_SCALE(0))
    .y1(([_, y]) => PLOT_PADDING + RANGE_SCALE(y));
  const areaPoints = new Array<[number, number]>(NUM_POINTS);
  for (let i = 0; i < NUM_POINTS; i++) {
    const x = x0 + xStepSize * i;
    const y = FUNCTION(x);
    areaPoints[i] = [x, y];
  }
  // Act
  layer
    .append("path")
    .attr("class", "area")
    .attr("d", areaGenerator(areaPoints));
  layer
    .append("path")
    .attr(
      "d",
      LINE_GENERATOR(loadVerticalLinePoints({ x: x0, numPoints: NUM_POINTS }))
    );
  layer
    .append("path")
    .attr(
      "d",
      LINE_GENERATOR(loadVerticalLinePoints({ x: x1, numPoints: NUM_POINTS }))
    );
}

function loadVerticalLinePoints(params: {
  x: number;
  numPoints: number;
}): Array<[number, number]> {
  const points = new Array<[number, number]>(params.numPoints);
  const stepSize =
    params.numPoints > 1
      ? (RANGE_STOP - RANGE_START) / (params.numPoints - 1)
      : 0;
  for (let i = 0; i < params.numPoints; i++) {
    const y = stepSize * i;
    points[i] = [params.x, y];
  }
  return points;
}

// Secant line
function loadRectanglesAreaPlot(): void {
  // Arrange
  const plotRoot = select(".plot.interactive#rectangles");
  const plotMenu = plotRoot.select(".menu");
  const plotSlider = plotMenu.select<HTMLInputElement>("input");
  const plotPane = plotRoot.select<SVGSVGElement>(".pane");
  const plotPlots = plotPane.select<SVGGElement>(".plots");
  const layer = plotPlots.append("g").attr("class", "area");
  const [x0, x1] = [1, 2];
  const intervalWidth = Math.abs(x1 - x0);
  const initialDelta = 0.2;
  const getDelta = () => {
    const element = plotSlider.node();
    const delta = parseFloat(element ? element.value : `0`);
    if (Math.abs(delta) < 1e-1) {
      return Math.sign(delta) * 1e-1;
    } else {
      return delta;
    }
  };
  const initialNumRectangles = Math.floor(1 / initialDelta);
  const getNumRectangles = () => {
    const delta = getDelta();
    return Math.floor(1 / delta);
  };
  const initialStepSize =
    initialNumRectangles > 0 ? intervalWidth / initialNumRectangles : 0;
  const getStepSize = () => {
    const numRectangles = getNumRectangles();
    return numRectangles > 0 ? intervalWidth / numRectangles : 0;
  };
  const initialRectangleCornerPoints = new Array<[number, number]>(
    initialNumRectangles
  );
  for (let i = 0; i < initialNumRectangles; i++) {
    const x = x0 + initialStepSize * i;
    const y = FUNCTION(x);
    initialRectangleCornerPoints[i] = [x, y];
  }
  const getRectangleCornerPoints = () => {
    const numRectangles = getNumRectangles();
    const stepSize = getStepSize();
    const rectangleCornerPoints = new Array<[number, number]>(numRectangles);
    for (let i = 0; i < initialNumRectangles; i++) {
      const x = x0 + stepSize * i;
      const y = FUNCTION(x);
      rectangleCornerPoints[i] = [x, y];
    }
    return rectangleCornerPoints;
  };
  // Act
  layer
    .append("path")
    .attr(
      "d",
      LINE_GENERATOR(loadVerticalLinePoints({ x: x0, numPoints: NUM_POINTS }))
    );
  layer
    .append("path")
    .attr(
      "d",
      LINE_GENERATOR(loadVerticalLinePoints({ x: x1, numPoints: NUM_POINTS }))
    );
  layer
    .selectAll("rect")
    .data(initialRectangleCornerPoints)
    .join("rect")
    .attr("x", ([x, _]) => PLOT_PADDING + DOMAIN_SCALE(x))
    .attr("y", ([_, y]) => PLOT_PADDING + RANGE_SCALE(y))
    .attr(
      "width",
      ((intervalWidth / DOMAIN_WIDTH) * PLOT_PANE_WIDTH) / initialNumRectangles
    )
    .attr("height", ([_, y]) => PLOT_PADDING + RANGE_SCALE(y));
  plotSlider.on("input", () => {
    const numRectangles = getNumRectangles();
    const rectangleCornerPoints = getRectangleCornerPoints();
    const delta = getDelta();
    const area = rectangleCornerPoints
      .map(([_, y]) => y * delta)
      .reduce((soFar, current) => soFar + current, 0);
    layer
      .selectAll("rect")
      .data(rectangleCornerPoints)
      .join("rect")
      .attr("x", ([x, _]) => PLOT_PADDING + DOMAIN_SCALE(x))
      .attr("y", ([_, y]) => PLOT_PADDING + RANGE_SCALE(y))
      .attr(
        "width",
        ((intervalWidth / DOMAIN_WIDTH) * PLOT_PANE_WIDTH) / numRectangles
      )
      .attr("height", ([_, y]) => PLOT_PADDING + RANGE_SCALE(y));
    plotMenu.select("span.value.delta").text(delta.toFixed(2));
    plotMenu.select("span.value.area").text(area.toFixed(2));
  });
}

// Secant line
function loadSecantLinePlot(): void {
  // Arrange
  const plotRoot = select(".plot.interactive#secant");
  const plotMenu = plotRoot.select(".menu");
  const plotSlider = plotMenu.select<HTMLInputElement>("input");
  const plotPane = plotRoot.select<SVGSVGElement>(".pane");
  const plotPlots = plotPane.select<SVGGElement>(".plots");
  const layer = plotPlots.append("g").attr("class", "secant");
  const delta = 1;
  const [x0, y0] = [1, 1];
  const x1 = (delta: number) => x0 + delta;
  const y1 = (x1: number) => FUNCTION(x1);
  const m = (x1: number, y1: number) => (y1 - y0) / (x1 - x0);
  const y = (x: number, m: number) => m * (x - x0) + y0;
  const initialX1 = x1(delta);
  const initialY1 = y1(initialX1);
  const points = (delta: number) => {
    const _points = new Array<[number, number]>(NUM_POINTS);
    const _x1 = x1(delta);
    const _y1 = y1(_x1);
    const _m = m(_x1, _y1);
    for (let i = 0; i < NUM_POINTS; i++) {
      const x = DOMAIN_START + STEP_SIZE * i;
      _points[i] = [x, y(x, _m)];
    }
    return _points;
  };
  // Act
  layer.append("path").attr("d", LINE_GENERATOR(points(delta)));
  layer
    .append("circle")
    .attr("class", "start")
    .attr("cx", PLOT_PADDING + DOMAIN_SCALE(x0))
    .attr("cy", PLOT_PADDING + RANGE_SCALE(y0))
    .attr("r", "0.1em");
  layer
    .append("circle")
    .attr("class", "stop")
    .attr("cx", PLOT_PADDING + DOMAIN_SCALE(initialX1))
    .attr("cy", PLOT_PADDING + RANGE_SCALE(initialY1))
    .attr("r", "0.1em");
  plotSlider.on("input", () => {
    const element = plotSlider.node();
    let _delta = parseFloat(element ? element.value : `0`);
    _delta = Math.abs(_delta) < 1e-2 ? 1e-2 : _delta;
    const _x1 = x1(_delta);
    const _y1 = y1(_x1);
    const _m = m(_x1, _y1);
    layer.select("path").attr("d", LINE_GENERATOR(points(_delta)));
    layer
      .select("circle.stop")
      .attr("cx", PLOT_PADDING + DOMAIN_SCALE(_x1))
      .attr("cy", PLOT_PADDING + RANGE_SCALE(_y1));
    plotMenu.select("span.value.delta").text(_delta.toFixed(2));
    plotMenu.select("span.value.slope").text(_m.toFixed(2));
  });
}

// Tangent line
function loadTangentLinePlot(): void {
  // Arrange
  const plotRoot = select(".plot#tangent");
  const plotPane = plotRoot.select<SVGSVGElement>(".pane");
  const plotPlots = plotPane.select<SVGGElement>(".plots");
  const layer = plotPlots.append("g").attr("class", "tangent");
  const y = (x: number, m: number = 2, b: number = -1) => m * x + b;
  const points = new Array<[number, number]>(NUM_POINTS);
  for (let i = 0; i < NUM_POINTS; i++) {
    const x = STEP_SIZE * i;
    points[i] = [x, y(x)];
  }
  // Act
  layer.append("path").attr("d", LINE_GENERATOR(points));
  layer
    .append("circle")
    .attr("cx", PLOT_PADDING + DOMAIN_SCALE(1))
    .attr("cy", PLOT_PADDING + RANGE_SCALE(1))
    .attr("r", "0.1em");
}

// Base rendering
function loadAllPlotClipPaths(): void {
  const plotRoot = selectAll(".plot");
  const plotUtilities = plotRoot.select<SVGGElement>(".utilities");
  const clipPath = plotUtilities
    .append("clipPath")
    .attr("id", "default-clip-path");
  clipPath
    .append("rect")
    .attr("x", `${PLOT_PADDING}`)
    .attr("y", `${PLOT_PADDING}`)
    .attr("width", `${PLOT_PANE_WIDTH}`)
    .attr("height", `${PLOT_PANE_HEIGHT}`);
}

function loadAllPlotAxes(): void {
  const plotRoot = selectAll(".plot");
  const plotPane = plotRoot.select<SVGSVGElement>(".pane");
  const plotAxes = plotPane.select<SVGGElement>(".axes");
  const plotAxisX = plotAxes.select<SVGGElement>(".x-axis");
  const plotAxisY = plotAxes.select<SVGGElement>(".y-axis");
  plotAxisX
    .attr(
      "transform",
      `translate(${PLOT_PADDING},${PLOT_PADDING + RANGE_SCALE(0)})`
    )
    .call(DOMAIN_AXIS);
  plotAxisY
    .attr(
      "transform",
      `translate(${PLOT_PADDING + DOMAIN_SCALE(0)},${PLOT_PADDING})`
    )
    .call(RANGE_AXIS);
}

function loadAllBasePlots(): void {
  // Arrange
  const plotRoot = selectAll(".plot");
  const plotPane = plotRoot.select<SVGSVGElement>(".pane");
  const plotPlots = plotPane.select<SVGGElement>(".plots");
  // Act
  plotPlots
    .attr("clip-path", "url(#default-clip-path)")
    .append("g")
    .attr("class", "base")
    .append("path")
    .attr("d", LINE_GENERATOR(POINTS));
  // Return
  return;
}

/**
 * Apply the base function on all plots.
 */
function loadAllPlots(): void {
  loadAllPlotClipPaths();
  loadAllPlotAxes();
  loadAllBasePlots();
}

export function main(): void {
  loadAllPlots();
  loadTangentLinePlot();
  loadSecantLinePlot();
  loadAreaPlot();
  loadRectanglesAreaPlot();
}
