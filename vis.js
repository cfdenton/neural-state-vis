d3.csv("tensor.csv", useData);

function useData(data) {
   dataset = data.map(function (row) {
      rowArray = Object.keys(row).map(function (k) {return row[k];});
      return rowArray;
   });

   console.log(dataset)
   var fieldHeight = 400
   var fieldWidth = 450
   var svg = d3.select("body")
      .append("center")
      .append("svg")
      .attr("height", fieldHeight)
      .attr("width", fieldWidth)
   
   var background = svg.append("rect")
      .attr("height", "100%")
      .attr("width", "100%")
      .style("fill", "white")
      .attr("rx", 10)
      .attr("ry", 10)

   var rectangles = svg.selectAll("g")
      .data(dataset)
      .enter()
      .each(function (d, i, nodes) {
         console.log("length: " + d.length)
         for (j in d) {
            d3.select(this).append("rect") 
            .attr("x", j * fieldWidth / d.length) 
            .attr("y", i * fieldHeight / nodes.length)
            .attr("rx", 5)
            .attr("ry", 5)
            .attr("width", fieldWidth / d.length)
            .attr("height", fieldHeight / nodes.length)
            .style("fill", function () { 
               console.log(d[j])
               if (d[j] >= 0) { return "blue"; }
               else { return "red"; };
            })
            .style("opacity", 1/(1 + Math.exp(-Math.abs(d[j]))))
         };
      });
   /*
   var circles = svg.selectAll("g")
      .data(dataset)
      .enter()
      .each(function (d, i, nodes) {
         console.log("lenth: " + d.length)
         for (j in d) {
            d3.select(this).append("circle")
            .attr("cx", j * fieldWidth / d.length
               +Math.min(fieldWidth/d.length, fieldHeight / nodes.length)/2)
            .attr("cy", i * fieldHeight / nodes.length
               +Math.min(fieldWidth/d.length, fieldHeight / nodes.length)/2)
            .attr("r", Math.min(fieldWidth / d.length, fieldHeight / nodes.length)/2)
            .style("fill", function () { 
               console.log(d[j])
               if (d[j] >= 0) { return "blue"; }
               else { return "red"; };
            })
            .style("opacity", 1/(1 + Math.exp(-Math.abs(d[j]))));
         }
      });
   */
};


