d3.csv("tensor.csv", useData);

function useData(data) {
   dataset = data.map(function (row) {
      rowArray = Object.keys(row).map(function (k) {return row[k];});
      return rowArray;
   });

   console.log(dataset)
   var fieldHeight = 800
   var fieldWidth = 1200
   var rows = d3.select("body")
      .append("center")
      .append("svg")
      .attr("height", fieldHeight)
      .attr("width", fieldWidth)
      .selectAll("g")
      .data(dataset)
      .enter()
      .each(function (d, i, nodes) {
         console.log("length: " + d.length)
         for (j in d) {
            d3.select(this).append("rect") 
            .attr("x", i * fieldWidth / nodes.length) 
            .attr("y", j * fieldHeight / d.length)
            .attr("width", fieldWidth / nodes.length)
            .attr("height", fieldHeight / d.length)
            .style("fill", "blue")
            .style("opacity", 1/(1 + Math.exp(-d[j])));
         };
      });
}

