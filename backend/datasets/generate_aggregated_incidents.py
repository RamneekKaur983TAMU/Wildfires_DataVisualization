import pandas as pd

# Load your existing transformed data
df = pd.read_csv('./TransformedData.csv')

# Ensure required columns are present
required_columns = ['County', 'Start Year', 'Latitude', 'Longitude']
for col in required_columns:
    if col not in df.columns:
        raise ValueError(f"Missing required column: {col}")

# Drop rows with missing values in any required column
df = df.dropna(subset=required_columns)

# Normalize year to int
df['Start Year'] = df['Start Year'].astype(int)

# Group by County and Year, count incidents and average lat/lng
agg = df.groupby(['County', 'Start Year']).agg(
    IncidentCount=('County', 'size'),
    Latitude=('Latitude', 'mean'),
    Longitude=('Longitude', 'mean')
).reset_index()

# Round lat/lng for readability
agg['Latitude'] = agg['Latitude'].round(6)
agg['Longitude'] = agg['Longitude'].round(6)

# Rename for consistency
agg.rename(columns={'Start Year': 'Year'}, inplace=True)

# Save the result
agg.to_csv('aggregated_incidents-2.csv', index=False)

print("✅ Saved 'aggregated_incidents.csv' with County, Year, IncidentCount, Latitude, and Longitude.")
