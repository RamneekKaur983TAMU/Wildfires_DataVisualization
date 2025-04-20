import React, { useEffect, useState } from 'react';
import PredictionKpiGrid from './PredictionKpiGrid';
import ForecastMap from './ForecastMap';
import SeverityGauge from './SeverityGauge';
import CountOverTime from './CountOverTime';
import IntensityDonut from './IntensityDonut';
import RiskRadar from './RiskRadar';
import ForecastTrends from './ForecastTrends';

const Predictions = ({ setPage }) => {
  const [kpiData, setKpiData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/prediction/summary')
      .then(res => res.json())
      .then(data => {
        setKpiData(data);
        setLoading(false);
      });
  }, []);

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
            <ForecastMap />
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
              <SeverityGauge />
            </div>
            <div style={{
              backgroundColor: '#111',
              padding: '0',
              borderRadius: '8px',
              height: '240px',
              width: '100%'
            }}>
              <CountOverTime />
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
              <IntensityDonut />
            </div>
            <div style={{
              backgroundColor: '#111',
              padding: '0',
              borderRadius: '8px',
              height: '200px',
              width: '100%',
              marginLeft: '-1.4rem'
            }}>
              <RiskRadar />
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
            <ForecastTrends />
          </div>
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
          <div style={{ backgroundColor: '#111', padding: '0rem', borderRadius: '8px' }}>
            <h4 style={{ color: '#ffcc80' }}>Insights</h4>
            <p style={{ fontSize: '0.8rem', color: '#aaa' }}>
              The predictions reflect expected hotspots, severity, and resource allocation zones for 2025. The visualizations assist emergency teams in anticipating critical regions and acting proactively.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Predictions;
