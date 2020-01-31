# Dictionary Management

## How to start the app

1. Clone or Download
2. yarn install 
3. yarn start

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## URL

https://dictionary-management.herokuapp.com/

http://dictionary-management.herokuapp.com/ 


## Main Technologies:

- Language: JavaScript

- Style: styled-components

- Build tool: create-react-app

- Dependency management: yarn

- Deploy: Heroku

- Main libraries: 
    - react
    - dexie (to use indexeddb - local storage)

## Dependencies

Apache License v2.0: 

    "dexie": "^2.0.4" 

MIT License: 

    {
        "prop-types": "^15.7.2",
        "react": "^16.12.0",
        "react-dom": "^16.12.0",
        "react-icons": "^3.8.0",
        "react-router-dom": "^5.1.2",
        "react-scripts": "3.3.0",
        "styled-components": "^5.0.0"
    }

## Package Diagram

![dic_mgmt_package_diagram_v1 1 2](https://user-images.githubusercontent.com/49291474/73501330-d20e6b00-43c5-11ea-9240-b2b0a2a5d0e2.png)

## Database Model

![dic_mgmt_db_model](https://user-images.githubusercontent.com/49291474/73145517-543d1d80-40ae-11ea-84e6-b330effec311.png)

To achieve simpler code, one table for dictionary list, one table for all records from all dictionaries.

## Demo 

### Dictionaries Overview ('/')

- Create, Delete, View & Edit Dictionary

![overview](https://user-images.githubusercontent.com/49291474/73489196-84d0d000-43aa-11ea-82fb-0b1a1f479871.gif)

### Dictionary Records (domain, range) Manipulation ('/edit/[dictionary_title]')

#### Create, Read

- Desired Dataset

![desired](https://user-images.githubusercontent.com/49291474/73489169-7aaed180-43aa-11ea-87fc-615dbb2c44be.gif)

- Duplicates:

![duplicates](https://user-images.githubusercontent.com/49291474/73489332-b9dd2280-43aa-11ea-81d2-d70c4105e846.gif)

- Forks:

![forks](https://user-images.githubusercontent.com/49291474/73489347-bd70a980-43aa-11ea-8b4f-48d94b69f8ba.gif)

- Cycles:

![cycles](https://user-images.githubusercontent.com/49291474/73499749-3bd84600-43c1-11ea-8d25-5e0986e1e838.gif)

- Chains:

![chains](https://user-images.githubusercontent.com/49291474/73499748-3b3faf80-43c1-11ea-8d97-75142834b21b.gif)

#### Delete

![delete](https://user-images.githubusercontent.com/49291474/73499785-54e0f700-43c1-11ea-83b0-961d176b889d.gif)

#### Update

![update](https://user-images.githubusercontent.com/49291474/73499789-56aaba80-43c1-11ea-9c9b-61d2c2589d52.gif)
