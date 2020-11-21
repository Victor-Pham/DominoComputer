var DOMINO_WIDTH = 100;
var DOMINO_HEIGHT = 20;
var DOMINO_SHADOW = 80;

var domino_sketch = function (p) {
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.scale(0.05)
        p.background(11);
        p.frameRate(60);
        p.cursor(p.CROSS)
    }

    p.debug = 0;

    p.angle = 0

    p.hover = new Domino(0, 0, p.angle, p)
    p.dominos = []
    p.starting = [];

    p.current = new Set()
    p.next = new Set()
    p.active = false

    p.draw = function () {
        if (p.debug === 0) {
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
        } else {
            fill2(0);
            p.noLoop();
        }

    }


    p.mouseClicked = function () {
        var i = isOnDomino();
        if (i !== -1) {
            p.dominos[i].setStarting(!p.dominos[i].isStarting());
        } else {
            p.dominos.push(new Domino(p.mouseX, p.mouseY, p.angle, p));
        }
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


    function rotate(x, y, angle, cx, cy) {
        var sinus = p.sin(-angle);
        var cosinus = p.cos(-angle);

        var tempX;
        var tempY;

        x = x - cx;
        y = y - cy;

        tempX = x * cosinus - y * sinus;
        tempY = x * sinus + y * cosinus;

        x = tempX + cx;
        y = tempY + cy;

        return [x, y];
    }

    function hover_collision(n) {
        r1x = p.dominos[n].getX();
        r1y = p.dominos[n].getY();
        domAng = p.dominos[n].getAngle();
        r2x = p.mouseX;
        r2y = p.mouseY;

        res = rotate(r2x, r2y, domAng, r1x, r1y);
        r2x = res[0];
        r2y = res[1];

        return (r2x >= r1x - DOMINO_WIDTH && r2x <= r1x + DOMINO_WIDTH &&
            r2y >= r1y && r2y <= r1y + DOMINO_SHADOW)
    }

    function selectDomino(n) {
        r1x = p.dominos[n].getX();
        r1y = p.dominos[n].getY();
        domAng = p.dominos[n].getAngle();
        r2x = p.mouseX;
        r2y = p.mouseY;

        res = rotate(r2x, r2y, domAng, r1x, r1y);
        r2x = res[0];
        r2y = res[1];

        return (r2x >= r1x && r2x <= r1x + DOMINO_WIDTH &&
            r2y >= r1y && r2y <= r1y + DOMINO_HEIGHT)
    }

    function isOnDomino() {
        for (var i = 0; i < p.dominos.length; i++) {
            if (selectDomino(i)) {
                return i;
            }
        }
        return -1;
    }

    function fill2(n) {
        //p.windowWidth * 0.9, p.windowHeight
        for (var x = 0; x <= p.windowWidth * 0.9; x += 10) {
            for (var y = 0; y <= p.windowHeight; y += 10) {
                if (hover_collision2(n, x, y)) {
                    p.push();
                    p.stroke(0, 255, 0);
                    p.strokeWeight(10);
                    p.point(x, y);
                    console.log('test')
                    p.pop();
                } else {
                    p.fill('rgb(100%,0%,10%)');
                }
            }
        }
    }

    function collision(a, b) {
        r1x = p.dominos[a].getX();
        r1y = p.dominos[a].getY();
        domAng = p.dominos[a].getAngle();
        r2x = p.dominos[b].getX()
        r2y = p.dominos[b].getY()

        res = rotate(r2x, r2y, domAng, r1x, r1y);
        r2x = res[0];
        r2y = res[1];

        return (r2x >= r1x - DOMINO_WIDTH && r2x <= r1x + DOMINO_WIDTH &&
            r2y >= r1y && r2y <= r1y + DOMINO_SHADOW)
    }

    function reset() {
        p.dominos.forEach(function (d) {
            d.reset();
        })
    }
}

var sketch = new p5(domino_sketch)

function fall() {
    sketch.next.clear()
    var count = 0;
    sketch.current.forEach(function (d) {
        if (!d.isSideHit()) {
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
                neighbors.forEach(function (n) {
                    if (d.collide(n)) {
                        n.hitSide();
                    }
                    sketch.next.add(n);
                });
            }
        }
    });

    sketch.current.clear();

    sketch.next.forEach(function (n) {
        sketch.current.add(n)
    });
}

var intvl = null;

function fall_loop() {
    if (intvl !== null) {
        clearInterval(intvl);
    }
    for (var i = 0; i < sketch.dominos.length; i++) {
        if (sketch.dominos[i].isStarting()) {
            sketch.current.add(sketch.dominos[i])
        }
    }

    intvl = setInterval(fall, 300);
}

function end_fall() {
    console.log("stopping")
    clearInterval(intvl)
}