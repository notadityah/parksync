# ParkSync

A web application designed to help car-dependent commuters find parking in Melbourne CBD by providing real-time parking data and insights into parking availability patterns.

## 🌟 Features

### 🏠 Home Page

- Overview of the parking problem
- Quick navigation to parking finder and issue analysis

### 📊 The Issue Page

- Population and vehicle growth statistics for Melbourne
- Dynamic data visualization showing the scale of the parking problem
- Real-time metrics from external APIs

### 🗺️ Find Parking Page

- Interactive embedded map with live parking sensor data
- Historical data analysis with visual charts
- Peak time insights and area recommendations
- Real-time availability updates every 3 minutes

## 🛠️ Technology Stack

- **Frontend**: React 19 with Vite
- **UI Framework**: React Bootstrap
- **Routing**: React Router DOM
- **Styling**: Custom CSS with Bootstrap integration
- **Data Source**: Melbourne City Council parking sensor API, MySQL database hosted on AWS
- **Build Tool**: Vite
- **Linting**: ESLint

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation bar
│   ├── Footer.jsx      # Application footer
│   ├── MapSection.jsx  # Embedded parking map
│   ├── NarrativeCard.jsx # Data presentation cards
│   └── index.js        # Component exports
├── pages/              # Main application pages
│   ├── Home.jsx        # Landing page
│   ├── TheIssue.jsx    # Problem analysis page
│   └── FindParking.jsx # Interactive parking finder
├── services/           # External API integration
│   └── api.js          # Data fetching and caching
└── assets/            # Images and static resources
```

## 🚀 Getting Started

## 🌐 Deployment

The application is configured for deployment with:

- **Production build**: `npm run build`
- **GitHub Pages**: `npm run deploy`
- **Digital Ocean**: Currently deployed at [tp11parksync-udycv.ondigitalocean.app](https://tp11parksync-udycv.ondigitalocean.app)

## 📊 Data Sources

- **Melbourne City Council**: On-street parking bay sensors
- **Population Data**: Australian Bureau of Statistics
- **Vehicle Registration**: VicRoads data
