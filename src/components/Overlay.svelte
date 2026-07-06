<script lang="ts">
    import { count } from "../storage";
    import Options from "./Options.svelte";
    import { get_locale } from '../utils';
    import { loadLocale } from 'wuchale/load-utils'
    // so that the loaders are registered first
    import '../locales/main.loader.svelte.js'

    // you can use any state from anywhere for the locale
    let locale = get_locale();
</script>

{#await loadLocale(locale)}
    <div class="overlay">
        ...
    </div>
{:then}
    <div class="overlay">
        <Options {count} />
    </div>
{/await}

<style>
    .overlay {
        position: fixed;
        width: 300px;
        top: 16px;
        left: 16px;
        background-color: white;
        border: 1px solid black;
        padding: 16px;
    }
</style>
