// Vertex shader code defining vertex positions and colors
var vertexShaderText =
    [
        'precision mediump float;', // Set floating-point precision
        '',
        'attribute vec2 vertPosition;', // Vertex position attribute
        'attribute vec3 vertColor;', // Vertex color attribute
        'varying vec3 fragColor;', // Interpolated color to fragment shader
        'uniform float pointSize;', // Uniform for point size
        '',
        'void main()',
        '{',
        '  fragColor = vertColor;', // Set fragment color from vertex color
        '  gl_Position = vec4(vertPosition, 0.0, 1.0);', // Set vertex position
        '  gl_PointSize = pointSize;', // Set point size
        '}'
    ].join('\n');

// Fragment shader code defining how fragments (pixels) receive color
var fragmentShaderText =
    [
        'precision mediump float;', // Set floating-point precision
        '',
        'varying vec3 fragColor;', // Interpolated color from vertex shader
        'void main()',
        '{',
        '  gl_FragColor = vec4(fragColor, 1.0);', // Final fragment color with alpha 1.0
        '}'
    ].join('\n');

// Function to initialize WebGL and render shapes
var InitDemo = function () {
    console.log('This is working'); // Log a message to console

    var canvas = document.getElementById('game-surface'); // Get the canvas element
    var gl = canvas.getContext('webgl'); // Obtain WebGL context

    // Check if WebGL is supported, fallback to experimental version if not
    if (!gl) {
        console.log('WebGL not supported, falling back on experimental-webgl');
        gl = canvas.getContext('experimental-webgl');
    }

    // Alert the user if WebGL is not supported at all
    if (!gl) {
        alert('Your browser does not support WebGL');
    }

    gl.clearColor(1.0, 0.8, 1.0, 1.0); // Set clear color to lilac R, G, B, Alpha
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear color and depth buffers

    // Create shader objects and compile them
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText); // Set vertex shader source
    gl.shaderSource(fragmentShader, fragmentShaderText); // Set fragment shader source

    // Compile vertex shader and handle any errors
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
        return;
    }

    // Compile fragment shader and handle any errors
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
        return;
    }

    // Create a shader program, attach shaders, and link the program
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('ERROR linking program!', gl.getProgramInfoLog(program));
        return;
    }
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error('ERROR validating program!', gl.getProgramInfoLog(program));
        return;
    }

    // Define vertices for different shapes with colors (points, line, triangle)
    var vertices =
        [ // X, Y,       R, G, B
            // Points
            -0.8, 0.8, 1.0, 1.0, 1.0,  // White point #1  , index = 0
            -0.6, 0.6, 1.0, 1.0, 1.0,  // White point #2  , index = 1
            -0.4, 0.4, 1.0, 1.0, 1.0,  // White point #3  , index = 2
            -0.2, 0.2, 1.0, 1.0, 1.0,  // White point #4  , index = 3
            -0.8, -0.8, 1.0, 1.0, 1.0, // White point #5  , index = 4
            -0.6, -0.6, 1.0, 1.0, 1.0, // White point #6  , index = 5
            -0.4, -0.4, 1.0, 1.0, 1.0, // White point #7  , index = 6
            -0.2, -0.2, 1.0, 1.0, 1.0, // White point #8  , index = 7

            0.0, 0.0, 1.0, 1.0, 1.0,   // White point #9  , index = 8

            0.2, 0.2, 1.0, 1.0, 1.0,   // White point #10 , index = 9
            0.4, 0.4, 1.0, 1.0, 1.0,   // White point #11 , index = 10
            0.6, 0.6, 1.0, 1.0, 1.0,   // White point #12 , index = 11
            0.8, 0.8, 1.0, 1.0, 1.0,   // White point #13 , index = 12
            0.2, -0.2, 1.0, 1.0, 1.0,  // White point #14 , index = 13
            0.4, -0.4, 1.0, 1.0, 1.0,  // White point #15 , index = 14
            0.6, -0.6, 1.0, 1.0, 1.0,  // White point #16 , index = 15
            0.8, -0.8, 1.0, 1.0, 1.0,  // White point #17 , index = 16

            // Line
            -0.9, 0.9, 1.0, 0.0, 0.0,  // Upper point of the line #1 , index = 17
            -0.9, -0.9, 0.0, 0.0, 1.0, // Lower point of the line #1 , index = 18
            -0.7, 0.7, 1.0, 0.0, 0.0,  // Upper point of the line #2 , index = 19
            -0.7, -0.7, 0.0, 0.0, 1.0, // Lower point of the line #2 , index = 20
            -0.5, 0.5, 1.0, 0.0, 0.0,  // Upper point of the line #3 , index = 21
            -0.5, -0.5, 0.0, 0.0, 1.0, // Lower point of the line #3 , index = 22
            -0.3, 0.3, 1.0, 0.0, 0.0,  // Upper point of the line #4 , index = 23
            -0.3, -0.3, 0.0, 0.0, 1.0, // Lower point of the line #4 , index = 24
            -0.1, 0.1, 1.0, 0.0, 0.0,  // Upper point of the line #5 , index = 25
            -0.1, -0.1, 0.0, 0.0, 1.0, // Lower point of the line #5 , index = 26

            0.1, 0.1, 1.0, 0.0, 0.0,  // Upper point of the line #6  , index = 27
            0.1, -0.1, 0.0, 0.0, 1.0, // Lower point of the line #6  , index = 28
            0.3, 0.3, 1.0, 0.0, 0.0,  // Upper point of the line #7  , index = 29
            0.3, -0.3, 0.0, 0.0, 1.0, // Lower point of the line #7  , index = 30
            0.5, 0.5, 1.0, 0.0, 0.0,  // Upper point of the line #8  , index = 31
            0.5, -0.5, 0.0, 0.0, 1.0, // Lower point of the line #8  , index = 32
            0.7, 0.7, 1.0, 0.0, 0.0,  // Upper point of the line #9  , index = 33
            0.7, -0.7, 0.0, 0.0, 1.0, // Lower point of the line #9  , index = 34
            0.9, 0.9, 1.0, 0.0, 0.0,  // Upper point of the line #10 , index = 35
            0.9, -0.9, 0.0, 0.0, 1.0, // Lower point of the line #10 , index = 36

            // Triangle
            0.0, -0.3, 0.498, 0.0, 1.0, // Purple vertex of the triangle #1 , index = 37
            -0.5, -0.9, 1.0, 0.0, 0.0,  // Red    vertex of the triangle #1 , index = 38
            0.5, -0.9, 1.0, 0.0, 0.498, // Pink   vertex of the triangle #1 , index = 39

            0.0, -0.1, 0.498, 0.0, 1.0, // Purple vertex of the triangle #1 , index = 37
            -0.2, -0.3, 1.0, 0.0, 0.0,  // Red    vertex of the triangle #1 , index = 38
            0.2, -0.3, 1.0, 0.0, 0.498, // Pink   vertex of the triangle #1 , index = 39

            0.0, 0.3, 1.0, 0.0, 0.0,    // Red    vertex of the triangle #2 , index = 40
            -0.5, 0.9, 0.498, 0.0, 1.0, // Purple vertex of the triangle #2 , index = 41
            0.5, 0.9, 1.0, 0.0, 0.498,  // Pink   vertex of the triangle #2 , index = 42

            0.0, 0.1, 1.0, 0.0, 0.0,    // Red    vertex of the triangle #2 , index = 40
            -0.2, 0.3, 0.498, 0.0, 1.0, // Purple vertex of the triangle #2 , index = 41
            0.2, 0.3, 1.0, 0.0, 0.498,  // Pink   vertex of the triangle #1 , index = 39

        ];

    // Create and bind buffer for the vertices data
    var vertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Define attribute locations for position and color
    var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
    var pointSizeUniformLocation = gl.getUniformLocation(program, 'pointSize'); // Uniform for point size

    // Specify how the attribute data should be interpreted
    gl.vertexAttribPointer(
        positionAttribLocation,
        2,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0
    );
    gl.vertexAttribPointer(
        colorAttribLocation,
        3,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
    );

    // Enable the vertex attribute arrays
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);

    // Set point size using the uniform
    var pointSize = 10.0; // Change this value to adjust point size
    gl.uniform1f(pointSizeUniformLocation, pointSize);

    // Draw different shapes (points, lines, triangles)
    gl.useProgram(program);

    // Points
    gl.uniform1f(pointSizeUniformLocation, 4.0); // Point size 4
    gl.drawArrays(gl.POINTS, 0, 8);
    
    gl.drawArrays(gl.POINTS, 9, 8);

    gl.uniform1f(pointSizeUniformLocation, 8.0); // Point size 8
    gl.drawArrays(gl.POINTS, 8, 1);

    // Lines
    gl.drawArrays(gl.LINES, 17, 20);

    // Triangles
    gl.drawArrays(gl.TRIANGLES, 37, 12);


};
