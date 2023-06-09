#!/bin/bash
set -e
# supervisorctl shortcut NOTE - make sure supervisord -c config/supervisord.conf is running before using this script
supervisorctl -c config/supervisord.conf $@

