import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { io } from "socket.io-client";
import {nanoid} from "nanoid";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Frontend';
  socket = io("http://localhost:3000");
  chatForm:FormGroup = new FormGroup({});
  userid:string = nanoid()
  messages:any[] = [];
  name:any='';

  constructor(){
    this.name = prompt("Please enter your name");
    console.log(this.name);

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.chatForm = new FormGroup({
      message:new FormControl("",[Validators.required])
    })
    this.socket.on("connect",()=>{
      const engine = this.socket.io.engine;

      console.log(this.socket.id);
      this.socket.on("test1",(data)=>{
        console.log(data);
        this.messages.push(data);
      })
    })


  }

  onSend(){
    console.log(this.chatForm.value);
    this.socket.emit("test1",{
      message:this.chatForm.value.message,
      userid:this.userid,
      name:this.name
    })
    this.messages.push({
      message:this.chatForm.value.message,
      userid:this.userid,
      name:this.name
    })
    this.chatForm.reset();
  }

}
