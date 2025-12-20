# SubmiTrack - Assignment Submission Portal
## Project Overview & Git Version Control Documentation

---

## 📋 Project Description

### What is SubmiTrack?

**SubmiTrack** is a full-stack **Assignment Submission & Management System** built with the MERN (MongoDB, Express, React, Node.js) stack. It is a comprehensive web application designed to streamline the process of assignment distribution, student submission, and instructor grading.

#### Key Features:
- **User Authentication**: Secure login/registration system with role-based access control
- **Dual Role System**: Support for both Students and Teachers/Instructors
- **Assignment Management**: Teachers can create, edit, and manage assignments with detailed specifications
- **Real-time Deadline Tracking**: Dynamic countdown timers showing time remaining for submission
- **File Submission System**: Students can submit assignments with file upload capabilities
- **Late Submission Detection**: Automatic tracking of submissions made after deadline
- **Grading System**: Teachers can grade submissions, assign marks, and provide detailed feedback
- **Responsive Design**: Mobile-friendly interface for accessibility across devices
- **Status Dashboard**: Real-time view of assignment status with filtering capabilities

#### Technology Stack:
```
Frontend:
  - React 18.2.0 (UI Framework)
  - React Router DOM 6.18.0 (Navigation)
  - Axios 1.6.0 (HTTP Client)
  - Vite 5.0.0 (Build Tool)

Backend:
  - Node.js & Express 4.18.2 (Server Framework)
  - MongoDB 7.5.0 with Mongoose (Database)
  - JWT Authentication (Security)
  - Bcryptjs (Password Hashing)
  - Multer (File Upload Handling)
  - CORS (Cross-Origin Resource Sharing)

Deployment:
  - Vercel (Backend Support)
  - Local Development with MongoDB
```

---

## 🔧 Git Version Control & Project Management Strategy

### Project Initialization & Branching Strategy

#### 1. **Initial Setup with Branches**
The project was initialized with a structured branching strategy to maintain clean development practices:

```
Main Branches:
├── main (Production-ready code)
├── develop (Integration branch for features)
└── Feature branches (feature/assignment-api, feature/auth-system, etc.)
```

**Purpose**: This Git Flow strategy allowed parallel development while maintaining code stability:
- `main`: Only production-ready, tested code
- `develop`: Staging area for feature integration
- Feature branches: Isolated development for specific features

#### 2. **Feature Branches Usage**

Created multiple feature branches for different components:
```
- feature/backend-setup
- feature/authentication-system
- feature/assignment-management
- feature/submission-handling
- feature/frontend-auth-pages
- feature/dashboard-ui
- feature/assignment-detail-page
- feature/submission-grading
- feature/deadline-tracking
```

**Workflow**:
1. Created new branch from `develop`
2. Developed feature in isolation
3. Tested thoroughly on local environment
4. Committed with descriptive messages
5. Pushed to remote repository

---

### 3. **Git Stash for Work Management**

**Scenarios where Stash was used**:

```bash
# Example: Switching contexts without committing
git stash save "WIP: login form validation fixes"

# Switching to critical bug fix branch
git checkout hotfix/critical-auth-bug

# After fixing bug and committing
git checkout feature/auth-system
git stash pop

# Continue work on login form
```

**Benefits**:
- Temporarily saved incomplete work without committing
- Switched between branches for urgent bug fixes
- Maintained clean commit history (no WIP commits)
- Organized work-in-progress items with descriptive messages

---

### 4. **Merge Strategy for Integration**

**Fast-Forward Merges** (for simple features):
```bash
# Completed feature with no conflicts
git checkout develop
git merge feature/simple-feature --ff

# Result: Linear, clean history
```

**3-Way Merges** (for feature integration):
```bash
# Complex feature with simultaneous development
git checkout develop
git merge feature/assignment-management

# Merge commit created, preserving branch history
```

**Handling Merge Conflicts**:
```bash
# When conflicts occurred during integration:
git merge feature/api-updates
# Conflicts detected in server.js, routes files

# Resolved conflicts manually in VS Code
# Reviewed differences between branches
# Kept both implementations where necessary

git add .
git commit -m "Merge feature/api-updates: Integrate new API endpoints"
```

