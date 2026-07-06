<script lang="ts">
    import { type Writable } from "svelte/store";
    import { get_locale } from '../utils';

    interface Props {
        count: Writable<number>;
    }
    import { loadLocale } from 'wuchale/load-utils'
    // so that the loaders are registered first
    import '../locales/main.loader.svelte.js'

    // you can use any state from anywhere for the locale
    let locale = get_locale();

    let { count }: Props = $props();
</script>

{#await loadLocale(locale)}
    <div class="container">
        ...
    </div>
{:then}
    <div class="container">
        <p>Current counts: <b>{$count} hi {$count}</b></p>
        <div>
            <button onclick={() => ($count -= 1)}>-</button>
            <button onclick={() => ($count += 1)}>+</button>
        </div>
    </div>
{/await}

<style>
    .container {
        min-width: 250px;
    }

    button {
        border-radius: 2px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
        background-color: #2ecc71;
        color: #ecf0f1;
        transition: background-color 0.3s;
        padding: 5px 10px;
        border: none;
    }

    button:hover,
    button:focus {
        background-color: #27ae60;
    }
</style>
