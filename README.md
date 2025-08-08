# 🅿️ ParkSync

Real-time parking availability system for Melbourne CBD streets using City of Melbourne Open Data API.

## 🏗️ Architecture

- **Frontend**: React + Vite + Bootstrap
- **Backend**: FastAPI + Python
- **Database**: PostgreSQL (Digital Ocean)
- **Data Source**: Melbourne Open Data API v2.1

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL database (local or Digital Ocean)

### Setup

1. **Clone and setup:**
```bash
npm run setup
```

2. **Configure environment:**
   - Update `backend/.env` with your database credentials
   - Update `frontend/.env.local` if needed

3. **Start development servers:**
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Using Docker (Alternative)

```bash
docker-compose up --build
```

## 📁 Project Structure

```
parksync/
├── backend/                 # FastAPI backend
│   ├── app.py              # Main FastAPI application
│   ├── models.py           # Pydantic models
│   ├── database.py         # Database configuration
│   ├── parking_updater.py  # Data fetcher from Melbourne API
│   ├── requirements.txt    # Python dependencies
│   ├── alembic.ini        # Database migration config
│   └── Dockerfile         # Backend container config
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   └── services/      # API service layer
│   ├── package.json       # Frontend dependencies
│   └── Dockerfile         # Frontend container config
├── scripts/               # Development scripts
│   ├── setup.sh          # Environment setup
│   └── dev.sh           # Start development servers
├── docker-compose.yml    # Docker orchestration
└── package.json         # Root package.json for scripts
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run setup` | Setup development environment |
| `npm run dev` | Start both frontend and backend |
| `npm run dev:frontend` | Start only frontend |
| `npm run dev:backend` | Start only backend |
| `npm run build` | Build frontend for production |
| `npm run test` | Run all tests |
| `npm run lint` | Lint all code |

## 🌐 API Endpoints

### Core Endpoints
- `GET /api/parking/streets` - Get all street parking data
- `GET /api/parking/street/{name}` - Get specific street details
- `POST /api/parking/refresh` - Trigger data refresh
- `GET /api/parking/status` - Get system status
- `GET /api/health` - Health check

### Documentation
- Interactive API docs: http://localhost:8000/docs
- Alternative docs: http://localhost:8000/redoc

## 🎯 Monitored Streets

The system currently monitors parking availability for:
- **Collins Street** - CBD business district
- **Bourke Street** - Shopping/entertainment
- **Flinders Street** - Transport hub  
- **Swanston Street** - University/cultural precinct

## 🗄️ Database Schema

### Tables
- **streets** - Street information and summary stats
- **parking_bays** - Individual parking bay details
- **parking_zones** - Parking zone regulations

## 🔄 Data Pipeline

1. **Fetch**: Retrieve data from Melbourne Open Data API v2.1
2. **Process**: Combine bay locations with sensor status
3. **Store**: Update PostgreSQL database
4. **Serve**: Provide real-time data via REST API
5. **Display**: Show availability in React frontend

## 🚀 Deployment

### Digital Ocean
1. Create PostgreSQL database cluster
2. Update `DATABASE_URL` in environment
3. Deploy using Docker or direct deployment

### Environment Variables

**Backend (.env):**
```env
DATABASE_URL=postgresql://user:pass@host:5432/db
MELBOURNE_API_URL=https://data.melbourne.vic.gov.au/api/explore/v2.1
ENVIRONMENT=production
```

**Frontend (.env.local):**
```env
VITE_API_URL=https://your-api-domain.com
VITE_APP_NAME=ParkSync
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Data Source

This project uses data from [City of Melbourne Open Data Platform](https://data.melbourne.vic.gov.au/) under their open data license.
