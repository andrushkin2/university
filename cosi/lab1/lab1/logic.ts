import { canvasId, uploaderId } from "./ui";

export default class UiLogic {
    private image = new Image();
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    constructor() {
        let canvas = <HTMLCanvasElement | null>document.querySelector(`#${canvasId}`),
            context: CanvasRenderingContext2D | null;
        if (canvas === null) {
            throw new Error(`Cannot find canvas element with ID: ${canvasId}`);
        }
        context = canvas.getContext("2d");
        if (context === null) {
            throw new Error("Cannot get context of canvas");
        }
        this.image.style.display = "none";
        this.canvas = canvas;
        this.context = context;
        (<webix.ui.uploader>$$(uploaderId)).attachEvent("onAfterFileAdd", (e?: File) => {
            debugger;
        });
    }
    private insertImageToCanvas(urlData: string) {
        return new Promise((resolve, reject) => {
            this.image.src = urlData;
            this.image.onload = () => {
                this.context.drawImage(this.image, 0, 0);
                resolve({});
            };
            this.image.onerror = e => {
                reject(e);
            };
        });
    }
    private loadFile(file?: File) {
        if (file instanceof File) {
            return new Promise<string>((resolve, reject) => {
                if (FileReader) {
                    let loader = new FileReader();
                    loader.onload = () => {
                        resolve(loader.result);
                    };
                    loader.onerror = (e) => {
                        reject(e);
                    };
                    loader.readAsDataURL(file);
                } else {
                    reject(new Error("The browser doesn't support FileReader"));
                }
            });
        }
        return Promise.reject<Error>(new Error("File not found"));
    }
}