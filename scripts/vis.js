var main = function () {
   try {
      //console.log("type" + (typeof [1, 2, 3][0] === 'number'));
      console.log("max" + arrayMaxNorm([[1, 2], [2, 4], [3, 5]]));
   }
   catch (err) {
      console.log("error: " + err);
   }
   d3.csv("tensor.csv", useData);

   function useData(data) {
      dataset = data.map(function (row) {
         rowArray = Object.keys(row).map(function (k) {return row[k];});
         return rowArray;
      });
      var maxSize = 450;
      var fieldWidth = maxSize;
      var fieldHeight = fieldWidth * dataset.length / dataset[0].length; 
      if (fieldHeight > maxSize) {
         fieldWidth = fieldWidth * maxSize / fieldHeight;
         fieldHeight = maxSize;
      }
      var svg = d3.select("body")
         .append("center")
         .append("div")
         .classed("state", true)
         .style("position", "relative")
         .append("svg")
         .attr("height", fieldHeight)
         .attr("width", fieldWidth)
 
      var background = svg.append("rect")
         .attr("height", "100%")
         .attr("width", "100%")
         .style("fill", "white")
         .attr("rx", 10)
         .attr("ry", 10)
      console.log(dataset); 
      var tensorMaxNorm = 3;
      var enter = svg.selectAll("g")
         .data(dataset)
         .enter()    
      var rectangles = enter.each(function (d, i, nodes) {
            for (j in d) {
               d3.select(this).append("rect") 
               .attr("x", j * fieldWidth / d.length) 
               .attr("y", i * fieldHeight / nodes.length)
               .attr("rx", 5)
               .attr("ry", 5)
               .attr("width", fieldWidth / d.length)
               .attr("height", fieldHeight / nodes.length)
               .style("fill", function () { 
                  if (d[j] >= 0) { return "green"; }
                  else { return "red"; };
               })
               .style("opacity", Math.abs(d[j]) / tensorMaxNorm);
            };
         });
      var numbers = enter.each(function (d, i, nodes) {
         for (j in d) {
            d3.select(this).append("text")
            .text(Math.floor(d[j] * 100) / 100)
            .attr("x", j * fieldWidth / d.length)
            .attr("y", (i + 1/2) * fieldHeight / nodes.length)
            .style("opacity", 0)
            .classed("on", false);
         }
      });
   }

   // move
   $(document).keydown( function (event) {
      console.log("keypress" + event.which);
      if (event.which === 37) {
         $(".state").animate({left: "+=-500px"}, 250);
      }
      else if (event.which === 39) {
         $(".state").animate({left: "+=500px"}, 250);
      }
      // toggle text
      else if (event.which === 78) {
         var text = d3.select(".state")
         .selectAll("text");
         if (text.classed("on")) {
            text.classed("on", false);
            text.transition()
            .style("opacity", 0);
         }
         else {
            text.classed("on", true);
            text.transition()
            .style("opacity", 1);
         }
         console.log(text.classed("on"));
      }
   })
}
/*
var arrayMaxNorm = function (array) {
   console.log(array);
   console.log("array max norm");
   var max = 0;
   if (typeof array[0] === 'number') {
      for (i in array) {
         max = Math.max(Math.abs(array[i]), max);
      }
   }
   else {
      for (i in array) {
         max = Math.max(arrayMaxNorm(array[i]), max);
      }
   }
   console.log("max: " + max);
   return max;
}
*/
$(document).ready(main);

