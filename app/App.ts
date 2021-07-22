import Renderer from "./web-gl/Renderer.js";

export default class App {

    canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("game");
    webGl: Renderer = new Renderer(this.canvas.getContext("webgl"));

    constructor(name: string) {
        console.debug(`'${name}' starting...`);
    }
}

const app = new App("Pong");