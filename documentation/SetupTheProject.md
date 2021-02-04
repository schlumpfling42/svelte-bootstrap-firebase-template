# Set up the project
## Create a Svelte project
[Here are the setup steps](./SvelteInit.md)

![Initial project files](./InitialProjectFiles.png)

* [`package.json`](./01_InitialProjectFiles/package.json) This is the central configuration file for node and npm. It contains packages that are being used and run/build instructions. 
* [`package-lock.json`](./01_InitialProjectFiles/package-lock.json) Is a file maintained by npm that contains the concrete version of packages that are being used, do not change that file manually. 
* [`rollup.config.js`](./01_InitialProjectFiles/rollup.config.js) The configuration file for the Rollup compiler
* [`.gitignore`](./01_InitialProjectFiles/gitignore) Configuration file for git to define what files are excluded from version control
* `public` This folder contains the static files that client can load from the server.
  * [`index.html`](./01_InitialProjectFiles/public/index.html) The index file is the default file, that gets shown, when no specific page gets requested. This is the start point for your Single Page Application.
  * `favicon.ico` The default icon for the app.
* `src` The root folder for all source code files
  * `assets` Static resource files
  * [`main.js`](./01_InitialProjectFiles/src/main.js) Main Javascript file that initializes VueJS and defines what VueJS component will be inserted into the HTML page.
  * [`App.vue`](./01_InitialProjectFiles/src/App.vue) Defines the app component that is referred by `index.html`. This is the starting point for all you VueJS code.
  * `components` A folder containing VueJS components, there are no conventions how you structure your VueJS code, but it is recommended to have a suitable directory structure, so you easily find the code you are looking for.
  * [`HelloWorld.vue`](./01_InitialProjectFiles/src/components/HelloWorld.vue) Example Hello World component.

## Start up Visual Studio Code (or short VSCode)
Start Visual Studio Code. Once it's started click on File -> Open Folder and select the folder the project was created in.

## Start up the local server for the first time
Open a Terminal in VSCode and enter the following command `npm run serve`. The server will start on port 8080 on localhost, which is your computer. \
Open a browser and enter [`http://localhost:8080/`](http://localhost:8080/) in the address line and you will see the Hello World Vue app.