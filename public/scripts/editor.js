import ErrorHandler from './ErrorHandler.js';
import { simpleRunicCode } from './code.test.js';

function main() {
  const codemirrorEditor = CodeMirror(document.getElementById('editor-wrapper'), {
    tabSize: 2,
    lineNumbers: true,
    theme: 'omni',
    mode: 'runic',
    value: simpleRunicCode,
  });
  const errorHandler = ErrorHandler(codemirrorEditor);

  errorHandler.line(8, 'deu erro aqui menó');
}

document.addEventListener('DOMContentLoaded', main);
