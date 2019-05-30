# Bond Fight - Node

Back end for a fun tool to compare Bond films and rate your favourites.

### Setup

1. Clone Node repository by running `git clone git@github.com:Mayden-Academy/2019-nodeApi-bondFight.git`
2. Create database with name Films and collection Bond_Films, and populate with `bond.json` from db folder
3. On the command line, cd into node directory and run `node index.js`
4. Turn on mongodb by running `mongod --config /usr/local/etc/mongod.conf`


### Routes

GET

- Gets 2 random objects from database to hydrate card components within card container. 
- Returns:
- if GET request is successful
{'success':true, 'msg':'', 'data':{[...]}

### Authors

PengRats at the Mayden Academy, May 2019

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

### Acknowledgments

Thanks go to creators of the Skyfall Done font.
Also Alice. Cheers Alice.