import { Observable } from 'rxjs';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export interface IGrpcService {
  accumulate(numberArray: INumberArray): Observable<any>;
}

interface INumberArray {
  data: number[];
}

// Same options object used by microservice server
export const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'app',
    protoPath: join(__dirname, '../../../app.proto'),
  },
} as const;
