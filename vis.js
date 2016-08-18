d3.csv("tensor.csv", useData);

function useData(data) {
   dataset = data.map(function (row) {
      rowArray = Object.keys(row).map(function (k) {return row[k];});
      return rowArray;
   });
   console.log(dataset)
   var paragraphs = d3.select("body")
      .append("center")
      .append("svg")
      .attr("height", 1000)
      .attr("width", 1000)
      .selectAll("g")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", function (d, i) { return i * 100; }) 
      .attr("y", function (d, i) { return i * 100; })
      .attr("width", 100)
      .attr("height", 100)
      .style("fill", "blue")
      .style("opacity", function (d) {
         console.log(1/(1 + Math.exp(-d[0]))); 
         return 1/(1 + Math.exp(-d[0])); } );
}

