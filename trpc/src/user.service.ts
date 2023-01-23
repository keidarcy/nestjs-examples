import { Injectable } from '@nestjs/common';

type Name = {
  firstName: string;
  lastName: string;
};
@Injectable()
export class UserService {
  getHello(name: Name): Name {
    return { firstName: name.firstName, lastName: name.lastName };
  }
}
