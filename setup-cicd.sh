#!/bin/bash

# CI/CD Setup Script for Gameboy Project
# This script helps set up the CI/CD pipeline

set -e

echo "======================================"
echo "Gameboy CI/CD Pipeline Setup"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check if required tools are installed
check_dependencies() {
    echo "Checking dependencies..."
    echo ""
    
    # Check Node.js
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_success "Node.js is installed: $NODE_VERSION"
    else
        print_error "Node.js is not installed. Please install Node.js 18 or higher."
        exit 1
    fi
    
    # Check npm
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm --version)
        print_success "npm is installed: $NPM_VERSION"
    else
        print_error "npm is not installed."
        exit 1
    fi
    
    # Check Docker
    if command -v docker &> /dev/null; then
        DOCKER_VERSION=$(docker --version)
        print_success "Docker is installed: $DOCKER_VERSION"
    else
        print_info "Docker is not installed. Docker is optional but recommended."
    fi
    
    # Check Git
    if command -v git &> /dev/null; then
        GIT_VERSION=$(git --version)
        print_success "Git is installed: $GIT_VERSION"
    else
        print_error "Git is not installed."
        exit 1
    fi
    
    echo ""
}

# Install project dependencies
install_dependencies() {
    echo "Installing project dependencies..."
    echo ""
    
    if [ -f "package.json" ]; then
        npm install
        print_success "Dependencies installed successfully"
    else
        print_error "package.json not found. Are you in the project root?"
        exit 1
    fi
    
    echo ""
}

# Create GitHub workflows directory if it doesn't exist
setup_github_workflows() {
    echo "Setting up GitHub workflows..."
    echo ""
    
    if [ ! -d ".github/workflows" ]; then
        mkdir -p .github/workflows
        print_success "Created .github/workflows directory"
    else
        print_info ".github/workflows directory already exists"
    fi
    
    echo ""
}

# Test Docker build
test_docker_build() {
    echo "Testing Docker build..."
    echo ""
    
    if command -v docker &> /dev/null; then
        if docker build -t gameboy:test .; then
            print_success "Docker build successful"
            
            # Clean up test image
            docker rmi gameboy:test
        else
            print_error "Docker build failed"
            exit 1
        fi
    else
        print_info "Skipping Docker build test (Docker not installed)"
    fi
    
    echo ""
}

# Run tests
run_tests() {
    echo "Running tests..."
    echo ""
    
    # Run unit tests
    if npm run test; then
        print_success "Unit tests passed"
    else
        print_error "Unit tests failed"
        exit 1
    fi
    
    echo ""
}

# Build project
build_project() {
    echo "Building project..."
    echo ""
    
    if npm run build; then
        print_success "Build successful"
    else
        print_error "Build failed"
        exit 1
    fi
    
    echo ""
}

# Display required secrets
display_secrets_info() {
    echo "======================================"
    echo "Required GitHub Secrets"
    echo "======================================"
    echo ""
    echo "You need to configure the following secrets in your GitHub repository:"
    echo ""
    echo "Essential Secrets:"
    echo "  - VERCEL_TOKEN          (Get from: https://vercel.com/account/tokens)"
    echo "  - VERCEL_ORG_ID         (Run: vercel link && cat .vercel/project.json)"
    echo "  - VERCEL_PROJECT_ID     (Run: vercel link && cat .vercel/project.json)"
    echo ""
    echo "Optional Secrets:"
    echo "  - CODECOV_TOKEN         (Get from: https://codecov.io)"
    echo "  - CYPRESS_RECORD_KEY    (Get from: https://dashboard.cypress.io)"
    echo "  - SNYK_TOKEN            (Get from: https://app.snyk.io/account)"
    echo "  - SLACK_WEBHOOK         (Get from: https://api.slack.com/messaging/webhooks)"
    echo ""
    echo "To add secrets:"
    echo "  1. Go to: https://github.com/YOUR_USERNAME/gameboy/settings/secrets/actions"
    echo "  2. Click 'New repository secret'"
    echo "  3. Add each secret with its value"
    echo ""
}

# Display next steps
display_next_steps() {
    echo "======================================"
    echo "Setup Complete!"
    echo "======================================"
    echo ""
    echo "Next steps:"
    echo ""
    echo "1. Configure GitHub Secrets (see above)"
    echo "2. Copy workflow files to .github/workflows/"
    echo "3. Commit and push to GitHub"
    echo "4. Enable GitHub Actions in your repository"
    echo "5. Create a pull request to test the CI/CD pipeline"
    echo ""
    echo "Useful commands:"
    echo "  npm run dev              - Start development server"
    echo "  npm run test             - Run unit tests"
    echo "  npm run cypress:open     - Open Cypress test runner"
    echo "  npm run build            - Build for production"
    echo "  docker-compose up        - Run with Docker Compose"
    echo ""
    echo "Documentation:"
    echo "  - CI/CD Documentation: CI-CD-DOCUMENTATION.md"
    echo "  - Project README: README.md"
    echo ""
}

# Main execution
main() {
    check_dependencies
    install_dependencies
    setup_github_workflows
    run_tests
    build_project
    
    if command -v docker &> /dev/null; then
        test_docker_build
    fi
    
    display_secrets_info
    display_next_steps
}

# Run main function
main
