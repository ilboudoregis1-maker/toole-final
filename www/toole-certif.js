/* TÕÕLé – compte certifié : sceau doré, carte dans le Profil, message à la personne */
(function () {
  if (window.__tcert) return; window.__tcert = 1;
  var D = document, SET = {}, T = 0, MINE = null;
  var SEL = ['#pfName', '.cname', '.c2-name', '.cd-name', '.pf-name', '.gm-name', '.sname', '.dc-n'];
  function en() { try { return localStorage.getItem('toole_lang') === 'en'; } catch (e) { return false; } }
  var TX = {
    title: function () { return en() ? 'Certified account' : 'Compte certifié'; },
    sub: function () { return en() ? 'Your account has been certified by the TÕÕLé team.' : 'Ton compte a été certifié par l’équipe TÕÕLé.'; },
    congrats: function () { return en() ? 'Congratulations!' : 'Félicitations !'; },
    gotit: function () { return en() ? 'Your account is now certified. A golden seal now appears next to your name.' : 'Ton compte est maintenant certifié. Un sceau doré apparaît désormais à côté de ton nom.'; },
    lost: function () { return en() ? 'Certification removed' : 'Certification retirée'; },
    lostTx: function () { return en() ? 'Your account is no longer certified.' : 'Ton compte n’est plus certifié.'; },
    ok: function () { return en() ? 'OK' : 'OK'; }
  };
  var SEAL = '<svg viewBox="0 0 24 24" width="15" height="15" style="flex:none;vertical-align:-2px;margin-left:4px" aria-label="Compte certifié"><path d="M12 1.8l2.6 1.9 3.2-.1 1 3 2.6 1.9-1 3 1 3-2.6 1.9-1 3-3.2-.1L12 22.2l-2.6-1.9-3.2.1-1-3-2.6-1.9 1-3-1-3 2.6-1.9 1-3 3.2.1z" fill="#f5b301"/><path d="M7.8 12.4l3 3 5.6-6" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var BIG = SEAL.replace('width="15" height="15"', 'width="34" height="34"').replace('margin-left:4px', 'margin:0');
  var st = D.createElement('style');
  st.textContent = '#tcCard{display:flex;align-items:center;gap:12px;margin:12px 0;padding:12px 14px;border-radius:16px;background:linear-gradient(135deg,#fff8e1,#ffefb8);border:1px solid #f5d76e;color:#5a4300}#tcCard b{display:block;font-size:15px}#tcCard span{font-size:12.5px;opacity:.9;line-height:1.3}' +
    '#tcModal{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;padding:24px}#tcModal .tcb{background:#fff;color:#222;border-radius:22px;padding:26px 22px;max-width:320px;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,.35)}#tcModal h3{margin:10px 0 6px;font-size:20px}#tcModal p{margin:0 0 16px;font-size:14px;line-height:1.4}#tcModal button{border:0;border-radius:20px;background:#f5b301;color:#fff;font-weight:800;padding:10px 28px;font-size:15px}';
  D.head.appendChild(st);
  function sess() { try { return JSON.parse(localStorage.getItem('toole_session')); } catch (e) { return null; } }
  function uid() { var s = sess(); return (s && s.user && s.user.id) || ''; }
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { } }
  function A() { return window.api || (typeof api === 'function' ? api : null); }
  function call(p, b) { var f = A(); return f ? f(p, { method: 'POST', body: JSON.stringify(b || {}) }) : Promise.reject(); }
  function modal(t, x) {
    if (D.getElementById('tcModal')) return;
    var m = D.createElement('div'); m.id = 'tcModal';
    m.innerHTML = '<div class="tcb">' + BIG + '<h3>' + t + '</h3><p>' + x + '</p><button type="button">' + TX.ok() + '</button></div>';
    m.querySelector('button').onclick = function () { m.remove(); };
    D.body.appendChild(m);
  }
  function mine() {
    var u = uid(), f = A(); if (!u || !f) return;
    f('/rest/v1/profiles?select=certified&id=eq.' + u).then(function (r) {
      if (!r || !r[0] || typeof r[0].certified !== 'boolean') return;
      MINE = r[0].certified; var k = 'toole_cert_' + u, seen = ls(k) === 'on';
      if (MINE && !seen) { ls(k, 'on'); modal(TX.congrats(), TX.gotit()); }
      else if (!MINE && seen) { ls(k, null); modal(TX.lost(), TX.lostTx()); }
      card();
    }).catch(function () { });
  }
  function card() {
    var p = D.getElementById('scrProfil'), c = D.getElementById('tcCard');
    if (!MINE) { if (c) c.remove(); return; }
    if (!p || c) return;
    var pf = p.querySelector('.pf'); if (!pf) return;
    c = D.createElement('div'); c.id = 'tcCard';
    c.innerHTML = BIG + '<div><b>' + TX.title() + '</b><span>' + TX.sub() + '</span></div>';
    pf.parentNode.insertBefore(c, pf.nextSibling);
  }
  function load() {
    mine();
    return call('/rest/v1/rpc/certified_pseudos', {}).then(function (a) {
      SET = {}; (a || []).forEach(function (p) { SET[String(p).trim().toLowerCase()] = 1; }); paint();
    }).catch(function () { });
  }
  function paint() {
    card();
    SEL.forEach(function (s) {
      D.querySelectorAll(s).forEach(function (el) {
        if (el.querySelector('.tcert')) return;
        var n = (el.firstChild && el.firstChild.nodeType === 3 ? el.firstChild.nodeValue : el.textContent || '').trim().toLowerCase();
        if (n && SET[n]) { var b = D.createElement('span'); b.className = 'tcert'; b.innerHTML = SEAL; el.appendChild(b); }
      });
    });
  }
  new MutationObserver(function () { clearTimeout(T); T = setTimeout(paint, 120); }).observe(D.documentElement, { childList: true, subtree: true });
  setInterval(load, 60000); D.addEventListener('visibilitychange', function () { if (!D.hidden) load(); });
  setTimeout(load, 1500);
})();
