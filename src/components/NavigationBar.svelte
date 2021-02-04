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