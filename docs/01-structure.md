# Project Directory Structure

```
masikoWidgets/
│
├── public/                 # Static files
│   ├── index.html
│   └── assets/             # Images, fonts, etc.
│
├── src/                    # Source files for the project
│   ├── assets/             # Media files like icons, images
│   ├── components/         # Reusable UI components
│   │   ├── WeatherWidget/
│   │   │   ├── WeatherWidget.tsx
│   │   │   ├── WeatherWidget.module.css
│   │   │   └── WeatherWidget.test.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── IconSelector.tsx
│   │
│   ├── hooks/              # Custom hooks
│   │   └── useWeatherData.ts
│   │
│   ├── services/           # API calls and service files
│   │   └── weatherApi.ts
│   │
│   ├── types/              # Type definitions
│   │   └── weather.d.ts
│   │
│   ├── utils/              # Utility functions
│   │   └── helpers.ts
│   │
│   ├── App.tsx             # Main App component
│   ├── index.tsx           # Entry point for the React app
│   ├── theme/              # Theme files for consistent styles
│   │   └── colors.ts
│   └── styles/             # Global styles, CSS resets, themes
│       └── global.css
│
├── .eslintrc.js            # ESLint configuration
├── .prettierrc             # Prettier configuration
├── tsconfig.json           # TypeScript configuration
├── package.json
├── README.md
└── docs/                   # Documentation
    ├── getting-started.md  # How to get started with the project
    ├── api-reference.md    # API reference for services
    └── component-guides.md # Details about each component
```
