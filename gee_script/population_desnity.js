var aoi = ee.FeatureCollection('projects/magang-merbabu-485004/assets/AOI_2');
Map.centerObject(aoi, 10);

// Dataset kepadatan penduduk (contoh WorldPop)
var pop = ee.ImageCollection('WorldPop/GP/100m/pop')
  .filterDate('2020-01-01', '2020-12-31')
  .mean()
  .select('population');

// Mask pakai AOI
var popAOI = pop.updateMask(
  ee.Image.constant(1).clip(aoi)
);

// Tampilkan
Map.centerObject(aoi, 10);
Map.addLayer(
  popAOI,
  {min: 0, max: 1000, palette: ['grey', 'yellow', 'orange', 'red']},
  'Kepadatan Penduduk AOI'
);

var scale = 30;            // resolusi (samakan semua)
var crs = 'EPSG:4326';     // MaxEnt aman
var folder = 'GEE_MAXENT'; // nama folder di Google Drive

var population = ee.ImageCollection('WorldPop/GP/100m/pop')
  .filterDate('2020-01-01', '2020-12-31')
  .mosaic()
  .clip(aoi)
  .rename('population');

Export.image.toDrive({
  image: population,
  description: 'population_density',
  folder: folder,
  fileNamePrefix: 'population_density',
  region: aoi,
  scale: scale,
  crs: crs,
  maxPixels: 1e13
});





