let uploaderId: string = "imageUploader",
    canvasId: string = "canvasImage1",
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
                {}
            ]
        },
        {
            rows: [
                { type: "header", template: "Image", height: 50 },
                {
                    template: `<div><canvas id="${canvasId}" width="1000" height="500"></canvas></div>`
                }
            ]
        }
    ]
};

export { ui, uploaderId, canvasId };