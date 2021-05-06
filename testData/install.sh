#!/usr/bin/bash

section(){
  echo ----------------------------
  echo $1
}

section Users \> Adding test user accounts
(cd users && ts-node --skip-project loadUsers.ts)

section Datastore \> add datastore settings
(cd dataStore && ./dataStore.py)

section CORS \> Whitelist localhost
(cd cors && ./cors.py)

section DataSets \> unlock datasets
(cd dataSets && ./dataSets.py)

section Approvals \> unapprove mechanisms
(ts-node --skip-project approvals/unapprove.ts)

section DataValues \> Insert duplicates
(cd dataValues && ts-node --skip-project loadDataValues.ts)