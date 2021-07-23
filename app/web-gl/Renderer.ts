export default class Renderer {

    vertexShaderSource: string = glsl`
        // an attribute will receive data from a buffer
        attribute vec4 a_position;
        
        // all shaders have a main function
        void main() {    
            // gl_Position is a special variable a vertex shader
            // is responsible for setting
            gl_Position = a_position;
        }
    `;

    fragmentShaderSource: string = glsl`
        // fragment shaders don't have a default precision so we need
        // to pick one. mediump is a good default. It means "medium precision"
        precision mediump float;
        
        void main() {
            // gl_FragColor is a special variable a fragment shader
            // is responsible for setting
            gl_FragColor = vec4(1, 0, 0.5, 1); // return reddish-purple
        }
    `;

    constructor(gl: WebGLRenderingContext) {
        console.debug("Renderer with context:", gl);
        if (!gl) {
            window.alert("You have no WebGL");
            throw `WebGL not supported.`;
        }
        const gl_vertexShader: WebGLShader = this.createWebGlShader(gl, gl.VERTEX_SHADER, this.vertexShaderSource);
        const gl_fragmentShader: WebGLShader = this.createWebGlShader(gl, gl.FRAGMENT_SHADER, this.fragmentShaderSource);
        const gl_program: WebGLProgram = this.createWebGlProgram(gl, gl_vertexShader, gl_fragmentShader);

        const gl_a_position: number = gl.getAttribLocation(gl_program, 'a_position');

        const gl_positionBuffer: WebGLBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, gl_positionBuffer);
        
        // three 2d points
        let positions: Float32Array = new Float32Array([
            0, 0,
            0, 0.5,
            0.7, 0,
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.clearColor(0.1058823529411765, 0.1058823529411765, 0.1058823529411765, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(gl_program);

        gl.enableVertexAttribArray(gl_a_position);

    }

    private createWebGlShader(gl: WebGLRenderingContext, type: number, source: string) {
        const shader: WebGLShader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
          return shader;
        }
       
        console.debug(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }
    
    private createWebGlProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        const program: WebGLProgram = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        const success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success) {
          return program;
        }
       
        console.debug(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
      }
}

// for glsl-canvas VS Code Plugin to lint GLSL
function glsl(shader: TemplateStringsArray): string {
    return shader.toString();
}