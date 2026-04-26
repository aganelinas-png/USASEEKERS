// SpotSeekers USA — Cloudflare Worker

const GITHUB_HTML_PROD = 'https://raw.githubusercontent.com/aganelinas-png/USASEEKERS/main/index.html';

const ADMIN_SECRET_PLACEHOLDER = `window._adminSecret='ADMIN_SECRET_PLACEHOLDER';`;

const FIREBASE_CONFIG_PLACEHOLDER = `const firebaseConfig={
  apiKey:"FIREBASE_API_KEY_PLACEHOLDER",
  authDomain:"FIREBASE_AUTH_DOMAIN_PLACEHOLDER",
  projectId:"FIREBASE_PROJECT_ID_PLACEHOLDER",
  storageBucket:"FIREBASE_STORAGE_BUCKET_PLACEHOLDER",
  messagingSenderId:"FIREBASE_MESSAGING_SENDER_ID_PLACEHOLDER",
  appId:"FIREBASE_APP_ID_PLACEHOLDER"
};`;

const ASSETLINKS = JSON.stringify([{
  relation: ['delegate_permission/common.handle_all_urls'],
  target: {
    namespace: 'android_app',
    package_name: 'com.spotseekers.app',
    sha256_cert_fingerprints: [
      'E0:8D:FB:97:13:CF:98:F1:B2:58:67:67:9C:DF:74:F2:05:49:57:9F:64:0F:77:E5:39:E5:DF:EE:31:29:F1:EA',
      'E7:28:C9:61:E0:A5:E8:12:8F:A7:AF:B3:EA:09:C3:1A:FC:9F:0C:B3:89:03:A9:F5:AE:65:04:30:C9:4E:4E:ED:35'
    ]
  }
}]);