**Major Merges**:
- Feature → Develop (multiple times during development)
- Develop → Main (final release preparation)
- Hotfix → Main & Develop (critical production fixes)

---

### 5. **Rebase for Clean History**

**Interactive Rebase** (before merging):
```bash
# Cleaning up feature branch commits
git checkout feature/auth-system
git rebase -i develop

# Reorganized commits:
# - Squashed multiple "fix: " commits into one
# - Reordered commits logically
# - Reworded commit messages for clarity

pick abc1234 feat: implement JWT authentication
squash def5678 fix: password validation
squash ghi9012 fix: token expiry handling
reword jkl3456 feat: add login endpointa
```

**Benefits**:
- Maintained linear, readable history
- Grouped related changes
- Clear progression of features
- Easy to identify what changed and why

**Rebase Usage During Integration**:
```bash
# Before merging feature to develop
git checkout feature/dashboard-ui
git rebase develop

# Replayed feature commits on top of latest develop
# Resolved conflicts (if any)
# Ensured feature is up-to-date
```

---

### 6. **Git Tags for Release Management**

**Semantic Versioning Tags**:
```bash
# Alpha/Beta releases during development
git tag -a v0.1.0-alpha -m "Initial backend setup with auth"
git tag -a v0.2.0-beta -m "Complete API endpoints, basic frontend"

# Stable releases
git tag -a v1.0.0 -m "First stable release: Full CRUD operations, grading system"
git tag -a v1.1.0 -m "Bug fixes: File download, submission status display"

# Production hotfix
git tag -a v1.1.1 -m "Hotfix: Auth route navigation issue"
```

**Tag Workflow**:
```bash
# Creating annotated tags (recommended)
git tag -a v1.0.0 -m "Release version 1.0.0: Complete assignment management system"

# Signing tags for security (optional)
git tag -s v1.0.0 -m "Signed release tag"

# Pushing tags to remote
git push origin --tags
```

**Release Tracking**:
- Each milestone marked with a tag
- Easy to checkout specific versions
- GitHub Release notes auto-generated from tags
- Ability to rollback to previous stable versions

---

### 7. **Push & Pull Workflow**

**Regular Push Workflow**:
```bash
# After completing feature work
git add .
git commit -m "feat: implement assignment creation form with validation"

# Push feature branch
git push origin feature/assignment-creation

# Create Pull Request on GitHub for code review
```

**Pull from Remote**:
```bash
# Before starting work - sync with team changes
git pull origin develop

# Pulling specific branch updates
git pull origin feature/api-updates

# Fetch without merging (safer approach)
git fetch origin
git merge origin/develop
```

**Handling Remote Changes**:
```bash
# Scenario: Remote branch updated, local branch behind
git fetch origin
git rebase origin/develop

# Or merge if rebase not preferred
git merge origin/develop
```

**Pushing with Multiple Branches**:
```bash
# Push all local branches
git push origin --all

# Push with tracking
git push -u origin feature/new-feature

# Delete remote branch after merge
git push origin --delete feature/completed-feature
```

---

### 8. **GitHub Collaboration & Project Management**

#### Repository Organization:
```
SubmiTrack/
├── .gitignore (Node modules, env files, OS files)
├── README.md (Project overview)
├── PROJECT_DOCUMENTATION.md (This file)
├── backend/
│   ├── .env (Environment variables - not in git)
│   ├── .gitignore
│   ├── package.json
│   └── [Source code]
├── frontend/
│   ├── .gitignore
│   ├── package.json
│   └── [Source code]
└── uploads/ (User submissions - in .gitignore)
```

#### GitHub Features Used:

**1. Pull Requests (Code Review)**:
```
PR Template:
- Title: feat: add submission grading interface
- Description: Implemented grading form with marks validation
- Related Issues: Closes #12, Resolves #15
- Testing: Manual testing completed on Chrome, Firefox
- Screenshots: Attached UI changes
```

**2. Issues Tracking**:
```
Issue: Bug - Login redirect not working after authentication
Labels: bug, high-priority, authentication
Assigned: [Developer name]
Milestone: v1.0.0

Issue: Feature - Add deadline countdown timer
Labels: feature, enhancement, UI
Assigned: [Frontend developer]
Milestone: v1.1.0
```

