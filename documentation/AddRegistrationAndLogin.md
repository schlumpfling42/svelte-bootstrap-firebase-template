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
                <!-- on: defines an event handler: one:click={submit}  -->
                <Button variant="primary" on:click={()=>submit()} disabled={!canSubmit}>Register</Button>
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
In VSCode add a new file [`src/components/Login.vue`](../src/components/Login.vue). 
```
<template>
    <div class="page">
        <b-form class="form-signin" autocomplete="off">
            <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
            <b-row align-h="center">
                <b-col cols="6">
                    <b-form-group
                    id="label-username"
                    label="Email"
                    label-for="email"
                    label-align="left"
                    label-cols="3">
                    <b-form-input
                        id="email"
                        v-model="email"
                        type="text"
                        placeholder="Enter email"
                        required
                    />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row align-h="center">
                <b-col cols="6">
                    <b-form-group
                    id="label-password"
                    label="Password"
                    label-for="password"
                    label-align="left"
                    label-cols="3">
                    <b-form-input
                        id="password"
                        v-model="password"
                        type="password"
                        placeholder="Enter password"
                        required
                    />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row align-h="center">
                <b-col cols="6">
                    <div class="alert alert-danger" role="alert" v-if="error">
                        {{ error }}
                    </div>
                </b-col>
            </b-row>
            <b-row align-h="center">
                <b-col class="form-actions" cols="2" align-h="end">
                    <b-button variant="primary" @click="login" :disabled="email==''">Login</b-button>
                </b-col>
            </b-row>
            <b-row align-h="center">
                <b-col>
                    <router-link :to="'Register'">If you don't have an account yet please register</router-link>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>
    import {auth} from '../util/firebase';

    export default {
        props: {
            type: String
        },
        data() {
            return {
                email: "",
                password: "",
                error: null,
            };
        },
        created() {
            const self = this;
            auth.onAuthStateChanged(user => {
                if(user) {
                    if(self.$router.currentRoute.path != "/") {
                        self.$router.push("/");
                    }
                }
            });
        },
        methods: {
            login() {
                auth.signInWithEmailAndPassword(this.email, this.password)
                    .catch((err) => {
                        this.error = err;
                    })
            }
        }
    };
</script>

<style scoped>
    .page {
        margin-top:20%
    }
</style>
```
## Add Registration and Login to routes
The routes had to be reworked, we don't want to show the navigation header when we register a user or login. Vue allows nested routing. There will be 3 top level components. Regiter, Login and Main. Main will ake over the functionionality App had before. \
[`main.js`](../src/main.js) now looks like this: 
```
import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Router from 'vue-router';
import App from './App.vue';
import Main from './components/Main.vue';
import HelloWorld from './components/HelloWorld.vue';
import Page from './components/Page.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

// Install BootstrapVue plugin
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
// Install Router plugin
Vue.use(Router);

const router = new Router({
  mode: 'history',
  // Define 3 routes, each route has a name and a url. 
  // Changing the URL will lead the matching Compontent bein displayed
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          name: 'Home',
          path: '/',
          component: HelloWorld,
        },
        {
          name: 'Page1',
          path: '/Page1',
          component: Page,
          props: {
            title: "Page1"
          }
        },
        {
          name: 'Page2',
          path: '/page2',
          component: Page,
          props: {
            title: "Page2"
          }
        },
      ],
    },
    {
      name: 'Login',
      path: '/login',
      component: Login,
    },
    {
      name: 'Register',
      path: '/register',
      component: Register,
    },
  ]
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```
Here is the new [`App.vue`](../src/App.vue)
```
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {auth} from './util/firebase'

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
```
Here is the new [`Main.vue`](../src/components/Main.vue)
```
<template>
  <div v-if="authenticated">
    <NavigationBar />
    <!-- This is the element the route component will be displayed in -->
    <router-view></router-view>
  </div>
</template>

<script>
import NavigationBar from './NavigationBar';
import {auth} from '../util/firebase';

export default {
  name: 'App',
  components: {
    NavigationBar
  },
  data() {
    return {
      authenticated: false,
    }
  },
  created() {
    const self = this;
    auth.onAuthStateChanged(function(user) {
      if (!user) {
        self.authenticated = false;
        if(self.$router.currentRoute.path !== "/login") {
          self.$router.push("/login");
        }
      } else {
        self.authenticated = true;
      }
    });
  }
}
</script>
<style>
</style>

```
## Fire it up and test it out
If the server is not running, run `npm run serve` to try it out. Change things around in the compnent, to see the effects.
When you are done run `npm run build` and `firebase deploy` to deploy the changes.