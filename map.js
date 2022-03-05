const L = window.L;

var map = L.map("map").setView([51.82659, 20.81105], 13);
var marker = L.marker([52.2349748205895, 20.98976280379679]).addTo(map);

var circle = L.circle([52.233898, 20.985475], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 5
}).addTo(map);

var circle1 = L.circle([52.23592, 20.980711], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 5
}).addTo(map);

var circle2 = L.circle([52.235841, 20.995731], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 5
}).addTo(map);

var circle3 = L.circle([52.23311, 20.996761], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 5
}).addTo(map);

var circle4 = L.circle([52.22686, 20.99659], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 5
}).addTo(map);

var circle5 = L.circle([52.240516, 21.013069], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 5
}).addTo(map);

var circle6 = L.circle([52.242676, 20.984573], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 5
}).addTo(map);

var circle7 = L.circle([52.251129, 20.984488], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 5
}).addTo(map);

var circle8 = L.circle([52.249301, 20.986032], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 5
}).addTo(map);

var circle9 = L.circle([52.247883, 20.958567], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 5
}).addTo(map);

var circle10 = L.circle([52.245258, 20.980024], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 5
}).addTo(map);

var circle11 = L.circle([52.230652, 21.010494], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 5
}).addTo(map);

var circle12 = L.circle([52.228288, 20.975132], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 5
}).addTo(map);

var circle13 = L.circle([52.241629, 20.99453], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 5
}).addTo(map);

var circle14 = L.circle([52.237795, 20.99247], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 5
}).addTo(map);

var circle15 = L.circle([52.235432, 20.995903], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 5
}).addTo(map);

var circle16 = L.circle([52.237007, 20.984058], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 5
}).addTo(map);

var circle17 = L.circle([52.240474, 20.990753], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 5
}).addTo(map);

var circle18 = L.circle([52.236062, 20.985861], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 5
}).addTo(map);

var circle19 = L.circle([52.241104, 20.999336], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 5
}).addTo(map);

var circle20 = L.circle([52.23419, 20.987084], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 5
}).addTo(map);

marker.bindPopup("<b>You are Here!</b><br>").openPopup();

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "kubalobo/ckwx8gteu4h0b14ns46d1t2s4",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1Ijoia3ViYWxvYm8iLCJhIjoiY2tlYTM3ZzBxMjJ6dzJzbDY4MGo0Z3E2ZSJ9.bUY1hv2zymhH_-HU0p84-A"
  }
).addTo(map);

var popup = L.popup();

function onMapClick(e) {
  //console.log(e)
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

map.on("click", onMapClick);

var geojsonMarkerOptions = {
  radius: 8,
  fillColor: "#ff78ff",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};

const markersArray = [];

L.geoJSON(data, {
  pointToLayer: function (feature, latlng) {
    const newMarker = L.circleMarker(latlng, geojsonMarkerOptions);
    markersArray.push(newMarker);
    return newMarker;
  }
}).addTo(map);

let j = 0;
data.features.map((feature) => {
  // Markers popups
  markersArray[j].bindPopup(feature.properties.opis_lokalizacji);
  j += 1;
});

function zoomToMarker(lat, lon) {
  console.log(lat + " " + lon);
  map.flyTo([lat, lon], 18);
}

const filterInputObject = document.querySelector("#filter-input");
function filterTable() {
  console.log(filterInputObject.value);
  generateTable(filterInputObject.value);
}

const tableObject = document.querySelector("#table-body");

function generateTable(filterString) {
  let i = 1;
  tableObject.innerHTML = "";

  data.features.map((feature) => {
    const address =
      feature.properties.ulica + " " + feature.properties.nr_budynku;

    if (address.toLowerCase().includes(filterString.toLowerCase())) {
      // Table generation
      const lat = feature.geometry.coordinates[1];
      const lon = feature.geometry.coordinates[0];

      tableObject.innerHTML += `
            <tr>
              <th scope="row">${i}</th>
              <td>${address}</td>
              <td><button type="button" class="btn btn-info" onclick="zoomToMarker(${lat}, ${lon})">Zoom</button></td>
            </tr>
            `;
      i += 1;
    }
  });
}

generateTable("");
