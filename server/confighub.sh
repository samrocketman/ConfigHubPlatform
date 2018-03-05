# Memory assigned to the ConfigHub service.  It is recommended to assign 4g or more.
export ALLOCATED_MEMORY=4g

# HTTP and HTTPs ports
export HTTP_PORT=80
export HTTPS_PORT=443

# Path to the location where all ConfigHub service logs are stored.
export LOG_PATH=/var/log/confighub

# Specify an override to the default self-signed certificate/keystore.
export KEYSTORE_FILE=cert/confighub_default.jks
export KEYSTORE_ALIAS=confighub
export KEYSTORE_PASSWORD=confighub
