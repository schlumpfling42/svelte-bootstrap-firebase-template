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
    
    function submit() {
        auth.createUserWithEmailAndPassword(email, password).then(data => {
                data.user.updateProfile({
                    displayName: name
                }).then(() => {
                    console.log("push:" + data);
                    $router.push({name: 'Home'});
                })
            })
            .catch(err => {
                console.log(err);
                error = err.message;
            });
            return false;
        };

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
                    { error }
                </div>
            </Col>
            {/if}
            <Col xs={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
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