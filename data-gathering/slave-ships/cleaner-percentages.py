# gets year, embarked, disembarked and died as well as percetages and the number based on the percentages

import requests
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np

df = pd.read_csv('slave-ships/data(3).csv')

# column names in csv
year = 'Year of arrival at port of disembarkation'
embarked = 'Total embarked'
disembarked ='Total disembarked'
men = 'Percent men'
women = 'Percent women'
children = 'Percent children'

# makes a dataframe with these specific columns
kept_columns = [year, embarked, disembarked, men, women, children]
percentages = [men, women, children]
floats = [embarked, disembarked]
df = df[kept_columns]

# print(df)
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
# print(converted)

# get the number of children women and men on the ships by multiplying decimal percentages by the embarked
# save these into new columns
nowomen = df[women] * df[embarked]
df['Number of Women'] = nowomen
df['Number of Women'] = df['Number of Women'].astype(int)

nomen = df[men] * df[embarked]
df['Number of Men'] = nomen
df['Number of Men'] = df['Number of Men'].astype(int)

nochild = df[children] * df[embarked]
df['Number of Children'] = nochild
df['Number of Children'] = df['Number of Children'].astype(int)


# if the number of women + men and children are not equal to the number of people on the ship, remove it

totalNumber = df['Number of Children'] + df['Number of Men'] + df['Number of Women']
# print(totalNumber)
df['Total calc num'] = totalNumber

df = df[df[embarked] >= df['Total calc num']]

print(df)


# convert men women children in percentages from decimals
df[percentages] = df[percentages] * 100
df[percentages] = np.round(df[percentages], decimals=2)

# print(df[percentages])


# gets the number of deaths by subtracting the embarked from the disembarked
deaths = (df[embarked] - df[disembarked])
# add another column called total died with the number of deaths
df['Total died'] = deaths

# some deaths were negative values because the embarked was lower than the disembarked,
# gets just the positive number of deaths - forgot to add >=, so if no one died its still there 
df = df[df['Total died'] >= 0]



# saves as csv
df.to_csv('slave-ships/data/cleaned16.csv', index=False)
