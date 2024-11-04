import { EffectAllowed } from "ngx-drag-drop";

export class Note {
    id: string = 'xxx';
    posX: number;
    posY: number;


    // note that data is handled with JSON.stringify/JSON.parse
    // only set simple data or POJO's as methods will be lost
    // draggable.data = id

    effectAllowed: EffectAllowed = 'all';

    disable = false;
    handle = false;

    constructor(id?: string, x?: number, y?: number) {
        this.id = id ?? crypto.randomUUID();
        this.posX = x ?? /*0*/  Math.random() * 400;
        this.posY = y ?? /*0*/  Math.random() * 400;
    }

}