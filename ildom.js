var authors;
class Graphics{
    constructor(ctx){
        this.ctx = ctx
        // (0, 0) is at the top of the diamond. This is where we'll start drawing
        this.sourceX = 1000
        this.sourceY = 20
        // How much we move on the X axis for each tile
        this.tileWidth = 36
        // How much we move on the Y axis for each tile
        this.tileHeight = 18
        // How much we move on the Y axis for each unit of depth
        this.tileDepth = 0

        // The size of the field, and the field itself
        this.width = 25
        this.height = 25
        this.depths = [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 1, 2, 2, 2],
            [0, 0, 2, 3, 1],
            [0, 0, 0, 1, 2]
        ]
        this.world = []
    }
  
    getDepth(x, y)
    {
    // Wrap to the borders
    if (x < 0)
        x = 0
    else if (x >= this.width)
        x = this.width - 1
    if (y < 0)
        y = 0
    else if (y >= this.height)
        y = this.height - 1
    return depths[y][x]
    }


    getDrawingPos(x, y)
    {
        // Get the drawing position for a given point
        var destX = this.sourceX - ((x - y) * this.tileWidth)
        var destY = this.sourceY + ((x + y) * this.tileHeight) - (this.tileDepth * 1)
        return {"x": destX, "y": destY}
    }

    drawDiamond(x, y)
    {
    // Just find the points for all the corners..
    var point0 = this.getDrawingPos(x, y)
    var point1 = this.getDrawingPos(x + 1, y)
    var point2 = this.getDrawingPos(x + 1, y + 1)
    var point3 = this.getDrawingPos(x, y + 1)
    
    this.ctx.beginPath()
    
    // And draw them
    this.ctx.moveTo(point0.x, point0.y)
    this.ctx.lineTo(point1.x, point1.y)
    this.ctx.lineTo(point2.x, point2.y)
    this.ctx.lineTo(point3.x, point3.y)
    this.ctx.lineTo(point0.x, point0.y)
    this.ctx.stroke()
    this.ctx.fill()
}
    
 drawField()
{
    for (var x = 0; x < this.width; x++)
    {
        for (var y = 0; y < this.height; y++)
        {
            this.drawDiamond( x, y )
        }
    }
}


 drawObject(x, y, w , h , image, n)
{

    var destX = this.sourceX - ((x - y) * this.tileWidth)
    var destY = this.sourceY + ((x + y) * this.tileHeight) - (this.tileDepth * 1)

    //IMAGE
    var img = new Image()
    img.onload = function(){
        /**
         * 
         */
    }
    this.createChildNode(image, destX - (w / 2), destY - ( h )  , n,  w , h)
    img.src = image

    return {"x": destX, "y": destY}
}

calculateDimensionObject(w, h){

}

createChildNode(img, destX ,destY, n,  w , h){
    var o = document.createElement("img")
    o.setAttribute("id",n)
    o.setAttribute("src",img)
    o.setAttribute("style","position:absolute; left:"+destX+"px; top:"+destY+"px; width:"+ w + "px; height:"+ h +"px;")
    var c = document.getElementById("container").appendChild(o)
}

 moveElementTo(id, actualPosition  ){
    
    var o = document.getElementById(id)

    var startX = this.sourceX - ((actualPosition.getX() - actualPosition.getY()) * this.tileWidth)
    var startY = this.sourceY + ((actualPosition.getX() + actualPosition.getY()) * this.tileHeight)

    var destX = this.sourceX - ((dest.getX() - dest.getY()) * this.tileWidth)
    var destY = this.sourceY + ((dest.getX() + dest.getY()) * this.tileHeight)


    /*
    * TIPOS DE MOVIMIENTO.. no es la mejor implementacion..
    */
    if(startY < destY){
         actualPosition.setY(actualPosition.getY() + 0.5) //izq der
         startY = this.sourceY + ((actualPosition.getX() + actualPosition.getY()) * this.tileHeight) - (this.tileDepth * 1)
         o.style.top = startY - 120
    }

    if(startY > destY){
        actualPosition.setY(actualPosition.getY() - 0.5) //izq der
        startY = this.sourceY + ((actualPosition.getX() + actualPosition.getY()) * this.tileHeight) 
        o.style.top = startY  - 120 
    }

    if(startX > destX){
        console.log(startX + " " + destX)
        actualPosition.setX(actualPosition.getX() + 0.5) //izq der 
        startX = this.sourceX - ((actualPosition.getX() - actualPosition.getY()) * this.tileWidth)
        o.style.left = startX - 90
    }

    if(startX < destX){
        console.log(startX + " " + destX)
        actualPosition.setX(actualPosition.getX() - 0.5) //izq der 
        startX = this.sourceX - ((actualPosition.getX() - actualPosition.getY()) * this.tileWidth)
        o.style.left = startX - 90
    }

    if(Math.floor(startX) == destX && Math.floor(startY) == destY){
    	var i;
  		for (i = 0 ; i < arrayVisitedCities.length; i++) {
  			if(arrayVisitedCities[i].position.getX() == dest.getX() && arrayVisitedCities[i].position.getY() == dest.getY()){
    			arrayVisitedCities.splice(i, 1)
    			console.log("***"+arrayVisitedCities.length)
  			}
  		}
    	 searchDesinity(new Position(actualPosition.getX(), actualPosition.getY()))
         dest = sortByPotencial(arrayVisitedCities)[0].position
        
    }
 }



}

//Definición de clases
const decreacePercent = 0.005

class Ildom{
	constructor( name , interestPercent ){
		this.name = name
		this.interestPercent = interestPercent
	}
	
