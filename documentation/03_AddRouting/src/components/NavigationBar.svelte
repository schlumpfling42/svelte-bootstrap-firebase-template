<script lang="ts">
  import {
  Navbar,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
NavLink
} from 'sveltestrap';
import RouterLink from '@spaceavocado/svelte-router/component/link';
</script>

<Navbar color="info" light expand="md">
  <NavbarBrand><RouterLink to={{name: 'Home'}}>Svelte Bootstrap Firebase</RouterLink></NavbarBrand>
  <Nav nav inNavbar class="ml-left">
    <NavLink><RouterLink to={{name: 'Page1'}}>Page1</RouterLink></NavLink>
    <NavLink><RouterLink to={{name: 'Page2'}}>Page2</RouterLink></NavLink>
  </Nav>
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