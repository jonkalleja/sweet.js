import { parse, expand } from "../src/sweet";
import expect from "expect.js";
import { expr, stmt, testParse } from "./assertions";
import test from 'ava';


test("should handle a function declaration", t => {
  return testParse("function id(x) { }", stmt, {
    "type": "FunctionDeclaration",
    "loc": null,
    "name": {
      "type": "BindingIdentifier",
      "loc": null,
      "name": "<<hygiene>>"
    },
    "isGenerator": false,
    "params": {
      "type": "FormalParameters",
      "loc": null,
      "rest": null,
      "items": [{
        "type": "BindingIdentifier",
        "loc": null,
        "name": "<<hygiene>>"
      }]
    },
    "body": {
      "type": "FunctionBody",
      "loc": null,
      "directives": [],
      "statements": []
    }
  });
});

test("should handle a function declaration with rest parameters", t => {
  return testParse("function id(x, ...rest) { }", stmt, {
    "type": "FunctionDeclaration",
    "loc": null,
    "name": {
      "type": "BindingIdentifier",
      "loc": null,
      "name": "<<hygiene>>"
    },
    "isGenerator": false,
    "params": {
      "type": "FormalParameters",
      "loc": null,
      "rest": {
        "type": "BindingIdentifier",
        "name": "<<hygiene>>"
      },
      "items": [{
        "type": "BindingIdentifier",
        "loc": null,
        "name": "<<hygiene>>"
      }]
    },
    "body": {
      "type": "FunctionBody",
      "loc": null,
      "directives": [],
      "statements": []
    }
  });
});

test("should handle a generator function declaration", t => {
  return testParse("function * id(x) {}", stmt, {
    "type": "FunctionDeclaration",
    "loc": null,
    "name": {
      "type": "BindingIdentifier",
      "loc": null,
      "name": "<<hygiene>>"
    },
    "isGenerator": true,
    "params": {
      "type": "FormalParameters",
      "loc": null,
      "rest": null,
      "items": [{
        "type": "BindingIdentifier",
        "loc": null,
        "name": "<<hygiene>>"
      }]
    },
    "body": {
      "type": "FunctionBody",
      "loc": null,
      "directives": [],
      "statements": []
    }
  });
});

test("should throw an error for a bad return statement", t => {
  expect(() => parse("function foo() { return return }")).to.throwError();
});


test("should thrown an error for a bad var decl", t => {
  expect(() => parse("var 42")).to.throwError();
});

test("should handle a var declaration", t => {
  return testParse("var x", stmt, {
    "type": "VariableDeclarationStatement",
    "declaration": {
      "type": "VariableDeclaration",
      "loc": null,
      "kind": "var",
      "declarators": [{
        "type": "VariableDeclarator",
        "loc": null,
        "binding": {
          "loc": null,
          "type": "BindingIdentifier",
          "name": "<<hygiene>>"
        },
        "init": null
      }]
    }
  });

  return testParse("var x = 42", stmt, {
    "type": "VariableDeclarationStatement",
    "declaration": {
      "type": "VariableDeclaration",
      "loc": null,
      "kind": "var",
      "declarators": [{
        "type": "VariableDeclarator",
        "loc": null,
        "binding": {
          "loc": null,
          "type": "BindingIdentifier",
          "name": "<<hygiene>>"
        },
        "init": {
          "loc": null,
          "type": "LiteralNumericExpression",
          "value": 42
        }
      }]
    }
  });

  return testParse("var x = 42, y = 42 + 24", stmt, {
    "type": "VariableDeclarationStatement",
    "declaration": {
      "type": "VariableDeclaration",
      "loc": null,
      "kind": "var",
      "declarators": [{
        "type": "VariableDeclarator",
        "loc": null,
        "binding": {
          "loc": null,
          "type": "BindingIdentifier",
          "name": "<<hygiene>>"
        },
        "init": {
          "loc": null,
          "type": "LiteralNumericExpression",
          "value": 42
        }
      }, {
        "type": "VariableDeclarator",
        "loc": null,
        "binding": {
          "loc": null,
          "type": "BindingIdentifier",
          "name": "<<hygiene>>"
        },
        "init": {
          "loc": null,
          "type": "BinaryExpression",
          "left": {
            "loc": null,
            "type": "LiteralNumericExpression",
            "value": 42
          },
          "operator": "+",
          "right": {
            "loc": null,
            "type": "LiteralNumericExpression",
            "value": 24
          }
        }
      }]
    }
  });

  return testParse("let x = 42, y = 42 + 24", stmt, {
    "type": "VariableDeclarationStatement",
    "declaration": {
      "type": "VariableDeclaration",
      "loc": null,
      "kind": "let",
      "declarators": [{
        "type": "VariableDeclarator",
        "loc": null,
        "binding": {
          "loc": null,
          "type": "BindingIdentifier",
          "name": "<<hygiene>>"
        },
        "init": {
          "loc": null,
          "type": "LiteralNumericExpression",
          "value": 42
        }
      }, {
        "type": "VariableDeclarator",
        "loc": null,
        "binding": {
          "loc": null,
          "type": "BindingIdentifier",
          "name": "<<hygiene>>"
        },
        "init": {
          "loc": null,
          "type": "BinaryExpression",
          "left": {
            "loc": null,
            "type": "LiteralNumericExpression",
            "value": 42
          },
          "operator": "+",
          "right": {
            "loc": null,
            "type": "LiteralNumericExpression",
            "value": 24
          }
        }
      }]
    }
  });

  return testParse("const x = 42, y = 42 + 24", stmt, {
    "type": "VariableDeclarationStatement",
    "declaration": {
      "type": "VariableDeclaration",
      "loc": null,
      "kind": "const",
      "declarators": [{
        "type": "VariableDeclarator",
        "loc": null,
        "binding": {
          "loc": null,
          "type": "BindingIdentifier",
          "name": "<<hygiene>>"
        },
        "init": {
          "loc": null,
          "type": "LiteralNumericExpression",
          "value": 42
        }
      }, {
        "type": "VariableDeclarator",
        "loc": null,
        "binding": {
          "loc": null,
          "type": "BindingIdentifier",
          "name": "<<hygiene>>"
        },
        "init": {
          "loc": null,
          "type": "BinaryExpression",
          "left": {
            "loc": null,
            "type": "LiteralNumericExpression",
            "value": 42
          },
          "operator": "+",
          "right": {
            "loc": null,
            "type": "LiteralNumericExpression",
            "value": 24
          }
        }
      }]
    }
  });

});

test("should throw an error for a bad variable decl expression", t => {
  expect(() => parse("var x = var")).to.throwError();
});


test("should parse an empty class", () => {
  return testParse("class F {}", stmt, {
    "type": "ClassDeclaration",
    "loc": null,
    "name": {
      "loc": null,
      "type": "BindingIdentifier",
      "name": "<<hygiene>>"
    },
    "super": null,
    "elements": []
  });
});

test('should parse a simple assignment', () => {
  return testParse("x = 42", stmt, {
    type: 'ExpressionStatement',
    loc: null,
    expression: {
      type: 'AssignmentExpression',
      loc: null,
      binding: {
        type: 'BindingIdentifier',
        loc: null,
        name: 'x'
      },
      expression: {
        type: 'LiteralNumericExpression',
        loc: null,
        value: 42
      }
    }
  });
});