	decreaseInterest(){
		this.interestPercent -= this.decreacePercent
	}
	
	getname(){
		return this.name
	}
	
	setname( n ){
		this.name = n
	}
	
}

class City{
	constructor( name,  position, promedio, desviacion ,ildoms ){
		this.name = name
		this.position = position
        this.ildoms = ildoms
        this.promedio = promedio
        this.desviacion = desviacion
        this.potencialIldom = 0
        this.calculatePotencialIldoms()
        this.potencial = 0
    }
    
    calculatePotencialIldoms(){
        var y2
        var use_last = false
            var y1
            if(use_last) {
               y1 = y2
               use_last = false
            }
            else {
                var x1, x2, w
                do {
                     x1 = 2.0 * Math.random() - 1.0
                     x2 = 2.0 * Math.random() - 1.0
                     w  = x1 * x1 + x2 * x2              
                } while( w >= 1.0)
                w = Math.sqrt((-2.0 * Math.log(w))/w)
                y1 = x1 * w
                y2 = x2 * w
                use_last = true
           }
    
           var retval = this.promedio + this.desviacion * y1
           if(retval > 0) 
           this.potencialIldom = retval
               return retval

           this.potencialIldom = -retval
           return -retval

    }
	
	
}

class Position{
    constructor(x , y){
        this.x = x
        this.y = y
    }

    getX(){
        return this.x
    }

    setX( x ){
        this.x = x
    }

    getY(){
        return this.y
    }

    setY( y ){
         this.y = y
    }
}




/**
 * 
 */

imagenCiudad1 = "images/ciudad1.png"
imagenCiudad2 = "images/ciudad2.png"
imagenCiudad3= "images/ciudad3.png"
imagenCiudad4 = "images/ciudad4.png"
imagenCiudad5 = "images/ciudad5.png"
imagenIldom ="images/ildom.png"
var dataJSON = ""
var arrayCities = Array()
var canvas
var ctx
var a 
var arrayVisitedCities = Array()
var pos = new Position(1,1) 
var dest

window.onload = function(){
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            dataJSON = JSON.parse(this.responseText)
            initContext()

        }
    }

    xmlhttp.open("GET", "data.json", true)
    xmlhttp.send()

}

  
function  initContext(){
  
    canvas = document.getElementById('c')
    ctx = canvas.getContext('2d')
    ctx.mozImageSmoothingEnabled = false
    
    ctx.fillStyle = 'rgba(45, 164, 54, 0.5)'
    ctx.strokeStyle = 'rgba(0, 50, 50, 0.5)'

    a = new Graphics(ctx)
   
    //LOAD City
    //name,  position, promedio, desviacion ,ildoms
    let city = dataJSON[0].ciudades
        authors = dataJSON[0].authors

    console.log(city.length)
    for(i = 0 ; i <  city.length ; i++){

        console.log("* Se generó la ciudad: " + city[i].nombre)
        var o = document.createElement("p")
        o.setAttribute("id",city[i].nombre)
        o.innerHTML= city[i].nombre
        var board =  document.getElementById("listCities").appendChild(o)

        var tempPosition = new Position(city[i].x, city[i].y)
        var tempCity = new City(city[i].nombre, tempPosition, city[i].promedio, city[i].desviacion, null  )
        arrayCities.push(tempCity)
        a.drawObject(tempPosition.x, tempPosition.y, city[i].w , city[i].h , "images/"+city[i].imagen  , city[i].nombre)

    }
   
   
    des = this.searchDesinity(pos)
    a.drawObject(pos.getX(), pos.getY(), 90,120, imagenIldom, "personaje")
    a.drawField(ctx)

    updateBoard()
}

function initIldom(){
    arrayVisitedCities = arrayCities.slice(0)
    dest = sortByPotencial(arrayVisitedCities)[0].position
    x = 100
    setInterval(function(){ 
    if(arrayVisitedCities.length >0){
    a.moveElementTo("personaje", pos )
	}else{
		console.log("finish")
	x = 0
	}
    }, x)    

    setInterval(function(){
    	if(arrayVisitedCities.length >0){
    	decreasePotencial()
    	}
    },1000)
    
}


function sortByPotencial(arrayVisitedCities) {
    return arrayVisitedCities.sort(function(a, b) {
        var x = a.potencial 
        var y = b.potencial
        return ((x < y) ? -1 : ((x > y) ? 1 : 0))
    })
}



function searchDesinity(pos){
    var initX = pos.getX()
    var initY = pos.getY()
        
    for( i = 0; i < arrayCities.length; i++){
        var cityX =arrayCities[i].position.getX()
        var cityY = arrayCities[i].position.getY()

        var dis1 = Math.abs(initX - cityX)
        var dis2 = Math.abs(initY - cityY)

        r = Math.sqrt(Math.pow(dis1,2) + Math.pow(dis2,2))
        console.log(r)
        d =  r / arrayCities[i].potencialIldom 
        console.log(d)
        arrayCities[i].potencial = d
    }
        updateBoard()

}

function updateBoard(){
    for(i = 0; i< arrayCities.length; i++){
        var temp = document.getElementById(arrayCities[i].name)
        temp.innerHTML = "<b>" +arrayCities[i].name + "</b> <br> <b>DV:</b>" + arrayCities[i].potencialIldom + "<br> <b>Distancia</b> " + arrayCities[i].potencial
    }

    document.getElementById("footerAuthors").innerHTML ="<hr>"+ authors

}

function decreasePotencial(){
	 for(i = 0; i< arrayVisitedCities.length; i++){
	 	arrayVisitedCities[i].potencialIldom -= 0.0005
	 }
}