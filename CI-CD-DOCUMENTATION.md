# CI/CD Pipeline Documentation

This document describes the complete CI/CD pipeline setup for the Gameboy project, including GitHub Actions workflows, Docker configuration, and testing strategies.

## Table of Contents

- [Overview](#overview)
- [Workflows](#workflows)
- [Docker Setup](#docker-setup)
- [Required Secrets](#required-secrets)
- [Usage Guide](#usage-guide)
- [Troubleshooting](#troubleshooting)

## Overview

The CI/CD pipeline is built using GitHub Actions and consists of multiple workflows that handle:

- Automated testing (unit tests with Vitest and E2E tests with Cypress)
- Code quality checks (linting, TypeScript validation)
- Security scanning (npm audit, Snyk, Trivy, Grype)
- Docker image building and vulnerability scanning
- Automated deployments to Vercel
- Pull request validation

## Workflows

### 1. Main CI/CD Pipeline (`ci-cd.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches
- Manual workflow dispatch

**Jobs:**

1. **Install Dependencies** - Caches npm packages for faster builds
2. **Lint** - Runs ESLint for code quality
3. **Unit Tests** - Runs Vitest with coverage reporting
4. **Build** - Builds the production application
5. **E2E Tests** - Runs Cypress tests across Chrome, Firefox, and Edge
6. **Security Scan** - Performs npm audit and Snyk security checks
7. **Docker Build & Push** - Builds multi-platform Docker images and pushes to GitHub Container Registry
8. **Deploy Production** - Deploys to Vercel production (main branch only)
9. **Deploy Staging** - Deploys to Vercel staging (develop branch only)
10. **Notifications** - Sends Slack notifications on deployment

**Matrix Testing:**
- Cypress E2E tests run in parallel across 3 browsers (Chrome, Firefox, Edge)

### 2. Pull Request Checks (`pr-checks.yml`)

**Triggers:**
- Pull request opened, synchronized, or reopened

**Jobs:**

1. **PR Metadata Check** - Validates PR title follows semantic conventions
2. **Quick Validation** - Checks for merge conflicts, validates package.json
3. **Code Quality** - Linting, TypeScript checking, formatting validation
4. **Unit Tests** - Runs tests with coverage comments on PR
5. **Build Check** - Verifies successful build and reports size
6. **E2E Tests** - Runs critical Cypress tests (navigation and home page)
7. **Security Audit** - npm audit and secret scanning with TruffleHog
8. **All Checks Passed** - Summary job that comments on PR when all checks pass

### 3. Docker Security Scan (`docker-security.yml`)

**Triggers:**
- Push to `main` or `develop`
- Pull requests
- Daily schedule (2 AM UTC)
- Manual workflow dispatch

**Jobs:**

1. **Build Image** - Builds Docker image for scanning
2. **Trivy Scan** - Scans for vulnerabilities with Trivy
3. **Snyk Scan** - Container vulnerability scanning with Snyk
4. **Grype Scan** - Additional vulnerability scanning with Grype
5. **Hadolint** - Dockerfile best practices linting
6. **Docker Bench** - Docker security benchmarking
7. **Security Report** - Aggregates all scan results

## Docker Setup

### Files

1. **Dockerfile** - Multi-stage production build
   - Stage 1: Build application with Node.js
   - Stage 2: Serve with Nginx on Alpine Linux
   - Includes health checks and security hardening

2. **Dockerfile.dev** - Development container with hot reload

3. **docker-compose.yml** - Multi-service orchestration
   - `gameboy-app` - Production application service
   - `gameboy-dev` - Development service (profile: dev)
   - `cypress` - E2E testing service (profile: test)
   - `nginx-proxy` - Reverse proxy (profile: proxy)

4. **nginx.conf** - Nginx configuration for serving SPA
   - Gzip compression
   - Security headers
   - SPA fallback routing
   - Static asset caching

### Docker Commands

```bash
# Build production image
docker build -t gameboy:latest .

# Run production container
docker run -p 8080:8080 gameboy:latest

# Run with Docker Compose (production)
docker-compose up gameboy-app

# Run with Docker Compose (development)
docker-compose --profile dev up gameboy-dev

# Run Cypress tests
docker-compose --profile test up cypress

# Build and push to GitHub Container Registry
docker build -t ghcr.io/shahsau/gameboy:latest .
docker push ghcr.io/shahsau/gameboy:latest
```

## Required Secrets

Configure these secrets in GitHub Settings → Secrets and variables → Actions:

### Essential Secrets

| Secret Name | Description | Required For |
|------------|-------------|--------------|
| `GITHUB_TOKEN` | Auto-provided by GitHub | All workflows |
| `VERCEL_TOKEN` | Vercel deployment token | Production/Staging deployments |
| `VERCEL_ORG_ID` | Vercel organization ID | Production/Staging deployments |
| `VERCEL_PROJECT_ID` | Vercel project ID | Production/Staging deployments |

### Optional Secrets

| Secret Name | Description | Required For |
|------------|-------------|--------------|
| `CODECOV_TOKEN` | Codecov upload token | Coverage reporting |
| `CYPRESS_RECORD_KEY` | Cypress Dashboard recording | Cypress test recording |
| `SNYK_TOKEN` | Snyk API token | Security scanning |
| `SLACK_WEBHOOK` | Slack webhook URL | Deployment notifications |

### How to Get Secrets

**Vercel Secrets:**
```bash
# Install Vercel CLI
npm i -g vercel

# Login and link project
vercel login
vercel link

# Get project details
vercel project ls
cat .vercel/project.json
```

**Cypress Record Key:**
1. Visit [Cypress Dashboard](https://dashboard.cypress.io/)
2. Create/select project
3. Copy the Record Key from Project Settings

**Snyk Token:**
1. Visit [Snyk Account Settings](https://app.snyk.io/account)
2. Generate a new token

## Usage Guide

### For Developers

**Local Development:**
```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Run tests
npm run test
npm run test:watch

# Run E2E tests
npm run cypress:open
```

**Docker Development:**
```bash
# Start development environment
docker-compose --profile dev up

# Run tests in Docker
docker-compose --profile test up
```

### For CI/CD

**Automatic Triggers:**
- Push to `main` → Full CI/CD + Production deployment
- Push to `develop` → Full CI/CD + Staging deployment
- Open PR → PR validation checks + subset of tests
- Daily at 2 AM UTC → Security scans

**Manual Triggers:**
1. Go to Actions tab
2. Select workflow
3. Click "Run workflow"
4. Select branch and click "Run workflow"

### Pull Request Workflow

1. Create feature branch from `develop`
2. Make changes and commit
3. Open PR to `develop` or `main`
4. PR checks automatically run:
   - Metadata validation
   - Code quality checks
   - Unit tests with coverage
   - Build verification
   - Critical E2E tests
   - Security audit
5. Review coverage comments and check results
6. Fix any issues
7. Get approval and merge

### Deployment Workflow

**Staging Deployment:**
```bash
# Merge to develop branch
git checkout develop
git merge feature/your-feature
git push origin develop
```

**Production Deployment:**
```bash
# Merge to main branch
git checkout main
git merge develop
git push origin main
```

## Monitoring and Debugging

### View Workflow Runs
1. Navigate to Actions tab
2. Select workflow
3. Click on run to see details
4. Expand jobs to see step-by-step logs

### Download Artifacts
- Test coverage reports
- Cypress screenshots/videos
- Build artifacts
- Security scan results

### Check Deployment Status
- **Vercel Dashboard**: View deployment logs and status
- **GitHub Deployments**: Check deployment history
- **Docker Registry**: View published images at `ghcr.io`

## Troubleshooting

### Common Issues

**1. Cypress Tests Failing**
```bash
# Run locally to debug
npm run cypress:open

# Check screenshots in artifacts
# Update selectors if UI changed
```

**2. Build Failures**
```bash
# Check TypeScript errors
npx tsc --noEmit

# Verify dependencies
npm install
npm run build
```

**3. Docker Build Failures**
```bash
# Test build locally
docker build -t test .

# Check logs
docker logs <container-id>
```

**4. Deployment Failures**
```bash
# Verify Vercel secrets are set
# Check Vercel dashboard for errors
# Ensure build command is correct
```

### Getting Help

1. Check workflow logs in GitHub Actions
2. Review error messages in PR comments
3. Check security scan results in Security tab
4. Review Docker image scan reports

## Best Practices

1. **Always run tests locally** before pushing
2. **Keep PRs small** for faster reviews and CI runs
3. **Write meaningful commit messages** following conventional commits
4. **Monitor security scans** and address vulnerabilities promptly
5. **Review coverage reports** to maintain test quality
6. **Use feature flags** for large changes
7. **Tag releases** for production deployments

## Performance Optimization

- **Caching**: npm dependencies and Docker layers are cached
- **Parallel Execution**: Cypress tests run in parallel across browsers
- **Incremental Builds**: Docker uses multi-stage builds
- **Artifact Reuse**: Build artifacts are shared between jobs

## Security

- All Docker images are scanned for vulnerabilities
- Security scans run daily
- Secrets are properly managed in GitHub Secrets
- Non-root user in Docker containers
- Security headers in Nginx configuration
- Regular dependency updates recommended

## Maintenance

### Regular Tasks
- Review and update dependencies monthly
- Check security scan results weekly
- Monitor Docker image sizes
- Review and optimize workflow performance
- Update GitHub Actions versions

### Updating Workflows
1. Test changes in a feature branch
2. Use workflow_dispatch for manual testing
3. Monitor first runs after updates
4. Document changes in PR description

---

## License

MIT License - See LICENSE file for details

## Support

For issues or questions:
- Open a GitHub issue
- Check existing workflow runs
- Review documentation
- Contact maintainers
