const ArrayDePixelsDoFogo = [];
const larguraDoFogo = 10;
const AlturaDoFogo = 10;
const FireColorPalet = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}];


function start(){
  EstruturaDoFogo();
  CreateFireSource();
  RenderFogo();
  
  setInterval(PropagacaoDoFogo, 1000);
  
}
function EstruturaDoFogo(){
  const NumeroDePixels = larguraDoFogo * AlturaDoFogo;
  
  for(let i = 0; i < NumeroDePixels; i++){
    ArrayDePixelsDoFogo[i] = 0;
  }
}

function PropagacaoDoFogo(){
  for(let column = 0; column < larguraDoFogo; column++){
    for(let row = 0; row < AlturaDoFogo; row++ ){
      const pixelIndex = column + (larguraDoFogo * row );
      
      updateFirePropagationPerPixel(pixelIndex)
    } 
  }
  RenderFogo()
}

function updateFirePropagationPerPixel(CurrentPixelIndex){
  const bellowPixelIndex = CurrentPixelIndex + larguraDoFogo;
  if(bellowPixelIndex >= larguraDoFogo * AlturaDoFogo){
    return;
  
  }
  
  const decay = 1;
  const belowPixelFireIntensity = ArrayDePixelsDoFogo[bellowPixelIndex];
  const newFireIntensity =
    belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0 ;
    
    ArrayDePixelsDoFogo[CurrentPixelIndex] = newFireIntensity ;
}



function RenderFogo(){
  let html = '<table cellpadding=0 cellspacing=0>';
  for(let row = 0; row < AlturaDoFogo; row++){
    html += '<tr>';
    for(let columns = 0; columns < larguraDoFogo; columns++){
     const PixelIndex = columns + (larguraDoFogo * row);
     const IntensidadeDoFogo = ArrayDePixelsDoFogo[PixelIndex];
     
     if(Debug === true){
      html += '<td>';
      html += `<div class="Pixel-Index">${PixelIndex}</div>`;
      html += IntensidadeDoFogo;
      html += '</td>';
    }else{
      const color = FireColorPalet[FireIntensity];
      const colorString = `${color.r}, ${color.g}, ${color.b}` ;
    }
    }
    
    html += '</tr>';
    
  }
  
  html += '</table>';
  
  document.querySelector('#CanvasDoFogo').innerHTML = html;
  
}

function CreateFireSource(){
  for(let column = 0; column <= larguraDoFogo; column++ ){
    const OverFlowPixelIndex = larguraDoFogo * AlturaDoFogo;
    const PixelIndex = (OverFlowPixelIndex - larguraDoFogo) + column;
    
    ArrayDePixelsDoFogo[PixelIndex] = 36;
  }
}



start();