**3. Milestones**:
```
v0.1.0 - Core API Setup
├── User authentication
├── Database schema
└── Initial API endpoints

v1.0.0 - MVP Complete
├── Full assignment CRUD
├── Student submission system
├── Teacher grading system
└── Responsive frontend

v1.1.0 - Bug Fixes & Improvements
├── File download functionality
├── Navigation improvements
└── UI/UX enhancements
```

**4. GitHub Actions (CI/CD)**:
```yaml
# Would implement:
- Run tests on push/PR
- Lint code style
- Build verification
- Dependency security checks
```

---

## 📊 Development Timeline & Version History

### Version Progression:

| Version | Date | Key Features | Commits |
|---------|------|--------------|---------|
| v0.1.0 | Week 1 | Backend setup, Auth API | 15 |
| v0.2.0 | Week 2 | Assignment API, Models | 20 |
| v0.3.0 | Week 3 | Frontend auth pages | 18 |
| v0.4.0 | Week 4 | Dashboard, Assignment list | 22 |
| v1.0.0 | Week 5 | Submission system, Grading | 25 |
| v1.1.0 | Week 6 | Bug fixes, Improvements | 12 |

---

## 🔄 Git Commands Reference Used in Project

### Branch Operations:
```bash
git branch                           # List branches
git branch feature/assignment-api    # Create new branch
git checkout -b feature/new-feature  # Create & switch
git checkout main                    # Switch branch
git branch -d feature/done           # Delete branch
```

### Commits:
```bash
git add .                            # Stage changes
git commit -m "feat: message"        # Commit with message
git commit --amend                   # Modify last commit
git log --oneline                    # View commit history
```

### Stash:
```bash
git stash                            # Save work
git stash save "description"         # Named stash
git stash list                       # View all stashes
git stash pop                        # Apply & remove
git stash apply                      # Apply without removing
git stash drop stash@{0}             # Delete stash
```

### Merge & Rebase:
```bash
git merge feature/branch             # Merge feature
git rebase develop                   # Rebase on develop
git rebase -i HEAD~5                 # Interactive rebase
git merge --squash feature/branch    # Squash merge
```

### Tags:
```bash
git tag v1.0.0                       # Create tag
git tag -a v1.0.0 -m "message"       # Annotated tag
git push origin --tags               # Push all tags
git checkout v1.0.0                  # Checkout version
```

### Push & Pull:
```bash
git push origin feature/branch       # Push branch
git push -u origin branch            # Track remote
git pull origin develop              # Fetch & merge
git fetch origin                     # Fetch only
```

---

## 📈 Key Learnings & Best Practices Applied

1. **Atomic Commits**: Each commit represents one logical change
2. **Meaningful Messages**: Following conventional commits format (feat:, fix:, docs:)
3. **Branch Protection**: Main branch protected, requiring pull request reviews
4. **Regular Syncing**: Frequently pulling from remote to avoid conflicts
5. **Clean History**: Using rebase and squash for readable commit history
6. **Tagging Releases**: Versioning with semantic versioning (MAJOR.MINOR.PATCH)
7. **Issue Tracking**: Every feature/bug linked to GitHub issues
8. **Documentation**: Maintaining up-to-date README and docs

---

## 🎯 Project Impact & Outcomes

**Development Efficiency**:
- Parallel feature development using branches
- Quick context switching with stash
- Clean integration with merge strategy
- Easy rollback capability with tags

**Code Quality**:
- Reviewed changes via pull requests
- Meaningful commit history for debugging
- Clear version tracking for production

**Team Collaboration** (If applicable):
- Clear branch naming conventions
- Structured pull requests
- GitHub issues for communication
- Milestones for project planning

---

## 🚀 Deployment & Production Ready

The project is now ready for:
- Local development deployment
- Production deployment on Vercel/similar platforms
- Easy version rollback using git tags
- Smooth team collaboration with established workflows

**Current Status**: Fully functional MERN stack application with robust version control and project management practices.

---

**Repository**: [SubmiTrack on GitHub](https://github.com/yourusername/SubmiTrack)
**Last Updated**: December 20, 2025
**Maintained By**: Sachin Sharma

