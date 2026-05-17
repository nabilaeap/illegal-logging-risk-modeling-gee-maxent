var aoi = ee.FeatureCollection("projects/magang-merbabu-485004/assets/AOI_2");

Map.centerObject(aoi, 10);
Map.addLayer(aoi, {color: 'blue'}, 'AOI');

var landcover = ee.Image('ESA/WorldCover/v200/2021')
  .select('Map')
  .clip(aoi);

var settlement = landcover
  .eq(50)        // 1 = pemukiman
  .selfMask();   // buang non-pemukiman

Map.addLayer(
  settlement,
  {palette: ['red']},
  'Pemukiman'
);

var distSettlement = settlement
  .fastDistanceTransform(10) // satuan pixel
  .sqrt()
  .multiply(10)              // WorldCover = 10 m
  .rename('dist_settlement')
  .clip(aoi);

Map.addLayer(
  distSettlement,
  {
    min: 0,
    max: 3000, // batasi visualisasi
    palette: ['red', 'orange', 'yellow', 'green']
  },
  'Jarak ke Pemukiman (m)'
);

print(
  'Jarak ke Pemukiman (m)',
  distSettlement.reduceRegion({
    reducer: ee.Reducer.minMax(),
    geometry: aoi,
    scale: 10,
    maxPixels: 1e13
  })
);

var scale = 30;            // resolusi (samakan semua)
var crs = 'EPSG:4326';     // MaxEnt aman
var folder = 'GEE_MAXENT'; // nama folder di Google Drive

Export.image.toDrive({
  image: distSettlement,
  description: 'distance_settlement',
  folder: folder,
  fileNamePrefix: 'distance_settlement',
  region: aoi,
  scale: scale,
  crs: crs,
  maxPixels: 1e13
});

