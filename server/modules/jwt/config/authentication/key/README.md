# create an SSH key
ssh-keygen -t rsa -b 4096 -f jwt-secret
# Don't add passphrase & generate in openssl format
openssl rsa -in jwt-secret -pubout -outform PEM -out jwt-secret.pub
# to see the contents of the jwt-secret file
cat jwt-secret
# to see the contents of the jwt-secret public file
cat jwt-secret.pub
