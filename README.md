# ⚡ TaskFlow

**TaskFlow** is an ultra-modern, highly interactive personal task management dashboard built with React and Vite. It is designed to help students and professionals organize their tasks, track their execution metrics, customize metadata (categories and priorities), and visualize completion progress.

---

## 🌟 Key Features

- **Onboarding Portal:** Get started by setting up student details (name and registration number), which are saved in local storage.
- **Dynamic Stats Dashboard:** Live overview of metrics:
  - Total number of tasks
  - Completed vs Pending items count
  - Visual color-gradient progress bar indicator of task completion percentage
- **Interactive Task Form:** Add tasks with title validations, optional details, category tags (💻 Work, 🏡 Personal, 📚 Studies, 💪 Fitness), and priority levels (High, Medium, Low) with custom date deadlines.
- **Power Filters & Search:** Filter tasks dynamically by completion status (All, Active, Completed), search text queries, priority selectors, and category selectors.
- **Collapsible Cards:** Tasks display summaries and can be expanded to reveal description logs and creation dates.
- **External Web Feed Integration:** Under "Sample Tasks from Web", the app integrates with JSONPlaceholder REST API to load live mock feeds asynchronously with a centered bottom refresh button.
- **Premium Styling & Dark Mode:** Responsive design supporting dark theme and light theme transitions, subtle animations, and glassmorphic panels.

---

## 🛠️ Technology Stack

- **Framework:** React 19 (Functional Components & Hooks)
- **Bundler:** Vite 8
- **Styling:** Vanilla CSS (CSS Custom Variables, Glassmorphism, CSS keyframe animations)
- **Linter:** ESLint 10 with `react-hooks` and `react-refresh` flat configurations

---

## 🚀 Getting Started

### 1. Installation

Install all required dependencies:
```bash
npm install
```

### 2. Development Server

Start Vite's fast HMR local development server:
```bash
npm run dev
```

### 3. Production Build

Build the project for production distribution:
```bash
npm run build
```
This generates optimized, minified static files in the `/dist` directory.

### 4. Code Quality & Linter

Validate the codebase for formatting rules and potential react errors:
```bash
npm run lint
```
