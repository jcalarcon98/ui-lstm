import { useEffect, useState } from "react";
import { getPredictionsByCountries } from "services/models";
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress'
import Plot from 'react-plotly.js';
import Header from "components/common/header/header";
import { CustomAutoComplete } from "components/common/autocomplete/customAutoComplete";
import { getCountries } from "services/countries";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import Box from '@mui/material/Box';

export const Prediction = () => {


  const [days, setSelectedDays] = useState(1);
  const [loadingPrediction, setLoadingPrediction] = useState();
  const [loadingCountries, setLoadingCountries] = useState();
  const [availableCountries, setAvailableCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [plotData, setPlotData] = useState([]);

  useEffect(() => {
    const fetchAvailableCountries = async () => {
      setLoadingCountries(true);
      const countries = await getCountries();
      setAvailableCountries(countries ? countries: []);
      setLoadingCountries(false);
    };
    fetchAvailableCountries();
  }, []);

  useEffect(() => {
    const data = [];

    if (predictions) {
      predictions.forEach(
        (
          {
            country_name: country,
            confirmed_cases: confirmedCases,
            death_cases: deathCases,
          },
          index
        ) => {
          const {
            x_truth: xValues,
            y_truth: yValues,
            x_pred: xPrediction,
            y_pred: yPrediction,
          } = confirmedCases;
          data.push({
            x: xValues,
            y: yValues,
            type: "scatter",
            mode: "lines+markers",
            xaxis: `x${index + 1}`,
            yaxis: `y${index + 1}`,
            name: `CASOS ACTUALES ${country}`,
          });

          data.push({
            x: xPrediction,
            y: yPrediction,
            type: "scatter",
            mode: "lines+markers",
            xaxis: `x${index + 1}`,
            yaxis: `y${index + 1}`,
            name: `PREDICCION ${country}`,
          });
        }
      );
      setPlotData(data);
    }
  }, [predictions]);

  const startPrediction = async () => {
    setLoadingPrediction(true);
    console.log(selectedCountries);
    const predictions = await getPredictionsByCountries(selectedCountries, days);
    setPredictions(predictions);
    setLoadingPrediction(false);
  };

  return (
    <>
      <Header />
      {
        loadingCountries ?  <CircularProgress /> :
        ( 
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{width: '80%'}}>
              <div style={{display: 'flex'}}>
                <CustomAutoComplete
                  width='80%'
                  value={selectedCountries}
                  label='Seleccione los paises que desea predecir'
                  options={availableCountries}
                  onChange={(_, values) => setSelectedCountries(values)}
                />
                <TextField
                  style={{width: '20%', marginLeft: 10}}
                  value={days}
                  onChange={(e) => setSelectedDays(e.target.value)}
                  type="number"
                  InputProps={{
                    inputProps: { 
                      max: 20, min: 1 
                    }
                  }}
                  label="Días a predecir"
                />
              </div>
              

              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {
                  loadingPrediction && (
                    <Box sx={{ width: '100%' }}>
                      <LinearProgress />
                    </Box>
                  )
                }

                <Button style={{margin: '4px' }}variant="contained" size="large" onClick={startPrediction}>
                  Iniciar Predicción
                </Button>

                <Plot
                  data={plotData}
                  layout={{
                    title: "Prediccion de casos confirmados de COVID-19",
                    grid: { rows: 3, columns: 2, pattern: "independent" },
                    width: 1000,
                    height: 500,
                    margin: {
                      l: 50,
                      r: 50,
                      b: 100,
                      t: 100,
                      pad: 4,
                    },
                    paper_bgcolor: "#000000",
                    plot_bgcolor: "#000003",
                  }}
                />
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};
