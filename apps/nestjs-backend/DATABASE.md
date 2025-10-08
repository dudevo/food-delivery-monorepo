# Database Migration Commands

## Create Initial Migration
```bash
# Generate migration file
npx typeorm migration:generate -n InitialCreate -d src/config/migration.config.ts

# Run migrations
npx typeorm migration:run -d src/config/migration.config.ts

# Revert migrations
npx typeorm migration:revert -d src/config/migration.config.ts
```

## Database Setup

### PostgreSQL Setup

1. Install PostgreSQL:
   ```bash
   # macOS
   brew install postgresql
   brew services start postgresql
   
   # Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib
   sudo systemctl start postgresql
   ```

2. Create database:
   ```sql
   CREATE DATABASE "food-delivery-nest-db";
   CREATE USER food_delivery_user WITH PASSWORD 'secure_password';
   GRANT ALL PRIVILEGES ON DATABASE "food-delivery-nest-db" TO food_delivery_user;
   ```

3. Create `.env.local` file:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your database credentials
   ```

## Environment Variables

### Required Database Variables
- `DB_HOST`: PostgreSQL server host (default: localhost)
- `DB_PORT`: PostgreSQL server port (default: 5433)
- `DB_USER`: Database username (default: postgres)
- `DB_PASSWORD`: Database password (required)
- `DB_NAME`: Database name (default: food-delivery-nest-db)
- `DB_SSL`: Enable SSL connection (default: false)

### Application Variables
- `PORT`: Backend server port (default: 5001)
- `NODE_ENV`: Environment (development/production)
- `JWT_SECRET`: JWT signing secret (required in production)
- `CORS_ORIGIN`: Allowed CORS origins

### Default Configuration
- **Backend Port**: 5001
- **Database Port**: 5433
- **Database Name**: food-delivery-nest-db

## Connection Validation

The database configuration includes comprehensive validation:

- Required environment variables check
- Port number validation (1-65535)
- Connection string validation
- SSL configuration validation

## TypeORM Features

### Entities
- **User**: Base user entity with authentication
- **CustomerProfile**: Customer-specific data
- **CourierProfile**: Courier delivery information
- **RestaurantProfile**: Restaurant management data
- **AffiliateProfile**: Affiliate tracking data

### Features Enabled
- Automatic migrations in development
- Query logging in development
- UUID primary keys
- JSONB columns for flexible data
- Automatic timestamp tracking
- Soft relationships with cascade options

### Database Features
- PostgreSQL with JSONB support
- Full-text search capabilities
- Geospatial data support
- Index optimization
- Connection pooling

## Testing Database Connection

```bash
# Test connection by starting the server
pnpm dev

# Check logs for database connection status
# Should see: "Database connection established successfully"
```

## Production Considerations

1. **Security**:
   - Use strong database passwords
   - Enable SSL connections
   - Restrict database user permissions
   - Use environment variables for secrets

2. **Performance**:
   - Enable connection pooling
   - Add database indexes
   - Optimize query performance
   - Monitor database metrics

3. **Backups**:
   - Regular database backups
   - Point-in-time recovery
   - Backup verification
   - Disaster recovery plan

## Troubleshooting

### Connection Issues
- Check PostgreSQL service status
- Verify database credentials
- Check network connectivity
- Validate port availability

### Migration Issues
- Ensure database exists
- Check migration file syntax
- Verify database permissions
- Check TypeORM configuration

### Performance Issues
- Add missing indexes
- Optimize slow queries
- Check connection pool size
- Monitor database resources