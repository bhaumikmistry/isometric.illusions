var canvas = document.getElementById("art");
var ctx = canvas.getContext('2d');

var iso = new Isomer(canvas);
var Shape = Isomer.Shape;
var Point = Isomer.Point;
var Color = Isomer.Color;
var Path = Isomer.Path;
var step1 = Shape.Prism(Point.ORIGIN,.2,1,.1);
var step2 = Shape.Prism(Point.ORIGIN,1,.2,.1);
var dark =new Color(245,205,30);
var col =new Color(22,190,190);
var test =new Color(200,100,150);


/**
 * Draws an octahedron contained in a 1x1 cube location at origin
 */
function Octahedron(origin) {
  /* Declare the center of the shape to make rotations easy */
  var center = origin.translate(0.5, 0.5, 0.5);
  var faces = [];

  /* Draw the upper triangle /\ and rotate it */
  var upperTriangle = new Path([
    origin.translate(0, 0, 0.5),
    origin.translate(0.5, 0.5, 1),
    origin.translate(0, 1, 0.5)
  ]);

  var lowerTriangle = new Path([
    origin.translate(0, 0, 0.5),
    origin.translate(0, 1, 0.5),
    origin.translate(0.5, 0.5, 0)
  ]);

  for (var i = 0; i < 4; i++) {
    faces.push(upperTriangle.rotateZ(center, i * Math.PI / 2));
    faces.push(lowerTriangle.rotateZ(center, i * Math.PI / 2));
  }

  /* We need to scale the shape along the x & y directions to make the
   * sides equilateral triangles */
  return new Shape(faces).scale(center, Math.sqrt(2)/2, Math.sqrt(2)/2, 1);
}

var angle = 0;
function loop() {
  requestAnimationFrame(loop);
  
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for(var i=0;i<5;i++){
    iso.add(step1.translate(2+i*.2,0,i*.1+.1),test); //1
  }
  
  iso.add(Shape.Prism(new Point(4.5,0,.6),1,6,.1),dark); //2
  iso.add(Shape.Prism(new Point(3,0,.6),1.5,1,.1),dark); //1
  
  iso.add(Shape.Prism(new Point(2.6,4.6,1),1.5,1,.1),dark); //3
  
  for(var i=0;i<7;i++){
    iso.add(step1.translate(2.6-i*.2,4.6,1+i*.1),dark); //3
  }
  iso.add(Shape.Prism(new Point(0.6,5.8,.4),2.2,1,.1),test); //3
    
  var step5 = Shape.Prism(new Point(0.8,7.8,.4),.2,1,.1);
  for(var i=25;i>=0;i--){
    iso.add(step5.translate(2+i*.2,0,i*.1+.1),dark); //5
  }
  
  var step6 = Shape.Prism(new Point(0.8,9.8,.4),.2,1,.1);
  for(var i=0;i<5;i++){
    iso.add(step6.translate(2+i*.2,0,i*.1+.1),test); //6
  }

  iso.add(Shape.Prism(new Point(0.6,7.8,.4),2.2,1,.1),test); //5
  iso.add(Shape.Prism(new Point(0.6,9.8,.4),2.2,1,.1),test); //6
  iso.add(Shape.Prism(new Point(6.5,7.2,.6),1,4,.1),test); //2
  iso.add(Shape.Prism(new Point(4.4,10.4,.4),2.3,1,.1),test); //6
  
  iso.add(Shape.Prism(new Point(-0.4,0.4,.4),1,10.4,.1),dark); //4
  iso.add(Shape.Prism(new Point(0,0,0),2,1,.1),dark); //1
  
  var p=Shape.Pyramid(Point.ORIGIN);
  iso.add(Octahedron(new Point(0,0,0))
    .rotateZ(new Point(.5,.5,.5), angle)
    .scale(new Point(.5,.5,.5),.6,.6,.6),col);
  angle += 2 * Math.PI / 90;
}
requestAnimationFrame(loop);