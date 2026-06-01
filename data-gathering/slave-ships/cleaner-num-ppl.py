# gets year, embarked, disembarked, died and filters them then groups the ships by year

import requests
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np

df = pd.read_csv('slave-ships/full-data.csv')

# column names in csv
year = 'Year of arrival at port of disembarkation'
embarked = 'Total embarked'
disembarked ='Total disembarked'

# makes a dataframe with these specific columns
kept_columns = [year, embarked, disembarked]
floats = [embarked, disembarked]
df = df[kept_columns]

# organises them by the year
df = df.sort_values(by=year)

# takes the years and checks if theyre greater than 1650, keep them in the dataframe,
# does the same thing but checks if theyre less than 1730 
df = df[df[year] >= 1650]
df = df[df[year] <= 1730]

# removes blank rows
df = df.dropna()

# converts floats into integers (the other columns were showing as x.0)
df[floats] = df[floats].astype(int)

# gets the number of deaths by subtracting the embarked from the disembarked
deaths = (df[embarked] - df[disembarked])
# add another column called total died with the number of deaths
df['Total died'] = deaths

# some deaths were negative values because the embarked was lower than the disembarked,
# gets just the positive number of deaths - forgot to add >=, so if no one died its still there 
df = df[df['Total died'] >= 0]

# if the year is the same for multiple rows, add the other columns to create one row
# groups the years together and adds each column together
df = df.groupby(year, as_index=False).sum()

# saves as csv
df.to_csv('slave-ships/data/cleanedGroup.csv', index=False)
