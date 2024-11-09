import { EffectAllowed } from "ngx-drag-drop";

export class Note {
    id: string = crypto.randomUUID();
    label: string;
    posX: number;
    posY: number;

    rows : string[] = [];

    constructor(label?: string, x?: number, y?: number) {
        this.label = label ?? this.id;
        this.posX = x ?? /*0*/  Math.round(Math.random() * (window.innerWidth - 100));
        this.posY = y ?? /*0*/  Math.round(Math.random() * (window.innerHeight - 200));
    }

}