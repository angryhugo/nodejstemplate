#! /bin/bash

PORT=8056

case $1 in
    start)
        npm i
        npm i sequelize
        node ./app/app.js
    ;;
    debug)
        npm i
        npm i sequelize
        node --debug ./app/app.js
    ;;
    -help|*)
        echo "Params: {start | debug | -help}"
        exit 1
    ;;
esac