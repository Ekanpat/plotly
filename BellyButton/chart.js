function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var OtuArray = samples.filter(sampleOtu => sampleOtu.id == sample);
    
    //  5. Create a variable that holds the first sample in the array.
    var otuResult = OtuArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var OTU_id = otuResult.otu_ids;
    console.log(OTU_id);
    OTU_id = OTU_id.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
    console.log(OTU_id);
    // OTU_id = OTU_id.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
    var OTU_labels = otuResult.otu_labels;
    var OTU_sample = otuResult.sample_values;
  
    console.log(OTU_id);

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    // var yticks = otuResult.otu_ids.map(sample => sample.sample_values).slice(0,10).reverse()
   
    var OTU_top = OTU_id.slice(0,10).reverse();
    // var OTU_top = String.valueOf(OTU_top);
    console.log(OTU_top);

    var labels_top = OTU_labels.slice(0,10);
    var samples_top = OTU_sample.slice(0,10).reverse();

    // console.log(OTU_top);


    // // var ids = data.samples[0].otu_ids;
    // console.log(ids)

    // // 8. Create the trace for the bar chart. 
    var trace = {
      x: samples_top,
      y: OTU_top,
      text: labels_top,
      orientation: "h",
      type: "bar",
      color: "rgb(200, 193, 230)"
    }
    var barData = [trace];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacterial Cultures Found",
    };
  
    // 10. Use Plotly to plot the data with the layout. 
  Plotly.newPlot ("bar", barData, barLayout);
//   });
// }
    // 11. Create the trace for the bubble chart.
  var trace1 = {
      x: String.valueOf(OTU_top),
      y: samples_top,
      text: labels_top,
      thover: "x+y+text",
      type: 'bubble',
      mode: 'markers',
      marker: {
        size: samples_top,
        colors: OTU_top,
        colorscale: "Earth"
  }
};
      
  var bubbleData = [trace1];
  console.log(OTU_top);

    // 12. Create the layout for the bubble chart.
  var bubbleLayout = {
      title: "Bacteria Cultures per Sample",
      text: "closest",
      xaxis: { 
        title: "OTU ID",
        height: 600,
        width: 1000        
       }
      
    };

    // 13. Use Plotly to plot the data with the layout.
  Plotly.newPlot ("bubble", bubbleData, bubbleLayout);

// 14. Create a variable that holds the metadata
  var metadata = data.metadata;
// Create a variable that filters the metadata array for the object with the desired sample number.
  var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);

  // 15. Create a variable that holds the first sample in the metadata array.
  var otuResult = resultArray[0];
    console.log(otuResult);

  // 16. Create a variable that holds the washing frequency.
  var wshFqcy = parseFloat(otuResult.wfreq);
    console.log(wshFqcy);

  // 17. Create the trace for the gauge chart.
  var trace2 = {
      y: samples_top,
      x: OTU_top,
      text: labels_top,
      value: wshFqcy,
      mode: "gauge+number",
      type: "indicator",
      gauge: {
        size: samples_top,
        sizemode: 'area',
        colors: OTU_top,
        axis: {range:[0,10], tickwidth: 2, tickcolor: "blue"},
        bar: {color:"black"},
        steps: [
          {range: [0,2],color:"red"},
          {range: [2,4],color:"orange"},
          {range: [4,6],color:"yellowgreen"},
          {range: [6,8],color:"yellow"},
          {range: [8,10],color:"blue"},

        ]
      }
    };
  var gaugeData = [trace2];
    
  // 18. Create the layout for the gauge chart.
  var gaugeLayout = { 
     title: "<b>Belly Button Washing Frequency</b><br>Scrubs Per Week", 
  
  };

  // 19 . Use Plotly to plot the gauge data and layout.
  Plotly.newPlot ("gauge", gaugeData, gaugeLayout);
    
  });
}