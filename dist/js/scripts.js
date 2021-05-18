"use strict";

(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }

        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function (r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }

      return n[i].exports;
    }

    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
      o(t[i]);
    }

    return o;
  }

  return r;
})()({
  1: [function (require, module, exports) {
    var _console = console,
        c = _console["log"];
    c("Hello World!");
    var message = "This is a really cool way of speeding up your development cycles!";
    c(message); // const camelCase = require("camelcase");
    // const testvar = 'Testing camelcase in javascript.';
    // c(camelCase(testvar));

    c('Welcome to the second script.');
    c('The rain in Spain stays mainly on the plain.');
  }, {}]
}, {}, [1]);
//# sourceMappingURL=scripts.js.map