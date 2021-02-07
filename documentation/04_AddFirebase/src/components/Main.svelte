<script lang="ts">
  import { onDestroy } from 'svelte';
  import Navbar from "./NavigationBar.svelte";
  import RouterView from '@spaceavocado/svelte-router/component/view';
  import { router } from '@spaceavocado/svelte-router';
  import { loggedInUser } from "../util/firebase";

  export let route;
  let loggedIn = false;
	onDestroy(loggedInUser.subscribe(user => {
    if(user != null) {
      if(user.user == null) {
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