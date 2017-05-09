


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
//**********SECTION 5****PIE*********************
(function(){
  const margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = CONTAINER_W / 8 - margin.left - margin.right,
    height = CONTAINER_W / 8 - margin.top - margin.bottom;

  const svg = d3.select("#rowChild68118").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr('class','svgs')
    .append("g")
      .attr("transform", `translate(
            ${(width + margin.right + margin.left) / 2},
            ${(height + margin.top + margin.bottom) / 2})`);

 const names = ['Alex', 'Joe', 'Nick', 'Sandra', 'Jane', 'Paul', 'Serge'];
 const data = d3.range(7).map(e => Math.floor(Math.random() * 30));
 const colors = ['rgb(103, 54, 78)','rgb(242, 119, 167)','rgb(129, 36, 97)',
                   'rgb(226, 93, 93)', 'rgb(142, 74, 74)', 'rgb(213, 68, 43)',
                  'rgb(195, 34, 126)'];

 const pieGen = d3.pie();
 const arcData = pieGen(data);

 const arcGen = d3.arc()
                  .innerRadius((width / 2 - margin.right - margin.left) / 7)
                  .outerRadius(width / 2);

svg.selectAll('path')
   .data(arcData)
   .enter()
   .append('path')
   .attr('d', arcGen)
   .attr('fill', (d,i) => colors[i])
   .attr('stroke', 'white');

svg.selectAll('path')
    .append('text')
    .data(data)
    .text(d => d);
// svg.selectAll('text')
//    .data(names)
//    .enter()
//    .append('text')
//    .each(d => {
//      let centroid = arcGen.centroid(d);
//      d3.select(this)
//      .attr('x', centroid[0])
//      .attr('y', centroid[1])
//      .attr('dy', '0.33em')
//      .text(d)
//      .attr('fill', 'white')
//      .attr('text-anchor', 'middle');
//    });
})();
