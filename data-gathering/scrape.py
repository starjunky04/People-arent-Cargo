import requests
from bs4 import BeautifulSoup
import pandas as pd

# url = "https://en.wikipedia.org/wiki/List_of_shipwrecks_in_the_1700s"
url = "https://en.wikipedia.org/wiki/List_of_shipwrecks_in_the_1710s"
# url = "https://en.wikipedia.org/wiki/List_of_shipwrecks_in_the_1720s"

response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Find all tables
tables = soup.find_all("table", {"class": "wikitable"})

all_data = []

for table in tables:
    month_header = table.find_previous('h3')
    month = month_header.text.strip() if month_header else "Unknown"
    # print(month)
    year_header = table.find_previous('h2')
    year = year_header.text.strip() if year_header else "Unknown"
    # print(year)

    rows = table.find_all("tr")
    headers = [th.get_text(strip=True) for th in rows[0].find_all("th")]

    for row in rows[1:]:
        cols = row.find_all("td")
        if len(cols) == 0:
            continue
        values = [col.get_text(strip=True) for col in cols]
        entry = dict(zip(headers, values))
        entry["Month"] = month
        # all_data.append(entry)
        entry["Year"] = year
        if (entry["State"] == 'unknown'):
            pass
        else:
            all_data.append(entry)

# Turn into a DataFrame
df = pd.DataFrame(all_data)
print(df.head())

# Save as CSV
df.to_csv("1710_shipwrecks3.csv", index=False)
