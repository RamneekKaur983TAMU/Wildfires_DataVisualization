import pandas as pd
import json
import os

# Load dataset
df = pd.read_csv("./datasets/aggregated_incidents.csv")
print(f"🔢 Total elements in DataFrame: {df.size}")

predictions = []

for county in df['County'].unique():
    county_df = df[df['County'] == county].sort_values('Year')
    y = county_df['IncidentCount'].tolist()
    years = county_df['Year'].tolist()

    if len(y) >= 1:
        try:
            # print(f"\n📍 Forecasting {county} using moving average on data: {list(zip(years, y))}")

            # Use last 3 values or all available if fewer
            window = 3
            y_recent = y[-window:]

            forecast = sum(y_recent) / len(y_recent)
            predicted = max(int(round(forecast)), 0)

            # print(f"✅ Predicted for {county} using moving average: {predicted} incidents")

            latest_row = county_df.iloc[-1]
            predictions.append({
                'county': county,
                'lat': latest_row['Latitude'],
                'lng': latest_row['Longitude'],
                'predicted_incidents': predicted
            })
        except Exception as e:
            print(f"❌ Error predicting {county}: {e}")

# Top 5 counties with highest predicted incidents
top5 = sorted(predictions, key=lambda x: x['predicted_incidents'], reverse=True)[:5]
total = sum(p['predicted_incidents'] for p in top5)

output = []
for p in top5:
    output.append({
        'county': p['county'],
        'lat': p['lat'],
        'lng': p['lng'],
        'risk': 'High',
        'predicted_incidents': p['predicted_incidents'],
        'percentage': f"{(p['predicted_incidents'] / total * 100):.1f}%"
    })

# Save result
out_path = os.path.join("./datasets/forecast_output.json")
with open(out_path, "w") as f:
    json.dump(output, f, indent=2)

print("\n✅ Forecast generated and saved to forecast_output.json")
