# RealGimm Frontend

## Prerequisites

Node 20 is required in order to start working on the frontend project.
After installing it, make sure to enable corepack by running `corepack enable`. This is required in order to run yarn from the project folder.

To bootstrap the frontend project, first run `yarn install` from the frontend root folder.
Then you need to build the entire project, to make the common package available. To do so, run `yarn build` from the frontend root folder.
The codebase has a common package which is shared between frontoffice and web. There are two ways of working with it:

- running `yarn build` into the common package whenever a change is make to it
- running `yarn watch` into the common package to start an incremental build of it

First time a .ts/tsx file is opened, VSCode will ask you if you would like to load typescript from workspace.
Press agree in order to let typescript being resolved correctly from VSCode.

## GraphQL file rules

This project is based on GraphQL for performing backend requests. Inside the /graphql folder backend generates the schema files.
It's frontend developers responsibility to generate fragments/operations on their needs.
Inside the graphql folder we have two distinct sub folders for fragments and operations per package.
The naming convection rule to follow is the following:

- to create a fragment file, the filename must be `RealGimm.{PACKAGE_NAME}.{TYPE_NAME}.fragment.graphql`
  its mandatory here to use the type name instead of the fragment name since we could have multiple fragments for the same type
- to create an operation file, the filename must be `RealGimm.{PACKAGE_NAME}.${DOMAIN_NAME}.operation.graphql`
  here instead we need to have one file per domain, in order to group all queries/mutations against the same domain, like subject

## JSX folder structure rules

When creating a JSX element (doesn't matter if inside the components/contexts/pages folder)
always create a dedicated folder with the component name as folder name.
The folder must contain:

- a `{COMPONENT_NAME}.tsx` file which contains the component implementation,
- (optional) a `{COMPONENT_NAME}.types.ts` file which declare and exports all component related interfaces/types

## Translation key rules

All translation key must be in lowercase, singular form, snake case, with the only exception for the end path key which can be uppercase (like for enum) or plural.
When creating a translation key the following rules must be followed:

- if it's related to something generic, like enum or text, place it inside the `core.json` file
- if it's related only to a generic component, like table or menu, place it inside the `component.json` file
- if it's related to a feature, like subjects or org_units, place it under its own `{FEATURE}.json` file

## Available Scripts

In the project directory, you can run:

### `yarn build`

Builds the frontoffice/web packages for production into the specific package `build` folder.

### `yarn start:frontoffice`

Runs the frontoffice application in the development mode.

### `yarn start:web`

Runs the web application in the development mode.

### `yarn test`

Launches the test runner for all packages.

### `yarn codegen`

Runs codegen for all packages.

### `yarn lint`

Runs eslint for all packages.

### `yarn format`

Runs prettier for all packages.

### `yarn tsc`

Runs type checks for all packages.
