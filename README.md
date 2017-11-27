# NodeJS starter kit for ACIT

For the full list of automation scripts available in this project, please refer to "scripts"
section in the [`package.json`](./package.json) file and the [`tools`](./tools) folder.

## This project was forked and based on Kriasoft's [NodeJS API Starter Project](https://github.com/kriasoft/nodejs-api-starter)

## Technology Stack

* Web Framework: [Express](https://expressjs.com/)
* Node Transpiler: [Babel](https://babeljs.io/)
* Type-checking: [Flow](https://flow.org/)
* Code Linting: [ESLint](https://eslint.org/)
* Code Formatter: [Prettier](https://github.com/prettier/prettier)
* Logger: [Winston](https://github.com/winstonjs/winston)
* Error Formatting: [Pretty Error](https://github.com/AriaMinaei/pretty-error)

## Prerequisites 

1) Node 8.9.1 or above [Download here](https://nodejs.org/en/download/)
2) npm 5.5.1 or above (comes with Node install)
3) Highly recommended: [Visual Studio Code](https://code.visualstudio.com/) Extensions: EditorConfig, ESLint, Flow and Prettier.

## Getting started
Clone this project and host the code either on Github or IBM's Git repository

To get started, install dependecies.

`npm install` 

To build the project and launch a development server with hot reload.

`npm run dev`

The NodeJS server will be listening on https://localhost:3000

## Testing

```bash
npm lint                       # Find problematic patterns in code
npm check                      # Check source code for type errors
npm run test                   # Runs Jest on the project
```

With Visual Studio Code's debugger you can also launch Jest in debug mode with the included configuration.

For more information visit http://facebook.github.io/jest/

## Debugging

In order to run the app with V8 inspector enabled, simply run the server in debug mode `npm run debug` and use Visual Studio Code's debugger to attach to the running process.

## Deploying to IBM cloud

The best way to deploy the project is to build a DevOps toolchain with the ['Build your own toolchain' template](https://console.bluemix.net/devops/create). Add the Repo tool to your toolchain so that it knows where you code is stored and add a 'Delivery Pipeline' integration tool.

#### Delivery Pipeline
When working with Devliery Pipeline, it's always best practice to have 2 versions of your app. 

1) A development deploy where the latest changes are introduced for testing. This 'staging' deploy is used mainly for developers and project managers for testing and feedback purposes.

2) A production deploy where the stable application is hosted. This deploy will have tested features and is to be considered stable and ready to show to the client for feedback. 

Each deploy will come in 3 stages: Build, Test and Deploy. For more information on the scripts needed for each stage, see the [deploy](./deploy) folder. 

1) Build. It installs the needed dependencies and builds the project. 

2) Test. It runs Jest and performs all unit, integration and smoke tests.

3) Deploy. Deploys app to IBM Cloud.

## Reference Articles and Tutorials

*[Working with Delivery Pipelines](https://console.bluemix.net/docs/services/ContinuousDelivery/pipeline_working.html#pipeline-working)
* [Stop using JWT for sesstions](http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/)
  ([part 2](http://cryto.net/~joepie91/blog/2016/06/19/stop-using-jwt-for-sessions-part-2-why-your-solution-doesnt-work/))
  by [Sven Slootweg](https://github.com/joepie91)
* [How to Safely Store Your Users' Passwords](https://paragonie.com/blog/2016/02/how-safely-store-password-in-2016) by [P.I.E.](https://paragonie.com/)

