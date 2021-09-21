import React, { Component } from "react";
import * as d3 from "d3";
import { event as currentEvent } from "d3";
import axios from "axios";

// import "./BarChart.css";

// ***** Default svg data
const defaultSvgWidth = 640;
const defaultSvgHeight = 480;
const defaultSvgMargin = { top: 20, right: 5, bottom: 20, left: 35 };
const defaultSvgScrollHeight = 60;
const defaultPadding = 0.2;
const defaultSliceWidth = 7;

class BarChart extends Component {
  constructor(props) {
    super(props);

    const svgWidth = props.width === undefined ? defaultSvgWidth : props.width;
    const svgHeight =
      props.height === undefined ? defaultSvgHeight : props.height;
    const svgMargin =
      props.margin === undefined ? defaultSvgMargin : props.margin;
    const svgScrollHeight =
      props.scrollHeight === undefined
        ? defaultSvgScrollHeight
        : props.scrollHeight;
    const svgScrollMargin = { ...svgMargin, bottom: 0 };
    const padding =
      props.padding === undefined ? defaultPadding : props.padding;
    const sliceWidth =
      props.bars === undefined ? defaultSliceWidth : props.bars;

    this.state = {
      svgWidth,
      svgHeight,
      svgMargin,
      svgScrollHeight,
      svgScrollMargin,
      padding,
      sliceStart: 0,
      sliceWidth,
      centers: [],

      xScale: d3
        .scaleBand()
        .range([svgMargin.left, svgWidth - svgMargin.right])
        .padding(padding),
      yScale: d3
        .scaleLinear()
        .range([svgHeight - svgMargin.bottom - svgScrollHeight, svgMargin.top]),
      xAxisRef: null,
      yAxisRef: null,

      xScrollScale: d3
        .scaleBand()
        .range([svgScrollMargin.left, svgWidth - svgScrollMargin.right])
        .padding(padding),
      yScrollScale: d3
        .scaleLinear()
        .range([svgHeight, svgHeight - svgScrollHeight + svgScrollMargin.top]),
      scrollRef: null,

      scrollSelectorWidth: 0,
      scrollSelectorMinX: 0,
      scrollSelectorMaxX: 0,
      scrollBandWidth: 0,
      scrollSelectorX: svgScrollMargin.left,

      bars: [],
      scrollBars: [],
    };

    this.xAxis = d3.axisBottom().scale(this.state.xScale);
    this.yAxis = d3
      .axisLeft()
      .scale(this.state.yScale)
      .tickFormat((d) => `${d}`);
  }

  xAxisRef = (element) => {
    this.setState({ xAxisRef: element });
    d3.select(element).call(this.xAxis);
  };

  yAxisRef = (element) => {
    this.setState({ yAxisRef: element });
    d3.select(element).call(this.yAxis);
  };

  scrollRef = (element) => {
    this.setState({ scrollRef: element });
    d3.select(element).call(d3.drag().on("drag", this.scrollDrag));
  };

  scrollDrag = () => {
    let newX = this.state.scrollSelectorX + d3.event.dx;
    let newSlice = 0;
    const oldSlice = this.state.sliceStart;

    if (newX > this.state.scrollSelectorMaxX) {
      newX = this.state.scrollSelectorMaxX;
    } else if (newX < this.state.scrollSelectorMinX) {
      newX = this.state.scrollSelectorMinX;
    }

    newSlice = newX - this.state.scrollSelectorMinX;
    newSlice = Math.round(newSlice / this.state.scrollBandWidth);

    if (newSlice !== oldSlice) {
      const bars = this.calculateBars(newSlice);
      this.setState({ scrollSelectorX: newX, sliceStart: newSlice, bars });
    } else {
      this.setState({ scrollSelectorX: newX });
    }
  };

  calculateBars = (newSliceStart) => {
    // const  data  = this.props.data;

    // const data = this.state.centers;
    const { data } = this.props;

    console.log(data);
    let {
      xScale,
      yScale,
      sliceStart,
      sliceWidth,
      svgHeight,
      svgMargin,
      svgScrollHeight,
    } = this.state;

    if (newSliceStart !== undefined) {
      sliceStart = newSliceStart;
    }

    const activityDomain = data
      .slice(sliceStart, sliceStart + sliceWidth)
      .map((d) => d.activity);
    const valueMax = d3.max(data, (d) => d.value);

    xScale.domain(activityDomain);
    yScale.domain([0, valueMax]);

    const bars = data
      .slice(sliceStart, sliceStart + sliceWidth)
      .map((d, index) => {
        const x = xScale(d.activity);
        const y = yScale(d.value);
        const width = xScale.bandwidth();
        const height = svgHeight - svgMargin.bottom - svgScrollHeight - y;
        const fill = "rgba(54, 162, 235)";

        return {
          index,
          x,
          y,
          height,
          width,
          fill,
        };
      });

    return bars;
  };

