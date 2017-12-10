
interface IKeyValue {
    [key: string]: string | number;
}

let itemSize = 15,
    count = 10,
    height = count * itemSize,
    width = height,
    svgNamespace = "http://www.w3.org/2000/svg",
    createElement = <T extends SVGElement>(tagName: string, appendTo?: HTMLElement | SVGElement, props?: IKeyValue, cssObj?: IKeyValue) => {
        let el = document.createElementNS(svgNamespace, tagName) as T;
        props !== undefined && setAttributes(el, props);
        cssObj !== undefined && css(el, cssObj);
        appendTo !== undefined && appendTo.appendChild(el);
        return el;
    },
    setAttributes = (element: HTMLElement | SVGElement, props: IKeyValue) => {
        for (let i = 0, keys = Object.keys(props), len = keys.length; i < len; i++) {
            element.setAttribute(keys[i], props[keys[i]] as string);
        }
    },
    css = (element: HTMLElement | SVGElement, cssObj: IKeyValue) => {
    for (let i = 0, keys = Object.keys(cssObj), len = keys.length; i < len; i++) {
        (<HTMLElement & SVGElement>element).style[keys[i]] = cssObj[keys[i]];
    }
};

export default class Checkmate {
    public container: SVGElement;
    private elements: Rect[][] = [];
    constructor() {
        this.container = this.createSvg();
        for (let i = 0; i < count; i++) {
            let x = i * itemSize,
                items: Rect[] = [];
            for (let j = 0; j < count; j++) {
                items.push(new Rect(j * itemSize, x, itemSize, this.container));
            }
            this.elements[i] = items;
        }
    }
    public updateValues(values: number[][]) {
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                this.elements[i][j].value = values[i][j];
            }
        }
    }
    public getValues() {
        let result: number[][] = [];
        for (let i = 0; i < count; i++) {
            let items: number[] = [];
            for (let j = 0; j < count; j++) {
                items[j] = this.elements[i][j].value;
            }
            result[i] = items;
        }
        return result;
    }
    private createSvg(): SVGSVGElement {
        let svg = <SVGSVGElement>document.createElementNS(svgNamespace, "svg");
        svg.style.webkitTransform = "translateZ(0)";
        svg.style.pointerEvents = "all";
        svg.style.overflow = "hidden";
        svg.style.transformOrigin = "0px 0px 0px";
        svg.setAttributeNS(svgNamespace, "width", `${width}`);
        svg.setAttributeNS(svgNamespace, "height", `${height}`);
        return <SVGSVGElement>svg;
    }
}

class Rect {
    private container: SVGRectElement;
    private state = 1;
    constructor(x: number, y: number, size: number, parent: SVGElement) {
        this.container = createElement<SVGRectElement>("rect", parent, {
            x: x,
            y: y,
            width: size,
            height: size,
            fill: "white"
        });
    }
    set value(newValue: number) {
        this.state = newValue;
        setAttributes(this.container, {
            fill: this.state === 0 ? "black" : "white"
        });
    }
    get value() {
        return this.state;
    }
}