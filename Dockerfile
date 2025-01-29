FROM node:22-alpine3.19 AS BUILD
WORKDIR /app
ARG BUILD_CONFIGURATION=Release
WORKDIR /app

# COPY package.json package-lock.json ./
COPY ./package*.json .
RUN npm install

COPY . .
#RUN npm cache clean --force
#RUN npm run build --prod
RUN npm run build-docker

FROM nginx:1.27-alpine AS DEPLOY
COPY ./nginx.conf  /etc/nginx/conf.d/default.conf

# /usr/share/nginx/html from root nginx.conf
COPY --from=BUILD /app/dist/contact-book-site/browser /usr/share/nginx/html
EXPOSE 8083

#execute nginx daemon off to connect at container when nginx stop container stop
CMD ["nginx", "-g", "daemon off;"]