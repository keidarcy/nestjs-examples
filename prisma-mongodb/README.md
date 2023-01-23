# Prisma + Mongodb + Nestjs

## Get started

- [issue](https://github.com/prisma/prisma/issues/8266)

```
docker-compose up -d
# docker-compose exec mongo mongo --eval "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]});"
```

## Test

```
curl -X POST -H "Content-Type: application/json" http://localhost:3000/user/ -d '{"name": "user1", "age": 32, "email": "he@gmail.com"}'
{"id":"62d7ca8eef8bac74c832d4db","name":"user1","email":"he@gmail.com","age":32,"comment":null}%
curl http://localhost:3000/user/62d7ca8eef8bac74c832d4db
```

---