#!/bin/bash
if [ "$(uname)" == 'Darwin' ]; then
  OS='Mac'
elif [ "$(expr substr $(uname -s) 1 5)" == 'Linux' ]; then
  OS='Linux'
else
  echo "Your platform ($(uname -a)) is not supported."
  exit 1
fi


if [ $OS == 'Linux' ]; then
cd /home
for username in *; do
    [[ -e $username ]] || continue
    cd $username
    HOME_DIR="$(pwd)"
    #filename="$HOME_DIR/log$(date +'%m%d%y-%H:%M:%S')"
    #touch $filename

    AJABA_HOME="${AJABA:$HOME_DIR/.ajaba}"
    mkdir -p /home/$username/.ajaba/assets
    cp /opt/Aysaar\ Quran\ Offline/assets/quran.db $HOME_DIR/.ajaba/assets/quran.db
    cp /opt/Aysaar\ Quran\ Offline/assets/quranSearch.db $HOME_DIR/.ajaba/assets/quranSearch.db
    sudo chown $username:$username $HOME_DIR/.ajaba/ -R
    sudo chmod 755 $HOME_DIR/.ajaba/ -R
done
fi
