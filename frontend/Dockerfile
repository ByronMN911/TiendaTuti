# frontend/Dockerfile
# Etapa 1: Construcción
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --configuration=production

# Etapa 2: Servidor Nginx
FROM nginx:alpine
# Copiamos los archivos compilados de Angular al servidor web
COPY --from=build /app/dist/tienda-tuti/browser /usr/share/nginx/html
# Copiamos una configuración básica de nginx para que funcione el enrutamiento de Angular
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]