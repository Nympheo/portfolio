


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
      y: Math.round((Math.random() * 90 ) + 5),
    }
  });

  const dataArea = d3.range(200).reduce((acc, e) => {
    return [...acc,{
      x: ++e,
      y: acc[acc.length-1].y < 0 ?
          acc[acc.length-1].y  + Math.round((Math.random() * 10) + 5 )
        : acc[acc.length-1].y  + Math.round((Math.random() * 10) - 5 )
    }]
  }, [{x:0, y:20}] );

  const margin = {top: 10, right: 10, bottom: 20, left: 20},
    width = CONTAINER_W / 2 - margin.left - margin.right,
    height = CONTAINER_W / 4 - margin.top - margin.bottom;

  const x = d3.scaleLinear()
      .range([0, width])
      .domain([0, data.length - 1]);

  const xA = d3.scaleLinear()
      .range([0, width])
      .domain([0, dataArea.length]);

  const y = d3.scaleLinear()
      .rangeRound([height, 0])
      .domain([0, 100]);

 const line = d3.line()
      .x(function(d) {return x(d.x)})
      .y(function(d) {return y(d.y)})
      .curve(d3.curveBasis);

const line2 = d3.line()
    .x(function(d) {return x(d.x)})
    .y(function(d) {return y(d.y)})
    .curve(d3.curveCardinal);

const area = d3.area()
      .x(d => xA(d.x))
      .y1(d => y(d.y))
      .y0(y(0));

  const svg = d3.select("#columnChild57695").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr('class','svgs')
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const axisX = svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(1," + height + ")")
      .call(d3.axisBottom(x).ticks(18));

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
   .datum(dataArea)
   .attr('fill', 'rgb(162, 109, 125)')
   .attr('fill-opacity', 0.4)
   .attr('d', area);

  svg.append('path')
     .datum(data)
     .attr('fill', 'none')
     .attr('stroke', 'red')
     .attr('stroke-width', 1)
     .attr('stroke-linejoin', 'round')
     .attr('stroke-linecap', 'round')
     .attr('d', line);

 svg.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 1)
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('stroke-dasharray', '1, 1')
    .attr('d', line2);

svg.selectAll('circle')
   .data(data)
   .enter()
   .append('circle')
   .attr('cx', d => x(d.x))
   .attr('cy', d => y(d.y))
   .attr('r', 3)
   .attr('fill', 'white')
   .attr('stroke', 'black')
   .attr('stroke-width', '1');
})();

