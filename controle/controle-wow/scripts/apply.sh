#!/bin/sh
# À lancer depuis la racine du dépôt Contrôle :  sh controle-wow/scripts/apply.sh
P=$(dirname "$0")/..
set -e
mkdir -p www && cp -r "$P"/www/. www/
R=android/app/src/main/res
for d in mdpi hdpi xhdpi xxhdpi xxxhdpi; do
  mkdir -p $R/mipmap-$d
  cp "$P"/icons/mipmap-$d/ic_launcher.png "$P"/icons/mipmap-$d/ic_launcher_round.png $R/mipmap-$d/
  rm -f $R/mipmap-$d/ic_launcher_foreground.png
done
rm -rf $R/mipmap-anydpi-v26 $R/drawable-v24/ic_launcher_foreground.xml $R/drawable/ic_launcher_background.xml
python3 "$P"/scripts/patch.py
echo "OK : interface, icône et durcissement appliqués."
