> My First Beautiful Nuxt + NodeJS + Redis + Mongo Dockerised app

## Build Setup
``` bash
#  Make sure you have Docker installed
# Clone the repo, and in the home dir of the cloned repo, run

$ docker-compose up
```

## Build Setup for Locked Swarm with one way in through nginx server
``` bash
#  First initialise your 'Swarm'
$ docker swarm init

# Deploy swarm from home directory
$ docker stack deploy -c docker-stack.yaml <stack-name>

# Check logs from a Swarm service
# add '--follow' to trace logs
$ docker service logs <service-name>
```