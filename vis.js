theData = [1, [2, 2], [3, 3, 3]]

var paragraphs = d3.select("body").selectAll("p")
   .data(theData)
   .enter()

paragraphs.append("center")
   .append("p")
   .text(function (d) {return d;});
