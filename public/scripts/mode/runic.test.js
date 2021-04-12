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
    function tokenString(stream, state) {
      let character;

      while(character = stream.next()) {
        if(character === '"') {
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

    function tokenizer(stream, state) {
      const character = stream.next();
      
      //token string
      if(character === '"') {
        state.tokenizer = tokenString;
        return tokenString(stream, state);
      }

      //token number
      if(/[\d]/.test(character)) {
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

      return null;
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
        console.log('state:', state);
        console.log('text after:', textAfter);
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
