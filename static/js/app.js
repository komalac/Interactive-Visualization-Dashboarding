function buildMetadata(sample_metadata) {
  var url = "/metadata/" + sample_metadata;
  // @TODO: Complete the following function that builds the metadata panel
  var ddiv = d3.select("#sample-metadata");
  ddiv.html("");
  
  

  d3.json(url).then(function(response) {
    var pdata = document.createElement("p");
    console.log(response);    
    // response.key[0]
    // var row = document.createElement("p");
    Object.entries(response).forEach(([key, value]) => {
      
      // dkey = response.dataset.AGE
      // dval =  unpack(response.dataset.data, 1);

      // console.log(dkey)
      // console.log(dval)
        var cell = ddiv.append("p");
        var dvalue = key +": " + value
        cell.text(dvalue);
        
        // ddiv.append("p")
        // .text(function(d){return d.key}) + ": " + text(function(d){return d.value})
    // });
  })
})
};
  //
    
    

    


  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);


function buildCharts(sample) {

  // @TODO: Build a Pie Chart
  var url = "/samples/" + sample;
  d3.json(url).then(function(response) {
        
    var data = [{
      values: response.sample_values.slice(0,10),
      labels: response.otu_ids.slice(0,10),
      type: 'pie'
    }];

    var layout = {
      title: "Samples "+sample,
      xaxis: {
        title: "Samples"
      },
      yaxis: {
        title: "otu id"
      }
    };

    Plotly.newPlot("pie", data, layout);
  });


  // @TODO: Build a Bubble Chart using the sample data

  d3.json(url).then(function(response) {

           
    var data = [{
      x: response.otu_ids,
      y: response.sample_values,
      // text: response.otu_labels,
      mode:'markers',
      marker:{
        size:response.sample_values,
        color:response.otu_ids
      }
      
    }];

    var layout = {
      title: "Samples "+sample,
      xaxis: {
        title: "OTU ID"
      },
      yaxis: {
        title: "Samples"
      }
    };

    Plotly.newPlot("bubble", data, layout);
  });
  
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).


}
    


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  
  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
