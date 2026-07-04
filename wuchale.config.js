// @ts-check
import { adapter as svelte } from "@wuchale/svelte"
import { defineConfig, gemini } from "wuchale"

export default defineConfig({
    locales: [
        "en",
        "es",
        // "ar",
        // "de",
        // "bn",
        // "ru",
        // "nl",
        // "bs",
        // "pt",
        // "km",
        // "hr",
        // "el",
        // "cs",
        // "fr",
        // "da",
        // "et",
        // "fi",
        // "ka",
        // "zh",
        // "hu",
        // "hi",
        // "id",
        // "it",
        // "ja",
        // "kk",
        // "lv",
        // "lt",
        // "ms",
        // "mt",
        // "ro",
        // "ne",
        // "no",
        // "ur",
        // "tl",
        // "pl",
        // "sr",
        // "sl",
        // "ko",
        // "sv",
        // "th",
        // "tr",
        // "uk",
        // "vi",
    ],
    loading: {
        direct: false,
    },
    fallback: {},
    ai: gemini({
        model: 'gemini-3-flash-preview',
        batchSize: 40,
        parallel: 5,
        think: true, // default: false
    }),
    adapters: {
        main: svelte({ loader: 'svelte' }),
    }
})
