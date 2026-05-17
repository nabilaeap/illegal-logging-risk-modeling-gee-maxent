var tngm = ee.FeatureCollection("projects/magang-merbabu-485004/assets/AOI_2");

Map.centerObject(tngm, 12);
Map.addLayer(tngm, {color: 'red'}, 'Batas TNGM');

var aoi = tngm.geometry();

Map.centerObject(aoi, 11);

// SLOPE //
var dem = ee.Image('USGS/SRTMGL1_003')
  .select('elevation')
  .clip(aoi);
var slope = ee.Terrain.slope(dem);

Map.addLayer(slope, {
  min: 0,
  max: 45,
  palette: ['white','orange','red']
}, 'Slope');

var scale = 30;            // resolusi (samakan semua)
var crs = 'EPSG:4326';     // MaxEnt aman
var folder = 'GEE_MAXENT'; // nama folder di Google Drive

Export.image.toDrive({
  image: slope,
  description: 'slope',
  folder: folder,
  fileNamePrefix: 'slope',
  region: aoi,
  scale: scale,
  crs: crs,
  maxPixels: 1e13
});
