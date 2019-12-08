var base_url = "/api_";
var base_geojson_url = "/geojson_";

const API_KEY = "pk.eyJ1IjoiZHJpdmVyYTUzNyIsImEiOiJjanZlZTJieWcwbmlsNDRwbDV1ZHRxdmxnIn0.eZ3XMovyBxLUPfWtg0VPuw";

var full_url;
console.log("START")

var first_time = true;

function buildDepressionPlot(){

  var url = '/api_Alcohol'
  d3.json(url).then(function(response) {
    var data = response;

    var depression_rate = data.map(function(record) {
      return record['yes_percent'];
    });
    var states = data.map(function(record){
      return record['state']
    });
    var state_abbrev = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

    var trace1 = {
      x: state_abbrev,
      y: depression_rate,
      name: "depression by state",
      type: "bar"
    };

    var layout = {
      title: {
        text:`Depression Rate per State`,
        y :0.9,
        x :0.5,
        xanchor: 'center',
        yanchor: 'top',
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      },
      xaxis: {
        title: {
          text: 'States',
          font: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
          }
        }
      },
      yaxis: {
        title: {
          text:`Depression Rate`,
          font: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
          }
      }
    },
    };

    var data1 = [trace1]

    Plotly.plot("plot3", data1, layout);
  });
}

function buildFactorPlot(source){

  var factor_url = base_url + source;
  d3.json(factor_url).then(function(response) {
    var data = response;

    var title = data[0]["Type"];

    var depression_rate = data.map(function(record) {
      return record['yes_percent'];
    });
    var factor_rate = data.map(function(record){
      return record['factor'];
    });

    var states = data.map(function(record){
      return record['state']
    });
    var state_abbrev = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

    var layout = {
      title : {
        text: `${title} Plot`,
        y :0.9,
        x :0.5,
        xanchor: 'center',
        yanchor: 'top',
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      }
    };
    var layout2 = {
      title: {
        text:`${title} Bar Chart`,
        y :0.9,
        x :0.5,
        xanchor: 'center',
        yanchor: 'top',
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      },
      xaxis: {
        title: {
          text: 'States',
          font: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
          }
        }
      },
      yaxis: {
        title: {
          text:`${title}`,
          font: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
          }
        }
      },
      yaxis2: {
        title: {
          text:'Depression Rate',
          font: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
           }
         },
        overlaying: 'y',
        side: 'right'
        },
      barmode: 'group',
      bargap: .70
    };

    var trace1 = {
      x: factor_rate,
      y: depression_rate,
      mode:'markers',
      marker:{
        color: [0,.2,.8,1,2,4,6,10,15,20,
          25,30,40,50,70,90,120,150,200,250,
          300,400,500,600,700,800,900,1000,1100,1500,
          2000,2500,3000,3500,4000,5000,6000,7000,8000,9000,
        10000,15000,20000,25000,30000,35000,40000,50000,60000,70000],
        colorscale:'RdBu',
        cmin: 0,
        cmax: 100,
        symbol: 'diamond',
        size: 6
      },
      text: state_abbrev,
      name: `${title} and Depression`,
      hovertemplate: '<i><b>%{text}</b></i>' + '<br><b>Depression</b>: %{y}%<br>' + `<b>${title}: %{x}</b>`,
      type: 'scatter'
    };

    var trace2 = {
      x: state_abbrev,
      y: factor_rate,
      name: `${title} by State`,
      showlegend: false,
      marker:{
        color: '#FF5500'
      },
      type: "bar"
    };

    var trace3 = {
      x: state_abbrev,
      y: depression_rate,
      name: "Depression by State",
      showlegend: false,
      yaxis: 'y2',
      offset: .2,
      marker:{
        color: '#2800F2'
      },
      type: "bar"
    };

    var data2 = [trace1];
    var data3 = [trace2, trace3];

    Plotly.plot("plot4", data2, layout);
    Plotly.plot("plot3", data3, layout2);
  });
};

function buildDepressionMap(){

  console.log("mapping");
  var map = L.map("map1", {
    center: [39.0473, -95.6752],
    zoom: 3
  });

  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(map);

  var geojson_url = "/geojson_Depression"

  d3.json(geojson_url).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    geojson = L.choropleth(data, {

      // Define what  property in the features to use
      valueProperty: "depression",

      // Set color scale
      scale: ["#ffffb2", "#b10026"],

      // Number of breaks in step range
      steps: 10,

      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
      },
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Location: " + feature.properties.name + "<br>" + "Depression:" + feature.properties.depression + "%");
      }
    }).addTo(map);
  });

}


