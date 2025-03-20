// BackGround is the background image to be changed.
// ForeGround is the foreground image.
// ForeGroundOpacity is the opacity of the foreground image.
// ForeGroundPosition is the The foreground image's location, measured in pixels. It can be negative, and the alignment of the foreground and background's top-left pixels is indicated by (0,0).

function composite(BackGround, ForeGround, ForeGroundOpacity, ForeGroundPosition) {
    var bgData = BackGround.data;
    var fgData = ForeGround.data;
    var width = BackGround.width;
    var height = BackGround.height;

    //the position where the foreground image will be placed on the background.
    var x = ForeGroundPosition.x;
    var y = ForeGroundPosition.y;

    //to find the location of where should the iteration on bg start and end
    var startX = Math.max(x,0);
    var endX = Math.min(x + ForeGround.width, width);
    var startY = y;
    var endY = y + ForeGround.height; 

    //compositing loop
    for (var i = startX; i < endX; i++) { //iteration on x
        for (var j = startY; j < endY; j++) { //iteration on y
            var bgIndex = (j * width + i) * 4; 
            var fgIndex = ((j - y) * ForeGround.width + (i - x)) * 4; 

            //calculating the alpha value according to opacity
            var alpha = ForeGroundOpacity * fgData[fgIndex + 3] / 255;

            //applying the alpha blending formula to each channel of the image
            for (var channel = 0; channel < 3; channel++) {
                bgData[bgIndex + channel] = bgData[bgIndex + channel] * (1 - alpha) + fgData[fgIndex + channel] * alpha;
            }
            
            //update the alpha channel of background image to indicate the compositing is done
            bgData[bgIndex + 3] = 255;
        }
    }
    
}