


const CONTAINER_W = parseFloat(d3.select('container').style('width'));

//********LOGO**********//
(function () {
  const logo = d3.select("#logo"),
        width = 80,  //+svg.attr("width")
        height = 80,   //+svg.attr("height")
        angles = d3.range(0, 2 * Math.PI, Math.PI / 200);
  const logoPath = logo.append("g")
      .attr("transform", "translate(" + width  + "," + height  + ") scale(0.22)")
      .attr("fill", "none")
      .attr("stroke-width", 30)
      .attr("stroke-linejoin", "round")
    .selectAll("path")
    .data(["cyan", "magenta", "yellow"])
    .enter().append("path")
      .attr("stroke", function(d) { return d; })
      .style("mix-blend-mode", "darken")
      .datum(function(d, i) {
        return d3.radialLine()
            .curve(d3.curveLinearClosed)
            .angle(function(a) { return a; })
            .radius(function(a) {
              let t = d3.now() / 1000;
              return 200 + Math.cos(a * 8 - i * 2 * Math.PI / 3 + t) * Math.pow((1 + Math.cos(a - t)) / 2, 3) * 32;
            });
      });
  d3.timer(function() {
    logoPath.attr("d", function(d) {
      return d(angles);
    });
});})();
//***********linear graphics********//
(function(){
  const data = d3.range(20).map((e) => {
    return {
      x: e ,
      y: +Math.round((Math.random() * 100) + 1),
    }
  });
  const margin = {top: 10, right: 10, bottom: 20, left: 20},
    width = CONTAINER_W / 2 - margin.left - margin.right,
    height = CONTAINER_W / 4 - margin.top - margin.bottom;

  const x = d3.scaleLinear()
      .range([0, width])
      .domain([0, data.length]);

  const y = d3.scaleLinear()
      .rangeRound([height, 0])
      .domain([0, d3.max(data, function(d) {return d.y})]);

 const line = d3.line()
      .x(function(d) {return x(d.x)})
      .y(function(d) {return y(d.y)})
      .curve(d3.curveBasis)

  const svg = d3.select("#columnChild57695").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr('class','svgs')
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const axisX = svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(1," + height + ")")
      .call(d3.axisBottom(x).ticks(20));

  const axisY = svg.append("g")
      .attr("class", "axis axis--y")
      .attr("transform", "translate(" + width + ",0)")
      .call(d3.axisLeft(y)
              .ticks(10)
              .tickSizeInner(width));

  axisY.append("text")
        .attr("fill", "#000")
        .attr("transform", `rotate(-90),translate(0,${-width})`)
        .attr("y", 3)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Price ($)");
  axisY.select(".domain").remove();
  axisY.selectAll(".tick:not(:first-of-type) line")
        .attr("stroke", "#777")
        .attr("stroke-dasharray", "2,2");

  svg.append('path')
     .datum(data)
     .attr('fill', 'none')
     .attr('stroke', 'black')
     .attr('stroke-width', 1)
     .attr('stroke-linejoin', 'round')
     .attr('stroke-linecap', 'round')
     .attr('d', line);
})();

//************HISTOGRAMM*********//
(function(){
  const data =  [...new Array(14)]
    .map(() => Math.round(Math.random() * 100));
  const dataX = ['rus', 'gbr', 'ger', 'fra', 'ita', 'spa',
  'usa', 'swe', 'chi', 'jap', 'kor', 'nor', 'can', 'arg'];

  const margin = {top: 20, right: 10, bottom: 15, left: 20},
    width = CONTAINER_W / 4 - margin.left - margin.right,
    height = CONTAINER_W / 8 - margin.top - margin.bottom;

  const x = d3.scaleBand()
      .domain(dataX)
      .range([0, width]);

  const y = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([height, 0]);

  const svg = d3.select("#columnChild56854").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr('class','svgs')
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(1," + height + ")")
      .call(d3.axisBottom(x).tickSize(2));

  svg.append("g")
      .attr("class", "axis axis--y")
      .attr("transform", "translate(1,0)")
      .call(d3.axisLeft(y)
        .ticks(5)
        .tickSize(2));

  const barWidth = (width / data.length);
  const bar = svg.selectAll(".bar")
      .data(data)
    .enter().append("g")
      .attr("class", "bar")
      .attr("transform",function(d,i) { return `translate(${i*barWidth+1},0)`});

  bar.append("rect")
      .attr('class', 'bar')
      .attr("x", 0)
      .attr("y",d => y(d))
      .attr("width", barWidth - 1)
      .attr("height", (d) => height - y(d))
      .attr('fill', 'rgb(162, 109, 125)');

  bar.append("text")
      .attr("dy", ".5em")
      .attr("y", d => y(d) - 10 )
      .attr("x", barWidth / 2)
      .attr("text-anchor", "middle")
      .attr('class', 'text')
      .attr('font-size', '13')
      .text(d => d);
})();
