# stan-js devtools

[![React](https://img.shields.io/badge/react-%23077EA4?style=for-the-badge&logo=react&logoColor=%23fff&link=https%3A%2F%2Freact.dev%2F)](https://react.dev/)
[![ReactNative](https://img.shields.io/badge/react%20native-%23282C34?style=for-the-badge&logo=react&logoColor=%2360DAFB&link=https%3A%2F%2Freact.dev%2F)](https://reactnative.dev/)
[![platform - ssr](https://img.shields.io/badge/SSR-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![NPM Version](https://img.shields.io/npm/v/stan-js-devtools?style=for-the-badge&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fstan-js-devtools)](https://www.npmjs.com/package/stan-js-devtools)

## 🦫 Features

- 🐞 Debug store values with ease
- ⚛️ Works with React / Expo / Next.js
- 🔌 Plug and play

## 📺 Preview

<img src="./assets/preview.png" />

## 📦 Installation

> [!WARNING]  
> You need stan-js >= 1.5.0 to use devtools

```bash
npm i -D stan-js-devtools
yarn add -D stan-js-devtools
pnpm add -D stan-js-devtools
bun add -D stan-js-devtools
```

## 🚀 Usage

```tsx
import { Devtools } from 'stan-js-devtools'

const App = () => {
    return (
        <>
            {/* your app */}
            <DevTools />
        </>
    )
}
```

#### Usage with Expo

For React Native we're using [expo dev tools plugins](https://docs.expo.dev/debugging/devtools-plugins/) simply press `Shift + M` and select `Open stan-js-devtools` from the list.

No additional configuration is required!
