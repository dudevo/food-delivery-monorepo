# PostgreSQL Setup Guide

## Quick Setup for Food Delivery Backend

### 1. Install PostgreSQL

#### macOS (using Homebrew)
```bash
brew install postgresql@16
brew services start postgresql@16
```

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### Windows
1. Download and install PostgreSQL from: https://www.postgresql.org/download/windows/
2. Follow the installation wizard
3. Make sure to remember the password you set during installation

### 2. Create Database

#### Method 1: Using psql command line
```bash
# Connect to PostgreSQL (default port is 5433 for this project)
psql -U postgres -p 5433

# Create the database
CREATE DATABASE "food-delivery-nest-db";

# Create a user (optional, you can use the default postgres user)
CREATE USER food_delivery_user WITH PASSWORD 'your_secure_password';

# Grant permissions
GRANT ALL PRIVILEGES ON DATABASE "food-delivery-nest-db" TO food_delivery_user;

# Exit psql
\q
```

#### Method 2: Using pgAdmin (GUI)
1. Open pgAdmin
2. Connect to your PostgreSQL server
3. Right-click on "Databases" → "Create" → "Database"
4. Enter database name: `food-delivery-nest-db`
5. Click "Save"

### 3. Configure Environment

1. Copy the example environment file:
```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` with your database credentials:
```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5433
DB_USER=postgres                    # or your created user
DB_PASSWORD=postgres                 # or your secure password
DB_NAME=food-delivery-nest-db
DB_SSL=false
```

### 4. Test Database Connection

1. Test connection to PostgreSQL:
```bash
psql -U postgres -p 5433 -d food-delivery-nest-db
```

2. List tables to verify connection:
```bash
\dt
```

3. Exit psql:
```bash
\q
```

### 5. Start the Backend Application

```bash
pnpm dev
```

The application should connect to the database and you should see:
- 🚀 Application is running on: http://localhost:5001
- 📚 Swagger docs available at: http://localhost:5001/docs
- 🗄️ Database: PostgreSQL on port 5433

### 6. Verify Database Tables

When you first register a user through the API, TypeORM will automatically create the following tables:

- `users` - User authentication data
- `customer_profiles` - Customer information
- `courier_profiles` - Courier data
- `restaurant_profiles` - Restaurant management
- `affiliate_profiles` - Affiliate tracking

You can verify this with:
```bash
psql -U postgres -p 5433 -d food-delivery-nest-db -c "\dt"
```

### Troubleshooting

#### Connection Issues
```bash
# Check if PostgreSQL is running
brew services list | grep postgresql  # macOS
sudo systemctl status postgresql       # Linux

# Restart PostgreSQL if needed
brew services restart postgresql@16    # macOS
sudo systemctl restart postgresql       # Linux
```

#### Port Issues
- Make sure port 5433 is available
- Check if another service is using the port: `lsof -i :5433`
- Modify DB_PORT in .env.local if you need to use a different port

#### Permission Issues
```sql
-- Grant superuser privileges if needed
ALTER USER postgres SUPERUSER;

-- Or create a new superuser
CREATE USER your_user WITH SUPERUSER PASSWORD 'password';
```

### Database Management

#### Connect to Database
```bash
psql -U postgres -p 5433 -d food-delivery-nest-db
```

#### Useful Commands
```sql
-- List all tables
\dt

-- Describe a table
\d users

-- List all users
\du

-- View database size
SELECT pg_size_pretty(pg_database_size('food-delivery-nest-db'));

-- View table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname::text || '.' || tablename::text)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname::text || '.' || tablename::text) DESC;
```

Your PostgreSQL database is now ready for the food delivery backend application!