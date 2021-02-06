# Deploy to Firebase
## Install Firebase package
Open a Terminal in VSCode and run `firebase init hosting`. 
The first time you use firebase it will ask you to `firebase login`.
When you run that, answer the collect cli usage question with `n`.
Then it will open a browser window to give the Firebase CLI access to your Google account. Click on `Allow`. You should be all set. Rerun `firebase init hosting`.
Follow the instructions on the display
- Select your project
- Answer `What do you want to use as your public directory?` with `public`
- Answer `Configure as a single-page app (rewrite all urls to /index.html)` with `y`
- Answer `Set up automatic builds and deploys with GitHub?`with `n`
- Anwser `File public/index.html already exists. Overwrite?` with `n`

You should be all set now. \
Run `npm run build` to create the build to deploy. \
Run `firebase deploy` to deploy. \
The output will tell you the URL you can use to test the deployment.