
#Copy project to Node image
FROM node:10-alpine as build-step
RUN mkdir /app
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN yarn install
COPY . /app
RUN yarn run build

#Run on nginx server
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/build /usr/share/nginx/html