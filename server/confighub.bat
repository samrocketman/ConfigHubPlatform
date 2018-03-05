rem Memory assigned to the ConfigHub service.  It is recommended to assign 4g or more.
set "ALLOCATED_MEMORY=4g"

rem HTTP and HTTPs ports
set "HTTP_PORT=80"
set "HTTPS_PORT=443"

rem Path to the location where all ConfigHub service logs are stored.
set "LOG_PATH=C:/Logs/ConfigHub"

rem Specify an override to the default self-signed certificate/keystore.
set "KEYSTORE_FILE=cert/confighub_default.jks"
set "KEYSTORE_ALIAS=confighub"
set "KEYSTORE_PASSWORD=confighub"
