# Caiena

sistema de controle de reembolsos no qual as pessoas possam registrar
seus gastos pelo smartphone, na hora, tirando foto do cupom fiscal do gasto.

### Docker

```
$ sudo docker compose build
$ sudo docker compose up
```

### Cadastro de usuário

```
$ curl -X POST http://localhost:3000/api/v1/register \
  -H "Content-Type: application/json" \
  -d '{
    "user": {
      "email": "steve@honors.com",
      "password": "123321",
      "password_confirmation": "123321"
    }
  }'

```

### Front

```
$ sudo yarn install
$ sudo yarn run dev
```
