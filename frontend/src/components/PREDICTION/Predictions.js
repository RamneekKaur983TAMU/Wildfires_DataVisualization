import React, { useEffect, useState } from 'react';
import PredictionKpiGrid from './PredictionKpiGrid';
import ForecastMap from './ForecastMap';
import predictionImage from './predictionImage.jpeg';
import SeverityGauge from './SeverityGauge';
import CountOverTime from './CountOverTime';
import IntensityDonut from './IntensityDonut';
import RiskRadar from './RiskRadar';
import ForecastTrends from './ForecastTrends';
import FireLoader from '../FireLoader'; // 🔥 fire‑loader component

const Predictions = ({ setPage }) => {
  const [kpiData, setKpiData] = useState({});
  const [forecastData, setForecastData] = useState({});
  const [severityData, setSeverityData] = useState({});
  const [countOverTimeData, setCountOverTimeData] = useState({});
  const [donutData, setDonutData] = useState({});
  const [riskRadarData, setRiskRadarData] = useState({});
  const [forecastTrendsData, setForecastTrendsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [chartsLoading, setChartsLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);


  useEffect(() => {
    fetch('http://localhost:8000/api/prediction/summary')
      .then(res => res.json())
      .then(data => {
        setKpiData(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setChartsLoading(true);
    setLoadedCount(0);

    const fetchData = async () => {

      // Fetch all chart data
      const fetchForecastData = async () => {
        const res = await fetch('/forecast_output.json');
        const result = await res.json();
        setForecastData(result);
        setLoadedCount((prev) => prev + 1);
      };

      const fetchSeverityData = async () => {
        const res = await fetch('/api/prediction/severity');
        const result = await res.json();
        setSeverityData(result);
        setLoadedCount((prev) => prev + 1);
      };

      const fetchCountOverTimeData = async () => {
        const res = await fetch('/api/prediction/count');
        const result = await res.json();
        setCountOverTimeData(result);
        setLoadedCount((prev) => prev + 1);
      };

      const fetchDonutData = async () => {
        const res = await fetch('/api/prediction/intensity');
        const result = await res.json();
        setDonutData(result);
        setLoadedCount((prev) => prev + 1);
      };

      const fetchRiskRadarData = async () => {
        const res = await fetch('/api/prediction/risk');
        const result = await res.json();
        setRiskRadarData(result);
        setLoadedCount((prev) => prev + 1);
      };

      const fetchForecastTrendsData = async () => {
        const res = await fetch('/api/prediction/trends');
        const result = await res.json();
        setForecastTrendsData(result);
        setLoadedCount((prev) => prev + 1);
      };

      // Trigger the fetches
      fetchForecastData();
      fetchSeverityData();
      fetchCountOverTimeData();
      fetchDonutData();
      fetchRiskRadarData();
      fetchForecastTrendsData();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (loadedCount === 6) {  // 6 is the total number of fetch calls for charts
      setChartsLoading(false);
    }
  }, [loadedCount]);


  return (
    <>
      <div style={{
        textAlign: 'center',
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        fontSize: '1.15rem',
        fontWeight: 'bold',
        color: '#f2c94c',
        fontFamily: 'inherit'
      }}>
        Prediction Dashboard - For getting High Risk Alerts and Forecasts
      </div>
      <div style={{
        backgroundColor: '#000',
        color: 'white',
        minHeight: 'calc(100vh - 60px)',
        padding: '0rem',
        display: 'grid',
        gridTemplateColumns: '0.8fr 2.4fr 0.8fr',
        gridTemplateRows: 'auto auto auto',
        gap: '2rem',
        gridTemplateAreas: `
          "kpis charts detail"
          "kpis charts detail"
          "kpis charts detail"
          "kpis charts detail"
        `
      }}>
        <div style={{
          gridArea: 'kpis',
          marginBottom: '1rem',
          marginLeft: '1.5rem',
          fontSize: '90%',
          backgroundColor: '#111',
          padding: '1rem',
          borderRadius: '8px',
          width: '80%'
        }}>
          <h3 style={{ color: '#ffcc80', marginTop: '1.3rem', marginBottom: '0.5rem' }}>Forecast KPIs</h3>
          <PredictionKpiGrid data={kpiData} loading={loading} />
        </div>

        <div style={{
          gridArea: 'charts',
          backgroundColor: '#111',
          padding: '0',
          borderRadius: '8px',
          display: 'grid',
          gap: '0',
          gridTemplateRows: 'auto auto auto',
          gridTemplateColumns: '1.4fr 1.6fr',
          gridTemplateAreas: `
            "map charts"
            "bottom bottom"
            "trend trend"
          `
        }}>
          {chartsLoading
            ? <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                pointerEvents: 'none'    // ← let all mouse/wheel events pass through
              }}>
                <FireLoader />
              </div>
            : (
          <>
          {/* 🔥 Forecast Map (Like CaliforniaFireMap) */}
          <div style={{
            gridArea: 'map',
            backgroundColor: '#111',
            padding: '0',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '0'
          }}>
            <ForecastMap data={forecastData} />
          </div>

          {/* 📊 Severity Gauge and Count Over Time (Like Incidents + Fires) */}
          <div style={{ gridArea: 'charts', display: 'grid', gridTemplateRows: '1fr 1fr', gap: '0' }}>
            <div style={{
              backgroundColor: '#111',
              padding: '0',
              // marginTop: '-0.65rem',
              borderRadius: '8px',
              height: '300px',
              width: '100%'
            }}>
              <SeverityGauge data={severityData}/>
            </div>
            <div style={{
              backgroundColor: '#111',
              padding: '0',
              borderRadius: '8px',
              height: '240px',
              width: '100%'
            }}>
              <CountOverTime data={countOverTimeData} />
            </div>
          </div>

          {/* 🍩 Donut + Radar (Like Damage vs Incidents + Structure Chart) */}
          <div style={{
            gridArea: 'bottom',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.25rem',
            marginTop: '1.5rem',
            height: '450px'
          }}>
            <div style={{
              backgroundColor: '#111',
              padding: '0',
              borderRadius: '8px',
              height: '200px',
              width: '100%'
            }}>
              <IntensityDonut data={donutData} />
            </div>
            <div style={{
              backgroundColor: '#111',
              padding: '0',
              borderRadius: '8px',
              height: '200px',
              width: '100%',
              marginLeft: '-1.4rem'
            }}>
              <RiskRadar data={riskRadarData}/>
            </div>
          </div>

          {/* 📈 Trends (Like HeatMap) */}
          <div style={{
            gridArea: 'trend',
            backgroundColor: '#111',
            padding: '0',
            borderRadius: '8px',
            marginTop: '-1.5rem',
            display: 'flex',
            flexDirection: 'column',
            height: '220px'
          }}>
            <ForecastTrends data={forecastTrendsData} />
          </div>
          </>
            )
          }
        </div>

        {/* 📌 Right Sidebar - Insights */}
        <div style={{
          gridArea: 'detail',
          backgroundColor: '#111',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '80%'
        }}>
          {/* <div style={{ backgroundColor: '#111', padding: '0rem', borderRadius: '8px' }}>
            <h4 style={{ color: '#ffcc80' }}>Insights</h4>
            <p style={{ fontSize: '0.8rem', color: '#aaa' }}>
              The predictions reflect expected hotspots, severity, and resource allocation zones for 2025. The visualizations assist emergency teams in anticipating critical regions and acting proactively.
            </p>
          </div> */}
          <div style={{
            gridArea: 'detail',
            backgroundColor: '#111',
            padding: '0rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '100%'
          }}>
            <h4 style={{ color: '#ffd700' }}>Insights</h4>
            <img src={predictionImage} alt="Wildfire Dashboard Overview" style={{ width: '100%', borderRadius: '6px', marginBottom: '0.75rem' }} />
            <p style={{ fontSize: '0.8rem', color: '#e0e0e0', marginBottom: '0.5rem' }}>
              This prediction dashboard highlights future wildfire hotspots, severity levels, and timing across California. It supports emergency planning through spatial and temporal risk forecasting.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                'Camarillo is forecasted as the top hotspot.',
                'Peak fire month is expected to be November.',
                '6,973 fires predicted, but with no expected damage.',
                'Severity score of 3/4 signals elevated risk.',
                '91.4% of predicted fires are low intensity.',
                'Other Minor Structures face highest risk.',
                'Fire counts drop in 2022–2023, then rebound in 2024.',
                '2024 predictions closely match actuals (94% confidence).',
                'Hotspots cluster near Sacramento and San Jose.',
                'Few severe fires expected; spread is mostly moderate.'
              ].map((text, i) => (
                <div key={i} style={{
                  backgroundColor: '#222',
                  color: '#e0e0e0',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem'
                }}>
                  {text}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Predictions;
