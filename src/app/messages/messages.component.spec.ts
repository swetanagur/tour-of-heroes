import { MessageService} from "../message.service";
import { MessagesComponent } from "./messages.component";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";


describe('testing message component',() => {

  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let service:MessageService;

  beforeEach(async(()=>{
    TestBed.configureTestingModule({
      declarations: [ MessagesComponent ],
      providers:[MessageService]
    })
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;

  }));

  it('should exist',()=>{
    expect(component).toBeDefined();
  })

  it('should display message',()=>{
    let messageString:string[] = ['HeroService: fetched heroes'];
    expect(messageString[0]).toContain(component.messageService.messages)
  })


})
