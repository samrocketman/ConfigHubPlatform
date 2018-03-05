echo "Reading confighub settings..."

# Check for application specific parameters at startup
if [ -r "$CATALINA_BASE/../confighub.sh" ]; then
  . "$CATALINA_BASE/../confighub.sh"
fi

if [ -z ${ALLOCATED_MEMORY+x} ];
    then echo "ALLOCATED_MEMORY is not set in confighub.sh"; exit 1;
fi

if [ -z ${HTTP_PORT+x} ];
    then echo "HTTP_PORT is not set in confighub.sh"; exit 1;
fi

if [ -z ${HTTPS_PORT+x} ];
    then echo "HTTPS_PORT is not set in confighub.sh"; exit 1;
fi

if [ -z ${KEYSTORE_FILE+x} ]; then
    echo "KEYSTORE_FILE is not set in confighub.sh - starting service using default confighub cert"
    export KEYSTORE_FILE=cert/confighub_default.jks
    export KEYSTORE_ALIAS=confighub
    export KEYSTORE_PASSWORD=confighub
fi

echo "Reading server settings..."

# discourage address map swapping by setting Xms and Xmx to the same value
# http://confluence.atlassian.com/display/DOC/Garbage+Collector+Performance+Issues
export CATALINA_OPTS="$CATALINA_OPTS -Xms$ALLOCATED_MEMORY"
export CATALINA_OPTS="$CATALINA_OPTS -Xmx$ALLOCATED_MEMORY"

# Server ports
export CATALINA_OPTS="$CATALINA_OPTS -Dport.http=$HTTP_PORT"
export CATALINA_OPTS="$CATALINA_OPTS -Dport.https=$HTTPS_PORT"

# Timezone in which all logging will be timestamped, and all persisted timestamps
# are recoded in.   All UI related timestamps are always converted to the browser
# local timezone for easier viewing.
export JAVA_OPTS="$JAVA_OPTS -Duser.timezone=UTC"
export JAVA_OPTS="$JAVA_OPTS -DConfigHubEnterprise"

export JAVA_OPTS="$JAVA_OPTS -Dhttps.keystorefile=$KEYSTORE_FILE"
export JAVA_OPTS="$JAVA_OPTS -Dhttps.keystorealias=$KEYSTORE_ALIAS"
export JAVA_OPTS="$JAVA_OPTS -Dhttps.keystorepass=$KEYSTORE_PASSWORD"
export JAVA_OPTS="$JAVA_OPTS -Dlog.path=$LOG_PATH"


# The hotspot server JVM has specific code-path optimizations
# which yield an approximate 10% gain over the client version.
export CATALINA_OPTS="$CATALINA_OPTS -server"

# Java garbage collection policy
export CATALINA_OPTS="$CATALINA_OPTS -XX:GCTimeRatio=9"
export CATALINA_OPTS="$CATALINA_OPTS -XX:MaxGCPauseMillis=200"
export CATALINA_OPTS="$CATALINA_OPTS -XX:PermSize=512m"
export CATALINA_OPTS="$CATALINA_OPTS -XX:ParallelGCThreads=50"
export CATALINA_OPTS="$CATALINA_OPTS -XX:ConcGCThreads=15"
export CATALINA_OPTS="$CATALINA_OPTS -XX:InitiatingHeapOccupancyPercent=70"
export CATALINA_OPTS="$CATALINA_OPTS -XX:+DisableExplicitGC"
export CATALINA_OPTS="$CATALINA_OPTS -XX:+UseG1GC"


# Path to the location where all ConfigHub service logs are stored.
mkdir -p $LOG_PATH
export CATALINA_OUT="$LOG_PATH/server.out"
