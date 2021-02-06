# Add Routing
Routing allows users to click on links, or the app switch to a different "page" without actually going to a different page or loading a new page from the server. You have to define routes and then use links or a button press to route to a different component
## Install svelte-router
Open a Terminal in VSCode and run `npm install -D @spaceavocado/svelte-router`. This will install the package vue-router and add it to package.json.
Please got to the [svelte-router](https://awesomeopensource.com/project/spaceavocado/svelte-router) to have a look at the documentation, we will only use a couple of elements.
There needs to be a change in `rollup.config.js` - open the file and replace
```
  commonjs(),
```
with
```
  commonjs({
    "requireReturnsDefault": true
  }),
```
## Making it a Single Page App or short SPA
Update `package.json` to have this as the build section (only one parameter in `start` has been added):
```
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w",
    "start": "sirv public -s",
    "validate": "svelte-check"
  },
```
## Basic setting up
The router needs to be setup when your app starts and the best place to do that is [`App.svelte`](./03_AddRouting/src/App.svelte). 
This is how it is looking right now: 
```
<script lang="ts">
	import createRouter from '@spaceavocado/svelte-router';
	import RouterView from '@spaceavocado/svelte-router/component/view';
	import Navbar from "./components/NavigationBar.svelte";
	import Main from "./components/Main.svelte";
	import Page from './components/Page.svelte';
	// Create the routes
	createRouter({
  	routes: [
		{ 
			// This is the main/default/root route
			path: '/',
			name: 'Home',
			component: Main,
		},
		{
			// This is page1 one and uses the Page component, and passes a property into the component
			// This is to show that we can reuse and configure components. What is displayed on Page
			// is the content of the name property
			path: '/page1',
			name: 'Page1',
			component: Page,
			props: {
				name: "Page1"
			}
		},
		{ 
			// This is page1 one and uses the Page component, and passes a property into the component
			path: '/page2',
			name: 'Page2',
			component: Page,
			props: {
				name: "Page2"
			}
		},
	]
});
</script>
<svelte:head>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</svelte:head>
<main>
	<Navbar/>
	<!--Component to interpret the route base on the route configuration and display the correct element -->
	<RouterView/>
</main>

<style>
	main {
		text-align: center;
		margin: 0 auto;
	}
</style>
```
Two new components have been added, they are very simple.
[`Main.svelte`](./03_AddRouting/src/components/Main.svelte)
```
<script lang="ts">
  export let route;
</script>

<div>
  <h1>Main</h1>
</div>

<style>
</style>
```
[`Page.svelte`](./03_AddRouting/src/components/Page.svelte)
```
<script lang="ts">
  export let name;
  export let route;
</script>
<div>
  <h1>{name}</h1>
</div>

<style>
</style>
```
If the server is not running, run `npm run dev` to try it out. Change things around in the component, to see the effects.
When you are done run `npm run build` and `firebase deploy` to deploy the changes.