const area = {
    square: (length) => {
        return length * length;
    },
    circle: radius => {
        return Math.PI * radius ** 2;
    },
    rectangle: (width, height) => {
        return width * height;
    }
}

module.exports = area;