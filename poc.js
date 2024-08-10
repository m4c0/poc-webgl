!function() {
  const vert_shader = `
    attribute vec2 pos;

    void main() {
      gl_Position = vec4(pos, 0, 1);
    }
  `;

  const frag_shader = `
    void main() {
      gl_FragColor = vec4(1, 0, 0, 1);
    }
  `;


  const gl = document.getElementById("casein-canvas").getContext("webgl");

  const prog = gl.createProgram();

  const vert = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vert, vert_shader);
  gl.compileShader(vert);
  gl.attachShader(prog, vert);

  const frag = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(frag, frag_shader);
  gl.compileShader(frag);
  gl.attachShader(prog, frag);

  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(prog));
  }
}();
