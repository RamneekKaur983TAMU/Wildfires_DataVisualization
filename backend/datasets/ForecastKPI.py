import pandas as pd
import json
from sklearn.linear_model import LinearRegression
import numpy as np
import os

# Set file paths
base_dir = os.path.dirname(__file__)
csv_path = os.path.join(base_dir, 'TransformedData.csv')
output_path = os.path.join(base_dir, 'predicted_kpis.json')

# Load and clean the dataset
df = pd.read_csv(csv_path, low_memory=False)
df = df.dropna(subset=['Start Year', 'City', 'Damage', 'Street Number', 'Street Name', 'Start Month Name'])

# Use all historical data for modeling
df['Start Year'] = df['Start Year'].astype(int)

# Initialize output dict
kpi_result = {}

# 1. Predicted Hotspot (based on city-wise incident trends using regression)
city_year_counts = df.groupby(['Start Year', 'City']).size().unstack(fill_value=0)
city_predictions = {}
for city in city_year_counts.columns:
    years = city_year_counts.index.values.reshape(-1, 1)
    counts = city_year_counts[city].values
    if counts.sum() == 0:
        continue
    model = LinearRegression().fit(years, counts)
    city_predictions[city] = model.predict([[2025]])[0]
kpi_result['predictedHotspot'] = max(city_predictions, key=city_predictions.get)

# 2. Predicted Severity (regression on severity avg per year)
damage_weights = {
    'No Damage': 0,
    'Affected (1-9%)': 1,
    'Minor (10-25%)': 2,
    'Destroyed (>50%)': 4
}
df['Severity Score'] = df['Damage'].map(damage_weights)
severity_by_year = df.groupby('Start Year')['Severity Score'].mean().dropna()
X = np.array(severity_by_year.index).reshape(-1, 1)
y = severity_by_year.values
severity_model = LinearRegression().fit(X, y)
predicted_score = severity_model.predict([[2025]])[0]

# Choose severity category closest to predicted score
reverse_map = {v: k for k, v in damage_weights.items()}
closest = min(damage_weights.values(), key=lambda x: abs(x - predicted_score))
kpi_result['predictedSeverity'] = reverse_map[closest]

# 3. Predicted Time (most common month historically)
kpi_result['predictedTime'] = df['Start Month Name'].value_counts().idxmax()

# 4. Predicted Count (regression on incident count per year)
year_counts = df['Start Year'].value_counts().sort_index()
X_count = np.array(year_counts.index).reshape(-1, 1)
y_count = np.array(year_counts.values)
count_model = LinearRegression().fit(X_count, y_count)
kpi_result['predictedCount'] = int(count_model.predict([[2025]])[0])

# 5. Estimated Severity Avg (regression model result for 2025)
kpi_result['estimatedSeverityAvg'] = round(predicted_score, 2)*100

# 6. Forecasted Street (most frequent over all years)
df['StreetFull'] = df['Street Number'].astype(str).str.strip() + " " + df['Street Name'].str.strip()
kpi_result['forecastedStreet'] = df['StreetFull'].value_counts().idxmax()

# Write to JSON
with open(output_path, 'w') as f:
    json.dump(kpi_result, f, indent=2)

print(f"KPI JSON saved to {output_path}")