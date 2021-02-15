import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import './LineChart.scss';

const LineChart = ({
  marketRates,
}) => {
  const LOW = 'low';
  const HIGH = 'high';
  const MEAN = 'mean';

  const lineColors = {
    low: 'green',
    high: 'red',
    mean: 'orange',
  };

  const margin = {
    top: 40,
    right: 100,
    bottom: 40,
    left: 40,
  };

  const width = 966 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const [graphData, setGraphData] = useState([]);

  let svg;
  let xScale;
  let yScale;
  let tooltip;

  const bisect = d3.bisector((d) => d.day).left;

  const handleMouseOver = () => {
    tooltip
      .attr('class', 'tooltip show');
  };

  const handleMouseMove = (event) => {
    // recover coordinate we need
    const x0 = xScale.invert(d3.pointer(event, this)[0]);
    const i = bisect(graphData, x0, 1);
    const selectedData = graphData[i];

    if (selectedData) {
      d3.select('.mouse-line')
        .attr('class', 'mouse-line show')
        .attr('d', () => {
          let data = `M${xScale(graphData[i].day)},${height}`;
          data += ` ${xScale(graphData[i].day)},0`;
          return data;
        });

      const formattedDate = d3.timeFormat('%B %d');
      tooltip
        .attr('class', 'tooltip show')
        .html(`
          <b><span class="label">Date:</span><span>${formattedDate(selectedData.day)}</span></b>
          <p><span class="label">${LOW}:</span><span>${selectedData[LOW]}</span></p>
          <p><span class="label">${HIGH}:</span><span>${selectedData[HIGH]}</span></p>
          <p><span class="label">${MEAN}:</span><span>${selectedData[MEAN]}</span></p>
        `)
        .style('left', `${event.pageX + 20}px`)
        .style('top', `${event.pageY - 20}px`);
    }
  };

  const handleMouseOut = () => {
    tooltip
      .attr('class', 'tooltip');
    d3.select('.mouse-line')
      .attr('class', 'mouse-line');
  };

  const removeGraph = () => {
    svg = null;
    xScale = null;
    yScale = null;
    tooltip = null;

    d3.selectAll('#graph > *').remove();
  };

  const drawGraph = () => {
    xScale = d3.scaleTime()
      .domain(d3.extent(graphData, (d) => d.day))
      .range([0, width]);

    yScale = d3.scaleLinear()
      .domain([0, d3.max(graphData, (d) => d[HIGH]) + 1000])
      .range([height, 0]);

    svg = d3.select('#graph')
      .append('svg')
      .attr('class', 'graph-svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left} , ${margin.top})`);

    const xAxis = d3.axisBottom(xScale)
      .ticks(d3.timeDay.every(3))
      .tickFormat(d3.timeFormat('%B %d'));
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height - 1})`)
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);
  };

  const drawLegends = () => {
    const svgLegend = svg.append('g')
      .attr('class', 'gLegend')
      .attr('transform', `translate(${width + 20},${0})`);

    const legend = svgLegend.selectAll('.legend')
      .data([LOW, MEAN, HIGH])
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (_, i) => `translate(0,${i * 20})`);

    legend.append('circle')
      .attr('class', 'legend-node')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 6)
      .style('fill', (d) => lineColors[d]);

    legend.append('text')
      .attr('class', 'legend-text')
      .attr('x', 6 * 2)
      .attr('y', 6 / 2)
      .text((d) => d);
  };

  const drawLine = (attribute) => {
    const line = d3.line()
      .curve(d3.curveStepBefore)
      .x((d) => xScale(d.day))
      .y((d) => yScale(d[attribute]));

    svg
      .datum(graphData)
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', lineColors[attribute])
      .attr('stroke-width', 1.5)
      .attr('class', 'line')
      .attr('d', line);
  };

  const drawTooltip = () => {
    svg
      .append('g')
      .attr('class', 'mouse-effect')
      .append('path')
      .attr('class', 'mouse-line');

    svg
      .append('rect')
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', handleMouseOver)
      .on('mousemove', handleMouseMove)
      .on('mouseout', handleMouseOut);

    tooltip = d3.select('#graph')
      .append('div')
      .attr('class', 'tooltip');
  };

  const renderGraph = () => {
    drawGraph();
    drawLegends(svg);

    drawLine(LOW);
    drawLine(HIGH);
    drawLine(MEAN);

    drawTooltip();
  };

  const showEmptyMessage = () => {
    d3.select('#graph')
      .append('svg')
      .attr('class', 'graph-svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(400, 175)')
      .append('text')
      .text('No Records Found');
  };

  useEffect(() => {
    let data = [...marketRates];
    data = data.map((d) => ({
      ...d,
      day: new Date(d.day),
    }));
    setGraphData(data);
  }, [marketRates]);

  useEffect(() => {
    removeGraph();
    if (graphData && graphData.length) {
      renderGraph();
    } else {
      showEmptyMessage();
    }
  }, [graphData]);

  return (
    <div id="graph" />
  );
};

LineChart.propTypes = {
  marketRates: PropTypes.arrayOf(Array).isRequired,
};

export default LineChart;
