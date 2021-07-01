# App Generator
Generates apps (Express, React) from template and/or documentation. Vue on WIP

# Table Of Contents

- [Installation](#installation)
- [Usage](#usage)
  * [Generator starts ask questions from you.](#generator-starts-ask-questions-from-you)
    + [If selected Express](#if-selected-express)
    + [If selected NestJS](#if-selected-nestjs)
    + [If selected React](#if-selected-react)

## Installation
```shell
npm i -g @mdreal/app-generator
// or
yarn global add @mdreal/app-generator
```

## Usage

```shell
app-generator [destination]
// generator [destination]
```
And
### Generator starts ask questions from you.
`Which technology you want use?`
- Express
- React
- Vue

#### If selected Express
`Which Framework do you want use?`
- Express (Pure with express-generator)
- NestJS

`Which Engine do you want to use MVC Model?`
- NoView
- EJS
- HBS
- HJS
- Jade
- Twig
- Vash
- Hogan
- Pug

`Which CSS Preprocessor do you want to use?`
- Plain
- Less
- Stylus
- Compass
- Sass

#### If selected NestJS
`Do you want use TypeScript?`
- Yes
- No

#### If selected React
`Which bundler you want use?`
- Webpack
- ViteJS

`Do you want SSR App?`
- Yes
- No

`Do you want use TypeScript?`
- Yes
- No
