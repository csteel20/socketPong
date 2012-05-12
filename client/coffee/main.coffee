class SocketPong 
   
    constructor: ->
      @createCanvas()
      @objects = []
     
     
     # this starts the game loop
     start:-> 
       @gameloop()
       @loop = true
   
     # Creates the canvas
     createCanvas: ->
       @canvas = document.getElementById 'canvas'
       @context = @canvas.getContext '2d'
       @canvas.width = $('body').width()
       @canvas.height = $('body').height()
   
     # this resets the canvas to white
     clearCanvas: ->
       @context.clearRect 0, 0, @canvas.width, @canvas.height

     # this returns the context for the canvvas
     context:->
       return @context
     
     # this is the loop that draws everything to the screen  
     gameloop:(_objects, _clear)->
       setTimeout =>
          @clearCanvas()
          @objects.forEach (e) -> 
            e.draw()
          @gameloop() if @loop
       
     
     # this adds an object to the render list
     addObject:(_item)->
       @objects.push(_item) 
       _item.draw()

      
           
# any oblject that is drawn on the screen
class GameObject 
      x: 0, y: 0, w: 10, h:10
      constructor: (@context, @x, @y)->
        
      init: ->
        
      draw: ->
          @context.fillStyle = 'rgba(0,0,0,1)'
          @context.fillRect @x, @y, @w, @h
        

#class for the paddles        
class Paddle extends GameObject             
      w: 30, h:120



# Class for all the balls..... balls lol      
class Ball extends GameObject
      w: 20, h:20
 
 
         
       
# this is the same as $(document).ready 
$ ->
 # I added this so we can connect to the server but it will probably need to change
 #  socket = io.connect('http://localhost');
 #  socket.on 'news', ->
 #    console.log(data)
 #    socket.emit('my other event', { my: 'data' })
  
  
      pong = new SocketPong 
      paddle1 = new Paddle pong.context , 10, 10
      pong.addObject(paddle1)
      
      paddle2 = new Paddle pong.context , $('body').width() - 40 , 10
      pong.addObject(paddle2)
      
      ball = new Ball pong.context, $('body').width()/2 -10, $('body').height() /2 -10
      pong.addObject(ball) 
      
      pong.start()
    
  