function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
        });
    })
}
// Declaring the function "optionChanged()" in plots.js
function optionChanged(newSample) {
  console.log(newSample);
}

// Modularied the tasks by replacing the function with two dynamic function(buildMetadata & buildCharts)
function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}
// Declaring the first function
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    PANEL.append("h6").text(result.location);
  });
}

// Modifying the code to print the arrays of each ID
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    PANEL.append("h6").text("Location:" + result.location);
    PANEL.append("h6").text("ID:" + result.id);
    PANEL.append("h6").text("Ethnicity:" + result.ethnicity);
    PANEL.append("h6").text("Gender:" + result.gender);
    PANEL.append("h6").text("Age:" + result.age);
    PANEL.append("h6").text("BBType:" + result.bbtype);
    PANEL.append("h6").text("WFREQ:" + result.wfreq);

    // Alternative loop using forEach method
    // Object.entries(result).forEach([key, value]) => {
    //   PANEL.append("h6").text('${key.toUpperCase()}:${value}');
    // }
  });
}

init();