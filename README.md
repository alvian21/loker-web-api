# loker-web-api

# install package dengan npm
npm install

# setup env
MYSQL_POOL_MIN=0 <br />
MYSQL_POOL_MAX=50 <br />
MYSQL_POOL_IDLE=1 <br />
MYSQL_POOL_ACQUIRE=2000000000 <br />
MYSQL_POOL_EVICT=2000000000 <br />
MYSQL_DIALECT=mysql <br />
MYSQL_DIALECT_REQUEST_TIMEOUT=2000000000 <br />
MYSQL_HOST=localhost <br />
MYSQL_PORT=3306 <br />
MYSQL_NAME=loker <br />
MYSQL_USER=root <br />
MYSQL_PASS=

# runing migration
npx sequelize-cli db:migrate

# running seeder
npx sequelize-cli db:seed:all

# run app
nodemon
