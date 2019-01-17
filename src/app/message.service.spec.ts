import {getTestBed, TestBed} from "@angular/core/testing";
import { MessageService} from "./message.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";



describe('Message Service', () =>{

  let injector: TestBed;
  let service: MessageService;
  let httpMock: HttpTestingController;
  let messageString:string[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MessageService]
    });

    injector = getTestBed();
    service = injector.get((MessageService));
    httpMock = injector.get(HttpTestingController);
  });


  it('Should check the message service exist',()=>{
    expect(service).toBeDefined()
  })



});
