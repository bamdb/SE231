#!/bin/bash
#
# Run locust load test
#
#####################################################################
ARGS="$@"
HOST="${1}"
SCRIPT_NAME=`basename "$0"`
INITIAL_DELAY=1
TARGET_HOST="$HOST"
CLIENTS=2
REQUESTS=10
RUNTIME=10s
CSVFILE="./traces/test"


do_check() {

  # check hostname is not empty
  if [ "${TARGET_HOST}x" == "x" ]; then
    echo "TARGET_HOST is not set; use '-h hostname:port'"
    exit 1
  fi

  # check for locust
  if [ ! `command -v locust` ]; then
    echo "Python 'locust' package is not found!"
    exit 1
  fi

  # check locust file is present
  if [ -n "${LOCUST_FILE:+1}" ]; then
  	echo "Locust file: $LOCUST_FILE"
  else
  	LOCUST_FILE="locustfile.py" 
  	echo "Default Locust file: $LOCUST_FILE" 
  fi

  # assign csv file name by "test"+$CLIENTS
  CSVFILE="${CSVFILE}${CLIENTS}"
  echo "$CSVFILE"
}

do_exec() {
  sleep $INITIAL_DELAY

  # check if host is running
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" ${TARGET_HOST})
  if [ $STATUS -ne 200 ]&&[ $STATUS -ne 502 ]; then
      echo "${TARGET_HOST} is not accessible"
      exit 1
  fi
  
  echo "Loadbalance test"
  echo "Will run $LOCUST_FILE against $TARGET_HOST. Spawning $CLIENTS clients and $REQUESTS hatch rate within $RUNTIME."
  locust --host=http://$TARGET_HOST -f $LOCUST_FILE --csv=$CSVFILE --clients=$CLIENTS --hatch-rate=$REQUESTS --run-time=$RUNTIME --no-web
  echo "done"
}

do_usage() {
    cat >&2 <<EOF
Usage:
  ${SCRIPT_NAME} [ hostname ] OPTIONS

Options:
  -d  Delay before starting
  -h  Target host url, e.g. http://localhost/
  -c  Number of clients (default 2)
  -r  Number of requests (default 10)
  -t  Run time

Description:
  Runs a Locust load simulation against specified host.

EOF
  exit 1
}



while getopts ":d:h:c:r:t:" o; do
  case "${o}" in
    d)
        INITIAL_DELAY=${OPTARG}
        #echo $INITIAL_DELAY
        ;;
    h)
        TARGET_HOST=${OPTARG}
        #echo $TARGET_HOST
        ;;
    c)
        CLIENTS=${OPTARG:-2}
        #echo $CLIENTS
        ;;
    r)
        REQUESTS=${OPTARG:-10}
        #echo $REQUESTS
        ;;
    t)
        RUNTIME=${OPTARG:-10s}
        #echo $RUNTIME
        ;;
    *)
        do_usage
        ;;
  esac
done


do_check
do_exec
