import { Component } from '@angular/core';
import { UserServiceService } from "../../Services/user-service.service";

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})

export class TextEditorComponent {
  clipboardContent:string = "" //the clipboard content variable
  constructor(private UserService: UserServiceService){
  }
  changeStyle = (actionType: string, value: any) => {
    switch(actionType) {
      case 'font-size':
        var id = this.UserService.randId();
        var spanString = "<span id="+id+" style='font-size:"+value.value+"pt'></span>";
        var d = new DOMParser();
        var p = d.parseFromString(spanString, "text/html");
        var t = p.getElementById(id);
      document.execCommand('insertHTML', false, spanString);
      t!.focus();

      break;
      case 'text-tag':
        document.execCommand('formatBlock',false, value.value);
      break;
      case 'font-color':
        document.execCommand('forecolor',false, value.value);
      break;
      case 'text-indent':
        if(value == 'indent'){
          document.execCommand('indent');
        }
        if(value == 'remove_indent'){
          document.execCommand('outdent');
        }
      break;
      default:
        document.execCommand(value);
    }
  }
  textEditorAction = (actionType: any,e: any) => {
    console.log(actionType);
    console.log(window.getSelection()!.toString());
    if(actionType == 'insertText'){

      document.getElementById('esperia__writer')!.innerHTML += this.clipboardContent;
      return;

    }
    this.clipboardContent = window.getSelection()!.toString();
    document.execCommand(actionType,false);
  }
}
