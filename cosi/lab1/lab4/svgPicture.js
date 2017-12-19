"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let itemSize = 6, count = 6, height = count * itemSize, width = height, svgNamespace = "http://www.w3.org/2000/svg", createElement = (tagName, appendTo, props, cssObj) => {
    let el = document.createElementNS(svgNamespace, tagName);
    props !== undefined && setAttributes(el, props);
    cssObj !== undefined && css(el, cssObj);
    appendTo !== undefined && appendTo.appendChild(el);
    return el;
}, setAttributes = (element, props) => {
    for (let i = 0, keys = Object.keys(props), len = keys.length; i < len; i++) {
        element.setAttribute(keys[i], props[keys[i]]);
    }
}, css = (element, cssObj) => {
    for (let i = 0, keys = Object.keys(cssObj), len = keys.length; i < len; i++) {
        element.style[keys[i]] = cssObj[keys[i]];
    }
};
class CheckmatePicture {
    constructor() {
        this.elements = [];
        this.container = this.createSvg();
        for (let i = 0; i < count; i++) {
            let x = i * itemSize, items = [];
            for (let j = 0; j < count; j++) {
                items.push(new Rect(j * itemSize, x, itemSize, this.container));
            }
            this.elements[i] = items;
        }
    }
    updateValues(values) {
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                this.elements[i][j].value = values[i][j];
            }
        }
    }
    getValues() {
        let result = [];
        for (let i = 0; i < count; i++) {
            let items = [];
            for (let j = 0; j < count; j++) {
                items[j] = this.elements[i][j].value;
            }
            result[i] = items;
        }
        return result;
    }
    createSvg() {
        let svg = document.createElementNS(svgNamespace, "svg");
        svg.style.webkitTransform = "translateZ(0)";
        svg.style.pointerEvents = "all";
        svg.style.overflow = "hidden";
        svg.style.transformOrigin = "0px 0px 0px";
        svg.setAttributeNS(svgNamespace, "width", `${width}`);
        svg.setAttributeNS(svgNamespace, "height", `${height}`);
        return svg;
    }
}
exports.default = CheckmatePicture;
class Rect {
    constructor(x, y, size, parent) {
        this.state = 1;
        this.container = createElement("rect", parent, {
            x: x,
            y: y,
            width: size,
            height: size,
            fill: "white"
        });
    }
    set value(newValue) {
        this.state = newValue;
        setAttributes(this.container, {
            fill: this.state === 0 ? "black" : "white"
        });
    }
    get value() {
        return this.state;
    }
}
