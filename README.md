# sls-persona-service
Data Service

The MONGO_URI en var has to be set as an environmet variable

```
MONGO_URI=mongodb+srv://<username>:<password>@<domain>/<database>?retryWrites=true
```

To test it locally you can do:

```
MONGO_URI=abc yarn start
```

or

```
export MONGO_URI=abc
yarn start
```

Note: `abc` represents the connection URI
