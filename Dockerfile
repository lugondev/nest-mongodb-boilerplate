FROM node:lts
# App directory
WORKDIR /app

# App dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# Copy app source code
COPY . .

# Env setup
COPY .env.prod .env

#Expose port and begin application
EXPOSE 8080

# Start the app
CMD [ "yarn", "start"]
