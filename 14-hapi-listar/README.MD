### Iniciar todos os containers de uma vez

    sudo docker start postgres adminer mongodb mongoclient


## PostgreSQL

    docker ps => processos que estão rodando na máquina

    sudo docker run --name postgres -e POSTGRES_USER=Cristuker -e POSTGRES_PASSWORD=136crcc12 -e POSTGRES_DB=heroes -p 5432:5432 -d postgres

    docker exec -it postgres /bin/bash => vc entra no container pra rodar um comando lá dentro

### cliente para o postgresql


    sudo docker run --name adminer -p 8080:8080 --link postgres:postgres -d adminer


## MongoDB

    sudo docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin -d mongo:4

### cliente para o mongodb

    sudo docker run --name mongoclient -p 3005:3005 --link mongodb:mongodb -d mongoclient/mongoclient // n funciona
    //
    docker run --name mongoclient -p 3000:3000 -d -e MONGO_URL=mongodb://admin:senhaadmin@mongodb:27017/admin --link mongodb:mongodb mongoclient/mongoclient

    
### Deletar e para os containers
    docker rm -f $(docker ps -a -q)
    // salva vidas

 ### Criar user para acessa o bd

 docker exec -it mongodb mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin --eval "db.getSiblingDB('herois').createUser({user:'cristuker',pwd:'136crcc12',roles:[{role:'readWrite',db:'herois'}]})"

 ### Mongo comandos
//docker exec -it 268661efb07e mongo -u cristuker -p 136crcc12 --authenticationDatabase herois
//show dbs -> todos os bancos q pode usar
//use herois -> mudando contexto database herois
//show collections -> pra visualizar as tabelas
