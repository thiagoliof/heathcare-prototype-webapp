import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const clinics = [
      { id: 11, name: 'Clinica 1' },
      { id: 12, name: 'Clinica 2' },
      { id: 13, name: 'Clinica 3' },
    ];
    const patients = [
      { id: 11, name: 'pat. 1' },
      { id: 12, name: 'pat. 2' },
      { id: 13, name: 'pat. 3' },
    ];
    const therapysts = [
      { id: 11, name: 'tep. 1' },
      { id: 12, name: 'tep. 2' },
      { id: 13, name: 'tep. 3' },
    ];
    return {clinics, patients, therapysts};
  }
}
