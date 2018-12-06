#!/bin/bash

CURRENT_WORKING_DIR=$(pwd)

THIS_DIR=$(dirname "$0")

KEY_FILE_NAME='jwt-secret'

KEY_FILE_NAME_PUBLIC="${KEY_FILE_NAME}.pub"

cd $THIS_DIR

echo 'Removing existing files is any...'

rm $KEY_FILE_NAME

rm $KEY_FILE_NAME_PUBLIC

echo 'Generating ssh key...'

ssh-keygen -t rsa -b 4096 -f $KEY_FILE_NAME -N '' > /dev/null

openssl rsa -in $KEY_FILE_NAME -pubout -outform PEM -out $KEY_FILE_NAME_PUBLIC > /dev/null

echo 'Done!'

cd $CURRENT_WORKING_DIR
