# 🦠 Offline COVID-19 Tracker

This is an **offline-capable COVID-19 tracker web application** that displays historical data including **Confirmed Cases, Recovered, and Deaths** for each country. It uses a CSV file from Our World in Data (OWID) and visualizes it using **interactive graphs and tables** — no internet required after setup!

---

## 📌 Features

- 🔍 Searchable country-wise COVID-19 data
- 📊 Graphical view (line/bar charts) using Chart.js
- 📋 Scrollable tabular data view
- 🌐 Informative static pages:
  - About the project
  - Contact
  - FAQ
- 📁 Fully **offline support** using local CSV-to-JSON conversion
- 🎨 Clean UI powered by custom CSS

---
## 🌐 Live Demo

🔗 [View Website ](https://covid-web-app-puce.vercel.app/)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Covid-WebApp.git
cd Covid-WebApp
```
---

## 2. Prepare the JSON Data
### Ensure Java is installed, then run:

```bash
cd backend
javac dataProcessor.java
java dataProcessor
```
This will generate data.json from owid-covid-data.csv.

## 3. Open the App
You can now open index.html directly in your browser!

✅ No server or internet required after setup — works fully offline!

## ✉ Contact
### Created by Surya
📫 reshotofficial01@gmail.com
