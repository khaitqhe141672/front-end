
# How to set up new project Angular


## Installation Node JS version

Install node js with nvm

```bash
  nvm install [version]
```
Change version Node JS
```bash
  nvm use [version]
```
:exclamation: version : 14.17.3

## Installation Anglar cli specific version (use version 12)
```bash
  npm install -g @angular/cli@12
```


## Install :exclamation:

Create new project:
 ```bash 
 ng new [project-name] --no-strict
 ```

Create folder have all html,css,ts file:
 ```bash 
ng g c + [fileName]
 ```
 
 Create new directive file:
 ```bash 
 ng g d [fileName]
 ```
 
 - Skip test file (❗ add before create new compoent)

```bash
 "schematics": {
        "@schematics/angular:component": {
          "style": "css",
          "skipTests": true
        },
        "@schematics/angular:class": {
          "skipTests": true
        },
        "@schematics/angular:directive": {
          "skipTests": true
        },
        "@schematics/angular:guard": {
          "skipTests": true
        },
        "@schematics/angular:module": {
          "skipTests": true
        },
        "@schematics/angular:pipe": {
          "skipTests": true
        },
        "@schematics/angular:service": {
          "skipTests": true
        }
     }
```

Add Bootstrap
 ```bash
 npm install --save bootstrap@5.2.1
 ```
- Go to `angular.json`  -> Edit `styles` to add 
```bash
 "node_modules/bootstrap/dist/css/bootstrap.min.css"
```
- Go to `style.css`  -> add 
```bash
 @import "~bootstrap/dist/css/bootstrap.css";
```
Install RxJS
```bash
npm install --save rxjs@6
```
```bash
npm install --save rxjs-compat
```
More
- [Complete guide](https://www.udemy.com/the-complete-guide-to-angular-2/learn/v4/t/lecture/6655614/)
- [Help problem](https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/17862130#questions/10444944)

## Start project :exclamation:
- `ng serve`


