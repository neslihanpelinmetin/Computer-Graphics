// TO DO 1: Provides a 3x3 transformation matrix represented as an array containing 9 values arranged in column-major sequence.
// Initially, the transformation employs scaling, followed by rotation, and ultimately, translation.
// The specified rotation measurement is in degrees.
function GetTransform(positionX, positionY, rotation, scale) {

    var cos = Math.cos((rotation * Math.PI) / 180);
    var sin = Math.sin((rotation * Math.PI) / 180);

    var c = cos * scale;
    var s = sin * scale;
    
    var matrix = [c, s, 0, -s, c, 0, positionX, positionY, 1];

    return matrix;

}

// TO DO 2:Provides a 3x3 transformation matrix represented as an array containing 9 values arranged in column-major sequence.
// The inputs consist of transformation matrices following the identical format.
// The resulting transformation initially employs trans1 and subsequently applies trans2.
function ApplyTransform(trans1, trans2) {
    var result = new Array(9);

    for(var i = 0; i < 9; i++){
        result[i] = 0;
    }

    for(var i = 0; i < 3; i++)
    {
        for(var j = 0; j < 3; j++)
        {
            for(k = 0; k < 3; k++)
            {
                result[3*i+j] = result[3*i+j] + trans1[3*i+k] * trans2[3*k+j]; 
            }
        }
    }

    return result;

}

