FROM node:22
COPY . .
RUN npm ci
RUN DATABASE_URL=file:dev.db npx prisma db push
EXPOSE 3000
CMD node ./server.mjs