const PRIVACY_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Privacy Policy — SpotSeekers</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',system-ui,sans-serif;background:#0e0c09;color:#e8e0d0;padding:40px 20px;line-height:1.7}
  .wrap{max-width:720px;margin:0 auto}
  h1{font-size:1.8rem;color:#c9a84c;margin-bottom:6px}
  h2{font-size:1.1rem;color:#c9a84c;margin:28px 0 8px}
  p,li{font-size:.95rem;color:#c0b8a8;margin-bottom:8px}
  ul{padding-left:20px;margin-bottom:8px}
  .updated{font-size:.8rem;color:#6a6050;margin-bottom:32px}
  a{color:#c9a84c}
  hr{border:none;border-top:1px solid #2e2a20;margin:32px 0}
  .footer{font-size:.75rem;color:#4a4538;text-align:center;margin-top:32px}
</style>
</head>
<body>
<div class="wrap">
  <h1>🗺 SpotSeekers</h1>
  <div class="updated">Privacy Policy · Last updated: April 2026</div>

  <h2>1. Who We Are</h2>
  <p>SpotSeekers is a location discovery and gamification app for the United States, developed by an independent developer. Our website is <a href="https://www.spotseekers.net">www.spotseekers.net</a>.</p>

  <h2>2. What We Collect</h2>
  <ul>
    <li><strong>Email address</strong> — used for account login only</li>
    <li><strong>Username</strong> — chosen by you, displayed on the public leaderboard</li>
    <li><strong>Game progress</strong> — found spots, XP points, streaks, badges — saved to our database so your progress is preserved across devices</li>
    <li><strong>Location (GPS)</strong> — accessed only when you tap "Check in" to verify you are physically near a spot. Your location is <strong>never stored or shared</strong></li>
  </ul>

  <h2>3. What We Do NOT Collect</h2>
  <ul>
    <li>We do not sell your data to anyone</li>
    <li>We do not use your data for advertising</li>
    <li>We do not track your location in the background</li>
    <li>We do not collect payment information</li>
    <li>We do not collect device identifiers beyond what Firebase requires</li>
  </ul>

  <h2>4. Leaderboard Visibility</h2>
  <p>Your username, found spot count, XP, and streak are visible to other users on the public leaderboard. If you prefer not to appear there, you can use a pseudonym as your username.</p>

  <h2>5. Third Party Services</h2>
  <ul>
    <li><strong>Firebase (Google)</strong> — authentication and data storage. Subject to <a href="https://policies.google.com/privacy" target="_blank">Google's Privacy Policy</a></li>
    <li><strong>Cloudflare</strong> — hosting and edge delivery. Subject to <a href="https://www.cloudflare.com/privacypolicy/" target="_blank">Cloudflare's Privacy Policy</a></li>
  </ul>

  <h2>6. Children's Privacy</h2>
  <p>SpotSeekers is not directed at children under 13. We do not knowingly collect personal information from anyone under 13 years of age.</p>

  <h2>7. Data Deletion</h2>
  <p>You may request deletion of your account and all associated data at any time by contacting us. We will delete your data within 30 days of a verified request.</p>

  <h2>8. Changes to This Policy</h2>
  <p>We may update this policy as the app grows. The "last updated" date at the top reflects the most recent revision.</p>

  <h2>9. Contact</h2>
  <p>Questions or data deletion requests: <a href="mailto:privacy@spotseekers.net">privacy@spotseekers.net</a></p>

  <hr>
  <div class="footer">© 2026 SpotSeekers · <a href="https://www.spotseekers.net">www.spotseekers.net</a></div>
</div>
</body>
</html>`;

const DELETE_ACCOUNT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Delete Account — SpotSeekers</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',system-ui,sans-serif;background:#0e0c09;color:#e8e0d0;padding:40px 20px;line-height:1.7}
  .wrap{max-width:600px;margin:0 auto}
  h1{font-size:1.8rem;color:#c9a84c;margin-bottom:6px}
  h2{font-size:1.1rem;color:#c9a84c;margin:28px 0 8px}
  p,li{font-size:.95rem;color:#c0b8a8;margin-bottom:8px}
  ul{padding-left:20px;margin-bottom:16px}
  .updated{font-size:.8rem;color:#6a6050;margin-bottom:32px}
  .card{background:#1a1710;border:1px solid #2e2a20;border-radius:12px;padding:24px;margin-top:24px}
  a{color:#c9a84c}
  hr{border:none;border-top:1px solid #2e2a20;margin:32px 0}
  .footer{font-size:.75rem;color:#4a4538;text-align:center;margin-top:32px}
</style>
</head>
<body>
<div class="wrap">
  <h1>🗺 SpotSeekers</h1>
  <div class="updated">Account Deletion · spotseekers.net</div>

  <h2>Delete Your Account</h2>
  <p>You can request deletion of your SpotSeekers account and all associated data at any time.</p>
  <p>The following data will be permanently deleted:</p>
  <ul>
    <li>Your email address and login credentials</li>
    <li>Your username</li>
    <li>Your game progress — found spots, XP, streaks, badges</li>
  </ul>
  <p>Deletion is permanent and cannot be undone. Your leaderboard entry will also be removed.</p>
  <div class="card">
    <p>To request deletion, send an email from your registered account address to: <a href="mailto:privacy@spotseekers.net">privacy@spotseekers.net</a></p>
    <p style="margin-top:12px;font-size:.8rem;color:#6a6050">We will process your request within 30 days.</p>
  </div>

  <hr>
  <div class="footer">© 2026 SpotSeekers · <a href="https://www.spotseekers.net">www.spotseekers.net</a> · <a href="/privacy">Privacy Policy</a></div>
</div>
</body>
</html>`;

const DOWNLOAD_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Get the App — SpotSeekers</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0e0c09;
  --surf:#141210;
  --surf2:#1a1710;
  --bdr:#2e2a20;
  --gold:#c9a84c;
  --gold2:#e8c96a;
  --txt:#e8e0d0;
  --td:#9a9080;
  --tm:#6a6050;
}
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--txt);min-height:100vh;padding:0;overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");pointer-events:none;z-index:0;opacity:.4}
.wrap{max-width:520px;margin:0 auto;padding:48px 20px 60px;position:relative;z-index:1}
.header{text-align:center;margin-bottom:48px}
.logo-glyph{font-size:2.8rem;margin-bottom:12px;display:block;animation:float 4s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
.logo-name{font-family:'Playfair Display',serif;font-size:2rem;color:var(--gold);letter-spacing:.01em;margin-bottom:6px}
.logo-sub{font-family:'DM Mono',monospace;font-size:.72rem;color:var(--tm);letter-spacing:.08em;text-transform:uppercase}
.header-desc{margin-top:16px;font-size:.95rem;color:var(--td);line-height:1.6;max-width:360px;margin-left:auto;margin-right:auto}
.divider{display:flex;align-items:center;gap:12px;margin-bottom:24px}
.divider::before,.divider::after{content:'';flex:1;height:1px;background:var(--bdr)}
.divider-text{font-family:'DM Mono',monospace;font-size:.65rem;color:var(--tm);letter-spacing:.1em;text-transform:uppercase;white-space:nowrap}
.cards{display:flex;flex-direction:column;gap:12px;margin-bottom:32px}
.card{background:var(--surf);border:1px solid var(--bdr);border-radius:16px;overflow:hidden;transition:border-color .2s,transform .15s;cursor:pointer}
.card:hover{border-color:rgba(201,168,76,.4);transform:translateY(-1px)}
.card.disabled{opacity:.55;cursor:default}
.card.disabled:hover{border-color:var(--bdr);transform:none}
.card-header{display:flex;align-items:center;gap:14px;padding:18px 20px;user-select:none}
.card-icon{font-size:1.8rem;width:44px;text-align:center;flex-shrink:0}
.card-info{flex:1;min-width:0}
.card-title{font-size:1rem;font-weight:600;color:var(--txt);margin-bottom:2px}
.card-meta{font-family:'DM Mono',monospace;font-size:.68rem;color:var(--td)}
.card-badge{font-family:'DM Mono',monospace;font-size:.6rem;font-weight:500;padding:3px 9px;border-radius:20px;white-space:nowrap;flex-shrink:0}
.badge-rec{background:rgba(201,168,76,.15);color:var(--gold);border:1px solid rgba(201,168,76,.3)}
.badge-soon{background:rgba(100,90,70,.15);color:var(--tm);border:1px solid rgba(100,90,70,.3)}
.card-chevron{color:var(--tm);font-size:1rem;transition:transform .25s;flex-shrink:0}
.card.open .card-chevron{transform:rotate(90deg)}
.card-body{display:none;border-top:1px solid var(--bdr);padding:20px;background:var(--surf2)}
.card.open .card-body{display:block}
.steps{display:flex;flex-direction:column;gap:16px;margin-bottom:20px}
.step{display:flex;gap:14px;align-items:flex-start}
.step-num{width:26px;height:26px;border-radius:50%;background:rgba(201,168,76,.12);border:1px solid rgba(201,168,76,.3);color:var(--gold);font-family:'DM Mono',monospace;font-size:.72rem;font-weight:500;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
.step-text{font-size:.88rem;color:var(--td);line-height:1.55}
.step-text strong{color:var(--txt);font-weight:600}
.action-btn{display:block;width:100%;background:var(--gold);color:#0e0c09;border:none;border-radius:12px;padding:14px 20px;font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:700;text-align:center;text-decoration:none;cursor:pointer;transition:background .2s,transform .15s;letter-spacing:.01em}
.action-btn:hover{background:var(--gold2);transform:scale(1.01)}
.action-btn:active{transform:scale(.98)}
.footer{text-align:center;padding-top:32px;border-top:1px solid var(--bdr)}
.footer a{color:var(--gold);text-decoration:none;font-size:.85rem;font-weight:500;transition:opacity .2s}
.footer a:hover{opacity:.7}
.footer-copy{font-family:'DM Mono',monospace;font-size:.65rem;color:var(--tm);margin-top:10px}
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <span class="logo-glyph">🗺</span>
    <div class="logo-name">SpotSeekers</div>
    <div class="logo-sub">Discover · Collect · Explore</div>
    <p class="header-desc">Choose how you want to use SpotSeekers — as an app or directly in your browser.</p>
  </div>

  <div class="divider"><span class="divider-text">Choose your device</span></div>

  <div class="cards">

    <!-- Android PWA -->
    <div class="card" id="card-android-pwa" onclick="toggleCard('android-pwa')">
      <div class="card-header">
        <div class="card-icon">🤖</div>
        <div class="card-info">
          <div class="card-title">Android — browser as app</div>
          <div class="card-meta">Chrome · Add to home screen</div>
        </div>
        <span class="card-badge badge-rec">Recommended</span>
        <span class="card-chevron">›</span>
      </div>
      <div class="card-body">
        <div class="steps">
          <div class="step"><div class="step-num">1</div><div class="step-text">Open <strong>Chrome</strong> and go to <strong>spotseekers.net</strong></div></div>
          <div class="step"><div class="step-num">2</div><div class="step-text">Tap the <strong>⋮ menu</strong> (three dots) in the top right</div></div>
          <div class="step"><div class="step-num">3</div><div class="step-text">Select <strong>"Add to Home screen"</strong></div></div>
          <div class="step"><div class="step-num">4</div><div class="step-text">Confirm — SpotSeekers will appear as an app on your phone 🎉</div></div>
        </div>
        <a class="action-btn" href="https://www.spotseekers.net" target="_blank">Open SpotSeekers →</a>
      </div>
    </div>

    <!-- iPhone PWA -->
    <div class="card" id="card-iphone-pwa" onclick="toggleCard('iphone-pwa')">
      <div class="card-header">
        <div class="card-icon">🍎</div>
        <div class="card-info">
          <div class="card-title">iPhone — browser as app</div>
          <div class="card-meta">Safari · Add to home screen</div>
        </div>
        <span class="card-chevron">›</span>
      </div>
      <div class="card-body">
        <div class="steps">
          <div class="step"><div class="step-num">1</div><div class="step-text">Open <strong>Safari</strong> and go to <strong>spotseekers.net</strong></div></div>
          <div class="step"><div class="step-num">2</div><div class="step-text">Tap the <strong>Share</strong> button (□↑) at the bottom center</div></div>
          <div class="step"><div class="step-num">3</div><div class="step-text">Scroll down and select <strong>"Add to Home Screen"</strong></div></div>
          <div class="step"><div class="step-num">4</div><div class="step-text">Confirm — SpotSeekers will appear as an app on your iPhone 🎉</div></div>
        </div>
        <a class="action-btn" href="https://www.spotseekers.net" target="_blank">Open SpotSeekers →</a>
      </div>
    </div>

    <!-- iOS native — coming soon -->
    <div class="card disabled" id="card-ios">
      <div class="card-header">
        <div class="card-icon" style="opacity:.5">🍏</div>
        <div class="card-info">
          <div class="card-title" style="color:var(--td)">iPhone — native app</div>
          <div class="card-meta">App Store</div>
        </div>
        <span class="card-badge badge-soon">Coming soon</span>
      </div>
    </div>

    <!-- Android native — coming soon -->
    <div class="card disabled" id="card-android-native">
      <div class="card-header">
        <div class="card-icon" style="opacity:.5">📦</div>
        <div class="card-info">
          <div class="card-title" style="color:var(--td)">Android — native app</div>
          <div class="card-meta">Google Play</div>
        </div>
        <span class="card-badge badge-soon">Coming soon</span>
      </div>
    </div>

  </div>

  <div class="footer">
    <a href="https://www.spotseekers.net">← Back to SpotSeekers</a>
    <div class="footer-copy">© 2026 SpotSeekers · <a href="/privacy" style="color:var(--tm);font-size:.65rem">Privacy Policy</a></div>
  </div>
</div>
<script>
function toggleCard(id) {
  const card = document.getElementById('card-' + id);
  if (!card || card.classList.contains('disabled')) return;
  const isOpen = card.classList.contains('open');
  document.querySelectorAll('.card.open').forEach(c => c.classList.remove('open'));
  if (!isOpen) card.classList.add('open');
}
</script>
</body>
</html>`;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Secret',
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const adminSecret = env.ADMIN_SECRET || 'usa2026';

    // ── OPTIONS preflight ──
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // ── GET /.well-known/assetlinks.json — TWA verification ──
    if (url.pathname === '/.well-known/assetlinks.json') {
      return new Response(ASSETLINKS, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // ── GET /privacy ──
    if (url.pathname === '/privacy') {
      return new Response(PRIVACY_HTML, {
        headers: {
          'Content-Type': 'text/html;charset=utf-8',
          'Cache-Control': 'public, max-age=86400'
        }
      });
    }

    // ── GET /delete-account ──
    if (url.pathname === '/delete-account') {
      return new Response(DELETE_ACCOUNT_HTML, {
        headers: {
          'Content-Type': 'text/html;charset=utf-8',
          'Cache-Control': 'public, max-age=86400'
        }
      });
    }

    // ── GET /download ──
    if (url.pathname === '/download') {
      return new Response(DOWNLOAD_HTML, {
        headers: {
          'Content-Type': 'text/html;charset=utf-8',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }

    // ── GET /api/spots/:pack ──
    // pack = skeleton | names | free | paid
    const spotsMatch = url.pathname.match(/^\/api\/spots\/(skeleton|names|free|paid)$/);
    if (spotsMatch) {
      const pack = spotsMatch[1];
      const kvKey = `spots_usa_${pack}`;
      const spots = await env.SPOTS_KV.get(kvKey);
      if (!spots) {
        return new Response(JSON.stringify({ error: `Pack "${pack}" not found in KV — upload needed` }), {
          status: 503,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }
      return new Response(spots, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // ── GET /api/spots/status ──
    if (url.pathname === '/api/spots/status') {
      const packs = ['skeleton', 'names', 'free', 'paid'];
      const results = {};
      for (const pack of packs) {
        const data = await env.SPOTS_KV.get(`spots_usa_${pack}`);
        if (data) {
          const arr = JSON.parse(data);
          results[pack] = { cached: true, count: arr.length };
        } else {
          results[pack] = { cached: false };
        }
      }
      return new Response(JSON.stringify(results), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // ── POST /api/admin/rebuild?pack=skeleton|names|free|paid ──
    if (url.pathname === '/api/admin/rebuild' && request.method === 'POST') {
      const secret = request.headers.get('X-Admin-Secret');
      if (secret !== adminSecret) {
        return new Response('Forbidden', { status: 403 });
      }
      const pack = (url.searchParams.get('pack') || '').toLowerCase();
      if (!['skeleton', 'names', 'free', 'paid'].includes(pack)) {
        return new Response(JSON.stringify({ error: 'Invalid pack. Use: skeleton | names | free | paid' }), {
          status: 400, headers: { 'Content-Type': 'application/json' }
        });
      }
      try {
        const body = await request.text();
        const parsed = JSON.parse(body);
        if (!Array.isArray(parsed)) throw new Error('Expected JSON array');
        const kvKey = `spots_usa_${pack}`;
        await env.SPOTS_KV.put(kvKey, body);
        return new Response(JSON.stringify({ ok: true, pack, kvKey, count: parsed.length }), {
          headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
        });
      } catch(e) {
        return new Response(JSON.stringify({ error: e.message }), {
          status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
        });
      }
    }

    // ── Default — serve index.html from GitHub ──
    const htmlRes = await fetch(GITHUB_HTML_PROD, {
      cf: { cacheTtl: 60, cacheEverything: true }
    });
    let html = await htmlRes.text();

    // Inject Firebase config from environment variable
    if (env.FIREBASE_CONFIG) {
      const cfg = JSON.parse(env.FIREBASE_CONFIG);
      const injected = `const firebaseConfig={
  apiKey:"${cfg.apiKey}",
  authDomain:"${cfg.authDomain}",
  projectId:"${cfg.projectId}",
  storageBucket:"${cfg.storageBucket}",
  messagingSenderId:"${cfg.messagingSenderId}",
  appId:"${cfg.appId}"
};`;
      html = html.replace(FIREBASE_CONFIG_PLACEHOLDER, injected);
    }

    // Inject admin secret
    html = html.replace(ADMIN_SECRET_PLACEHOLDER, `window._adminSecret='${adminSecret}';`);

    return new Response(html, {
      headers: { 'Content-Type': 'text/html;charset=utf-8' }
    });
  }
};
