# Illegal Logging Risk Modeling using GEE and MaxEnt

## Overview

This project analyzes spatial risk of illegal logging using environmental variables derived from remote sensing data and ecological niche modeling.
The workflow integrates **Google Earth Engine**, **MaxEnt modeling**, and **QGIS spatial interpretation** to identify environmental characteristics associated with illegal logging locations.

---

## Research Objective

To model and analyze spatial risk patterns of illegal logging based on environmental predictors such as:

- Elevation
- Slope
- Distance to rivers
- Distance to road
- Land cover characteristics
- Environmental suitability

The study aims to understand environmental conditions that potentially influence illegal logging activities.

---

## Workflow

Google Earth Engine
↓
Environmental Variable Extraction
↓
MaxEnt Modeling
↓
Suitability Map Generation
↓
QGIS Spatial Interpretation

---

## Tools & Software

- Google Earth Engine (Remote sensing preprocessing)
- MaxEnt (Species distribution / suitability modeling)
- QGIS (Spatial analysis & interpretation)
- R (Statistical support)
- Microsoft Excel (Data preparation)

---

## Repository Structure
illegal-logging-risk-modeling-gee-maxent/
│
├── gee_script/
│ ├── distance_river.js
│ ├── distance_road.js
│ ├── elevation.js
│ ├── landcover.js
│ ├── ndvi.js
│ ├── population_density.js
│ └── slope.js
│
├── maxent_model/
│ └── maxent_workflow.md
│
├── qgis_analysis/
│ ├── illegal_logging_project.qgz
│ └── qgis_workflow.md
│
├── data/
│ ├── data_pembalakan_preprocessing.csv
│ ├── data SMART partol.xlsx
│ └── data shp
│
├── results/
│ ├── suitability_map.tif
│ └── visualization.png
│
└── README.md

---
## Google Earth Engine Stage

Environmental variables were prepared using Google Earth Engine.

Main steps:

- Satellite data collection
- Raster preprocessing
- Environmental feature extraction
- Export raster layers for modeling

The script can be found in: gee_script/
---

## MaxEnt Modeling

MaxEnt was used to model spatial suitability based on presence data.

### Inputs
- Illegal logging occurrence points
- Environmental raster variables

### Outputs
- Habitat suitability map
- Response curves
- Variable contribution analysis

Model outputs are stored in: results/

---

## QGIS Spatial Interpretation

QGIS was used to interpret spatial patterns.

Analysis performed:

- Overlay suitability map with environmental layers
- Interactive point inspection
- Extraction of environmental attributes at logging locations

Users can open the full project using: qgis_analysis/


---

## Key Output

The resulting suitability map highlights areas with higher potential risk of illegal logging activities based on environmental characteristics.

---

## Team Information
This project was processed by Statistics undergraduate students during their internship at the Balai Taman Nasional Gunung Merbabu (Mount Merbabu National Park Office) in 2026.

---
## License

This repository is shared for academic and portfolio purposes.



