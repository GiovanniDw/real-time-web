(function () {
  const e = document.createElement('link').relList;
  if (e && e.supports && e.supports('modulepreload')) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) s(i);
  new MutationObserver((i) => {
    for (const r of i)
      if (r.type === 'childList')
        for (const o of r.addedNodes) o.tagName === 'LINK' && o.rel === 'modulepreload' && s(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(i) {
    const r = {};
    return (
      i.integrity && (r.integrity = i.integrity),
      i.referrerPolicy && (r.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === 'use-credentials'
        ? (r.credentials = 'include')
        : i.crossOrigin === 'anonymous'
        ? (r.credentials = 'omit')
        : (r.credentials = 'same-origin'),
      r
    );
  }
  function s(i) {
    if (i.ep) return;
    i.ep = !0;
    const r = t(i);
    fetch(i.href, r);
  }
})();
const q = (n) => document.querySelector(n),
  Ae = (n) => document.querySelectorAll(n),
  ae = q('#app');
q('.message-list');
const R = Object.create(null);
R.open = '0';
R.close = '1';
R.ping = '2';
R.pong = '3';
R.message = '4';
R.upgrade = '5';
R.noop = '6';
const F = Object.create(null);
Object.keys(R).forEach((n) => {
  F[R[n]] = n;
});
const Se = { type: 'error', data: 'parser error' },
  Ce =
    typeof Blob == 'function' ||
    (typeof Blob < 'u' && Object.prototype.toString.call(Blob) === '[object BlobConstructor]'),
  Re = typeof ArrayBuffer == 'function',
  Oe = (n) =>
    typeof ArrayBuffer.isView == 'function'
      ? ArrayBuffer.isView(n)
      : n && n.buffer instanceof ArrayBuffer,
  le = ({ type: n, data: e }, t, s) =>
    Ce && e instanceof Blob
      ? t
        ? s(e)
        : ee(e, s)
      : Re && (e instanceof ArrayBuffer || Oe(e))
      ? t
        ? s(e)
        : ee(new Blob([e]), s)
      : s(R[n] + (e || '')),
  ee = (n, e) => {
    const t = new FileReader();
    return (
      (t.onload = function () {
        const s = t.result.split(',')[1];
        e('b' + (s || ''));
      }),
      t.readAsDataURL(n)
    );
  },
  te = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
  D = typeof Uint8Array > 'u' ? [] : new Uint8Array(256);
for (let n = 0; n < te.length; n++) D[te.charCodeAt(n)] = n;
const Be = (n) => {
    let e = n.length * 0.75,
      t = n.length,
      s,
      i = 0,
      r,
      o,
      l,
      d;
    n[n.length - 1] === '=' && (e--, n[n.length - 2] === '=' && e--);
    const g = new ArrayBuffer(e),
      u = new Uint8Array(g);
    for (s = 0; s < t; s += 4)
      (r = D[n.charCodeAt(s)]),
        (o = D[n.charCodeAt(s + 1)]),
        (l = D[n.charCodeAt(s + 2)]),
        (d = D[n.charCodeAt(s + 3)]),
        (u[i++] = (r << 2) | (o >> 4)),
        (u[i++] = ((o & 15) << 4) | (l >> 2)),
        (u[i++] = ((l & 3) << 6) | (d & 63));
    return g;
  },
  xe = typeof ArrayBuffer == 'function',
  he = (n, e) => {
    if (typeof n != 'string') return { type: 'message', data: ue(n, e) };
    const t = n.charAt(0);
    return t === 'b'
      ? { type: 'message', data: Ne(n.substring(1), e) }
      : F[t]
      ? n.length > 1
        ? { type: F[t], data: n.substring(1) }
        : { type: F[t] }
      : Se;
  },
  Ne = (n, e) => {
    if (xe) {
      const t = Be(n);
      return ue(t, e);
    } else return { base64: !0, data: n };
  },
  ue = (n, e) => {
    switch (e) {
      case 'blob':
        return n instanceof ArrayBuffer ? new Blob([n]) : n;
      case 'arraybuffer':
      default:
        return n;
    }
  },
  fe = String.fromCharCode(30),
  qe = (n, e) => {
    const t = n.length,
      s = new Array(t);
    let i = 0;
    n.forEach((r, o) => {
      le(r, !1, (l) => {
        (s[o] = l), ++i === t && e(s.join(fe));
      });
    });
  },
  Pe = (n, e) => {
    const t = n.split(fe),
      s = [];
    for (let i = 0; i < t.length; i++) {
      const r = he(t[i], e);
      if ((s.push(r), r.type === 'error')) break;
    }
    return s;
  },
  de = 4;
function m(n) {
  if (n) return Me(n);
}
function Me(n) {
  for (var e in m.prototype) n[e] = m.prototype[e];
  return n;
}
m.prototype.on = m.prototype.addEventListener = function (n, e) {
  return (
    (this._callbacks = this._callbacks || {}),
    (this._callbacks['$' + n] = this._callbacks['$' + n] || []).push(e),
    this
  );
};
m.prototype.once = function (n, e) {
  function t() {
    this.off(n, t), e.apply(this, arguments);
  }
  return (t.fn = e), this.on(n, t), this;
};
m.prototype.off =
  m.prototype.removeListener =
  m.prototype.removeAllListeners =
  m.prototype.removeEventListener =
    function (n, e) {
      if (((this._callbacks = this._callbacks || {}), arguments.length == 0))
        return (this._callbacks = {}), this;
      var t = this._callbacks['$' + n];
      if (!t) return this;
      if (arguments.length == 1) return delete this._callbacks['$' + n], this;
      for (var s, i = 0; i < t.length; i++)
        if (((s = t[i]), s === e || s.fn === e)) {
          t.splice(i, 1);
          break;
        }
      return t.length === 0 && delete this._callbacks['$' + n], this;
    };
m.prototype.emit = function (n) {
  this._callbacks = this._callbacks || {};
  for (
    var e = new Array(arguments.length - 1), t = this._callbacks['$' + n], s = 1;
    s < arguments.length;
    s++
  )
    e[s - 1] = arguments[s];
  if (t) {
    t = t.slice(0);
    for (var s = 0, i = t.length; s < i; ++s) t[s].apply(this, e);
  }
  return this;
};
m.prototype.emitReserved = m.prototype.emit;
m.prototype.listeners = function (n) {
  return (this._callbacks = this._callbacks || {}), this._callbacks['$' + n] || [];
};
m.prototype.hasListeners = function (n) {
  return !!this.listeners(n).length;
};
const _ = (() =>
  typeof self < 'u' ? self : typeof window < 'u' ? window : Function('return this')())();
function pe(n, ...e) {
  return e.reduce((t, s) => (n.hasOwnProperty(s) && (t[s] = n[s]), t), {});
}
const Ie = _.setTimeout,
  De = _.clearTimeout;
function K(n, e) {
  e.useNativeTimers
    ? ((n.setTimeoutFn = Ie.bind(_)), (n.clearTimeoutFn = De.bind(_)))
    : ((n.setTimeoutFn = _.setTimeout.bind(_)), (n.clearTimeoutFn = _.clearTimeout.bind(_)));
}
const He = 1.33;
function $e(n) {
  return typeof n == 'string' ? Fe(n) : Math.ceil((n.byteLength || n.size) * He);
}
function Fe(n) {
  let e = 0,
    t = 0;
  for (let s = 0, i = n.length; s < i; s++)
    (e = n.charCodeAt(s)),
      e < 128
        ? (t += 1)
        : e < 2048
        ? (t += 2)
        : e < 55296 || e >= 57344
        ? (t += 3)
        : (s++, (t += 4));
  return t;
}
class Ve extends Error {
  constructor(e, t, s) {
    super(e), (this.description = t), (this.context = s), (this.type = 'TransportError');
  }
}
class me extends m {
  constructor(e) {
    super(),
      (this.writable = !1),
      K(this, e),
      (this.opts = e),
      (this.query = e.query),
      (this.socket = e.socket);
  }
  onError(e, t, s) {
    return super.emitReserved('error', new Ve(e, t, s)), this;
  }
  open() {
    return (this.readyState = 'opening'), this.doOpen(), this;
  }
  close() {
    return (
      (this.readyState === 'opening' || this.readyState === 'open') &&
        (this.doClose(), this.onClose()),
      this
    );
  }
  send(e) {
    this.readyState === 'open' && this.write(e);
  }
  onOpen() {
    (this.readyState = 'open'), (this.writable = !0), super.emitReserved('open');
  }
  onData(e) {
    const t = he(e, this.socket.binaryType);
    this.onPacket(t);
  }
  onPacket(e) {
    super.emitReserved('packet', e);
  }
  onClose(e) {
    (this.readyState = 'closed'), super.emitReserved('close', e);
  }
  pause(e) {}
}
const ge = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),
  z = 64,
  Ue = {};
let se = 0,
  H = 0,
  ne;
function ie(n) {
  let e = '';
  do (e = ge[n % z] + e), (n = Math.floor(n / z));
  while (n > 0);
  return e;
}
function ye() {
  const n = ie(+new Date());
  return n !== ne ? ((se = 0), (ne = n)) : n + '.' + ie(se++);
}
for (; H < z; H++) Ue[ge[H]] = H;
function ve(n) {
  let e = '';
  for (let t in n)
    n.hasOwnProperty(t) &&
      (e.length && (e += '&'), (e += encodeURIComponent(t) + '=' + encodeURIComponent(n[t])));
  return e;
}
function Ye(n) {
  let e = {},
    t = n.split('&');
  for (let s = 0, i = t.length; s < i; s++) {
    let r = t[s].split('=');
    e[decodeURIComponent(r[0])] = decodeURIComponent(r[1]);
  }
  return e;
}
let we = !1;
try {
  we = typeof XMLHttpRequest < 'u' && 'withCredentials' in new XMLHttpRequest();
} catch {}
const Ke = we;
function be(n) {
  const e = n.xdomain;
  try {
    if (typeof XMLHttpRequest < 'u' && (!e || Ke)) return new XMLHttpRequest();
  } catch {}
  if (!e)
    try {
      return new _[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
    } catch {}
}
function ze() {}
const We = (function () {
  return new be({ xdomain: !1 }).responseType != null;
})();
class Xe extends me {
  constructor(e) {
    if ((super(e), (this.polling = !1), typeof location < 'u')) {
      const s = location.protocol === 'https:';
      let i = location.port;
      i || (i = s ? '443' : '80'),
        (this.xd = (typeof location < 'u' && e.hostname !== location.hostname) || i !== e.port),
        (this.xs = e.secure !== s);
    }
    const t = e && e.forceBase64;
    this.supportsBinary = We && !t;
  }
  get name() {
    return 'polling';
  }
  doOpen() {
    this.poll();
  }
  pause(e) {
    this.readyState = 'pausing';
    const t = () => {
      (this.readyState = 'paused'), e();
    };
    if (this.polling || !this.writable) {
      let s = 0;
      this.polling &&
        (s++,
        this.once('pollComplete', function () {
          --s || t();
        })),
        this.writable ||
          (s++,
          this.once('drain', function () {
            --s || t();
          }));
    } else t();
  }
  poll() {
    (this.polling = !0), this.doPoll(), this.emitReserved('poll');
  }
  onData(e) {
    const t = (s) => {
      if ((this.readyState === 'opening' && s.type === 'open' && this.onOpen(), s.type === 'close'))
        return this.onClose({ description: 'transport closed by the server' }), !1;
      this.onPacket(s);
    };
    Pe(e, this.socket.binaryType).forEach(t),
      this.readyState !== 'closed' &&
        ((this.polling = !1),
        this.emitReserved('pollComplete'),
        this.readyState === 'open' && this.poll());
  }
  doClose() {
    const e = () => {
      this.write([{ type: 'close' }]);
    };
    this.readyState === 'open' ? e() : this.once('open', e);
  }
  write(e) {
    (this.writable = !1),
      qe(e, (t) => {
        this.doWrite(t, () => {
          (this.writable = !0), this.emitReserved('drain');
        });
      });
  }
  uri() {
    let e = this.query || {};
    const t = this.opts.secure ? 'https' : 'http';
    let s = '';
    this.opts.timestampRequests !== !1 && (e[this.opts.timestampParam] = ye()),
      !this.supportsBinary && !e.sid && (e.b64 = 1),
      this.opts.port &&
        ((t === 'https' && Number(this.opts.port) !== 443) ||
          (t === 'http' && Number(this.opts.port) !== 80)) &&
        (s = ':' + this.opts.port);
    const i = ve(e),
      r = this.opts.hostname.indexOf(':') !== -1;
    return (
      t +
      '://' +
      (r ? '[' + this.opts.hostname + ']' : this.opts.hostname) +
      s +
      this.opts.path +
      (i.length ? '?' + i : '')
    );
  }
  request(e = {}) {
    return Object.assign(e, { xd: this.xd, xs: this.xs }, this.opts), new C(this.uri(), e);
  }
  doWrite(e, t) {
    const s = this.request({ method: 'POST', data: e });
    s.on('success', t),
      s.on('error', (i, r) => {
        this.onError('xhr post error', i, r);
      });
  }
  doPoll() {
    const e = this.request();
    e.on('data', this.onData.bind(this)),
      e.on('error', (t, s) => {
        this.onError('xhr poll error', t, s);
      }),
      (this.pollXhr = e);
  }
}
class C extends m {
  constructor(e, t) {
    super(),
      K(this, t),
      (this.opts = t),
      (this.method = t.method || 'GET'),
      (this.uri = e),
      (this.async = t.async !== !1),
      (this.data = t.data !== void 0 ? t.data : null),
      this.create();
  }
  create() {
    const e = pe(
      this.opts,
      'agent',
      'pfx',
      'key',
      'passphrase',
      'cert',
      'ca',
      'ciphers',
      'rejectUnauthorized',
      'autoUnref'
    );
    (e.xdomain = !!this.opts.xd), (e.xscheme = !!this.opts.xs);
    const t = (this.xhr = new be(e));
    try {
      t.open(this.method, this.uri, this.async);
      try {
        if (this.opts.extraHeaders) {
          t.setDisableHeaderCheck && t.setDisableHeaderCheck(!0);
          for (let s in this.opts.extraHeaders)
            this.opts.extraHeaders.hasOwnProperty(s) &&
              t.setRequestHeader(s, this.opts.extraHeaders[s]);
        }
      } catch {}
      if (this.method === 'POST')
        try {
          t.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        } catch {}
      try {
        t.setRequestHeader('Accept', '*/*');
      } catch {}
      'withCredentials' in t && (t.withCredentials = this.opts.withCredentials),
        this.opts.requestTimeout && (t.timeout = this.opts.requestTimeout),
        (t.onreadystatechange = () => {
          t.readyState === 4 &&
            (t.status === 200 || t.status === 1223
              ? this.onLoad()
              : this.setTimeoutFn(() => {
                  this.onError(typeof t.status == 'number' ? t.status : 0);
                }, 0));
        }),
        t.send(this.data);
    } catch (s) {
      this.setTimeoutFn(() => {
        this.onError(s);
      }, 0);
      return;
    }
    typeof document < 'u' && ((this.index = C.requestsCount++), (C.requests[this.index] = this));
  }
  onError(e) {
    this.emitReserved('error', e, this.xhr), this.cleanup(!0);
  }
  cleanup(e) {
    if (!(typeof this.xhr > 'u' || this.xhr === null)) {
      if (((this.xhr.onreadystatechange = ze), e))
        try {
          this.xhr.abort();
        } catch {}
      typeof document < 'u' && delete C.requests[this.index], (this.xhr = null);
    }
  }
  onLoad() {
    const e = this.xhr.responseText;
    e !== null && (this.emitReserved('data', e), this.emitReserved('success'), this.cleanup());
  }
  abort() {
    this.cleanup();
  }
}
C.requestsCount = 0;
C.requests = {};
if (typeof document < 'u') {
  if (typeof attachEvent == 'function') attachEvent('onunload', re);
  else if (typeof addEventListener == 'function') {
    const n = 'onpagehide' in _ ? 'pagehide' : 'unload';
    addEventListener(n, re, !1);
  }
}
function re() {
  for (let n in C.requests) C.requests.hasOwnProperty(n) && C.requests[n].abort();
}
const Ee = (() =>
    typeof Promise == 'function' && typeof Promise.resolve == 'function'
      ? (e) => Promise.resolve().then(e)
      : (e, t) => t(e, 0))(),
  $ = _.WebSocket || _.MozWebSocket,
  oe = !0,
  Je = 'arraybuffer',
  ce =
    typeof navigator < 'u' &&
    typeof navigator.product == 'string' &&
    navigator.product.toLowerCase() === 'reactnative';
class Qe extends me {
  constructor(e) {
    super(e), (this.supportsBinary = !e.forceBase64);
  }
  get name() {
    return 'websocket';
  }
  doOpen() {
    if (!this.check()) return;
    const e = this.uri(),
      t = this.opts.protocols,
      s = ce
        ? {}
        : pe(
            this.opts,
            'agent',
            'perMessageDeflate',
            'pfx',
            'key',
            'passphrase',
            'cert',
            'ca',
            'ciphers',
            'rejectUnauthorized',
            'localAddress',
            'protocolVersion',
            'origin',
            'maxPayload',
            'family',
            'checkServerIdentity'
          );
    this.opts.extraHeaders && (s.headers = this.opts.extraHeaders);
    try {
      this.ws = oe && !ce ? (t ? new $(e, t) : new $(e)) : new $(e, t, s);
    } catch (i) {
      return this.emitReserved('error', i);
    }
    (this.ws.binaryType = this.socket.binaryType || Je), this.addEventListeners();
  }
  addEventListeners() {
    (this.ws.onopen = () => {
      this.opts.autoUnref && this.ws._socket.unref(), this.onOpen();
    }),
      (this.ws.onclose = (e) =>
        this.onClose({ description: 'websocket connection closed', context: e })),
      (this.ws.onmessage = (e) => this.onData(e.data)),
      (this.ws.onerror = (e) => this.onError('websocket error', e));
  }
  write(e) {
    this.writable = !1;
    for (let t = 0; t < e.length; t++) {
      const s = e[t],
        i = t === e.length - 1;
      le(s, this.supportsBinary, (r) => {
        const o = {};
        try {
          oe && this.ws.send(r);
        } catch {}
        i &&
          Ee(() => {
            (this.writable = !0), this.emitReserved('drain');
          }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    typeof this.ws < 'u' && (this.ws.close(), (this.ws = null));
  }
  uri() {
    let e = this.query || {};
    const t = this.opts.secure ? 'wss' : 'ws';
    let s = '';
    this.opts.port &&
      ((t === 'wss' && Number(this.opts.port) !== 443) ||
        (t === 'ws' && Number(this.opts.port) !== 80)) &&
      (s = ':' + this.opts.port),
      this.opts.timestampRequests && (e[this.opts.timestampParam] = ye()),
      this.supportsBinary || (e.b64 = 1);
    const i = ve(e),
      r = this.opts.hostname.indexOf(':') !== -1;
    return (
      t +
      '://' +
      (r ? '[' + this.opts.hostname + ']' : this.opts.hostname) +
      s +
      this.opts.path +
      (i.length ? '?' + i : '')
    );
  }
  check() {
    return !!$;
  }
}
const je = { websocket: Qe, polling: Xe },
  Ge =
    /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
  Ze = [
    'source',
    'protocol',
    'authority',
    'userInfo',
    'user',
    'password',
    'host',
    'port',
    'relative',
    'path',
    'directory',
    'file',
    'query',
    'anchor',
  ];
function W(n) {
  const e = n,
    t = n.indexOf('['),
    s = n.indexOf(']');
  t != -1 &&
    s != -1 &&
    (n = n.substring(0, t) + n.substring(t, s).replace(/:/g, ';') + n.substring(s, n.length));
  let i = Ge.exec(n || ''),
    r = {},
    o = 14;
  for (; o--; ) r[Ze[o]] = i[o] || '';
  return (
    t != -1 &&
      s != -1 &&
      ((r.source = e),
      (r.host = r.host.substring(1, r.host.length - 1).replace(/;/g, ':')),
      (r.authority = r.authority.replace('[', '').replace(']', '').replace(/;/g, ':')),
      (r.ipv6uri = !0)),
    (r.pathNames = et(r, r.path)),
    (r.queryKey = tt(r, r.query)),
    r
  );
}
function et(n, e) {
  const t = /\/{2,9}/g,
    s = e.replace(t, '/').split('/');
  return (
    (e.slice(0, 1) == '/' || e.length === 0) && s.splice(0, 1),
    e.slice(-1) == '/' && s.splice(s.length - 1, 1),
    s
  );
}
function tt(n, e) {
  const t = {};
  return (
    e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (s, i, r) {
      i && (t[i] = r);
    }),
    t
  );
}
let ke = class N extends m {
  constructor(e, t = {}) {
    super(),
      (this.writeBuffer = []),
      e && typeof e == 'object' && ((t = e), (e = null)),
      e
        ? ((e = W(e)),
          (t.hostname = e.host),
          (t.secure = e.protocol === 'https' || e.protocol === 'wss'),
          (t.port = e.port),
          e.query && (t.query = e.query))
        : t.host && (t.hostname = W(t.host).host),
      K(this, t),
      (this.secure =
        t.secure != null ? t.secure : typeof location < 'u' && location.protocol === 'https:'),
      t.hostname && !t.port && (t.port = this.secure ? '443' : '80'),
      (this.hostname = t.hostname || (typeof location < 'u' ? location.hostname : 'localhost')),
      (this.port =
        t.port ||
        (typeof location < 'u' && location.port ? location.port : this.secure ? '443' : '80')),
      (this.transports = t.transports || ['polling', 'websocket']),
      (this.writeBuffer = []),
      (this.prevBufferLen = 0),
      (this.opts = Object.assign(
        {
          path: '/engine.io',
          agent: !1,
          withCredentials: !1,
          upgrade: !0,
          timestampParam: 't',
          rememberUpgrade: !1,
          addTrailingSlash: !0,
          rejectUnauthorized: !0,
          perMessageDeflate: { threshold: 1024 },
          transportOptions: {},
          closeOnBeforeunload: !0,
        },
        t
      )),
      (this.opts.path =
        this.opts.path.replace(/\/$/, '') + (this.opts.addTrailingSlash ? '/' : '')),
      typeof this.opts.query == 'string' && (this.opts.query = Ye(this.opts.query)),
      (this.id = null),
      (this.upgrades = null),
      (this.pingInterval = null),
      (this.pingTimeout = null),
      (this.pingTimeoutTimer = null),
      typeof addEventListener == 'function' &&
        (this.opts.closeOnBeforeunload &&
          ((this.beforeunloadEventListener = () => {
            this.transport && (this.transport.removeAllListeners(), this.transport.close());
          }),
          addEventListener('beforeunload', this.beforeunloadEventListener, !1)),
        this.hostname !== 'localhost' &&
          ((this.offlineEventListener = () => {
            this.onClose('transport close', { description: 'network connection lost' });
          }),
          addEventListener('offline', this.offlineEventListener, !1))),
      this.open();
  }
  createTransport(e) {
    const t = Object.assign({}, this.opts.query);
    (t.EIO = de), (t.transport = e), this.id && (t.sid = this.id);
    const s = Object.assign({}, this.opts.transportOptions[e], this.opts, {
      query: t,
      socket: this,
      hostname: this.hostname,
      secure: this.secure,
      port: this.port,
    });
    return new je[e](s);
  }
  open() {
    let e;
    if (
      this.opts.rememberUpgrade &&
      N.priorWebsocketSuccess &&
      this.transports.indexOf('websocket') !== -1
    )
      e = 'websocket';
    else if (this.transports.length === 0) {
      this.setTimeoutFn(() => {
        this.emitReserved('error', 'No transports available');
      }, 0);
      return;
    } else e = this.transports[0];
    this.readyState = 'opening';
    try {
      e = this.createTransport(e);
    } catch {
      this.transports.shift(), this.open();
      return;
    }
    e.open(), this.setTransport(e);
  }
  setTransport(e) {
    this.transport && this.transport.removeAllListeners(),
      (this.transport = e),
      e
        .on('drain', this.onDrain.bind(this))
        .on('packet', this.onPacket.bind(this))
        .on('error', this.onError.bind(this))
        .on('close', (t) => this.onClose('transport close', t));
  }
  probe(e) {
    let t = this.createTransport(e),
      s = !1;
    N.priorWebsocketSuccess = !1;
    const i = () => {
      s ||
        (t.send([{ type: 'ping', data: 'probe' }]),
        t.once('packet', (f) => {
          if (!s)
            if (f.type === 'pong' && f.data === 'probe') {
              if (((this.upgrading = !0), this.emitReserved('upgrading', t), !t)) return;
              (N.priorWebsocketSuccess = t.name === 'websocket'),
                this.transport.pause(() => {
                  s ||
                    (this.readyState !== 'closed' &&
                      (u(),
                      this.setTransport(t),
                      t.send([{ type: 'upgrade' }]),
                      this.emitReserved('upgrade', t),
                      (t = null),
                      (this.upgrading = !1),
                      this.flush()));
                });
            } else {
              const y = new Error('probe error');
              (y.transport = t.name), this.emitReserved('upgradeError', y);
            }
        }));
    };
    function r() {
      s || ((s = !0), u(), t.close(), (t = null));
    }
    const o = (f) => {
      const y = new Error('probe error: ' + f);
      (y.transport = t.name), r(), this.emitReserved('upgradeError', y);
    };
    function l() {
      o('transport closed');
    }
    function d() {
      o('socket closed');
    }
    function g(f) {
      t && f.name !== t.name && r();
    }
    const u = () => {
      t.removeListener('open', i),
        t.removeListener('error', o),
        t.removeListener('close', l),
        this.off('close', d),
        this.off('upgrading', g);
    };
    t.once('open', i),
      t.once('error', o),
      t.once('close', l),
      this.once('close', d),
      this.once('upgrading', g),
      t.open();
  }
  onOpen() {
    if (
      ((this.readyState = 'open'),
      (N.priorWebsocketSuccess = this.transport.name === 'websocket'),
      this.emitReserved('open'),
      this.flush(),
      this.readyState === 'open' && this.opts.upgrade)
    ) {
      let e = 0;
      const t = this.upgrades.length;
      for (; e < t; e++) this.probe(this.upgrades[e]);
    }
  }
  onPacket(e) {
    if (
      this.readyState === 'opening' ||
      this.readyState === 'open' ||
      this.readyState === 'closing'
    )
      switch ((this.emitReserved('packet', e), this.emitReserved('heartbeat'), e.type)) {
        case 'open':
          this.onHandshake(JSON.parse(e.data));
          break;
        case 'ping':
          this.resetPingTimeout(),
            this.sendPacket('pong'),
            this.emitReserved('ping'),
            this.emitReserved('pong');
          break;
        case 'error':
          const t = new Error('server error');
          (t.code = e.data), this.onError(t);
          break;
        case 'message':
          this.emitReserved('data', e.data), this.emitReserved('message', e.data);
          break;
      }
  }
  onHandshake(e) {
    this.emitReserved('handshake', e),
      (this.id = e.sid),
      (this.transport.query.sid = e.sid),
      (this.upgrades = this.filterUpgrades(e.upgrades)),
      (this.pingInterval = e.pingInterval),
      (this.pingTimeout = e.pingTimeout),
      (this.maxPayload = e.maxPayload),
      this.onOpen(),
      this.readyState !== 'closed' && this.resetPingTimeout();
  }
  resetPingTimeout() {
    this.clearTimeoutFn(this.pingTimeoutTimer),
      (this.pingTimeoutTimer = this.setTimeoutFn(() => {
        this.onClose('ping timeout');
      }, this.pingInterval + this.pingTimeout)),
      this.opts.autoUnref && this.pingTimeoutTimer.unref();
  }
  onDrain() {
    this.writeBuffer.splice(0, this.prevBufferLen),
      (this.prevBufferLen = 0),
      this.writeBuffer.length === 0 ? this.emitReserved('drain') : this.flush();
  }
  flush() {
    if (
      this.readyState !== 'closed' &&
      this.transport.writable &&
      !this.upgrading &&
      this.writeBuffer.length
    ) {
      const e = this.getWritablePackets();
      this.transport.send(e), (this.prevBufferLen = e.length), this.emitReserved('flush');
    }
  }
  getWritablePackets() {
    if (!(this.maxPayload && this.transport.name === 'polling' && this.writeBuffer.length > 1))
      return this.writeBuffer;
    let t = 1;
    for (let s = 0; s < this.writeBuffer.length; s++) {
      const i = this.writeBuffer[s].data;
      if ((i && (t += $e(i)), s > 0 && t > this.maxPayload)) return this.writeBuffer.slice(0, s);
      t += 2;
    }
    return this.writeBuffer;
  }
  write(e, t, s) {
    return this.sendPacket('message', e, t, s), this;
  }
  send(e, t, s) {
    return this.sendPacket('message', e, t, s), this;
  }
  sendPacket(e, t, s, i) {
    if (
      (typeof t == 'function' && ((i = t), (t = void 0)),
      typeof s == 'function' && ((i = s), (s = null)),
      this.readyState === 'closing' || this.readyState === 'closed')
    )
      return;
    (s = s || {}), (s.compress = s.compress !== !1);
    const r = { type: e, data: t, options: s };
    this.emitReserved('packetCreate', r),
      this.writeBuffer.push(r),
      i && this.once('flush', i),
      this.flush();
  }
  close() {
    const e = () => {
        this.onClose('forced close'), this.transport.close();
      },
      t = () => {
        this.off('upgrade', t), this.off('upgradeError', t), e();
      },
      s = () => {
        this.once('upgrade', t), this.once('upgradeError', t);
      };
    return (
      (this.readyState === 'opening' || this.readyState === 'open') &&
        ((this.readyState = 'closing'),
        this.writeBuffer.length
          ? this.once('drain', () => {
              this.upgrading ? s() : e();
            })
          : this.upgrading
          ? s()
          : e()),
      this
    );
  }
  onError(e) {
    (N.priorWebsocketSuccess = !1),
      this.emitReserved('error', e),
      this.onClose('transport error', e);
  }
  onClose(e, t) {
    (this.readyState === 'opening' ||
      this.readyState === 'open' ||
      this.readyState === 'closing') &&
      (this.clearTimeoutFn(this.pingTimeoutTimer),
      this.transport.removeAllListeners('close'),
      this.transport.close(),
      this.transport.removeAllListeners(),
      typeof removeEventListener == 'function' &&
        (removeEventListener('beforeunload', this.beforeunloadEventListener, !1),
        removeEventListener('offline', this.offlineEventListener, !1)),
      (this.readyState = 'closed'),
      (this.id = null),
      this.emitReserved('close', e, t),
      (this.writeBuffer = []),
      (this.prevBufferLen = 0));
  }
  filterUpgrades(e) {
    const t = [];
    let s = 0;
    const i = e.length;
    for (; s < i; s++) ~this.transports.indexOf(e[s]) && t.push(e[s]);
    return t;
  }
};
ke.protocol = de;
function st(n, e = '', t) {
  let s = n;
  (t = t || (typeof location < 'u' && location)),
    n == null && (n = t.protocol + '//' + t.host),
    typeof n == 'string' &&
      (n.charAt(0) === '/' && (n.charAt(1) === '/' ? (n = t.protocol + n) : (n = t.host + n)),
      /^(https?|wss?):\/\//.test(n) ||
        (typeof t < 'u' ? (n = t.protocol + '//' + n) : (n = 'https://' + n)),
      (s = W(n))),
    s.port ||
      (/^(http|ws)$/.test(s.protocol)
        ? (s.port = '80')
        : /^(http|ws)s$/.test(s.protocol) && (s.port = '443')),
    (s.path = s.path || '/');
  const r = s.host.indexOf(':') !== -1 ? '[' + s.host + ']' : s.host;
  return (
    (s.id = s.protocol + '://' + r + ':' + s.port + e),
    (s.href = s.protocol + '://' + r + (t && t.port === s.port ? '' : ':' + s.port)),
    s
  );
}
const nt = typeof ArrayBuffer == 'function',
  it = (n) =>
    typeof ArrayBuffer.isView == 'function'
      ? ArrayBuffer.isView(n)
      : n.buffer instanceof ArrayBuffer,
  _e = Object.prototype.toString,
  rt =
    typeof Blob == 'function' ||
    (typeof Blob < 'u' && _e.call(Blob) === '[object BlobConstructor]'),
  ot =
    typeof File == 'function' ||
    (typeof File < 'u' && _e.call(File) === '[object FileConstructor]');
function j(n) {
  return (
    (nt && (n instanceof ArrayBuffer || it(n))) ||
    (rt && n instanceof Blob) ||
    (ot && n instanceof File)
  );
}
function V(n, e) {
  if (!n || typeof n != 'object') return !1;
  if (Array.isArray(n)) {
    for (let t = 0, s = n.length; t < s; t++) if (V(n[t])) return !0;
    return !1;
  }
  if (j(n)) return !0;
  if (n.toJSON && typeof n.toJSON == 'function' && arguments.length === 1) return V(n.toJSON(), !0);
  for (const t in n) if (Object.prototype.hasOwnProperty.call(n, t) && V(n[t])) return !0;
  return !1;
}
function ct(n) {
  const e = [],
    t = n.data,
    s = n;
  return (s.data = X(t, e)), (s.attachments = e.length), { packet: s, buffers: e };
}
function X(n, e) {
  if (!n) return n;
  if (j(n)) {
    const t = { _placeholder: !0, num: e.length };
    return e.push(n), t;
  } else if (Array.isArray(n)) {
    const t = new Array(n.length);
    for (let s = 0; s < n.length; s++) t[s] = X(n[s], e);
    return t;
  } else if (typeof n == 'object' && !(n instanceof Date)) {
    const t = {};
    for (const s in n) Object.prototype.hasOwnProperty.call(n, s) && (t[s] = X(n[s], e));
    return t;
  }
  return n;
}
function at(n, e) {
  return (n.data = J(n.data, e)), delete n.attachments, n;
}
function J(n, e) {
  if (!n) return n;
  if (n && n._placeholder === !0) {
    if (typeof n.num == 'number' && n.num >= 0 && n.num < e.length) return e[n.num];
    throw new Error('illegal attachments');
  } else if (Array.isArray(n)) for (let t = 0; t < n.length; t++) n[t] = J(n[t], e);
  else if (typeof n == 'object')
    for (const t in n) Object.prototype.hasOwnProperty.call(n, t) && (n[t] = J(n[t], e));
  return n;
}
const lt = 5;
var a;
(function (n) {
  (n[(n.CONNECT = 0)] = 'CONNECT'),
    (n[(n.DISCONNECT = 1)] = 'DISCONNECT'),
    (n[(n.EVENT = 2)] = 'EVENT'),
    (n[(n.ACK = 3)] = 'ACK'),
    (n[(n.CONNECT_ERROR = 4)] = 'CONNECT_ERROR'),
    (n[(n.BINARY_EVENT = 5)] = 'BINARY_EVENT'),
    (n[(n.BINARY_ACK = 6)] = 'BINARY_ACK');
})(a || (a = {}));
class ht {
  constructor(e) {
    this.replacer = e;
  }
  encode(e) {
    return (e.type === a.EVENT || e.type === a.ACK) && V(e)
      ? this.encodeAsBinary({
          type: e.type === a.EVENT ? a.BINARY_EVENT : a.BINARY_ACK,
          nsp: e.nsp,
          data: e.data,
          id: e.id,
        })
      : [this.encodeAsString(e)];
  }
  encodeAsString(e) {
    let t = '' + e.type;
    return (
      (e.type === a.BINARY_EVENT || e.type === a.BINARY_ACK) && (t += e.attachments + '-'),
      e.nsp && e.nsp !== '/' && (t += e.nsp + ','),
      e.id != null && (t += e.id),
      e.data != null && (t += JSON.stringify(e.data, this.replacer)),
      t
    );
  }
  encodeAsBinary(e) {
    const t = ct(e),
      s = this.encodeAsString(t.packet),
      i = t.buffers;
    return i.unshift(s), i;
  }
}
class G extends m {
  constructor(e) {
    super(), (this.reviver = e);
  }
  add(e) {
    let t;
    if (typeof e == 'string') {
      if (this.reconstructor) throw new Error('got plaintext data when reconstructing a packet');
      t = this.decodeString(e);
      const s = t.type === a.BINARY_EVENT;
      s || t.type === a.BINARY_ACK
        ? ((t.type = s ? a.EVENT : a.ACK),
          (this.reconstructor = new ut(t)),
          t.attachments === 0 && super.emitReserved('decoded', t))
        : super.emitReserved('decoded', t);
    } else if (j(e) || e.base64)
      if (this.reconstructor)
        (t = this.reconstructor.takeBinaryData(e)),
          t && ((this.reconstructor = null), super.emitReserved('decoded', t));
      else throw new Error('got binary data when not reconstructing a packet');
    else throw new Error('Unknown type: ' + e);
  }
  decodeString(e) {
    let t = 0;
    const s = { type: Number(e.charAt(0)) };
    if (a[s.type] === void 0) throw new Error('unknown packet type ' + s.type);
    if (s.type === a.BINARY_EVENT || s.type === a.BINARY_ACK) {
      const r = t + 1;
      for (; e.charAt(++t) !== '-' && t != e.length; );
      const o = e.substring(r, t);
      if (o != Number(o) || e.charAt(t) !== '-') throw new Error('Illegal attachments');
      s.attachments = Number(o);
    }
    if (e.charAt(t + 1) === '/') {
      const r = t + 1;
      for (; ++t && !(e.charAt(t) === ',' || t === e.length); );
      s.nsp = e.substring(r, t);
    } else s.nsp = '/';
    const i = e.charAt(t + 1);
    if (i !== '' && Number(i) == i) {
      const r = t + 1;
      for (; ++t; ) {
        const o = e.charAt(t);
        if (o == null || Number(o) != o) {
          --t;
          break;
        }
        if (t === e.length) break;
      }
      s.id = Number(e.substring(r, t + 1));
    }
    if (e.charAt(++t)) {
      const r = this.tryParse(e.substr(t));
      if (G.isPayloadValid(s.type, r)) s.data = r;
      else throw new Error('invalid payload');
    }
    return s;
  }
  tryParse(e) {
    try {
      return JSON.parse(e, this.reviver);
    } catch {
      return !1;
    }
  }
  static isPayloadValid(e, t) {
    switch (e) {
      case a.CONNECT:
        return typeof t == 'object';
      case a.DISCONNECT:
        return t === void 0;
      case a.CONNECT_ERROR:
        return typeof t == 'string' || typeof t == 'object';
      case a.EVENT:
      case a.BINARY_EVENT:
        return Array.isArray(t) && (typeof t[0] == 'string' || typeof t[0] == 'number');
      case a.ACK:
      case a.BINARY_ACK:
        return Array.isArray(t);
    }
  }
  destroy() {
    this.reconstructor &&
      (this.reconstructor.finishedReconstruction(), (this.reconstructor = null));
  }
}
class ut {
  constructor(e) {
    (this.packet = e), (this.buffers = []), (this.reconPack = e);
  }
  takeBinaryData(e) {
    if ((this.buffers.push(e), this.buffers.length === this.reconPack.attachments)) {
      const t = at(this.reconPack, this.buffers);
      return this.finishedReconstruction(), t;
    }
    return null;
  }
  finishedReconstruction() {
    (this.reconPack = null), (this.buffers = []);
  }
}
const ft = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      Decoder: G,
      Encoder: ht,
      get PacketType() {
        return a;
      },
      protocol: lt,
    },
    Symbol.toStringTag,
    { value: 'Module' }
  )
);
function S(n, e, t) {
  return (
    n.on(e, t),
    function () {
      n.off(e, t);
    }
  );
}
const dt = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  newListener: 1,
  removeListener: 1,
});
class Le extends m {
  constructor(e, t, s) {
    super(),
      (this.connected = !1),
      (this.recovered = !1),
      (this.receiveBuffer = []),
      (this.sendBuffer = []),
      (this._queue = []),
      (this._queueSeq = 0),
      (this.ids = 0),
      (this.acks = {}),
      (this.flags = {}),
      (this.io = e),
      (this.nsp = t),
      s && s.auth && (this.auth = s.auth),
      (this._opts = Object.assign({}, s)),
      this.io._autoConnect && this.open();
  }
  get disconnected() {
    return !this.connected;
  }
  subEvents() {
    if (this.subs) return;
    const e = this.io;
    this.subs = [
      S(e, 'open', this.onopen.bind(this)),
      S(e, 'packet', this.onpacket.bind(this)),
      S(e, 'error', this.onerror.bind(this)),
      S(e, 'close', this.onclose.bind(this)),
    ];
  }
  get active() {
    return !!this.subs;
  }
  connect() {
    return this.connected
      ? this
      : (this.subEvents(),
        this.io._reconnecting || this.io.open(),
        this.io._readyState === 'open' && this.onopen(),
        this);
  }
  open() {
    return this.connect();
  }
  send(...e) {
    return e.unshift('message'), this.emit.apply(this, e), this;
  }
  emit(e, ...t) {
    if (dt.hasOwnProperty(e)) throw new Error('"' + e.toString() + '" is a reserved event name');
    if ((t.unshift(e), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile))
      return this._addToQueue(t), this;
    const s = { type: a.EVENT, data: t };
    if (
      ((s.options = {}),
      (s.options.compress = this.flags.compress !== !1),
      typeof t[t.length - 1] == 'function')
    ) {
      const o = this.ids++,
        l = t.pop();
      this._registerAckCallback(o, l), (s.id = o);
    }
    const i = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
    return (
      (this.flags.volatile && (!i || !this.connected)) ||
        (this.connected
          ? (this.notifyOutgoingListeners(s), this.packet(s))
          : this.sendBuffer.push(s)),
      (this.flags = {}),
      this
    );
  }
  _registerAckCallback(e, t) {
    var s;
    const i = (s = this.flags.timeout) !== null && s !== void 0 ? s : this._opts.ackTimeout;
    if (i === void 0) {
      this.acks[e] = t;
      return;
    }
    const r = this.io.setTimeoutFn(() => {
      delete this.acks[e];
      for (let o = 0; o < this.sendBuffer.length; o++)
        this.sendBuffer[o].id === e && this.sendBuffer.splice(o, 1);
      t.call(this, new Error('operation has timed out'));
    }, i);
    this.acks[e] = (...o) => {
      this.io.clearTimeoutFn(r), t.apply(this, [null, ...o]);
    };
  }
  emitWithAck(e, ...t) {
    const s = this.flags.timeout !== void 0 || this._opts.ackTimeout !== void 0;
    return new Promise((i, r) => {
      t.push((o, l) => (s ? (o ? r(o) : i(l)) : i(o))), this.emit(e, ...t);
    });
  }
  _addToQueue(e) {
    let t;
    typeof e[e.length - 1] == 'function' && (t = e.pop());
    const s = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: !1,
      args: e,
      flags: Object.assign({ fromQueue: !0 }, this.flags),
    };
    e.push((i, ...r) =>
      s !== this._queue[0]
        ? void 0
        : (i !== null
            ? s.tryCount > this._opts.retries && (this._queue.shift(), t && t(i))
            : (this._queue.shift(), t && t(null, ...r)),
          (s.pending = !1),
          this._drainQueue())
    ),
      this._queue.push(s),
      this._drainQueue();
  }
  _drainQueue(e = !1) {
    if (!this.connected || this._queue.length === 0) return;
    const t = this._queue[0];
    (t.pending && !e) ||
      ((t.pending = !0), t.tryCount++, (this.flags = t.flags), this.emit.apply(this, t.args));
  }
  packet(e) {
    (e.nsp = this.nsp), this.io._packet(e);
  }
  onopen() {
    typeof this.auth == 'function'
      ? this.auth((e) => {
          this._sendConnectPacket(e);
        })
      : this._sendConnectPacket(this.auth);
  }
  _sendConnectPacket(e) {
    this.packet({
      type: a.CONNECT,
      data: this._pid ? Object.assign({ pid: this._pid, offset: this._lastOffset }, e) : e,
    });
  }
  onerror(e) {
    this.connected || this.emitReserved('connect_error', e);
  }
  onclose(e, t) {
    (this.connected = !1), delete this.id, this.emitReserved('disconnect', e, t);
  }
  onpacket(e) {
    if (e.nsp === this.nsp)
      switch (e.type) {
        case a.CONNECT:
          e.data && e.data.sid
            ? this.onconnect(e.data.sid, e.data.pid)
            : this.emitReserved(
                'connect_error',
                new Error(
                  'It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)'
                )
              );
          break;
        case a.EVENT:
        case a.BINARY_EVENT:
          this.onevent(e);
          break;
        case a.ACK:
        case a.BINARY_ACK:
          this.onack(e);
          break;
        case a.DISCONNECT:
          this.ondisconnect();
          break;
        case a.CONNECT_ERROR:
          this.destroy();
          const s = new Error(e.data.message);
          (s.data = e.data.data), this.emitReserved('connect_error', s);
          break;
      }
  }
  onevent(e) {
    const t = e.data || [];
    e.id != null && t.push(this.ack(e.id)),
      this.connected ? this.emitEvent(t) : this.receiveBuffer.push(Object.freeze(t));
  }
  emitEvent(e) {
    if (this._anyListeners && this._anyListeners.length) {
      const t = this._anyListeners.slice();
      for (const s of t) s.apply(this, e);
    }
    super.emit.apply(this, e),
      this._pid &&
        e.length &&
        typeof e[e.length - 1] == 'string' &&
        (this._lastOffset = e[e.length - 1]);
  }
  ack(e) {
    const t = this;
    let s = !1;
    return function (...i) {
      s || ((s = !0), t.packet({ type: a.ACK, id: e, data: i }));
    };
  }
  onack(e) {
    const t = this.acks[e.id];
    typeof t == 'function' && (t.apply(this, e.data), delete this.acks[e.id]);
  }
  onconnect(e, t) {
    (this.id = e),
      (this.recovered = t && this._pid === t),
      (this._pid = t),
      (this.connected = !0),
      this.emitBuffered(),
      this.emitReserved('connect'),
      this._drainQueue(!0);
  }
  emitBuffered() {
    this.receiveBuffer.forEach((e) => this.emitEvent(e)),
      (this.receiveBuffer = []),
      this.sendBuffer.forEach((e) => {
        this.notifyOutgoingListeners(e), this.packet(e);
      }),
      (this.sendBuffer = []);
  }
  ondisconnect() {
    this.destroy(), this.onclose('io server disconnect');
  }
  destroy() {
    this.subs && (this.subs.forEach((e) => e()), (this.subs = void 0)), this.io._destroy(this);
  }
  disconnect() {
    return (
      this.connected && this.packet({ type: a.DISCONNECT }),
      this.destroy(),
      this.connected && this.onclose('io client disconnect'),
      this
    );
  }
  close() {
    return this.disconnect();
  }
  compress(e) {
    return (this.flags.compress = e), this;
  }
  get volatile() {
    return (this.flags.volatile = !0), this;
  }
  timeout(e) {
    return (this.flags.timeout = e), this;
  }
  onAny(e) {
    return (this._anyListeners = this._anyListeners || []), this._anyListeners.push(e), this;
  }
  prependAny(e) {
    return (this._anyListeners = this._anyListeners || []), this._anyListeners.unshift(e), this;
  }
  offAny(e) {
    if (!this._anyListeners) return this;
    if (e) {
      const t = this._anyListeners;
      for (let s = 0; s < t.length; s++) if (e === t[s]) return t.splice(s, 1), this;
    } else this._anyListeners = [];
    return this;
  }
  listenersAny() {
    return this._anyListeners || [];
  }
  onAnyOutgoing(e) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.push(e),
      this
    );
  }
  prependAnyOutgoing(e) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.unshift(e),
      this
    );
  }
  offAnyOutgoing(e) {
    if (!this._anyOutgoingListeners) return this;
    if (e) {
      const t = this._anyOutgoingListeners;
      for (let s = 0; s < t.length; s++) if (e === t[s]) return t.splice(s, 1), this;
    } else this._anyOutgoingListeners = [];
    return this;
  }
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  notifyOutgoingListeners(e) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const t = this._anyOutgoingListeners.slice();
      for (const s of t) s.apply(this, e.data);
    }
  }
}
function P(n) {
  (n = n || {}),
    (this.ms = n.min || 100),
    (this.max = n.max || 1e4),
    (this.factor = n.factor || 2),
    (this.jitter = n.jitter > 0 && n.jitter <= 1 ? n.jitter : 0),
    (this.attempts = 0);
}
P.prototype.duration = function () {
  var n = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var e = Math.random(),
      t = Math.floor(e * this.jitter * n);
    n = Math.floor(e * 10) & 1 ? n + t : n - t;
  }
  return Math.min(n, this.max) | 0;
};
P.prototype.reset = function () {
  this.attempts = 0;
};
P.prototype.setMin = function (n) {
  this.ms = n;
};
P.prototype.setMax = function (n) {
  this.max = n;
};
P.prototype.setJitter = function (n) {
  this.jitter = n;
};
class Q extends m {
  constructor(e, t) {
    var s;
    super(),
      (this.nsps = {}),
      (this.subs = []),
      e && typeof e == 'object' && ((t = e), (e = void 0)),
      (t = t || {}),
      (t.path = t.path || '/socket.io'),
      (this.opts = t),
      K(this, t),
      this.reconnection(t.reconnection !== !1),
      this.reconnectionAttempts(t.reconnectionAttempts || 1 / 0),
      this.reconnectionDelay(t.reconnectionDelay || 1e3),
      this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3),
      this.randomizationFactor((s = t.randomizationFactor) !== null && s !== void 0 ? s : 0.5),
      (this.backoff = new P({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor(),
      })),
      this.timeout(t.timeout == null ? 2e4 : t.timeout),
      (this._readyState = 'closed'),
      (this.uri = e);
    const i = t.parser || ft;
    (this.encoder = new i.Encoder()),
      (this.decoder = new i.Decoder()),
      (this._autoConnect = t.autoConnect !== !1),
      this._autoConnect && this.open();
  }
  reconnection(e) {
    return arguments.length ? ((this._reconnection = !!e), this) : this._reconnection;
  }
  reconnectionAttempts(e) {
    return e === void 0 ? this._reconnectionAttempts : ((this._reconnectionAttempts = e), this);
  }
  reconnectionDelay(e) {
    var t;
    return e === void 0
      ? this._reconnectionDelay
      : ((this._reconnectionDelay = e),
        (t = this.backoff) === null || t === void 0 || t.setMin(e),
        this);
  }
  randomizationFactor(e) {
    var t;
    return e === void 0
      ? this._randomizationFactor
      : ((this._randomizationFactor = e),
        (t = this.backoff) === null || t === void 0 || t.setJitter(e),
        this);
  }
  reconnectionDelayMax(e) {
    var t;
    return e === void 0
      ? this._reconnectionDelayMax
      : ((this._reconnectionDelayMax = e),
        (t = this.backoff) === null || t === void 0 || t.setMax(e),
        this);
  }
  timeout(e) {
    return arguments.length ? ((this._timeout = e), this) : this._timeout;
  }
  maybeReconnectOnOpen() {
    !this._reconnecting && this._reconnection && this.backoff.attempts === 0 && this.reconnect();
  }
  open(e) {
    if (~this._readyState.indexOf('open')) return this;
    this.engine = new ke(this.uri, this.opts);
    const t = this.engine,
      s = this;
    (this._readyState = 'opening'), (this.skipReconnect = !1);
    const i = S(t, 'open', function () {
        s.onopen(), e && e();
      }),
      r = S(t, 'error', (o) => {
        s.cleanup(),
          (s._readyState = 'closed'),
          this.emitReserved('error', o),
          e ? e(o) : s.maybeReconnectOnOpen();
      });
    if (this._timeout !== !1) {
      const o = this._timeout;
      o === 0 && i();
      const l = this.setTimeoutFn(() => {
        i(), t.close(), t.emit('error', new Error('timeout'));
      }, o);
      this.opts.autoUnref && l.unref(),
        this.subs.push(function () {
          clearTimeout(l);
        });
    }
    return this.subs.push(i), this.subs.push(r), this;
  }
  connect(e) {
    return this.open(e);
  }
  onopen() {
    this.cleanup(), (this._readyState = 'open'), this.emitReserved('open');
    const e = this.engine;
    this.subs.push(
      S(e, 'ping', this.onping.bind(this)),
      S(e, 'data', this.ondata.bind(this)),
      S(e, 'error', this.onerror.bind(this)),
      S(e, 'close', this.onclose.bind(this)),
      S(this.decoder, 'decoded', this.ondecoded.bind(this))
    );
  }
  onping() {
    this.emitReserved('ping');
  }
  ondata(e) {
    try {
      this.decoder.add(e);
    } catch (t) {
      this.onclose('parse error', t);
    }
  }
  ondecoded(e) {
    Ee(() => {
      this.emitReserved('packet', e);
    }, this.setTimeoutFn);
  }
  onerror(e) {
    this.emitReserved('error', e);
  }
  socket(e, t) {
    let s = this.nsps[e];
    return (
      s
        ? this._autoConnect && !s.active && s.connect()
        : ((s = new Le(this, e, t)), (this.nsps[e] = s)),
      s
    );
  }
  _destroy(e) {
    const t = Object.keys(this.nsps);
    for (const s of t) if (this.nsps[s].active) return;
    this._close();
  }
  _packet(e) {
    const t = this.encoder.encode(e);
    for (let s = 0; s < t.length; s++) this.engine.write(t[s], e.options);
  }
  cleanup() {
    this.subs.forEach((e) => e()), (this.subs.length = 0), this.decoder.destroy();
  }
  _close() {
    (this.skipReconnect = !0),
      (this._reconnecting = !1),
      this.onclose('forced close'),
      this.engine && this.engine.close();
  }
  disconnect() {
    return this._close();
  }
  onclose(e, t) {
    this.cleanup(),
      this.backoff.reset(),
      (this._readyState = 'closed'),
      this.emitReserved('close', e, t),
      this._reconnection && !this.skipReconnect && this.reconnect();
  }
  reconnect() {
    if (this._reconnecting || this.skipReconnect) return this;
    const e = this;
    if (this.backoff.attempts >= this._reconnectionAttempts)
      this.backoff.reset(), this.emitReserved('reconnect_failed'), (this._reconnecting = !1);
    else {
      const t = this.backoff.duration();
      this._reconnecting = !0;
      const s = this.setTimeoutFn(() => {
        e.skipReconnect ||
          (this.emitReserved('reconnect_attempt', e.backoff.attempts),
          !e.skipReconnect &&
            e.open((i) => {
              i
                ? ((e._reconnecting = !1), e.reconnect(), this.emitReserved('reconnect_error', i))
                : e.onreconnect();
            }));
      }, t);
      this.opts.autoUnref && s.unref(),
        this.subs.push(function () {
          clearTimeout(s);
        });
    }
  }
  onreconnect() {
    const e = this.backoff.attempts;
    (this._reconnecting = !1), this.backoff.reset(), this.emitReserved('reconnect', e);
  }
}
const I = {};
function U(n, e) {
  typeof n == 'object' && ((e = n), (n = void 0)), (e = e || {});
  const t = st(n, e.path || '/socket.io'),
    s = t.source,
    i = t.id,
    r = t.path,
    o = I[i] && r in I[i].nsps,
    l = e.forceNew || e['force new connection'] || e.multiplex === !1 || o;
  let d;
  return (
    l ? (d = new Q(s, e)) : (I[i] || (I[i] = new Q(s, e)), (d = I[i])),
    t.query && !e.query && (e.query = t.queryKey),
    d.socket(t.path, e)
  );
}
Object.assign(U, { Manager: Q, Socket: Le, io: U, connect: U });
const pt = void 0,
  E = U(pt, { autoConnect: !0, cors: '*' });
