function Domino(x1, y1, angle1, p) {
    var x = x1
    var y = y1
    var angle = angle1
    var toppled = false
    var neighbors = new Set()

    this.draw = function (shadow, col) {
        p.push();
        if (col)
            p.fill(128, 160, 82)
        else
            p.fill(180, 180, 180)
        p.translate(x, y)
        p.rotate(angle)
        if (toppled === true) {
            p.rect(0, 0, 100, 80)
        } else {
            p.rect(0, 0, 100, 20)

            if (shadow) {
                p.fill(180, 180, 180, 40)
                p.rect(0, 0, 100, 80)
            }
        }
        p.pop();
    };

    this.topple = function () {
        toppled = true
    };

    this.getX = function () {
        return x;
    };

    this.getY = function () {
        return y;
    }

    this.getAngle = function () {
        return angle;
    }

    this.move = function (xn, yn, anglen) {
        x = xn
        y = yn
        angle = anglen
        this.draw(false, false);

    }

    this.addNeighbor = function (n) {
        if (this !== n)
            neighbors.add(n)
    }

    this.getNeighbors = function () {
        return neighbors
    }

    this.reset = function () {
        this.toppled = false;
    }

}