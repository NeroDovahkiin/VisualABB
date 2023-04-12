// GLOBALES
const radio = 40;
const initNodePosition = { x: 1400, y: 100 };


var canvas = this.__canvas = new fabric.Canvas('canvas', { width: window.innerWidth, height: window.innerHeight });
canvas.setZoom(.7);
/*
drawNode(100, 200, 3);
drawNode(50, 400, 1);
drawNode(200, 400, 5);
drawNode(300, 600, 18);
*/
/*
    var line = new fabric.Line([0, 200, 1800, 200], { stroke: 'black' });
    canvas.add(line);

    var line1 = new fabric.Line([0, 100, 1800, 100], { stroke: 'black' });
    canvas.add(line1);
*/


function drawNode(cordX, cordY, data) {

  const circle = new fabric.Circle({
    radius: 40,
    fill: '#DCDCDC',
    /*opacity: 0.7,*/
    stroke: 'black',
    strokeWidth: 2,
    strokeUniform: false,
    originX: 'center',
    originY: 'center'
  });

  const text = new fabric.Text(data.toString(), {
    fontSize: 30, fontWeight: 'bold', originX: 'center',
    originY: 'center'
  });

  var group = new fabric.Group([circle, text], {
    left: cordX,
    top: cordY,
    originX: 'center',
    originY: 'center'
  });

  canvas.add(group);


}
// soporte pan con alt
canvas.on('mouse:down', function (opt) {
  var evt = opt.e;
  if (evt.altKey === true) {
    this.isDragging = true;
    this.selection = false;
    this.lastPosX = evt.clientX;
    this.lastPosY = evt.clientY;
  }
});
canvas.on('mouse:move', function (opt) {
  if (this.isDragging) {
    var e = opt.e;
    var vpt = this.viewportTransform;
    vpt[4] += e.clientX - this.lastPosX;
    vpt[5] += e.clientY - this.lastPosY;
    this.requestRenderAll();
    this.lastPosX = e.clientX;
    this.lastPosY = e.clientY;
  }
});
canvas.on('mouse:up', function (opt) {
  // on mouse up we want to recalculate new interaction
  // for all objects, so we call setViewportTransform
  this.setViewportTransform(this.viewportTransform);
  this.isDragging = false;
  this.selection = true;
});

// soporte zoom
canvas.on('mouse:wheel', function (opt) {
  var delta = opt.e.deltaY;
  var zoom = canvas.getZoom();
  zoom *= 0.999 ** delta;
  if (zoom > 20) zoom = 20;
  if (zoom < 0.01) zoom = 0.01;
  canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
  opt.e.preventDefault();
  opt.e.stopPropagation();
});
//console.log(canvas._objects[0]);

const miArbol = new ABB();
miArbol.insert(10);
miArbol.insert(5);
miArbol.insert(15);
miArbol.insert(12);
miArbol.insert(11);
miArbol.insert(14);
miArbol.insert(8);
miArbol.insert(6);
miArbol.insert(9);
miArbol.insert(7);
miArbol.insert(4);
miArbol.insert(2);
miArbol.insert(3);
miArbol.insert(1);
miArbol.insert(13);
miArbol.insert(16);


miArbol.mostrarInOrder();

// FUNCIONES DE DIBUJAR EL ARBOL
console.log(miArbol);

function drawTree(tree) {
  if (tree.root != null) {
    drawThreeNode(tree.root, initNodePosition.x, initNodePosition.y);
    drawLines(tree.root);
  }
}
/*
function drawThreeNode(node, posXFather, posYFather) {

  if (node != null) {

    // separacion standard entre nodos
    let separationX = 80;


    // separación horizontal dependiendo del nivel al que esta el nodo
    const separationLevel = Math.pow(2, node.level); /*8  * Math.pow(2, node.level) * 4;*/
/*
    node.position.x = posXFather;
    node.position.y = posYFather;

    if(node.level == 0){
      separationX += 200;
      // necesito el máximo nivel del arbol para saber que tanto crecerá, y estipular la separación inicial de los nodos.
    }

    drawThreeNode(node.left, node.position.x - separationX + separationLevel, node.position.y + separationY);
    drawNode(node.position.x, node.position.y, node.value);


    drawThreeNode(node.right, node.position.x + separationX - separationLevel, node.position.y + separationY);
    console.info(node);
  }
}
*/

function drawThreeNode(node, posXFather, posYFather) {

  if (node != null) {

    // separacion standar entre nodos
    let separationX = 500 -  Math.pow(2, node.level) * 70;
    const separationY = 220;

    // separación horizontal dependiendo del nivel al que esta el nodo
    const separationLevel = Math.pow(2, node.level); /*8  * Math.pow(2, node.level) * 4;*/

    node.position.x = posXFather;
    node.position.y = posYFather;

    if(node.level == 0){
      separationX += 200;
    }

    drawThreeNode(node.left, node.position.x - separationX + separationLevel, node.position.y + separationY);
    drawNode(node.position.x, node.position.y, node.value);


    drawThreeNode(node.right, node.position.x + separationX - separationLevel, node.position.y + separationY);
    console.info(node);
  }
}



function drawLines(node) {
  if (node != null) {

    drawLines(node.left);

    if (node.left != null) {
      let line1 = new fabric.Line([node.position.x, node.position.y, node.left.position.x, node.left.position.y], { stroke: 'black', strokeWidth: 2 });
      canvas.add(line1);
      canvas.sendToBack(line1);
    }
    if (node.right != null) {
      let line2 = new fabric.Line([node.position.x, node.position.y, node.right.position.x, node.right.position.y], { stroke: 'black', strokeWidth: 2 });
      canvas.add(line2);
      canvas.sendToBack(line2);
    }

    drawLines(node.right);
  }



}




drawTree(miArbol);