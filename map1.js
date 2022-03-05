const L = window.L;

var map = L.map("map").setView([51.82659, 20.81105], 11);

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
    const opening = feature.properties.godziny_otwarcia;
    const payment = feature.properties.payment_type;

    if (address.toLowerCase().includes(filterString.toLowerCase())) {
      // Table generation
      const lat = feature.geometry.coordinates[1];
      const lon = feature.geometry.coordinates[0];

      tableObject.innerHTML += `
            <tr>
              <th scope="row">${i}</th>
              <td>${address}</td>
              <td><button type="button" class="btn btn-info" onclick="zoomToMarker(${lat}, ${lon})">Zoom</button></td>
              <td>${opening}</td>
              <td>${payment}</td>
            </tr>
            `;
      i += 1;
    }
  });
}

generateTable("");
