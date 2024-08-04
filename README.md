npm init -y

npm i express

npm i @types/express typescript ts-node-dev rimraf --save-dev

<!-- ts-node-dev
restarts the server automatically when we make changes -->

<!-- rimraf
will be used to delete previous build files to avoid stale ones. This is considered best practice when working with Typescript. -->

<!-- --save-dev
indica che questi pacchetti sono dipendenze di sviluppo e verranno aggiunti alla sezione "devDependencies" del file package.json.   -->

npx tsc --init <!-- viene utilizzato per inizializzare un progetto TypeScript creando un file di configurazione tsconfig.json. -->

<!-- Edit the following compilerOptions in the tsconfig file -->

"target": "es2016"
"rootDir": "./src"
"outDir": "./dist"

mkdir src
touch index.ts

<!-- Open the package.json file and add this script: -->

"scripts": {
"dev": "ts-node-dev --poll ./src/index.ts",
"build": "rimraf ./dist && tsc",
"start": "npm run build && node dist/index.js"
},

<!-- The dev command runs the code in the development environment, while the build and start commands will be useful in the production environment. The --poll flag appended to ts-node-dev continuously monitors files for changes, ensuring automatic server restarts, which is especially beneficial in a containerized environment. -->

<!-- Now we are through with the development setup. You can start the server by running: -->

npm run dev

<!-- To build the image and start the container in the development environment, run the following command in your terminal: -->

docker-compose -f docker-compose.dev.yml up

<!-- To start the container in the production environment, run the following in the terminal: -->

docker-compose -f docker-compose.prod.yml up

<!-- Suppose you make changes in your development environment that you’d want to reflect in the production container, you can rebuild the production image by appending a --build flag to the start command. -->

docker-compose -f docker-compose.prod.yml up --build

<!-- To view all images on your system, run: -->

docker images

<!-- To view the running instances, run: -->

docker ps

<!-- To stop the container, run: -->

docker-compose -f docker-compose.dev.yml down
