# pull all images
docker pull yashkumarverma/hentry-server
docker pull yashkumarverma/hentry-feeder
docker pull redislabs/redismod

# launch redis server on port non standard 8500 port
docker run -d -p 8500:6379 --name redis redislabs/redismod

# launch server
docker run --rm -d --name hentry-server -e REDIS_PORT='8500' -e REDIS_HOST='127.0.0.1' -e PORT='8000' --network host yashkumarverma/hentry-server

# launch feeder
docker run --rm -d --name hentry-feeder -e REDIS_URL='127.0.0.1:8500' -e PORT='9000' --network host yashkumarverma/hentry-feeder
