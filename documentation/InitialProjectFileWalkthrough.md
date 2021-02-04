# Walkthrough of the files generated when setting up the project
## [`package.json`](./01_InitialProjectFiles/package.json) 
```
{ 
```
 Basic properties
```
  "name": "svelte-bootstrap-firebase-app",
  "version": "1.0.0",
```
Run scripts you can use, e.g ``npm run dev`` will start the local server and run your project
```
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w",
    "start": "sirv public",
    "validate": "svelte-check"
  },
```
Software packages your project uses. The command `npm install <packagename>` when running will update this section.
```
  "dependencies": {
    "sirv-cli": "^1.0.0"
  }
```
Software packages your project uses for running or building a deployable version of your project
```
  "devDependencies": {
    "@rollup/plugin-commonjs": "^17.0.0",
    "@rollup/plugin-node-resolve": "^11.0.0",
    "rollup": "^2.3.4",
    "rollup-plugin-css-only": "^3.1.0",
    "rollup-plugin-livereload": "^2.0.0",
    "rollup-plugin-svelte": "^7.0.0",
    "rollup-plugin-terser": "^7.0.0",
    "svelte": "^3.0.0",
    "svelte-check": "^1.0.0",
    "svelte-preprocess": "^4.0.0",
    "@rollup/plugin-typescript": "^6.0.0",
    "typescript": "^3.9.3",
    "tslib": "^2.0.0",
    "@tsconfig/svelte": "^1.0.0"
  },
}
```
## [`public/index.html`](./01_InitialProjectFiles/public/index.html)
```
<!DOCTYPE html>
<html>
```
The HTML document has 2 major sections. \
Head contains meta information like charset, title.
It also contains links to css and javascript files.
```
  <head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width,initial-scale=1'>

    <title>Svelte app</title>

    <link rel='icon' type='image/png' href='/favicon.png'>
    <link rel='stylesheet' href='/global.css'>
    <link rel='stylesheet' href='/build/bundle.css'>

    <script defer src='/build/bundle.js'></script>
  </head>
```
Body contains the elements that are used to render the page. The body is empty Svelte will take care of adding elements dynamically, when it starts up.
```
  <body>
  </body>
</html>
```
## [`rollup.config.js`](./01_InitialProjectFiles/rollup.config.js)
```
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({ sourceMap: !production }),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
```
## [`tsconfig.json`](./01_InitialProjectFiles/tsconfig.json)
Configuration file for the typescript compiler, very basic, define the folders for the source code.
```
{
  "extends": "@tsconfig/svelte/tsconfig.json",

  "include": ["src/**/*"],
  "exclude": ["node_modules/*", "__sapper__/*", "public/*"]
}
```
## [`src\main.ts`](./01_InitialProjectFiles/src/main.ts)
The keyword `import` will let you use functions defined outside of this file. \
 `import App from './App.svelte'` will import the component `App`
```
import App from './App.svelte';
// create a new App component, set 'document.body' as the target for the App component. 
// 'document' is the HTML document defined in 'index.html' and 'body' is the empty 'body' element.
const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;
```
## [`src\App.svelte`](./01_InitialProjectFiles/src/App.svelte)
A vue file has 3 segments:
* script contains the Javascript code
* style contains the css code
* everthing else is the HTML code
```
// 'lang="ts"' defines that the scripting language is typescript
<script lang="ts">
  // The keyword `export` defines that we want to make the element available for other components to use. 
  // Here we just export a variable with the name 'name'. 
  // The variable 'name' gets its value in main.ts when the props are defined.
  export let name: string;
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
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