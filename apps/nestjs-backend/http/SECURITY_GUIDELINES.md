# HTTP Testing Security Guidelines

## 🛡️ Security Rules for HTTP Test Files

### ✅ Safe to Commit to GitHub

#### **Template Files (Allowed):**
- Files using environment variables: `$API_BASE_URL`, `$USER_EMAIL`, `$ACCESS_TOKEN`
- Placeholder values: `test@example.com`, `your-secure-password-here`
- Template files showing request structure: `-template.http`, `-example.http`
- Public endpoint testing files (no auth required)
- Example requests with sample data: `"email": "test@example.com"`

#### **Example Safe Files:**
```http
# ✅ SAFE - Uses environment variables
http POST $API_BASE_URL/api/auth/login \
Content-Type: application/json

{
  "email": "$USER_EMAIL", 
  "password": "$USER_PASSWORD"
}

# ✅ SAFE - Uses placeholder data
http POST http://localhost:5001/api/auth/login \
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "your-secure-password-here"
}

# ✅ SAFE - Public endpoint (no auth required)
http GET http://localhost:5001/api/health

# ✅ SAFE - Template file
http GET http://localhost:5001/api/profile \
Authorization: Bearer $ACCESS_TOKEN
```

### 🚫 Never Commit to GitHub

#### **Forbidden Files (Never Commit):**
- Files containing real API keys: `"api_key": "sk-1234567890"`
- Files with real JWT tokens: `"token": "eyJ0eXAiOiJKV1QiLCJh..."`
- Files with production credentials: `"password": "ActualProdPass123"`
- Files with real authentication data: `"access_token": "real-token-xyz"`
- Files with real emails: `"email": "user@company.com"`

#### **Example Dangerous Files:**
```http
# 🚫 DANGEROUS - Contains real token
http POST http://api.example.com/protected \
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...

# 🚫 DANGEROUS - Contains real credentials
http POST http://api.example.com/login \
Content-Type: application/json

{
  "email": "user@company.com",
  "password": "ActualPassword123"
}

# 🚫 DANGEROUS - Contains real API key
http GET http://api.example.com/data \
X-API-Key: sk-1234567890abcdef

# 🚫 DANGEROUS - Contains production secrets
{
  "db_host": "prod-db.company.com",
  "db_password": "SuperSecret123!"
}
```

### 🔒 File Naming Conventions

#### **Safe Naming Patterns:**
- `-template.http` (template files)
- `-example.http` (example usage)
- `-test.http` (test files with placeholder data)
- `endpoint-test.http` (endpoint testing)
- `api-template.http` (API templates)

#### **Unsafe Naming Patterns (Avoid):**
- `-real.http` (real data)
- `-prod.http` (production data)
- `-credentials.http` (contains credentials)
- `-secrets.http` (contains secrets)
- `-actual.http` (actual implementation)

### 📋 Checklist Before Commit

#### ✅ **Safe to Commit When:**
- [ ] File uses environment variables (`$VAR_NAME`)
- [ ] Email addresses are generic (`test@example.com`)
- [ ] Passwords are placeholders (`your-password-here`)
- [ ] Tokens are variables (`$ACCESS_TOKEN`)
- [ ] API keys are variables (`$API_KEY`)
- [ ] File is marked as template or example
- [ ] No real production data included
- [ ] No actual user credentials present

#### 🚫 **Do NOT Commit When:**
- [ ] File contains real JWT tokens
- [ ] File contains actual email addresses
- [ ] File contains real passwords
- [ ] File contains production API keys
- [ ] File contains real authentication tokens
- [ ] File has database connection strings with real credentials
- [ ] File contains any sensitive production data

### 🛠️ Implementation Examples

#### **✅ Safe Implementation:**
```http
# auth-login-template.http (Safe)
http POST http://localhost:5001/api/auth/login \
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "your-secure-password-here"
}

# Usage:
# 1. Copy template content
# 2. Replace with actual test data in terminal
# 3. Execute the command
# 4. Template file remains safe for commit
```

#### **🚫 Dangerous Implementation (Avoid):**
```http
# auth-login-real.http (DANGEROUS)
http POST http://localhost:5001/api/auth/login \
Content-Type: application/json

{
  "email": "john.doe@company.com",
  "password": "ActualPassword123"
}

# ❌ This contains real credentials and should never be committed
```

### 🔍 Code Review Checklist

When reviewing HTTP files for commits, check for:

#### **Security Scan:**
- [ ] No hardcoded passwords in the file
- [ ] No hardcoded tokens or API keys
- [ ] No real email addresses (unless `test@example.com` or similar)
- [ ] No production database connection strings
- [ ] No real authentication tokens

#### **Content Safety:**
- [ ] Environment variables are properly used
- [ ] Placeholder data is generic and non-identifying
- [ ] Template nature is clearly indicated
- [ ] No sensitive production information included

#### **File Safety:**
- [ ] File name indicates it's a template/example
- [ ] Comments clearly state it's for testing
- [ ] No private or confidential information present
- [ ] Follows naming conventions for safety

### 🚨 Emergency Procedures

#### **If Sensitive Data Was Accidentally Committed:**
1. **Immediately revert the commit:**
   ```bash
   git revert HEAD~1
   git push origin main --force-with-lease
   ```

2. **Check git history:**
   ```bash
   git log --oneline -10
   ```

3. **Rotate all exposed credentials:**
   - Change passwords
   - Regenerate API keys
   - Revoke JWT tokens
   - Update database passwords

4. **Scan for any additional exposure:**
   ```bash
   git log --all --grep -i "password\|token\|key\|secret"
   ```

5. **Inform security team** (in production environment)

### 📚 Best Practices

#### **Development:**
- Use environment variables for all sensitive data
- Create template files for team collaboration
- Use placeholder data that's clearly non-sensitive
- Document security rules in project guidelines

#### **Testing:**
- Use test databases with non-production data
- Generate temporary tokens for testing
- Clean up test credentials after use
- Never commit test credentials to version control

#### **Team Collaboration:**
- Share template files for common API patterns
- Document environment variable requirements
- Provide clear examples of safe usage
- Regular security audits of HTTP test files

Remember: **When in doubt, don't commit!** It's always better to keep sensitive data local and share the testing patterns and templates instead.