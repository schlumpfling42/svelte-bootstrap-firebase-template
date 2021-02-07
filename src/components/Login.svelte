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
