 #!/bin/bash
 # crea una copia de seguridad de una base de datos
 ########################
 ##### variables a editar
 #
 DB_NAME=assetcom
 BACKUP_DIR=/home/assetcom/backup/
 SQLITE_DIR=/home/assetcom/assetcom.sqlite3
 #
 ########################
 BACKUP_FILE=${BACKUP_DIR}$(date +%Y%m%d)-${DB_NAME}.sql
 # usamos dump para hacer la copia de seguridad que se guarda en BACKUP_DIR
 sqlite3 ${SQLITE_DIR} .dump > ${BACKUP_FILE}
 # usamos bzip2 para comprimir el sql
 bzip2 ${BACKUP_FILE}
