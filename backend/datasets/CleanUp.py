import pandas as pd
import os

# File path
input_file = os.path.join(os.path.dirname(__file__), 'RawData.csv')
output_file = os.path.join(os.path.dirname(__file__), 'CleanedData.csv')

# Columns to retain
columns_to_keep = [
    '_id', 'OBJECTID', '* Damage', '* Street Number', '* Street Name', '* Street Type (e.g. road, drive, lane, etc.)',
    '* City', 'State', '* CAL FIRE Unit', 'County', '* Incident Name', 'Incident Number (e.g. CAAEU 123456)',
    'Incident Start Date', 'Hazard Type', 'If Affected 1-9% - Where did fire start?',
    'If Affected 1-9% - What started fire?', 'Structure Defense Actions Taken', '* Structure Type',
    'Structure Category', '# of Damaged Outbuildings < 120 SQFT', '* Roof Construction', '* Eaves', '* Vent Screen',
    '* Exterior Siding', '* Window Pane', '* Deck/Porch On Grade', '* Deck/Porch Elevated',
    '* Patio Cover/Carport Attached to Structure', '* Fence Attached to Structure', 'Fire Name (Secondary)',
    'APN (parcel)', 'Assessed Improved Value (parcel)', 'Year Built (parcel)', 'Site Address (parcel)', 'GLOBALID',
    'Latitude', 'Longitude', 'x', 'y'
]

# Load CSV
df = pd.read_csv(input_file)

# Clean data
df.columns = df.columns.str.strip()  # Strip any whitespace from column names
df = df[columns_to_keep]  # Keep only specified columns
df = df.drop_duplicates()  # Drop duplicate rows
df = df.dropna(how='all')  # Drop rows where all values are NaN

# Save cleaned data
df.to_csv(output_file, index=False)
print(f"Cleaned data saved to {output_file}")
