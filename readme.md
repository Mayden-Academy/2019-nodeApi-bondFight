# Bond Fight - Node
Back end for a fun tool to compare Bond films and rate your favourites.

### Setup

1. Clone Node repository by running `git clone git@github.com:Mayden-Academy/2019-nodeApi-bondFight.git`
2. Create MongoDb database with name Films and collection Bond_Films, and populate with `bond.json` from db folder
3. Turn on mongodb by running `mongod --config /usr/local/etc/mongod.conf`
4. On the command line, cd into node directory and run `node index.js`

### Routes

/Bond_Films
GET

- Gets all films from database and returns an array of objects. 
- Returns:
- if GET request is successful
{'success':true, 'msg':'', 'data':[{id: int, name: string, image: string, release_date: string}]

### Authors

PengRats at the Mayden Academy, May 2019

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

### Acknowledgments

Thanks go to creators of the Skyfall Done font.
