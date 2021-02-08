# Registration and Login
This is going to be a big section that I don't want to break apart, so bear with me.
## Add Registration
In VSCode add a new file [`src/components/Register.svelte`](../src/components/Register.svelte). The template section has a bootsrap form and input elements for name, email and password. Have a look at the [Sveltestrap](https://github.com/bestguy/sveltestrap) documentation for details.
```
<script>
    import {auth} from '../util/firebase';
    import {
        Button,
        Col,
        FormGroup,
        Input,
        Label,
        Row
    } from 'sveltestrap';
    import RouterLink from '@spaceavocado/svelte-router/component/link';
    import {router} from '@spaceavocado/svelte-router';

    export let route;
    let name;
    let email;
    let password;
    let passwordVerify;
    let error = "";

    // Check if password and passwordVerify match
    function checkPassword() {
        if(!password || password === "") {
            return false;
        } else if(password !== passwordVerify) {
            error = "Passwords don't match";
            return false;
        } else {
            error = null;
            return true;
        }
    }
    
    // Create the user in firebase and route to the home page if successful
    function submit() {
        auth.createUserWithEmailAndPassword(email, password).then(data => {
                data.user.updateProfile({
                    displayName: name
                }).then(() => {
                    $router.push({name: 'Home'});
                })
            })
            .catch(err => {
                console.log(err);
                error = err.message;
            });
            return false;
        };

    // $: is a special key word of Svelte it creates a dependent variable.
    // This line will call checkPassword, whenever password or passwordVerify change and set the result in canSubmit
    $: canSubmit = checkPassword(password, passwordVerify);

    </script>

<div class="page">
    <div class="form-rgister" autocomplete="off">
        <h1 class="h3 mb-3 font-weight-normal">Please register yourself as a user</h1>
        <Row align-h="center">
            <Col xs={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
                <FormGroup>
                    <Label
                    id="label-name"
                    label-for="name">Name</Label>
                    <Input
                    id="name"
                    bind:value={name}
                    type="text"
                    placeholder="Enter your name"
                    required
                    />
                </FormGroup>
            </Col>
            <Col xs={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
                <FormGroup>
                    <Label
                    id="label-email"
                    label-for="email">Email</Label>
                    <Input
                    id="email"
                    type="text"
                        <!-- bind:value will bind the attribute value of the input to the variable email
                             This means whenever the value changes the variable email will be update and vice versa
                        -->
                        bind:value={email}
                        placeholder="Enter your email"
                        required
                        />
                    </FormGroup>
                </Col>
                <Col xs={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
                    <FormGroup>
                        <Label
                        id="label-password"
                        label-for="password">Password</Label>
                        <Input
                        id="password"
                        type="password"
                        bind:value={password}
                        placeholder="Enter password"
                        required
                        />
                    </FormGroup>
            </Col>
            <Col xs={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
                <FormGroup>
                    <Label
                    id="label-password-verify"
                    label-for="passwordVerify">Verify password</Label>
                    <Input
                    id="passwordVerify"
                        bind:value={passwordVerify}
                        type="password"
                        placeholder="Enter password verification"
                        required
                    />
                </FormGroup>
            </Col>
            {#if error}
            <Col xs={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
                <div class="alert alert-danger" role="alert" v-if="error">
                    <!-- Output the content of the variable error -->
                    { error }
                </div>
            </Col>
            {/if}
            <Col xs={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
                <!-- on: defines an event handler: one:click={submit} - call the function submit when the user clicks the button -->
                <Button variant="primary" on:click={submit} disabled={!canSubmit}>Register</Button>
            </Col>
            <Col xs={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
                <RouterLink to={{name: 'Login'}}>If you already have an account yet please log in</RouterLink>
            </Col>
        </Row>
    </div>
</div>

<style scoped>
    div.page {
        margin-top: 20vh
    }
</style>
```
## Add Login
In VSCode add a new file [`src/components/Login.svelte`](../src/components/Login.svelte). 
```
<script>
    import {
        Button,
        Col,
        FormGroup,
        Input,
        Label,
        Row
    } from 'sveltestrap';
    import RouterLink from '@spaceavocado/svelte-router/component/link';
    import {router} from '@spaceavocado/svelte-router';
    import {auth} from '../util/firebase';

    export let route;
    let email;
    let password;
    let error;
    const self = this;

    if(auth.currentUser) {
        $router.push({name: "Home"});
    }

    function login() {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => $router.push({name: "Home"}))
            .catch((err) => {
                error = err;
            });
    }

</script>
<div class="page">
    <div>
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <Row align-h="center" cols={1}>
            <Col xs={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
                <FormGroup>
                    <Label 
                        id="label-username"
                        label-for="email">Email</Label>
                    <Input
                        id="email"
                        bind:value={email}
                        type="text"
                        placeholder="Enter email"
                        required
                    />
                </FormGroup>
            </Col>
            <Col xs={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
                <FormGroup>
                    <Label
                        id="label-password"
                        label-for="password">Password</Label>
                    <Input
                        id="password"
                        bind:value={password}
                        type="password"
                        placeholder="Enter password"
                        required
                    />
                </FormGroup>
            </Col>
            {#if error}
            <Col xs={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
                <div class="alert alert-danger" role="alert">
                    { error }
                </div>
            </Col>
            {/if}
            <Col xs={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
                <Button variant="primary" on:click={login} disabled={email==''}>Login</Button>
            </Col>
        </Row>
        <Row align-h="center">
            <Col>
                <RouterLink to={{name: 'Register'}}>If you don't have an account yet please register</RouterLink>
            </Col>
        </Row>
    </div>
</div>
<style scoped>
    div.page {
        margin-top: 20vh;
    }
    label {
        text-align: start;
    }
</style>
```
## Add Registration and Login to routes
The routes had to be reworked, we don't want to show the navigation header when we register a user or login. Vue allows nested routing. There will be 3 top level components. Regiter, Login and Main. Main will ake over the functionionality App had before. \
[`App.svelte`](../src/App.svelte) now looks like this: 
```
<script lang="ts">
	import createRouter from '@spaceavocado/svelte-router';
	import RouterView from '@spaceavocado/svelte-router/component/view';
	import Login from "./components/Login.svelte";
	import Register from "./components/Register.svelte";
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
				children:[
					{ 
						// This is the main/default/root route
						path: '/',
						name: 'Home',
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
			},
			{ 
				path: '/login',
				name: 'Login',
				component: Login,
			},
			{ 
				path: '/register',
				name: 'Register',
				component: Register,
			}
		]
	});

</script>
<svelte:head>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</svelte:head>
<main>
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
Svelte has a built in way to communicate between components, you can find more detailed information here: [Svelte Store](https://svelte.dev/docs#svelte_store). We use a readonly store entry here. Readonly means it can only be changed where it's defined. Readers can subscribe to receive notifications about updates.
Here is the new [`./util/firebase.ts`](../src/util/firebase.ts)
```
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { readable } from 'svelte/store';


// Insert the code block starting with `const firebaseConfig = { ...` from the Firebase console.

// Initialize 
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebaseApp.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// Create a readonly store for the logged in user.
export const loggedInUser = readable(null, (set) => {
	auth.onAuthStateChanged(user => {
        // Making it and object to distinguish between not initialized yet
        // and not logged in
        set({user: user});
    });
});
```
Here is the new [`Main.svelte`](../src/components/Main.svelte)
```
<script lang="ts">
  import { onDestroy } from 'svelte';
  import Navbar from "./NavigationBar.svelte";
  import RouterView from '@spaceavocado/svelte-router/component/view';
  import { router } from '@spaceavocado/svelte-router';
  import { loggedInUser } from "../util/firebase";

  export let route;
  let loggedIn = false;
    // Subscribe to the logged in user store
	onDestroy(loggedInUser.subscribe(user => {
    if(user != null) {
      if(user.user == null) {
        // if the user is null, redirect to the loging page
        loggedIn = false;
        $router.push({name: "Login"});
      } else if(user.user != null) {
        loggedIn = true;
      }
    }
  }));
</script>
<div>
  {#if loggedIn}
  <Navbar/>
  <RouterView/>
  {/if}
</div>
<style>
</style>
```
## NavigationBar componet to show user and have logouot
```
<script lang="ts">
  import {
    Navbar,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavLink
  } from 'sveltestrap';
  import RouterLink from '@spaceavocado/svelte-router/component/link';
  import { auth, loggedInUser } from '../util/firebase';

  let user;

  loggedInUser.subscribe(aUser => {
    if(aUser != null) {
      user = aUser.user;
    }
  });

  function signOut() {
    auth.signOut();
  }
</script>

<Navbar color="info" light expand="md">
  <NavbarBrand><RouterLink to={{name: 'Home'}}>Svelte Bootstrap Firebase</RouterLink></NavbarBrand>
  <Nav nav inNavbar class="ml-left">
    <NavLink><RouterLink to={{name: 'Page1'}}>Page1</RouterLink></NavLink>
    <NavLink><RouterLink to={{name: 'Page2'}}>Page2</RouterLink></NavLink>
  </Nav>
  <Nav class="ml-auto" navbar>
      <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>{user?.displayName}</DropdownToggle>
      <DropdownMenu right>
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem divider />
        <DropdownItem on:click={signOut}>Signout</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
    </Nav>
</Navbar>

<style>
</style>
```
## Fire it up and test it out
If the server is not running, run `npm run dev` to try it out. Change things around in the compnent, to see the effects.
When you are done run `npm run build` and `firebase deploy` to deploy the changes.