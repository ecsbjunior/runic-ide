function main() {
  const codemirrorEditor = CodeMirror(document.getElementById('editor-wrapper'), {
    tabSize: 2,
    lineNumbers: true,
    theme: 'omni',
    mode: 'runic',
    value: `fn main() -> int {
  //create a variabel
  int a = 3;
  
  printf("hello world");

  for(int i = 0; i < 10; i++) {
    a = 10;
  }

  /*
  if(a > 10) {
    int c = 0;
  }
  */

  return 0;
}
`,
  });
}

document.addEventListener('DOMContentLoaded', main);
