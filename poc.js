!function() {
  const vert_shader = `
    uniform vec2 u_pos;
    uniform vec2 u_size;
    attribute vec2 v_pos;
    attribute vec2 i_pos;

    void main() {
      gl_Position = vec4(u_pos + (v_pos + i_pos) / u_size, 0, 1);
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

  v_array = new Float32Array([ 1, 1, -1, 1, 1, -1, 1, -1, -1, 1, -1, -1 ]);

  v_buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, v_buf);
  gl.bufferData(gl.ARRAY_BUFFER, v_array, gl.STATIC_DRAW);

  const u_pos = gl.getUniformLocation(prog, "u_pos");
  const u_size = gl.getUniformLocation(prog, "u_size");

  function animate() {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.1, 0.2, 0.3, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(prog);

    gl.uniform2fv(u_pos, [ 0, 0 ]);
    gl.uniform2fv(u_size, [ 8, 8 ]);

    gl.bindBuffer(gl.ARRAY_BUFFER, v_buf);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
  requestAnimationFrame(animate);
}();
