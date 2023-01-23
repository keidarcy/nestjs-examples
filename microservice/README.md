### nestjs micro services

- [docs](https://docs.nestjs.com/microservices/basics)

### how to start

start service
```
nest start --watch --preserveWatchOutput # client server
nest start --watch --preserveWatchOutput micro-cat # micro service server
```

test it
```
curl -s -X POST 'http://localhost:3333/add' -H "content-type: application/json" --data '{"data": [1,19,10]}'
```

---

# Some nestjs feature examples

## List

- [hot-module-replacement](https://github.com/keidarcy/nestjs-examples/tree/hot-module-replacement)
- [lazy-loading-modules](https://github.com/keidarcy/nestjs-examples/tree/lazy-loading-modules)
- [microservice](https://github.com/keidarcy/nestjs-examples/tree/microservice)
- [microservice-grpc](https://github.com/keidarcy/nestjs-examples/tree/microservice-grpc)
- [mongoose-and-reactjs](https://github.com/keidarcy/nestjs-examples/tree/mongoose-and-reactjs)
- [prisma-mongodb](https://github.com/keidarcy/nestjs-examples/tree/prisma-mongodb)
- [sqs-test](https://github.com/keidarcy/nestjs-examples/tree/sqs-test)

