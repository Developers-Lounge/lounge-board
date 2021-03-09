import { Client, Pool } from 'pg';
import { dbUrl } from 'config';

let savePoints: string[] | undefined;

export const patchPgClient = () => {
  const { connect, query } = Client.prototype;

  let existingConnection: any;
  Client.prototype.connect = async function (cb) {
    if (existingConnection) return cb(existingConnection);

    existingConnection = await connect.call(this);
    if (cb) cb();
    return existingConnection;
  };

  const poolConnect = Pool.prototype.connect;
  let existingPoolConnection: any;
  Pool.prototype.connect = async function (cb) {
    if (!existingPoolConnection)
      existingPoolConnection = await poolConnect.call(this);

    if (cb) cb(undefined, existingPoolConnection, () => {});

    return existingPoolConnection;
  };

  Client.prototype.query = function (input, params) {
    let sql = input.trim();

    if (sql.startsWith('START TRANSACTION') || sql.startsWith('BEGIN')) {
      if (savePoints) {
        const savePoint = Math.random().toString(36).substring(2, 15);
        savePoints.push(savePoint);
        sql = `SAVEPOINT "${savePoint}"`;
      } else {
        savePoints = [];
      }
    } else {
      const isCommit = sql.startsWith('COMMIT');
      const isRollback = !isCommit && sql.startsWith('ROLLBACK');
      if (isCommit || isRollback) {
        if (!savePoints) {
          throw new Error(
            `Trying to ${
              isCommit ? 'COMMIT' : 'ROLLBACK'
            } outside of transaction`,
          );
        } else {
          if (savePoints.length) {
            const savePoint = this.savePoints.pop();
            sql = `${
              isCommit ? 'RELEASE' : 'ROLLBACK TO'
            } SAVEPOINT "${savePoint}"`;
          } else {
            savePoints = undefined;
          }
        }
      }
    }

    return query.call(this, sql, params);
  };
};

export const startTransaction = (
  db = new Pool({ connectionString: dbUrl }),
) => {
  rollbackTransaction(db);
  db.query('BEGIN');
};

export const rollbackTransaction = (
  db = new Pool({ connectionString: dbUrl }),
) => {
  while (savePoints) db.query('ROLLBACK');
};
