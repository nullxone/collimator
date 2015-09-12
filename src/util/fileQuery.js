'use strict';

import {resolve}   from 'path';
import {promisify} from 'bluebird';
import {readFile}  from 'fs';
import callsite    from 'callsite';

const readFileP = promisify(readFile);

function fileQuery(db, file, params, resultMask) {
  var path = resolvePath(file);
  resultMask = resultMask || global.queryResult.manyOrNone;

  return readFileP(path, 'utf-8')
    .then((query) => db.query(query, params, resultMask));
}

function resolvePath(file) {
  var stack = callsite();
  var caller = stack[2];
  return resolve(caller.getFileName(), '..', file);
}

export default fileQuery;
