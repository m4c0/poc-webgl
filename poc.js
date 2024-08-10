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


  const canvas = document.getElementById("casein-canvas");
  const gl = canvas.getContext("webgl");

  const prog = gl.createProgram();

  const vert = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vert, vert_shader);
  gl.compileShader(vert);
  if (!gl.getShaderParameter(vert, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(vert));
  }
  gl.attachShader(prog, vert);

  const frag = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(frag, frag_shader);
  gl.compileShader(frag);
  if (!gl.getShaderParameter(frag, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(frag));
  }
  gl.attachShader(prog, frag);

  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(prog));
  }

  v_array = new Float32Array([ -0.5, -0.5, 0, 0.5, 0.5, -0.5 ]);

  v_buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, v_buf);
  gl.bufferData(gl.ARRAY_BUFFER, v_array, gl.STATIC_DRAW);

  function animate() {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.1, 0.2, 0.3, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, v_buf);

    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  requestAnimationFrame(animate);
}();
