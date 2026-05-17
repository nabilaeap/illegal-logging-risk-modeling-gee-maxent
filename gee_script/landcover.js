var aoi = ee.FeatureCollection('projects/magang-merbabu-485004/assets/AOI_2');

var landcover = ee.ImageCollection('ESA/WorldCover/v200')
  .first()
  .select('Map');

var lcAOI = landcover.clip(aoi);

var lcVis = {
  min: 10,
  max: 100,
  palette: [
    '006400', // 10 Tree cover
    'ffbb22', // 20 Shrubland
    'ffff4c', // 30 Grassland
    'f096ff', // 40 Cropland
    'fa0000', // 50 Built-up
    'b4b4b4', // 60 Bare / sparse
    'f0f0f0', // 70 Snow & ice
    '0064c8', // 80 Water
    '0096a0', // 90 Wetlands
    '00cf75'  // 100 Mangroves
  ]
};

Map.centerObject(aoi, 11);

Map.addLayer(
  lcAOI,
  lcVis,
  'Land Cover'
);


print(
  'Land Cover AOI',
  lcAOI.reduceRegion({
    reducer: ee.Reducer.frequencyHistogram(),
    geometry: aoi,
    scale: 10,
    maxPixels: 1e13
  })
);

var scale = 30;            // resolusi (samakan semua)
var crs = 'EPSG:4326';     // MaxEnt aman
var folder = 'GEE_MAXENT'; // nama folder di Google Drive

Export.image.toDrive({
  image: landcover,
  description: 'landcover',
  folder: folder,
  fileNamePrefix: 'landcover',
  region: aoi,
  scale: scale,
  crs: crs,
  maxPixels: 1e13
});

