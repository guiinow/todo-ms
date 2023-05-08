import { MappedExceptionItem } from 'nestjs-mapped-exception';
import { HttpStatus } from '@nestjs/common';

export class TodoException {
  TODO_TASK_GRPC_COMMUNICATION_ERROR: MappedExceptionItem = {
    message: 'The communication between TODO and TASK has failed.',
    code: 1,
    statusCode: HttpStatus.BAD_REQUEST,
  };
  TASK_ALREADY_ASSOCIATED_TODO: MappedExceptionItem = {
    message: 'There is already a task associated with this todo.',
    code: 2,
    statusCode: HttpStatus.NOT_ACCEPTABLE,
  };
  TASK_INACTIVE: MappedExceptionItem = {
    message: 'The task is inactive, please set the task status to true.',
    code: 3,
    statusCode: HttpStatus.NOT_ACCEPTABLE,
  };
  INTERNAL_SERVER_ERROR: MappedExceptionItem = {
    message:
      'There was an internal error, please make sure your server is up and running.',
    code: 4,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  };
  NOT_FOUND: MappedExceptionItem = {
    message:
      'The service did not find a matching todo, please make sure the Todo exists in the database.',
    code: 5,
    statusCode: HttpStatus.NOT_FOUND,
  };
}

