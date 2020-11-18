function domino(x1,y1, angle1){
    var x = x1
    var y = y1
    var angle = angle1
    var toppled = false 
    var neighbors = new Set()

    this.draw = function(shadow, col){
        push();
        if(col)
            fill(128,160,82)
        else
            fill(180,180,180)
        translate(x,y)
        rotate(angle)
        if(this.toppled == true){
            rect(0,0,100, 80)
        } 
        else{
            rect(0,0,100, 20)

            if(shadow){
                fill(180,180,180,40)
                rect(0,0,100,80)
            }
        }
        pop();
    };

    this.topple = function(){
        this.toppled = true
    };

    this.getX = function(){
        return x;
    };

    this.getY = function(){
        return y;
    }

    this.getAngle = function(){
        return angle;
    }

    this.move = function(x,y, angle){
        this.x = x 
        this.y = y 
        this.angle = angle
        this.draw()
        push()
        fill(180,180,180)
        translate(x,y)
        rotate(angle)

        rect(0,0,100, 20)

        fill(180,180,180,40)
        rect(0,0,100,80)
        pop(); 
    }

    this.addNeighbor = function(n){
        if (this != n)
            neighbors.add(n)
    }

    this.getNeighbors = function(){
        return neighbors
    }

}