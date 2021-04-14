function ErrorHandler(editor) {
  function line(number, description) {
    const begin = { line: number, ch: 0 };
    const end = { line: number, ch: 10000 }
    const options = {
      className: 'error',
      attributes: {
        title: description
      }
    };
    editor.markText(begin, end, options);
  }

  return {
    line
  };
}

export default ErrorHandler;
