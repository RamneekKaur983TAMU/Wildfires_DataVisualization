import pandas as pd
import os

# File path
input_file = os.path.join(os.path.dirname(__file__), 'CleanedData.csv')
output_file = os.path.join(os.path.dirname(__file__), 'TransformedData.csv')

# Load cleaned data
df = pd.read_csv(input_file)

# Convert 'Incident Start Date' to datetime
df['Incident Start Date'] = pd.to_datetime(df['Incident Start Date'], errors='coerce')

# Create new date-related columns
df['Start Year'] = df['Incident Start Date'].dt.year
df['Start Month'] = df['Incident Start Date'].dt.month
df['Start Month Name'] = df['Incident Start Date'].dt.strftime('%B')
df['Start Day'] = df['Incident Start Date'].dt.day
df['Start Weekday'] = df['Incident Start Date'].dt.day_name()

# Rename columns to be clearer for visualization (optional enhancements)
df = df.rename(columns={
    '* Damage': 'Damage',
    '* Street Number': 'Street Number',
    '* Street Name': 'Street Name',
    '* Street Type (e.g. road, drive, lane, etc.)': 'Street Type',
    '* City': 'City',
    '* CAL FIRE Unit': 'CAL FIRE Unit',
    '* Incident Name': 'Incident Name',
    '* Structure Type': 'Structure Type',
    '* Roof Construction': 'Roof Construction',
    '* Eaves': 'Eaves Type',
    '* Vent Screen': 'Vent Screen Type',
    '* Exterior Siding': 'Siding Type',
    '* Window Pane': 'Window Pane Type',
    '* Deck/Porch On Grade': 'Deck On Grade',
    '* Deck/Porch Elevated': 'Deck Elevated',
    '* Patio Cover/Carport Attached to Structure': 'Patio Cover Attached',
    '* Fence Attached to Structure': 'Fence Attached'
})

# Save transformed data
df.to_csv(output_file, index=False)
print(f"Transformed data saved to {output_file}")
