# Build de l'application Angular
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Diffusion avec Nginx
FROM nginx:alpine
COPY --from=build /app/dist/frontend-v21/browser /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