const mt = new Set();
let Y = {};
function L() {
  return Y;
}
function k(n) {
  (Y = { ...Y, ...n }), gt();
}
function gt() {
  for (const n of mt) n(Y);
}
const Te = (n) => {
  const { user: e } = L(),
    t = e;
  n.user;
  const { name: s, text: i, room_id: r, user_id: o, alert: l } = n,
    d = q('.message-list-container'),
    g = q('.message-list'),
    u = document.createElement('li');
  o === t._id && !l
    ? (u.setAttribute('class', 'message my-message'),
      (u.innerHTML = `
<p>${i}</p><span class="user">${s}</span>
  `))
    : l
    ? (u.setAttribute('class', 'message alert'),
      (u.innerHTML = `
  <p>${i}</p>
`))
    : (u.setAttribute('class', 'message'),
      (u.innerHTML = `
  <p>${i}</p><span class="user">${s}</span>
  `)),
    g.appendChild(u),
    d.scrollTo({ top: d.scrollHeight, left: 0, behavior: 'smooth' });
};
class yt extends HTMLElement {
  constructor() {
    super();
    const e = `
    <div class="chat-container">
      <div id="message-groups">
        <h2>Rooms</h2>
        <div id='rooms-list'></div>
        <form id="create-room-form" action="">
          <label for="new-room-name">Create Room</label>
          <div class="input-group">
            <input id="new-room-name" type="text" placeholder="room name" />
            <button type='submit'>Create Room</button>
          </div>
        </form>
      </div>
      <draw-component id="draw-component"></draw-component>
      <div class="message-container">
        <div class="message-list-container">
          <ul class="message-list">
            <li class='message alert'>Please Select or Create a room to chat in</li>
          </ul>
        </div>
        <form id="message-form">
          <input id="message-input" placeholder="your message" type="text" />
        </form>
      </div>
  </div>
       
`;
    this.innerHTML = e;
  }
  connectedCallback() {
    console.log('connected!', this), this.querySelector('#message-groups');
    const e = this.querySelector('#rooms-list'),
      t = this.querySelector('#create-room-form'),
      s = this.querySelector('#new-room-name'),
      i = this.querySelector('#message-form'),
      r = this.querySelector('#message-input'),
      o = q('.message-list');
    this.querySelector('.message-list-container');
    const l = this.querySelector('draw-component');
    t.addEventListener('submit', function (g) {
      g.preventDefault(), s.value && (E.emit('create-room', s.value), (s.value = ''));
    }),
      E.on('output-rooms', (g) => {
        g.forEach((u) => {
          const f = document.createElement('button');
          let y = u.toString();
          f.setAttribute('value', y),
            f.setAttribute('class', 'room-item'),
            f.addEventListener('click', (B) => {
              let { user: T } = L(),
                c = u._id,
                h = `${T.name} joined the chat`;
              Ae('.room-item').forEach((p) => {
                p.classList.remove('active');
              }),
                f.classList.add('active'),
                (o.innerHTML = ''),
                k({ room: u, messages: [] }),
                l.setAttribute('room', u),
                l.setAttribute('user', T),
                E.emit('join', { name: T.name, room_id: c, user_id: T._id }),
                E.emit('send-message', { msg: h, room_id: c, alert: !0 }),
                E.emit('get-messages-history', c),
                E.on('output-message', (p) => {
                  (o.innerHTML = ''), k({ messages: [] }), k({ messages: p });
                  const { messages: v } = L();
                  v.forEach((A) => {
                    Te(A);
                  });
                });
            }),
            (f.innerHTML = `
        ${u.name}
        `),
            e.appendChild(f);
        });
      }),
      i.addEventListener('submit', function (g) {
        if ((g.preventDefault(), r.value)) {
          k({ message: r.value });
          let { user: u, room: f } = L(),
            y = f._id,
            B = r.value;
          f._id, E.emit('send-message', { msg: B, room_id: y }), k({ message: '' }), (r.value = '');
        }
      });
    const { room: d } = L();
    console.log(d);
  }
  disconnectedCallback() {
    console.log('disconnected', this);
  }
}
class vt extends HTMLElement {
  constructor() {
    super();
    const { isLoggedIn: e } = L();
    console.log(L().user),
      (this.state = {
        login: !1,
        toggleLogin: (t) => {
          this.state.login = t;
        },
        user: {},
        setUser: (t) => {
          (this.state.user = t), console.log(this.state.user);
        },
        auth: e,
        setAuth: (t) => {
          this.state.auth = t;
        },
      }),
      e
        ? (console.log(this.state.user.name),
          (this.innerHTML = `
<button id="logoutBtn">Logout</button>
      `))
        : (this.innerHTML = `
      <div>
        <button id="loginBtn">Login</button>
        <button id="logoutBtn">Logout</button>
        <dialog id="modal" class="modal">
          <!-- Modal content -->
          <div class="modal-content">
            <span class="close">&times;</span>
            <div id="auth-state">
              <div id="login-container">
                <form id="login-form" action="/login">
                  <h3>Login</h3>
                  <div id='login-error'></div>
                  <label for="email">email</label>
                  <input type="email" name="email" id="email" placeholder="jhon@do.com" autocomplete="email" />
                  <label for="password">password</label>
                  <input type="password" name="password" id="password" placeholder="****" autocomplete="current-password" />
                  <input id='login-submit' type="submit" />
                </form>
              </div>
              <div id="register-container">
                <form id="register-form" action="/register">
                  <h3>Register</h3>
                  <div id='register-error'></div>
                  <label for="name">username</label>
                  <input type="text" name="name" id="name" placeholder="username" autocomplete="nickname" />
                  <label for="new-email">email</label>
                  <input type="email" name="email" id="new-email" placeholder="jhon@do.com" autocomplete="email" />
                  <label for="new-password">password</label>
                  <input type="password" name="password" id="new-password" placeholder="****" autocomplete="new-password" />
                  <input type="submit" />
                </form>
              </div>
            </div>
            <button id="auth-select">No Account yet? Create One!</button>
          </div>
        </dialog>
      </div>
          `);
  }
  connectedCallback() {
    const e = this.querySelector('#loginBtn'),
      t = this.querySelector('#logoutBtn'),
      s = this.querySelector('#login-form');
    this.querySelector('#login-submit');
    const i = this.querySelector('.close'),
      r = this.querySelector('#modal'),
      o = q('#auth-select');
    this.querySelector('#auth-state');
    const l = this.querySelector('#register-container'),
      d = this.querySelector('#register-form'),
      g = this.querySelector('#login-container'),
      u = this.querySelector('#register-error'),
      f = this.querySelector('#login-error'),
      y = this.querySelector('#email'),
      B = this.querySelector('#password'),
      T = this.querySelector('#name'),
      c = this.querySelector('#new-email'),
      h = this.querySelector('#new-password');
    o.addEventListener('click', () => {
      this.state.login === !0
        ? (this.state.toggleLogin(!1),
          (l.style.display = 'block'),
          (g.style.display = 'none'),
          (o.innerHTML = 'Already have an account? Login'))
        : (this.state.toggleLogin(!0),
          (l.style.display = 'none'),
          (g.style.display = 'block'),
          (o.innerHTML = 'No Account yet? Create One!'));
    }),
      t.addEventListener('click', async () => {
        try {
          (
            await (
              await fetch('/logout', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
              })
            ).json()
          ).logout &&
            (k({ user: null, isLoggedIn: !1 }),
            k({}),
            (e.style.display = 'block'),
            (t.style.display = 'none'),
            (f.innerHTML = `
        
          `),
            setTimeout(() => {
              r.style.display = 'block';
            }, 200));
        } catch (p) {
          console.log(p);
        }
      }),
      (t.style.display = 'none'),
      (e.onclick = function () {
        r.style.display = 'block';
      });
    const { isLoggedIn: w } = L();
    w || (r.style.display = 'block'),
      (i.onclick = function () {
        const { isLoggedIn: p } = L();
        p && ((e.style.display = 'none'), (r.style.display = 'none'));
      }),
      (window.onclick = function (p) {
        const { isLoggedIn: v } = L();
        p.target == r && v && ((e.style.display = 'none'), (r.style.display = 'none'));
      }),
      s.addEventListener('submit', async (p) => {
        if ((p.preventDefault(), y.value)) {
          let v = { email: y.value, password: B.value };
          try {
            let { email: A, password: x } = v;
            const b = await (
              await fetch('/login', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ username: A, password: x }),
                headers: { 'Content-Type': 'application/json' },
              })
            ).json();
            if ((console.log(b.user), b.errors)) {
              console.log(b.errors.email),
                console.log(b.errors.name),
                console.log(b.errors.password);
              const O = b.errors;
              console.log(O),
                (f.innerHTML = `
            <p>${b.errors.email}</p>
            <p>${b.errors.name}</p>
            <p>${b.errors.password}</p>
            `);
            }
            b.user &&
              (k({ user: b.user, isLoggedIn: !0 }),
              this.state.setAuth(w),
              (e.style.display = 'none'),
              (t.style.display = 'block'),
              (f.innerHTML = `
          <p>Welcome Back! ${b.user.name}</p>
            `),
              setTimeout(() => {
                r.style.display = 'none';
              }, 500));
          } catch (A) {
            console.log(A);
          }
          y.value = v.email;
        }
      }),
      d.addEventListener('submit', async (p) => {
        if ((p.preventDefault(), T.value, c.value, h.value, c.value)) {
          console.log(c.value);
          let v = { name: T.value, email: c.value, password: h.value };
          console.log(v);
          try {
            let { name: A, email: x, password: M } = v,
              Z = x;
            console.log(v);
            const O = await (
              await fetch('/register', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ username: Z, name: A, password: M }),
                headers: { 'Content-Type': 'application/json' },
              })
            ).json();
            console.log(O.user),
              O.errors &&
                (u.innerHTML = `
          <p>${O.errors.email}</p>
          <p>${O.errors.name}</p>
          <p>${O.errors.password}</p>
          `),
              O.user &&
                (this.state.setAuth(w),
                k({ user: O.user, isLoggedIn: !0 }),
                (e.style.display = 'none'),
                (t.style.display = 'block'),
                (u.innerHTML = `
            <p>Welcome ${v.name}</p>
            `),
                setTimeout(() => {
                  r.style.display = 'none';
                }, 500));
          } catch (A) {
            console.error(A);
          }
        }
      });
  }
  attributeChangedCallback() {}
  disconnectedCallback() {
    console.log('disconnected', this);
  }
}
class wt extends HTMLElement {
  constructor() {
    super(),
      (this.state = { drawing: !1, current: { color: '#000000' } }),
      (this.setCurrent = (e) => (this.state.current = { color: e })),
      (this.innerHTML = `
      <div id='draw-container' class='draw-container'>
        <div id="draw-inputs">
          <input type="color" id="drawcolor" name="drawcolor" value="#000000">
          <label for="drawcolor">Color</label>
        </div>
        <canvas id="whiteboard"></canvas>
      </div>

    `);
  }
  connectedCallback() {
    const e = window.devicePixelRatio;
    console.log(e), this.querySelector('#draw-component'), this.querySelector('#draw-container');
    const t = this.querySelector('#whiteboard');
    t.getBoundingClientRect();
    const s = this.querySelector('#drawcolor');
    console.log('connected!', this), k({ current: { color: '#000000' } });
    const i = t.getContext('2d', { alpha: !0 });
    let r = !1,
      o = this.state.current;
    console.log('color'),
      console.log(o),
      t.addEventListener('mousedown', l, !1),
      t.addEventListener('mouseup', d, !1),
      t.addEventListener('mouseout', d, !1),
      t.addEventListener('mousemove', f(g, 1), !1),
      t.addEventListener('touchstart', l, !1),
      t.addEventListener('touchend', d, !1),
      t.addEventListener('touchcancel', d, !1),
      t.addEventListener('touchmove', f(g, 1), !1),
      E.on('drawing', y),
      window.addEventListener('resize', B, !0),
      B(),
      s.addEventListener('change', u, !1);
    function l(c) {
      const { current: h } = L();
      (r = !0),
        (h.x = c.clientX || c.touches[0].clientX),
        (h.y = c.clientY || c.touches[0].clientY);
    }
    function d(c) {
      r && ((r = !1), T(o.x, o.y, c.clientX || 0, c.clientY || 0, o.color, !1));
    }
    function g(c) {
      const { current: h } = L();
      console.log(h.x),
        r &&
          (T(
            h.x,
            h.y,
            c.clientX || c.touches[0].clientX,
            c.clientY || c.touches[0].clientY,
            h.color,
            !0
          ),
          (h.x = c.clientX || c.touches[0].clientX),
          (h.y = c.clientY || c.touches[0].clientY),
          k({ current: h }));
    }
    function u(c) {
      let h = c.target.value;
      k({ current: { color: h } });
    }
    function f(c, h) {
      let w = new Date().getTime();
      return function () {
        let p = new Date().getTime();
        p - w >= h && ((w = p), c.apply(null, arguments));
      };
    }
    function y(c) {
      console.log(c);
      let h = t.width,
        w = t.height;
      T(c.x0 * h, c.y0 * w, c.x1 * h, c.y1 * w, c.color, !1);
    }
    function B() {
      const c = t.offsetLeft,
        h = t.offsetTop;
      (t.width = window.innerWidth - c), (t.height = window.innerHeight - h);
    }
    function T(c, h, w, p, v, A) {
      if (
        (i.beginPath(),
        i.moveTo(c, h),
        i.lineTo(w, p),
        (i.strokeStyle = v),
        (i.lineWidth = 2),
        i.stroke(),
        i.closePath(),
        (i.textAlign = 'center'),
        console.log(i),
        !A)
      )
        return;
      let x = t.width,
        M = t.height;
      E.emit('drawing', { x0: c / x, y0: h / M, x1: w / x, y1: p / M, color: v });
    }
  }
  disconnectedCallback() {
    console.log('disconnected', this);
  }
  static get observedAttributes() {
    return ['room', 'user'];
  }
  attributeChangedCallback(e, t, s) {
    console.log(`attr: ${e} changed from ${t} to ${s}`), console.log(t), console.log(s);
  }
}
const bt = function () {
  return `
<header-component data-user="false" id="header"></header-component>
<chat-component></chat-component>
  `;
};
ae.innerHTML = bt();
'customElements' in window &&
  (customElements.define('header-component', vt),
  customElements.define('chat-component', yt),
  customElements.define('draw-component', wt));
E.onAny((n, ...e) => {
  console.log(n, e);
});
E.on('connect', (n) => {
  console.log('socketconnection');
});
ae.addEventListener('DOMContentLoaded', () => {});
E.on('receive-message', Te);
E.on('login', (n) => {
  console.log(n), k({ user: n });
});
