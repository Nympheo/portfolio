


const CONTAINER_W = parseFloat(d3.select('container').style('width'));

const colors = ['#F40000', '#FCA311','#EDF2F4','#8D99AE', '#2D2F49'];
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
//********SECTION 2***linear graphics********//
(function(){
  let data = d3.range(20).map((e) => {
    return {
      x: e ,
      y: Math.round((Math.random() * 90 ) + 5),
    }
  });

  let dataArea = d3.range(200).reduce((acc, e) => {
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

 let line = d3.line()
      .x(function(d) {return x(d.x)})
      .y(function(d) {return y(d.y)})
      .curve(d3.curveBasis);

let line2 = d3.line()
    .x(function(d) {return x(d.x)})
    .y(function(d) {return y(d.y)})
    .curve(d3.curveCardinal);

let area = d3.area()
      .x(d => xA(d.x))
      .y1(d => y(d.y))
      .y0(y(0));

  let svg = d3.select("#columnChild57695").append("svg")
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

let areaLayout = svg.append('path')
               .datum(dataArea)
               .attr('fill', colors[4])
               .attr('fill-opacity', 0.4)
               .attr('d', area);

let red = svg.append('path')
             .datum(data)
             .attr('fill', 'none')
             .attr('stroke', colors[0])
             .attr('stroke-width', 1)
             .attr('stroke-linejoin', 'round')
             .attr('stroke-linecap', 'round')
             .attr('d', line);

let yellow = svg.append('path')
                .datum(data)
                .attr('fill', 'none')
                .attr('stroke', colors[1])
                .attr('stroke-width', 1)
                .attr('stroke-linejoin', 'round')
                .attr('stroke-linecap', 'round')
                .attr('stroke-dasharray', '1, 1')
                .attr('d', line2);

let circles = svg.selectAll('circle')
   .data(data)
   .enter()
   .append('circle')
   .attr('cx', d => x(d.x))
   .attr('cy', d => y(d.y))
   .attr('r', 3)
   .attr('fill', 'white')
   .attr('stroke', 'black')
   .attr('stroke-width', '1');

svg.on('click', function(){
  data = d3.range(20).map((e) => {
    return {
      x: e ,
      y: Math.round((Math.random() * 90 ) + 5),
    }
  });

  dataArea = d3.range(200).reduce((acc, e) => {
    return [...acc,{
      x: ++e,
      y: acc[acc.length-1].y < 0 ?
          acc[acc.length-1].y  + Math.round((Math.random() * 10) + 5 )
        : acc[acc.length-1].y  + Math.round((Math.random() * 10) - 5 )
    }]
  }, [{x:0, y:20}] );

  areaLayout.datum(dataArea);
  areaLayout.transition()
            .duration(1000)
           .attr('fill', colors[4])
           .attr('fill-opacity', 0.4)
           .attr('d', area);

  red.datum(data);
  red.transition()
     .duration(1000)
     .attr('d', line);

  yellow.datum(data)
  yellow.transition()
       .duration(1000)
       .attr('d', line2);

  circles.data(data);
  circles.transition()
         .duration(1000)
         .attr('cx', d => x(d.x))
         .attr('cy', d => y(d.y));

  });

})();

//************HISTOGRAMM*********//
(function(){
  let data =  [...new Array(14)]
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
  let bar = svg.selectAll(".bar")
      .data(data)
    .enter().append("g")
      .attr("transform",function(d,i) { return `translate(${i*barWidth+1},0)`});

  let rects = bar.append("rect")
                  .attr('class', 'bar')
                  .attr("x", 0)
                  .attr("y",d => y(d))
                  .attr("width", barWidth - 1)
                  .attr("height", (d) => height - y(d))
                  .attr('fill', colors[4]);

let text =  bar.append("text")
      .attr("dy", ".5em")
      .attr("y", d => y(d) - 10 )
      .attr("x", barWidth / 2)
      .attr("text-anchor", "middle")
      .attr('class', 'text')
      .attr('font-size', '13')
      .text(d => d);
    console.log(bar);
svg.on('click', function(){
    console.log('click');
    data =  [...new Array(14)]
      .map(() => Math.round(Math.random() * 90 + 5));

    bar.data(data);
    console.log(bar);
    rects.transition()
       .duration(1000)
       .attr('y', d => y(d))
       .attr('height', d => height - y(d));

    text.text('');
    text =  bar.append("text")
          .transition()
          .delay(500)
          .duration(500)
          .attr("y", d => y(d) - 10 )
          .text(d => d);

})

})();
//*******************SECTION 6*****STREAMGRAPH***********
(function(){
  const data = [
    {day:1, apples: 10, pear: 10, plums: 6, melon: 6, watermelon: 5},
    {day:2, apples: 7, pear: 9, plums: 4, melon: 3, watermelon: 2},
    {day:3, apples: 6, pear: 8, plums: 7, melon: 1, watermelon: 8},
    {day:4, apples: 6, pear: 7, plums: 7, melon: 7, watermelon: 5},
    {day:5, apples: 5, pear: 6, plums: 7, melon: 6, watermelon: 5},
    {day:6, apples: 10, pear: 5, plums: 8, melon: 6, watermelon: 6},
    {day:7, apples: 9, pear: 8, plums: 10, melon: 1, watermelon: 7},
    {day:8, apples: 11, pear: 9, plums: 10, melon: 6, watermelon: 1},
    {day:9, apples: 11, pear: 8, plums: 9, melon: 2, watermelon: 2},
    {day:10, apples: 6, pear: 10, plums: 11, melon: 8, watermelon: 1},
    {day:11, apples: 8, pear: 13, plums: 6, melon: 6, watermelon: 4},
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
      .domain([0,50])
      .range([height, 0]);

  const xScale = d3.scaleLinear()
      .domain([0, data.length])
      .range([0, width + 10]);

  const area = d3.area()
    .x((d,i) => xScale(i))
    .y0(d => d[0] )
    .y1(d => d[1] + 16)
    .curve(d3.curveCatmullRom);

  // const colors = ['rgb(103, 54, 78)','rgb(242, 119, 167)','rgb(129, 36, 97)',
  //                   'rgb(226, 93, 93)', 'rgb(142, 74, 74)'];

  const stack = d3.stack()
    .keys(['apples','pear','plums','melon','watermelon'])
    .order(d3.stackOrderInsideout)
    .offset(d3.stackOffsetWiggle);

 svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(-1," + (height)  + ")")
    .call(d3.axisBottom(xScale).ticks(5).tickSize(1));

svg.append("g")
    .attr("class", "axis axis--y")
    .attr("transform", "translate(-1,0)")
    .call(d3.axisLeft(yScale).ticks(0).tickSize(1));

 svg.selectAll('.path')
    .data(stack(data))
    .enter()
    .append('path')
    .style('fill', function(d, i) {
      // console.log(d);
      return colors[i];
    })
    .attr('d', area);
})();
//**********SECTION 7****PIE*********************
(function(){
  const margin = {top: 0, right: 0, bottom: 0, left: 15},
    width = CONTAINER_W / 16 - margin.left - margin.right,
    height = CONTAINER_W / 16 - margin.top - margin.bottom;

  const svg = d3.select("#rowChild21066").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr('class','svgs')
    .append("g")
      .attr("transform", `translate(
            ${(width + margin.right + margin.left) / 2},
            ${(height - 15) / 2})`);

 const names = ['1', '2', '3', '4', '5', '6', '7'];
 const data = d3.range(7).map(e => Math.floor(Math.random() * 30));
 // const colors = ['rgb(103, 54, 78)','rgb(242, 119, 167)','rgb(129, 36, 97)',
 //                   'rgb(226, 93, 93)', 'rgb(142, 74, 74)', 'rgb(213, 68, 43)',
 //                  'rgb(195, 34, 126)'];

const colors = ['#F40000', '#FCA311','#EDF2F4','#8D99AE', '#2D2F49',
'#878299', '#5F525C'];

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
//*************SECTION 8****PACK (HEXAGONAL) function*******************************//
(function(){
  const margin = {top: -5, right: 0, bottom: 0, left: 5},
    width = CONTAINER_W / 16 - margin.left - margin.right,
    height = CONTAINER_W / 16 - margin.top - margin.bottom;

  const svg = d3.select("#rowChild54482").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr('class','svgs')
    .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

  const data = {name: "A1",
                children: [{name: "B1",
                            children: [{name: "C1", value: 100},
                                       {name: "C2", value: 300},
                                       {name: "C3", value: 200}]
                           },
                           {name: "B2",value: 200}
                          ]
               };

const packLayout = d3.pack().size([width - 10, height - 10]);
const hierarchy = d3.hierarchy(data);
      hierarchy.sum(d => d.value);
      packLayout(hierarchy);

const nodes = svg.selectAll('circle')
      .data(hierarchy.descendants())
      .enter()
      .append('g')
      .attr(`transform`, function(d){return `translate(${d.x},${d.y})`});

nodes.append('circle')
     .attr('r', d => d.r)
     .attr('fill', colors[3])
     .attr('opacity', 0.3)
     .attr('stroke', colors[4]);

nodes.append('text')
     .attr('dy', 4)
     .attr('fill', 'black')
     .attr('font-size', '.55em')
     .attr('text-anchor', 'middle')
     .text(d => d.children === undefined ? d.data.name : ``);

//-----------------------HEX---------------
// const randomX = d3.randomNormal(width / 2, 10);
// const randomY = d3.randomNormal(height / 2, 10);
// const points = d3.range(100).map(e => [randomX(), randomY()]);
// const color = d3.scaleSequential(d3.interpolateLab("rgb(219, 204, 214)","rgb(122, 29, 77)"))
//                 .domain([0, 10]);
//
// const hexbin = d3.hexbin()
//                  .radius(5)
//                  .extent([[0, 0],[width, height]]);
//
// const x = d3.scaleLinear()
//             .domain([0, width])
//             .range([0, width]);
// const y = d3.scaleLinear()
//             .domain([0, height])
//             .range([height, 0]);
//
// svg.append('clipPath')
//    .attr('id', 'clip')
//    .append('rect')
//       .attr('width', width)
//       .attr('height', height);
//
// svg.append('g')
//    .attr('stroke', '#000')
//    .attr('stroke-width', '0.5px')
//    .attr('clip-path', 'url(#clip)')
//    .selectAll('path')
//    .data(hexbin(points))
//    .enter().append('path')
//        .attr('d', hexbin.hexagon())
//        .attr('transform', function(d){ ;return `translate(${d.x},${d.y})` })
//        .attr('fill', d => color(d.length))
})();
//***************SECTION 5************CHORD DIAGRAM***************************//
(function(){
  const margin = {top: 0, right: 0, bottom: 5, left: 0},
    width = CONTAINER_W / 8 - margin.left - margin.right,
    height = CONTAINER_W / 8 - margin.top - margin.bottom;

  const svg = d3.select("#rowChild68118").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr('class','svgs')
    .append("g")
      .attr("transform", `translate(${width/2},${height/2})`);

const matrix = [[14632,  4312, 4123, 1234],
                [ 590, 13465, 909, 8888],
                [ 5123, 19765, 4564, 9443],
                [ 312,   5086,  900, 7532]];

const outerRadius = Math.min(width, height) / 2 - 20,
      innerRadius = outerRadius - 9;

const formatValue = d3.formatPrefix('.0', 1000);

const chord = d3.chord()
                .padAngle(0.1)
                .sortSubgroups(d3.ascending);

const arc = d3.arc()
              .innerRadius(innerRadius)
              .outerRadius(outerRadius);

const ribbon = d3.ribbon()
                 .radius(innerRadius);

// const color = d3.scaleOrdinal()
//                 .domain([0, 1, 2, 3])
//                 .range(['rgb(103, 54, 78)', 'rgb(242, 119, 167)'
//                 ,'rgb(129, 36, 97)', 'rgb(226, 93, 93)']);

svg.datum(chord(matrix));
const group = svg.append('g')
                 .selectAll('g')
                    .data(d => d.groups)
                    .enter().append('g');

group.append('path')
     .style('fill', d => colors[d.index + 1])
     .style('stroke', d => d3.rgb(colors[d.index + 1]).darker())
     .attr('d', arc);

const ticks = group.selectAll('.tick')
      .data(d => tickFunc(d, 1000))
      .enter().append('g')
        .attr('transform', function(d){
            return `rotate(${d.angle * 180 / Math.PI - 90})
                    translate(${outerRadius}, 0)`});

ticks.append('line').attr('x2', 1).attr('stroke', '#000');

ticks.filter(d => d.value % 5000 === 0)
     .append('text')
     .attr('x', function(d){return d.angle > Math.PI ? '15' : '2'})
     .attr('dy', '.35em')
     .attr('font-size', '.54em')
     .attr('transform', function(d){
       return d.angle > Math.PI ? `rotate(180) translate(-18)` : null;})
     .style('text-anchor', d => d.angle > Math.PI ? 'end' : null)
     .text(d => formatValue(d.value));

svg.append('g')
   .attr('fill-opacity', 0.3)
   .selectAll('path')
   .data(d => d)
   .enter().append('path')
      .attr('d', ribbon)
      .style('fill', d => colors[d.target.index + 1])
      // .style('stroke', d => d3.rgb(colors[d.target.index + 1]).darker());

function tickFunc(d, step) {
   let i = (d.endAngle - d.startAngle) / d.value;
   return d3.range(0, d.value, step).map(function(e)
     {return {value: e, angle: e * i + d.startAngle}})
   };
})();
//************************** TREE ****SECTION 3***********************//
(function(){
  const data = [
    {id:'President',},
    {id:'President.Finance',},
    {id:'President.Finance.Receivables',},
    {id:'President.Finance.Receivables.Staff1',},
    {id:'President.Finance.Receivables.Staff2', value: 393},
    {id:'President.Finance.Receivables.Staff3', value: 381},
    {id:'President.Finance.Receivables.Staff4', value: 381},
    {id:'President.Finance.Receivables.Staff5', value: 381},
    {id:'President.Finance.Receivables.Staff6', value: 381},
    {id:'President.Finance.Payables',},
    {id:'President.Finance.Payables.Staff1',},
    {id:'President.Finance.Payables.Staff2',value: 144},
    {id:'President.Finance.Payables.Staff3',value: 133},
    {id:'President.Finance.Payables.Staff4',value: 155},
    {id:'President.Finance.Payables.Staff5',value: 166},
    {id:'President.Finance.Staff1',value: 154},
    {id:'President.Market',},
    {id:'President.Market.Market R/D', },
    {id:'President.Market.Market R/D.Staff1', value: 353},
    {id:'President.Market.Market R/D.Staff2', value: 573},
    {id:'President.Market.Market R/D.Staff3', value: 573},
    {id:'President.Market.Market R/D.Staff4', value: 573},
    {id:'President.Market.Staff1', value: 784},
    {id:'President.Market.Staff2', value: 591},
    {id:'President.Market.Staff3', value: 341},
    {id:'President.Market.Advertising',},
    {id:'President.Market.Advertising.Staff1', },
    {id:'President.Market.Advertising.Staff2', value: 707},
    {id:'President.Market.Advertising.Staff3', value: 707},
    {id:'President.Optns',},
    {id:'President.Optns.Production',},
    {id:'President.Optns.Production.Staff1', },
    {id:'President.Optns.Production.Staff2', value: 137},
    {id:'President.Optns.Production.Staff3', value: 444},
    {id:'President.Optns.Production.Staff4', value: 137},
    {id:'President.Optns.Production.Staff5', value: 555},
    {id:'President.Optns.Production.Staff6', value: 137},
    {id:'President.Optns.Production.Staff7', value: 666},
    {id:'President.Optns.Production.Staff8', value: 137},
    {id:'President.Optns.Production.Staff9', value: 777},
    {id:'President.Optns.Staff1', value: 784},
    {id:'President.Optns.Staff2', value: 591},
    {id:'President.Optns.Delivery'},
    {id:'President.Optns.Delivery.Staff1', value: 137},
    {id:'President.Optns.Delivery.Staff2', value: 137},
    {id:'President.Optns.Delivery.Staff3', value: 137},
    {id:'President.Optns.Delivery.Staff4', value: 137},
    {id:'President.Optns.Delivery.Staff5', value: 137},
    {id:'President.Optns.Delivery.Staff6', value: 137},
  ];

const margin = {top: -10, right: -10, bottom: 10, left: 10},
    width = CONTAINER_W / 4 - margin.left - margin.right,
    height = CONTAINER_W / 4 - margin.top - margin.bottom;

const svg = d3.select("#rowChild46489").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr('class','svgs')
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

const stratify = d3.stratify()
      .parentId(d => d.id.substring(0,d.id.lastIndexOf('.')));

const tree = d3.tree()
      .size([2 * Math.PI, 120])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

const root = tree(stratify(data));

const link = svg.selectAll('.link')
        .data(root.links())
        .enter().append('path')
          .attr('fill', 'none')
          .attr('stroke', colors[3])
          .attr('stroke-opacity', 0.9)
          .attr('stroke-width', '1px')
          .attr('d', d3.linkRadial()
                        .angle(d => d.x)
                        .radius(d => d.y));

const node = svg.selectAll('.node')
      .data(root.descendants())
      .enter().append('g')
          // .attr('class', d => d.children ? 'node-internal' : 'node-leaf')
          .attr('transform', function(d) {
            return `translate(${radians(d.x, d.y)})`
          });

node.append('circle').attr('r', 2.5).attr('fill', 'rgb(153, 0, 0)');

node.append('text')
    .attr('dy', '0.3em')
    .attr('x', d => d.x < Math.PI === !d.children ? 7 : -3)
    .attr('text-anchor', d => d.x < Math.PI === !d.children ? 'start' : 'end')
    .attr('transform',d => `rotate(${(d.x<Math.PI?d.x-Math.PI/2:d.x+Math.PI/2)*180/Math.PI})`)
    .text(d => d.id.substring(d.id.lastIndexOf('.') + 1))
    .attr('font-size', '.55em')
    .attr('fill', colors[4]);

function radians(x, y) {
  return [(y = +y) * Math.cos( x -= Math.PI / 2), y * Math.sin(x)];
}

// const hierarchy = d3.hierarchy(data);
//
// const treeLayout = d3.tree().size([width  , height ]);
//
// treeLayout(hierarchy);
//
// const links = svg.append('g')
//     .selectAll('line')
//     .data(hierarchy.links())
//     .enter()
//     .append('line')
//     .attr('x1', d => d.source.x)
//     .attr('y1', d => d.source.y)
//     .attr('x2', d => d.target.x)
//     .attr('y2', d => d.target.y)
//     .attr('fill', 'none')
//     .attr('stroke', '#000')
//     .attr('stroke-width', '1px');
//
// const nodes = svg.append('g')
//     .selectAll('circle')
//     .data(hierarchy.descendants())
//     .enter()
//     .append('circle')
//     .attr('cx', d => d.x)
//     .attr('cy', d => d.y)
//     .attr('fill', 'rgb(173, 101, 114)')
//     .attr('stroke', 'none')
//     .attr('r', 3);
})();
//**********SECTION 1****SUNBURST*********************
(function(){
  const margin = {top: 100, right: 10, bottom: 10, left: 100},
    width = CONTAINER_W / 2 - margin.left - margin.right,
    height = CONTAINER_W / 2 - margin.top - margin.bottom;

  const svg = d3.select("#rowChild17927").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr('class','svgs')
    .append("g")
      .attr("transform",
        "translate(" +(width+margin.left+margin.right+50)/2+ "," + (height + margin.top + margin.bottom+50) / 2+")");

const colors = d3.scaleLinear()
                //  .interpolator(d3.interpolateRainbow)
  .range(['#2D2F49','#EDF2F4','#8D99AE', 'rgba(255, 0, 0, 0.5)']);
  // .domain() '#FCA311'

const radius = (Math.min(width, height) / 2 + 50);
const formatNum = d3.format(',d');

const x = d3.scaleLinear()
            .range([0, Math.PI * 2]);
const y = d3.scaleSqrt()
            .range([0, radius]);

const partition = d3.partition();

const arc = d3.arc()
              .startAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x0))))
              .endAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x1))))
              .innerRadius(d => Math.max(0, y(d.y0)))
              .outerRadius(d => Math.max(0, y(d.y1)));

