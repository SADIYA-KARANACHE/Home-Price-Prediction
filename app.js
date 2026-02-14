function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (var i = 0; i < uiBathrooms.length; i++) {
    if (uiBathrooms[i].checked) {
      return i + 1;
    }
  }
  return -1;
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (var i = 0; i < uiBHK.length; i++) {
    if (uiBHK[i].checked) {
      return i + 1;
    }
  }
  return -1;
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");

  var sqft = document.getElementById("uiSqft").value;
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations").value;
  var estPrice = document.getElementById("uiEstimatedPrice");

  var url = "http://127.0.0.1:5000/predict_home_price";

  $.post(url, {
      total_sqft: parseFloat(sqft),
      bhk: bhk,
      bath: bathrooms,
      location: location
  }, function(data, status) {
      console.log("Prediction received:", data);
      estPrice.innerHTML =
          "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
  });
}

function onPageLoad() {
  console.log("Document loaded");

  var url = "http://127.0.0.1:5000/get_location_names";

  $.get(url, function(data, status) {
      console.log("Got location names");

      if (data) {
          var locations = data.locations;
          var uiLocations = document.getElementById("uiLocations");

          $('#uiLocations').empty();

          for (var i = 0; i < locations.length; i++) {
              var opt = new Option(locations[i]);
              $('#uiLocations').append(opt);
          }
      }
  });
}

window.onload = onPageLoad;
