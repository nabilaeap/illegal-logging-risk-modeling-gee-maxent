var tngm = ee.FeatureCollection("projects/magang-merbabu-485004/assets/AOI_2");

Map.centerObject(tngm, 12);
Map.addLayer(tngm, {color: 'red'}, 'Batas TNGM');

var aoi = tngm.geometry();

Map.centerObject(aoi, 11);


// NDVI //
var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(aoi)
  .filterDate('2023-01-01', '2023-12-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
  .select(['B4', 'B8']);

var s2_med = s2.median();

var ndvi = s2_med
  .normalizedDifference(['B8', 'B4'])
  .rename('NDVI')
  .clip(aoi);

Map.addLayer(ndvi, {
  min: -0.2,
  max: 0.8,
  palette: ['red','yellow','green']
}, 'NDVI');

var scale = 30;            // resolusi (samakan semua)
var crs = 'EPSG:4326';     // MaxEnt aman
var folder = 'GEE_MAXENT'; // nama folder di Google Drive

Export.image.toDrive({
  image: ndvi,
  description: 'ndvi',
  folder: folder,
  fileNamePrefix: 'ndvi',
  region: aoi,
  scale: scale,
  crs: crs,
  maxPixels: 1e13
});
