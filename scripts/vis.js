var maxSize = 450;
var divideSize = 350;
var fieldWidth, fieldHeight, numStates, posCounter;
var maxNumVisWidth = 5;
var numVisWidth;
var states, visStates;
var tensorMaxNorm;

function generateVis(filename) {
   console.log("generateVis: " + filename);
   $.getJSON(filename, useData);
}


function useData(data) {
   // initialize states
   states = data["states"]
   numStates = states.length;
   console.log("numStates: " + numStates);

   // initialize viewing window
   numVisWidth = Math.min(maxNumVisWidth, numStates);
   visStates = Array(numVisWidth);
   for (var i = 0; i < numVisWidth; i++) {
      visStates[i] = states[i];
   }

   // set view size
   fieldWidth = Math.min(maxSize, maxSize * states[0][0].length / states[0].length);
   fieldHeight = Math.min(maxSize, maxSize * states[0].length / states[0][0].length); 

   // make svg
   var svg = d3.select("body")
      .append("div")
      .attr("id", "tensor-vis")
      .style("position", "relative")
      .style("left", ($(window).width()/2 - fieldWidth/2) + "px")
      //.attr("pos-counter", 0);
      .append("svg")
      .attr("height", fieldHeight)
      .attr("width", numVisWidth* fieldWidth + (numVisWidth - 1)*divideSize);
   /* reference rectangle
   svg.append("rect")
      .style("fill", "purple")
      .attr("height", "100%")
      .attr("width", "100%");
   */
   
   // get maximum value by flattening and then getting max
   var tensorMax = Math.max.apply(null, [].concat.apply([], states[0]));
   var tensorMin = Math.min.apply(null, [].concat.apply([], states[0])); 
   tensorMaxNorm = Math.max(Math.abs(tensorMax), Math.abs(tensorMin));

   var enter = svg.selectAll("g")
      .data(visStates)
      .enter();
   enter.each(function (d, i) {
      d3.select(this)
         .append("g")
         .attr("id", "state" + i);
   });

   var rectangles = enter.each(function (d, i, nodes) {
      for (row in d) {
         for (col in d[row]) {
            d3.select('#state' + i)
               .append("rect") 
               .attr("id", "rect-" + row + "-" + col)
               .attr("x", (i*fieldWidth + i*divideSize + col*fieldWidth/ d[row].length)) 
               .attr("y", row * fieldHeight / d.length)
               .attr("rx", 5)
               .attr("ry", 5)
               .attr("width", fieldWidth / d[row].length)
               .attr("height", fieldHeight / d.length)
               .style("fill", function () { 
                  if (d[row][col] >= 0) { return "green"; }
                  else { return "red"; }
               })
               .style("opacity", Math.abs(d[row][col]) / tensorMaxNorm);
         }
      }
   });
   var numbers = enter.each(function (d, i, nodes) {
      for (row in d) {
         for (col in d[row]) {
            d3.select('#state' + i)
               .append("text")
               .attr("id", "num-" + row + "-" + col)
               .text(Math.floor(d[row][col] * 100) / 100)
               .attr("x", i*(fieldWidth + divideSize) + parseInt(col) * fieldWidth / d[row].length)
               .attr("y", (parseInt(row) + .5) * fieldHeight / d.length)
               .style("opacity", 0)
               .classed("on", false);
         }
      }
   });
   
   posCounter = 0;
}

function shiftVis(direction) {
   // change visualization if necessary
   if (direction === "left" && 
      (posCounter > Math.floor(numVisWidth/2) && posCounter < numStates - Math.floor(numVisWidth/2)) ||
      direction === "right" && 
      (posCounter > Math.floor(numVisWidth/2) - 1 && posCounter < numStates - Math.ceil(numVisWidth/2))) {
      // recenter vis box
      if (direction === "left") {$("#tensor-vis").css({left: "+=" + (fieldWidth + divideSize) + "px"});}
      else if (direction === "right") {$("#tensor-vis").css({left: "-=" + (fieldWidth + divideSize) + "px"});}

      // update visStates
      for (var i = 0; i < numVisWidth; i++) {
         if (direction === "left") {
            visStates[i] = states[posCounter-Math.floor(numVisWidth/2)+i];
         }
         else if (direction === "right") {
            visStates[i] = states[posCounter-Math.ceil(numVisWidth/2)+i+1];
         }
      }
      
      // update visuzliation
      var update = d3.selectAll("[id^=state]")
         .data(visStates);
      var rectangles = update.each(function (d, i, nodes) {
         for (row in d) {
            for (col in d[row]) {
               d3.select(this)
                  .select("#rect-" + row + "-" + col)
                  .style("fill", function () { 
                     if (d[row][col] >= 0) { return "green"; }
                     else { return "red"; }
                  })
                  .style("opacity", Math.abs(d[row][col]) / tensorMaxNorm);
            }
         }
      });
      var numbers = update.each(function (d, i, nodes) {
         for (row in d) {
            for (col in d[row]) {
               d3.select(this)
                  .select("#num-" + row + "-" + col)
                  .text(Math.floor(d[row][col] * 100)/100)
            }
         }
      });
   }
}

function main() {
   // move
   $(document).keydown( function (event) {
      if (event.which === 37) {
         if (posCounter < numStates - 1) {
            posCounter += 1;
            $("#tensor-vis").animate({left: "+=-" + (fieldWidth + divideSize) + "px"}, 150, //, "linear", 
               function () {shiftVis("left");});
         }
      }
      else if (event.which === 39) {
         if (posCounter > 0) {
            posCounter -= 1;
            $("#tensor-vis").animate({left: "+=" + (fieldWidth + divideSize) + "px"}, 150, 
               function () {shiftVis("right");});
         }
      }
      // toggle text
      if (event.which === 78) {
         var text = d3.selectAll("#tensor-vis")
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

$(document).ready(main);

