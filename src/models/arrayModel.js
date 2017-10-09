const faker = require('faker');

module.exports = {
  db: [],
  schema: {},
  name: '',
  setSchema(schema) {
    this.schema = schema;
  },
  setDb(db) {
    this.db = db;
  },
  readAll(callback) {
    callback(null, this.db);
  },
  create(new_object, callBack) {
    this.validate(new_object, this.schema, (error, result) => {
      if (error) {
        throw new Error(error.message);
      } else {
        let id = faker.random.uuid();
        if (
          !this.db.find(x => {
            if (x.id === id) {
              return true;
            }
          })
        ) {
          result.id = id;
          this.db.push(result);
          callBack(null, { message: 'success', result });
        } else {
          while (
            this.db.find(x => {
              if (x.id === id) {
                return true;
              }
            })
          ) {
            id = faker.random.uuid();
          }
          result.id = id;
          this.db.push(result);
          callBack(null, { message: 'success', result });
        }
      }
    });
  },
  read(entry_id) {
    const promise = new Promise((resolve, reject) => {
      const data = this.db.find(user => {
        return user.id === entry_id;
      });
      if (data) {
        resolve(data);
      } else {
        reject();
      }
    }).catch(err => {
      return { message: err };
    });
    return promise;
  },
  update(entry_id, new_value, callback) {
    this.validate(new_value, this.schema, (error, result) => {
      let indexToRemove;
      if (error) {
        throw new Error(error.message);
      } else {
        this.db.find((user, index) => {
          if (user.id === entry_id) {
            indexToRemove = index;
          }
        });
        result.id = entry_id;
        this.db.splice(indexToRemove, 1, result);
        callback(null, { message: 'success', value: result });
      }
    });
  },
  remove(entry_id, callback) {
    let indexToRemove;
    this.db.find((user, index) => {
      if (user.id === entry_id) {
        indexToRemove = index;
      }
    });
    const confirm = this.db.splice(indexToRemove, 1);
    callback(null, { message: `user have been removed`, object: confirm });
  },
  validate: function(obj, schema, callback) {
    if (arguments.length == 3) {
      //check or all arguments are passed
      if (typeof obj === typeof schema && !Array.isArray(obj)) {
        //check or is object passed to argument

        //check or have extra properties allowed in schema
        if (
          schema.extra_properties === false &&
          Object.keys(obj).length !== Object.keys(schema).length - 1
        ) {
          callback(
            {
              message: 'Invalid obj,extra properties not allow in schema.'
            },
            null
          );
        }
        for (let key in schema) {
          if (key !== 'extra_properties') {
            if (obj[key] === '' && schema[key].required) {
              callback(
                {
                  message: `${key} field is required`
                },
                null
              );
            }
            if (typeof schema[key].type() !== typeof obj[key]) {
              callback(
                {
                  message: `incorrect value type ${key.type},expected ${schema[
                    key
                  ].type()} and got ${typeof obj[key]}`
                },
                null
              );
            }
            if (typeof schema[key].type() === typeof obj[key]) {
              continue;
            }
          }
        }
        callback(null, obj);
      } else {
        callback(
          {
            message: 'Have to be object passed as argument'
          },
          null
        );
      }
    } else {
      throw new Error('Need pass arguments obj and schema');
    }
  },
  search(name, callback) {
    let matches = this.db.filter(item => {
      return Object.keys(item).some(key => {
        let value = JSON.stringify(item[key])
          .toLowerCase()
          .includes(name.toLowerCase());
        return value;
      });
    });
    callback(null, matches);
  }
};
