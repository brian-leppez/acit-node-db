/* @flow */

import { DataSource } from 'loopback-datasource-juggler';

import DASHDB from 'loopback-connector-dashdb';

import config from '../../config';

const vcap = process.env.VCAP_SERVICES;
let dbCredentials;

// check if we can connect to the db on the cloud
const hasConnect = (vcapServices): Object =>
  vcapServices && vcapServices['dashDB For Transactions'];

if (hasConnect(vcap)) {
  // we are running on the cloud so grab credentials from vcap
  const dbCredTemp = vcap['dashDB For Transactions'][0].credentials;

  // format credentials for loopback
  dbCredentials = {
    username: dbCredTemp.username,
    password: dbCredTemp.password,
    hostname: dbCredTemp.hostname,
    port: dbCredTemp.port,
    database: dbCredTemp.db,
  };
} else {
  // we are most likely running locally, so manually put in credentials
  dbCredentials = {
    username: config.database.dashdb.username,
    password: config.database.dashdb.password,
    hostname: config.database.dashdb.hostname,
    port: config.database.dashdb.port,
    database: config.database.dashdb.database,
  };
}

const db = new DataSource(DASHDB, dbCredentials);

// define all tables in db and their CRUD functions

// create client account schema
const userAccounts = db.define('USER_ACCOUNTS', {
  USER_ID: { type: String, id: true },
  NAME: { type: String },
  EMAIL: { type: String },
  ADDRESS: { type: String },
  CITY: { type: String },
  PHONE_NO: { type: String },
  BANK_BRANCH: { type: String },
  ACCOUNT_NO: { type: String },
  BALANCE: { type: Number },
  ACTIVATE_CARD: { type: String },
});

/*
    new_entry should be in format of :
    {
        USER_ID: {type: String, id: true}, 
        NAME: {type: String},
        EMAIL: {type: String},
        ADDRESS: {type: String},
        CITY: {type: String},
        BALANCE: {type: Number}
    }

    returns the object it enters
*/
const insertToDb = (newEntry, table): Promise<any> =>
  new Promise((resolve, reject) => {
    if (newEntry) {
      table.create(newEntry, (err, entry) => {
        if (err) {
          reject(err);
        } else {
          resolve(entry);
        }
      });
    } else {
      reject(new Error('No entry to insert.'));
    }
  });

/*
  condition should be of the format:
  {
      [field name]: [string]
  }

  there are other operators like regex, like and nlike that can be found at:
  https://github.com/strongloop/loopback-connector-dashdb


  Returns an array of objects that are each row of the table. Example:

results: [
{
  "TICKET_ID": 1026,
  "TICKET_TYPE": "test3",
  "TITLE": "test3",
  "STATUS": "test3",
  "ASSIGNED_USER": "test3",
  "DESCRIPTION": "description",
  "CLIENT_ACCOUNT_ID": "1",
  "ATTACHMENTS": "",
  "UPDATED_BY": "test3",
  "LAST_UPDATED": "2017-08-09",
  "ADMINLOG": null
},
{
  "TICKET_ID": 1027,
  "TICKET_TYPE": "test3",
  "TITLE": "test3",
  "STATUS": "test3",
  "ASSIGNED_USER": "test3",
  "DESCRIPTION": "description",
  "CLIENT_ACCOUNT_ID": "1",
  "ATTACHMENTS": "",
  "UPDATED_BY": "test3",
  "LAST_UPDATED": "2017-08-09",
  "ADMINLOG": null
}
]

*/
const selectFromDb = (condition, table): Promise<any> =>
  new Promise((resolve, reject) => {
    let conditionParam;
    if (condition) {
      conditionParam = {
        where: condition,
      };
    } else {
      // reject("No condition was given");
    }
    console.log(`Condition: ${JSON.stringify(conditionParam, null, 2)}`);
    table.find(conditionParam, (err, entries) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Entries: ${entries}`);
        resolve(entries);
      }
    });
  });

/*
  condition should be of the format:
  {
      [field name]: [string]
  }

  there are other operators like regex, like and nlike that can be found at:
  https://github.com/strongloop/loopback-connector-dashdb

  returned updates should include the updated entry as an object.
  For example:
  {
      EMAIL: [new@email.com],
      .
      .
      .
      LAST_UPDATED: [now..]
  }

*/
const updateDb = (condition, updates, table): Promise<any> =>
  new Promise((resolve, reject) => {
    if (condition) {
      table.updateAll(condition, updates, (err, entries) => {
        if (err) {
          reject(err);
        } else {
          resolve(entries);
        }
      });
    } else {
      reject(new Error('No condition was given.'));
    }
  });

/*
  DELETE function
*/

const deleteFromDb = (condition, table): Promise<any> =>
  new Promise((resolve, reject) => {
    table.destroyAll(condition, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });

exports.create_user_accounts = (newEntry: Object): Promise<any> =>
  insertToDb(newEntry, userAccounts);

exports.select_user_accounts = (condition: Object): Promise<any> =>
  selectFromDb(condition, userAccounts);

exports.update_user_accounts = (
  condition: Object,
  updates: Object,
): Promise<any> => updateDb(condition, updates, userAccounts);

exports.delete_user_accounts = (condition: Object): Promise<any> =>
  deleteFromDb(condition, userAccounts);
