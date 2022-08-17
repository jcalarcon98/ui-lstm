import React from 'react';
import { useEffect, useState } from "react";
import { getPredictionsByCountries } from "services/models";
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress'
import Plot from 'react-plotly.js';
import Header from "../components/common/header/header";
import { CustomAutoComplete } from "../components/common/autocomplete/customAutoComplete";
import { getCountries } from "../services/countries";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import Box from '@mui/material/Box';
import { Card } from "components/common/card/card";
import tw from "twin.macro";
import { CustomDatePicker } from 'components/common/date-picker/datePicker';
import dayjs from 'dayjs';

export const Prediction = () => {

  const Container = tw.div`flex flex-col items-center py-10`;
  
  const dataValues = [
    {
      title: 'LSTM',
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image: 'https://picsum.photos/seed/picsum/350/450',
      imageFirst: false,
      border: false
    },
    {
      title: 'ARIMA:',
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image: 'https://picsum.photos/seed/picsum/350/450',
      imageFirst: true,
      border: false
    }
  ]

  const [date, setDate] = useState(dayjs(new Date('2020-04-18')));
  const [days, setSelectedDays] = useState(1);
  const [loadingPrediction, setLoadingPrediction] = useState();
  const [loadingCountries, setLoadingCountries] = useState();
  const [availableCountries, setAvailableCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [plotData, setPlotData] = useState([]);
  const [deathPlotData, setDeathPlotData] = useState([]);

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
    const deathData = [];

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

          const {
            x_truth: xDeathValues,
            y_truth: yDeathValues,
            x_pred: xDeathPrediction,
            y_pred: yDeathPrediction,
          } = deathCases;

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

          deathData.push({
            x: xDeathValues,
            y: yDeathValues,
            type: "scatter",
            mode: "lines+markers",
            xaxis: `x${index + 1}`,
            yaxis: `y${index + 1}`,
            name: `MUERTES ACTUALES ${country}`,
          });

          deathData.push({
            x: xDeathPrediction,
            y: yDeathPrediction,
            type: "scatter",
            mode: "lines+markers",
            xaxis: `x${index + 1}`,
            yaxis: `y${index + 1}`,
            name: `PREDICCION ${country}`,
          });
        }
      );
      setPlotData(data);
      setDeathPlotData(deathData);
    }
  }, [predictions]);

  const startPrediction = async () => {
    setLoadingPrediction(true);
    console.log(date.format('YYYY-MM-DD'))
    const selectedDate = date.format('YYYY-MM-DD');
    const predictions = await getPredictionsByCountries(selectedCountries, days, selectedDate);
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
            <Container>
              {
                dataValues.map((data, index)=> (
                  <Card 
                    key={index}
                    {...data}
                  />
                ))
              }
            </Container>

            <div style={{width: '80%'}}>
              <div style={{display: 'flex'}}>
                <CustomDatePicker
                  value={date}
                  setValue={setDate}
                />
                <CustomAutoComplete
                  width='70%'
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

                <hr/>
                <hr/>

                <Plot
                  data={deathPlotData}
                  layout={{
                    title: "Prediccion de casos de muertes de COVID-19",
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
