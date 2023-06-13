// Save the URL
let queryUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Perform the API call
d3.json(queryUrl).then(function(data) {
    console.log(data)

    let sampleNames = data.names;

    let dropMenu = d3.select("#selDataset");

    for (let i=0; i < sampleNames.length; i++) {
        dropMenu.append("option").text(sampleNames[i]).property("value", sampleNames[i])
    };

    buildChart(sampleNames[0]);

    buildMetaData(sampleNames[0]);

});



// Define optionChanged function
function optionChanged(newsample) {
    
    buildChart(newsample);

    buildMetaData(newsample);
};


function buildChart(sampleID){
    d3.json(queryUrl).then(function(data) {

        //Retrieve the sample data
        for (let i=0; i < data.names.length; i++) {
            if (sampleID == data.samples[i].id) {
                //Save the sample
                let sampleData = data.samples[i];

                //Convert the Y values to string
                let y_values_bar = [];

                for (let j=0; j < 10; j++) {
                    y_values_bar.push("OTU " + String(sampleData.otu_ids[j]))
                };

                //Declare the trace, obtaining Top 10 Values
                let trace_bar = {
                    x: sampleData.sample_values.slice(0,10).reverse(),
                    y: y_values_bar.reverse(),
                    type: 'bar',
                    orientation: 'h'
                };
                
                console.log(trace_bar.x, trace_bar.y);

                //Save trace array
                let trace_bar_array = [trace_bar];

                //Create plot
                Plotly.newPlot("bar", trace_bar_array);

                //Bubble Chart data values
                let y_values_bubble = [];

                for (let j=0; j < sampleData.sample_values.length; j++) {
                    y_values_bubble.push(sampleData.otu_ids[j])
                };

                //Bubble Chart trace
                let trace_bubble = {
                    x: y_values_bubble,
                    y: sampleData.sample_values,
                    mode: 'markers',
                    marker: {
                        color: y_values_bubble,
                        size: sampleData.sample_values,
                        colorscale: 'Earth' 
                    }
                };

                //Save trace array
                let trace_bubble_array = [trace_bubble];

                //Bubble Chart layout
                let layout_bubble = {
                    xaxis: {
                        title:{
                            text: 'OTU ID'
                        }
                    }
                };

                //Bubble Chart Plot
                Plotly.newPlot("bubble", trace_bubble_array, layout_bubble);

                //Pie Chart Trace
                let tracePie = {
                    type: "pie",
                    showlegend: false,
                    hole: 0.4,
                    rotation: 90,
                    values: [100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100],
                    text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", ""],
                    direction: "clockwise",
                    textinfo: "text",
                    textposition: "inside",
                    marker: {
                      colors: ["rgba(236, 250,220, 0.6)", "rgba(221, 242, 209, 0.6)", "rgba(190, 227, 186, 0.6)", "rgba(174, 220, 174, 0.6)", "rgba(159, 212, 163, 0.6)", "rgba(148, 197, 140, 0.6)", "rgba(100, 173, 98, 0.6)", "rgba(66, 155, 70, 0.6)", "rgba(26, 136, 40, 0.6)", "white"]
                    },
                    labels: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", ""],
                    hoverinfo: "label"
                  };
                  
                //Pie Chart needle options
                let valuePie = data.metadata[i].wfreq;
                let x1_value = [];
                let y1_value = [];

                console.log(valuePie);

                if (valuePie === 9) {
                    x1_value = 0.8
                    y1_value = 0.5
                } else if (valuePie === 8) {
                    x1_value = 0.75
                    y1_value = 0.6
                } else if (valuePie === 7) {
                    x1_value = 0.72
                    y1_value = 0.7
                } else if (valuePie === 6) {
                    x1_value = 0.63
                    y1_value = 0.75
                } else if (valuePie === 5) {
                    x1_value = 0.55
                    y1_value = 0.8
                } else if (valuePie === 4) {
                    x1_value = 0.45
                    y1_value = 0.85
                } else if (valuePie === 3) {
                    x1_value = 0.345
                    y1_value = 0.8
                } else if (valuePie === 2) {
                    x1_value = 0.285
                    y1_value = 0.7
                } else if (valuePie === 1) {
                    x1_value = 0.2
                    y1_value = 0.623
                } else {
                    x1_value = 0.2
                    y1_value = 0.5
                };

                console.log(x1_value, y1_value);

                let layoutPie = {
                    shapes: [{
                      type: 'line', 
                      x0: 0.5, 
                      y0: 0.5,
                      x1: Number(x1_value),
                      y1: Number(y1_value),
                      fillcolor: 'maroon',
                      line: {
                        color: 'maroon',
                        width: 3
                      }
                    },
                    {
                        type: 'circle',
                        x0: 0.48,
                        y0: 0.48,
                        x1: 0.52,
                        y1: 0.52,
                        fillcolor: 'maroon',
                        line: {
                            color: 'maroon'
                        }
                    }
                    ],
                    title: '<b>Belly Button Washing Frequency</b><br>Scrubs per Week',
                    xaxis: {visible: false, range: [-1, 1]},
                    yaxis: {visible: false, range: [-1, 1]}
                  };
                  
                  let dataPie = [tracePie];
                  
                  Plotly.newPlot("gauge", dataPie, layoutPie);
                
            }

        }

    })
};

function buildMetaData(sampleID) {
    d3.json(queryUrl).then(function(data) {
        
        //Retrieve the sample data
        for (let i=0; i < data.metadata.length; i++) {
            if (sampleID == data.samples[i].id) {
                
                //Save the sample metadata
                let sampleMeta = data.metadata[i];

                console.log(sampleMeta)

                //Save html location
                let metadataLocation = d3.select('#sample-metadata');
                
                console.log(metadataLocation);

                //Remove all child nodes
                let parentNode = document.querySelector('#sample-metadata');
                removeAllChildNodes(parentNode);

                //Display metadata text
                for (let key in sampleMeta) {
                    console.log(`${key}: ${sampleMeta[key]}`)
                    metadataLocation.append("h6").append("b").text(key + ": " + sampleMeta[key]).property("value")
                };
            }
        }

    })
};

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};