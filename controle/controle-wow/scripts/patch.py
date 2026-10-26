import os,re,sys
root=os.getcwd()
def rw(p,f):
    if not os.path.exists(p):print('absent :',p);return
    s=open(p,encoding='utf-8').read();n=f(s)
    if n!=s:open(p,'w',encoding='utf-8').write(n);print('patché :',p)
    else:print('déjà ok :',p)
man=os.path.join(root,'android/app/src/main/AndroidManifest.xml')
def m(s):
    s=s.replace('android:allowBackup="true"','android:allowBackup="false"')
    if 'usesCleartextTraffic' not in s:s=s.replace('<application','<application android:usesCleartextTraffic="false"',1)
    return s
rw(man,m)
for g in ('android/app/build.gradle',):
    def b(s):
        s=re.sub(r'(release\s*\{[^}]*?)minifyEnabled\s+false',r'\1minifyEnabled true\n            shrinkResources true',s,count=1,flags=re.S)
        return s
    rw(os.path.join(root,g),b)
for d,_,fs in os.walk(os.path.join(root,'android/app/src/main/java')):
    for f in fs:
        if f=='MainActivity.java':
            def a(s):
                if 'FLAG_SECURE' in s:return s
                s=s.replace('import com.getcapacitor.BridgeActivity;','import android.os.Bundle;\nimport android.view.WindowManager;\nimport com.getcapacitor.BridgeActivity;')
                return re.sub(r'public class MainActivity extends BridgeActivity\s*\{\s*\}','public class MainActivity extends BridgeActivity {\n    @Override\n    public void onCreate(Bundle b) {\n        getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);\n        super.onCreate(b);\n    }\n}',s)
            rw(os.path.join(d,f),a)
