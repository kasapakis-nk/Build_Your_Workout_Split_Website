# Use the official Nginx image from Docker Hub.
FROM nginx:alpine

# Remove the default Nginx html files so only your frontend is present.
RUN rm -rf /usr/share/nginx/html/*

# Copy your static files into the Nginx directory.
COPY . /usr/share/nginx/html

# Tell Docker that the container listens on port 80.
# This doesn't publish the port. I still need to do that when running the container.
EXPOSE 80

# Nginx will run automatically when the container runs, no manual start command needed.