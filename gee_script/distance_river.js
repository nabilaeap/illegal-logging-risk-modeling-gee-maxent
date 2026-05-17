var aoi = ee.FeatureCollection(
  "projects/magang-merbabu-485004/assets/AOI_2"
);
Map.addLayer(aoi, {color: 'red'}, 'AOI');
Map.centerObject(aoi, 11);

var rivers_all = ee.FeatureCollection(
  "projects/magang-merbabu-485004/assets/sungai_tngmb"
);

var rivers = rivers_all.filterBounds(aoi);
Map.addLayer(rivers, {color: 'blue'}, 'Sungai');

var riverRaster = ee.Image()
  .byte()
  .paint(rivers, 1)
  .selfMask();

var distRiver = riverRaster
  .fastDistanceTransform(30)
  .sqrt()
  .multiply(30)
  .rename('dist_river')
  .clip(aoi);

Map.addLayer(distRiver, {
  min: 0,
  max: 2000,
  palette: ['red','yellow','green']
}, 'Distance to River');

// cek nilai
print(
  distRiver.reduceRegion({
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
  image: distRiver,
  description: 'distance_river',
  folder: folder,
  fileNamePrefix: 'distance_river',
  region: aoi,
  scale: scale,
  crs: crs,
  maxPixels: 1e13
});
