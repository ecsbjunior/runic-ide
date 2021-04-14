// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

(function (mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function (CodeMirror) {
  "use strict";

  CodeMirror.defineMode('runic', () => {
    const isKeyword = {
      'bool': true, 'int': true, 'float': true, 'char': true, 'string': true,
      'for': true, 'while': true, 'if': true,
      'return': true
    };

    const isAtom = {
      'true': true, 'false': true,
    };

    const isIO = {
      'print': true,
      'scan': true,
    };

    const isString = /['"`]/;
    const isOperator = /[+\/%*=<>!\^|&\-]/;
    const isBrackets = /[(){}\[\]]/;

    function tokenFunction(stream, state) {
      return 'function';
    }

    function tokenReturnType(stream, state) {
      return 'return-type';
    }

    function tokenString(stream, state) {
      let character;

      while(character = stream.next()) {
        if(/'|"|`/.test(character)) {
          state.tokenizer = tokenizer;
          break;
        }
      }

      return 'string';
    }

    function tokenNumber(stream, state) {
      return 'number';
    }

    function tokenMultilineComment(stream, state) {
      let character;
      
      while(character = stream.next()) {
        if(character === '*' && stream.eat('/')) {
          state.tokenizer = tokenizer;
          break;
        }
      }

      return 'comment';
    }
  
    function tokenLineComment(stream, state) {
      stream.skipToEnd();
      return 'comment';
    }

    function tokenOperator(stream, state) {
      return 'operator';
    }

    function tokenKeyword(stream, state) {
      return 'keyword';
    }

    function tokenAtom(stream, state) {
      return 'atom'
    }

    function tokenIO(stream, state) {
      return 'io';
    }

    function tokenId(stream, state) {
      if(state.previousToken === 'function')
        return 'function-id';
      return 'id';
    }

    function tokenizer(stream, state) {
      const character = stream.next();
      
      //token function
      if(character === 'f') {
        if(stream.eat('n') && stream.eatSpace()) {
          return tokenFunction(stream, state);
        }
      }

      //token return type
      if(character === '-') {
        if(stream.eat('>') && stream.eatSpace()) {
          return tokenReturnType(stream, state);
        }
      }

      //token string
      if(isString.test(character)) {
        state.tokenizer = tokenString;
        return tokenString(stream, state);
      }

      //token number
      if(/\d/.test(character)) {
        return tokenNumber(stream, state);
      }

      //token comment
      if(character === '/') {
        if(stream.eat('*')) {
          state.tokenizer = tokenMultilineComment;
          return tokenMultilineComment(stream, state);
        }
        if(stream.eat('/')) {
          return tokenLineComment(stream, state);
        }
      }

      //token operator
      if(isOperator.test(character)) {
        return tokenOperator(stream, state);
      }

      //token brackets
      if(isBrackets.test(character)) {
        return null;
      }

      //token keyword or atom or variable
      stream.eatWhile(/[\w\$_\xa1-\uffff]/);
      const token = stream.current();

      if(isKeyword[token]) {
        return tokenKeyword(stream, state);
      }

      if(isAtom[token]) {
        return tokenAtom(stream, state);
      }

      if(isIO[token]) {
        return tokenIO(stream, state);
      }

      return tokenId(stream, state);
    }

    return {
      startState: () => {
        return {
          previousToken: null,
          token: null,
          tokenizer: tokenizer
        };
      },

      token: (stream, state) => {
        if(stream.eatSpace()) {
          return null;
        }
        
        state.token = state.tokenizer(stream, state);
        state.previousToken = state.token;

        return state.token;
      },

      indent: (state, textAfter) => {
        // console.log('state:', state);
        // console.log('text after:', textAfter);
        return 2;
      },

      lineComment: '//',
      blockCommentStart: '/*',
      blockCommentEnd: '*/'
    }
  });


  CodeMirror.defineMIME("text/x-runicsrc", "runic");
  CodeMirror.defineMIME("text/runic", "runic");
});
