## PostgreSQL

docker ps => processos que estão rodando na máquina

sudo docker run \
    --name postgres\ 
    -e POSTGRES_USER=Cristuker \ 
    -e POSTGRES_PASSWORD=136crcc12 \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \ 
    -d \
    postgres

docker exec -it postgres /bin/bash => vc entra no container pra rodar um comando lá dentro

### cliente para o postgresql


sudo docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \ 
    adminer


## MongoDB

sudo docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
    -d mongo:4

### cliente para o mongodb

sudo docker run \
    --name mongoclient \
    -p 3030:3030 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient 


    sudo docker start postgres adminer mongodb mongoclient