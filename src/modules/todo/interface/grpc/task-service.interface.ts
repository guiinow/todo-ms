import { Observable } from 'rxjs';

// requisição
export interface IGetOneTaskByIdInput {
  id: string;
}

// resposta
export interface IGetOneTaskByIdOutput {
  id: string;
  name: string;
  active: boolean;
}

// definição do método
export interface ITaskController {
  //pode ser ITaskService
  findOne(input: IGetOneTaskByIdInput): Observable<IGetOneTaskByIdOutput>;
}
