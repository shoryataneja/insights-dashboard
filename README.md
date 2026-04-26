# Insights Dashboard

A React Native mobile application that presents health and wellness data through a rich, interactive dashboard. The app features multiple analytics views including stability scores, cycle trends, body metrics, symptom breakdowns, and lifestyle correlations — all built with a clean, modern UI.

---

## Live Links

- **GitHub Repository:** [](https://github.com/shoryataneja/insights-dashboard)
- **Demo / Screen Recording:** https://drive.google.com/file/d/1mN8mihSybLh3hiJsfS7Q5Eq0dGEFrdFi/view?usp=sharing
---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React Native 0.81 |
| Platform | Expo ~54 |
| Charts & Graphs | react-native-svg |
| Gradients | expo-linear-gradient |
| Typography | @expo-google-fonts/inter |
| Safe Area Handling | react-native-safe-area-context |
| Styling | React Native StyleSheet API |

---

## Features

- **Stability Score** — Visual summary card showing overall health stability with a trend indicator
- **Cycle Trends** — Line/bar graph displaying cycle phase data over time
- **Body & Metabolic Trends** — Multi-metric chart tracking body and metabolic changes
- **Symptom Trends** — Donut/pie chart breaking down symptom frequency and category
- **Lifestyle Impact Grid** — Correlation grid mapping lifestyle factors to health outcomes
- **Responsive Design** — Consistent layout across iOS and Android screen sizes
- **Clean, Modern UI** — Pixel-perfect components with gradient accents and Inter typography

---

## Project Structure

```
insights-rn/
├── assets/                  # App icons and splash screen
├── src/
│   ├── components/          # Reusable UI and graph components
│   ├── constants/           # Theme, colors, spacing tokens
│   └── screens/             # Screen-level layout components
├── App.js
├── app.json
└── index.js
```

---

## Setup Instructions

**Prerequisites:** Node.js >= 18, npm or yarn, Expo Go app on your device (optional)

```bash
# 1. Clone the repository
git clone https://github.com/shoryataneja/insights-dashboard.git

# 2. Navigate into the project directory
cd insights-rn

# 3. Install dependencies
npm install

# 4. Start the development server
npx expo start
```

**Running on a device or emulator:**

- Press `a` in the terminal to open on an Android emulator
- Press `i` to open on an iOS simulator (macOS only)
- Scan the QR code with the Expo Go app on a physical device

---

## Approach & Implementation

**Component-based architecture** — Each visualization (stability card, cycle graph, symptom donut, etc.) is an isolated, reusable component with its own layout and styling logic.

**Separation of concerns** — UI rendering is kept separate from data shaping. Mock/static data is defined in constants or local files, making it straightforward to swap in a real API later.

**Reusable graph components** — Chart primitives built on `react-native-svg` are wrapped in typed components that accept data props, keeping screen-level code declarative and clean.

**Pixel-perfect UI** — Spacing, typography, and color values are centralized in `src/constants/` to ensure visual consistency across all screens.

**Static/mock data** — All graph data is currently sourced from local mock datasets, enabling full UI development without a backend dependency.

**Performance** — Heavy SVG renders are memoized where appropriate. Screens use `ScrollView` with minimal re-renders to keep the dashboard smooth on mid-range devices.

---

## Screenshots / Preview

> Add screenshots or a GIF preview here.

```
assets/screenshots/
├── dashboard-overview.png
├── cycle-trends.png
├── symptom-donut.png
└── lifestyle-grid.png
```

---

## Future Improvements

- Connect to a real health data API (e.g., Apple HealthKit, Google Fit)
- Add animated chart transitions using `react-native-reanimated`
- Introduce date range filtering and custom time windows
- Add user authentication and personalized data persistence
- Expand to a multi-tab navigation structure for deeper analytics views
- Write unit and snapshot tests for graph components
