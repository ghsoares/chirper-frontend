import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Chirp } from 'src/app/models/chirp';

@Component({
  selector: 'chirp',
  templateUrl: './chirp.component.html',
  styleUrls: ['./chirp.component.scss'],
})
export class ChirpComponent {
  private _chirp: Chirp;

  @Input()
  set chirp(val: Chirp) {
    this._chirp = val;
    this.updateChirpBody();
  }

  get chirp() {
    return this._chirp;
  }

  body: string;

  constructor(private domSanitizer: DomSanitizer) { }

  updateChirpBody(): void {
    if (this._chirp == null) {
      this.body = "";
      return;
    }


    this.body = this._chirp.body;
    this.body = this.body.replace(/\n/g, "<br>");
    this.body = this.body.replace(/ /g, "&nbsp");
  }

}
