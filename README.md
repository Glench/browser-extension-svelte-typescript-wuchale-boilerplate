# Svelte Typescript Browser Extension with Translations Boilerplate

This is a fork of [this Chrome extension with Svelte and Typescript boilerplate](https://github.com/NekitCorp/chrome-extension-svelte-typescript-boilerplate). This fork is meant to add Wuchale for translations and hopefully make it cross-browser compatible to some extent.

## Features

-   [Svelte](https://svelte.dev/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Vite](https://vitejs.dev/)
-   [CRXJS Vite Plugin](https://github.com/crxjs/chrome-extension-tools/blob/main/packages/vite-plugin/README.md)
-   [Chrome Extensions Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/)
-   [Wuchale for translations](https://github.com/wuchalejs/wuchale)

You can uncomment a lot of languages in `wuchale.config.js` if you'd like and then run `npm run dev` to populate the AI translations of all the languages. The template will automatically try to use the user's browser UI language if there is one, falling back to their preferred languages set in the browser, falling back to the first language defined in `wuchale.config.js`. `npm run build` will take any `.po` files generated and automatically make webextension-compatible i18n json files so you can use them in your manifest.json if desired.

## Demo

![Demo](/demo.gif)

## Examples of integrations

-   [Tailwind CSS](https://tailwindcss.com/) – is in the [tailwindcss](https://github.com/NekitCorp/chrome-extension-svelte-typescript-boilerplate/tree/tailwindcss) branch

## Development

```bash
# install dependencies
npm i

# init wuchale
npx wuchale

# optionally add Gemini API key for AI translations
export GEMINI_API_KEY=your_api_key

# export wuchale's .po files into web extension-compatible messages.json files
# in case you want to use them outside your svelte components, such as in manifest.json
npm run write_locales

# build files to `/dist` directory
# HMR for extension pages and content scripts
npm run dev
```

### Load unpacked extensions

[Getting Started Tutorial](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked)

1. Open the Extension Management page by navigating to `chrome://extensions`.
2. Enable Developer Mode by clicking the toggle switch next to `Developer mode`.
3. Click the `LOAD UNPACKED` button and select the `/dist` directory.

## Build

```bash
# build files to `/dist` directory
$ npm run build
```
