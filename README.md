# RnBulletproofAuth

A minimal React Native 0.80 app using a Bulletproof-React-style structure:

- Clean sign-in screen
- React Navigation native stack
- React Query for data fetching
- Simple Node/Express backend (Docker-ready)
- Detox E2E tests with testIDs and helper modules

---

## Requirements

### OS / Tooling

- macOS (for iOS builds)
- Xcode **15+**
- iOS Simulator **iOS 17+**
- Android Studio (optional for Android)
- CocoaPods **1.15+**
- Watchman (optional but recommended)

### Runtime

- Node.js **18 LTS or 20 LTS** (recommended: **20.x**)
- npm **10+** (or yarn / pnpm if you prefer)
- Ruby **3.2+** (system Ruby often works; if you manage Ruby explicitly, use 3.2 or 3.3)
  - `gem install cocoapods` (Pods 1.15+)

Optional version pins:

```
# .nvmrc
20

# .ruby-version
3.3.0
```

---

## Project Structure

```
.
├── App.tsx
├── index.js
├── src
│   ├── navigation/
│   │   └── root-navigator.tsx
│   ├── providers/
│   │   └── query-client.ts
│   ├── screens/
│   │   └── HomeScreen.tsx
│   ├── features/
│   │   └── auth/
│   │       ├── api/login.ts
│   │       ├── components/SignInForm.tsx
│   │       ├── hooks/useAuth.ts
│   │       ├── screens/SignInScreen.tsx
│   │       ├── storage/auth-storage.ts
│   │       └── types.ts
│   ├── shared/
│   │   ├── constants/testIDs.ts
│   │   ├── lib/{env.ts, fetcher.ts}
│   │   └── ui/{Button.tsx, Input.tsx}
│   └── test-utils/e2e/
│       ├── helpers/{selectors.ts, actions.ts, assertions.ts}
│       └── tests/auth.e2e.ts
├── backend/  (separate repo or sibling folder if you cloned the zip)
├── ios/
├── android/
├── .detoxrc.js
├── e2e.jest.config.js
├── babel.config.js
├── tsconfig.json
└── package.json
```

---

## Setup

Install dependencies:

```bash
npm install
```

iOS pods:

```bash
npx pod-install ios
```

Ensure **babel.config.js** is minimal:

```js
module.exports = {
  presets: ['@react-native/babel-preset'],
};
```

If you prefer the Metro preset:

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
};
```

Avoid adding `transform-react-jsx-self/source` plugins.  
Also make sure your app **package.json** does **not** set `"type": "module"`.

---

## Running the Backend (Docker)

Use the provided backend (Express + TS) we generated:

```bash
# from backend folder (with docker-compose.yaml)
docker compose up -d
# health check
curl http://localhost:4000/health
```

- iOS simulator base URL: `http://localhost:4000`
- Android emulator base URL: `http://10.0.2.2:4000`

This is already handled in `src/shared/lib/env.ts`.

---

## Run the App

iOS:

```bash
npm run ios
```

Android:

```bash
npm run android
```

Common iOS build gotcha: in Xcode → Target → Build Phases → **Bundle React Native code and images**, add:

```sh
export NODE_BINARY="$(which node)"
```

---

## E2E Tests (Detox 20+)

Install dev deps:

```bash
npm i -D detox jest @types/jest ts-jest
brew tap wix/brew && brew install applesimutils   # macOS only
```

**.detoxrc.js** (new schema):

```js
/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      config: 'e2e.jest.config.js',
      _: ['src/test-utils/e2e/tests'],
    },
    jest: { setupTimeout: 120000 },
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath:
        'ios/build/Build/Products/Debug-iphonesimulator/RnBulletproofAuth.app',
      build:
        'RCT_NEW_ARCH_ENABLED=0 xcodebuild -workspace ios/RnBulletproofAuth.xcworkspace -scheme RnBulletproofAuth -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'ios.release': {
      type: 'ios.app',
      binaryPath:
        'ios/build/Build/Products/Release-iphonesimulator/RnBulletproofAuth.app',
      build:
        'RCT_NEW_ARCH_ENABLED=0 xcodebuild -workspace ios/RnBulletproofAuth.xcworkspace -scheme RnBulletproofAuth -configuration Release -sdk iphonesimulator -derivedDataPath ios/build',
    },
  },
  devices: {
    simulator: { type: 'ios.simulator', device: { type: 'iPhone 15' } },
  },
  configurations: {
    'ios.sim.debug': { device: 'simulator', app: 'ios.debug' },
    'ios.sim.release': { device: 'simulator', app: 'ios.release' },
  },
};
```

**e2e.jest.config.js**:

```js
module.exports = {
  rootDir: '.',
  testMatch: ['<rootDir>/src/test-utils/e2e/tests/**/*.ts'],
  testTimeout: 180000,
  maxWorkers: 1,

  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: ['detox/runners/jest/reporter'],
  testEnvironment: 'detox/runners/jest/testEnvironment',

  transform: { '^.+.tsx?$': 'ts-jest' },
  verbose: true,
};
```

Build & test:

```bash
npx detox build -c ios.sim.debug
npx detox test  -c ios.sim.debug
# release (optional)
npx detox build -c ios.sim.release
npx detox test  -c ios.sim.release
```

---

## Useful Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "start:reset": "react-native start --reset-cache",
    "clean:ios": "watchman watch-del-all || true && rm -rf node_modules ios/Pods ios/Podfile.lock ios/build ~/Library/Developer/Xcode/DerivedData && npm install && npx pod-install ios",
    "e2e:ios:build:debug": "detox build -c ios.sim.debug",
    "e2e:ios:test:debug": "detox test -c ios.sim.debug",
    "e2e:ios:build:release": "detox build -c ios.sim.release",
    "e2e:ios:test:release": "detox test -c ios.sim.release",
    "backend:up": "docker compose -f backend/docker-compose.yaml up -d",
    "backend:down": "docker compose -f backend/docker-compose.yaml down"
  }
}
```

---

## Troubleshooting

- **Duplicate `__self`/`__source`** → remove legacy JSX transform plugins; use only RN/Metro preset.
- **Could not connect to server** on iOS → ensure Docker maps `-p 4000:4000` and server listens on `0.0.0.0`.
- **Bundle React Native code and images failed** → set `NODE_BINARY` and clear caches (`npm run clean:ios`).
- **Keyboard hides button in E2E** → use `tapReturnKey()` on last field or tap a root view with `testID`.

---
