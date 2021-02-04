# Set up Firebase
## Create a Project
Got to https://console.firebase.google.com/ and click on Add Project. \
Give your app a name and click Continue. On the Analytics page disable Google Analytics and click Create Project, then click continue. \
On the left side click on Authentication then Get Started, click on Email/Password, enable it and click Save. \
On the left side click on Cloud Firestore then Created Database, then select Start in test mode. Test mode will allow your app full access to the data for 30, then you need to change the access rules. Then click Next. Now you can select the region the data is stored in, if you are unsure, just leave the default and click on Enable. \
On the left side click on the gear next to Project Overview and then on Project Settings. There will be a Your Apps section at the bottom of the page, click on the Icon that looks like `</>`. On the new screen you need to fill in the app name, check Also set up Firbase hosting and click on Register. You can ingore the other options, we will get to that later. \
Your Firestore Project is ready to be used. There are things that need to be fine tuned, but that can wait.
