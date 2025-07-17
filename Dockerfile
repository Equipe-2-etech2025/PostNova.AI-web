FROM node:22.12.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY vite.config.js ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]