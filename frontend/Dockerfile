FROM node:20-alpine AS builder


WORKDIR /app


COPY package*.json ./

RUN npm ci


COPY .env.production .env.production


COPY . .


ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
ENV REACT_APP_API_URL=http://35.154.211.147:5000
RUN npm run build


FROM nginx:alpine


COPY nginx.conf /etc/nginx/nginx.conf


COPY --from=builder /app/build /usr/share/nginx/html


EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]