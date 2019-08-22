import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-review-chart',
  templateUrl: './review-chart.component.html',
  styleUrls: ['./review-chart.component.css']
})
export class ReviewChartComponent implements OnInit {
  @Input() reviews;
  constructor() { }

  ngOnInit() {
    console.log(this.reviews);
    this.chart(this.reviews);
  }

  chart(reviewData: any[]) { 
    const margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    // Initialize the X axis
    const x = d3.scaleBand()
    .range([0, width])
    .padding(0.2);
    const xAxis = svg.append("g")
    //.attr("transform", function(d) { return "rotate(65)" });
    .attr("transform", "translate(0," + height + ")")

    // Initialize the Y axis
    const y = d3.scaleLinear()
    .range([height, 0]);
    const yAxis = svg.append("g")
    .attr("class", "myYaxis")

    update(reviewData);
    // A function that create / update the plot for a given variable:
    function update(data) {

    // Update the X axis
    x.domain(data.map(function (d) { return d.review.user.name.split(" ")[0]; })) //
    xAxis.call(d3.axisBottom(x))
    

    // Update the Y axis
    y.domain([0, d3.max(data, function (d) { return d.review.rating })]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));

    // Create the u variable
    const u = svg.selectAll("rect")
      .data(data)

    u
      .enter()
      .append("rect") // Add a new rect for each new elements
      .merge(u) // get the already existing elements as well
      .transition() // and apply changes to all of them
      .duration(1000)
        .attr("x", function (d) { return x(d.review.user.name.split(" ")[0]); }) //
        .attr("y", function (d) { return y(d.review.rating); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.review.rating); })
        .attr("fill", "#69b3a2")

    // If less group in the new dataset, I delete the ones not in use anymore
    u
      .exit()
      .remove()
    }
  }
}