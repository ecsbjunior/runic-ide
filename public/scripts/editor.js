function main() {
  const codemirrorEditor = CodeMirror(document.getElementById('editor-wrapper'), {
    tabSize: 2,
    lineNumbers: true,
    theme: 'omni',
    mode: 'runic',
    value: `fn main() -> int {
  //create a variabel
  int a = 3;
  float b = (1+1)/2%3-5*10;

  a++;
  b--;
  
  print("hello world true");

  for(int i = 0; i < 10; i++) {
    a = 10;
  }

  /*
  if(a > 10) {
    int c = 0;
  }
  */

  while(true);

  return 0;
}
`,
  });
}

document.addEventListener('DOMContentLoaded', main);
