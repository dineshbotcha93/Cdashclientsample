import {
  Component,
  Injector,
  AfterContentInit,
  AfterViewInit,
  ViewContainerRef
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe} from "../shared/pipes/safe.pipe";
import {type} from "os";

@Component({
  selector: 'temp-haccp',
  template: `
     <iframe [src]="haccpUrl()" frameborder="0"
             webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
  `,
})
export class HaccpTempComponent {
  public iFrame: string = '';
  constructor(private sanitizer: DomSanitizer, private safePipe: SafePipe) {
  //this.iFrame = sanitizer.bypassSecurityTrustResourceUrl("https://google.com");
   // this.iFrame = safePipe.transform("https:google.com", type: 'resourceUrl');
  }

  haccpUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl("http://71.174.254.42:81/login");
  }
}
