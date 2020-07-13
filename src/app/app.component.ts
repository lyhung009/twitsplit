import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {TextBlock} from "./model/TextBlock";
import {splitText} from "./util/split.util";
import {getBlocks, saveBlock} from "./util/storage";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'twitsplit';

  blocks: TextBlock[] = [];
  textControl = new FormControl('');
  error: string = '';

  constructor() {
  }

  ngOnInit() {
    this.blocks = getBlocks() || [];
  }

  submitText(text: string, event: any) {
    try {
      if (text.trim().length == 0) return;
      const newTextBlock: TextBlock = {
        texts: splitText(text),
        dateCreated: Date.now()
      };
      this.error = '';
      this.blocks.unshift(newTextBlock);
      this.textControl.setValue('');
      saveBlock(this.blocks);
    } catch (e) {
      this.error = e.message;
    }
  }
}