function buildFactorMap(source){
  // Creating map object
  console.log("mapping")
  var map = L.map("map2", {
    center: [39.0473, -95.6752],
    zoom: 3
  });

  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(map);

  var geojson_url = base_geojson_url + source;

  // Grabbing our GeoJSON data..
  d3.json(geojson_url).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    geojson = L.choropleth(data, {
      // Define what  property in the features to use

      valueProperty: data.features[0].properties.FACTOR.toUpperCase(),

      // Set color scale
      scale: ["#ffffb2", "#b10026"],

      // Number of breaks in step range
      steps: 10,

      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
      },
      onEachFeature: function(feature, layer) {
        if(feature.properties.FACTOR == 'Income'){
          layer.bindPopup("Location: " + feature.properties.NAME + "<br>" + feature.properties.FACTOR + ": $" + feature.properties.INCOME);
        }
        else if(feature.properties.FACTOR == 'Alcohol'){
          layer.bindPopup("Location: " + feature.properties.NAME + "<br>" + "Alcoholism: " +feature.properties.ALCOHOL + "%");
        }
        else if(feature.properties.FACTOR == 'Poverty'){
          layer.bindPopup("Location: " + feature.properties.NAME + "<br>" + "Poverty: " +feature.properties.POVERTY + "%");
        }
        else if(feature.properties.FACTOR == 'Obesity'){
          layer.bindPopup("Location: " + feature.properties.NAME + "<br>" + "Obesity: " +feature.properties.OBESITY + "%");
        }
      }
    }).addTo(map);

  });

}



function buildVideo(){
  $("div#map2").append('<iframe width="705" height="415" src="https://www.youtube.com/embed/fWFuQR_Wt4M" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
}

function buildReferences(){
  $("div#plot4").append('<br><h2 style="border:4px; border-style:solid; border-color:#A45858;background:#A45858; color: white; text-align:center">Resources</h2></br></br></br>');
  $("div#plot4").append('<a href="https://journals.sagepub.com/doi/full/10.1111/1471-6402.00090?casa_token=Bl4WlN1FvCgAAAAA%3AFSQFX1HvvsPw4d689VOQ2xJBKw_z70_1uHOL9c8I93HNuymxKeaEzf2q0ll9qnfsCA7hMjOPFgN7" style="color:#A45858;position:relative;top:-60px;font-size:15px">• Poverty, Inequality, and Discrimination as Sources of Depression Among U.S. Women</a>');
  $("div#plot4").append('<br><a href="https://www.sciencedirect.com/science/article/abs/pii/S0165032714007769" style="color:#955151;position:relative;top:-55px;font-size:15px">• Depression Outcome in Alcohol Dependent Patients: An Evaluation of the Role of Independent and Substance-Induced Depression and Other Predictors</a></br>');
  $("div#plot4").append('<a href="https://onlinelibrary.wiley.com/doi/abs/10.1002/hec.1011?casa_token=-EWkBotQSTEAAAAA:cwb-Rol0aoapOMdMSNTX1X1_U1lKULX8btHbZUbXLnAlTwO2tINWKckXHfeN3ouST9isGV34BH7KMw" style="color:#814747;position:relative;top:-45px;font-size:15px">• Socioeconomic Status, Depression Disparities, and Financial Strain: What Lies Behind the Income‐Depression Relationship? </a>');
  $("div#plot4").append('<br><a href="https://jamanetwork.com/journals/jamapsychiatry/article-abstract/210608" style="color:#734141;position:relative;top:-35px;font-size:15px">• Overweight, Obesity, and Depression: A Systematic Review and Meta-analysis of Longitudinal Studies </a></br>');


}

function  dispatchButton(source) {
    //d3.select("#commentary").text("You selected " + source);
    first_time = false;

    $("div#map1").empty();
    $("div#map1").replaceWith( '<div class="col-md-6 quarter" id="map1"></div>' );
    $("div#map2").empty();
    $("div#map2").replaceWith( '<div class="col-md-6 quarter" id="map2"></div>' );
    Plotly.purge('plot3');
    $("div#plot4").empty();
    $("div#plot4").replaceWith( '<div class="col-md-6 quarter" id="plot4"></div>' );

    if(source == 'Depression'){
      buildDepressionPlot();
      buildDepressionMap();
      buildVideo();
      buildReferences();
      return;
    }
    else{
    full_url = base_url + source;
    full_geojson_url = base_geojson_url + source;

    //console.log(full_url);
    //d3.select("#plot1").text("You selected " + full_url);
    console.log("button")
    buildFactorPlot(source);
    buildDepressionMap();
    buildFactorMap(source);
  }
}
if (first_time){
  console.log("first_time")
  buildDepressionPlot();
  buildDepressionMap();
  buildVideo();
  buildReferences();
}
