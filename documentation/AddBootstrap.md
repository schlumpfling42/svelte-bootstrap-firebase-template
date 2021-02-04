# Add Bootstrap
## Install bootstrap
Open a Terminal in VSCode and run `npm install sveltestrap`. This will install the package sveltestrap and add it to package.json.
Please got to the [Sveltestrap](https://github.com/bestguy/sveltestrap) to have a look at the documentation, we will only use a couple of elements.
## Basic setting up
Sveltestrap needs to be setup when your app starts and the best place to do that is [src/App.svelte](./02_AddBootstrap/src/App.svelte)
## Adding a bootstrap Navigation Bar
We are going to create components that only serve one purpose and try not to overload things. So the navigation bar will be its own  component. \
Create a new file [`/src/components/NavigationBar.svelte`](./02_AddBootstrap/src/components/NavigationBar.svelte) with the following content:
```
<script lang="ts">
    import {
    Navbar,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from 'sveltestrap';
</script>

<Navbar color="info" light expand="md">
  <NavbarBrand href="/">Svelte Bootstrap Firebase</NavbarBrand>
  <Nav class="ml-auto" navbar>
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>User</DropdownToggle>
      <DropdownMenu right>
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Signout</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  </Nav>
</Navbar>

<style>
</style>
```
We have defined the component, but it's not used anywhere. We need to add it to [`src/App.svelte`](./02_AddingBootstrap/src/App.svelete). Here is how it would look like:
```
<script lang="ts">
./components/NavigationBar.svelte/script>
```
Import boostrap css
```
<svelte:head>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</svelte:head>
<main>
  <Navbar/>
  <h1>Hello {name}!</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
main {
  text-align: center;
  max-width: 240px;
  margin: 0 auto;
}

h1 {
  color: #ff3e00;
  text-transform: uppercase;
  font-size: 4em;
  font-weight: 100;
}

@media (min-width: 640px) {
  main {
    max-width: none;
  }
}
</style>
```
If the server is not running, run `npm run serve` to try it out. Change things around in the compnent, to see the effects.
When you are done run `npm run build` and `firebase deploy` to deploy the changes.