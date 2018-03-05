echo "Reading confighub settings..."

if exist "%CATALINA_BASE%/../confighub.bat" call "%CATALINA_BASE%/../confighub.bat"

if "%ALLOCATED_MEMORY%" == "" (
    echo "ALLOCATED_MEMORY is not set in confighub.bat"
    exit /b
)

if "%HTTP_PORT%" == "" (
    echo "HTTP_PORT is not set in confighub.bat"
    exit /b
)

if "%HTTPS_PORT%" == "" (
    echo "HTTPS_PORT is not set in confighub.bat"
    exit /b
)

if "%KEYSTORE_FILE%" == "" (
    echo "KEYSTORE_FILE is not set in confighub.sh - starting service using default confighub cert"
    set "KEYSTORE_FILE=cert/confighub_default.jks"
    set "KEYSTORE_ALIAS=confighub"
    set "KEYSTORE_PASSWORD=confighub"
)

echo "Reading server settings..."


rem discourage address map swapping by setting Xms and Xmx to the same value
rem http://confluence.atlassian.com/display/DOC/Garbage+Collector+Performance+Issues
set "CATALINA_OPTS=%CATALINA_OPTS% -Xms%ALLOCATED_MEMORY%"
set "CATALINA_OPTS=%CATALINA_OPTS% -Xmx%ALLOCATED_MEMORY%"

rem Server ports
set "CATALINA_OPTS=%CATALINA_OPTS% -Dport.http=%HTTP_PORT%"
set "CATALINA_OPTS=%CATALINA_OPTS% -Dport.https=%HTTPS_PORT%"

rem Timezone in which all logging will be timestamped, and all persisted timestamps
rem are recoded in.   All UI related timestamps are always converted to the browser
rem local timezone for easier viewing.
set "JAVA_OPTS=%JAVA_OPTS% -Duser.timezone=UTC"
set "JAVA_OPTS=%JAVA_OPTS% -DConfigHubEnterprise"

set "JAVA_OPTS=%JAVA_OPTS% -Dhttps.keystorefile=%KEYSTORE_FILE%"
set "JAVA_OPTS=%JAVA_OPTS% -Dhttps.keystorealias=%KEYSTORE_ALIAS%"
set "JAVA_OPTS=%JAVA_OPTS% -Dhttps.keystorepass=%KEYSTORE_PASSWORD%"
set "JAVA_OPTS=%JAVA_OPTS% -Dlog.path=%LOG_PATH%"


rem The hotspot server JVM has specific code-path optimizations
rem which yield an approximate 10% gain over the client version.
set "CATALINA_OPTS=%CATALINA_OPTS% -server"

rem Java garbage collection policy
set "CATALINA_OPTS=%CATALINA_OPTS% -XX:GCTimeRatio=9"
set "CATALINA_OPTS=%CATALINA_OPTS% -XX:MaxGCPauseMillis=200"
set "CATALINA_OPTS=%CATALINA_OPTS% -XX:PermSize=512m"
set "CATALINA_OPTS=%CATALINA_OPTS% -XX:ParallelGCThreads=50"
set "CATALINA_OPTS=%CATALINA_OPTS% -XX:ConcGCThreads=15"
set "CATALINA_OPTS=%CATALINA_OPTS% -XX:InitiatingHeapOccupancyPercent=70"
set "CATALINA_OPTS=%CATALINA_OPTS% -XX:+DisableExplicitGC"
set "CATALINA_OPTS=%CATALINA_OPTS% -XX:+UseG1GC"


rem Path to the location where all ConfigHub service logs are stored.
set CATALINA_OUT="%LOG_PATH%/server.out"