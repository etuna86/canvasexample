/*let canvas=document.getElementById('canvas');
let context= canvas.getContext("2d");

var window_height=window.innerHeight;
var window_width=window.innerWidth;

canvas.width=window_width;
canvas.height=window_height;

canvas.style.background= "#bbf";




class Circle{
    constructor(xpoint,ypoint,radius,color){
       this.xpoint=xpoint;
       this.ypoint=ypoint;
       this.radius=radius;
       this.color=color;
    }
    draw(context){
        context.beginPath();
        context.arc(this.xpoint,this.ypoint,this.radius,0,Math.PI * 2, false );
        context.strokeStyle='grey';
        context.lineWidth=3;
        context.fillStyle=this.color;
        context.fill();
        context.stroke();
        context.closePath();
    }
    clickSquare(xMouse, yMouse){
        const distance =Math.sqrt(
            ( ( xMouse - this.xpoint ) * ( xMouse - this.xpoint ) )
            +
            ( ( yMouse - this.ypoint ) * ( yMouse - this.ypoint ) )
        );
        console.warn("this: ",this);
        console.warn("distance: ",distance);
      
        console.warn("thisx: ",this.xpoint);
        console.warn("thisy: ",this.ypoint);
    
        if(distance < (this.radius)){
            return true;
        } else{
            return false;
        }
    }
}


let circle=new Circle(200,200,100,'#f56');
circle.draw(context);

canvas.addEventListener('click', (e)=>{
    const rect=canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const MouseY = e.clientY - rect.top;
    console.warn('x' + mouseX + 'y:' + MouseY);
    console.warn(circle.clickSquare(mouseX,MouseY));
}) 


*/

var rectColor='#2793ef';
var canvasArray=[];

var Rectangle = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isDragging = false;
    this.color=rectColor;
    this.stroke=rectColor;
    this.isSelected=false;


    this.render = function(ctx) {

      if(this.isSelected==true){
        this.stroke='red';
        ctx.globalCompositeOperation='source-over';
      }else{
        this.stroke=rectColor;
      }


      ctx.save();
  
      ctx.beginPath();
      ctx.rect(this.x - this.width * 0.5, this.y - this.height * 0.5, this.width, this.height);
      ctx.fillStyle =this.color;
      //ctx.fillStroke =this.stroke;
      ctx.strokeStyle = this.stroke;
      ctx.lineWidth   = 3;
      ctx.stroke();
      ctx.fill();
      ctx.restore();


      console.warn("canvasArray; ",canvasArray);
    }
  }
  
  var Arc = function(x, y, radius, radians) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.radians = radians;
    this.isDragging = false;
    this.color=rectColor;
    this.stroke=rectColor;
    this.isSelected=false;

    this.render = function(ctx) {


      if(this.isSelected==true){
        this.stroke='red';
        ctx.globalCompositeOperation='source-over';
      }else{
        this.stroke=rectColor;
      }


      ctx.save();
  
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, this.radians, false);
      ctx.fillStyle =rectColor;
      ctx.strokeStyle = this.stroke;
      ctx.lineWidth   = 3;
      ctx.stroke();
      ctx.fill();
  
      ctx.restore();
    }

  }
  
  var MouseTouchTracker = function(canvas, callback){
  
    function processEvent(evt) {
      var rect = canvas.getBoundingClientRect();
      var offsetTop = rect.top;
      var offsetLeft = rect.left;
      
   

      if (evt.touches) {
        console.warn("evt; ",evt);
        return {
          x: evt.touches[0].clientX - offsetLeft,
          y: evt.touches[0].clientY - offsetTop
        }
      } else {
        return {
          x: evt.clientX - offsetLeft,
          y: evt.clientY - offsetTop
        }
      }
    }
  
    function onDown(evt) {
      console.warn("onDown; ",evt);
      evt.preventDefault();
      var coords = processEvent(evt);
      callback('down', coords.x, coords.y);

    }
  
    function onUp(evt) {
      console.warn("onUp; ",evt);
      evt.preventDefault();
      callback('up');
    }
  
    function onMove(evt) {
      //console.warn("onMove; ",evt);
      evt.preventDefault();
      var coords = processEvent(evt);
      callback('move', coords.x, coords.y);
    }
  
    canvas.ontouchmove = onMove;
    canvas.onmousemove = onMove;
  
    canvas.ontouchstart = onDown;
    canvas.onmousedown = onDown;
    canvas.ontouchend = onUp;
    canvas.onmouseup = onUp;
  }
  
  function isHit(shape, x, y) {
    console.warn("shape",shape);
    if (shape.constructor.name === 'Arc') {
      var dx = shape.x - x;
      var dy = shape.y - y;
      if (dx * dx + dy * dy < shape.radius * shape.radius) {
        return true
      }
    } else {
      console.warn("shape2",shape);
      if (x > shape.x - shape.width * 0.5 && y > shape.y - shape.height * 0.5 && x < shape.x + shape.width - shape.width * 0.5 && y < shape.y + shape.height - shape.height * 0.5) {
        return true;
      }
    }
  
    return false;
  }
    
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var startX = 0;
  var startY = 0;
  
 
 
  var rectangle = new Rectangle(50, 50, 100, 100);

  function addRect(){
 
    canvasArray.push(new Rectangle(50, 50, 100, 100));
    //rectangle.render(ctx);

    for (let i = 0; i < canvasArray.length; i++) {
      ///canvasArray[i].push(rectangle);
      canvasArray[i].render(ctx);
    }

  }



  

  

 
  
 
  //var circle = new Arc(200, 140, 50, Math.PI * 2);
 // circle.render(ctx);
  
  var mtt = new MouseTouchTracker(canvas,
    function(evtType, x, y) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      switch(evtType) {
  
        case 'down':
          startX = x;
          startY = y;
          if (isHit(rectangle, x, y)) {
            rectangle.isDragging = true;
            rectangle.isSelected = true;
          }else{
            rectangle.isSelected = false;
          }
         /* if (isHit(circle, x, y)) {
            circle.isDragging = true;
            circle.isSelected = true;
          }
          else{
            circle.isSelected = false;
          }*/
          break;
  
        case 'up':
          rectangle.isDragging = false;
         //circle.isDragging = false;
          break;
  
        case 'move':
          var dx = x - startX;
          var dy = y - startY;
          startX = x;
          startY = y;
  
          if (rectangle.isDragging) {
            rectangle.x += dx;
            rectangle.y += dy;
          }
  
         /* if (circle.isDragging) {
            circle.x += dx;
            circle.y += dy;
          }*/
          break;
      }
  
      var getX=document.getElementById('getx');
      getX.innerText=rectangle.x;

      var getY=document.getElementById('gety');
      getY.innerText=rectangle.y;

      //circle.render(ctx);
      rectangle.render(ctx);

      for (let i = 0; i < canvasArray.length; i++) {
        ///canvasArray[i].push(rectangle);
        canvasArray[i].render(ctx);
      }

    }
  );