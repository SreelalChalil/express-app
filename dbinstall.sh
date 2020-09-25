wget -qO - https://www.mongodb.org/static/pgp/server-4.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
sudo apt-get update
sudo apt-get install -y mongodb-server
sudo apt-get install -y mongodb-org
sudo service mongodb start
echo "Installations are done, you are good to go"
node_modules/.bin/pm2 start -f src/mongoose/db/defaultDB.js
echo "Default database setup is done"
