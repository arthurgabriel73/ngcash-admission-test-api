# Back-End NGCASH ADMISSION TEST

## Para rodar a aplicação no seu linux ou wsl com o git clone rode os seguintes comandos:

    $ mkdir ngcash-api
    $ cd ngcash-api
    $ git init
    $ git clone <api-url>
    $ cd <api-name>
    $ cp example.env .env
    $ vi .env
Agora coloque as variáveis de ambiente e, em seguida rode o seguinte comando:
    
    $ docker compose up

Para rodar a aplicação no seu linux ou wsl abrindo o arquivo localmente, entre na raiz do projeto e rode os seguintes comandos:

    $ cp example.env .env
    $ vi .env

Agora coloque as variáveis de ambiente, por exemplo:

    AUTH_SECRET=kuhIUHku65B
    POSTGRES_HOST=db
    POSTGRES_PORT=5432
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=docker
    POSTGRES_DB=postgres
    POSTGRES_TEST_DB=
    INITIAL_BALANCE=100
    APP_PORT=3001

Em seguida, rode o seguinte comando:

    $ docker compose up

## Para acessar a documentação implementada com o Swagger, suba os containers e acesse:

    http://localhost:3001/api

Caso ocorra um erro de permissão para rodar o script, rode o seguinte comando:

    $ chmod +x .docker/entrypoint.sh (Permitir que o script entrypoint.sh seja executado)

## Rotas:

    /users:
        /signup {createUserDto}

Para utilizar a rota /signup deve-se enviar um Dto de criar usuário "CreateUserDto",
ele fica da seguinte forma:
	
		{
			"username": "jeff123",
			"password": "Password123$"
		}
_

    /auth:
        /login {loginDto}

Para realizar o login na rota /login deve-se enviar um Dto de login "LoginDto",
ele fica da seguinte forma:
		
		{
			"username": "jeff123",
			"password": "Password123$"
		}
_

    /accounts:
        /balance {token}

Para observar o saldo da sua própria conta deve-se apenas realizar a autorização,
a própria aplicação vai reconhecer a conta do usuário pelo token

    /transactions:
    /cashout/:username {token, CashOutDto}
Para realizar uma transação na rota /cashout deve-se enviar um Dto de transação "CashOutDto",
ele fica da seguinte forma:

			{
				"value": 33
			}

Além disso, deve-se acrescentar o nome do usuário que participará da transação passivamente.
A aplicação reconhecerá o usuário ativo da transação pelo token.

	/self {token, query parameters}
Para observar suas transações, o usuário precisa se autorizar com o token,
caso ele queira filtrar por data e/ou tipo de transação/participação, deve-se passar os filtros
como parâmetros, por exemplo:
		
		/self?day=1668915368432  (Unix em milisegundos)
		/self?type=cash-in
		/self?type=cash-out
		/self?type=none

ou combinado:

		/self?type=cash-in&day=1668915368432