d3.json("testdata.json", function(error, root){
  if(error) throw error;

  root = d3.hierarchy(root);
  root.sum(d => d.size);
// console.log(root.value)
  colors.domain([0, 50000, 100000, 300000, root.value]);

  svg.selectAll('path')
     .data(partition(root).descendants())
     .enter().append('path')
        .attr('d', arc)
        .style('fill', function(d){
          // console.log(d);
          return colors(d.value);
        })
        .attr('stroke', 'rgb(171, 171, 171)')
        .on('click', click)
        .append('title')
        .text(d => d.data.name + "\n" + formatNum(d.value));
});

// function clear(obj) {
//   let max = 0;
//   function iter(o) {
//     o.children ? o.children.forEach(iter) : o.size > max ? max = o.size : null;
//   }
//   iter(obj);
//   return max;
// }

function click(d) {
  svg.transition()
     .duration(700)
     .tween('scale', function() {
       var xd = d3.interpolate(x.domain(), [d.x0, d.x1]);
       var yd = d3.interpolate(y.domain(), [d.y0, 1]);
       var yr = d3.interpolate(y.range(), [d.y0 ? 15 : 0, radius - 15]);
       return function(t){ x.domain(xd(t));
                           y.domain(yd(t)).range(yr(t))}
     })
     .selectAll('path').attrTween('d', d => () => arc(d));
   }
})();

//     ***************    HANDLERS   ******************************
d3.selectAll('.frame')
  .on('mouseover', function(){
    d3.select(this)
      .classed('frame', false)
      .transition()
      .duration(300)
      .style('opacity', 1)
      .style('background-color', 'rgba(153, 139, 182, 0.00)');
      // .style('border', '1px groove rgba(45, 47, 73, 0.3)');

    d3.selectAll('.frame')
      .transition()
      .duration(300)
      .style('opacity', 0.5)
      .style('background-color', 'rgba(0, 0, 0, 0.2)');

    // d3.selectAll('.frame').selectAll('path').style('fill','rgba(0, 0, 0, 0.2)');
    // d3.selectAll('.frame').selectAll('rect').style('fill','rgba(0, 0, 0, 0.2)');
    // d3.selectAll('.frame').selectAll('circle').style('fill','rgba(0, 0, 0, 0.2)');

    d3.select(this).classed('frame', true);
  })
  .on('mouseout', function(){
    d3.selectAll('.frame')
      .transition()
      .duration(300)
      .style('opacity', 1)
      .style('background-color', 'rgba(153, 139, 182, 0.04)');
  })