//************HISTOGRAMM*********//
(function(){
  const data =  [...new Array(14)]
    .map(() => Math.round(Math.random() * 90 + 5));
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
//*******************SECTION 6*****STREAMGRAPH***********
(function(){
  const data = [
    {day:1, apples: 20, pear: 13, plums: 16, melon: 6, watermelon: 5},
    {day:2, apples: 11, pear: 12, plums: 11, melon: 3, watermelon: 2},
    {day:3, apples: 16, pear: 11, plums: 13, melon: 1, watermelon: 8},
    {day:4, apples: 12, pear: 9, plums: 14, melon: 7, watermelon: 5},
    {day:5, apples: 13, pear: 10, plums: 17, melon: 6, watermelon: 5},
    {day:6, apples: 18, pear: 16, plums: 16, melon: 6, watermelon: 6},
    {day:7, apples: 20, pear: 13, plums: 10, melon: 1, watermelon: 7},
    {day:8, apples: 21, pear: 9, plums: 10, melon: 6, watermelon: 1},
    {day:9, apples: 15, pear: 8, plums: 9, melon: 2, watermelon: 2},
    {day:10, apples: 17, pear: 10, plums: 11, melon: 8, watermelon: 1},
    {day:11, apples: 21, pear: 13, plums: 6, melon: 6, watermelon: 4},
  ];

  const margin = {top: 5, right: 5, bottom: 12, left: 10},
    width = CONTAINER_W / 8 - margin.left - margin.right,
    height = CONTAINER_W / 16 - margin.top - margin.bottom;

  const svg = d3.select("#columnChild87285").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr('class','svgs')
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const yScale = d3.scaleLinear()
      .domain([0,100])
      .range([height, 0]);

  const xScale = d3.scaleLinear()
      .domain([0, data.length])
      .range([0, width + 20]);

  const area = d3.area()
    .x((d,i) => xScale(i))
    .y0(d => d[0] - 25)
    .y1(d => d[1])
    .curve(d3.curveCatmullRom);

  const colors = ['rgb(103, 54, 78)','rgb(242, 119, 167)','rgb(129, 36, 97)',
                    'rgb(226, 93, 93)', 'rgb(142, 74, 74)'];

  const stack = d3.stack()
    .keys(['apples','pear','plums','melon','watermelon'])
    .order(d3.stackOrderInsideout)
    .offset(d3.stackOffsetWiggle);

 svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(-1," + height + ")")
    .call(d3.axisBottom(xScale).ticks(5).tickSize(1));

svg.append("g")
    .attr("class", "axis axis--y")
    .attr("transform", "translate(-1,0)")
    .call(d3.axisLeft(yScale).ticks(0).tickSize(1));

 svg.selectAll('path')
    .data(stack(data))
    .enter()
    .append('path')
    .style('fill', (d,i) => colors[i])
    .attr('d', area);
})();
//**********SECTION 7****PIE*********************
(function(){
  const margin = {top: 3, right: 3, bottom: 3, left: 3},
    width = CONTAINER_W / 16 - margin.left - margin.right,
    height = CONTAINER_W / 16 - margin.top - margin.bottom;

  const svg = d3.select("#rowChild21066").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr('class','svgs')
    .append("g")
      .attr("transform", `translate(
            ${(width + margin.right + margin.left) / 2},
            ${(height + margin.top + margin.bottom) / 2})`);

 const names = ['1', '2', '3', '4', '5', '6', '7'];
 const data = d3.range(7).map(e => Math.floor(Math.random() * 30));
 const colors = ['rgb(103, 54, 78)','rgb(242, 119, 167)','rgb(129, 36, 97)',
                   'rgb(226, 93, 93)', 'rgb(142, 74, 74)', 'rgb(213, 68, 43)',
                  'rgb(195, 34, 126)'];

const data2 = d3.range(7).map((d,i) => {
  return {
    name: names[i],
    value: Math.floor(Math.random() * 30),
    color: colors[i]
  }
});

 const pieGen = d3.pie()
                  .value(d => d.value)
                  .sort((a, b) => a.name.localeCompare(b.name));

 const arcData = pieGen(data2);

 const arcGen = d3.arc()
                  .innerRadius((width / 2 - margin.right - margin.left) / 3)
                  .outerRadius(width / 2);

svg.selectAll('path')
   .data(arcData)
   .enter()
   .append('path')
   .attr('d', arcGen)
   .attr('fill', (d,i) => colors[i])
   .attr('stroke', 'rgba(250, 250, 250, 0)');

svg.selectAll('text')
    .append('text')
    .data(arcData)
    .enter()
      .append('text')
      .each(function(d) {
        let centroid = arcGen.centroid(d);
        d3.select(this)
          .attr('x', centroid[0])
          .attr('y', centroid[1])
          .attr('dy', '0.33em')
          .attr('font-size', '10px')
          .attr('fill', 'black')
          .attr('text-anchor', 'middle')
          .text(d.data.value);
      });

})();
//*************SECTION 8****HEXAGONAL function*******************************//
(function(){
  const margin = {top: 3, right: 3, bottom: 3, left: 3},
    width = CONTAINER_W / 16 - margin.left - margin.right,
    height = CONTAINER_W / 16 - margin.top - margin.bottom;

  const svg = d3.select("#rowChild54482").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr('class','svgs')
    .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

const randomX = d3.randomNormal(width / 2, 10);
const randomY = d3.randomNormal(height / 2, 10);
const points = d3.range(100).map(e => [randomX(), randomY()]);
const color = d3.scaleSequential(d3.interpolateLab("rgb(219, 204, 214)","rgb(122, 29, 77)"))
                .domain([0, 10]);

const hexbin = d3.hexbin()
                 .radius(5)
                 .extent([[0, 0],[width, height]]);

const x = d3.scaleLinear()
            .domain([0, width])
            .range([0, width]);
const y = d3.scaleLinear()
            .domain([0, height])
            .range([height, 0]);

svg.append('clipPath')
   .attr('id', 'clip')
   .append('rect')
      .attr('width', width)
      .attr('height', height);

svg.append('g')
   .attr('stroke', '#000')
   .attr('stroke-width', '0.5px')
   .attr('clip-path', 'url(#clip)')
   .selectAll('path')
   .data(hexbin(points))
   .enter().append('path')
       .attr('d', hexbin.hexagon())
       .attr('transform', function(d){ ;return `translate(${d.x},${d.y})` })
       .attr('fill', d => color(d.length))
})();
//***************SECTION 3************CHORD DIAGRAM***************************//
(function(){
  const margin = {top: 5, right: 0, bottom: 5, left: 0},
    width = CONTAINER_W / 4 - margin.left - margin.right,
    height = CONTAINER_W / 4 - margin.top - margin.bottom;

  const svg = d3.select("#rowChild46489").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr('class','svgs')
    .append("g")
      .attr("transform", `translate(${width/2},${height/2})`);

const matrix = [[14632,  4312, 4123, 1234],
                [ 590, 13465, 909, 8888],
                [ 5123, 19765, 4564, 9443],
                [ 312,   5086,  900, 7532]];

const outerRadius = Math.min(width, height) / 2 - 10,
      innerRadius = outerRadius - 30;

const formatValue = d3.formatPrefix(',.0', 1e3);

const chord = d3.chord()
                .padAngle(0.04)
                .sortSubgroups(d3.descending);

const arc = d3.arc()
              .innerRadius(innerRadius)
              .outerRadius(outerRadius);

const ribbon = d3.ribbon()
                 .radius(innerRadius);

const color = d3.scaleOrdinal()
                .domain([0, 1, 2, 3])
                .range(['rgb(103, 54, 78)', 'rgb(242, 119, 167)'
                ,'rgb(129, 36, 97)', 'rgb(226, 93, 93)']);

svg.datum(chord(matrix));
const group = svg.append('g')
                 .attr('class', 'groups')
                 .selectAll('g')
                    .data(d => d.groups)
                    .enter().append('g');

group.append('path')
     .style('fill', d => color(d.index))
     .style('stroke', d => d3.rgb(color(d.index)).darker())
     .attr('d', arc);

const ticks = group.selectAll('.tick')
      .data(d => tickFunc(d, 1000))
      .enter().append('g')
        .attr('stroke', '#000')
        .attr('transform', function(d){
            return `rotate(${d.angle * 180 / Math.PI - 90})
                    translate(${outerRadius}, 0)`});

ticks.append('line').attr('x2', 2);

ticks.filter(d => d.value % 5000 === 0)
     .append('text')
     .attr('x', 7)
     .attr('dy', '.35em')
     .attr('font-size', '.44em')
     .attr('transform', function(d){
       return d.angle > Math.PI ? `rotate(180) translate(-16)` : null;})
     .style('text-anchor', d => d.angle > Math.PI ? 'end' : null)
     .text(d => formatValue(d.value));

svg.append('g')
   .attr('fill-opacity', 0.7)
   .selectAll('path')
   .data(d => d)
   .enter().append('path')
      .attr('d', ribbon)
      .style('fill', d => d.target.index)
      .style('stroke', d => d3.rgb(color(d.target.index)).darker());

function tickFunc(d, step) {
   let i = (d.endAngle - d.startAngle) / d.value;
   return d3.range(0, d.value, step).map(function(e)
     {return {value: e, angle: e * i + d.startAngle}})
};


})();
