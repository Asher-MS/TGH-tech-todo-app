# TODO APP

### This todo app was built as the selection task for intership at TGH-technologies

## Installation

#### 1. Install Docker [instructions](https://docs.docker.com/engine/install/)

#### 2. Clone the repo and change change working directory to todo-app

```
    git clone https://github.com/Asher-MS/TGH-tech-todo-app
    cd ./TGH-tech-todo-app
```

#### 3. Build the docker images

```
    docker compose -f nodejs/docker-compose.yml build
    docker compose -f todo-react/docker-compose.yml build
```

#### 4. Run the built images

```
    docker compose -f nodejs/docker-compose.yml up
    docker compose -f todo-react/docker-compose.yml up
```

#### 5. Visit http://localhost on your browser

HOSTED AT : http://192.46.211.76/

Backend Hosted at : http://192.46.211.87/

## [API Docs](https://github.com/Asher-MS/TGH-tech-todo-app/blob/master/nodejs/API-Docs.md)
