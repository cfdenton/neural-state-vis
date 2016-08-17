d3.csv("tensor.csv", useData);

function useData(data) {
   var paragraphs = d3.select("body").selectAll("p")
      .data(data)
      .enter()
      .append("center")
      .append("p")
      .text(function(d) {
         s = "";
         for (col in d){
            s = s + d[col] + " / ";
         }
      return s;
   });
}
