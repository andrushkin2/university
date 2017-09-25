let uploaderId: string = "imageUploader",
    canvasTemplate = (canvasID: string) => {
        return `<div style="text-align: center;">
            <canvas id="${canvasID}" width="1000" height="500"></canvas>
        </div>`;
    },
    canvasId: string = "canvasImage1",
    buttonId: string = "buttonId",
    ui = {
    id: "lab5",
    rows: [
        { type: "header", template: "Functions", height: 50 },
        {
            cols: [
                <webix.ui.uploaderConfig>{
                    view: "uploader",
                    value: "Load file",
                    id: uploaderId,
                    autosend: false,
                    multiple: false
                },
                <webix.ui.buttonConfig>{
                    view: "button",
                    id: buttonId,
                    value: "CLick me"
                },
                {}
            ]
        },
        {
            rows: [
                { type: "header", template: "Image", height: 50 },
                {
                    template: canvasTemplate(canvasId)
                }
            ]
        }
    ]
};

export { ui, uploaderId, canvasId, buttonId };