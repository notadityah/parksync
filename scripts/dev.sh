#!/bin/bash

echo "🚀 Starting ParkSync development servers..."

# Check if required environment files exist
if [ ! -f .env ]; then
    echo "❌ .env not found. Run 'npm run setup' first."
    exit 1
fi

echo "✅ Environment file found"

# Start development servers using concurrently
echo "🔥 Starting both frontend and backend servers..."
npm run dev
