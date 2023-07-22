1. install firebase
```
npm install -g firebase-tools
```
2. login for auth
```
firebase login
```
3. init some configs
```
firebase init
```
firebase will ask some question in command prompt. answer following questions as below. especially "What do you want to use as your public directory? dist". The only diffecrent from attempt 1 which makes this attempt works.
 - Are you ready to proceed? Yes
 - Which Firebase features do you want to set up for this directory? Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
 - Please select an option? Use an existing project
 - Select a default Firebase project for this directory: test-for-firebase-845ca (test for firebase)
 - What do you want to use as your public directory? dist
 - Configure as a single-page app (rewrite all urls to /index.html)? Yes
 - Set up automatic builds and deploys with GitHub? No

In angular.json:
```json 
{
  "projects": {
    "deploy-firebase-attempt-2": {
        "architect": {
          "build": {
            "builder": "@angular-devkit/build-angular:browser",
            "options": {
              "outputPath": "dist", <--- must match to the answer above -->
            }
          }
        }
    }
  }
}
```
4. build
build the app
5. deploy
after deploy, the url will be generated faster than server is ready. so we need to wait in a short period of time to let the pages display your app rather than default firebase page.
```
firebase deploy
```
