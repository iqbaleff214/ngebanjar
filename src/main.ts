import { mount } from 'svelte';
import './asset/style.css';
import App from './Ngebanjar.svelte';

// @ts-ignore
const app = mount(App, {
  target: document.getElementById('app'),
})

export default app
