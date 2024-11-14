import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Note } from '../note/note.model';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  // TODO
  private crypt_key: string = "123";

  // TODO versionnummer!!
  private store_key: string = "impressions";

  constructor(private logger: NGXLogger) {
  }

  public addData(noteToAdd: Note) {
    this.logger.debug("addData: " + JSON.stringify(noteToAdd));

    let temp: Note[] = this.getData();
    temp.push(noteToAdd);
    this.saveData(temp);
  }

  public changeData(noteToChange: Note) {
    this.logger.debug("changeData: " + JSON.stringify(noteToChange));

    /*
    let temp : Map<string, Note> = new Map(this.getData().map(obj => [obj.id, obj]));
    temp.set(noteToChange.id, noteToChange);
    this.saveData(Array.from(temp.values()));
    */

    this.saveData(this.getData().flatMap((item) => (item.id === noteToChange.id ? noteToChange : item)));
  }

  public saveData(value: Note[]) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        this.logger.info("saving");
        this.logger.debug("saving: " + JSON.stringify(value));
        localStorage.setItem(this.store_key, this.encrypt(JSON.stringify(value)));
      }
    } catch (error) {
      this.logger.error('Failed to save to localStorage:', error);
      throw error;
    }
  }

  public findData(id: string): Note {
    let temp: Note | undefined = this.getData().find(item => id === item.id);
    if (!temp) {
      throw new Error("Note " + id + " not found.");
    }
    return temp;
  }

  public getData(): Note[] {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        let data: string = localStorage.getItem(this.store_key) || "";
        let temp = this.decrypt(data);
        this.logger.trace(temp);
        if (temp === '') {
          temp = "[]";
        }
        let decypted: Note[] = JSON.parse(temp);
        return decypted;
      }
      return [];
    } catch (error) {
      console.error('Failed to get data from localStorage:', error);
      return [];
    }
  }

  public removeData(noteToRemove: Note) {
    this.logger.info("removeData: " + JSON.stringify(noteToRemove));
    let temp: Note[] = this.getData().filter(item => noteToRemove.id !== item.id);
    this.saveData(temp);
  }

  public removeAllData() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(this.store_key);
      }
    } catch (error) {
      console.error('Failed to remove data from localStorage:', error);
    }
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