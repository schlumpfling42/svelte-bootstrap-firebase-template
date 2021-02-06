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