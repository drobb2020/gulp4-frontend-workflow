const { ["log"]: c } = console;

c("hello world");

const message = "This is a really cool way of speeding up your development cycles!"

c(message);

const camelCase = require("camelcase");
const testvar = 'Testing camelcase in javascript.';

c(camelCase(testvar));
