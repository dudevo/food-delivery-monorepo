# Security Guidelines for Public Repository

This document outlines security practices for this food delivery monorepo to ensure sensitive information is not exposed.

## 🔒 Environment Variables & Configuration

### ✅ Safe for Public
- `.env.example` - Template showing required variables
- Configuration files with placeholder values
- Public API endpoints and documentation

### ❌ NEVER Commit
- `.env`, `.env.local`, `.env.production` - Actual environment variables
- API keys, secrets, or tokens
- Database credentials
- Private certificates or key files
- Service account files

## 🛡️ Pre-Deployment Checklist

Before pushing to public repository:

- [ ] All sensitive files are in `.gitignore`
- [ ] No hardcoded secrets in source code
- [ ] Environment variables use placeholders in examples
- [ ] Database connection strings are templated
- [ ] API keys are removed from code comments
- [ ] No personal information in commit messages
- [ ] Test data contains no real user information

## 📋 Ignored File Categories

The `.gitignore` file protects:

1. **Environment Files**: `.env*`, `secrets/*`, `credentials/*`
2. **Build Artifacts**: `dist/`, `.next/`, `build/`
3. **Dependencies**: `node_modules/`
4. **Logs & Cache**: `*.log`, `.cache/`
5. **IDE Files**: `.vscode/settings.json`, `.idea/`
6. **OS Files**: `.DS_Store`, `Thumbs.db`
7. **Database Files**: `*.db`, `*.sqlite*`
8. **Certificates**: `*.key`, `*.pem`, `*.crt`
9. **Deployment**: `.vercel`, `.netlify`
10. **Infrastructure**: `terraform.tfvars`, `*.tfstate`

## 🚨 What to Do if Secrets Are Accidentally Committed

1. **Immediately revoke/rotate** the exposed credentials
2. **Remove from git history**: `git filter-branch` or BFG Repo-Cleaner
3. **Force push** to rewrite history: `git push --force-with-lease`
4. **Update all team members** to re-clone the repository
5. **Monitor** for any unauthorized access

## 📖 Environment Setup for Developers

1. Copy `.env.example` to `.env.local`
2. Fill in actual values (never commit this file)
3. Ask team lead for production credentials
4. Use secure password managers for API keys

## 🔍 Regular Security Audits

- Review `.gitignore` before major releases
- Scan for accidentally committed secrets
- Update dependency vulnerabilities: `pnpm audit`
- Check for exposed endpoints in production builds

## 📞 Security Contact

If you discover security vulnerabilities, please report them to:
- **Email**: security@yourcompany.com
- **Create private issue** in this repository

---

**Remember**: Once something is pushed to a public repository, consider it permanently public, even if later removed.