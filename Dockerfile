FROM node:20

WORKDIR /server

COPY dist/* ./dist/
COPY dist/constants/* ./dist/constants/
COPY dist/other/* ./dist/other/
COPY dist/public/* ./dist/public/
COPY dist/public/scripts/* ./dist/public/scripts/
COPY dist/public/stylesheets/* ./dist/public/stylesheets/
COPY dist/routes/* ./dist/routes/
COPY dist/routes/types/* ./dist/routes/types/express/
COPY dist/routes/types/express/* ./dist/routes/types/express/
COPY dist/views/* ./dist/views/
COPY env/* ./env/
COPY package*.json ./

EXPOSE 3001

RUN npm install

ENTRYPOINT [ "node", "/server/dist/index.js" ]
