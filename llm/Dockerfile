# Use an appropriate base image
FROM python:3.9.6

# Set the working directory
WORKDIR /app

# Copy the application files
COPY . /app

# Install dependencies
RUN pip3 install --no-cache-dir -r requirements.txt

ENV ACCEPT_EULA=Y
RUN apt-get update -y && apt-get update 

RUN curl -fsSL https://ollama.com/install.sh | sh

RUN apt-get update

EXPOSE 8000

# Run the command on container startup
CMD ["python", "main.py" ]
