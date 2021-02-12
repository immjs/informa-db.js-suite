// dis.www.APIs['/conn'] =
// (qs, body, opts) => efficiency.if(opts.req.type === 'POST')(() => '400 Bad Request')(() => '')();

const fs = require('fs');

/* const efficiency = {
  if: (bool) => (truthy) => (falsy) => [falsy, truthy][bool],
}; */

const { DbUtils, Db } = require('informa-db.js');

class DbSuite extends Db {
  constructor(path, settings = {}) {
    super(path, settings);
    return (async (dis) => {
      if (!settings.features) settings.features = {};
      if (settings.features.multiInstancing) {
        dis.runId = Date.now();
        dis.fetch = require('node-fetch');
        try {
          dis.connDetails = await dis.fetch('http://localhost:13961/conn', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ runId: dis.runId, file: path }),
          });
        } catch (err) {
          if (err.message.includes('ECONNREFUSED')) {
            dis.www = require('webwebweb');
            dis.states = {};
            dis.www.APIs['/conn'] = (qs, body, opts) => ({
              POST: () => ([
                () => '400 Bad Request',
                () => ([
                  () => '400 Bad Request',
                  () => ([
                    () => '400 Bad Request',
                    () => '200 Ok',
                  ][+!!body.file])(),
                ][+!!body.runId])(),
              ][+!!body])(),
            }[opts.req.method] || (() => null))();
            dis.www.APIs['/lock'] = (qs, body, opts) => ({
              POST: () => ([
                () => '400 Bad Request',
                () => ([
                  () => '400 Bad Request',
                  () => ([
                    () => '400 Bad Request',
                    () => {
                      
                    },
                  ][+!!body.file])(),
                ][+!!body.runId])(),
              ][+!!body])(),
            }[opts.req.method] || (() => null))();
            dis.www.APIs['/isLocked'] = (qs, body, opts) => ({
              POST: () => ([
                () => '400 Bad Request',
                () => ([
                  () => '400 Bad Request',
                  () => {
                    return 
                  },
                ][+!!body.file])(),
              ][+!!body])(),
            }[opts.req.method] || (() => null))();
          }
        }
      }
      return dis;
    })(this);
  }

  /**
   * async Updates the file/db from this.readOnlyValue
   * @returns {any}  - The json file
   */
  update() {
    fs.writeFileSync(this.path, JSON.stringify(this.readOnlyValue, null, this.saveSpace ? null : '\t'));
    return this.readOnlyValue;
  }

  /**
   * @type {any}
   * @returns {true}
   */
  set value(setTo) {
    this.readOnlyValue = setTo;
    if (this.saveOnChange) {
      this.update();
    }
    return true;
  }

  /**
   * @type {any}
   * @returns {true}
   */
  get value() {
    return this.genProxy(this.readOnlyValue);
  }
}

module.exports = { DbSuite, DbUtils };
