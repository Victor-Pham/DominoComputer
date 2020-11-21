var domino_sketch = function (p) {
    p.setup = function () {
        p.createCanvas(p.windowWidth * 0.9, p.windowHeight);
        p.scale(0.05)
        p.background(11);
        p.frameRate(60);
        p.cursor(p.CROSS)
    }

    p.angle = 0

    p.hover = new Domino(0, 0, p.angle, p)
    p.dominos = []

    p.current = new Set()
    p.next = new Set()
    p.active = false

    p.draw = function () {
        p.background(11)

        p.hover.move(p.mouseX - p.cos(p.angle), p.mouseY - p.sin(p.angle), p.angle)

        for (var i = p.dominos.length - 1; i >= 0; i--) {
            if (i === p.dominos.length - 1)
                p.dominos[i].draw(true)

            if (hover_collision(i))
                p.dominos[i].draw(false, true)

            else
                p.dominos[i].draw()

            if (collision(i, p.dominos.length - 1))
                p.dominos[i].addNeighbor(p.dominos[p.dominos.length - 1])
        }

    }


    p.mouseClicked = function () {
        p.dominos.push(new Domino(p.mouseX, p.mouseY, p.angle, p))
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'z') {
            p.angle -= p.PI / 10
        }
        if (event.key === 'x') {
            p.angle += p.PI / 10
        }

        if (event.key === "T") {
            p.dominos.pop()
        }

        if (event.key === "V") {
            console.log('starting');
            fall_loop();
        }

        if (event.key === 'r') {
            reset();
        }
    });

    function hover_collision(n) {
        r1x = p.dominos[n].getX()
        r1y = p.dominos[n].getY()
        r2x = p.mouseX
        r2y = p.mouseY
        r2w = 100
        r1w = 100
        r1h = 80
        r2h = 80
        return (r1x + r1w >= r2x && // r1 right edge past r2 left
            r1x <= r2x + r2w && // r1 left edge past r2 right
            r1y + r1h >= r2y && // r1 top edge past r2 bottom
            r1y <= r2y + r2h // r1 bottom edge past r2 top)
        )
    }

    function collision(a, b) {
        r1x = p.dominos[a].getX()
        r1y = p.dominos[a].getY()
        r2x = p.dominos[b].getX()
        r2y = p.dominos[b].getY()
        r1w = 100
        r2w = 100
        r1h = 80
        r2h = 80
        return (r1x + r1w >= r2x && // r1 right edge past r2 left
            r1x <= r2x + r2w && // r1 left edge past r2 right
            r1y + r1h >= r2y && // r1 top edge past r2 bottom
            r1y <= r2y + r2h // r1 bottom edge past r2 top)
        )
    }

    function reset() {
        p.dominos.forEach(function (d) {
            d.reset();
        })
    }
}

var sketch = new p5(domino_sketch)

function fall(){
    sketch.next.clear()
    count = 0;
    sketch.current.forEach(function(d){
        d.topple()
        var neighbors = d.getNeighbors()
        if (neighbors.size === 0) {
            count++;

            if (count === sketch.current.size) {
                end_fall();
                count = 0;
                sketch.current.clear();
                console.log(sketch.current);
            }
        } else {
            neighbors.forEach(function (d) {
                sketch.next.add(d)
            });
        }
    });
    
    sketch.current.clear()

    sketch.current.clear();

    sketch.next.forEach(function (n) {
        sketch.current.add(n)
    });
}

var intvl;

function fall_loop() {
    sketch.current.add(sketch.dominos[0])
    intvl = setInterval(fall, 300);
}

function end_fall(){
    console.log("stopping")
    clearInterval(intvl)
}