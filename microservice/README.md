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
