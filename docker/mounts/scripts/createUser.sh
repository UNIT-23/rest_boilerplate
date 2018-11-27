#!/bin/bash

cut -d: -f3 /etc/passwd | grep -i ${USER_UID} || {
    $(usermod -u ${USER_UID} "node")
    echo "Change userid for node to ${USER_UD}"
}

tail -f /dev/null
