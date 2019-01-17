import { InMemoryDataService } from './in-memory-data.service'


describe('in-memory-data service',() => {
  let service: InMemoryDataService
  beforeEach(() => {
    service = new InMemoryDataService();
  });

  afterEach(() => {
    service = null;
  })

  it('should create an instance successfully', () => {

    expect(service).toBeDefined()

  })

  it('should have function',() => {
    expect(service.createDb()).toBeDefined()
  })

  it('should have function genId ',() => {
    const heroes =[{id:1,name:'sweta'},{id:2,name:'sid'}]
    expect(service.genId(heroes)).toBeDefined()
  })

})
