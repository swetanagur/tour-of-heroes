import {TestBed, getTestBed, inject} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

import {HeroService} from "./hero.service";
import {HttpClientModule, HttpParams, HttpRequest} from "@angular/common/http";


describe('HeroService', () => {
  let injector: TestBed;
  let service: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService]
    });
    injector = getTestBed();
    service = injector.get(HeroService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  /** GET heroes from the server */

  describe('#getHeroes', () => {

  it('should return an Observable<Hero>', () => {
    const dummyHeroes = [
      {id: 11, name: 'Mr. Nice'},
      {id: 12, name: 'Narco'}
    ];

    service.getHeroes().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(dummyHeroes);
    });

    const req = httpMock.expectOne(`${service.heroesUrl}`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyHeroes);
  });

  });

  /** GET hero by id.*/

  describe('#getHeroes', () => {

    it('should return an Observable<Hero>', () => {
    const dummyHeroes = [
      {id: 11, name: 'Mr. Nice'},
      {id: 12, name: 'Narco'}
    ];

    service.getHero(11).subscribe(user => {
      expect(user.name).toBe('Mr. Nice');
      expect(user).toEqual(dummyHeroes);
    });

    const req = httpMock.expectOne(`${service.heroesUrl}/11`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyHeroes);
  });

});



  describe('#addHeo', () => {

    /** add hero*/

    it('should return an Observable<Hero>', () => {
      const dummyHeroes = [
        {id: 11, name: 'Mr. Nice'},
        {id: 12, name: 'Narco'}
      ];


      service.addHero({id:13,name:'Sweta'}).subscribe(user => {
        expect(user.name).toBe('Sweta');
        expect(user).toEqual(dummyHeroes);
      });

      const req = httpMock.expectOne(`${service.heroesUrl}`);
      expect(req.request.method).toBe("POST");
      req.flush(dummyHeroes);
    });
  });
    /** delete hero*/

    describe('#deleteHeo', () => {

    it('should return an Observable<Hero>', () => {
      const dummyHeroes = [
        {id: 11, name: 'Mr. Nice'},
        {id: 12, name: 'Narco'}
      ];


      service.deleteHero(13).subscribe(user => {
        expect(user.id).toBe(13);
        expect(user).toEqual(dummyHeroes);
      });

      const req = httpMock.expectOne(`${service.heroesUrl}/13`);
      expect(req.request.method).toBe("DELETE");
      //send the request
      req.flush(dummyHeroes);
    });

  });


  /** update hero*/

  describe('#updateHeo', () => {

    it('should return an Observable<Hero>', () => {
      const dummyHeroes = [
        {id: 11, name: 'Mr. Nice'},
        {id: 12, name: 'Narco'}
      ];


      service.updateHero ({id:12,name:'sid'}).subscribe(user => {
        expect(user.name).toBe('sid');
        expect(user).toEqual(dummyHeroes);
      });

      const req = httpMock.expectOne(`${service.heroesUrl}`);
      expect(req.request.method).toBe("PUT");
      //send the request
      req.flush(dummyHeroes);
    });
  });


 /*  GET heroes whose name contains search term *!/

  */
  describe('#search', () => {

    const dummyParams = new HttpParams().set('q', 'Nice');

    it('exist the search method',() => {
      expect( service.searchHeroes('Nice')).toBeDefined()
    })

    it('should throw an error if trying to search for not supported `what`', () => {
      service.searchHeroes('Nice')
        .subscribe(() => {}, err => {
          expect(err).toBe('GET');
        });

      httpMock.expectNone(`${service.heroesUrl}/users?q=Nice`);
    });
  });




});









/*describe('Hero Service', () => {

  let injector: TestBed;
  let service: HeroService;
  let backend: HttpTestingController;


  const expectedData = {
    id: 1,
    name: 'Test hero',
  }

  const expectedDataAll = [
    {
      id: 1,
      name: 'Test hero 1'
    },
    {
      id: 2,
      name: 'Test hero 2'
    }
  ]


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        HeroService
      ]


    });

    injector = getTestBed();
    service = injector.get((HeroService));
    backend = injector.get(HttpTestingController);

    jest.spyOn(console, 'error').mockImplementation(() => undefined)

  });

  afterEach(inject([HttpTestingController], (_backend: HttpTestingController) => {
    _backend.verify()
  }))



  it('should create an instance successfully', () => {
    expect(service).toBeDefined()
  })




  it('should call the GET heroes api and return all results', () => {
    let actualDataAll = {}

    service.getHeroes().subscribe(data => actualDataAll = data)

    backend.expectOne((req: HttpRequest<any>) => {
      return req.url === `${service.heroesUrl}`
        && req.method === 'GET'
    }, `GET all hero data from ${service.heroesUrl}`)
      .flush(expectedDataAll)

    expect(actualDataAll).toEqual(expectedDataAll)
  })*/

 /* it('should call the GET hero api and return the result', () => {
    let actualData = {}

    service.getHero(1).subscribe(data => actualData = data)

    backend.expectOne((req: HttpRequest<any>) => {
      return req.url === `${service.heroesUrl}/${1}`
        && req.method === 'GET'
        && req.params.get('id') === '1'
    }, `GET hero data from ${service.heroesUrl}?id=1`)
      .flush(expectedData)

    expect(actualData).toEqual(expectedData)
  })

  it('should send an expected GET request and throw error to console when an error occurs', () => {
    service.getHero(1).subscribe()

    const getHeroRequest = backend.expectOne((req: HttpRequest<any>) => {
      return req.url === `${service.heroesUrl}`
        && req.method === 'GET'
        && req.params.get('id') === '1'
    }, `GET hero data from ${service.heroesUrl}?id=1`)

    // Stimulate an error happens from the backend
    getHeroRequest.error(new ErrorEvent('ERROR_GET_HERO_DATA'))

    expect(console.error).toHaveBeenCalled()
  })

  it('should return an observable of undefined and print error to console', () => {
    const result = service.handleError(new HttpErrorResponse({ error: 'Error occurs' }), 'test method')

    expect(console.error).toHaveBeenCalled()
    result.subscribe(value => expect(value).toBeUndefined())
  })
*/

  /*describe("getHeroes", () => {
    it('should return an Observable<Hero[]>', () => {
      const dummyHeroes = [
        {id: 11, name: 'Mr. Nice'},
        {id: 12, name: 'Narco'}
      ];

      service.getHeroes().subscribe(heroes => {
        expect(heroes.length).toBe(2);
        expect(heroes).toEqual(dummyHeroes)
      });

      const req = backend.expectOne(`${service.heroesUrl}`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyHeroes);


    })


  })






  describe("getHero/id", () => {
    it('should return an Observable<Hero[]>', () => {
      const dummyHeroes = [
        {id: 11, name: 'Mr. Nice'},
        {id: 12, name: 'Narco'}
      ];

      service.getHeroes().subscribe(heroes => {
        expect(heroes.length).toBe(7);
        expect(heroes).toEqual(dummyHeroes)
      });

      const req = backend.expectOne(`${service.heroesUrl}/id`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyHeroes);


    })


  })

*/

  /*
  */





