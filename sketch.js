function setup() {
    createCanvas(windowWidth * 0.9, windowHeight);
    scale(0.05)
    background(11);
    frameRate(60);
    cursor(CROSS)

}

domino_x = 100
domino_y = 20
domino_shadow = 80
angle = 0

hover = (new Domino(0, -domino_y, angle))
dominos = []

next = new Set()
active = false

function draw() {
    background(11)
    if (active) {
        frameRate(16)
        if (next.size > 0) {
            next.forEach(function (d) {
                topple(d)
            })
        } else {
            active = false
            frameRate(60)
        }
    } else {
        hover.move(mouseX - cos(angle), mouseY - sin(angle), angle)
    }
    for (var i = dominos.length - 1; i >= 0; i--) {
        if (i === dominos.length - 1)
            dominos[i].draw(true)
        if (hover_collision(i)) {
            dominos[i].draw(false, true)
        } else
            dominos[i].draw()
        if (collision(i, dominos.length - 1)) {
            dominos[i].addNeighbor(dominos[dominos.length - 1])

        }
    }

}


function mouseClicked() {
    dominos.push(new Domino(mouseX, mouseY, angle))
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'z') {
        angle -= PI / 10
    }
    if (event.key === 'x') {
        angle += PI / 10
    }

    if (event.key === "T") {
        dominos.pop()
    }

    if (event.key === "V") {
        activate()
    }

    if (event.key === 'r') {
        reset();
    }
});

function hover_collision(n) {
    r1x = dominos[n].getX()
    r1y = dominos[n].getY()
    r2x = mouseX
    r2y = mouseY
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
    r1x = dominos[a].getX()
    r1y = dominos[a].getY()
    r2x = dominos[b].getX()
    r2y = dominos[b].getY()
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

function activate() {
    active = true
    topple(dominos[0])
}

function topple(d) {
    d.topple()
    next.delete(d)
    neighbors = d.getNeighbors()
    print(neighbors.size)
    neighbors.forEach(function (n) {
        next.add(n)
    })
    print(next)
}

function reset() {
    dominos.forEach(function (d) {
        d.reset();
    })
}