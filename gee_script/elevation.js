var tngm = ee.FeatureCollection("projects/magang-merbabu-485004/assets/AOI_2");

Map.centerObject(tngm, 12);
Map.addLayer(tngm, {color: 'red'}, 'Batas TNGM');

var aoi = tngm.geometry();

Map.centerObject(aoi, 11);
  
// ELEVASI //
var dem = ee.Image('USGS/SRTMGL1_003')
  .select('elevation')
  .clip(aoi);

Map.addLayer(dem, {
  min: 500,
  max: 3500,
  palette: ['blue','cyan','yellow','red']
}, 'Elevasi');

var scale = 30;            // resolusi (samakan semua)
var crs = 'EPSG:4326';     // MaxEnt aman
var folder = 'GEE_MAXENT'; // nama folder di Google Drive

Export.image.toDrive({
  image: dem,
  description: 'elevation',
  folder: folder, 
  fileNamePrefix: 'elevation',
  region: aoi,
  scale: scale,
  crs: crs,
  maxPixels: 1e13
});