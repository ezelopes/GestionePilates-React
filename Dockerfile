FROM node:14.17

WORKDIR /app

COPY package*.json ./

RUN npm install

# Modify below command to copy only necessary files!
COPY . .

ENV PORT=8000

EXPOSE 8000

CMD [ "npm",  "run", "start" ]