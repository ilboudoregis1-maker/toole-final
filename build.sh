#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$(dirname "$0")"
export ANDROID_HOME=$HOME/android-sdk ANDROID_SDK_ROOT=$HOME/android-sdk
echo "sdk.dir=$ANDROID_HOME" > android/local.properties
[ -d node_modules ] || npm i
npx cap sync android
sed -i "s#__CLE__#$(cat $HOME/.toole_key)#" android/app/src/main/assets/public/toole-crypt.js
if grep -q __CLE__ android/app/src/main/assets/public/toole-crypt.js; then echo "Cle non injectee. Arret."; exit 1; fi
[ -n "$KEY_ALIAS" ] || read -p "Alias de la cle : " KEY_ALIAS
[ -n "$KEY_PASS" ] || { read -s -p "Mot de passe de la cle : " KEY_PASS; echo; }
export KEY_ALIAS KEY_PASS
cd android
./gradlew assembleRelease --no-daemon -Dorg.gradle.jvmargs=-Xmx1536m -Pandroid.aapt2FromMavenOverride=$PREFIX/bin/aapt2
APK=$(ls app/build/outputs/apk/release/*.apk | head -1)
D=$HOME/storage/downloads; [ -d "$D" ] || D=$HOME
cp "$APK" "$D/TOOLE-$(date +%H%M).apk"
echo "APK pret dans : $D"
