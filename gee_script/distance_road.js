// AOI
var aoi = ee.FeatureCollection('projects/magang-merbabu-485004/assets/AOI_2');

// Jalan OSM
var roads = ee.FeatureCollection(
  'projects/magang-merbabu-485004/assets/jalan_tngmb'
);

var roadsAOI = roads.filterBounds(aoi);

// cek dulu
Map.centerObject(aoi, 11);

var roadRaster = roadsAOI
  .map(function(f) {
    return f.set('burn', 1);
  })
  .reduceToImage({
    properties: ['burn'],
    reducer: ee.Reducer.first()
  })
  .selfMask()
  .clip(aoi);

// cek raster
Map.addLayer(roadRaster, {palette: ['white']}, 'Road Raster');

var distRoad = roadRaster
  .fastDistanceTransform(30) // 30 = resolusi (meter)
  .sqrt()
  .multiply(30)              // ubah ke meter
  .rename('dist_road')
  .clip(aoi);

Map.addLayer(
  distRoad,
  {
    min: 0,
    max: 2000, // 0–2 km biar warnanya normal
    palette: ['red', 'orange', 'yellow', 'green']
  },
  'Jarak ke Jalan (m)'
);

Map.addLayer(roadsAOI, {color: 'black'}, 'Jalan OSM');

print(
  'Jarak ke Jalan',
  distRoad.reduceRegion({
    reducer: ee.Reducer.minMax(),
    geometry: aoi,
    scale: 30,
    maxPixels: 1e13
  })
);

var scale = 30;            // resolusi (samakan semua)
var crs = 'EPSG:4326';     // MaxEnt aman
var folder = 'GEE_MAXENT'; // nama folder di Google Drive

Export.image.toDrive({
  image: distRoad,
  description: 'distance_road',
  folder: folder,
  fileNamePrefix: 'distance_road',
  region: aoi,
  scale: scale,
  crs: crs,
  maxPixels: 1e13
});




