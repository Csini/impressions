import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Note } from '../note/note.model';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  // TODO
  private crypt_key: string = "123";

  // TODO
  private store_key: string = "impressions";

  constructor() { }

  public addData(noteToAdd: Note) {
    console.log("addData: " + JSON.stringify(noteToAdd));
    
    let temp :Note[] = this.getData();
    temp.push(noteToAdd);
    this.saveData(temp);
  }

  public saveData(value: Note[]) {
    console.log("saving: " + JSON.stringify(value));
    localStorage.setItem(this.store_key, this.encrypt(JSON.stringify(value)));
  }

  public getData(): Note[] {
    let data: string = localStorage.getItem(this.store_key) || "";
    let temp = this.decrypt(data);
    //console.log(temp);
    let decypted: Note[] = JSON.parse(temp);
    return decypted;
  }
  public removeData() {
    localStorage.removeItem(this.store_key);
  }

  //public clearData() {
  //  localStorage.clear();
  //}

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.crypt_key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.crypt_key).toString(CryptoJS.enc.Utf8);
  }
}