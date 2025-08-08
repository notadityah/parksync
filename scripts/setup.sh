#!/bin/bash
set -e

echo "🚀 Setting up ParkSync development environment..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Backend setup
echo "📦 Setting up backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install Python dependencies
echo "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating global .env file..."
    cp .env.example .env
    echo "⚠️  Please update .env with your database credentials"
fi

cd ..

# Frontend setup
echo "🎨 Setting up frontend..."
cd frontend

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install

cd ..

# Root dependencies
echo "📋 Installing root dependencies..."
npm install

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update .env with your PostgreSQL database credentials"
echo "2. Run 'npm run dev' to start both frontend and backend"
echo "3. Visit http://localhost:3000 for the frontend"
echo "4. Visit http://localhost:8000 for the API"
echo "5. Visit http://localhost:8000/docs for API documentation"
