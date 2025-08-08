# Environment Configuration

ParkSync uses a **global `.env` file** at the root level that both frontend and backend reference. This approach simplifies environment management and ensures consistency across the application.

## 🌍 Global Environment File

**Location**: `/parksync/.env` (root level)

### Benefits:

- ✅ **Single source of truth** for all environment variables
- ✅ **Shared configuration** between frontend and backend
- ✅ **Easier deployment** - one file to manage
- ✅ **Consistent variable names** across the stack

## 🔧 How It Works

### Backend (FastAPI)

The backend loads the global `.env` file using:

```python
from dotenv import load_dotenv
load_dotenv(dotenv_path="../.env")  # Load from parent directory
```

### Frontend (Vite)

The frontend is configured to:

1. Look for `.env` files in the parent directory
2. Automatically prefix variables with `VITE_` for client-side access
3. Fall back to non-prefixed versions when needed

```javascript
// vite.config.js
export default defineConfig({
  envDir: "..", // Look for .env files in parent directory
});
```

## 📝 Variable Naming Convention

### Shared Variables

These work for both frontend and backend:

```env
DATABASE_URL=postgresql://...
API_URL=http://localhost:8000
APP_NAME=ParkSync
ENVIRONMENT=development
```

### Frontend-Specific Variables

Use `VITE_` prefix for variables that need to be available in the browser:

```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=ParkSync
VITE_DEBUG=true
```

## 🚀 Setup

1. **Copy the example file**:

   ```bash
   cp .env.example .env
   ```

2. **Update with your values**:

   ```env
   DATABASE_URL=postgresql://your_user:your_pass@your_host:5432/parksync_db
   ```

3. **Start development**:
   ```bash
   npm run dev
   ```

## 🔒 Security Notes

- ⚠️ **Never commit `.env`** to version control
- ✅ **Use `.env.example`** as a template for others
- ✅ **Keep sensitive data** (passwords, API keys) in `.env` only
- ✅ **Use different `.env` files** for different environments (dev/staging/prod)

## 🏗️ Environment-Specific Configurations

### Development

```env
ENVIRONMENT=development
DEBUG=true
DATABASE_URL=postgresql://localhost:5432/parksync_dev
```

### Production

```env
ENVIRONMENT=production
DEBUG=false
DATABASE_URL=postgresql://prod_host:5432/parksync_prod
CORS_ORIGINS=["https://your-domain.com"]
```

## 🐳 Docker Usage

When using Docker Compose, the global `.env` file is automatically loaded:

```yaml
services:
  backend:
    env_file:
      - .env # Uses global environment file
  frontend:
    env_file:
      - .env # Uses global environment file
```

## 🗄️ Database Management

ParkSync uses a **simple database management approach** suitable for solo development:

### **Database Initialization:**

```bash
# Initialize database tables and data
npm run db:init

# Test database connection
npm run db:test

# Reset database (if needed)
npm run db:reset
```

### **Auto-Creation:**

The application automatically creates database tables on startup, so you typically don't need to run manual commands unless you want to reset or test the database.

This ensures consistent environment variables across all services.
