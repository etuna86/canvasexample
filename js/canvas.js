var c = document.getElementById("myCanvas");

var ctx = c.getContext("2d");



var curX=20; //kutu soldan baslangic koordinatı soldan saga
var curY=20; //kutu yukarıdan baslangic koordinatı yukarıdan asagi
var curDx=1; // animasyon hizi 
var curDy=1; // animasyon hizi 
var curH=100; //kutu yuksekligi
var curW=100; //kutu genisligi




var squareArray=[];
localStorage.setItem('squareArray', squareArray);

function addSquare(){
    squareArray.push(new Square(curX,curY,curDx,curDy,curW,curH));
    localStorage.setItem('squareArray', JSON.stringify(squareArray));
}


// kutu olusturma fonksiyonu
function Square(x,y,dx,dy,curW,curH){
    this.id=Date.now();
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.curW=curW;
    this.curH=curH;

    // kutu çizme fonksiyonu
    this.draw=function(){
        ctx.clearRect(0,0,innerWidth,innerHeight);
        ctx.beginPath();
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.x, this.y, this.curW, this.curH);
        ctx.stroke();
    }

      // kutu ile ilgili guncellemeler
    this.update=function(){
        this.x+=this.dx;
        this.y+=this.dy; 
        this.draw()
    }
}


function clickSquare(xMouse, yMouse){
    const distance =Math.sqrt(
        ( ( xMouse - this.curX ) * ( xMouse - this.curX ) )
        +
        ( ( yMouse - this.curY ) * ( yMouse - this.curY ) )
    );
    console.warn("this: ",this);
    console.warn("this: ",this.curW);
    console.warn("distance: ",distance);
  
    console.warn("thisx: ",this.curX);
    console.warn("thisy: ",this.curY);

    if(distance < (this.curW / 2 )){
        return true;
    } else{
        return false;
    }
    /**/
}

//yeni kutu olusturma


/*
squareArray.forEach(element => {
    element.push(new Square(curX,curY,curDx,curDy));
}); */

//var square=new Square(curX,curY,curDx,curDy);


console.warn("squareArray:",squareArray);
//console.warn("square:",square);
function animate(){
    requestAnimationFrame(animate);

    for (let i = 0; i < squareArray.length; i++) {
        squareArray[i].draw();
        //const element = array[i];
        
    }

 
    //yeni kutu update
    //square.update()
}
animate();
console.warn("canvas",ctx);


c.addEventListener('click', (e)=>{
    const rect=c.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const MouseY = e.clientY - rect.top;
    console.warn('x' + mouseX + 'y:' + MouseY);
    console.warn(clickSquare(mouseX,MouseY));
})