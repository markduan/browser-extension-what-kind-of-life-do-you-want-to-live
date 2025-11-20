import { mount } from 'svelte';
import App from './app.svelte';

const root = document.getElementById('root');

mount(App, { target: root });
