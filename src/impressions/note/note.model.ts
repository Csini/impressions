import { EffectAllowed } from "ngx-drag-drop";

export class Note {
    id: string;
    label : string;
    posX: number;
    posY: number;

    constructor(label?: string, x?: number, y?: number) {
        this.id = crypto.randomUUID();
        this.label = label ?? this.id;
        this.posX = x ?? /*0*/  Math.random() * 400;
        this.posY = y ?? /*0*/  Math.random() * 400;
    }

}