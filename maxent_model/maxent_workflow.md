# MaxEnt Modeling Workflow

## Software
MaxEnt Version: 3.4.4
Execution: GUI / batch mode

## Input Data
- Species occurrence: data_pembalakan_preprocessing.csv
- Environmental variables:
  - elevation.tif
  - ndvi.tif
  - slope.tif
  - distance_river.tif
  - distance_road.tif
  - landcover.tif
  - ndvi.tif
  - population_density.tif

## Model Settings
Feature types: Auto
Regularization multiplier: 1
Replicates: 10
Replication type: Cross-validation
Output format: Logistic
Maximum iterations: 500
Convergence threshold: 0.00001

## Modeling Steps
1. Load occurrence data.
2. Load environmental raster variables.
3. Define output directory.
4. Run MaxEnt model.
5. Generate habitat suitability map.

## Output Produced
- prediction.asc
- response_curves/
- ROC_curve.png
