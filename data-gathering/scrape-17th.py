from bs4 import BeautifulSoup
import pandas as pd
import requests

url = "https://en.wikipedia.org/wiki/List_of_shipwrecks_in_the_17th_century"
res = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
soup = BeautifulSoup(res.text, "html.parser")

# blank array for years
data = []

# finds years based on simiar html tags + classes
bullet_points = soup.find_all("li")
# years = soup.find_all("h3")
yeardivs =soup.find_all("div", class_="mw-heading")
# yeartag = yeardiv.find_all('h3')

# THIS GIVE ME MY UEARS!!! HUZZAHHHH!
for div in yeardivs:
    # print(div)
    year = div.find('h3')
    if (year == None):
        pass
    else:
        # adds to araay
        data.append(year.text)

    # sibling = div.find_next_sibling()
    # print('\n New')
    # print(sibling.text)
    

# print(data)
# turns array into dataframe
df = pd.DataFrame({'Year': data})
print(df)
# save as csv
df.to_csv('17th-cent-data-years.csv', index=False)