  calculateScrollBars = () => {
    const { data } = this.props;
    const { xScrollScale, yScrollScale, svgHeight } = this.state;

    const scrollActivityDomain = data.map((d) => d.activity);
    const valueMax = d3.max(data, (d) => d.value);

    xScrollScale.domain(scrollActivityDomain);
    yScrollScale.domain([0, valueMax]);

    const scrollBars = data.map((d, index) => {
      const scrollX = xScrollScale(d.activity);
      const scrollY = yScrollScale(d.value);
      const scrollWidth = xScrollScale.bandwidth();
      const scrollHeight = svgHeight - scrollY;
      const scrollFill = "#cccccc";

      return {
        index,
        scrollX,
        scrollY,
        scrollWidth,
        scrollHeight,
        scrollFill,
      };
    });

    return scrollBars;
  };

  calculateScrolSellector = (scrollBarsLength) => {
    const { sliceWidth, svgWidth, svgScrollMargin } = this.state;

    const scaleWidth = svgWidth - svgScrollMargin.right - svgScrollMargin.left;
    const scrollSelectorWidth = Math.round(
      (sliceWidth / scrollBarsLength) * scaleWidth
    );
    const scrollSelectorMinX = svgScrollMargin.left;
    const scrollSelectorMaxX =
      svgWidth - svgScrollMargin.right - scrollSelectorWidth;
    const scrollBandWidth = Math.round(scaleWidth / scrollBarsLength);

    return {
      scrollSelectorWidth,
      scrollSelectorMinX,
      scrollSelectorMaxX,
      scrollBandWidth,
    };
  };

  calculateChart = () => {
    // if (this.props.data == undefined) {
    //   return;
    // }
    // console.log("dd");
    const bars = this.calculateBars();
    const scrollBars = this.calculateScrollBars();
    const selector = this.calculateScrolSellector(scrollBars.length);

    const states = { ...selector, bars, scrollBars };

    this.setState(states);
  };

  componentDidMount = () => {
    //  axios
    // .get("http://localhost:3002/getcenterdistrict")
    // .then((res) => {
    //   console.log(res.data);
    //   // setData(res.data);
    //   // setCenters(res.data[0].centerCount);
    //   let arr = [];
    //   for(let i=0;i<res.data.length;i++){
    //     arr.push({
    //       activity: res.data[i].activity,
    //       value: res.data[i].value,
    //       color: "#2A78E4"
    //     })
    //   }
    //   console.log(arr);
    //   this.setState({ centers: arr });
    //   // setData(arr);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
    this.calculateChart();
  };

  componentDidUpdate() {
    d3.select(this.state.xAxisRef).call(this.xAxis);
    d3.select(this.state.yAxisRef).call(this.yAxis);
  }

  render() {
    return (
      <div className="Add-chart-body1">
        <div className="heading-chart1">
          <h3>Exposed Users Count According to District</h3>
        </div>
        <div className="chart-body1">
          <svg width={this.state.svgWidth} height={this.state.svgHeight}>
            {this.state.bars.map((d, i) => (
              <rect
                key={i}
                x={d.x}
                y={d.y}
                width={d.width}
                height={d.height}
                fill={d.fill}
              />
            ))}

            {this.state.scrollBars.map((d, i) => (
              <rect
                key={i}
                x={d.scrollX}
                y={d.scrollY}
                width={d.scrollWidth}
                height={d.scrollHeight}
                fill={d.scrollFill}
              />
            ))}

            <rect
              ref={this.scrollRef}
              className="scroll-selector"
              x={this.state.scrollSelectorX}
              y={this.state.svgHeight - this.state.svgScrollHeight}
              width={this.state.scrollSelectorWidth}
              height={this.state.svgScrollHeight}
            />

            <g>
              <g
                ref={this.xAxisRef}
                transform={`translate(0, ${
                  this.state.svgHeight -
                  this.state.svgMargin.bottom -
                  this.state.svgScrollHeight
                })`}
              />
              <g
                ref={this.yAxisRef}
                transform={`translate(${this.state.svgMargin.left}, 0)`}
              />
            </g>
          </svg>
        </div>
      </div>
    );
  }
}

export default BarChart;
