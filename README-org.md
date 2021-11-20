# Gulp v4 Frontend Workflow Template

## Version 1.0

This is the initial Gulp workflow based on the Gulp for Beginners course run by [Coder Coder](https://coder-coder.com/).

This project uses node.js, gulp-cli, gulp, and a series of other gulp and node modules, see package.json for a full list.

This workflow, while currently working is also a work in progress, and I will be making changes to the process.

To Run a development cycle:

``` javascript
gulp
```

or

``` javascript
npm run dev
```

To run a production cycle:

``` javascript
gulp prod
```

or

``` javascript
npm run build
```

## Main Differences between Dev and Prod

Dev compiles SCSS to CSS but does not minify the output. A prod build will minify the CSS file.
