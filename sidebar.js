(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const s of i)
      if (s.type === "childList")
        for (const o of s.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
    const s = {};
    return (
      i.integrity && (s.integrity = i.integrity),
      i.referrerPolicy && (s.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (s.credentials = "omit")
        : (s.credentials = "same-origin"),
      s
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const s = n(i);
    fetch(i.href, s);
  }
})();
function Xm(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var rd = { exports: {} },
  Ds = {},
  id = { exports: {} },
  _ = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ei = Symbol.for("react.element"),
  Zm = Symbol.for("react.portal"),
  Jm = Symbol.for("react.fragment"),
  qm = Symbol.for("react.strict_mode"),
  eg = Symbol.for("react.profiler"),
  tg = Symbol.for("react.provider"),
  ng = Symbol.for("react.context"),
  rg = Symbol.for("react.forward_ref"),
  ig = Symbol.for("react.suspense"),
  sg = Symbol.for("react.memo"),
  og = Symbol.for("react.lazy"),
  Du = Symbol.iterator;
function ag(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Du && e[Du]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var sd = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  od = Object.assign,
  ad = {};
function Yn(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = ad),
    (this.updater = n || sd);
}
Yn.prototype.isReactComponent = {};
Yn.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Yn.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function ld() {}
ld.prototype = Yn.prototype;
function rl(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = ad),
    (this.updater = n || sd);
}
var il = (rl.prototype = new ld());
il.constructor = rl;
od(il, Yn.prototype);
il.isPureReactComponent = !0;
var Au = Array.isArray,
  ud = Object.prototype.hasOwnProperty,
  sl = { current: null },
  cd = { key: !0, ref: !0, __self: !0, __source: !0 };
function fd(e, t, n) {
  var r,
    i = {},
    s = null,
    o = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (o = t.ref),
    t.key !== void 0 && (s = "" + t.key),
    t))
      ud.call(t, r) && !cd.hasOwnProperty(r) && (i[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) i.children = n;
  else if (1 < a) {
    for (var l = Array(a), u = 0; u < a; u++) l[u] = arguments[u + 2];
    i.children = l;
  }
  if (e && e.defaultProps)
    for (r in ((a = e.defaultProps), a)) i[r] === void 0 && (i[r] = a[r]);
  return {
    $$typeof: ei,
    type: e,
    key: s,
    ref: o,
    props: i,
    _owner: sl.current,
  };
}
function lg(e, t) {
  return {
    $$typeof: ei,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function ol(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ei;
}
function ug(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var Ru = /\/+/g;
function qs(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? ug("" + e.key)
    : t.toString(36);
}
function Fi(e, t, n, r, i) {
  var s = typeof e;
  (s === "undefined" || s === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else
    switch (s) {
      case "string":
      case "number":
        o = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case ei:
          case Zm:
            o = !0;
        }
    }
  if (o)
    return (
      (o = e),
      (i = i(o)),
      (e = r === "" ? "." + qs(o, 0) : r),
      Au(i)
        ? ((n = ""),
          e != null && (n = e.replace(Ru, "$&/") + "/"),
          Fi(i, t, n, "", function (u) {
            return u;
          }))
        : i != null &&
          (ol(i) &&
            (i = lg(
              i,
              n +
                (!i.key || (o && o.key === i.key)
                  ? ""
                  : ("" + i.key).replace(Ru, "$&/") + "/") +
                e
            )),
          t.push(i)),
      1
    );
  if (((o = 0), (r = r === "" ? "." : r + ":"), Au(e)))
    for (var a = 0; a < e.length; a++) {
      s = e[a];
      var l = r + qs(s, a);
      o += Fi(s, t, n, l, i);
    }
  else if (((l = ag(e)), typeof l == "function"))
    for (e = l.call(e), a = 0; !(s = e.next()).done; )
      (s = s.value), (l = r + qs(s, a++)), (o += Fi(s, t, n, l, i));
  else if (s === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return o;
}
function mi(e, t, n) {
  if (e == null) return e;
  var r = [],
    i = 0;
  return (
    Fi(e, r, "", "", function (s) {
      return t.call(n, s, i++);
    }),
    r
  );
}
function cg(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Se = { current: null },
  zi = { transition: null },
  fg = {
    ReactCurrentDispatcher: Se,
    ReactCurrentBatchConfig: zi,
    ReactCurrentOwner: sl,
  };
function dd() {
  throw Error("act(...) is not supported in production builds of React.");
}
_.Children = {
  map: mi,
  forEach: function (e, t, n) {
    mi(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      mi(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      mi(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!ol(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
_.Component = Yn;
_.Fragment = Jm;
_.Profiler = eg;
_.PureComponent = rl;
_.StrictMode = qm;
_.Suspense = ig;
_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = fg;
_.act = dd;
_.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = od({}, e.props),
    i = e.key,
    s = e.ref,
    o = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((s = t.ref), (o = sl.current)),
      t.key !== void 0 && (i = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var a = e.type.defaultProps;
    for (l in t)
      ud.call(t, l) &&
        !cd.hasOwnProperty(l) &&
        (r[l] = t[l] === void 0 && a !== void 0 ? a[l] : t[l]);
  }
  var l = arguments.length - 2;
  if (l === 1) r.children = n;
  else if (1 < l) {
    a = Array(l);
    for (var u = 0; u < l; u++) a[u] = arguments[u + 2];
    r.children = a;
  }
  return { $$typeof: ei, type: e.type, key: i, ref: s, props: r, _owner: o };
};
_.createContext = function (e) {
  return (
    (e = {
      $$typeof: ng,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: tg, _context: e }),
    (e.Consumer = e)
  );
};
_.createElement = fd;
_.createFactory = function (e) {
  var t = fd.bind(null, e);
  return (t.type = e), t;
};
_.createRef = function () {
  return { current: null };
};
_.forwardRef = function (e) {
  return { $$typeof: rg, render: e };
};
_.isValidElement = ol;
_.lazy = function (e) {
  return { $$typeof: og, _payload: { _status: -1, _result: e }, _init: cg };
};
_.memo = function (e, t) {
  return { $$typeof: sg, type: e, compare: t === void 0 ? null : t };
};
_.startTransition = function (e) {
  var t = zi.transition;
  zi.transition = {};
  try {
    e();
  } finally {
    zi.transition = t;
  }
};
_.unstable_act = dd;
_.useCallback = function (e, t) {
  return Se.current.useCallback(e, t);
};
_.useContext = function (e) {
  return Se.current.useContext(e);
};
_.useDebugValue = function () {};
_.useDeferredValue = function (e) {
  return Se.current.useDeferredValue(e);
};
_.useEffect = function (e, t) {
  return Se.current.useEffect(e, t);
};
_.useId = function () {
  return Se.current.useId();
};
_.useImperativeHandle = function (e, t, n) {
  return Se.current.useImperativeHandle(e, t, n);
};
_.useInsertionEffect = function (e, t) {
  return Se.current.useInsertionEffect(e, t);
};
_.useLayoutEffect = function (e, t) {
  return Se.current.useLayoutEffect(e, t);
};
_.useMemo = function (e, t) {
  return Se.current.useMemo(e, t);
};
_.useReducer = function (e, t, n) {
  return Se.current.useReducer(e, t, n);
};
_.useRef = function (e) {
  return Se.current.useRef(e);
};
_.useState = function (e) {
  return Se.current.useState(e);
};
_.useSyncExternalStore = function (e, t, n) {
  return Se.current.useSyncExternalStore(e, t, n);
};
_.useTransition = function () {
  return Se.current.useTransition();
};
_.version = "18.3.1";
id.exports = _;
var T = id.exports;
const al = Xm(T);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var dg = T,
  pg = Symbol.for("react.element"),
  hg = Symbol.for("react.fragment"),
  mg = Object.prototype.hasOwnProperty,
  gg = dg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  yg = { key: !0, ref: !0, __self: !0, __source: !0 };
function pd(e, t, n) {
  var r,
    i = {},
    s = null,
    o = null;
  n !== void 0 && (s = "" + n),
    t.key !== void 0 && (s = "" + t.key),
    t.ref !== void 0 && (o = t.ref);
  for (r in t) mg.call(t, r) && !yg.hasOwnProperty(r) && (i[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
  return {
    $$typeof: pg,
    type: e,
    key: s,
    ref: o,
    props: i,
    _owner: gg.current,
  };
}
Ds.Fragment = hg;
Ds.jsx = pd;
Ds.jsxs = pd;
rd.exports = Ds;
var S = rd.exports,
  $o = {},
  hd = { exports: {} },
  je = {},
  md = { exports: {} },
  gd = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(L, R) {
    var O = L.length;
    L.push(R);
    e: for (; 0 < O; ) {
      var H = (O - 1) >>> 1,
        se = L[H];
      if (0 < i(se, R)) (L[H] = R), (L[O] = se), (O = H);
      else break e;
    }
  }
  function n(L) {
    return L.length === 0 ? null : L[0];
  }
  function r(L) {
    if (L.length === 0) return null;
    var R = L[0],
      O = L.pop();
    if (O !== R) {
      L[0] = O;
      e: for (var H = 0, se = L.length, pi = se >>> 1; H < pi; ) {
        var Ht = 2 * (H + 1) - 1,
          Js = L[Ht],
          Kt = Ht + 1,
          hi = L[Kt];
        if (0 > i(Js, O))
          Kt < se && 0 > i(hi, Js)
            ? ((L[H] = hi), (L[Kt] = O), (H = Kt))
            : ((L[H] = Js), (L[Ht] = O), (H = Ht));
        else if (Kt < se && 0 > i(hi, O)) (L[H] = hi), (L[Kt] = O), (H = Kt);
        else break e;
      }
    }
    return R;
  }
  function i(L, R) {
    var O = L.sortIndex - R.sortIndex;
    return O !== 0 ? O : L.id - R.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var s = performance;
    e.unstable_now = function () {
      return s.now();
    };
  } else {
    var o = Date,
      a = o.now();
    e.unstable_now = function () {
      return o.now() - a;
    };
  }
  var l = [],
    u = [],
    c = 1,
    f = null,
    d = 3,
    g = !1,
    x = !1,
    y = !1,
    E = typeof setTimeout == "function" ? setTimeout : null,
    m = typeof clearTimeout == "function" ? clearTimeout : null,
    p = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function h(L) {
    for (var R = n(u); R !== null; ) {
      if (R.callback === null) r(u);
      else if (R.startTime <= L)
        r(u), (R.sortIndex = R.expirationTime), t(l, R);
      else break;
      R = n(u);
    }
  }
  function v(L) {
    if (((y = !1), h(L), !x))
      if (n(l) !== null) (x = !0), di(w);
      else {
        var R = n(u);
        R !== null && J(v, R.startTime - L);
      }
  }
  function w(L, R) {
    (x = !1), y && ((y = !1), m(C), (C = -1)), (g = !0);
    var O = d;
    try {
      for (
        h(R), f = n(l);
        f !== null && (!(f.expirationTime > R) || (L && !F()));

      ) {
        var H = f.callback;
        if (typeof H == "function") {
          (f.callback = null), (d = f.priorityLevel);
          var se = H(f.expirationTime <= R);
          (R = e.unstable_now()),
            typeof se == "function" ? (f.callback = se) : f === n(l) && r(l),
            h(R);
        } else r(l);
        f = n(l);
      }
      if (f !== null) var pi = !0;
      else {
        var Ht = n(u);
        Ht !== null && J(v, Ht.startTime - R), (pi = !1);
      }
      return pi;
    } finally {
      (f = null), (d = O), (g = !1);
    }
  }
  var k = !1,
    P = null,
    C = -1,
    V = 5,
    A = -1;
  function F() {
    return !(e.unstable_now() - A < V);
  }
  function xt() {
    if (P !== null) {
      var L = e.unstable_now();
      A = L;
      var R = !0;
      try {
        R = P(!0, L);
      } finally {
        R ? Wt() : ((k = !1), (P = null));
      }
    } else k = !1;
  }
  var Wt;
  if (typeof p == "function")
    Wt = function () {
      p(xt);
    };
  else if (typeof MessageChannel < "u") {
    var tr = new MessageChannel(),
      fi = tr.port2;
    (tr.port1.onmessage = xt),
      (Wt = function () {
        fi.postMessage(null);
      });
  } else
    Wt = function () {
      E(xt, 0);
    };
  function di(L) {
    (P = L), k || ((k = !0), Wt());
  }
  function J(L, R) {
    C = E(function () {
      L(e.unstable_now());
    }, R);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (L) {
      L.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      x || g || ((x = !0), di(w));
    }),
    (e.unstable_forceFrameRate = function (L) {
      0 > L || 125 < L
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (V = 0 < L ? Math.floor(1e3 / L) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return d;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(l);
    }),
    (e.unstable_next = function (L) {
      switch (d) {
        case 1:
        case 2:
        case 3:
          var R = 3;
          break;
        default:
          R = d;
      }
      var O = d;
      d = R;
      try {
        return L();
      } finally {
        d = O;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (L, R) {
      switch (L) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          L = 3;
      }
      var O = d;
      d = L;
      try {
        return R();
      } finally {
        d = O;
      }
    }),
    (e.unstable_scheduleCallback = function (L, R, O) {
      var H = e.unstable_now();
      switch (
        (typeof O == "object" && O !== null
          ? ((O = O.delay), (O = typeof O == "number" && 0 < O ? H + O : H))
          : (O = H),
        L)
      ) {
        case 1:
          var se = -1;
          break;
        case 2:
          se = 250;
          break;
        case 5:
          se = 1073741823;
          break;
        case 4:
          se = 1e4;
          break;
        default:
          se = 5e3;
      }
      return (
        (se = O + se),
        (L = {
          id: c++,
          callback: R,
          priorityLevel: L,
          startTime: O,
          expirationTime: se,
          sortIndex: -1,
        }),
        O > H
          ? ((L.sortIndex = O),
            t(u, L),
            n(l) === null &&
              L === n(u) &&
              (y ? (m(C), (C = -1)) : (y = !0), J(v, O - H)))
          : ((L.sortIndex = se), t(l, L), x || g || ((x = !0), di(w))),
        L
      );
    }),
    (e.unstable_shouldYield = F),
    (e.unstable_wrapCallback = function (L) {
      var R = d;
      return function () {
        var O = d;
        d = R;
        try {
          return L.apply(this, arguments);
        } finally {
          d = O;
        }
      };
    });
})(gd);
md.exports = gd;
var vg = md.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var xg = T,
  Re = vg;
function M(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var yd = new Set(),
  Ar = {};
function pn(e, t) {
  Bn(e, t), Bn(e + "Capture", t);
}
function Bn(e, t) {
  for (Ar[e] = t, e = 0; e < t.length; e++) yd.add(t[e]);
}
var ft = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Wo = Object.prototype.hasOwnProperty,
  wg =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  ju = {},
  Vu = {};
function Sg(e) {
  return Wo.call(Vu, e)
    ? !0
    : Wo.call(ju, e)
    ? !1
    : wg.test(e)
    ? (Vu[e] = !0)
    : ((ju[e] = !0), !1);
}
function kg(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Tg(e, t, n, r) {
  if (t === null || typeof t > "u" || kg(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function ke(e, t, n, r, i, s, o) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = i),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = s),
    (this.removeEmptyString = o);
}
var de = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    de[e] = new ke(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  de[t] = new ke(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  de[e] = new ke(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  de[e] = new ke(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    de[e] = new ke(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  de[e] = new ke(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  de[e] = new ke(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  de[e] = new ke(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  de[e] = new ke(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var ll = /[\-:]([a-z])/g;
function ul(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(ll, ul);
    de[t] = new ke(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(ll, ul);
    de[t] = new ke(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(ll, ul);
  de[t] = new ke(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  de[e] = new ke(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
de.xlinkHref = new ke(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  de[e] = new ke(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function cl(e, t, n, r) {
  var i = de.hasOwnProperty(t) ? de[t] : null;
  (i !== null
    ? i.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Tg(t, n, i, r) && (n = null),
    r || i === null
      ? Sg(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : i.mustUseProperty
      ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : "") : n)
      : ((t = i.attributeName),
        (r = i.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((i = i.type),
            (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var vt = xg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  gi = Symbol.for("react.element"),
  gn = Symbol.for("react.portal"),
  yn = Symbol.for("react.fragment"),
  fl = Symbol.for("react.strict_mode"),
  Ho = Symbol.for("react.profiler"),
  vd = Symbol.for("react.provider"),
  xd = Symbol.for("react.context"),
  dl = Symbol.for("react.forward_ref"),
  Ko = Symbol.for("react.suspense"),
  Go = Symbol.for("react.suspense_list"),
  pl = Symbol.for("react.memo"),
  Tt = Symbol.for("react.lazy"),
  wd = Symbol.for("react.offscreen"),
  Ou = Symbol.iterator;
function nr(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Ou && e[Ou]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Y = Object.assign,
  eo;
function fr(e) {
  if (eo === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      eo = (t && t[1]) || "";
    }
  return (
    `
` +
    eo +
    e
  );
}
var to = !1;
function no(e, t) {
  if (!e || to) return "";
  to = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (
        var i = u.stack.split(`
`),
          s = r.stack.split(`
`),
          o = i.length - 1,
          a = s.length - 1;
        1 <= o && 0 <= a && i[o] !== s[a];

      )
        a--;
      for (; 1 <= o && 0 <= a; o--, a--)
        if (i[o] !== s[a]) {
          if (o !== 1 || a !== 1)
            do
              if ((o--, a--, 0 > a || i[o] !== s[a])) {
                var l =
                  `
` + i[o].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    l.includes("<anonymous>") &&
                    (l = l.replace("<anonymous>", e.displayName)),
                  l
                );
              }
            while (1 <= o && 0 <= a);
          break;
        }
    }
  } finally {
    (to = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? fr(e) : "";
}
function Cg(e) {
  switch (e.tag) {
    case 5:
      return fr(e.type);
    case 16:
      return fr("Lazy");
    case 13:
      return fr("Suspense");
    case 19:
      return fr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = no(e.type, !1)), e;
    case 11:
      return (e = no(e.type.render, !1)), e;
    case 1:
      return (e = no(e.type, !0)), e;
    default:
      return "";
  }
}
function Qo(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case yn:
      return "Fragment";
    case gn:
      return "Portal";
    case Ho:
      return "Profiler";
    case fl:
      return "StrictMode";
    case Ko:
      return "Suspense";
    case Go:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case xd:
        return (e.displayName || "Context") + ".Consumer";
      case vd:
        return (e._context.displayName || "Context") + ".Provider";
      case dl:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case pl:
        return (
          (t = e.displayName || null), t !== null ? t : Qo(e.type) || "Memo"
        );
      case Tt:
        (t = e._payload), (e = e._init);
        try {
          return Qo(e(t));
        } catch {}
    }
  return null;
}
function Eg(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qo(t);
    case 8:
      return t === fl ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function It(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Sd(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function Pg(e) {
  var t = Sd(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var i = n.get,
      s = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return i.call(this);
        },
        set: function (o) {
          (r = "" + o), s.call(this, o);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (o) {
          r = "" + o;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function yi(e) {
  e._valueTracker || (e._valueTracker = Pg(e));
}
function kd(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = Sd(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function es(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Yo(e, t) {
  var n = t.checked;
  return Y({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function _u(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = It(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function Td(e, t) {
  (t = t.checked), t != null && cl(e, "checked", t, !1);
}
function Xo(e, t) {
  Td(e, t);
  var n = It(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? Zo(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Zo(e, t.type, It(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function Iu(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function Zo(e, t, n) {
  (t !== "number" || es(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var dr = Array.isArray;
function Vn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
    for (n = 0; n < e.length; n++)
      (i = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== i && (e[n].selected = i),
        i && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + It(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        (e[i].selected = !0), r && (e[i].defaultSelected = !0);
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function Jo(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(M(91));
  return Y({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function Fu(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(M(92));
      if (dr(n)) {
        if (1 < n.length) throw Error(M(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: It(n) };
}
function Cd(e, t) {
  var n = It(t.value),
    r = It(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function zu(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Ed(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function qo(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? Ed(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var vi,
  Pd = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, i) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, i);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        vi = vi || document.createElement("div"),
          vi.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = vi.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Rr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var gr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Mg = ["Webkit", "ms", "Moz", "O"];
Object.keys(gr).forEach(function (e) {
  Mg.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (gr[t] = gr[e]);
  });
});
function Md(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (gr.hasOwnProperty(e) && gr[e])
    ? ("" + t).trim()
    : t + "px";
}
function Ld(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        i = Md(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : (e[n] = i);
    }
}
var Lg = Y(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function ea(e, t) {
  if (t) {
    if (Lg[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(M(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(M(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(M(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(M(62));
  }
}
function ta(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var na = null;
function hl(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var ra = null,
  On = null,
  _n = null;
function bu(e) {
  if ((e = ri(e))) {
    if (typeof ra != "function") throw Error(M(280));
    var t = e.stateNode;
    t && ((t = Os(t)), ra(e.stateNode, e.type, t));
  }
}
function Nd(e) {
  On ? (_n ? _n.push(e) : (_n = [e])) : (On = e);
}
function Dd() {
  if (On) {
    var e = On,
      t = _n;
    if (((_n = On = null), bu(e), t)) for (e = 0; e < t.length; e++) bu(t[e]);
  }
}
function Ad(e, t) {
  return e(t);
}
function Rd() {}
var ro = !1;
function jd(e, t, n) {
  if (ro) return e(t, n);
  ro = !0;
  try {
    return Ad(e, t, n);
  } finally {
    (ro = !1), (On !== null || _n !== null) && (Rd(), Dd());
  }
}
function jr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Os(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(M(231, t, typeof n));
  return n;
}
var ia = !1;
if (ft)
  try {
    var rr = {};
    Object.defineProperty(rr, "passive", {
      get: function () {
        ia = !0;
      },
    }),
      window.addEventListener("test", rr, rr),
      window.removeEventListener("test", rr, rr);
  } catch {
    ia = !1;
  }
function Ng(e, t, n, r, i, s, o, a, l) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (c) {
    this.onError(c);
  }
}
var yr = !1,
  ts = null,
  ns = !1,
  sa = null,
  Dg = {
    onError: function (e) {
      (yr = !0), (ts = e);
    },
  };
function Ag(e, t, n, r, i, s, o, a, l) {
  (yr = !1), (ts = null), Ng.apply(Dg, arguments);
}
function Rg(e, t, n, r, i, s, o, a, l) {
  if ((Ag.apply(this, arguments), yr)) {
    if (yr) {
      var u = ts;
      (yr = !1), (ts = null);
    } else throw Error(M(198));
    ns || ((ns = !0), (sa = u));
  }
}
function hn(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Vd(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Bu(e) {
  if (hn(e) !== e) throw Error(M(188));
}
function jg(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = hn(e)), t === null)) throw Error(M(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var i = n.return;
    if (i === null) break;
    var s = i.alternate;
    if (s === null) {
      if (((r = i.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (i.child === s.child) {
      for (s = i.child; s; ) {
        if (s === n) return Bu(i), e;
        if (s === r) return Bu(i), t;
        s = s.sibling;
      }
      throw Error(M(188));
    }
    if (n.return !== r.return) (n = i), (r = s);
    else {
      for (var o = !1, a = i.child; a; ) {
        if (a === n) {
          (o = !0), (n = i), (r = s);
          break;
        }
        if (a === r) {
          (o = !0), (r = i), (n = s);
          break;
        }
        a = a.sibling;
      }
      if (!o) {
        for (a = s.child; a; ) {
          if (a === n) {
            (o = !0), (n = s), (r = i);
            break;
          }
          if (a === r) {
            (o = !0), (r = s), (n = i);
            break;
          }
          a = a.sibling;
        }
        if (!o) throw Error(M(189));
      }
    }
    if (n.alternate !== r) throw Error(M(190));
  }
  if (n.tag !== 3) throw Error(M(188));
  return n.stateNode.current === n ? e : t;
}
function Od(e) {
  return (e = jg(e)), e !== null ? _d(e) : null;
}
function _d(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = _d(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Id = Re.unstable_scheduleCallback,
  Uu = Re.unstable_cancelCallback,
  Vg = Re.unstable_shouldYield,
  Og = Re.unstable_requestPaint,
  ee = Re.unstable_now,
  _g = Re.unstable_getCurrentPriorityLevel,
  ml = Re.unstable_ImmediatePriority,
  Fd = Re.unstable_UserBlockingPriority,
  rs = Re.unstable_NormalPriority,
  Ig = Re.unstable_LowPriority,
  zd = Re.unstable_IdlePriority,
  As = null,
  nt = null;
function Fg(e) {
  if (nt && typeof nt.onCommitFiberRoot == "function")
    try {
      nt.onCommitFiberRoot(As, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Xe = Math.clz32 ? Math.clz32 : Bg,
  zg = Math.log,
  bg = Math.LN2;
function Bg(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((zg(e) / bg) | 0)) | 0;
}
var xi = 64,
  wi = 4194304;
function pr(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function is(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    i = e.suspendedLanes,
    s = e.pingedLanes,
    o = n & 268435455;
  if (o !== 0) {
    var a = o & ~i;
    a !== 0 ? (r = pr(a)) : ((s &= o), s !== 0 && (r = pr(s)));
  } else (o = n & ~i), o !== 0 ? (r = pr(o)) : s !== 0 && (r = pr(s));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & i) &&
    ((i = r & -r), (s = t & -t), i >= s || (i === 16 && (s & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - Xe(t)), (i = 1 << n), (r |= e[n]), (t &= ~i);
  return r;
}
function Ug(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function $g(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      i = e.expirationTimes,
      s = e.pendingLanes;
    0 < s;

  ) {
    var o = 31 - Xe(s),
      a = 1 << o,
      l = i[o];
    l === -1
      ? (!(a & n) || a & r) && (i[o] = Ug(a, t))
      : l <= t && (e.expiredLanes |= a),
      (s &= ~a);
  }
}
function oa(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function bd() {
  var e = xi;
  return (xi <<= 1), !(xi & 4194240) && (xi = 64), e;
}
function io(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function ti(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Xe(t)),
    (e[t] = n);
}
function Wg(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var i = 31 - Xe(n),
      s = 1 << i;
    (t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~s);
  }
}
function gl(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Xe(n),
      i = 1 << r;
    (i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i);
  }
}
var z = 0;
function Bd(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var Ud,
  yl,
  $d,
  Wd,
  Hd,
  aa = !1,
  Si = [],
  Nt = null,
  Dt = null,
  At = null,
  Vr = new Map(),
  Or = new Map(),
  Et = [],
  Hg =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function $u(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Nt = null;
      break;
    case "dragenter":
    case "dragleave":
      Dt = null;
      break;
    case "mouseover":
    case "mouseout":
      At = null;
      break;
    case "pointerover":
    case "pointerout":
      Vr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Or.delete(t.pointerId);
  }
}
function ir(e, t, n, r, i, s) {
  return e === null || e.nativeEvent !== s
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: s,
        targetContainers: [i],
      }),
      t !== null && ((t = ri(t)), t !== null && yl(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      i !== null && t.indexOf(i) === -1 && t.push(i),
      e);
}
function Kg(e, t, n, r, i) {
  switch (t) {
    case "focusin":
      return (Nt = ir(Nt, e, t, n, r, i)), !0;
    case "dragenter":
      return (Dt = ir(Dt, e, t, n, r, i)), !0;
    case "mouseover":
      return (At = ir(At, e, t, n, r, i)), !0;
    case "pointerover":
      var s = i.pointerId;
      return Vr.set(s, ir(Vr.get(s) || null, e, t, n, r, i)), !0;
    case "gotpointercapture":
      return (
        (s = i.pointerId), Or.set(s, ir(Or.get(s) || null, e, t, n, r, i)), !0
      );
  }
  return !1;
}
function Kd(e) {
  var t = Zt(e.target);
  if (t !== null) {
    var n = hn(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Vd(n)), t !== null)) {
          (e.blockedOn = t),
            Hd(e.priority, function () {
              $d(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function bi(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = la(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (na = r), n.target.dispatchEvent(r), (na = null);
    } else return (t = ri(n)), t !== null && yl(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function Wu(e, t, n) {
  bi(e) && n.delete(t);
}
function Gg() {
  (aa = !1),
    Nt !== null && bi(Nt) && (Nt = null),
    Dt !== null && bi(Dt) && (Dt = null),
    At !== null && bi(At) && (At = null),
    Vr.forEach(Wu),
    Or.forEach(Wu);
}
function sr(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    aa ||
      ((aa = !0),
      Re.unstable_scheduleCallback(Re.unstable_NormalPriority, Gg)));
}
function _r(e) {
  function t(i) {
    return sr(i, e);
  }
  if (0 < Si.length) {
    sr(Si[0], e);
    for (var n = 1; n < Si.length; n++) {
      var r = Si[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Nt !== null && sr(Nt, e),
      Dt !== null && sr(Dt, e),
      At !== null && sr(At, e),
      Vr.forEach(t),
      Or.forEach(t),
      n = 0;
    n < Et.length;
    n++
  )
    (r = Et[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Et.length && ((n = Et[0]), n.blockedOn === null); )
    Kd(n), n.blockedOn === null && Et.shift();
}
var In = vt.ReactCurrentBatchConfig,
  ss = !0;
function Qg(e, t, n, r) {
  var i = z,
    s = In.transition;
  In.transition = null;
  try {
    (z = 1), vl(e, t, n, r);
  } finally {
    (z = i), (In.transition = s);
  }
}
function Yg(e, t, n, r) {
  var i = z,
    s = In.transition;
  In.transition = null;
  try {
    (z = 4), vl(e, t, n, r);
  } finally {
    (z = i), (In.transition = s);
  }
}
function vl(e, t, n, r) {
  if (ss) {
    var i = la(e, t, n, r);
    if (i === null) mo(e, t, r, os, n), $u(e, r);
    else if (Kg(i, e, t, n, r)) r.stopPropagation();
    else if (($u(e, r), t & 4 && -1 < Hg.indexOf(e))) {
      for (; i !== null; ) {
        var s = ri(i);
        if (
          (s !== null && Ud(s),
          (s = la(e, t, n, r)),
          s === null && mo(e, t, r, os, n),
          s === i)
        )
          break;
        i = s;
      }
      i !== null && r.stopPropagation();
    } else mo(e, t, r, null, n);
  }
}
var os = null;
function la(e, t, n, r) {
  if (((os = null), (e = hl(r)), (e = Zt(e)), e !== null))
    if (((t = hn(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Vd(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (os = e), null;
}
function Gd(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (_g()) {
        case ml:
          return 1;
        case Fd:
          return 4;
        case rs:
        case Ig:
          return 16;
        case zd:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Mt = null,
  xl = null,
  Bi = null;
function Qd() {
  if (Bi) return Bi;
  var e,
    t = xl,
    n = t.length,
    r,
    i = "value" in Mt ? Mt.value : Mt.textContent,
    s = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++);
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === i[s - r]; r++);
  return (Bi = i.slice(e, 1 < r ? 1 - r : void 0));
}
function Ui(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function ki() {
  return !0;
}
function Hu() {
  return !1;
}
function Ve(e) {
  function t(n, r, i, s, o) {
    (this._reactName = n),
      (this._targetInst = i),
      (this.type = r),
      (this.nativeEvent = s),
      (this.target = o),
      (this.currentTarget = null);
    for (var a in e)
      e.hasOwnProperty(a) && ((n = e[a]), (this[a] = n ? n(s) : s[a]));
    return (
      (this.isDefaultPrevented = (
        s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1
      )
        ? ki
        : Hu),
      (this.isPropagationStopped = Hu),
      this
    );
  }
  return (
    Y(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = ki));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = ki));
      },
      persist: function () {},
      isPersistent: ki,
    }),
    t
  );
}
var Xn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  wl = Ve(Xn),
  ni = Y({}, Xn, { view: 0, detail: 0 }),
  Xg = Ve(ni),
  so,
  oo,
  or,
  Rs = Y({}, ni, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Sl,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== or &&
            (or && e.type === "mousemove"
              ? ((so = e.screenX - or.screenX), (oo = e.screenY - or.screenY))
              : (oo = so = 0),
            (or = e)),
          so);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : oo;
    },
  }),
  Ku = Ve(Rs),
  Zg = Y({}, Rs, { dataTransfer: 0 }),
  Jg = Ve(Zg),
  qg = Y({}, ni, { relatedTarget: 0 }),
  ao = Ve(qg),
  e0 = Y({}, Xn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  t0 = Ve(e0),
  n0 = Y({}, Xn, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  r0 = Ve(n0),
  i0 = Y({}, Xn, { data: 0 }),
  Gu = Ve(i0),
  s0 = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  o0 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  a0 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function l0(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = a0[e]) ? !!t[e] : !1;
}
function Sl() {
  return l0;
}
var u0 = Y({}, ni, {
    key: function (e) {
      if (e.key) {
        var t = s0[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Ui(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? o0[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Sl,
    charCode: function (e) {
      return e.type === "keypress" ? Ui(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Ui(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  c0 = Ve(u0),
  f0 = Y({}, Rs, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Qu = Ve(f0),
  d0 = Y({}, ni, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Sl,
  }),
  p0 = Ve(d0),
  h0 = Y({}, Xn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  m0 = Ve(h0),
  g0 = Y({}, Rs, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  y0 = Ve(g0),
  v0 = [9, 13, 27, 32],
  kl = ft && "CompositionEvent" in window,
  vr = null;
ft && "documentMode" in document && (vr = document.documentMode);
var x0 = ft && "TextEvent" in window && !vr,
  Yd = ft && (!kl || (vr && 8 < vr && 11 >= vr)),
  Yu = " ",
  Xu = !1;
function Xd(e, t) {
  switch (e) {
    case "keyup":
      return v0.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Zd(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var vn = !1;
function w0(e, t) {
  switch (e) {
    case "compositionend":
      return Zd(t);
    case "keypress":
      return t.which !== 32 ? null : ((Xu = !0), Yu);
    case "textInput":
      return (e = t.data), e === Yu && Xu ? null : e;
    default:
      return null;
  }
}
function S0(e, t) {
  if (vn)
    return e === "compositionend" || (!kl && Xd(e, t))
      ? ((e = Qd()), (Bi = xl = Mt = null), (vn = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Yd && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var k0 = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Zu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!k0[e.type] : t === "textarea";
}
function Jd(e, t, n, r) {
  Nd(r),
    (t = as(t, "onChange")),
    0 < t.length &&
      ((n = new wl("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var xr = null,
  Ir = null;
function T0(e) {
  up(e, 0);
}
function js(e) {
  var t = Sn(e);
  if (kd(t)) return e;
}
function C0(e, t) {
  if (e === "change") return t;
}
var qd = !1;
if (ft) {
  var lo;
  if (ft) {
    var uo = "oninput" in document;
    if (!uo) {
      var Ju = document.createElement("div");
      Ju.setAttribute("oninput", "return;"),
        (uo = typeof Ju.oninput == "function");
    }
    lo = uo;
  } else lo = !1;
  qd = lo && (!document.documentMode || 9 < document.documentMode);
}
function qu() {
  xr && (xr.detachEvent("onpropertychange", ep), (Ir = xr = null));
}
function ep(e) {
  if (e.propertyName === "value" && js(Ir)) {
    var t = [];
    Jd(t, Ir, e, hl(e)), jd(T0, t);
  }
}
function E0(e, t, n) {
  e === "focusin"
    ? (qu(), (xr = t), (Ir = n), xr.attachEvent("onpropertychange", ep))
    : e === "focusout" && qu();
}
function P0(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return js(Ir);
}
function M0(e, t) {
  if (e === "click") return js(t);
}
function L0(e, t) {
  if (e === "input" || e === "change") return js(t);
}
function N0(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Je = typeof Object.is == "function" ? Object.is : N0;
function Fr(e, t) {
  if (Je(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!Wo.call(t, i) || !Je(e[i], t[i])) return !1;
  }
  return !0;
}
function ec(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function tc(e, t) {
  var n = ec(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = ec(n);
  }
}
function tp(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? tp(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function np() {
  for (var e = window, t = es(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = es(e.document);
  }
  return t;
}
function Tl(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function D0(e) {
  var t = np(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    tp(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && Tl(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var i = n.textContent.length,
          s = Math.min(r.start, i);
        (r = r.end === void 0 ? s : Math.min(r.end, i)),
          !e.extend && s > r && ((i = r), (r = s), (s = i)),
          (i = tc(n, s));
        var o = tc(n, r);
        i &&
          o &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== i.node ||
            e.anchorOffset !== i.offset ||
            e.focusNode !== o.node ||
            e.focusOffset !== o.offset) &&
          ((t = t.createRange()),
          t.setStart(i.node, i.offset),
          e.removeAllRanges(),
          s > r
            ? (e.addRange(t), e.extend(o.node, o.offset))
            : (t.setEnd(o.node, o.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var A0 = ft && "documentMode" in document && 11 >= document.documentMode,
  xn = null,
  ua = null,
  wr = null,
  ca = !1;
function nc(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  ca ||
    xn == null ||
    xn !== es(r) ||
    ((r = xn),
    "selectionStart" in r && Tl(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (wr && Fr(wr, r)) ||
      ((wr = r),
      (r = as(ua, "onSelect")),
      0 < r.length &&
        ((t = new wl("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = xn))));
}
function Ti(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var wn = {
    animationend: Ti("Animation", "AnimationEnd"),
    animationiteration: Ti("Animation", "AnimationIteration"),
    animationstart: Ti("Animation", "AnimationStart"),
    transitionend: Ti("Transition", "TransitionEnd"),
  },
  co = {},
  rp = {};
ft &&
  ((rp = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete wn.animationend.animation,
    delete wn.animationiteration.animation,
    delete wn.animationstart.animation),
  "TransitionEvent" in window || delete wn.transitionend.transition);
function Vs(e) {
  if (co[e]) return co[e];
  if (!wn[e]) return e;
  var t = wn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in rp) return (co[e] = t[n]);
  return e;
}
var ip = Vs("animationend"),
  sp = Vs("animationiteration"),
  op = Vs("animationstart"),
  ap = Vs("transitionend"),
  lp = new Map(),
  rc =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function bt(e, t) {
  lp.set(e, t), pn(t, [e]);
}
for (var fo = 0; fo < rc.length; fo++) {
  var po = rc[fo],
    R0 = po.toLowerCase(),
    j0 = po[0].toUpperCase() + po.slice(1);
  bt(R0, "on" + j0);
}
bt(ip, "onAnimationEnd");
bt(sp, "onAnimationIteration");
bt(op, "onAnimationStart");
bt("dblclick", "onDoubleClick");
bt("focusin", "onFocus");
bt("focusout", "onBlur");
bt(ap, "onTransitionEnd");
Bn("onMouseEnter", ["mouseout", "mouseover"]);
Bn("onMouseLeave", ["mouseout", "mouseover"]);
Bn("onPointerEnter", ["pointerout", "pointerover"]);
Bn("onPointerLeave", ["pointerout", "pointerover"]);
pn(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
pn(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
pn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
pn(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
pn(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
pn(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var hr =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  V0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(hr));
function ic(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), Rg(r, t, void 0, e), (e.currentTarget = null);
}
function up(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      i = r.event;
    r = r.listeners;
    e: {
      var s = void 0;
      if (t)
        for (var o = r.length - 1; 0 <= o; o--) {
          var a = r[o],
            l = a.instance,
            u = a.currentTarget;
          if (((a = a.listener), l !== s && i.isPropagationStopped())) break e;
          ic(i, a, u), (s = l);
        }
      else
        for (o = 0; o < r.length; o++) {
          if (
            ((a = r[o]),
            (l = a.instance),
            (u = a.currentTarget),
            (a = a.listener),
            l !== s && i.isPropagationStopped())
          )
            break e;
          ic(i, a, u), (s = l);
        }
    }
  }
  if (ns) throw ((e = sa), (ns = !1), (sa = null), e);
}
function U(e, t) {
  var n = t[ma];
  n === void 0 && (n = t[ma] = new Set());
  var r = e + "__bubble";
  n.has(r) || (cp(t, e, 2, !1), n.add(r));
}
function ho(e, t, n) {
  var r = 0;
  t && (r |= 4), cp(n, e, r, t);
}
var Ci = "_reactListening" + Math.random().toString(36).slice(2);
function zr(e) {
  if (!e[Ci]) {
    (e[Ci] = !0),
      yd.forEach(function (n) {
        n !== "selectionchange" && (V0.has(n) || ho(n, !1, e), ho(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Ci] || ((t[Ci] = !0), ho("selectionchange", !1, t));
  }
}
function cp(e, t, n, r) {
  switch (Gd(t)) {
    case 1:
      var i = Qg;
      break;
    case 4:
      i = Yg;
      break;
    default:
      i = vl;
  }
  (n = i.bind(null, t, n, e)),
    (i = void 0),
    !ia ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (i = !0),
    r
      ? i !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: i })
        : e.addEventListener(t, n, !0)
      : i !== void 0
      ? e.addEventListener(t, n, { passive: i })
      : e.addEventListener(t, n, !1);
}
function mo(e, t, n, r, i) {
  var s = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var o = r.tag;
      if (o === 3 || o === 4) {
        var a = r.stateNode.containerInfo;
        if (a === i || (a.nodeType === 8 && a.parentNode === i)) break;
        if (o === 4)
          for (o = r.return; o !== null; ) {
            var l = o.tag;
            if (
              (l === 3 || l === 4) &&
              ((l = o.stateNode.containerInfo),
              l === i || (l.nodeType === 8 && l.parentNode === i))
            )
              return;
            o = o.return;
          }
        for (; a !== null; ) {
          if (((o = Zt(a)), o === null)) return;
          if (((l = o.tag), l === 5 || l === 6)) {
            r = s = o;
            continue e;
          }
          a = a.parentNode;
        }
      }
      r = r.return;
    }
  jd(function () {
    var u = s,
      c = hl(n),
      f = [];
    e: {
      var d = lp.get(e);
      if (d !== void 0) {
        var g = wl,
          x = e;
        switch (e) {
          case "keypress":
            if (Ui(n) === 0) break e;
          case "keydown":
          case "keyup":
            g = c0;
            break;
          case "focusin":
            (x = "focus"), (g = ao);
            break;
          case "focusout":
            (x = "blur"), (g = ao);
            break;
          case "beforeblur":
          case "afterblur":
            g = ao;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            g = Ku;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            g = Jg;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            g = p0;
            break;
          case ip:
          case sp:
          case op:
            g = t0;
            break;
          case ap:
            g = m0;
            break;
          case "scroll":
            g = Xg;
            break;
          case "wheel":
            g = y0;
            break;
          case "copy":
          case "cut":
          case "paste":
            g = r0;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            g = Qu;
        }
        var y = (t & 4) !== 0,
          E = !y && e === "scroll",
          m = y ? (d !== null ? d + "Capture" : null) : d;
        y = [];
        for (var p = u, h; p !== null; ) {
          h = p;
          var v = h.stateNode;
          if (
            (h.tag === 5 &&
              v !== null &&
              ((h = v),
              m !== null && ((v = jr(p, m)), v != null && y.push(br(p, v, h)))),
            E)
          )
            break;
          p = p.return;
        }
        0 < y.length &&
          ((d = new g(d, x, null, n, c)), f.push({ event: d, listeners: y }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((d = e === "mouseover" || e === "pointerover"),
          (g = e === "mouseout" || e === "pointerout"),
          d &&
            n !== na &&
            (x = n.relatedTarget || n.fromElement) &&
            (Zt(x) || x[dt]))
        )
          break e;
        if (
          (g || d) &&
          ((d =
            c.window === c
              ? c
              : (d = c.ownerDocument)
              ? d.defaultView || d.parentWindow
              : window),
          g
            ? ((x = n.relatedTarget || n.toElement),
              (g = u),
              (x = x ? Zt(x) : null),
              x !== null &&
                ((E = hn(x)), x !== E || (x.tag !== 5 && x.tag !== 6)) &&
                (x = null))
            : ((g = null), (x = u)),
          g !== x)
        ) {
          if (
            ((y = Ku),
            (v = "onMouseLeave"),
            (m = "onMouseEnter"),
            (p = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((y = Qu),
              (v = "onPointerLeave"),
              (m = "onPointerEnter"),
              (p = "pointer")),
            (E = g == null ? d : Sn(g)),
            (h = x == null ? d : Sn(x)),
            (d = new y(v, p + "leave", g, n, c)),
            (d.target = E),
            (d.relatedTarget = h),
            (v = null),
            Zt(c) === u &&
              ((y = new y(m, p + "enter", x, n, c)),
              (y.target = h),
              (y.relatedTarget = E),
              (v = y)),
            (E = v),
            g && x)
          )
            t: {
              for (y = g, m = x, p = 0, h = y; h; h = mn(h)) p++;
              for (h = 0, v = m; v; v = mn(v)) h++;
              for (; 0 < p - h; ) (y = mn(y)), p--;
              for (; 0 < h - p; ) (m = mn(m)), h--;
              for (; p--; ) {
                if (y === m || (m !== null && y === m.alternate)) break t;
                (y = mn(y)), (m = mn(m));
              }
              y = null;
            }
          else y = null;
          g !== null && sc(f, d, g, y, !1),
            x !== null && E !== null && sc(f, E, x, y, !0);
        }
      }
      e: {
        if (
          ((d = u ? Sn(u) : window),
          (g = d.nodeName && d.nodeName.toLowerCase()),
          g === "select" || (g === "input" && d.type === "file"))
        )
          var w = C0;
        else if (Zu(d))
          if (qd) w = L0;
          else {
            w = P0;
            var k = E0;
          }
        else
          (g = d.nodeName) &&
            g.toLowerCase() === "input" &&
            (d.type === "checkbox" || d.type === "radio") &&
            (w = M0);
        if (w && (w = w(e, u))) {
          Jd(f, w, n, c);
          break e;
        }
        k && k(e, d, u),
          e === "focusout" &&
            (k = d._wrapperState) &&
            k.controlled &&
            d.type === "number" &&
            Zo(d, "number", d.value);
      }
      switch (((k = u ? Sn(u) : window), e)) {
        case "focusin":
          (Zu(k) || k.contentEditable === "true") &&
            ((xn = k), (ua = u), (wr = null));
          break;
        case "focusout":
          wr = ua = xn = null;
          break;
        case "mousedown":
          ca = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (ca = !1), nc(f, n, c);
          break;
        case "selectionchange":
          if (A0) break;
        case "keydown":
        case "keyup":
          nc(f, n, c);
      }
      var P;
      if (kl)
        e: {
          switch (e) {
            case "compositionstart":
              var C = "onCompositionStart";
              break e;
            case "compositionend":
              C = "onCompositionEnd";
              break e;
            case "compositionupdate":
              C = "onCompositionUpdate";
              break e;
          }
          C = void 0;
        }
      else
        vn
          ? Xd(e, n) && (C = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (C = "onCompositionStart");
      C &&
        (Yd &&
          n.locale !== "ko" &&
          (vn || C !== "onCompositionStart"
            ? C === "onCompositionEnd" && vn && (P = Qd())
            : ((Mt = c),
              (xl = "value" in Mt ? Mt.value : Mt.textContent),
              (vn = !0))),
        (k = as(u, C)),
        0 < k.length &&
          ((C = new Gu(C, e, null, n, c)),
          f.push({ event: C, listeners: k }),
          P ? (C.data = P) : ((P = Zd(n)), P !== null && (C.data = P)))),
        (P = x0 ? w0(e, n) : S0(e, n)) &&
          ((u = as(u, "onBeforeInput")),
          0 < u.length &&
            ((c = new Gu("onBeforeInput", "beforeinput", null, n, c)),
            f.push({ event: c, listeners: u }),
            (c.data = P)));
    }
    up(f, t);
  });
}
function br(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function as(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var i = e,
      s = i.stateNode;
    i.tag === 5 &&
      s !== null &&
      ((i = s),
      (s = jr(e, n)),
      s != null && r.unshift(br(e, s, i)),
      (s = jr(e, t)),
      s != null && r.push(br(e, s, i))),
      (e = e.return);
  }
  return r;
}
function mn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function sc(e, t, n, r, i) {
  for (var s = t._reactName, o = []; n !== null && n !== r; ) {
    var a = n,
      l = a.alternate,
      u = a.stateNode;
    if (l !== null && l === r) break;
    a.tag === 5 &&
      u !== null &&
      ((a = u),
      i
        ? ((l = jr(n, s)), l != null && o.unshift(br(n, l, a)))
        : i || ((l = jr(n, s)), l != null && o.push(br(n, l, a)))),
      (n = n.return);
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var O0 = /\r\n?/g,
  _0 = /\u0000|\uFFFD/g;
function oc(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      O0,
      `
`
    )
    .replace(_0, "");
}
function Ei(e, t, n) {
  if (((t = oc(t)), oc(e) !== t && n)) throw Error(M(425));
}
function ls() {}
var fa = null,
  da = null;
function pa(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var ha = typeof setTimeout == "function" ? setTimeout : void 0,
  I0 = typeof clearTimeout == "function" ? clearTimeout : void 0,
  ac = typeof Promise == "function" ? Promise : void 0,
  F0 =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof ac < "u"
      ? function (e) {
          return ac.resolve(null).then(e).catch(z0);
        }
      : ha;
function z0(e) {
  setTimeout(function () {
    throw e;
  });
}
function go(e, t) {
  var n = t,
    r = 0;
  do {
    var i = n.nextSibling;
    if ((e.removeChild(n), i && i.nodeType === 8))
      if (((n = i.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(i), _r(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = i;
  } while (n);
  _r(t);
}
function Rt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function lc(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Zn = Math.random().toString(36).slice(2),
  tt = "__reactFiber$" + Zn,
  Br = "__reactProps$" + Zn,
  dt = "__reactContainer$" + Zn,
  ma = "__reactEvents$" + Zn,
  b0 = "__reactListeners$" + Zn,
  B0 = "__reactHandles$" + Zn;
function Zt(e) {
  var t = e[tt];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[dt] || n[tt])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = lc(e); e !== null; ) {
          if ((n = e[tt])) return n;
          e = lc(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function ri(e) {
  return (
    (e = e[tt] || e[dt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Sn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(M(33));
}
function Os(e) {
  return e[Br] || null;
}
var ga = [],
  kn = -1;
function Bt(e) {
  return { current: e };
}
function $(e) {
  0 > kn || ((e.current = ga[kn]), (ga[kn] = null), kn--);
}
function b(e, t) {
  kn++, (ga[kn] = e.current), (e.current = t);
}
var Ft = {},
  ye = Bt(Ft),
  Pe = Bt(!1),
  an = Ft;
function Un(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Ft;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i = {},
    s;
  for (s in n) i[s] = t[s];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    i
  );
}
function Me(e) {
  return (e = e.childContextTypes), e != null;
}
function us() {
  $(Pe), $(ye);
}
function uc(e, t, n) {
  if (ye.current !== Ft) throw Error(M(168));
  b(ye, t), b(Pe, n);
}
function fp(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var i in r) if (!(i in t)) throw Error(M(108, Eg(e) || "Unknown", i));
  return Y({}, n, r);
}
function cs(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Ft),
    (an = ye.current),
    b(ye, e),
    b(Pe, Pe.current),
    !0
  );
}
function cc(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(M(169));
  n
    ? ((e = fp(e, t, an)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      $(Pe),
      $(ye),
      b(ye, e))
    : $(Pe),
    b(Pe, n);
}
var at = null,
  _s = !1,
  yo = !1;
function dp(e) {
  at === null ? (at = [e]) : at.push(e);
}
function U0(e) {
  (_s = !0), dp(e);
}
function Ut() {
  if (!yo && at !== null) {
    yo = !0;
    var e = 0,
      t = z;
    try {
      var n = at;
      for (z = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (at = null), (_s = !1);
    } catch (i) {
      throw (at !== null && (at = at.slice(e + 1)), Id(ml, Ut), i);
    } finally {
      (z = t), (yo = !1);
    }
  }
  return null;
}
var Tn = [],
  Cn = 0,
  fs = null,
  ds = 0,
  Ie = [],
  Fe = 0,
  ln = null,
  lt = 1,
  ut = "";
function Qt(e, t) {
  (Tn[Cn++] = ds), (Tn[Cn++] = fs), (fs = e), (ds = t);
}
function pp(e, t, n) {
  (Ie[Fe++] = lt), (Ie[Fe++] = ut), (Ie[Fe++] = ln), (ln = e);
  var r = lt;
  e = ut;
  var i = 32 - Xe(r) - 1;
  (r &= ~(1 << i)), (n += 1);
  var s = 32 - Xe(t) + i;
  if (30 < s) {
    var o = i - (i % 5);
    (s = (r & ((1 << o) - 1)).toString(32)),
      (r >>= o),
      (i -= o),
      (lt = (1 << (32 - Xe(t) + i)) | (n << i) | r),
      (ut = s + e);
  } else (lt = (1 << s) | (n << i) | r), (ut = e);
}
function Cl(e) {
  e.return !== null && (Qt(e, 1), pp(e, 1, 0));
}
function El(e) {
  for (; e === fs; )
    (fs = Tn[--Cn]), (Tn[Cn] = null), (ds = Tn[--Cn]), (Tn[Cn] = null);
  for (; e === ln; )
    (ln = Ie[--Fe]),
      (Ie[Fe] = null),
      (ut = Ie[--Fe]),
      (Ie[Fe] = null),
      (lt = Ie[--Fe]),
      (Ie[Fe] = null);
}
var Ae = null,
  De = null,
  W = !1,
  Ye = null;
function hp(e, t) {
  var n = ze(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function fc(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Ae = e), (De = Rt(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Ae = e), (De = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = ln !== null ? { id: lt, overflow: ut } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = ze(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Ae = e),
            (De = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function ya(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function va(e) {
  if (W) {
    var t = De;
    if (t) {
      var n = t;
      if (!fc(e, t)) {
        if (ya(e)) throw Error(M(418));
        t = Rt(n.nextSibling);
        var r = Ae;
        t && fc(e, t)
          ? hp(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (W = !1), (Ae = e));
      }
    } else {
      if (ya(e)) throw Error(M(418));
      (e.flags = (e.flags & -4097) | 2), (W = !1), (Ae = e);
    }
  }
}
function dc(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Ae = e;
}
function Pi(e) {
  if (e !== Ae) return !1;
  if (!W) return dc(e), (W = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !pa(e.type, e.memoizedProps))),
    t && (t = De))
  ) {
    if (ya(e)) throw (mp(), Error(M(418)));
    for (; t; ) hp(e, t), (t = Rt(t.nextSibling));
  }
  if ((dc(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(M(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              De = Rt(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      De = null;
    }
  } else De = Ae ? Rt(e.stateNode.nextSibling) : null;
  return !0;
}
function mp() {
  for (var e = De; e; ) e = Rt(e.nextSibling);
}
function $n() {
  (De = Ae = null), (W = !1);
}
function Pl(e) {
  Ye === null ? (Ye = [e]) : Ye.push(e);
}
var $0 = vt.ReactCurrentBatchConfig;
function ar(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(M(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(M(147, e));
      var i = r,
        s = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === s
        ? t.ref
        : ((t = function (o) {
            var a = i.refs;
            o === null ? delete a[s] : (a[s] = o);
          }),
          (t._stringRef = s),
          t);
    }
    if (typeof e != "string") throw Error(M(284));
    if (!n._owner) throw Error(M(290, e));
  }
  return e;
}
function Mi(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      M(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function pc(e) {
  var t = e._init;
  return t(e._payload);
}
function gp(e) {
  function t(m, p) {
    if (e) {
      var h = m.deletions;
      h === null ? ((m.deletions = [p]), (m.flags |= 16)) : h.push(p);
    }
  }
  function n(m, p) {
    if (!e) return null;
    for (; p !== null; ) t(m, p), (p = p.sibling);
    return null;
  }
  function r(m, p) {
    for (m = new Map(); p !== null; )
      p.key !== null ? m.set(p.key, p) : m.set(p.index, p), (p = p.sibling);
    return m;
  }
  function i(m, p) {
    return (m = _t(m, p)), (m.index = 0), (m.sibling = null), m;
  }
  function s(m, p, h) {
    return (
      (m.index = h),
      e
        ? ((h = m.alternate),
          h !== null
            ? ((h = h.index), h < p ? ((m.flags |= 2), p) : h)
            : ((m.flags |= 2), p))
        : ((m.flags |= 1048576), p)
    );
  }
  function o(m) {
    return e && m.alternate === null && (m.flags |= 2), m;
  }
  function a(m, p, h, v) {
    return p === null || p.tag !== 6
      ? ((p = Co(h, m.mode, v)), (p.return = m), p)
      : ((p = i(p, h)), (p.return = m), p);
  }
  function l(m, p, h, v) {
    var w = h.type;
    return w === yn
      ? c(m, p, h.props.children, v, h.key)
      : p !== null &&
        (p.elementType === w ||
          (typeof w == "object" &&
            w !== null &&
            w.$$typeof === Tt &&
            pc(w) === p.type))
      ? ((v = i(p, h.props)), (v.ref = ar(m, p, h)), (v.return = m), v)
      : ((v = Yi(h.type, h.key, h.props, null, m.mode, v)),
        (v.ref = ar(m, p, h)),
        (v.return = m),
        v);
  }
  function u(m, p, h, v) {
    return p === null ||
      p.tag !== 4 ||
      p.stateNode.containerInfo !== h.containerInfo ||
      p.stateNode.implementation !== h.implementation
      ? ((p = Eo(h, m.mode, v)), (p.return = m), p)
      : ((p = i(p, h.children || [])), (p.return = m), p);
  }
  function c(m, p, h, v, w) {
    return p === null || p.tag !== 7
      ? ((p = rn(h, m.mode, v, w)), (p.return = m), p)
      : ((p = i(p, h)), (p.return = m), p);
  }
  function f(m, p, h) {
    if ((typeof p == "string" && p !== "") || typeof p == "number")
      return (p = Co("" + p, m.mode, h)), (p.return = m), p;
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case gi:
          return (
            (h = Yi(p.type, p.key, p.props, null, m.mode, h)),
            (h.ref = ar(m, null, p)),
            (h.return = m),
            h
          );
        case gn:
          return (p = Eo(p, m.mode, h)), (p.return = m), p;
        case Tt:
          var v = p._init;
          return f(m, v(p._payload), h);
      }
      if (dr(p) || nr(p))
        return (p = rn(p, m.mode, h, null)), (p.return = m), p;
      Mi(m, p);
    }
    return null;
  }
  function d(m, p, h, v) {
    var w = p !== null ? p.key : null;
    if ((typeof h == "string" && h !== "") || typeof h == "number")
      return w !== null ? null : a(m, p, "" + h, v);
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case gi:
          return h.key === w ? l(m, p, h, v) : null;
        case gn:
          return h.key === w ? u(m, p, h, v) : null;
        case Tt:
          return (w = h._init), d(m, p, w(h._payload), v);
      }
      if (dr(h) || nr(h)) return w !== null ? null : c(m, p, h, v, null);
      Mi(m, h);
    }
    return null;
  }
  function g(m, p, h, v, w) {
    if ((typeof v == "string" && v !== "") || typeof v == "number")
      return (m = m.get(h) || null), a(p, m, "" + v, w);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case gi:
          return (m = m.get(v.key === null ? h : v.key) || null), l(p, m, v, w);
        case gn:
          return (m = m.get(v.key === null ? h : v.key) || null), u(p, m, v, w);
        case Tt:
          var k = v._init;
          return g(m, p, h, k(v._payload), w);
      }
      if (dr(v) || nr(v)) return (m = m.get(h) || null), c(p, m, v, w, null);
      Mi(p, v);
    }
    return null;
  }
  function x(m, p, h, v) {
    for (
      var w = null, k = null, P = p, C = (p = 0), V = null;
      P !== null && C < h.length;
      C++
    ) {
      P.index > C ? ((V = P), (P = null)) : (V = P.sibling);
      var A = d(m, P, h[C], v);
      if (A === null) {
        P === null && (P = V);
        break;
      }
      e && P && A.alternate === null && t(m, P),
        (p = s(A, p, C)),
        k === null ? (w = A) : (k.sibling = A),
        (k = A),
        (P = V);
    }
    if (C === h.length) return n(m, P), W && Qt(m, C), w;
    if (P === null) {
      for (; C < h.length; C++)
        (P = f(m, h[C], v)),
          P !== null &&
            ((p = s(P, p, C)), k === null ? (w = P) : (k.sibling = P), (k = P));
      return W && Qt(m, C), w;
    }
    for (P = r(m, P); C < h.length; C++)
      (V = g(P, m, C, h[C], v)),
        V !== null &&
          (e && V.alternate !== null && P.delete(V.key === null ? C : V.key),
          (p = s(V, p, C)),
          k === null ? (w = V) : (k.sibling = V),
          (k = V));
    return (
      e &&
        P.forEach(function (F) {
          return t(m, F);
        }),
      W && Qt(m, C),
      w
    );
  }
  function y(m, p, h, v) {
    var w = nr(h);
    if (typeof w != "function") throw Error(M(150));
    if (((h = w.call(h)), h == null)) throw Error(M(151));
    for (
      var k = (w = null), P = p, C = (p = 0), V = null, A = h.next();
      P !== null && !A.done;
      C++, A = h.next()
    ) {
      P.index > C ? ((V = P), (P = null)) : (V = P.sibling);
      var F = d(m, P, A.value, v);
      if (F === null) {
        P === null && (P = V);
        break;
      }
      e && P && F.alternate === null && t(m, P),
        (p = s(F, p, C)),
        k === null ? (w = F) : (k.sibling = F),
        (k = F),
        (P = V);
    }
    if (A.done) return n(m, P), W && Qt(m, C), w;
    if (P === null) {
      for (; !A.done; C++, A = h.next())
        (A = f(m, A.value, v)),
          A !== null &&
            ((p = s(A, p, C)), k === null ? (w = A) : (k.sibling = A), (k = A));
      return W && Qt(m, C), w;
    }
    for (P = r(m, P); !A.done; C++, A = h.next())
      (A = g(P, m, C, A.value, v)),
        A !== null &&
          (e && A.alternate !== null && P.delete(A.key === null ? C : A.key),
          (p = s(A, p, C)),
          k === null ? (w = A) : (k.sibling = A),
          (k = A));
    return (
      e &&
        P.forEach(function (xt) {
          return t(m, xt);
        }),
      W && Qt(m, C),
      w
    );
  }
  function E(m, p, h, v) {
    if (
      (typeof h == "object" &&
        h !== null &&
        h.type === yn &&
        h.key === null &&
        (h = h.props.children),
      typeof h == "object" && h !== null)
    ) {
      switch (h.$$typeof) {
        case gi:
          e: {
            for (var w = h.key, k = p; k !== null; ) {
              if (k.key === w) {
                if (((w = h.type), w === yn)) {
                  if (k.tag === 7) {
                    n(m, k.sibling),
                      (p = i(k, h.props.children)),
                      (p.return = m),
                      (m = p);
                    break e;
                  }
                } else if (
                  k.elementType === w ||
                  (typeof w == "object" &&
                    w !== null &&
                    w.$$typeof === Tt &&
                    pc(w) === k.type)
                ) {
                  n(m, k.sibling),
                    (p = i(k, h.props)),
                    (p.ref = ar(m, k, h)),
                    (p.return = m),
                    (m = p);
                  break e;
                }
                n(m, k);
                break;
              } else t(m, k);
              k = k.sibling;
            }
            h.type === yn
              ? ((p = rn(h.props.children, m.mode, v, h.key)),
                (p.return = m),
                (m = p))
              : ((v = Yi(h.type, h.key, h.props, null, m.mode, v)),
                (v.ref = ar(m, p, h)),
                (v.return = m),
                (m = v));
          }
          return o(m);
        case gn:
          e: {
            for (k = h.key; p !== null; ) {
              if (p.key === k)
                if (
                  p.tag === 4 &&
                  p.stateNode.containerInfo === h.containerInfo &&
                  p.stateNode.implementation === h.implementation
                ) {
                  n(m, p.sibling),
                    (p = i(p, h.children || [])),
                    (p.return = m),
                    (m = p);
                  break e;
                } else {
                  n(m, p);
                  break;
                }
              else t(m, p);
              p = p.sibling;
            }
            (p = Eo(h, m.mode, v)), (p.return = m), (m = p);
          }
          return o(m);
        case Tt:
          return (k = h._init), E(m, p, k(h._payload), v);
      }
      if (dr(h)) return x(m, p, h, v);
      if (nr(h)) return y(m, p, h, v);
      Mi(m, h);
    }
    return (typeof h == "string" && h !== "") || typeof h == "number"
      ? ((h = "" + h),
        p !== null && p.tag === 6
          ? (n(m, p.sibling), (p = i(p, h)), (p.return = m), (m = p))
          : (n(m, p), (p = Co(h, m.mode, v)), (p.return = m), (m = p)),
        o(m))
      : n(m, p);
  }
  return E;
}
var Wn = gp(!0),
  yp = gp(!1),
  ps = Bt(null),
  hs = null,
  En = null,
  Ml = null;
function Ll() {
  Ml = En = hs = null;
}
function Nl(e) {
  var t = ps.current;
  $(ps), (e._currentValue = t);
}
function xa(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function Fn(e, t) {
  (hs = e),
    (Ml = En = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Ce = !0), (e.firstContext = null));
}
function $e(e) {
  var t = e._currentValue;
  if (Ml !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), En === null)) {
      if (hs === null) throw Error(M(308));
      (En = e), (hs.dependencies = { lanes: 0, firstContext: e });
    } else En = En.next = e;
  return t;
}
var Jt = null;
function Dl(e) {
  Jt === null ? (Jt = [e]) : Jt.push(e);
}
function vp(e, t, n, r) {
  var i = t.interleaved;
  return (
    i === null ? ((n.next = n), Dl(t)) : ((n.next = i.next), (i.next = n)),
    (t.interleaved = n),
    pt(e, r)
  );
}
function pt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var Ct = !1;
function Al(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function xp(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function ct(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function jt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), I & 2)) {
    var i = r.pending;
    return (
      i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
      (r.pending = t),
      pt(e, n)
    );
  }
  return (
    (i = r.interleaved),
    i === null ? ((t.next = t), Dl(r)) : ((t.next = i.next), (i.next = t)),
    (r.interleaved = t),
    pt(e, n)
  );
}
function $i(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), gl(e, n);
  }
}
function hc(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var i = null,
      s = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var o = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        s === null ? (i = s = o) : (s = s.next = o), (n = n.next);
      } while (n !== null);
      s === null ? (i = s = t) : (s = s.next = t);
    } else i = s = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: s,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function ms(e, t, n, r) {
  var i = e.updateQueue;
  Ct = !1;
  var s = i.firstBaseUpdate,
    o = i.lastBaseUpdate,
    a = i.shared.pending;
  if (a !== null) {
    i.shared.pending = null;
    var l = a,
      u = l.next;
    (l.next = null), o === null ? (s = u) : (o.next = u), (o = l);
    var c = e.alternate;
    c !== null &&
      ((c = c.updateQueue),
      (a = c.lastBaseUpdate),
      a !== o &&
        (a === null ? (c.firstBaseUpdate = u) : (a.next = u),
        (c.lastBaseUpdate = l)));
  }
  if (s !== null) {
    var f = i.baseState;
    (o = 0), (c = u = l = null), (a = s);
    do {
      var d = a.lane,
        g = a.eventTime;
      if ((r & d) === d) {
        c !== null &&
          (c = c.next =
            {
              eventTime: g,
              lane: 0,
              tag: a.tag,
              payload: a.payload,
              callback: a.callback,
              next: null,
            });
        e: {
          var x = e,
            y = a;
          switch (((d = t), (g = n), y.tag)) {
            case 1:
              if (((x = y.payload), typeof x == "function")) {
                f = x.call(g, f, d);
                break e;
              }
              f = x;
              break e;
            case 3:
              x.flags = (x.flags & -65537) | 128;
            case 0:
              if (
                ((x = y.payload),
                (d = typeof x == "function" ? x.call(g, f, d) : x),
                d == null)
              )
                break e;
              f = Y({}, f, d);
              break e;
            case 2:
              Ct = !0;
          }
        }
        a.callback !== null &&
          a.lane !== 0 &&
          ((e.flags |= 64),
          (d = i.effects),
          d === null ? (i.effects = [a]) : d.push(a));
      } else
        (g = {
          eventTime: g,
          lane: d,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null,
        }),
          c === null ? ((u = c = g), (l = f)) : (c = c.next = g),
          (o |= d);
      if (((a = a.next), a === null)) {
        if (((a = i.shared.pending), a === null)) break;
        (d = a),
          (a = d.next),
          (d.next = null),
          (i.lastBaseUpdate = d),
          (i.shared.pending = null);
      }
    } while (!0);
    if (
      (c === null && (l = f),
      (i.baseState = l),
      (i.firstBaseUpdate = u),
      (i.lastBaseUpdate = c),
      (t = i.shared.interleaved),
      t !== null)
    ) {
      i = t;
      do (o |= i.lane), (i = i.next);
      while (i !== t);
    } else s === null && (i.shared.lanes = 0);
    (cn |= o), (e.lanes = o), (e.memoizedState = f);
  }
}
function mc(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        i = r.callback;
      if (i !== null) {
        if (((r.callback = null), (r = n), typeof i != "function"))
          throw Error(M(191, i));
        i.call(r);
      }
    }
}
var ii = {},
  rt = Bt(ii),
  Ur = Bt(ii),
  $r = Bt(ii);
function qt(e) {
  if (e === ii) throw Error(M(174));
  return e;
}
function Rl(e, t) {
  switch ((b($r, t), b(Ur, e), b(rt, ii), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : qo(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = qo(t, e));
  }
  $(rt), b(rt, t);
}
function Hn() {
  $(rt), $(Ur), $($r);
}
function wp(e) {
  qt($r.current);
  var t = qt(rt.current),
    n = qo(t, e.type);
  t !== n && (b(Ur, e), b(rt, n));
}
function jl(e) {
  Ur.current === e && ($(rt), $(Ur));
}
var K = Bt(0);
function gs(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var vo = [];
function Vl() {
  for (var e = 0; e < vo.length; e++)
    vo[e]._workInProgressVersionPrimary = null;
  vo.length = 0;
}
var Wi = vt.ReactCurrentDispatcher,
  xo = vt.ReactCurrentBatchConfig,
  un = 0,
  Q = null,
  re = null,
  oe = null,
  ys = !1,
  Sr = !1,
  Wr = 0,
  W0 = 0;
function pe() {
  throw Error(M(321));
}
function Ol(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Je(e[n], t[n])) return !1;
  return !0;
}
function _l(e, t, n, r, i, s) {
  if (
    ((un = s),
    (Q = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Wi.current = e === null || e.memoizedState === null ? Q0 : Y0),
    (e = n(r, i)),
    Sr)
  ) {
    s = 0;
    do {
      if (((Sr = !1), (Wr = 0), 25 <= s)) throw Error(M(301));
      (s += 1),
        (oe = re = null),
        (t.updateQueue = null),
        (Wi.current = X0),
        (e = n(r, i));
    } while (Sr);
  }
  if (
    ((Wi.current = vs),
    (t = re !== null && re.next !== null),
    (un = 0),
    (oe = re = Q = null),
    (ys = !1),
    t)
  )
    throw Error(M(300));
  return e;
}
function Il() {
  var e = Wr !== 0;
  return (Wr = 0), e;
}
function et() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return oe === null ? (Q.memoizedState = oe = e) : (oe = oe.next = e), oe;
}
function We() {
  if (re === null) {
    var e = Q.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = re.next;
  var t = oe === null ? Q.memoizedState : oe.next;
  if (t !== null) (oe = t), (re = e);
  else {
    if (e === null) throw Error(M(310));
    (re = e),
      (e = {
        memoizedState: re.memoizedState,
        baseState: re.baseState,
        baseQueue: re.baseQueue,
        queue: re.queue,
        next: null,
      }),
      oe === null ? (Q.memoizedState = oe = e) : (oe = oe.next = e);
  }
  return oe;
}
function Hr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function wo(e) {
  var t = We(),
    n = t.queue;
  if (n === null) throw Error(M(311));
  n.lastRenderedReducer = e;
  var r = re,
    i = r.baseQueue,
    s = n.pending;
  if (s !== null) {
    if (i !== null) {
      var o = i.next;
      (i.next = s.next), (s.next = o);
    }
    (r.baseQueue = i = s), (n.pending = null);
  }
  if (i !== null) {
    (s = i.next), (r = r.baseState);
    var a = (o = null),
      l = null,
      u = s;
    do {
      var c = u.lane;
      if ((un & c) === c)
        l !== null &&
          (l = l.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action));
      else {
        var f = {
          lane: c,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        l === null ? ((a = l = f), (o = r)) : (l = l.next = f),
          (Q.lanes |= c),
          (cn |= c);
      }
      u = u.next;
    } while (u !== null && u !== s);
    l === null ? (o = r) : (l.next = a),
      Je(r, t.memoizedState) || (Ce = !0),
      (t.memoizedState = r),
      (t.baseState = o),
      (t.baseQueue = l),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    i = e;
    do (s = i.lane), (Q.lanes |= s), (cn |= s), (i = i.next);
    while (i !== e);
  } else i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function So(e) {
  var t = We(),
    n = t.queue;
  if (n === null) throw Error(M(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    i = n.pending,
    s = t.memoizedState;
  if (i !== null) {
    n.pending = null;
    var o = (i = i.next);
    do (s = e(s, o.action)), (o = o.next);
    while (o !== i);
    Je(s, t.memoizedState) || (Ce = !0),
      (t.memoizedState = s),
      t.baseQueue === null && (t.baseState = s),
      (n.lastRenderedState = s);
  }
  return [s, r];
}
function Sp() {}
function kp(e, t) {
  var n = Q,
    r = We(),
    i = t(),
    s = !Je(r.memoizedState, i);
  if (
    (s && ((r.memoizedState = i), (Ce = !0)),
    (r = r.queue),
    Fl(Ep.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || s || (oe !== null && oe.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      Kr(9, Cp.bind(null, n, r, i, t), void 0, null),
      le === null)
    )
      throw Error(M(349));
    un & 30 || Tp(n, t, i);
  }
  return i;
}
function Tp(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = Q.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Q.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function Cp(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), Pp(t) && Mp(e);
}
function Ep(e, t, n) {
  return n(function () {
    Pp(t) && Mp(e);
  });
}
function Pp(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Je(e, n);
  } catch {
    return !0;
  }
}
function Mp(e) {
  var t = pt(e, 1);
  t !== null && Ze(t, e, 1, -1);
}
function gc(e) {
  var t = et();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Hr,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = G0.bind(null, Q, e)),
    [t.memoizedState, e]
  );
}
function Kr(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = Q.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Q.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function Lp() {
  return We().memoizedState;
}
function Hi(e, t, n, r) {
  var i = et();
  (Q.flags |= e),
    (i.memoizedState = Kr(1 | t, n, void 0, r === void 0 ? null : r));
}
function Is(e, t, n, r) {
  var i = We();
  r = r === void 0 ? null : r;
  var s = void 0;
  if (re !== null) {
    var o = re.memoizedState;
    if (((s = o.destroy), r !== null && Ol(r, o.deps))) {
      i.memoizedState = Kr(t, n, s, r);
      return;
    }
  }
  (Q.flags |= e), (i.memoizedState = Kr(1 | t, n, s, r));
}
function yc(e, t) {
  return Hi(8390656, 8, e, t);
}
function Fl(e, t) {
  return Is(2048, 8, e, t);
}
function Np(e, t) {
  return Is(4, 2, e, t);
}
function Dp(e, t) {
  return Is(4, 4, e, t);
}
function Ap(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Rp(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), Is(4, 4, Ap.bind(null, t, e), n)
  );
}
function zl() {}
function jp(e, t) {
  var n = We();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ol(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function Vp(e, t) {
  var n = We();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ol(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Op(e, t, n) {
  return un & 21
    ? (Je(n, t) || ((n = bd()), (Q.lanes |= n), (cn |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Ce = !0)), (e.memoizedState = n));
}
function H0(e, t) {
  var n = z;
  (z = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = xo.transition;
  xo.transition = {};
  try {
    e(!1), t();
  } finally {
    (z = n), (xo.transition = r);
  }
}
function _p() {
  return We().memoizedState;
}
function K0(e, t, n) {
  var r = Ot(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Ip(e))
  )
    Fp(t, n);
  else if (((n = vp(e, t, n, r)), n !== null)) {
    var i = we();
    Ze(n, e, r, i), zp(n, t, r);
  }
}
function G0(e, t, n) {
  var r = Ot(e),
    i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Ip(e)) Fp(t, i);
  else {
    var s = e.alternate;
    if (
      e.lanes === 0 &&
      (s === null || s.lanes === 0) &&
      ((s = t.lastRenderedReducer), s !== null)
    )
      try {
        var o = t.lastRenderedState,
          a = s(o, n);
        if (((i.hasEagerState = !0), (i.eagerState = a), Je(a, o))) {
          var l = t.interleaved;
          l === null
            ? ((i.next = i), Dl(t))
            : ((i.next = l.next), (l.next = i)),
            (t.interleaved = i);
          return;
        }
      } catch {
      } finally {
      }
    (n = vp(e, t, i, r)),
      n !== null && ((i = we()), Ze(n, e, r, i), zp(n, t, r));
  }
}
function Ip(e) {
  var t = e.alternate;
  return e === Q || (t !== null && t === Q);
}
function Fp(e, t) {
  Sr = ys = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function zp(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), gl(e, n);
  }
}
var vs = {
    readContext: $e,
    useCallback: pe,
    useContext: pe,
    useEffect: pe,
    useImperativeHandle: pe,
    useInsertionEffect: pe,
    useLayoutEffect: pe,
    useMemo: pe,
    useReducer: pe,
    useRef: pe,
    useState: pe,
    useDebugValue: pe,
    useDeferredValue: pe,
    useTransition: pe,
    useMutableSource: pe,
    useSyncExternalStore: pe,
    useId: pe,
    unstable_isNewReconciler: !1,
  },
  Q0 = {
    readContext: $e,
    useCallback: function (e, t) {
      return (et().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: $e,
    useEffect: yc,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Hi(4194308, 4, Ap.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Hi(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Hi(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = et();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = et();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = K0.bind(null, Q, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = et();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: gc,
    useDebugValue: zl,
    useDeferredValue: function (e) {
      return (et().memoizedState = e);
    },
    useTransition: function () {
      var e = gc(!1),
        t = e[0];
      return (e = H0.bind(null, e[1])), (et().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = Q,
        i = et();
      if (W) {
        if (n === void 0) throw Error(M(407));
        n = n();
      } else {
        if (((n = t()), le === null)) throw Error(M(349));
        un & 30 || Tp(r, t, n);
      }
      i.memoizedState = n;
      var s = { value: n, getSnapshot: t };
      return (
        (i.queue = s),
        yc(Ep.bind(null, r, s, e), [e]),
        (r.flags |= 2048),
        Kr(9, Cp.bind(null, r, s, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = et(),
        t = le.identifierPrefix;
      if (W) {
        var n = ut,
          r = lt;
        (n = (r & ~(1 << (32 - Xe(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = Wr++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = W0++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Y0 = {
    readContext: $e,
    useCallback: jp,
    useContext: $e,
    useEffect: Fl,
    useImperativeHandle: Rp,
    useInsertionEffect: Np,
    useLayoutEffect: Dp,
    useMemo: Vp,
    useReducer: wo,
    useRef: Lp,
    useState: function () {
      return wo(Hr);
    },
    useDebugValue: zl,
    useDeferredValue: function (e) {
      var t = We();
      return Op(t, re.memoizedState, e);
    },
    useTransition: function () {
      var e = wo(Hr)[0],
        t = We().memoizedState;
      return [e, t];
    },
    useMutableSource: Sp,
    useSyncExternalStore: kp,
    useId: _p,
    unstable_isNewReconciler: !1,
  },
  X0 = {
    readContext: $e,
    useCallback: jp,
    useContext: $e,
    useEffect: Fl,
    useImperativeHandle: Rp,
    useInsertionEffect: Np,
    useLayoutEffect: Dp,
    useMemo: Vp,
    useReducer: So,
    useRef: Lp,
    useState: function () {
      return So(Hr);
    },
    useDebugValue: zl,
    useDeferredValue: function (e) {
      var t = We();
      return re === null ? (t.memoizedState = e) : Op(t, re.memoizedState, e);
    },
    useTransition: function () {
      var e = So(Hr)[0],
        t = We().memoizedState;
      return [e, t];
    },
    useMutableSource: Sp,
    useSyncExternalStore: kp,
    useId: _p,
    unstable_isNewReconciler: !1,
  };
function Ge(e, t) {
  if (e && e.defaultProps) {
    (t = Y({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function wa(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : Y({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Fs = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? hn(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = we(),
      i = Ot(e),
      s = ct(r, i);
    (s.payload = t),
      n != null && (s.callback = n),
      (t = jt(e, s, i)),
      t !== null && (Ze(t, e, i, r), $i(t, e, i));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = we(),
      i = Ot(e),
      s = ct(r, i);
    (s.tag = 1),
      (s.payload = t),
      n != null && (s.callback = n),
      (t = jt(e, s, i)),
      t !== null && (Ze(t, e, i, r), $i(t, e, i));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = we(),
      r = Ot(e),
      i = ct(n, r);
    (i.tag = 2),
      t != null && (i.callback = t),
      (t = jt(e, i, r)),
      t !== null && (Ze(t, e, r, n), $i(t, e, r));
  },
};
function vc(e, t, n, r, i, s, o) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, s, o)
      : t.prototype && t.prototype.isPureReactComponent
      ? !Fr(n, r) || !Fr(i, s)
      : !0
  );
}
function bp(e, t, n) {
  var r = !1,
    i = Ft,
    s = t.contextType;
  return (
    typeof s == "object" && s !== null
      ? (s = $e(s))
      : ((i = Me(t) ? an : ye.current),
        (r = t.contextTypes),
        (s = (r = r != null) ? Un(e, i) : Ft)),
    (t = new t(n, s)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Fs),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = s)),
    t
  );
}
function xc(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Fs.enqueueReplaceState(t, t.state, null);
}
function Sa(e, t, n, r) {
  var i = e.stateNode;
  (i.props = n), (i.state = e.memoizedState), (i.refs = {}), Al(e);
  var s = t.contextType;
  typeof s == "object" && s !== null
    ? (i.context = $e(s))
    : ((s = Me(t) ? an : ye.current), (i.context = Un(e, s))),
    (i.state = e.memoizedState),
    (s = t.getDerivedStateFromProps),
    typeof s == "function" && (wa(e, t, s, n), (i.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function" ||
      (typeof i.UNSAFE_componentWillMount != "function" &&
        typeof i.componentWillMount != "function") ||
      ((t = i.state),
      typeof i.componentWillMount == "function" && i.componentWillMount(),
      typeof i.UNSAFE_componentWillMount == "function" &&
        i.UNSAFE_componentWillMount(),
      t !== i.state && Fs.enqueueReplaceState(i, i.state, null),
      ms(e, n, i, r),
      (i.state = e.memoizedState)),
    typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
function Kn(e, t) {
  try {
    var n = "",
      r = t;
    do (n += Cg(r)), (r = r.return);
    while (r);
    var i = n;
  } catch (s) {
    i =
      `
Error generating stack: ` +
      s.message +
      `
` +
      s.stack;
  }
  return { value: e, source: t, stack: i, digest: null };
}
function ko(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function ka(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Z0 = typeof WeakMap == "function" ? WeakMap : Map;
function Bp(e, t, n) {
  (n = ct(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      ws || ((ws = !0), (Ra = r)), ka(e, t);
    }),
    n
  );
}
function Up(e, t, n) {
  (n = ct(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = t.value;
    (n.payload = function () {
      return r(i);
    }),
      (n.callback = function () {
        ka(e, t);
      });
  }
  var s = e.stateNode;
  return (
    s !== null &&
      typeof s.componentDidCatch == "function" &&
      (n.callback = function () {
        ka(e, t),
          typeof r != "function" &&
            (Vt === null ? (Vt = new Set([this])) : Vt.add(this));
        var o = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: o !== null ? o : "",
        });
      }),
    n
  );
}
function wc(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Z0();
    var i = new Set();
    r.set(t, i);
  } else (i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i));
  i.has(n) || (i.add(n), (e = fy.bind(null, e, t, n)), t.then(e, e));
}
function Sc(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function kc(e, t, n, r, i) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = i), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = ct(-1, 1)), (t.tag = 2), jt(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var J0 = vt.ReactCurrentOwner,
  Ce = !1;
function ve(e, t, n, r) {
  t.child = e === null ? yp(t, null, n, r) : Wn(t, e.child, n, r);
}
function Tc(e, t, n, r, i) {
  n = n.render;
  var s = t.ref;
  return (
    Fn(t, i),
    (r = _l(e, t, n, r, s, i)),
    (n = Il()),
    e !== null && !Ce
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        ht(e, t, i))
      : (W && n && Cl(t), (t.flags |= 1), ve(e, t, r, i), t.child)
  );
}
function Cc(e, t, n, r, i) {
  if (e === null) {
    var s = n.type;
    return typeof s == "function" &&
      !Gl(s) &&
      s.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = s), $p(e, t, s, r, i))
      : ((e = Yi(n.type, null, r, t, t.mode, i)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((s = e.child), !(e.lanes & i))) {
    var o = s.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Fr), n(o, r) && e.ref === t.ref)
    )
      return ht(e, t, i);
  }
  return (
    (t.flags |= 1),
    (e = _t(s, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function $p(e, t, n, r, i) {
  if (e !== null) {
    var s = e.memoizedProps;
    if (Fr(s, r) && e.ref === t.ref)
      if (((Ce = !1), (t.pendingProps = r = s), (e.lanes & i) !== 0))
        e.flags & 131072 && (Ce = !0);
      else return (t.lanes = e.lanes), ht(e, t, i);
  }
  return Ta(e, t, n, r, i);
}
function Wp(e, t, n) {
  var r = t.pendingProps,
    i = r.children,
    s = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        b(Mn, Ne),
        (Ne |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = s !== null ? s.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          b(Mn, Ne),
          (Ne |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = s !== null ? s.baseLanes : n),
        b(Mn, Ne),
        (Ne |= r);
    }
  else
    s !== null ? ((r = s.baseLanes | n), (t.memoizedState = null)) : (r = n),
      b(Mn, Ne),
      (Ne |= r);
  return ve(e, t, i, n), t.child;
}
function Hp(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Ta(e, t, n, r, i) {
  var s = Me(n) ? an : ye.current;
  return (
    (s = Un(t, s)),
    Fn(t, i),
    (n = _l(e, t, n, r, s, i)),
    (r = Il()),
    e !== null && !Ce
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        ht(e, t, i))
      : (W && r && Cl(t), (t.flags |= 1), ve(e, t, n, i), t.child)
  );
}
function Ec(e, t, n, r, i) {
  if (Me(n)) {
    var s = !0;
    cs(t);
  } else s = !1;
  if ((Fn(t, i), t.stateNode === null))
    Ki(e, t), bp(t, n, r), Sa(t, n, r, i), (r = !0);
  else if (e === null) {
    var o = t.stateNode,
      a = t.memoizedProps;
    o.props = a;
    var l = o.context,
      u = n.contextType;
    typeof u == "object" && u !== null
      ? (u = $e(u))
      : ((u = Me(n) ? an : ye.current), (u = Un(t, u)));
    var c = n.getDerivedStateFromProps,
      f =
        typeof c == "function" ||
        typeof o.getSnapshotBeforeUpdate == "function";
    f ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((a !== r || l !== u) && xc(t, o, r, u)),
      (Ct = !1);
    var d = t.memoizedState;
    (o.state = d),
      ms(t, r, o, i),
      (l = t.memoizedState),
      a !== r || d !== l || Pe.current || Ct
        ? (typeof c == "function" && (wa(t, n, c, r), (l = t.memoizedState)),
          (a = Ct || vc(t, n, a, r, d, l, u))
            ? (f ||
                (typeof o.UNSAFE_componentWillMount != "function" &&
                  typeof o.componentWillMount != "function") ||
                (typeof o.componentWillMount == "function" &&
                  o.componentWillMount(),
                typeof o.UNSAFE_componentWillMount == "function" &&
                  o.UNSAFE_componentWillMount()),
              typeof o.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = l)),
          (o.props = r),
          (o.state = l),
          (o.context = u),
          (r = a))
        : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (o = t.stateNode),
      xp(e, t),
      (a = t.memoizedProps),
      (u = t.type === t.elementType ? a : Ge(t.type, a)),
      (o.props = u),
      (f = t.pendingProps),
      (d = o.context),
      (l = n.contextType),
      typeof l == "object" && l !== null
        ? (l = $e(l))
        : ((l = Me(n) ? an : ye.current), (l = Un(t, l)));
    var g = n.getDerivedStateFromProps;
    (c =
      typeof g == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function") ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((a !== f || d !== l) && xc(t, o, r, l)),
      (Ct = !1),
      (d = t.memoizedState),
      (o.state = d),
      ms(t, r, o, i);
    var x = t.memoizedState;
    a !== f || d !== x || Pe.current || Ct
      ? (typeof g == "function" && (wa(t, n, g, r), (x = t.memoizedState)),
        (u = Ct || vc(t, n, u, r, d, x, l) || !1)
          ? (c ||
              (typeof o.UNSAFE_componentWillUpdate != "function" &&
                typeof o.componentWillUpdate != "function") ||
              (typeof o.componentWillUpdate == "function" &&
                o.componentWillUpdate(r, x, l),
              typeof o.UNSAFE_componentWillUpdate == "function" &&
                o.UNSAFE_componentWillUpdate(r, x, l)),
            typeof o.componentDidUpdate == "function" && (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof o.componentDidUpdate != "function" ||
              (a === e.memoizedProps && d === e.memoizedState) ||
              (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate != "function" ||
              (a === e.memoizedProps && d === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = x)),
        (o.props = r),
        (o.state = x),
        (o.context = l),
        (r = u))
      : (typeof o.componentDidUpdate != "function" ||
          (a === e.memoizedProps && d === e.memoizedState) ||
          (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate != "function" ||
          (a === e.memoizedProps && d === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Ca(e, t, n, r, s, i);
}
function Ca(e, t, n, r, i, s) {
  Hp(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return i && cc(t, n, !1), ht(e, t, s);
  (r = t.stateNode), (J0.current = t);
  var a =
    o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && o
      ? ((t.child = Wn(t, e.child, null, s)), (t.child = Wn(t, null, a, s)))
      : ve(e, t, a, s),
    (t.memoizedState = r.state),
    i && cc(t, n, !0),
    t.child
  );
}
function Kp(e) {
  var t = e.stateNode;
  t.pendingContext
    ? uc(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && uc(e, t.context, !1),
    Rl(e, t.containerInfo);
}
function Pc(e, t, n, r, i) {
  return $n(), Pl(i), (t.flags |= 256), ve(e, t, n, r), t.child;
}
var Ea = { dehydrated: null, treeContext: null, retryLane: 0 };
function Pa(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Gp(e, t, n) {
  var r = t.pendingProps,
    i = K.current,
    s = !1,
    o = (t.flags & 128) !== 0,
    a;
  if (
    ((a = o) ||
      (a = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    a
      ? ((s = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (i |= 1),
    b(K, i & 1),
    e === null)
  )
    return (
      va(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((o = r.children),
          (e = r.fallback),
          s
            ? ((r = t.mode),
              (s = t.child),
              (o = { mode: "hidden", children: o }),
              !(r & 1) && s !== null
                ? ((s.childLanes = 0), (s.pendingProps = o))
                : (s = Bs(o, r, 0, null)),
              (e = rn(e, r, n, null)),
              (s.return = t),
              (e.return = t),
              (s.sibling = e),
              (t.child = s),
              (t.child.memoizedState = Pa(n)),
              (t.memoizedState = Ea),
              e)
            : bl(t, o))
    );
  if (((i = e.memoizedState), i !== null && ((a = i.dehydrated), a !== null)))
    return q0(e, t, o, r, a, i, n);
  if (s) {
    (s = r.fallback), (o = t.mode), (i = e.child), (a = i.sibling);
    var l = { mode: "hidden", children: r.children };
    return (
      !(o & 1) && t.child !== i
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = l),
          (t.deletions = null))
        : ((r = _t(i, l)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
      a !== null ? (s = _t(a, s)) : ((s = rn(s, o, n, null)), (s.flags |= 2)),
      (s.return = t),
      (r.return = t),
      (r.sibling = s),
      (t.child = r),
      (r = s),
      (s = t.child),
      (o = e.child.memoizedState),
      (o =
        o === null
          ? Pa(n)
          : {
              baseLanes: o.baseLanes | n,
              cachePool: null,
              transitions: o.transitions,
            }),
      (s.memoizedState = o),
      (s.childLanes = e.childLanes & ~n),
      (t.memoizedState = Ea),
      r
    );
  }
  return (
    (s = e.child),
    (e = s.sibling),
    (r = _t(s, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function bl(e, t) {
  return (
    (t = Bs({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Li(e, t, n, r) {
  return (
    r !== null && Pl(r),
    Wn(t, e.child, null, n),
    (e = bl(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function q0(e, t, n, r, i, s, o) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = ko(Error(M(422)))), Li(e, t, o, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((s = r.fallback),
        (i = t.mode),
        (r = Bs({ mode: "visible", children: r.children }, i, 0, null)),
        (s = rn(s, i, o, null)),
        (s.flags |= 2),
        (r.return = t),
        (s.return = t),
        (r.sibling = s),
        (t.child = r),
        t.mode & 1 && Wn(t, e.child, null, o),
        (t.child.memoizedState = Pa(o)),
        (t.memoizedState = Ea),
        s);
  if (!(t.mode & 1)) return Li(e, t, o, null);
  if (i.data === "$!") {
    if (((r = i.nextSibling && i.nextSibling.dataset), r)) var a = r.dgst;
    return (r = a), (s = Error(M(419))), (r = ko(s, r, void 0)), Li(e, t, o, r);
  }
  if (((a = (o & e.childLanes) !== 0), Ce || a)) {
    if (((r = le), r !== null)) {
      switch (o & -o) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      (i = i & (r.suspendedLanes | o) ? 0 : i),
        i !== 0 &&
          i !== s.retryLane &&
          ((s.retryLane = i), pt(e, i), Ze(r, e, i, -1));
    }
    return Kl(), (r = ko(Error(M(421)))), Li(e, t, o, r);
  }
  return i.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = dy.bind(null, e)),
      (i._reactRetry = t),
      null)
    : ((e = s.treeContext),
      (De = Rt(i.nextSibling)),
      (Ae = t),
      (W = !0),
      (Ye = null),
      e !== null &&
        ((Ie[Fe++] = lt),
        (Ie[Fe++] = ut),
        (Ie[Fe++] = ln),
        (lt = e.id),
        (ut = e.overflow),
        (ln = t)),
      (t = bl(t, r.children)),
      (t.flags |= 4096),
      t);
}
function Mc(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), xa(e.return, t, n);
}
function To(e, t, n, r, i) {
  var s = e.memoizedState;
  s === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i,
      })
    : ((s.isBackwards = t),
      (s.rendering = null),
      (s.renderingStartTime = 0),
      (s.last = r),
      (s.tail = n),
      (s.tailMode = i));
}
function Qp(e, t, n) {
  var r = t.pendingProps,
    i = r.revealOrder,
    s = r.tail;
  if ((ve(e, t, r.children, n), (r = K.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Mc(e, n, t);
        else if (e.tag === 19) Mc(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((b(K, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; )
          (e = n.alternate),
            e !== null && gs(e) === null && (i = n),
            (n = n.sibling);
        (n = i),
          n === null
            ? ((i = t.child), (t.child = null))
            : ((i = n.sibling), (n.sibling = null)),
          To(t, !1, i, n, s);
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && gs(e) === null)) {
            t.child = i;
            break;
          }
          (e = i.sibling), (i.sibling = n), (n = i), (i = e);
        }
        To(t, !0, n, null, s);
        break;
      case "together":
        To(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Ki(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function ht(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (cn |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(M(153));
  if (t.child !== null) {
    for (
      e = t.child, n = _t(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = _t(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function ey(e, t, n) {
  switch (t.tag) {
    case 3:
      Kp(t), $n();
      break;
    case 5:
      wp(t);
      break;
    case 1:
      Me(t.type) && cs(t);
      break;
    case 4:
      Rl(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        i = t.memoizedProps.value;
      b(ps, r._currentValue), (r._currentValue = i);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (b(K, K.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? Gp(e, t, n)
          : (b(K, K.current & 1),
            (e = ht(e, t, n)),
            e !== null ? e.sibling : null);
      b(K, K.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return Qp(e, t, n);
        t.flags |= 128;
      }
      if (
        ((i = t.memoizedState),
        i !== null &&
          ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        b(K, K.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), Wp(e, t, n);
  }
  return ht(e, t, n);
}
var Yp, Ma, Xp, Zp;
Yp = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
Ma = function () {};
Xp = function (e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    (e = t.stateNode), qt(rt.current);
    var s = null;
    switch (n) {
      case "input":
        (i = Yo(e, i)), (r = Yo(e, r)), (s = []);
        break;
      case "select":
        (i = Y({}, i, { value: void 0 })),
          (r = Y({}, r, { value: void 0 })),
          (s = []);
        break;
      case "textarea":
        (i = Jo(e, i)), (r = Jo(e, r)), (s = []);
        break;
      default:
        typeof i.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = ls);
    }
    ea(n, r);
    var o;
    n = null;
    for (u in i)
      if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
        if (u === "style") {
          var a = i[u];
          for (o in a) a.hasOwnProperty(o) && (n || (n = {}), (n[o] = ""));
        } else
          u !== "dangerouslySetInnerHTML" &&
            u !== "children" &&
            u !== "suppressContentEditableWarning" &&
            u !== "suppressHydrationWarning" &&
            u !== "autoFocus" &&
            (Ar.hasOwnProperty(u)
              ? s || (s = [])
              : (s = s || []).push(u, null));
    for (u in r) {
      var l = r[u];
      if (
        ((a = i != null ? i[u] : void 0),
        r.hasOwnProperty(u) && l !== a && (l != null || a != null))
      )
        if (u === "style")
          if (a) {
            for (o in a)
              !a.hasOwnProperty(o) ||
                (l && l.hasOwnProperty(o)) ||
                (n || (n = {}), (n[o] = ""));
            for (o in l)
              l.hasOwnProperty(o) &&
                a[o] !== l[o] &&
                (n || (n = {}), (n[o] = l[o]));
          } else n || (s || (s = []), s.push(u, n)), (n = l);
        else
          u === "dangerouslySetInnerHTML"
            ? ((l = l ? l.__html : void 0),
              (a = a ? a.__html : void 0),
              l != null && a !== l && (s = s || []).push(u, l))
            : u === "children"
            ? (typeof l != "string" && typeof l != "number") ||
              (s = s || []).push(u, "" + l)
            : u !== "suppressContentEditableWarning" &&
              u !== "suppressHydrationWarning" &&
              (Ar.hasOwnProperty(u)
                ? (l != null && u === "onScroll" && U("scroll", e),
                  s || a === l || (s = []))
                : (s = s || []).push(u, l));
    }
    n && (s = s || []).push("style", n);
    var u = s;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
Zp = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function lr(e, t) {
  if (!W)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function he(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags & 14680064),
        (r |= i.flags & 14680064),
        (i.return = e),
        (i = i.sibling);
  else
    for (i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags),
        (r |= i.flags),
        (i.return = e),
        (i = i.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function ty(e, t, n) {
  var r = t.pendingProps;
  switch ((El(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return he(t), null;
    case 1:
      return Me(t.type) && us(), he(t), null;
    case 3:
      return (
        (r = t.stateNode),
        Hn(),
        $(Pe),
        $(ye),
        Vl(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Pi(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Ye !== null && (Oa(Ye), (Ye = null)))),
        Ma(e, t),
        he(t),
        null
      );
    case 5:
      jl(t);
      var i = qt($r.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        Xp(e, t, n, r, i),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(M(166));
          return he(t), null;
        }
        if (((e = qt(rt.current)), Pi(t))) {
          (r = t.stateNode), (n = t.type);
          var s = t.memoizedProps;
          switch (((r[tt] = t), (r[Br] = s), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              U("cancel", r), U("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              U("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < hr.length; i++) U(hr[i], r);
              break;
            case "source":
              U("error", r);
              break;
            case "img":
            case "image":
            case "link":
              U("error", r), U("load", r);
              break;
            case "details":
              U("toggle", r);
              break;
            case "input":
              _u(r, s), U("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!s.multiple }),
                U("invalid", r);
              break;
            case "textarea":
              Fu(r, s), U("invalid", r);
          }
          ea(n, s), (i = null);
          for (var o in s)
            if (s.hasOwnProperty(o)) {
              var a = s[o];
              o === "children"
                ? typeof a == "string"
                  ? r.textContent !== a &&
                    (s.suppressHydrationWarning !== !0 &&
                      Ei(r.textContent, a, e),
                    (i = ["children", a]))
                  : typeof a == "number" &&
                    r.textContent !== "" + a &&
                    (s.suppressHydrationWarning !== !0 &&
                      Ei(r.textContent, a, e),
                    (i = ["children", "" + a]))
                : Ar.hasOwnProperty(o) &&
                  a != null &&
                  o === "onScroll" &&
                  U("scroll", r);
            }
          switch (n) {
            case "input":
              yi(r), Iu(r, s, !0);
              break;
            case "textarea":
              yi(r), zu(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof s.onClick == "function" && (r.onclick = ls);
          }
          (r = i), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (o = i.nodeType === 9 ? i : i.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = Ed(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = o.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = o.createElement(n, { is: r.is }))
                : ((e = o.createElement(n)),
                  n === "select" &&
                    ((o = e),
                    r.multiple
                      ? (o.multiple = !0)
                      : r.size && (o.size = r.size)))
              : (e = o.createElementNS(e, n)),
            (e[tt] = t),
            (e[Br] = r),
            Yp(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((o = ta(n, r)), n)) {
              case "dialog":
                U("cancel", e), U("close", e), (i = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                U("load", e), (i = r);
                break;
              case "video":
              case "audio":
                for (i = 0; i < hr.length; i++) U(hr[i], e);
                i = r;
                break;
              case "source":
                U("error", e), (i = r);
                break;
              case "img":
              case "image":
              case "link":
                U("error", e), U("load", e), (i = r);
                break;
              case "details":
                U("toggle", e), (i = r);
                break;
              case "input":
                _u(e, r), (i = Yo(e, r)), U("invalid", e);
                break;
              case "option":
                i = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (i = Y({}, r, { value: void 0 })),
                  U("invalid", e);
                break;
              case "textarea":
                Fu(e, r), (i = Jo(e, r)), U("invalid", e);
                break;
              default:
                i = r;
            }
            ea(n, i), (a = i);
            for (s in a)
              if (a.hasOwnProperty(s)) {
                var l = a[s];
                s === "style"
                  ? Ld(e, l)
                  : s === "dangerouslySetInnerHTML"
                  ? ((l = l ? l.__html : void 0), l != null && Pd(e, l))
                  : s === "children"
                  ? typeof l == "string"
                    ? (n !== "textarea" || l !== "") && Rr(e, l)
                    : typeof l == "number" && Rr(e, "" + l)
                  : s !== "suppressContentEditableWarning" &&
                    s !== "suppressHydrationWarning" &&
                    s !== "autoFocus" &&
                    (Ar.hasOwnProperty(s)
                      ? l != null && s === "onScroll" && U("scroll", e)
                      : l != null && cl(e, s, l, o));
              }
            switch (n) {
              case "input":
                yi(e), Iu(e, r, !1);
                break;
              case "textarea":
                yi(e), zu(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + It(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (s = r.value),
                  s != null
                    ? Vn(e, !!r.multiple, s, !1)
                    : r.defaultValue != null &&
                      Vn(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = ls);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return he(t), null;
    case 6:
      if (e && t.stateNode != null) Zp(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(M(166));
        if (((n = qt($r.current)), qt(rt.current), Pi(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[tt] = t),
            (s = r.nodeValue !== n) && ((e = Ae), e !== null))
          )
            switch (e.tag) {
              case 3:
                Ei(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Ei(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          s && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[tt] = t),
            (t.stateNode = r);
      }
      return he(t), null;
    case 13:
      if (
        ($(K),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (W && De !== null && t.mode & 1 && !(t.flags & 128))
          mp(), $n(), (t.flags |= 98560), (s = !1);
        else if (((s = Pi(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!s) throw Error(M(318));
            if (
              ((s = t.memoizedState),
              (s = s !== null ? s.dehydrated : null),
              !s)
            )
              throw Error(M(317));
            s[tt] = t;
          } else
            $n(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          he(t), (s = !1);
        } else Ye !== null && (Oa(Ye), (Ye = null)), (s = !0);
        if (!s) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || K.current & 1 ? ie === 0 && (ie = 3) : Kl())),
          t.updateQueue !== null && (t.flags |= 4),
          he(t),
          null);
    case 4:
      return (
        Hn(), Ma(e, t), e === null && zr(t.stateNode.containerInfo), he(t), null
      );
    case 10:
      return Nl(t.type._context), he(t), null;
    case 17:
      return Me(t.type) && us(), he(t), null;
    case 19:
      if (($(K), (s = t.memoizedState), s === null)) return he(t), null;
      if (((r = (t.flags & 128) !== 0), (o = s.rendering), o === null))
        if (r) lr(s, !1);
        else {
          if (ie !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((o = gs(e)), o !== null)) {
                for (
                  t.flags |= 128,
                    lr(s, !1),
                    r = o.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (s = n),
                    (e = r),
                    (s.flags &= 14680066),
                    (o = s.alternate),
                    o === null
                      ? ((s.childLanes = 0),
                        (s.lanes = e),
                        (s.child = null),
                        (s.subtreeFlags = 0),
                        (s.memoizedProps = null),
                        (s.memoizedState = null),
                        (s.updateQueue = null),
                        (s.dependencies = null),
                        (s.stateNode = null))
                      : ((s.childLanes = o.childLanes),
                        (s.lanes = o.lanes),
                        (s.child = o.child),
                        (s.subtreeFlags = 0),
                        (s.deletions = null),
                        (s.memoizedProps = o.memoizedProps),
                        (s.memoizedState = o.memoizedState),
                        (s.updateQueue = o.updateQueue),
                        (s.type = o.type),
                        (e = o.dependencies),
                        (s.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return b(K, (K.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          s.tail !== null &&
            ee() > Gn &&
            ((t.flags |= 128), (r = !0), lr(s, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = gs(o)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              lr(s, !0),
              s.tail === null && s.tailMode === "hidden" && !o.alternate && !W)
            )
              return he(t), null;
          } else
            2 * ee() - s.renderingStartTime > Gn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), lr(s, !1), (t.lanes = 4194304));
        s.isBackwards
          ? ((o.sibling = t.child), (t.child = o))
          : ((n = s.last),
            n !== null ? (n.sibling = o) : (t.child = o),
            (s.last = o));
      }
      return s.tail !== null
        ? ((t = s.tail),
          (s.rendering = t),
          (s.tail = t.sibling),
          (s.renderingStartTime = ee()),
          (t.sibling = null),
          (n = K.current),
          b(K, r ? (n & 1) | 2 : n & 1),
          t)
        : (he(t), null);
    case 22:
    case 23:
      return (
        Hl(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Ne & 1073741824 && (he(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : he(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(M(156, t.tag));
}
function ny(e, t) {
  switch ((El(t), t.tag)) {
    case 1:
      return (
        Me(t.type) && us(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Hn(),
        $(Pe),
        $(ye),
        Vl(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return jl(t), null;
    case 13:
      if (($(K), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(M(340));
        $n();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return $(K), null;
    case 4:
      return Hn(), null;
    case 10:
      return Nl(t.type._context), null;
    case 22:
    case 23:
      return Hl(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Ni = !1,
  ge = !1,
  ry = typeof WeakSet == "function" ? WeakSet : Set,
  D = null;
function Pn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        Z(e, t, r);
      }
    else n.current = null;
}
function La(e, t, n) {
  try {
    n();
  } catch (r) {
    Z(e, t, r);
  }
}
var Lc = !1;
function iy(e, t) {
  if (((fa = ss), (e = np()), Tl(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset,
            s = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, s.nodeType;
          } catch {
            n = null;
            break e;
          }
          var o = 0,
            a = -1,
            l = -1,
            u = 0,
            c = 0,
            f = e,
            d = null;
          t: for (;;) {
            for (
              var g;
              f !== n || (i !== 0 && f.nodeType !== 3) || (a = o + i),
                f !== s || (r !== 0 && f.nodeType !== 3) || (l = o + r),
                f.nodeType === 3 && (o += f.nodeValue.length),
                (g = f.firstChild) !== null;

            )
              (d = f), (f = g);
            for (;;) {
              if (f === e) break t;
              if (
                (d === n && ++u === i && (a = o),
                d === s && ++c === r && (l = o),
                (g = f.nextSibling) !== null)
              )
                break;
              (f = d), (d = f.parentNode);
            }
            f = g;
          }
          n = a === -1 || l === -1 ? null : { start: a, end: l };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (da = { focusedElem: e, selectionRange: n }, ss = !1, D = t; D !== null; )
    if (((t = D), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (D = e);
    else
      for (; D !== null; ) {
        t = D;
        try {
          var x = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (x !== null) {
                  var y = x.memoizedProps,
                    E = x.memoizedState,
                    m = t.stateNode,
                    p = m.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? y : Ge(t.type, y),
                      E
                    );
                  m.__reactInternalSnapshotBeforeUpdate = p;
                }
                break;
              case 3:
                var h = t.stateNode.containerInfo;
                h.nodeType === 1
                  ? (h.textContent = "")
                  : h.nodeType === 9 &&
                    h.documentElement &&
                    h.removeChild(h.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(M(163));
            }
        } catch (v) {
          Z(t, t.return, v);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (D = e);
          break;
        }
        D = t.return;
      }
  return (x = Lc), (Lc = !1), x;
}
function kr(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var i = (r = r.next);
    do {
      if ((i.tag & e) === e) {
        var s = i.destroy;
        (i.destroy = void 0), s !== void 0 && La(t, n, s);
      }
      i = i.next;
    } while (i !== r);
  }
}
function zs(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Na(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function Jp(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), Jp(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[tt], delete t[Br], delete t[ma], delete t[b0], delete t[B0])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function qp(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Nc(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || qp(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Da(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = ls));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Da(e, t, n), e = e.sibling; e !== null; ) Da(e, t, n), (e = e.sibling);
}
function Aa(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Aa(e, t, n), e = e.sibling; e !== null; ) Aa(e, t, n), (e = e.sibling);
}
var ue = null,
  Qe = !1;
function wt(e, t, n) {
  for (n = n.child; n !== null; ) eh(e, t, n), (n = n.sibling);
}
function eh(e, t, n) {
  if (nt && typeof nt.onCommitFiberUnmount == "function")
    try {
      nt.onCommitFiberUnmount(As, n);
    } catch {}
  switch (n.tag) {
    case 5:
      ge || Pn(n, t);
    case 6:
      var r = ue,
        i = Qe;
      (ue = null),
        wt(e, t, n),
        (ue = r),
        (Qe = i),
        ue !== null &&
          (Qe
            ? ((e = ue),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : ue.removeChild(n.stateNode));
      break;
    case 18:
      ue !== null &&
        (Qe
          ? ((e = ue),
            (n = n.stateNode),
            e.nodeType === 8
              ? go(e.parentNode, n)
              : e.nodeType === 1 && go(e, n),
            _r(e))
          : go(ue, n.stateNode));
      break;
    case 4:
      (r = ue),
        (i = Qe),
        (ue = n.stateNode.containerInfo),
        (Qe = !0),
        wt(e, t, n),
        (ue = r),
        (Qe = i);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !ge &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        i = r = r.next;
        do {
          var s = i,
            o = s.destroy;
          (s = s.tag),
            o !== void 0 && (s & 2 || s & 4) && La(n, t, o),
            (i = i.next);
        } while (i !== r);
      }
      wt(e, t, n);
      break;
    case 1:
      if (
        !ge &&
        (Pn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (a) {
          Z(n, t, a);
        }
      wt(e, t, n);
      break;
    case 21:
      wt(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((ge = (r = ge) || n.memoizedState !== null), wt(e, t, n), (ge = r))
        : wt(e, t, n);
      break;
    default:
      wt(e, t, n);
  }
}
function Dc(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new ry()),
      t.forEach(function (r) {
        var i = py.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      });
  }
}
function He(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var s = e,
          o = t,
          a = o;
        e: for (; a !== null; ) {
          switch (a.tag) {
            case 5:
              (ue = a.stateNode), (Qe = !1);
              break e;
            case 3:
              (ue = a.stateNode.containerInfo), (Qe = !0);
              break e;
            case 4:
              (ue = a.stateNode.containerInfo), (Qe = !0);
              break e;
          }
          a = a.return;
        }
        if (ue === null) throw Error(M(160));
        eh(s, o, i), (ue = null), (Qe = !1);
        var l = i.alternate;
        l !== null && (l.return = null), (i.return = null);
      } catch (u) {
        Z(i, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) th(t, e), (t = t.sibling);
}
function th(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((He(t, e), qe(e), r & 4)) {
        try {
          kr(3, e, e.return), zs(3, e);
        } catch (y) {
          Z(e, e.return, y);
        }
        try {
          kr(5, e, e.return);
        } catch (y) {
          Z(e, e.return, y);
        }
      }
      break;
    case 1:
      He(t, e), qe(e), r & 512 && n !== null && Pn(n, n.return);
      break;
    case 5:
      if (
        (He(t, e),
        qe(e),
        r & 512 && n !== null && Pn(n, n.return),
        e.flags & 32)
      ) {
        var i = e.stateNode;
        try {
          Rr(i, "");
        } catch (y) {
          Z(e, e.return, y);
        }
      }
      if (r & 4 && ((i = e.stateNode), i != null)) {
        var s = e.memoizedProps,
          o = n !== null ? n.memoizedProps : s,
          a = e.type,
          l = e.updateQueue;
        if (((e.updateQueue = null), l !== null))
          try {
            a === "input" && s.type === "radio" && s.name != null && Td(i, s),
              ta(a, o);
            var u = ta(a, s);
            for (o = 0; o < l.length; o += 2) {
              var c = l[o],
                f = l[o + 1];
              c === "style"
                ? Ld(i, f)
                : c === "dangerouslySetInnerHTML"
                ? Pd(i, f)
                : c === "children"
                ? Rr(i, f)
                : cl(i, c, f, u);
            }
            switch (a) {
              case "input":
                Xo(i, s);
                break;
              case "textarea":
                Cd(i, s);
                break;
              case "select":
                var d = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!s.multiple;
                var g = s.value;
                g != null
                  ? Vn(i, !!s.multiple, g, !1)
                  : d !== !!s.multiple &&
                    (s.defaultValue != null
                      ? Vn(i, !!s.multiple, s.defaultValue, !0)
                      : Vn(i, !!s.multiple, s.multiple ? [] : "", !1));
            }
            i[Br] = s;
          } catch (y) {
            Z(e, e.return, y);
          }
      }
      break;
    case 6:
      if ((He(t, e), qe(e), r & 4)) {
        if (e.stateNode === null) throw Error(M(162));
        (i = e.stateNode), (s = e.memoizedProps);
        try {
          i.nodeValue = s;
        } catch (y) {
          Z(e, e.return, y);
        }
      }
      break;
    case 3:
      if (
        (He(t, e), qe(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          _r(t.containerInfo);
        } catch (y) {
          Z(e, e.return, y);
        }
      break;
    case 4:
      He(t, e), qe(e);
      break;
    case 13:
      He(t, e),
        qe(e),
        (i = e.child),
        i.flags & 8192 &&
          ((s = i.memoizedState !== null),
          (i.stateNode.isHidden = s),
          !s ||
            (i.alternate !== null && i.alternate.memoizedState !== null) ||
            ($l = ee())),
        r & 4 && Dc(e);
      break;
    case 22:
      if (
        ((c = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((ge = (u = ge) || c), He(t, e), (ge = u)) : He(t, e),
        qe(e),
        r & 8192)
      ) {
        if (
          ((u = e.memoizedState !== null),
          (e.stateNode.isHidden = u) && !c && e.mode & 1)
        )
          for (D = e, c = e.child; c !== null; ) {
            for (f = D = c; D !== null; ) {
              switch (((d = D), (g = d.child), d.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  kr(4, d, d.return);
                  break;
                case 1:
                  Pn(d, d.return);
                  var x = d.stateNode;
                  if (typeof x.componentWillUnmount == "function") {
                    (r = d), (n = d.return);
                    try {
                      (t = r),
                        (x.props = t.memoizedProps),
                        (x.state = t.memoizedState),
                        x.componentWillUnmount();
                    } catch (y) {
                      Z(r, n, y);
                    }
                  }
                  break;
                case 5:
                  Pn(d, d.return);
                  break;
                case 22:
                  if (d.memoizedState !== null) {
                    Rc(f);
                    continue;
                  }
              }
              g !== null ? ((g.return = d), (D = g)) : Rc(f);
            }
            c = c.sibling;
          }
        e: for (c = null, f = e; ; ) {
          if (f.tag === 5) {
            if (c === null) {
              c = f;
              try {
                (i = f.stateNode),
                  u
                    ? ((s = i.style),
                      typeof s.setProperty == "function"
                        ? s.setProperty("display", "none", "important")
                        : (s.display = "none"))
                    : ((a = f.stateNode),
                      (l = f.memoizedProps.style),
                      (o =
                        l != null && l.hasOwnProperty("display")
                          ? l.display
                          : null),
                      (a.style.display = Md("display", o)));
              } catch (y) {
                Z(e, e.return, y);
              }
            }
          } else if (f.tag === 6) {
            if (c === null)
              try {
                f.stateNode.nodeValue = u ? "" : f.memoizedProps;
              } catch (y) {
                Z(e, e.return, y);
              }
          } else if (
            ((f.tag !== 22 && f.tag !== 23) ||
              f.memoizedState === null ||
              f === e) &&
            f.child !== null
          ) {
            (f.child.return = f), (f = f.child);
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            c === f && (c = null), (f = f.return);
          }
          c === f && (c = null), (f.sibling.return = f.return), (f = f.sibling);
        }
      }
      break;
    case 19:
      He(t, e), qe(e), r & 4 && Dc(e);
      break;
    case 21:
      break;
    default:
      He(t, e), qe(e);
  }
}
function qe(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (qp(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(M(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (Rr(i, ""), (r.flags &= -33));
          var s = Nc(e);
          Aa(e, s, i);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo,
            a = Nc(e);
          Da(e, a, o);
          break;
        default:
          throw Error(M(161));
      }
    } catch (l) {
      Z(e, e.return, l);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function sy(e, t, n) {
  (D = e), nh(e);
}
function nh(e, t, n) {
  for (var r = (e.mode & 1) !== 0; D !== null; ) {
    var i = D,
      s = i.child;
    if (i.tag === 22 && r) {
      var o = i.memoizedState !== null || Ni;
      if (!o) {
        var a = i.alternate,
          l = (a !== null && a.memoizedState !== null) || ge;
        a = Ni;
        var u = ge;
        if (((Ni = o), (ge = l) && !u))
          for (D = i; D !== null; )
            (o = D),
              (l = o.child),
              o.tag === 22 && o.memoizedState !== null
                ? jc(i)
                : l !== null
                ? ((l.return = o), (D = l))
                : jc(i);
        for (; s !== null; ) (D = s), nh(s), (s = s.sibling);
        (D = i), (Ni = a), (ge = u);
      }
      Ac(e);
    } else
      i.subtreeFlags & 8772 && s !== null ? ((s.return = i), (D = s)) : Ac(e);
  }
}
function Ac(e) {
  for (; D !== null; ) {
    var t = D;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ge || zs(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !ge)
                if (n === null) r.componentDidMount();
                else {
                  var i =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : Ge(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    i,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var s = t.updateQueue;
              s !== null && mc(t, s, r);
              break;
            case 3:
              var o = t.updateQueue;
              if (o !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                mc(t, o, n);
              }
              break;
            case 5:
              var a = t.stateNode;
              if (n === null && t.flags & 4) {
                n = a;
                var l = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    l.autoFocus && n.focus();
                    break;
                  case "img":
                    l.src && (n.src = l.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var c = u.memoizedState;
                  if (c !== null) {
                    var f = c.dehydrated;
                    f !== null && _r(f);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(M(163));
          }
        ge || (t.flags & 512 && Na(t));
      } catch (d) {
        Z(t, t.return, d);
      }
    }
    if (t === e) {
      D = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (D = n);
      break;
    }
    D = t.return;
  }
}
function Rc(e) {
  for (; D !== null; ) {
    var t = D;
    if (t === e) {
      D = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (D = n);
      break;
    }
    D = t.return;
  }
}
function jc(e) {
  for (; D !== null; ) {
    var t = D;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            zs(4, t);
          } catch (l) {
            Z(t, n, l);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (l) {
              Z(t, i, l);
            }
          }
          var s = t.return;
          try {
            Na(t);
          } catch (l) {
            Z(t, s, l);
          }
          break;
        case 5:
          var o = t.return;
          try {
            Na(t);
          } catch (l) {
            Z(t, o, l);
          }
      }
    } catch (l) {
      Z(t, t.return, l);
    }
    if (t === e) {
      D = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      (a.return = t.return), (D = a);
      break;
    }
    D = t.return;
  }
}
var oy = Math.ceil,
  xs = vt.ReactCurrentDispatcher,
  Bl = vt.ReactCurrentOwner,
  Be = vt.ReactCurrentBatchConfig,
  I = 0,
  le = null,
  ne = null,
  fe = 0,
  Ne = 0,
  Mn = Bt(0),
  ie = 0,
  Gr = null,
  cn = 0,
  bs = 0,
  Ul = 0,
  Tr = null,
  Te = null,
  $l = 0,
  Gn = 1 / 0,
  ot = null,
  ws = !1,
  Ra = null,
  Vt = null,
  Di = !1,
  Lt = null,
  Ss = 0,
  Cr = 0,
  ja = null,
  Gi = -1,
  Qi = 0;
function we() {
  return I & 6 ? ee() : Gi !== -1 ? Gi : (Gi = ee());
}
function Ot(e) {
  return e.mode & 1
    ? I & 2 && fe !== 0
      ? fe & -fe
      : $0.transition !== null
      ? (Qi === 0 && (Qi = bd()), Qi)
      : ((e = z),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Gd(e.type))),
        e)
    : 1;
}
function Ze(e, t, n, r) {
  if (50 < Cr) throw ((Cr = 0), (ja = null), Error(M(185)));
  ti(e, n, r),
    (!(I & 2) || e !== le) &&
      (e === le && (!(I & 2) && (bs |= n), ie === 4 && Pt(e, fe)),
      Le(e, r),
      n === 1 && I === 0 && !(t.mode & 1) && ((Gn = ee() + 500), _s && Ut()));
}
function Le(e, t) {
  var n = e.callbackNode;
  $g(e, t);
  var r = is(e, e === le ? fe : 0);
  if (r === 0)
    n !== null && Uu(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Uu(n), t === 1))
      e.tag === 0 ? U0(Vc.bind(null, e)) : dp(Vc.bind(null, e)),
        F0(function () {
          !(I & 6) && Ut();
        }),
        (n = null);
    else {
      switch (Bd(r)) {
        case 1:
          n = ml;
          break;
        case 4:
          n = Fd;
          break;
        case 16:
          n = rs;
          break;
        case 536870912:
          n = zd;
          break;
        default:
          n = rs;
      }
      n = ch(n, rh.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function rh(e, t) {
  if (((Gi = -1), (Qi = 0), I & 6)) throw Error(M(327));
  var n = e.callbackNode;
  if (zn() && e.callbackNode !== n) return null;
  var r = is(e, e === le ? fe : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = ks(e, r);
  else {
    t = r;
    var i = I;
    I |= 2;
    var s = sh();
    (le !== e || fe !== t) && ((ot = null), (Gn = ee() + 500), nn(e, t));
    do
      try {
        uy();
        break;
      } catch (a) {
        ih(e, a);
      }
    while (!0);
    Ll(),
      (xs.current = s),
      (I = i),
      ne !== null ? (t = 0) : ((le = null), (fe = 0), (t = ie));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((i = oa(e)), i !== 0 && ((r = i), (t = Va(e, i)))), t === 1)
    )
      throw ((n = Gr), nn(e, 0), Pt(e, r), Le(e, ee()), n);
    if (t === 6) Pt(e, r);
    else {
      if (
        ((i = e.current.alternate),
        !(r & 30) &&
          !ay(i) &&
          ((t = ks(e, r)),
          t === 2 && ((s = oa(e)), s !== 0 && ((r = s), (t = Va(e, s)))),
          t === 1))
      )
        throw ((n = Gr), nn(e, 0), Pt(e, r), Le(e, ee()), n);
      switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(M(345));
        case 2:
          Yt(e, Te, ot);
          break;
        case 3:
          if (
            (Pt(e, r), (r & 130023424) === r && ((t = $l + 500 - ee()), 10 < t))
          ) {
            if (is(e, 0) !== 0) break;
            if (((i = e.suspendedLanes), (i & r) !== r)) {
              we(), (e.pingedLanes |= e.suspendedLanes & i);
              break;
            }
            e.timeoutHandle = ha(Yt.bind(null, e, Te, ot), t);
            break;
          }
          Yt(e, Te, ot);
          break;
        case 4:
          if ((Pt(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var o = 31 - Xe(r);
            (s = 1 << o), (o = t[o]), o > i && (i = o), (r &= ~s);
          }
          if (
            ((r = i),
            (r = ee() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * oy(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = ha(Yt.bind(null, e, Te, ot), r);
            break;
          }
          Yt(e, Te, ot);
          break;
        case 5:
          Yt(e, Te, ot);
          break;
        default:
          throw Error(M(329));
      }
    }
  }
  return Le(e, ee()), e.callbackNode === n ? rh.bind(null, e) : null;
}
function Va(e, t) {
  var n = Tr;
  return (
    e.current.memoizedState.isDehydrated && (nn(e, t).flags |= 256),
    (e = ks(e, t)),
    e !== 2 && ((t = Te), (Te = n), t !== null && Oa(t)),
    e
  );
}
function Oa(e) {
  Te === null ? (Te = e) : Te.push.apply(Te, e);
}
function ay(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            s = i.getSnapshot;
          i = i.value;
          try {
            if (!Je(s(), i)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function Pt(e, t) {
  for (
    t &= ~Ul,
      t &= ~bs,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - Xe(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function Vc(e) {
  if (I & 6) throw Error(M(327));
  zn();
  var t = is(e, 0);
  if (!(t & 1)) return Le(e, ee()), null;
  var n = ks(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = oa(e);
    r !== 0 && ((t = r), (n = Va(e, r)));
  }
  if (n === 1) throw ((n = Gr), nn(e, 0), Pt(e, t), Le(e, ee()), n);
  if (n === 6) throw Error(M(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Yt(e, Te, ot),
    Le(e, ee()),
    null
  );
}
function Wl(e, t) {
  var n = I;
  I |= 1;
  try {
    return e(t);
  } finally {
    (I = n), I === 0 && ((Gn = ee() + 500), _s && Ut());
  }
}
function fn(e) {
  Lt !== null && Lt.tag === 0 && !(I & 6) && zn();
  var t = I;
  I |= 1;
  var n = Be.transition,
    r = z;
  try {
    if (((Be.transition = null), (z = 1), e)) return e();
  } finally {
    (z = r), (Be.transition = n), (I = t), !(I & 6) && Ut();
  }
}
function Hl() {
  (Ne = Mn.current), $(Mn);
}
function nn(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), I0(n)), ne !== null))
    for (n = ne.return; n !== null; ) {
      var r = n;
      switch ((El(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && us();
          break;
        case 3:
          Hn(), $(Pe), $(ye), Vl();
          break;
        case 5:
          jl(r);
          break;
        case 4:
          Hn();
          break;
        case 13:
          $(K);
          break;
        case 19:
          $(K);
          break;
        case 10:
          Nl(r.type._context);
          break;
        case 22:
        case 23:
          Hl();
      }
      n = n.return;
    }
  if (
    ((le = e),
    (ne = e = _t(e.current, null)),
    (fe = Ne = t),
    (ie = 0),
    (Gr = null),
    (Ul = bs = cn = 0),
    (Te = Tr = null),
    Jt !== null)
  ) {
    for (t = 0; t < Jt.length; t++)
      if (((n = Jt[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var i = r.next,
          s = n.pending;
        if (s !== null) {
          var o = s.next;
          (s.next = i), (r.next = o);
        }
        n.pending = r;
      }
    Jt = null;
  }
  return e;
}
function ih(e, t) {
  do {
    var n = ne;
    try {
      if ((Ll(), (Wi.current = vs), ys)) {
        for (var r = Q.memoizedState; r !== null; ) {
          var i = r.queue;
          i !== null && (i.pending = null), (r = r.next);
        }
        ys = !1;
      }
      if (
        ((un = 0),
        (oe = re = Q = null),
        (Sr = !1),
        (Wr = 0),
        (Bl.current = null),
        n === null || n.return === null)
      ) {
        (ie = 1), (Gr = t), (ne = null);
        break;
      }
      e: {
        var s = e,
          o = n.return,
          a = n,
          l = t;
        if (
          ((t = fe),
          (a.flags |= 32768),
          l !== null && typeof l == "object" && typeof l.then == "function")
        ) {
          var u = l,
            c = a,
            f = c.tag;
          if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var d = c.alternate;
            d
              ? ((c.updateQueue = d.updateQueue),
                (c.memoizedState = d.memoizedState),
                (c.lanes = d.lanes))
              : ((c.updateQueue = null), (c.memoizedState = null));
          }
          var g = Sc(o);
          if (g !== null) {
            (g.flags &= -257),
              kc(g, o, a, s, t),
              g.mode & 1 && wc(s, u, t),
              (t = g),
              (l = u);
            var x = t.updateQueue;
            if (x === null) {
              var y = new Set();
              y.add(l), (t.updateQueue = y);
            } else x.add(l);
            break e;
          } else {
            if (!(t & 1)) {
              wc(s, u, t), Kl();
              break e;
            }
            l = Error(M(426));
          }
        } else if (W && a.mode & 1) {
          var E = Sc(o);
          if (E !== null) {
            !(E.flags & 65536) && (E.flags |= 256),
              kc(E, o, a, s, t),
              Pl(Kn(l, a));
            break e;
          }
        }
        (s = l = Kn(l, a)),
          ie !== 4 && (ie = 2),
          Tr === null ? (Tr = [s]) : Tr.push(s),
          (s = o);
        do {
          switch (s.tag) {
            case 3:
              (s.flags |= 65536), (t &= -t), (s.lanes |= t);
              var m = Bp(s, l, t);
              hc(s, m);
              break e;
            case 1:
              a = l;
              var p = s.type,
                h = s.stateNode;
              if (
                !(s.flags & 128) &&
                (typeof p.getDerivedStateFromError == "function" ||
                  (h !== null &&
                    typeof h.componentDidCatch == "function" &&
                    (Vt === null || !Vt.has(h))))
              ) {
                (s.flags |= 65536), (t &= -t), (s.lanes |= t);
                var v = Up(s, a, t);
                hc(s, v);
                break e;
              }
          }
          s = s.return;
        } while (s !== null);
      }
      ah(n);
    } catch (w) {
      (t = w), ne === n && n !== null && (ne = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function sh() {
  var e = xs.current;
  return (xs.current = vs), e === null ? vs : e;
}
function Kl() {
  (ie === 0 || ie === 3 || ie === 2) && (ie = 4),
    le === null || (!(cn & 268435455) && !(bs & 268435455)) || Pt(le, fe);
}
function ks(e, t) {
  var n = I;
  I |= 2;
  var r = sh();
  (le !== e || fe !== t) && ((ot = null), nn(e, t));
  do
    try {
      ly();
      break;
    } catch (i) {
      ih(e, i);
    }
  while (!0);
  if ((Ll(), (I = n), (xs.current = r), ne !== null)) throw Error(M(261));
  return (le = null), (fe = 0), ie;
}
function ly() {
  for (; ne !== null; ) oh(ne);
}
function uy() {
  for (; ne !== null && !Vg(); ) oh(ne);
}
function oh(e) {
  var t = uh(e.alternate, e, Ne);
  (e.memoizedProps = e.pendingProps),
    t === null ? ah(e) : (ne = t),
    (Bl.current = null);
}
function ah(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = ny(n, t)), n !== null)) {
        (n.flags &= 32767), (ne = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (ie = 6), (ne = null);
        return;
      }
    } else if (((n = ty(n, t, Ne)), n !== null)) {
      ne = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      ne = t;
      return;
    }
    ne = t = e;
  } while (t !== null);
  ie === 0 && (ie = 5);
}
function Yt(e, t, n) {
  var r = z,
    i = Be.transition;
  try {
    (Be.transition = null), (z = 1), cy(e, t, n, r);
  } finally {
    (Be.transition = i), (z = r);
  }
  return null;
}
function cy(e, t, n, r) {
  do zn();
  while (Lt !== null);
  if (I & 6) throw Error(M(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(M(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var s = n.lanes | n.childLanes;
  if (
    (Wg(e, s),
    e === le && ((ne = le = null), (fe = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Di ||
      ((Di = !0),
      ch(rs, function () {
        return zn(), null;
      })),
    (s = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || s)
  ) {
    (s = Be.transition), (Be.transition = null);
    var o = z;
    z = 1;
    var a = I;
    (I |= 4),
      (Bl.current = null),
      iy(e, n),
      th(n, e),
      D0(da),
      (ss = !!fa),
      (da = fa = null),
      (e.current = n),
      sy(n),
      Og(),
      (I = a),
      (z = o),
      (Be.transition = s);
  } else e.current = n;
  if (
    (Di && ((Di = !1), (Lt = e), (Ss = i)),
    (s = e.pendingLanes),
    s === 0 && (Vt = null),
    Fg(n.stateNode),
    Le(e, ee()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (i = t[n]), r(i.value, { componentStack: i.stack, digest: i.digest });
  if (ws) throw ((ws = !1), (e = Ra), (Ra = null), e);
  return (
    Ss & 1 && e.tag !== 0 && zn(),
    (s = e.pendingLanes),
    s & 1 ? (e === ja ? Cr++ : ((Cr = 0), (ja = e))) : (Cr = 0),
    Ut(),
    null
  );
}
function zn() {
  if (Lt !== null) {
    var e = Bd(Ss),
      t = Be.transition,
      n = z;
    try {
      if (((Be.transition = null), (z = 16 > e ? 16 : e), Lt === null))
        var r = !1;
      else {
        if (((e = Lt), (Lt = null), (Ss = 0), I & 6)) throw Error(M(331));
        var i = I;
        for (I |= 4, D = e.current; D !== null; ) {
          var s = D,
            o = s.child;
          if (D.flags & 16) {
            var a = s.deletions;
            if (a !== null) {
              for (var l = 0; l < a.length; l++) {
                var u = a[l];
                for (D = u; D !== null; ) {
                  var c = D;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      kr(8, c, s);
                  }
                  var f = c.child;
                  if (f !== null) (f.return = c), (D = f);
                  else
                    for (; D !== null; ) {
                      c = D;
                      var d = c.sibling,
                        g = c.return;
                      if ((Jp(c), c === u)) {
                        D = null;
                        break;
                      }
                      if (d !== null) {
                        (d.return = g), (D = d);
                        break;
                      }
                      D = g;
                    }
                }
              }
              var x = s.alternate;
              if (x !== null) {
                var y = x.child;
                if (y !== null) {
                  x.child = null;
                  do {
                    var E = y.sibling;
                    (y.sibling = null), (y = E);
                  } while (y !== null);
                }
              }
              D = s;
            }
          }
          if (s.subtreeFlags & 2064 && o !== null) (o.return = s), (D = o);
          else
            e: for (; D !== null; ) {
              if (((s = D), s.flags & 2048))
                switch (s.tag) {
                  case 0:
                  case 11:
                  case 15:
                    kr(9, s, s.return);
                }
              var m = s.sibling;
              if (m !== null) {
                (m.return = s.return), (D = m);
                break e;
              }
              D = s.return;
            }
        }
        var p = e.current;
        for (D = p; D !== null; ) {
          o = D;
          var h = o.child;
          if (o.subtreeFlags & 2064 && h !== null) (h.return = o), (D = h);
          else
            e: for (o = p; D !== null; ) {
              if (((a = D), a.flags & 2048))
                try {
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      zs(9, a);
                  }
                } catch (w) {
                  Z(a, a.return, w);
                }
              if (a === o) {
                D = null;
                break e;
              }
              var v = a.sibling;
              if (v !== null) {
                (v.return = a.return), (D = v);
                break e;
              }
              D = a.return;
            }
        }
        if (
          ((I = i), Ut(), nt && typeof nt.onPostCommitFiberRoot == "function")
        )
          try {
            nt.onPostCommitFiberRoot(As, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (z = n), (Be.transition = t);
    }
  }
  return !1;
}
function Oc(e, t, n) {
  (t = Kn(n, t)),
    (t = Bp(e, t, 1)),
    (e = jt(e, t, 1)),
    (t = we()),
    e !== null && (ti(e, 1, t), Le(e, t));
}
function Z(e, t, n) {
  if (e.tag === 3) Oc(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Oc(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (Vt === null || !Vt.has(r)))
        ) {
          (e = Kn(n, e)),
            (e = Up(t, e, 1)),
            (t = jt(t, e, 1)),
            (e = we()),
            t !== null && (ti(t, 1, e), Le(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function fy(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = we()),
    (e.pingedLanes |= e.suspendedLanes & n),
    le === e &&
      (fe & n) === n &&
      (ie === 4 || (ie === 3 && (fe & 130023424) === fe && 500 > ee() - $l)
        ? nn(e, 0)
        : (Ul |= n)),
    Le(e, t);
}
function lh(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = wi), (wi <<= 1), !(wi & 130023424) && (wi = 4194304))
      : (t = 1));
  var n = we();
  (e = pt(e, t)), e !== null && (ti(e, t, n), Le(e, n));
}
function dy(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), lh(e, n);
}
function py(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        i = e.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(M(314));
  }
  r !== null && r.delete(t), lh(e, n);
}
var uh;
uh = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Pe.current) Ce = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (Ce = !1), ey(e, t, n);
      Ce = !!(e.flags & 131072);
    }
  else (Ce = !1), W && t.flags & 1048576 && pp(t, ds, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      Ki(e, t), (e = t.pendingProps);
      var i = Un(t, ye.current);
      Fn(t, n), (i = _l(null, t, r, e, i, n));
      var s = Il();
      return (
        (t.flags |= 1),
        typeof i == "object" &&
        i !== null &&
        typeof i.render == "function" &&
        i.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Me(r) ? ((s = !0), cs(t)) : (s = !1),
            (t.memoizedState =
              i.state !== null && i.state !== void 0 ? i.state : null),
            Al(t),
            (i.updater = Fs),
            (t.stateNode = i),
            (i._reactInternals = t),
            Sa(t, r, e, n),
            (t = Ca(null, t, r, !0, s, n)))
          : ((t.tag = 0), W && s && Cl(t), ve(null, t, i, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Ki(e, t),
          (e = t.pendingProps),
          (i = r._init),
          (r = i(r._payload)),
          (t.type = r),
          (i = t.tag = my(r)),
          (e = Ge(r, e)),
          i)
        ) {
          case 0:
            t = Ta(null, t, r, e, n);
            break e;
          case 1:
            t = Ec(null, t, r, e, n);
            break e;
          case 11:
            t = Tc(null, t, r, e, n);
            break e;
          case 14:
            t = Cc(null, t, r, Ge(r.type, e), n);
            break e;
        }
        throw Error(M(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Ge(r, i)),
        Ta(e, t, r, i, n)
      );
    case 1:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Ge(r, i)),
        Ec(e, t, r, i, n)
      );
    case 3:
      e: {
        if ((Kp(t), e === null)) throw Error(M(387));
        (r = t.pendingProps),
          (s = t.memoizedState),
          (i = s.element),
          xp(e, t),
          ms(t, r, null, n);
        var o = t.memoizedState;
        if (((r = o.element), s.isDehydrated))
          if (
            ((s = {
              element: r,
              isDehydrated: !1,
              cache: o.cache,
              pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
              transitions: o.transitions,
            }),
            (t.updateQueue.baseState = s),
            (t.memoizedState = s),
            t.flags & 256)
          ) {
            (i = Kn(Error(M(423)), t)), (t = Pc(e, t, r, n, i));
            break e;
          } else if (r !== i) {
            (i = Kn(Error(M(424)), t)), (t = Pc(e, t, r, n, i));
            break e;
          } else
            for (
              De = Rt(t.stateNode.containerInfo.firstChild),
                Ae = t,
                W = !0,
                Ye = null,
                n = yp(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if (($n(), r === i)) {
            t = ht(e, t, n);
            break e;
          }
          ve(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        wp(t),
        e === null && va(t),
        (r = t.type),
        (i = t.pendingProps),
        (s = e !== null ? e.memoizedProps : null),
        (o = i.children),
        pa(r, i) ? (o = null) : s !== null && pa(r, s) && (t.flags |= 32),
        Hp(e, t),
        ve(e, t, o, n),
        t.child
      );
    case 6:
      return e === null && va(t), null;
    case 13:
      return Gp(e, t, n);
    case 4:
      return (
        Rl(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = Wn(t, null, r, n)) : ve(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Ge(r, i)),
        Tc(e, t, r, i, n)
      );
    case 7:
      return ve(e, t, t.pendingProps, n), t.child;
    case 8:
      return ve(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ve(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (i = t.pendingProps),
          (s = t.memoizedProps),
          (o = i.value),
          b(ps, r._currentValue),
          (r._currentValue = o),
          s !== null)
        )
          if (Je(s.value, o)) {
            if (s.children === i.children && !Pe.current) {
              t = ht(e, t, n);
              break e;
            }
          } else
            for (s = t.child, s !== null && (s.return = t); s !== null; ) {
              var a = s.dependencies;
              if (a !== null) {
                o = s.child;
                for (var l = a.firstContext; l !== null; ) {
                  if (l.context === r) {
                    if (s.tag === 1) {
                      (l = ct(-1, n & -n)), (l.tag = 2);
                      var u = s.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var c = u.pending;
                        c === null
                          ? (l.next = l)
                          : ((l.next = c.next), (c.next = l)),
                          (u.pending = l);
                      }
                    }
                    (s.lanes |= n),
                      (l = s.alternate),
                      l !== null && (l.lanes |= n),
                      xa(s.return, n, t),
                      (a.lanes |= n);
                    break;
                  }
                  l = l.next;
                }
              } else if (s.tag === 10) o = s.type === t.type ? null : s.child;
              else if (s.tag === 18) {
                if (((o = s.return), o === null)) throw Error(M(341));
                (o.lanes |= n),
                  (a = o.alternate),
                  a !== null && (a.lanes |= n),
                  xa(o, n, t),
                  (o = s.sibling);
              } else o = s.child;
              if (o !== null) o.return = s;
              else
                for (o = s; o !== null; ) {
                  if (o === t) {
                    o = null;
                    break;
                  }
                  if (((s = o.sibling), s !== null)) {
                    (s.return = o.return), (o = s);
                    break;
                  }
                  o = o.return;
                }
              s = o;
            }
        ve(e, t, i.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (i = t.type),
        (r = t.pendingProps.children),
        Fn(t, n),
        (i = $e(i)),
        (r = r(i)),
        (t.flags |= 1),
        ve(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (i = Ge(r, t.pendingProps)),
        (i = Ge(r.type, i)),
        Cc(e, t, r, i, n)
      );
    case 15:
      return $p(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Ge(r, i)),
        Ki(e, t),
        (t.tag = 1),
        Me(r) ? ((e = !0), cs(t)) : (e = !1),
        Fn(t, n),
        bp(t, r, i),
        Sa(t, r, i, n),
        Ca(null, t, r, !0, e, n)
      );
    case 19:
      return Qp(e, t, n);
    case 22:
      return Wp(e, t, n);
  }
  throw Error(M(156, t.tag));
};
function ch(e, t) {
  return Id(e, t);
}
function hy(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function ze(e, t, n, r) {
  return new hy(e, t, n, r);
}
function Gl(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function my(e) {
  if (typeof e == "function") return Gl(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === dl)) return 11;
    if (e === pl) return 14;
  }
  return 2;
}
function _t(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = ze(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Yi(e, t, n, r, i, s) {
  var o = 2;
  if (((r = e), typeof e == "function")) Gl(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else
    e: switch (e) {
      case yn:
        return rn(n.children, i, s, t);
      case fl:
        (o = 8), (i |= 8);
        break;
      case Ho:
        return (
          (e = ze(12, n, t, i | 2)), (e.elementType = Ho), (e.lanes = s), e
        );
      case Ko:
        return (e = ze(13, n, t, i)), (e.elementType = Ko), (e.lanes = s), e;
      case Go:
        return (e = ze(19, n, t, i)), (e.elementType = Go), (e.lanes = s), e;
      case wd:
        return Bs(n, i, s, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case vd:
              o = 10;
              break e;
            case xd:
              o = 9;
              break e;
            case dl:
              o = 11;
              break e;
            case pl:
              o = 14;
              break e;
            case Tt:
              (o = 16), (r = null);
              break e;
          }
        throw Error(M(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = ze(o, n, t, i)), (t.elementType = e), (t.type = r), (t.lanes = s), t
  );
}
function rn(e, t, n, r) {
  return (e = ze(7, e, r, t)), (e.lanes = n), e;
}
function Bs(e, t, n, r) {
  return (
    (e = ze(22, e, r, t)),
    (e.elementType = wd),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Co(e, t, n) {
  return (e = ze(6, e, null, t)), (e.lanes = n), e;
}
function Eo(e, t, n) {
  return (
    (t = ze(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function gy(e, t, n, r, i) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = io(0)),
    (this.expirationTimes = io(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = io(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null);
}
function Ql(e, t, n, r, i, s, o, a, l) {
  return (
    (e = new gy(e, t, n, a, l)),
    t === 1 ? ((t = 1), s === !0 && (t |= 8)) : (t = 0),
    (s = ze(3, null, null, t)),
    (e.current = s),
    (s.stateNode = e),
    (s.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Al(s),
    e
  );
}
function yy(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: gn,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function fh(e) {
  if (!e) return Ft;
  e = e._reactInternals;
  e: {
    if (hn(e) !== e || e.tag !== 1) throw Error(M(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Me(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(M(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Me(n)) return fp(e, n, t);
  }
  return t;
}
function dh(e, t, n, r, i, s, o, a, l) {
  return (
    (e = Ql(n, r, !0, e, i, s, o, a, l)),
    (e.context = fh(null)),
    (n = e.current),
    (r = we()),
    (i = Ot(n)),
    (s = ct(r, i)),
    (s.callback = t ?? null),
    jt(n, s, i),
    (e.current.lanes = i),
    ti(e, i, r),
    Le(e, r),
    e
  );
}
function Us(e, t, n, r) {
  var i = t.current,
    s = we(),
    o = Ot(i);
  return (
    (n = fh(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = ct(s, o)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = jt(i, t, o)),
    e !== null && (Ze(e, i, o, s), $i(e, i, o)),
    o
  );
}
function Ts(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function _c(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Yl(e, t) {
  _c(e, t), (e = e.alternate) && _c(e, t);
}
function vy() {
  return null;
}
var ph =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Xl(e) {
  this._internalRoot = e;
}
$s.prototype.render = Xl.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(M(409));
  Us(e, t, null, null);
};
$s.prototype.unmount = Xl.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    fn(function () {
      Us(null, e, null, null);
    }),
      (t[dt] = null);
  }
};
function $s(e) {
  this._internalRoot = e;
}
$s.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Wd();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Et.length && t !== 0 && t < Et[n].priority; n++);
    Et.splice(n, 0, e), n === 0 && Kd(e);
  }
};
function Zl(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Ws(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Ic() {}
function xy(e, t, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var s = r;
      r = function () {
        var u = Ts(o);
        s.call(u);
      };
    }
    var o = dh(t, r, e, 0, null, !1, !1, "", Ic);
    return (
      (e._reactRootContainer = o),
      (e[dt] = o.current),
      zr(e.nodeType === 8 ? e.parentNode : e),
      fn(),
      o
    );
  }
  for (; (i = e.lastChild); ) e.removeChild(i);
  if (typeof r == "function") {
    var a = r;
    r = function () {
      var u = Ts(l);
      a.call(u);
    };
  }
  var l = Ql(e, 0, !1, null, null, !1, !1, "", Ic);
  return (
    (e._reactRootContainer = l),
    (e[dt] = l.current),
    zr(e.nodeType === 8 ? e.parentNode : e),
    fn(function () {
      Us(t, l, n, r);
    }),
    l
  );
}
function Hs(e, t, n, r, i) {
  var s = n._reactRootContainer;
  if (s) {
    var o = s;
    if (typeof i == "function") {
      var a = i;
      i = function () {
        var l = Ts(o);
        a.call(l);
      };
    }
    Us(t, o, e, i);
  } else o = xy(n, t, e, i, r);
  return Ts(o);
}
Ud = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = pr(t.pendingLanes);
        n !== 0 &&
          (gl(t, n | 1), Le(t, ee()), !(I & 6) && ((Gn = ee() + 500), Ut()));
      }
      break;
    case 13:
      fn(function () {
        var r = pt(e, 1);
        if (r !== null) {
          var i = we();
          Ze(r, e, 1, i);
        }
      }),
        Yl(e, 1);
  }
};
yl = function (e) {
  if (e.tag === 13) {
    var t = pt(e, 134217728);
    if (t !== null) {
      var n = we();
      Ze(t, e, 134217728, n);
    }
    Yl(e, 134217728);
  }
};
$d = function (e) {
  if (e.tag === 13) {
    var t = Ot(e),
      n = pt(e, t);
    if (n !== null) {
      var r = we();
      Ze(n, e, t, r);
    }
    Yl(e, t);
  }
};
Wd = function () {
  return z;
};
Hd = function (e, t) {
  var n = z;
  try {
    return (z = e), t();
  } finally {
    z = n;
  }
};
ra = function (e, t, n) {
  switch (t) {
    case "input":
      if ((Xo(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = Os(r);
            if (!i) throw Error(M(90));
            kd(r), Xo(r, i);
          }
        }
      }
      break;
    case "textarea":
      Cd(e, n);
      break;
    case "select":
      (t = n.value), t != null && Vn(e, !!n.multiple, t, !1);
  }
};
Ad = Wl;
Rd = fn;
var wy = { usingClientEntryPoint: !1, Events: [ri, Sn, Os, Nd, Dd, Wl] },
  ur = {
    findFiberByHostInstance: Zt,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  Sy = {
    bundleType: ur.bundleType,
    version: ur.version,
    rendererPackageName: ur.rendererPackageName,
    rendererConfig: ur.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: vt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = Od(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: ur.findFiberByHostInstance || vy,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Ai = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Ai.isDisabled && Ai.supportsFiber)
    try {
      (As = Ai.inject(Sy)), (nt = Ai);
    } catch {}
}
je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = wy;
je.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Zl(t)) throw Error(M(200));
  return yy(e, t, null, n);
};
je.createRoot = function (e, t) {
  if (!Zl(e)) throw Error(M(299));
  var n = !1,
    r = "",
    i = ph;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    (t = Ql(e, 1, !1, null, null, n, !1, r, i)),
    (e[dt] = t.current),
    zr(e.nodeType === 8 ? e.parentNode : e),
    new Xl(t)
  );
};
je.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(M(188))
      : ((e = Object.keys(e).join(",")), Error(M(268, e)));
  return (e = Od(t)), (e = e === null ? null : e.stateNode), e;
};
je.flushSync = function (e) {
  return fn(e);
};
je.hydrate = function (e, t, n) {
  if (!Ws(t)) throw Error(M(200));
  return Hs(null, e, t, !0, n);
};
je.hydrateRoot = function (e, t, n) {
  if (!Zl(e)) throw Error(M(405));
  var r = (n != null && n.hydratedSources) || null,
    i = !1,
    s = "",
    o = ph;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (i = !0),
      n.identifierPrefix !== void 0 && (s = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
    (t = dh(t, null, e, 1, n ?? null, i, !1, s, o)),
    (e[dt] = t.current),
    zr(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (i = n._getVersion),
        (i = i(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, i])
          : t.mutableSourceEagerHydrationData.push(n, i);
  return new $s(t);
};
je.render = function (e, t, n) {
  if (!Ws(t)) throw Error(M(200));
  return Hs(null, e, t, !1, n);
};
je.unmountComponentAtNode = function (e) {
  if (!Ws(e)) throw Error(M(40));
  return e._reactRootContainer
    ? (fn(function () {
        Hs(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[dt] = null);
        });
      }),
      !0)
    : !1;
};
je.unstable_batchedUpdates = Wl;
je.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Ws(n)) throw Error(M(200));
  if (e == null || e._reactInternals === void 0) throw Error(M(38));
  return Hs(e, t, n, !1, r);
};
je.version = "18.3.1-next-f1338f8080-20240426";
function hh() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(hh);
    } catch (e) {
      console.error(e);
    }
}
hh(), (hd.exports = je);
var ky = hd.exports,
  Fc = ky;
($o.createRoot = Fc.createRoot), ($o.hydrateRoot = Fc.hydrateRoot);
const Jl = T.createContext({});
function si(e) {
  const t = T.useRef(null);
  return t.current === null && (t.current = e()), t.current;
}
const ql = typeof window < "u",
  eu = ql ? T.useLayoutEffect : T.useEffect,
  Ks = T.createContext(null);
function tu(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function nu(e, t) {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
const mt = (e, t, n) => (n > t ? t : n < e ? e : n);
let ru = () => {};
const gt = {},
  mh = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e);
function gh(e) {
  return typeof e == "object" && e !== null;
}
const yh = (e) => /^0[^.\s]+$/u.test(e);
function iu(e) {
  let t;
  return () => (t === void 0 && (t = e()), t);
}
const Ue = (e) => e,
  Ty = (e, t) => (n) => t(e(n)),
  oi = (...e) => e.reduce(Ty),
  Qr = (e, t, n) => {
    const r = t - e;
    return r === 0 ? 1 : (n - e) / r;
  };
class su {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return tu(this.subscriptions, t), () => nu(this.subscriptions, t);
  }
  notify(t, n, r) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1) this.subscriptions[0](t, n, r);
      else
        for (let s = 0; s < i; s++) {
          const o = this.subscriptions[s];
          o && o(t, n, r);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const it = (e) => e * 1e3,
  be = (e) => e / 1e3;
function vh(e, t) {
  return t ? e * (1e3 / t) : 0;
}
const xh = (e, t, n) =>
    (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e,
  Cy = 1e-7,
  Ey = 12;
function Py(e, t, n, r, i) {
  let s,
    o,
    a = 0;
  do (o = t + (n - t) / 2), (s = xh(o, r, i) - e), s > 0 ? (n = o) : (t = o);
  while (Math.abs(s) > Cy && ++a < Ey);
  return o;
}
function ai(e, t, n, r) {
  if (e === t && n === r) return Ue;
  const i = (s) => Py(s, 0, 1, e, n);
  return (s) => (s === 0 || s === 1 ? s : xh(i(s), t, r));
}
const wh = (e) => (t) => t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2,
  Sh = (e) => (t) => 1 - e(1 - t),
  kh = ai(0.33, 1.53, 0.69, 0.99),
  ou = Sh(kh),
  Th = wh(ou),
  Ch = (e) =>
    (e *= 2) < 1 ? 0.5 * ou(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))),
  au = (e) => 1 - Math.sin(Math.acos(e)),
  Eh = Sh(au),
  Ph = wh(au),
  My = ai(0.42, 0, 1, 1),
  Ly = ai(0, 0, 0.58, 1),
  Mh = ai(0.42, 0, 0.58, 1),
  Ny = (e) => Array.isArray(e) && typeof e[0] != "number",
  Lh = (e) => Array.isArray(e) && typeof e[0] == "number",
  Dy = {
    linear: Ue,
    easeIn: My,
    easeInOut: Mh,
    easeOut: Ly,
    circIn: au,
    circInOut: Ph,
    circOut: Eh,
    backIn: ou,
    backInOut: Th,
    backOut: kh,
    anticipate: Ch,
  },
  Ay = (e) => typeof e == "string",
  zc = (e) => {
    if (Lh(e)) {
      ru(e.length === 4);
      const [t, n, r, i] = e;
      return ai(t, n, r, i);
    } else if (Ay(e)) return Dy[e];
    return e;
  },
  Ri = [
    "setup",
    "read",
    "resolveKeyframes",
    "preUpdate",
    "update",
    "preRender",
    "render",
    "postRender",
  ];
function Ry(e, t) {
  let n = new Set(),
    r = new Set(),
    i = !1,
    s = !1;
  const o = new WeakSet();
  let a = { delta: 0, timestamp: 0, isProcessing: !1 };
  function l(c) {
    o.has(c) && (u.schedule(c), e()), c(a);
  }
  const u = {
    schedule: (c, f = !1, d = !1) => {
      const x = d && i ? n : r;
      return f && o.add(c), x.has(c) || x.add(c), c;
    },
    cancel: (c) => {
      r.delete(c), o.delete(c);
    },
    process: (c) => {
      if (((a = c), i)) {
        s = !0;
        return;
      }
      (i = !0),
        ([n, r] = [r, n]),
        n.forEach(l),
        n.clear(),
        (i = !1),
        s && ((s = !1), u.process(c));
    },
  };
  return u;
}
const jy = 40;
function Nh(e, t) {
  let n = !1,
    r = !0;
  const i = { delta: 0, timestamp: 0, isProcessing: !1 },
    s = () => (n = !0),
    o = Ri.reduce((h, v) => ((h[v] = Ry(s)), h), {}),
    {
      setup: a,
      read: l,
      resolveKeyframes: u,
      preUpdate: c,
      update: f,
      preRender: d,
      render: g,
      postRender: x,
    } = o,
    y = () => {
      const h = gt.useManualTiming ? i.timestamp : performance.now();
      (n = !1),
        gt.useManualTiming ||
          (i.delta = r ? 1e3 / 60 : Math.max(Math.min(h - i.timestamp, jy), 1)),
        (i.timestamp = h),
        (i.isProcessing = !0),
        a.process(i),
        l.process(i),
        u.process(i),
        c.process(i),
        f.process(i),
        d.process(i),
        g.process(i),
        x.process(i),
        (i.isProcessing = !1),
        n && t && ((r = !1), e(y));
    },
    E = () => {
      (n = !0), (r = !0), i.isProcessing || e(y);
    };
  return {
    schedule: Ri.reduce((h, v) => {
      const w = o[v];
      return (h[v] = (k, P = !1, C = !1) => (n || E(), w.schedule(k, P, C))), h;
    }, {}),
    cancel: (h) => {
      for (let v = 0; v < Ri.length; v++) o[Ri[v]].cancel(h);
    },
    state: i,
    steps: o,
  };
}
const {
  schedule: B,
  cancel: yt,
  state: ce,
  steps: Po,
} = Nh(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Ue, !0);
let Xi;
function Vy() {
  Xi = void 0;
}
const Ee = {
    now: () => (
      Xi === void 0 &&
        Ee.set(
          ce.isProcessing || gt.useManualTiming
            ? ce.timestamp
            : performance.now()
        ),
      Xi
    ),
    set: (e) => {
      (Xi = e), queueMicrotask(Vy);
    },
  },
  Dh = (e) => (t) => typeof t == "string" && t.startsWith(e),
  lu = Dh("--"),
  Oy = Dh("var(--"),
  uu = (e) => (Oy(e) ? _y.test(e.split("/*")[0].trim()) : !1),
  _y =
    /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
  Jn = {
    test: (e) => typeof e == "number",
    parse: parseFloat,
    transform: (e) => e,
  },
  Yr = { ...Jn, transform: (e) => mt(0, 1, e) },
  ji = { ...Jn, default: 1 },
  Er = (e) => Math.round(e * 1e5) / 1e5,
  cu = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Iy(e) {
  return e == null;
}
const Fy =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  fu = (e, t) => (n) =>
    !!(
      (typeof n == "string" && Fy.test(n) && n.startsWith(e)) ||
      (t && !Iy(n) && Object.prototype.hasOwnProperty.call(n, t))
    ),
  Ah = (e, t, n) => (r) => {
    if (typeof r != "string") return r;
    const [i, s, o, a] = r.match(cu);
    return {
      [e]: parseFloat(i),
      [t]: parseFloat(s),
      [n]: parseFloat(o),
      alpha: a !== void 0 ? parseFloat(a) : 1,
    };
  },
  zy = (e) => mt(0, 255, e),
  Mo = { ...Jn, transform: (e) => Math.round(zy(e)) },
  en = {
    test: fu("rgb", "red"),
    parse: Ah("red", "green", "blue"),
    transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) =>
      "rgba(" +
      Mo.transform(e) +
      ", " +
      Mo.transform(t) +
      ", " +
      Mo.transform(n) +
      ", " +
      Er(Yr.transform(r)) +
      ")",
  };
function by(e) {
  let t = "",
    n = "",
    r = "",
    i = "";
  return (
    e.length > 5
      ? ((t = e.substring(1, 3)),
        (n = e.substring(3, 5)),
        (r = e.substring(5, 7)),
        (i = e.substring(7, 9)))
      : ((t = e.substring(1, 2)),
        (n = e.substring(2, 3)),
        (r = e.substring(3, 4)),
        (i = e.substring(4, 5)),
        (t += t),
        (n += n),
        (r += r),
        (i += i)),
    {
      red: parseInt(t, 16),
      green: parseInt(n, 16),
      blue: parseInt(r, 16),
      alpha: i ? parseInt(i, 16) / 255 : 1,
    }
  );
}
const _a = { test: fu("#"), parse: by, transform: en.transform },
  li = (e) => ({
    test: (t) =>
      typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
    parse: parseFloat,
    transform: (t) => `${t}${e}`,
  }),
  kt = li("deg"),
  st = li("%"),
  j = li("px"),
  By = li("vh"),
  Uy = li("vw"),
  bc = {
    ...st,
    parse: (e) => st.parse(e) / 100,
    transform: (e) => st.transform(e * 100),
  },
  Ln = {
    test: fu("hsl", "hue"),
    parse: Ah("hue", "saturation", "lightness"),
    transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) =>
      "hsla(" +
      Math.round(e) +
      ", " +
      st.transform(Er(t)) +
      ", " +
      st.transform(Er(n)) +
      ", " +
      Er(Yr.transform(r)) +
      ")",
  },
  te = {
    test: (e) => en.test(e) || _a.test(e) || Ln.test(e),
    parse: (e) =>
      en.test(e) ? en.parse(e) : Ln.test(e) ? Ln.parse(e) : _a.parse(e),
    transform: (e) =>
      typeof e == "string"
        ? e
        : e.hasOwnProperty("red")
        ? en.transform(e)
        : Ln.transform(e),
    getAnimatableNone: (e) => {
      const t = te.parse(e);
      return (t.alpha = 0), te.transform(t);
    },
  },
  $y =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Wy(e) {
  var t, n;
  return (
    isNaN(e) &&
    typeof e == "string" &&
    (((t = e.match(cu)) == null ? void 0 : t.length) || 0) +
      (((n = e.match($y)) == null ? void 0 : n.length) || 0) >
      0
  );
}
const Rh = "number",
  jh = "color",
  Hy = "var",
  Ky = "var(",
  Bc = "${}",
  Gy =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Xr(e) {
  const t = e.toString(),
    n = [],
    r = { color: [], number: [], var: [] },
    i = [];
  let s = 0;
  const a = t
    .replace(
      Gy,
      (l) => (
        te.test(l)
          ? (r.color.push(s), i.push(jh), n.push(te.parse(l)))
          : l.startsWith(Ky)
          ? (r.var.push(s), i.push(Hy), n.push(l))
          : (r.number.push(s), i.push(Rh), n.push(parseFloat(l))),
        ++s,
        Bc
      )
    )
    .split(Bc);
  return { values: n, split: a, indexes: r, types: i };
}
function Vh(e) {
  return Xr(e).values;
}
function Oh(e) {
  const { split: t, types: n } = Xr(e),
    r = t.length;
  return (i) => {
    let s = "";
    for (let o = 0; o < r; o++)
      if (((s += t[o]), i[o] !== void 0)) {
        const a = n[o];
        a === Rh
          ? (s += Er(i[o]))
          : a === jh
          ? (s += te.transform(i[o]))
          : (s += i[o]);
      }
    return s;
  };
}
const Qy = (e) =>
  typeof e == "number" ? 0 : te.test(e) ? te.getAnimatableNone(e) : e;
function Yy(e) {
  const t = Vh(e);
  return Oh(e)(t.map(Qy));
}
const zt = {
  test: Wy,
  parse: Vh,
  createTransformer: Oh,
  getAnimatableNone: Yy,
};
function Lo(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6
      ? e + (t - e) * 6 * n
      : n < 1 / 2
      ? t
      : n < 2 / 3
      ? e + (t - e) * (2 / 3 - n) * 6
      : e
  );
}
function Xy({ hue: e, saturation: t, lightness: n, alpha: r }) {
  (e /= 360), (t /= 100), (n /= 100);
  let i = 0,
    s = 0,
    o = 0;
  if (!t) i = s = o = n;
  else {
    const a = n < 0.5 ? n * (1 + t) : n + t - n * t,
      l = 2 * n - a;
    (i = Lo(l, a, e + 1 / 3)), (s = Lo(l, a, e)), (o = Lo(l, a, e - 1 / 3));
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(s * 255),
    blue: Math.round(o * 255),
    alpha: r,
  };
}
function Cs(e, t) {
  return (n) => (n > 0 ? t : e);
}
const G = (e, t, n) => e + (t - e) * n,
  No = (e, t, n) => {
    const r = e * e,
      i = n * (t * t - r) + r;
    return i < 0 ? 0 : Math.sqrt(i);
  },
  Zy = [_a, en, Ln],
  Jy = (e) => Zy.find((t) => t.test(e));
function Uc(e) {
  const t = Jy(e);
  if (!t) return !1;
  let n = t.parse(e);
  return t === Ln && (n = Xy(n)), n;
}
const $c = (e, t) => {
    const n = Uc(e),
      r = Uc(t);
    if (!n || !r) return Cs(e, t);
    const i = { ...n };
    return (s) => (
      (i.red = No(n.red, r.red, s)),
      (i.green = No(n.green, r.green, s)),
      (i.blue = No(n.blue, r.blue, s)),
      (i.alpha = G(n.alpha, r.alpha, s)),
      en.transform(i)
    );
  },
  Ia = new Set(["none", "hidden"]);
function qy(e, t) {
  return Ia.has(e) ? (n) => (n <= 0 ? e : t) : (n) => (n >= 1 ? t : e);
}
function ev(e, t) {
  return (n) => G(e, t, n);
}
function du(e) {
  return typeof e == "number"
    ? ev
    : typeof e == "string"
    ? uu(e)
      ? Cs
      : te.test(e)
      ? $c
      : rv
    : Array.isArray(e)
    ? _h
    : typeof e == "object"
    ? te.test(e)
      ? $c
      : tv
    : Cs;
}
function _h(e, t) {
  const n = [...e],
    r = n.length,
    i = e.map((s, o) => du(s)(s, t[o]));
  return (s) => {
    for (let o = 0; o < r; o++) n[o] = i[o](s);
    return n;
  };
}
function tv(e, t) {
  const n = { ...e, ...t },
    r = {};
  for (const i in n)
    e[i] !== void 0 && t[i] !== void 0 && (r[i] = du(e[i])(e[i], t[i]));
  return (i) => {
    for (const s in r) n[s] = r[s](i);
    return n;
  };
}
function nv(e, t) {
  const n = [],
    r = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < t.values.length; i++) {
    const s = t.types[i],
      o = e.indexes[s][r[s]],
      a = e.values[o] ?? 0;
    (n[i] = a), r[s]++;
  }
  return n;
}
const rv = (e, t) => {
  const n = zt.createTransformer(t),
    r = Xr(e),
    i = Xr(t);
  return r.indexes.var.length === i.indexes.var.length &&
    r.indexes.color.length === i.indexes.color.length &&
    r.indexes.number.length >= i.indexes.number.length
    ? (Ia.has(e) && !i.values.length) || (Ia.has(t) && !r.values.length)
      ? qy(e, t)
      : oi(_h(nv(r, i), i.values), n)
    : Cs(e, t);
};
function Ih(e, t, n) {
  return typeof e == "number" && typeof t == "number" && typeof n == "number"
    ? G(e, t, n)
    : du(e)(e, t);
}
const iv = (e) => {
    const t = ({ timestamp: n }) => e(n);
    return {
      start: (n = !0) => B.update(t, n),
      stop: () => yt(t),
      now: () => (ce.isProcessing ? ce.timestamp : Ee.now()),
    };
  },
  Fh = (e, t, n = 10) => {
    let r = "";
    const i = Math.max(Math.round(t / n), 2);
    for (let s = 0; s < i; s++)
      r += Math.round(e(s / (i - 1)) * 1e4) / 1e4 + ", ";
    return `linear(${r.substring(0, r.length - 2)})`;
  },
  Es = 2e4;
function pu(e) {
  let t = 0;
  const n = 50;
  let r = e.next(t);
  for (; !r.done && t < Es; ) (t += n), (r = e.next(t));
  return t >= Es ? 1 / 0 : t;
}
function sv(e, t = 100, n) {
  const r = n({ ...e, keyframes: [0, t] }),
    i = Math.min(pu(r), Es);
  return {
    type: "keyframes",
    ease: (s) => r.next(i * s).value / t,
    duration: be(i),
  };
}
const ov = 5;
function zh(e, t, n) {
  const r = Math.max(t - ov, 0);
  return vh(n - e(r), t - r);
}
const X = {
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    duration: 800,
    bounce: 0.3,
    visualDuration: 0.3,
    restSpeed: { granular: 0.01, default: 2 },
    restDelta: { granular: 0.005, default: 0.5 },
    minDuration: 0.01,
    maxDuration: 10,
    minDamping: 0.05,
    maxDamping: 1,
  },
  Do = 0.001;
function av({
  duration: e = X.duration,
  bounce: t = X.bounce,
  velocity: n = X.velocity,
  mass: r = X.mass,
}) {
  let i,
    s,
    o = 1 - t;
  (o = mt(X.minDamping, X.maxDamping, o)),
    (e = mt(X.minDuration, X.maxDuration, be(e))),
    o < 1
      ? ((i = (u) => {
          const c = u * o,
            f = c * e,
            d = c - n,
            g = Fa(u, o),
            x = Math.exp(-f);
          return Do - (d / g) * x;
        }),
        (s = (u) => {
          const f = u * o * e,
            d = f * n + n,
            g = Math.pow(o, 2) * Math.pow(u, 2) * e,
            x = Math.exp(-f),
            y = Fa(Math.pow(u, 2), o);
          return ((-i(u) + Do > 0 ? -1 : 1) * ((d - g) * x)) / y;
        }))
      : ((i = (u) => {
          const c = Math.exp(-u * e),
            f = (u - n) * e + 1;
          return -Do + c * f;
        }),
        (s = (u) => {
          const c = Math.exp(-u * e),
            f = (n - u) * (e * e);
          return c * f;
        }));
  const a = 5 / e,
    l = uv(i, s, a);
  if (((e = it(e)), isNaN(l)))
    return { stiffness: X.stiffness, damping: X.damping, duration: e };
  {
    const u = Math.pow(l, 2) * r;
    return { stiffness: u, damping: o * 2 * Math.sqrt(r * u), duration: e };
  }
}
const lv = 12;
function uv(e, t, n) {
  let r = n;
  for (let i = 1; i < lv; i++) r = r - e(r) / t(r);
  return r;
}
function Fa(e, t) {
  return e * Math.sqrt(1 - t * t);
}
const cv = ["duration", "bounce"],
  fv = ["stiffness", "damping", "mass"];
function Wc(e, t) {
  return t.some((n) => e[n] !== void 0);
}
function dv(e) {
  let t = {
    velocity: X.velocity,
    stiffness: X.stiffness,
    damping: X.damping,
    mass: X.mass,
    isResolvedFromDuration: !1,
    ...e,
  };
  if (!Wc(e, fv) && Wc(e, cv))
    if (e.visualDuration) {
      const n = e.visualDuration,
        r = (2 * Math.PI) / (n * 1.2),
        i = r * r,
        s = 2 * mt(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(i);
      t = { ...t, mass: X.mass, stiffness: i, damping: s };
    } else {
      const n = av(e);
      (t = { ...t, ...n, mass: X.mass }), (t.isResolvedFromDuration = !0);
    }
  return t;
}
function Ps(e = X.visualDuration, t = X.bounce) {
  const n =
    typeof e != "object"
      ? { visualDuration: e, keyframes: [0, 1], bounce: t }
      : e;
  let { restSpeed: r, restDelta: i } = n;
  const s = n.keyframes[0],
    o = n.keyframes[n.keyframes.length - 1],
    a = { done: !1, value: s },
    {
      stiffness: l,
      damping: u,
      mass: c,
      duration: f,
      velocity: d,
      isResolvedFromDuration: g,
    } = dv({ ...n, velocity: -be(n.velocity || 0) }),
    x = d || 0,
    y = u / (2 * Math.sqrt(l * c)),
    E = o - s,
    m = be(Math.sqrt(l / c)),
    p = Math.abs(E) < 5;
  r || (r = p ? X.restSpeed.granular : X.restSpeed.default),
    i || (i = p ? X.restDelta.granular : X.restDelta.default);
  let h;
  if (y < 1) {
    const w = Fa(m, y);
    h = (k) => {
      const P = Math.exp(-y * m * k);
      return (
        o - P * (((x + y * m * E) / w) * Math.sin(w * k) + E * Math.cos(w * k))
      );
    };
  } else if (y === 1) h = (w) => o - Math.exp(-m * w) * (E + (x + m * E) * w);
  else {
    const w = m * Math.sqrt(y * y - 1);
    h = (k) => {
      const P = Math.exp(-y * m * k),
        C = Math.min(w * k, 300);
      return (
        o - (P * ((x + y * m * E) * Math.sinh(C) + w * E * Math.cosh(C))) / w
      );
    };
  }
  const v = {
    calculatedDuration: (g && f) || null,
    next: (w) => {
      const k = h(w);
      if (g) a.done = w >= f;
      else {
        let P = w === 0 ? x : 0;
        y < 1 && (P = w === 0 ? it(x) : zh(h, w, k));
        const C = Math.abs(P) <= r,
          V = Math.abs(o - k) <= i;
        a.done = C && V;
      }
      return (a.value = a.done ? o : k), a;
    },
    toString: () => {
      const w = Math.min(pu(v), Es),
        k = Fh((P) => v.next(w * P).value, w, 30);
      return w + "ms " + k;
    },
    toTransition: () => {},
  };
  return v;
}
Ps.applyToOptions = (e) => {
  const t = sv(e, 100, Ps);
  return (
    (e.ease = t.ease), (e.duration = it(t.duration)), (e.type = "keyframes"), e
  );
};
function za({
  keyframes: e,
  velocity: t = 0,
  power: n = 0.8,
  timeConstant: r = 325,
  bounceDamping: i = 10,
  bounceStiffness: s = 500,
  modifyTarget: o,
  min: a,
  max: l,
  restDelta: u = 0.5,
  restSpeed: c,
}) {
  const f = e[0],
    d = { done: !1, value: f },
    g = (C) => (a !== void 0 && C < a) || (l !== void 0 && C > l),
    x = (C) =>
      a === void 0
        ? l
        : l === void 0 || Math.abs(a - C) < Math.abs(l - C)
        ? a
        : l;
  let y = n * t;
  const E = f + y,
    m = o === void 0 ? E : o(E);
  m !== E && (y = m - f);
  const p = (C) => -y * Math.exp(-C / r),
    h = (C) => m + p(C),
    v = (C) => {
      const V = p(C),
        A = h(C);
      (d.done = Math.abs(V) <= u), (d.value = d.done ? m : A);
    };
  let w, k;
  const P = (C) => {
    g(d.value) &&
      ((w = C),
      (k = Ps({
        keyframes: [d.value, x(d.value)],
        velocity: zh(h, C, d.value),
        damping: i,
        stiffness: s,
        restDelta: u,
        restSpeed: c,
      })));
  };
  return (
    P(0),
    {
      calculatedDuration: null,
      next: (C) => {
        let V = !1;
        return (
          !k && w === void 0 && ((V = !0), v(C), P(C)),
          w !== void 0 && C >= w ? k.next(C - w) : (!V && v(C), d)
        );
      },
    }
  );
}
function pv(e, t, n) {
  const r = [],
    i = n || gt.mix || Ih,
    s = e.length - 1;
  for (let o = 0; o < s; o++) {
    let a = i(e[o], e[o + 1]);
    if (t) {
      const l = Array.isArray(t) ? t[o] || Ue : t;
      a = oi(l, a);
    }
    r.push(a);
  }
  return r;
}
function bh(e, t, { clamp: n = !0, ease: r, mixer: i } = {}) {
  const s = e.length;
  if ((ru(s === t.length), s === 1)) return () => t[0];
  if (s === 2 && t[0] === t[1]) return () => t[1];
  const o = e[0] === e[1];
  e[0] > e[s - 1] && ((e = [...e].reverse()), (t = [...t].reverse()));
  const a = pv(t, r, i),
    l = a.length,
    u = (c) => {
      if (o && c < e[0]) return t[0];
      let f = 0;
      if (l > 1) for (; f < e.length - 2 && !(c < e[f + 1]); f++);
      const d = Qr(e[f], e[f + 1], c);
      return a[f](d);
    };
  return n ? (c) => u(mt(e[0], e[s - 1], c)) : u;
}
function hv(e, t) {
  const n = e[e.length - 1];
  for (let r = 1; r <= t; r++) {
    const i = Qr(0, t, r);
    e.push(G(n, 1, i));
  }
}
function mv(e) {
  const t = [0];
  return hv(t, e.length - 1), t;
}
function gv(e, t) {
  return e.map((n) => n * t);
}
function yv(e, t) {
  return e.map(() => t || Mh).splice(0, e.length - 1);
}
function Pr({
  duration: e = 300,
  keyframes: t,
  times: n,
  ease: r = "easeInOut",
}) {
  const i = Ny(r) ? r.map(zc) : zc(r),
    s = { done: !1, value: t[0] },
    o = gv(n && n.length === t.length ? n : mv(t), e),
    a = bh(o, t, { ease: Array.isArray(i) ? i : yv(t, i) });
  return {
    calculatedDuration: e,
    next: (l) => ((s.value = a(l)), (s.done = l >= e), s),
  };
}
const vv = (e) => e !== null;
function hu(e, { repeat: t, repeatType: n = "loop" }, r, i = 1) {
  const s = e.filter(vv),
    a = i < 0 || (t && n !== "loop" && t % 2 === 1) ? 0 : s.length - 1;
  return !a || r === void 0 ? s[a] : r;
}
const xv = { decay: za, inertia: za, tween: Pr, keyframes: Pr, spring: Ps };
function Bh(e) {
  typeof e.type == "string" && (e.type = xv[e.type]);
}
class mu {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((t) => {
      this.resolve = t;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  then(t, n) {
    return this.finished.then(t, n);
  }
}
const wv = (e) => e / 100;
class Gs extends mu {
  constructor(t) {
    super(),
      (this.state = "idle"),
      (this.startTime = null),
      (this.isStopped = !1),
      (this.currentTime = 0),
      (this.holdTime = null),
      (this.playbackSpeed = 1),
      (this.stop = () => {
        var r, i;
        const { motionValue: n } = this.options;
        n && n.updatedAt !== Ee.now() && this.tick(Ee.now()),
          (this.isStopped = !0),
          this.state !== "idle" &&
            (this.teardown(),
            (i = (r = this.options).onStop) == null || i.call(r));
      }),
      (this.options = t),
      this.initAnimation(),
      this.play(),
      t.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: t } = this;
    Bh(t);
    const {
      type: n = Pr,
      repeat: r = 0,
      repeatDelay: i = 0,
      repeatType: s,
      velocity: o = 0,
    } = t;
    let { keyframes: a } = t;
    const l = n || Pr;
    l !== Pr &&
      typeof a[0] != "number" &&
      ((this.mixKeyframes = oi(wv, Ih(a[0], a[1]))), (a = [0, 100]));
    const u = l({ ...t, keyframes: a });
    s === "mirror" &&
      (this.mirroredGenerator = l({
        ...t,
        keyframes: [...a].reverse(),
        velocity: -o,
      })),
      u.calculatedDuration === null && (u.calculatedDuration = pu(u));
    const { calculatedDuration: c } = u;
    (this.calculatedDuration = c),
      (this.resolvedDuration = c + i),
      (this.totalDuration = this.resolvedDuration * (r + 1) - i),
      (this.generator = u);
  }
  updateTime(t) {
    const n = Math.round(t - this.startTime) * this.playbackSpeed;
    this.holdTime !== null
      ? (this.currentTime = this.holdTime)
      : (this.currentTime = n);
  }
  tick(t, n = !1) {
    const {
      generator: r,
      totalDuration: i,
      mixKeyframes: s,
      mirroredGenerator: o,
      resolvedDuration: a,
      calculatedDuration: l,
    } = this;
    if (this.startTime === null) return r.next(0);
    const {
      delay: u = 0,
      keyframes: c,
      repeat: f,
      repeatType: d,
      repeatDelay: g,
      type: x,
      onUpdate: y,
      finalKeyframe: E,
    } = this.options;
    this.speed > 0
      ? (this.startTime = Math.min(this.startTime, t))
      : this.speed < 0 &&
        (this.startTime = Math.min(t - i / this.speed, this.startTime)),
      n ? (this.currentTime = t) : this.updateTime(t);
    const m = this.currentTime - u * (this.playbackSpeed >= 0 ? 1 : -1),
      p = this.playbackSpeed >= 0 ? m < 0 : m > i;
    (this.currentTime = Math.max(m, 0)),
      this.state === "finished" &&
        this.holdTime === null &&
        (this.currentTime = i);
    let h = this.currentTime,
      v = r;
    if (f) {
      const C = Math.min(this.currentTime, i) / a;
      let V = Math.floor(C),
        A = C % 1;
      !A && C >= 1 && (A = 1),
        A === 1 && V--,
        (V = Math.min(V, f + 1)),
        !!(V % 2) &&
          (d === "reverse"
            ? ((A = 1 - A), g && (A -= g / a))
            : d === "mirror" && (v = o)),
        (h = mt(0, 1, A) * a);
    }
    const w = p ? { done: !1, value: c[0] } : v.next(h);
    s && (w.value = s(w.value));
    let { done: k } = w;
    !p &&
      l !== null &&
      (k =
        this.playbackSpeed >= 0
          ? this.currentTime >= i
          : this.currentTime <= 0);
    const P =
      this.holdTime === null &&
      (this.state === "finished" || (this.state === "running" && k));
    return (
      P && x !== za && (w.value = hu(c, this.options, E, this.speed)),
      y && y(w.value),
      P && this.finish(),
      w
    );
  }
  then(t, n) {
    return this.finished.then(t, n);
  }
  get duration() {
    return be(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + be(t);
  }
  get time() {
    return be(this.currentTime);
  }
  set time(t) {
    var n;
    (t = it(t)),
      (this.currentTime = t),
      this.startTime === null ||
      this.holdTime !== null ||
      this.playbackSpeed === 0
        ? (this.holdTime = t)
        : this.driver &&
          (this.startTime = this.driver.now() - t / this.playbackSpeed),
      (n = this.driver) == null || n.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    this.updateTime(Ee.now());
    const n = this.playbackSpeed !== t;
    (this.playbackSpeed = t), n && (this.time = be(this.currentTime));
  }
  play() {
    var i, s;
    if (this.isStopped) return;
    const { driver: t = iv, startTime: n } = this.options;
    this.driver || (this.driver = t((o) => this.tick(o))),
      (s = (i = this.options).onPlay) == null || s.call(i);
    const r = this.driver.now();
    this.state === "finished"
      ? (this.updateFinished(), (this.startTime = r))
      : this.holdTime !== null
      ? (this.startTime = r - this.holdTime)
      : this.startTime || (this.startTime = n ?? r),
      this.state === "finished" &&
        this.speed < 0 &&
        (this.startTime += this.calculatedDuration),
      (this.holdTime = null),
      (this.state = "running"),
      this.driver.start();
  }
  pause() {
    (this.state = "paused"),
      this.updateTime(Ee.now()),
      (this.holdTime = this.currentTime);
  }
  complete() {
    this.state !== "running" && this.play(),
      (this.state = "finished"),
      (this.holdTime = null);
  }
  finish() {
    var t, n;
    this.notifyFinished(),
      this.teardown(),
      (this.state = "finished"),
      (n = (t = this.options).onComplete) == null || n.call(t);
  }
  cancel() {
    var t, n;
    (this.holdTime = null),
      (this.startTime = 0),
      this.tick(0),
      this.teardown(),
      (n = (t = this.options).onCancel) == null || n.call(t);
  }
  teardown() {
    (this.state = "idle"),
      this.stopDriver(),
      (this.startTime = this.holdTime = null);
  }
  stopDriver() {
    this.driver && (this.driver.stop(), (this.driver = void 0));
  }
  sample(t) {
    return (this.startTime = 0), this.tick(t, !0);
  }
  attachTimeline(t) {
    var n;
    return (
      this.options.allowFlatten &&
        ((this.options.type = "keyframes"),
        (this.options.ease = "linear"),
        this.initAnimation()),
      (n = this.driver) == null || n.stop(),
      t.observe(this)
    );
  }
}
function Sv(e) {
  for (let t = 1; t < e.length; t++) e[t] ?? (e[t] = e[t - 1]);
}
const tn = (e) => (e * 180) / Math.PI,
  ba = (e) => {
    const t = tn(Math.atan2(e[1], e[0]));
    return Ba(t);
  },
  kv = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
    rotate: ba,
    rotateZ: ba,
    skewX: (e) => tn(Math.atan(e[1])),
    skewY: (e) => tn(Math.atan(e[2])),
    skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2,
  },
  Ba = (e) => ((e = e % 360), e < 0 && (e += 360), e),
  Hc = ba,
  Kc = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]),
  Gc = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]),
  Tv = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX: Kc,
    scaleY: Gc,
    scale: (e) => (Kc(e) + Gc(e)) / 2,
    rotateX: (e) => Ba(tn(Math.atan2(e[6], e[5]))),
    rotateY: (e) => Ba(tn(Math.atan2(-e[2], e[0]))),
    rotateZ: Hc,
    rotate: Hc,
    skewX: (e) => tn(Math.atan(e[4])),
    skewY: (e) => tn(Math.atan(e[1])),
    skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2,
  };
function Ua(e) {
  return e.includes("scale") ? 1 : 0;
}
function $a(e, t) {
  if (!e || e === "none") return Ua(t);
  const n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let r, i;
  if (n) (r = Tv), (i = n);
  else {
    const a = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    (r = kv), (i = a);
  }
  if (!i) return Ua(t);
  const s = r[t],
    o = i[1].split(",").map(Ev);
  return typeof s == "function" ? s(o) : o[s];
}
const Cv = (e, t) => {
  const { transform: n = "none" } = getComputedStyle(e);
  return $a(n, t);
};
function Ev(e) {
  return parseFloat(e.trim());
}
const qn = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
  ],
  er = new Set(qn),
  Qc = (e) => e === Jn || e === j,
  Pv = new Set(["x", "y", "z"]),
  Mv = qn.filter((e) => !Pv.has(e));
function Lv(e) {
  const t = [];
  return (
    Mv.forEach((n) => {
      const r = e.getValue(n);
      r !== void 0 &&
        (t.push([n, r.get()]), r.set(n.startsWith("scale") ? 1 : 0));
    }),
    t
  );
}
const sn = {
  width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0" }) =>
    e.max - e.min - parseFloat(t) - parseFloat(n),
  height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0" }) =>
    e.max - e.min - parseFloat(t) - parseFloat(n),
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  x: (e, { transform: t }) => $a(t, "x"),
  y: (e, { transform: t }) => $a(t, "y"),
};
sn.translateX = sn.x;
sn.translateY = sn.y;
const on = new Set();
let Wa = !1,
  Ha = !1,
  Ka = !1;
function Uh() {
  if (Ha) {
    const e = Array.from(on).filter((r) => r.needsMeasurement),
      t = new Set(e.map((r) => r.element)),
      n = new Map();
    t.forEach((r) => {
      const i = Lv(r);
      i.length && (n.set(r, i), r.render());
    }),
      e.forEach((r) => r.measureInitialState()),
      t.forEach((r) => {
        r.render();
        const i = n.get(r);
        i &&
          i.forEach(([s, o]) => {
            var a;
            (a = r.getValue(s)) == null || a.set(o);
          });
      }),
      e.forEach((r) => r.measureEndState()),
      e.forEach((r) => {
        r.suspendedScrollY !== void 0 && window.scrollTo(0, r.suspendedScrollY);
      });
  }
  (Ha = !1), (Wa = !1), on.forEach((e) => e.complete(Ka)), on.clear();
}
function $h() {
  on.forEach((e) => {
    e.readKeyframes(), e.needsMeasurement && (Ha = !0);
  });
}
function Nv() {
  (Ka = !0), $h(), Uh(), (Ka = !1);
}
class gu {
  constructor(t, n, r, i, s, o = !1) {
    (this.state = "pending"),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.unresolvedKeyframes = [...t]),
      (this.onComplete = n),
      (this.name = r),
      (this.motionValue = i),
      (this.element = s),
      (this.isAsync = o);
  }
  scheduleResolve() {
    (this.state = "scheduled"),
      this.isAsync
        ? (on.add(this), Wa || ((Wa = !0), B.read($h), B.resolveKeyframes(Uh)))
        : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const {
      unresolvedKeyframes: t,
      name: n,
      element: r,
      motionValue: i,
    } = this;
    if (t[0] === null) {
      const s = i == null ? void 0 : i.get(),
        o = t[t.length - 1];
      if (s !== void 0) t[0] = s;
      else if (r && n) {
        const a = r.readValue(n, o);
        a != null && (t[0] = a);
      }
      t[0] === void 0 && (t[0] = o), i && s === void 0 && i.set(t[0]);
    }
    Sv(t);
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete(t = !1) {
    (this.state = "complete"),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t),
      on.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (on.delete(this), (this.state = "pending"));
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const Dv = (e) => e.startsWith("--");
function Av(e, t, n) {
  Dv(t) ? e.style.setProperty(t, n) : (e.style[t] = n);
}
const Rv = iu(() => window.ScrollTimeline !== void 0),
  jv = {};
function Vv(e, t) {
  const n = iu(e);
  return () => jv[t] ?? n();
}
const Wh = Vv(() => {
    try {
      document
        .createElement("div")
        .animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch {
      return !1;
    }
    return !0;
  }, "linearEasing"),
  mr = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`,
  Yc = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: mr([0, 0.65, 0.55, 1]),
    circOut: mr([0.55, 0, 1, 0.45]),
    backIn: mr([0.31, 0.01, 0.66, -0.59]),
    backOut: mr([0.33, 1.53, 0.69, 0.99]),
  };
function Hh(e, t) {
  if (e)
    return typeof e == "function"
      ? Wh()
        ? Fh(e, t)
        : "ease-out"
      : Lh(e)
      ? mr(e)
      : Array.isArray(e)
      ? e.map((n) => Hh(n, t) || Yc.easeOut)
      : Yc[e];
}
function Ov(
  e,
  t,
  n,
  {
    delay: r = 0,
    duration: i = 300,
    repeat: s = 0,
    repeatType: o = "loop",
    ease: a = "easeOut",
    times: l,
  } = {},
  u = void 0
) {
  const c = { [t]: n };
  l && (c.offset = l);
  const f = Hh(a, i);
  Array.isArray(f) && (c.easing = f);
  const d = {
    delay: r,
    duration: i,
    easing: Array.isArray(f) ? "linear" : f,
    fill: "both",
    iterations: s + 1,
    direction: o === "reverse" ? "alternate" : "normal",
  };
  return u && (d.pseudoElement = u), e.animate(c, d);
}
function Kh(e) {
  return typeof e == "function" && "applyToOptions" in e;
}
function _v({ type: e, ...t }) {
  return Kh(e) && Wh()
    ? e.applyToOptions(t)
    : (t.duration ?? (t.duration = 300), t.ease ?? (t.ease = "easeOut"), t);
}
class Iv extends mu {
  constructor(t) {
    if ((super(), (this.finishedTime = null), (this.isStopped = !1), !t))
      return;
    const {
      element: n,
      name: r,
      keyframes: i,
      pseudoElement: s,
      allowFlatten: o = !1,
      finalKeyframe: a,
      onComplete: l,
    } = t;
    (this.isPseudoElement = !!s),
      (this.allowFlatten = o),
      (this.options = t),
      ru(typeof t.type != "string");
    const u = _v(t);
    (this.animation = Ov(n, r, i, u, s)),
      u.autoplay === !1 && this.animation.pause(),
      (this.animation.onfinish = () => {
        if (((this.finishedTime = this.time), !s)) {
          const c = hu(i, this.options, a, this.speed);
          this.updateMotionValue ? this.updateMotionValue(c) : Av(n, r, c),
            this.animation.cancel();
        }
        l == null || l(), this.notifyFinished();
      });
  }
  play() {
    this.isStopped ||
      (this.animation.play(),
      this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    var t, n;
    (n = (t = this.animation).finish) == null || n.call(t);
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {}
  }
  stop() {
    if (this.isStopped) return;
    this.isStopped = !0;
    const { state: t } = this;
    t === "idle" ||
      t === "finished" ||
      (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(),
      this.isPseudoElement || this.cancel());
  }
  commitStyles() {
    var t, n;
    this.isPseudoElement ||
      (n = (t = this.animation).commitStyles) == null ||
      n.call(t);
  }
  get duration() {
    var n, r;
    const t =
      ((r =
        (n = this.animation.effect) == null ? void 0 : n.getComputedTiming) ==
      null
        ? void 0
        : r.call(n).duration) || 0;
    return be(Number(t));
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + be(t);
  }
  get time() {
    return be(Number(this.animation.currentTime) || 0);
  }
  set time(t) {
    (this.finishedTime = null), (this.animation.currentTime = it(t));
  }
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(t) {
    t < 0 && (this.finishedTime = null), (this.animation.playbackRate = t);
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return Number(this.animation.startTime);
  }
  set startTime(t) {
    this.animation.startTime = t;
  }
  attachTimeline({ timeline: t, observe: n }) {
    var r;
    return (
      this.allowFlatten &&
        ((r = this.animation.effect) == null ||
          r.updateTiming({ easing: "linear" })),
      (this.animation.onfinish = null),
      t && Rv() ? ((this.animation.timeline = t), Ue) : n(this)
    );
  }
}
const Gh = { anticipate: Ch, backInOut: Th, circInOut: Ph };
function Fv(e) {
  return e in Gh;
}
function zv(e) {
  typeof e.ease == "string" && Fv(e.ease) && (e.ease = Gh[e.ease]);
}
const Xc = 10;
class bv extends Iv {
  constructor(t) {
    zv(t),
      Bh(t),
      super(t),
      t.startTime && (this.startTime = t.startTime),
      (this.options = t);
  }
  updateMotionValue(t) {
    const {
      motionValue: n,
      onUpdate: r,
      onComplete: i,
      element: s,
      ...o
    } = this.options;
    if (!n) return;
    if (t !== void 0) {
      n.set(t);
      return;
    }
    const a = new Gs({ ...o, autoplay: !1 }),
      l = it(this.finishedTime ?? this.time);
    n.setWithVelocity(a.sample(l - Xc).value, a.sample(l).value, Xc), a.stop();
  }
}
const Zc = (e, t) =>
  t === "zIndex"
    ? !1
    : !!(
        typeof e == "number" ||
        Array.isArray(e) ||
        (typeof e == "string" &&
          (zt.test(e) || e === "0") &&
          !e.startsWith("url("))
      );
function Bv(e) {
  const t = e[0];
  if (e.length === 1) return !0;
  for (let n = 0; n < e.length; n++) if (e[n] !== t) return !0;
}
function Uv(e, t, n, r) {
  const i = e[0];
  if (i === null) return !1;
  if (t === "display" || t === "visibility") return !0;
  const s = e[e.length - 1],
    o = Zc(i, t),
    a = Zc(s, t);
  return !o || !a ? !1 : Bv(e) || ((n === "spring" || Kh(n)) && r);
}
function Ga(e) {
  (e.duration = 0), (e.type = "keyframes");
}
const $v = new Set(["opacity", "clipPath", "filter", "transform"]),
  Wv = iu(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Hv(e) {
  var c;
  const {
    motionValue: t,
    name: n,
    repeatDelay: r,
    repeatType: i,
    damping: s,
    type: o,
  } = e;
  if (
    !(
      ((c = t == null ? void 0 : t.owner) == null
        ? void 0
        : c.current) instanceof HTMLElement
    )
  )
    return !1;
  const { onUpdate: l, transformTemplate: u } = t.owner.getProps();
  return (
    Wv() &&
    n &&
    $v.has(n) &&
    (n !== "transform" || !u) &&
    !l &&
    !r &&
    i !== "mirror" &&
    s !== 0 &&
    o !== "inertia"
  );
}
const Kv = 40;
class Gv extends mu {
  constructor({
    autoplay: t = !0,
    delay: n = 0,
    type: r = "keyframes",
    repeat: i = 0,
    repeatDelay: s = 0,
    repeatType: o = "loop",
    keyframes: a,
    name: l,
    motionValue: u,
    element: c,
    ...f
  }) {
    var x;
    super(),
      (this.stop = () => {
        var y, E;
        this._animation &&
          (this._animation.stop(),
          (y = this.stopTimeline) == null || y.call(this)),
          (E = this.keyframeResolver) == null || E.cancel();
      }),
      (this.createdAt = Ee.now());
    const d = {
        autoplay: t,
        delay: n,
        type: r,
        repeat: i,
        repeatDelay: s,
        repeatType: o,
        name: l,
        motionValue: u,
        element: c,
        ...f,
      },
      g = (c == null ? void 0 : c.KeyframeResolver) || gu;
    (this.keyframeResolver = new g(
      a,
      (y, E, m) => this.onKeyframesResolved(y, E, d, !m),
      l,
      u,
      c
    )),
      (x = this.keyframeResolver) == null || x.scheduleResolve();
  }
  onKeyframesResolved(t, n, r, i) {
    this.keyframeResolver = void 0;
    const {
      name: s,
      type: o,
      velocity: a,
      delay: l,
      isHandoff: u,
      onUpdate: c,
    } = r;
    (this.resolvedAt = Ee.now()),
      Uv(t, s, o, a) ||
        ((gt.instantAnimations || !l) && (c == null || c(hu(t, r, n))),
        (t[0] = t[t.length - 1]),
        Ga(r),
        (r.repeat = 0));
    const d = {
        startTime: i
          ? this.resolvedAt
            ? this.resolvedAt - this.createdAt > Kv
              ? this.resolvedAt
              : this.createdAt
            : this.createdAt
          : void 0,
        finalKeyframe: n,
        ...r,
        keyframes: t,
      },
      g =
        !u && Hv(d)
          ? new bv({ ...d, element: d.motionValue.owner.current })
          : new Gs(d);
    g.finished.then(() => this.notifyFinished()).catch(Ue),
      this.pendingTimeline &&
        ((this.stopTimeline = g.attachTimeline(this.pendingTimeline)),
        (this.pendingTimeline = void 0)),
      (this._animation = g);
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(t, n) {
    return this.finished.finally(t).then(() => {});
  }
  get animation() {
    var t;
    return (
      this._animation ||
        ((t = this.keyframeResolver) == null || t.resume(), Nv()),
      this._animation
    );
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(t) {
    this.animation.time = t;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(t) {
    this.animation.speed = t;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(t) {
    return (
      this._animation
        ? (this.stopTimeline = this.animation.attachTimeline(t))
        : (this.pendingTimeline = t),
      () => this.stop()
    );
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    var t;
    this._animation && this.animation.cancel(),
      (t = this.keyframeResolver) == null || t.cancel();
  }
}
const Qv = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function Yv(e) {
  const t = Qv.exec(e);
  if (!t) return [,];
  const [, n, r, i] = t;
  return [`--${n ?? r}`, i];
}
function Qh(e, t, n = 1) {
  const [r, i] = Yv(e);
  if (!r) return;
  const s = window.getComputedStyle(t).getPropertyValue(r);
  if (s) {
    const o = s.trim();
    return mh(o) ? parseFloat(o) : o;
  }
  return uu(i) ? Qh(i, t, n + 1) : i;
}
function yu(e, t) {
  return (e == null ? void 0 : e[t]) ?? (e == null ? void 0 : e.default) ?? e;
}
const Yh = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    ...qn,
  ]),
  Xv = { test: (e) => e === "auto", parse: (e) => e },
  Xh = (e) => (t) => t.test(e),
  Zh = [Jn, j, st, kt, Uy, By, Xv],
  Jc = (e) => Zh.find(Xh(e));
function Zv(e) {
  return typeof e == "number"
    ? e === 0
    : e !== null
    ? e === "none" || e === "0" || yh(e)
    : !0;
}
const Jv = new Set(["brightness", "contrast", "saturate", "opacity"]);
function qv(e) {
  const [t, n] = e.slice(0, -1).split("(");
  if (t === "drop-shadow") return e;
  const [r] = n.match(cu) || [];
  if (!r) return e;
  const i = n.replace(r, "");
  let s = Jv.has(t) ? 1 : 0;
  return r !== n && (s *= 100), t + "(" + s + i + ")";
}
const e1 = /\b([a-z-]*)\(.*?\)/gu,
  Qa = {
    ...zt,
    getAnimatableNone: (e) => {
      const t = e.match(e1);
      return t ? t.map(qv).join(" ") : e;
    },
  },
  qc = { ...Jn, transform: Math.round },
  t1 = {
    rotate: kt,
    rotateX: kt,
    rotateY: kt,
    rotateZ: kt,
    scale: ji,
    scaleX: ji,
    scaleY: ji,
    scaleZ: ji,
    skew: kt,
    skewX: kt,
    skewY: kt,
    distance: j,
    translateX: j,
    translateY: j,
    translateZ: j,
    x: j,
    y: j,
    z: j,
    perspective: j,
    transformPerspective: j,
    opacity: Yr,
    originX: bc,
    originY: bc,
    originZ: j,
  },
  vu = {
    borderWidth: j,
    borderTopWidth: j,
    borderRightWidth: j,
    borderBottomWidth: j,
    borderLeftWidth: j,
    borderRadius: j,
    radius: j,
    borderTopLeftRadius: j,
    borderTopRightRadius: j,
    borderBottomRightRadius: j,
    borderBottomLeftRadius: j,
    width: j,
    maxWidth: j,
    height: j,
    maxHeight: j,
    top: j,
    right: j,
    bottom: j,
    left: j,
    padding: j,
    paddingTop: j,
    paddingRight: j,
    paddingBottom: j,
    paddingLeft: j,
    margin: j,
    marginTop: j,
    marginRight: j,
    marginBottom: j,
    marginLeft: j,
    backgroundPositionX: j,
    backgroundPositionY: j,
    ...t1,
    zIndex: qc,
    fillOpacity: Yr,
    strokeOpacity: Yr,
    numOctaves: qc,
  },
  n1 = {
    ...vu,
    color: te,
    backgroundColor: te,
    outlineColor: te,
    fill: te,
    stroke: te,
    borderColor: te,
    borderTopColor: te,
    borderRightColor: te,
    borderBottomColor: te,
    borderLeftColor: te,
    filter: Qa,
    WebkitFilter: Qa,
  },
  Jh = (e) => n1[e];
function qh(e, t) {
  let n = Jh(e);
  return (
    n !== Qa && (n = zt), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0
  );
}
const r1 = new Set(["auto", "none", "0"]);
function i1(e, t, n) {
  let r = 0,
    i;
  for (; r < e.length && !i; ) {
    const s = e[r];
    typeof s == "string" && !r1.has(s) && Xr(s).values.length && (i = e[r]),
      r++;
  }
  if (i && n) for (const s of t) e[s] = qh(n, i);
}
class s1 extends gu {
  constructor(t, n, r, i, s) {
    super(t, n, r, i, s, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: n, name: r } = this;
    if (!n || !n.current) return;
    super.readKeyframes();
    for (let l = 0; l < t.length; l++) {
      let u = t[l];
      if (typeof u == "string" && ((u = u.trim()), uu(u))) {
        const c = Qh(u, n.current);
        c !== void 0 && (t[l] = c),
          l === t.length - 1 && (this.finalKeyframe = u);
      }
    }
    if ((this.resolveNoneKeyframes(), !Yh.has(r) || t.length !== 2)) return;
    const [i, s] = t,
      o = Jc(i),
      a = Jc(s);
    if (o !== a)
      if (Qc(o) && Qc(a))
        for (let l = 0; l < t.length; l++) {
          const u = t[l];
          typeof u == "string" && (t[l] = parseFloat(u));
        }
      else sn[r] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: n } = this,
      r = [];
    for (let i = 0; i < t.length; i++) (t[i] === null || Zv(t[i])) && r.push(i);
    r.length && i1(t, r, n);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: n, name: r } = this;
    if (!t || !t.current) return;
    r === "height" && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = sn[r](
        t.measureViewportBox(),
        window.getComputedStyle(t.current)
      )),
      (n[0] = this.measuredOrigin);
    const i = n[n.length - 1];
    i !== void 0 && t.getValue(r, i).jump(i, !1);
  }
  measureEndState() {
    var a;
    const { element: t, name: n, unresolvedKeyframes: r } = this;
    if (!t || !t.current) return;
    const i = t.getValue(n);
    i && i.jump(this.measuredOrigin, !1);
    const s = r.length - 1,
      o = r[s];
    (r[s] = sn[n](t.measureViewportBox(), window.getComputedStyle(t.current))),
      o !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = o),
      (a = this.removedTransforms) != null &&
        a.length &&
        this.removedTransforms.forEach(([l, u]) => {
          t.getValue(l).set(u);
        }),
      this.resolveNoneKeyframes();
  }
}
function o1(e, t, n) {
  if (e instanceof EventTarget) return [e];
  if (typeof e == "string") {
    let r = document;
    const i = (n == null ? void 0 : n[e]) ?? r.querySelectorAll(e);
    return i ? Array.from(i) : [];
  }
  return Array.from(e);
}
const em = (e, t) => (t && typeof e == "number" ? t.transform(e) : e);
function tm(e) {
  return gh(e) && "offsetHeight" in e;
}
const ef = 30,
  a1 = (e) => !isNaN(parseFloat(e)),
  Mr = { current: void 0 };
class l1 {
  constructor(t, n = {}) {
    (this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (r) => {
        var s;
        const i = Ee.now();
        if (
          (this.updatedAt !== i && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(r),
          this.current !== this.prev &&
            ((s = this.events.change) == null || s.notify(this.current),
            this.dependents))
        )
          for (const o of this.dependents) o.dirty();
      }),
      (this.hasAnimated = !1),
      this.setCurrent(t),
      (this.owner = n.owner);
  }
  setCurrent(t) {
    (this.current = t),
      (this.updatedAt = Ee.now()),
      this.canTrackVelocity === null &&
        t !== void 0 &&
        (this.canTrackVelocity = a1(this.current));
  }
  setPrevFrameValue(t = this.current) {
    (this.prevFrameValue = t), (this.prevUpdatedAt = this.updatedAt);
  }
  onChange(t) {
    return this.on("change", t);
  }
  on(t, n) {
    this.events[t] || (this.events[t] = new su());
    const r = this.events[t].add(n);
    return t === "change"
      ? () => {
          r(),
            B.read(() => {
              this.events.change.getSize() || this.stop();
            });
        }
      : r;
  }
  clearListeners() {
    for (const t in this.events) this.events[t].clear();
  }
  attach(t, n) {
    (this.passiveEffect = t), (this.stopPassiveEffect = n);
  }
  set(t) {
    this.passiveEffect
      ? this.passiveEffect(t, this.updateAndNotify)
      : this.updateAndNotify(t);
  }
  setWithVelocity(t, n, r) {
    this.set(n),
      (this.prev = void 0),
      (this.prevFrameValue = t),
      (this.prevUpdatedAt = this.updatedAt - r);
  }
  jump(t, n = !0) {
    this.updateAndNotify(t),
      (this.prev = t),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      n && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    var t;
    (t = this.events.change) == null || t.notify(this.current);
  }
  addDependent(t) {
    this.dependents || (this.dependents = new Set()), this.dependents.add(t);
  }
  removeDependent(t) {
    this.dependents && this.dependents.delete(t);
  }
  get() {
    return Mr.current && Mr.current.push(this), this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    const t = Ee.now();
    if (
      !this.canTrackVelocity ||
      this.prevFrameValue === void 0 ||
      t - this.updatedAt > ef
    )
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, ef);
    return vh(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  start(t) {
    return (
      this.stop(),
      new Promise((n) => {
        (this.hasAnimated = !0),
          (this.animation = t(n)),
          this.events.animationStart && this.events.animationStart.notify();
      }).then(() => {
        this.events.animationComplete && this.events.animationComplete.notify(),
          this.clearAnimation();
      })
    );
  }
  stop() {
    this.animation &&
      (this.animation.stop(),
      this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation();
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    var t, n;
    (t = this.dependents) == null || t.clear(),
      (n = this.events.destroy) == null || n.notify(),
      this.clearListeners(),
      this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function dn(e, t) {
  return new l1(e, t);
}
const { schedule: xu } = Nh(queueMicrotask, !1),
  Ke = { x: !1, y: !1 };
function nm() {
  return Ke.x || Ke.y;
}
function u1(e) {
  return e === "x" || e === "y"
    ? Ke[e]
      ? null
      : ((Ke[e] = !0),
        () => {
          Ke[e] = !1;
        })
    : Ke.x || Ke.y
    ? null
    : ((Ke.x = Ke.y = !0),
      () => {
        Ke.x = Ke.y = !1;
      });
}
function rm(e, t) {
  const n = o1(e),
    r = new AbortController(),
    i = { passive: !0, ...t, signal: r.signal };
  return [n, i, () => r.abort()];
}
function tf(e) {
  return !(e.pointerType === "touch" || nm());
}
function c1(e, t, n = {}) {
  const [r, i, s] = rm(e, n),
    o = (a) => {
      if (!tf(a)) return;
      const { target: l } = a,
        u = t(l, a);
      if (typeof u != "function" || !l) return;
      const c = (f) => {
        tf(f) && (u(f), l.removeEventListener("pointerleave", c));
      };
      l.addEventListener("pointerleave", c, i);
    };
  return (
    r.forEach((a) => {
      a.addEventListener("pointerenter", o, i);
    }),
    s
  );
}
const im = (e, t) => (t ? (e === t ? !0 : im(e, t.parentElement)) : !1),
  wu = (e) =>
    e.pointerType === "mouse"
      ? typeof e.button != "number" || e.button <= 0
      : e.isPrimary !== !1,
  f1 = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);
function d1(e) {
  return f1.has(e.tagName) || e.tabIndex !== -1;
}
const Zi = new WeakSet();
function nf(e) {
  return (t) => {
    t.key === "Enter" && e(t);
  };
}
function Ao(e, t) {
  e.dispatchEvent(
    new PointerEvent("pointer" + t, { isPrimary: !0, bubbles: !0 })
  );
}
const p1 = (e, t) => {
  const n = e.currentTarget;
  if (!n) return;
  const r = nf(() => {
    if (Zi.has(n)) return;
    Ao(n, "down");
    const i = nf(() => {
        Ao(n, "up");
      }),
      s = () => Ao(n, "cancel");
    n.addEventListener("keyup", i, t), n.addEventListener("blur", s, t);
  });
  n.addEventListener("keydown", r, t),
    n.addEventListener("blur", () => n.removeEventListener("keydown", r), t);
};
function rf(e) {
  return wu(e) && !nm();
}
function h1(e, t, n = {}) {
  const [r, i, s] = rm(e, n),
    o = (a) => {
      const l = a.currentTarget;
      if (!rf(a)) return;
      Zi.add(l);
      const u = t(l, a),
        c = (g, x) => {
          window.removeEventListener("pointerup", f),
            window.removeEventListener("pointercancel", d),
            Zi.has(l) && Zi.delete(l),
            rf(g) && typeof u == "function" && u(g, { success: x });
        },
        f = (g) => {
          c(
            g,
            l === window ||
              l === document ||
              n.useGlobalTarget ||
              im(l, g.target)
          );
        },
        d = (g) => {
          c(g, !1);
        };
      window.addEventListener("pointerup", f, i),
        window.addEventListener("pointercancel", d, i);
    };
  return (
    r.forEach((a) => {
      (n.useGlobalTarget ? window : a).addEventListener("pointerdown", o, i),
        tm(a) &&
          (a.addEventListener("focus", (u) => p1(u, i)),
          !d1(a) && !a.hasAttribute("tabindex") && (a.tabIndex = 0));
    }),
    s
  );
}
function sm(e) {
  return gh(e) && "ownerSVGElement" in e;
}
function m1(e) {
  return sm(e) && e.tagName === "svg";
}
function g1(...e) {
  const t = !Array.isArray(e[0]),
    n = t ? 0 : -1,
    r = e[0 + n],
    i = e[1 + n],
    s = e[2 + n],
    o = e[3 + n],
    a = bh(i, s, o);
  return t ? a(r) : a;
}
const ae = (e) => !!(e && e.getVelocity);
function y1(e, t, n) {
  const r = e.get();
  let i = null,
    s = r,
    o;
  const a = typeof r == "string" ? r.replace(/[\d.-]/g, "") : void 0,
    l = () => {
      i && (i.stop(), (i = null));
    },
    u = () => {
      l(),
        (i = new Gs({
          keyframes: [of(e.get()), of(s)],
          velocity: e.getVelocity(),
          type: "spring",
          restDelta: 0.001,
          restSpeed: 0.01,
          ...n,
          onUpdate: o,
        }));
    };
  if (
    (e.attach((c, f) => {
      (s = c), (o = (d) => f(sf(d, a))), B.postRender(u);
    }, l),
    ae(t))
  ) {
    const c = t.on("change", (d) => e.set(sf(d, a))),
      f = e.on("destroy", c);
    return () => {
      c(), f();
    };
  }
  return l;
}
function sf(e, t) {
  return t ? e + t : e;
}
function of(e) {
  return typeof e == "number" ? e : parseFloat(e);
}
const v1 = [...Zh, te, zt],
  x1 = (e) => v1.find(Xh(e)),
  ui = T.createContext({
    transformPagePoint: (e) => e,
    isStatic: !1,
    reducedMotion: "never",
  });
function af(e, t) {
  if (typeof e == "function") return e(t);
  e != null && (e.current = t);
}
function w1(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((i) => {
      const s = af(i, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let i = 0; i < r.length; i++) {
          const s = r[i];
          typeof s == "function" ? s() : af(e[i], null);
        }
      };
  };
}
function S1(...e) {
  return T.useCallback(w1(...e), e);
}
class k1 extends T.Component {
  getSnapshotBeforeUpdate(t) {
    const n = this.props.childRef.current;
    if (n && t.isPresent && !this.props.isPresent) {
      const r = n.offsetParent,
        i = (tm(r) && r.offsetWidth) || 0,
        s = this.props.sizeRef.current;
      (s.height = n.offsetHeight || 0),
        (s.width = n.offsetWidth || 0),
        (s.top = n.offsetTop),
        (s.left = n.offsetLeft),
        (s.right = i - s.width - s.left);
    }
    return null;
  }
  componentDidUpdate() {}
  render() {
    return this.props.children;
  }
}
function T1({ children: e, isPresent: t, anchorX: n, root: r }) {
  const i = T.useId(),
    s = T.useRef(null),
    o = T.useRef({ width: 0, height: 0, top: 0, left: 0, right: 0 }),
    { nonce: a } = T.useContext(ui),
    l = S1(s, e == null ? void 0 : e.ref);
  return (
    T.useInsertionEffect(() => {
      const { width: u, height: c, top: f, left: d, right: g } = o.current;
      if (t || !s.current || !u || !c) return;
      const x = n === "left" ? `left: ${d}` : `right: ${g}`;
      s.current.dataset.motionPopId = i;
      const y = document.createElement("style");
      a && (y.nonce = a);
      const E = r ?? document.head;
      return (
        E.appendChild(y),
        y.sheet &&
          y.sheet.insertRule(`
          [data-motion-pop-id="${i}"] {
            position: absolute !important;
            width: ${u}px !important;
            height: ${c}px !important;
            ${x}px !important;
            top: ${f}px !important;
          }
        `),
        () => {
          E.contains(y) && E.removeChild(y);
        }
      );
    }, [t]),
    S.jsx(k1, {
      isPresent: t,
      childRef: s,
      sizeRef: o,
      children: T.cloneElement(e, { ref: l }),
    })
  );
}
const C1 = ({
  children: e,
  initial: t,
  isPresent: n,
  onExitComplete: r,
  custom: i,
  presenceAffectsLayout: s,
  mode: o,
  anchorX: a,
  root: l,
}) => {
  const u = si(E1),
    c = T.useId();
  let f = !0,
    d = T.useMemo(
      () => (
        (f = !1),
        {
          id: c,
          initial: t,
          isPresent: n,
          custom: i,
          onExitComplete: (g) => {
            u.set(g, !0);
            for (const x of u.values()) if (!x) return;
            r && r();
          },
          register: (g) => (u.set(g, !1), () => u.delete(g)),
        }
      ),
      [n, u, r]
    );
  return (
    s && f && (d = { ...d }),
    T.useMemo(() => {
      u.forEach((g, x) => u.set(x, !1));
    }, [n]),
    T.useEffect(() => {
      !n && !u.size && r && r();
    }, [n]),
    o === "popLayout" &&
      (e = S.jsx(T1, { isPresent: n, anchorX: a, root: l, children: e })),
    S.jsx(Ks.Provider, { value: d, children: e })
  );
};
function E1() {
  return new Map();
}
function om(e = !0) {
  const t = T.useContext(Ks);
  if (t === null) return [!0, null];
  const { isPresent: n, onExitComplete: r, register: i } = t,
    s = T.useId();
  T.useEffect(() => {
    if (e) return i(s);
  }, [e]);
  const o = T.useCallback(() => e && r && r(s), [s, r, e]);
  return !n && r ? [!1, o] : [!0];
}
const Vi = (e) => e.key || "";
function lf(e) {
  const t = [];
  return (
    T.Children.forEach(e, (n) => {
      T.isValidElement(n) && t.push(n);
    }),
    t
  );
}
const Ms = ({
    children: e,
    custom: t,
    initial: n = !0,
    onExitComplete: r,
    presenceAffectsLayout: i = !0,
    mode: s = "sync",
    propagate: o = !1,
    anchorX: a = "left",
    root: l,
  }) => {
    const [u, c] = om(o),
      f = T.useMemo(() => lf(e), [e]),
      d = o && !u ? [] : f.map(Vi),
      g = T.useRef(!0),
      x = T.useRef(f),
      y = si(() => new Map()),
      [E, m] = T.useState(f),
      [p, h] = T.useState(f);
    eu(() => {
      (g.current = !1), (x.current = f);
      for (let k = 0; k < p.length; k++) {
        const P = Vi(p[k]);
        d.includes(P) ? y.delete(P) : y.get(P) !== !0 && y.set(P, !1);
      }
    }, [p, d.length, d.join("-")]);
    const v = [];
    if (f !== E) {
      let k = [...f];
      for (let P = 0; P < p.length; P++) {
        const C = p[P],
          V = Vi(C);
        d.includes(V) || (k.splice(P, 0, C), v.push(C));
      }
      return s === "wait" && v.length && (k = v), h(lf(k)), m(f), null;
    }
    const { forceRender: w } = T.useContext(Jl);
    return S.jsx(S.Fragment, {
      children: p.map((k) => {
        const P = Vi(k),
          C = o && !u ? !1 : f === p || d.includes(P),
          V = () => {
            if (y.has(P)) y.set(P, !0);
            else return;
            let A = !0;
            y.forEach((F) => {
              F || (A = !1);
            }),
              A &&
                (w == null || w(),
                h(x.current),
                o && (c == null || c()),
                r && r());
          };
        return S.jsx(
          C1,
          {
            isPresent: C,
            initial: !g.current || n ? void 0 : !1,
            custom: t,
            presenceAffectsLayout: i,
            mode: s,
            root: l,
            onExitComplete: C ? void 0 : V,
            anchorX: a,
            children: k,
          },
          P
        );
      }),
    });
  },
  am = T.createContext({ strict: !1 }),
  uf = {
    animation: [
      "animate",
      "variants",
      "whileHover",
      "whileTap",
      "exit",
      "whileInView",
      "whileFocus",
      "whileDrag",
    ],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"],
  },
  Qn = {};
for (const e in uf) Qn[e] = { isEnabled: (t) => uf[e].some((n) => !!t[n]) };
function P1(e) {
  for (const t in e) Qn[t] = { ...Qn[t], ...e[t] };
}
const M1 = new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport",
]);
function Ls(e) {
  return (
    e.startsWith("while") ||
    (e.startsWith("drag") && e !== "draggable") ||
    e.startsWith("layout") ||
    e.startsWith("onTap") ||
    e.startsWith("onPan") ||
    e.startsWith("onLayout") ||
    M1.has(e)
  );
}
let lm = (e) => !Ls(e);
function L1(e) {
  typeof e == "function" && (lm = (t) => (t.startsWith("on") ? !Ls(t) : e(t)));
}
try {
  L1(require("@emotion/is-prop-valid").default);
} catch {}
function N1(e, t, n) {
  const r = {};
  for (const i in e)
    (i === "values" && typeof e.values == "object") ||
      ((lm(i) ||
        (n === !0 && Ls(i)) ||
        (!t && !Ls(i)) ||
        (e.draggable && i.startsWith("onDrag"))) &&
        (r[i] = e[i]));
  return r;
}
const Qs = T.createContext({});
function Ys(e) {
  return e !== null && typeof e == "object" && typeof e.start == "function";
}
function Zr(e) {
  return typeof e == "string" || Array.isArray(e);
}
const Su = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit",
  ],
  ku = ["initial", ...Su];
function Xs(e) {
  return Ys(e.animate) || ku.some((t) => Zr(e[t]));
}
function um(e) {
  return !!(Xs(e) || e.variants);
}
function D1(e, t) {
  if (Xs(e)) {
    const { initial: n, animate: r } = e;
    return {
      initial: n === !1 || Zr(n) ? n : void 0,
      animate: Zr(r) ? r : void 0,
    };
  }
  return e.inherit !== !1 ? t : {};
}
function A1(e) {
  const { initial: t, animate: n } = D1(e, T.useContext(Qs));
  return T.useMemo(() => ({ initial: t, animate: n }), [cf(t), cf(n)]);
}
function cf(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
const Jr = {};
function R1(e) {
  for (const t in e) (Jr[t] = e[t]), lu(t) && (Jr[t].isCSSVariable = !0);
}
function cm(e, { layout: t, layoutId: n }) {
  return (
    er.has(e) ||
    e.startsWith("origin") ||
    ((t || n !== void 0) && (!!Jr[e] || e === "opacity"))
  );
}
const j1 = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
  },
  V1 = qn.length;
function O1(e, t, n) {
  let r = "",
    i = !0;
  for (let s = 0; s < V1; s++) {
    const o = qn[s],
      a = e[o];
    if (a === void 0) continue;
    let l = !0;
    if (
      (typeof a == "number"
        ? (l = a === (o.startsWith("scale") ? 1 : 0))
        : (l = parseFloat(a) === 0),
      !l || n)
    ) {
      const u = em(a, vu[o]);
      if (!l) {
        i = !1;
        const c = j1[o] || o;
        r += `${c}(${u}) `;
      }
      n && (t[o] = u);
    }
  }
  return (r = r.trim()), n ? (r = n(t, i ? "" : r)) : i && (r = "none"), r;
}
function Tu(e, t, n) {
  const { style: r, vars: i, transformOrigin: s } = e;
  let o = !1,
    a = !1;
  for (const l in t) {
    const u = t[l];
    if (er.has(l)) {
      o = !0;
      continue;
    } else if (lu(l)) {
      i[l] = u;
      continue;
    } else {
      const c = em(u, vu[l]);
      l.startsWith("origin") ? ((a = !0), (s[l] = c)) : (r[l] = c);
    }
  }
  if (
    (t.transform ||
      (o || n
        ? (r.transform = O1(t, e.transform, n))
        : r.transform && (r.transform = "none")),
    a)
  ) {
    const { originX: l = "50%", originY: u = "50%", originZ: c = 0 } = s;
    r.transformOrigin = `${l} ${u} ${c}`;
  }
}
const Cu = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
function fm(e, t, n) {
  for (const r in t) !ae(t[r]) && !cm(r, n) && (e[r] = t[r]);
}
function _1({ transformTemplate: e }, t) {
  return T.useMemo(() => {
    const n = Cu();
    return Tu(n, t, e), Object.assign({}, n.vars, n.style);
  }, [t]);
}
function I1(e, t) {
  const n = e.style || {},
    r = {};
  return fm(r, n, e), Object.assign(r, _1(e, t)), r;
}
function F1(e, t) {
  const n = {},
    r = I1(e, t);
  return (
    e.drag &&
      e.dragListener !== !1 &&
      ((n.draggable = !1),
      (r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = "none"),
      (r.touchAction =
        e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`)),
    e.tabIndex === void 0 &&
      (e.onTap || e.onTapStart || e.whileTap) &&
      (n.tabIndex = 0),
    (n.style = r),
    n
  );
}
const z1 = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
  b1 = { offset: "strokeDashoffset", array: "strokeDasharray" };
function B1(e, t, n = 1, r = 0, i = !0) {
  e.pathLength = 1;
  const s = i ? z1 : b1;
  e[s.offset] = j.transform(-r);
  const o = j.transform(t),
    a = j.transform(n);
  e[s.array] = `${o} ${a}`;
}
function dm(
  e,
  {
    attrX: t,
    attrY: n,
    attrScale: r,
    pathLength: i,
    pathSpacing: s = 1,
    pathOffset: o = 0,
    ...a
  },
  l,
  u,
  c
) {
  if ((Tu(e, a, u), l)) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  (e.attrs = e.style), (e.style = {});
  const { attrs: f, style: d } = e;
  f.transform && ((d.transform = f.transform), delete f.transform),
    (d.transform || f.transformOrigin) &&
      ((d.transformOrigin = f.transformOrigin ?? "50% 50%"),
      delete f.transformOrigin),
    d.transform &&
      ((d.transformBox = (c == null ? void 0 : c.transformBox) ?? "fill-box"),
      delete f.transformBox),
    t !== void 0 && (f.x = t),
    n !== void 0 && (f.y = n),
    r !== void 0 && (f.scale = r),
    i !== void 0 && B1(f, i, s, o, !1);
}
const pm = () => ({ ...Cu(), attrs: {} }),
  hm = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function U1(e, t, n, r) {
  const i = T.useMemo(() => {
    const s = pm();
    return (
      dm(s, t, hm(r), e.transformTemplate, e.style),
      { ...s.attrs, style: { ...s.style } }
    );
  }, [t]);
  if (e.style) {
    const s = {};
    fm(s, e.style, e), (i.style = { ...s, ...i.style });
  }
  return i;
}
const $1 = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view",
];
function Eu(e) {
  return typeof e != "string" || e.includes("-")
    ? !1
    : !!($1.indexOf(e) > -1 || /[A-Z]/u.test(e));
}
function W1(e, t, n, { latestValues: r }, i, s = !1) {
  const a = (Eu(e) ? U1 : F1)(t, r, i, e),
    l = N1(t, typeof e == "string", s),
    u = e !== T.Fragment ? { ...l, ...a, ref: n } : {},
    { children: c } = t,
    f = T.useMemo(() => (ae(c) ? c.get() : c), [c]);
  return T.createElement(e, { ...u, children: f });
}
function ff(e) {
  const t = [{}, {}];
  return (
    e == null ||
      e.values.forEach((n, r) => {
        (t[0][r] = n.get()), (t[1][r] = n.getVelocity());
      }),
    t
  );
}
function Pu(e, t, n, r) {
  if (typeof t == "function") {
    const [i, s] = ff(r);
    t = t(n !== void 0 ? n : e.custom, i, s);
  }
  if (
    (typeof t == "string" && (t = e.variants && e.variants[t]),
    typeof t == "function")
  ) {
    const [i, s] = ff(r);
    t = t(n !== void 0 ? n : e.custom, i, s);
  }
  return t;
}
function Ji(e) {
  return ae(e) ? e.get() : e;
}
function H1({ scrapeMotionValuesFromProps: e, createRenderState: t }, n, r, i) {
  return { latestValues: K1(n, r, i, e), renderState: t() };
}
function K1(e, t, n, r) {
  const i = {},
    s = r(e, {});
  for (const d in s) i[d] = Ji(s[d]);
  let { initial: o, animate: a } = e;
  const l = Xs(e),
    u = um(e);
  t &&
    u &&
    !l &&
    e.inherit !== !1 &&
    (o === void 0 && (o = t.initial), a === void 0 && (a = t.animate));
  let c = n ? n.initial === !1 : !1;
  c = c || o === !1;
  const f = c ? a : o;
  if (f && typeof f != "boolean" && !Ys(f)) {
    const d = Array.isArray(f) ? f : [f];
    for (let g = 0; g < d.length; g++) {
      const x = Pu(e, d[g]);
      if (x) {
        const { transitionEnd: y, transition: E, ...m } = x;
        for (const p in m) {
          let h = m[p];
          if (Array.isArray(h)) {
            const v = c ? h.length - 1 : 0;
            h = h[v];
          }
          h !== null && (i[p] = h);
        }
        for (const p in y) i[p] = y[p];
      }
    }
  }
  return i;
}
const mm = (e) => (t, n) => {
  const r = T.useContext(Qs),
    i = T.useContext(Ks),
    s = () => H1(e, t, r, i);
  return n ? s() : si(s);
};
function Mu(e, t, n) {
  var s;
  const { style: r } = e,
    i = {};
  for (const o in r)
    (ae(r[o]) ||
      (t.style && ae(t.style[o])) ||
      cm(o, e) ||
      ((s = n == null ? void 0 : n.getValue(o)) == null
        ? void 0
        : s.liveStyle) !== void 0) &&
      (i[o] = r[o]);
  return i;
}
const G1 = mm({ scrapeMotionValuesFromProps: Mu, createRenderState: Cu });
function gm(e, t, n) {
  const r = Mu(e, t, n);
  for (const i in e)
    if (ae(e[i]) || ae(t[i])) {
      const s =
        qn.indexOf(i) !== -1
          ? "attr" + i.charAt(0).toUpperCase() + i.substring(1)
          : i;
      r[s] = e[i];
    }
  return r;
}
const Q1 = mm({ scrapeMotionValuesFromProps: gm, createRenderState: pm }),
  Y1 = Symbol.for("motionComponentSymbol");
function Nn(e) {
  return (
    e &&
    typeof e == "object" &&
    Object.prototype.hasOwnProperty.call(e, "current")
  );
}
function X1(e, t, n) {
  return T.useCallback(
    (r) => {
      r && e.onMount && e.onMount(r),
        t && (r ? t.mount(r) : t.unmount()),
        n && (typeof n == "function" ? n(r) : Nn(n) && (n.current = r));
    },
    [t]
  );
}
const Lu = (e) => e.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(),
  Z1 = "framerAppearId",
  ym = "data-" + Lu(Z1),
  vm = T.createContext({});
function J1(e, t, n, r, i) {
  var y, E;
  const { visualElement: s } = T.useContext(Qs),
    o = T.useContext(am),
    a = T.useContext(Ks),
    l = T.useContext(ui).reducedMotion,
    u = T.useRef(null);
  (r = r || o.renderer),
    !u.current &&
      r &&
      (u.current = r(e, {
        visualState: t,
        parent: s,
        props: n,
        presenceContext: a,
        blockInitialAnimation: a ? a.initial === !1 : !1,
        reducedMotionConfig: l,
      }));
  const c = u.current,
    f = T.useContext(vm);
  c &&
    !c.projection &&
    i &&
    (c.type === "html" || c.type === "svg") &&
    q1(u.current, n, i, f);
  const d = T.useRef(!1);
  T.useInsertionEffect(() => {
    c && d.current && c.update(n, a);
  });
  const g = n[ym],
    x = T.useRef(
      !!g &&
        !((y = window.MotionHandoffIsComplete) != null && y.call(window, g)) &&
        ((E = window.MotionHasOptimisedAnimation) == null
          ? void 0
          : E.call(window, g))
    );
  return (
    eu(() => {
      c &&
        ((d.current = !0),
        (window.MotionIsMounted = !0),
        c.updateFeatures(),
        c.scheduleRenderMicrotask(),
        x.current && c.animationState && c.animationState.animateChanges());
    }),
    T.useEffect(() => {
      c &&
        (!x.current && c.animationState && c.animationState.animateChanges(),
        x.current &&
          (queueMicrotask(() => {
            var m;
            (m = window.MotionHandoffMarkAsComplete) == null ||
              m.call(window, g);
          }),
          (x.current = !1)),
        (c.enteringChildren = void 0));
    }),
    c
  );
}
function q1(e, t, n, r) {
  const {
    layoutId: i,
    layout: s,
    drag: o,
    dragConstraints: a,
    layoutScroll: l,
    layoutRoot: u,
    layoutCrossfade: c,
  } = t;
  (e.projection = new n(
    e.latestValues,
    t["data-framer-portal-id"] ? void 0 : xm(e.parent)
  )),
    e.projection.setOptions({
      layoutId: i,
      layout: s,
      alwaysMeasureLayout: !!o || (a && Nn(a)),
      visualElement: e,
      animationType: typeof s == "string" ? s : "both",
      initialPromotionConfig: r,
      crossfade: c,
      layoutScroll: l,
      layoutRoot: u,
    });
}
function xm(e) {
  if (e) return e.options.allowProjection !== !1 ? e.projection : xm(e.parent);
}
function Ro(e, { forwardMotionProps: t = !1 } = {}, n, r) {
  n && P1(n);
  const i = Eu(e) ? Q1 : G1;
  function s(a, l) {
    let u;
    const c = { ...T.useContext(ui), ...a, layoutId: ex(a) },
      { isStatic: f } = c,
      d = A1(a),
      g = i(a, f);
    if (!f && ql) {
      tx();
      const x = nx(c);
      (u = x.MeasureLayout),
        (d.visualElement = J1(e, g, c, r, x.ProjectionNode));
    }
    return S.jsxs(Qs.Provider, {
      value: d,
      children: [
        u && d.visualElement
          ? S.jsx(u, { visualElement: d.visualElement, ...c })
          : null,
        W1(e, a, X1(g, d.visualElement, l), g, f, t),
      ],
    });
  }
  s.displayName = `motion.${
    typeof e == "string" ? e : `create(${e.displayName ?? e.name ?? ""})`
  }`;
  const o = T.forwardRef(s);
  return (o[Y1] = e), o;
}
function ex({ layoutId: e }) {
  const t = T.useContext(Jl).id;
  return t && e !== void 0 ? t + "-" + e : e;
}
function tx(e, t) {
  T.useContext(am).strict;
}
function nx(e) {
  const { drag: t, layout: n } = Qn;
  if (!t && !n) return {};
  const r = { ...t, ...n };
  return {
    MeasureLayout:
      (t != null && t.isEnabled(e)) || (n != null && n.isEnabled(e))
        ? r.MeasureLayout
        : void 0,
    ProjectionNode: r.ProjectionNode,
  };
}
function rx(e, t) {
  if (typeof Proxy > "u") return Ro;
  const n = new Map(),
    r = (s, o) => Ro(s, o, e, t),
    i = (s, o) => r(s, o);
  return new Proxy(i, {
    get: (s, o) =>
      o === "create"
        ? r
        : (n.has(o) || n.set(o, Ro(o, void 0, e, t)), n.get(o)),
  });
}
function wm({ top: e, left: t, right: n, bottom: r }) {
  return { x: { min: t, max: n }, y: { min: e, max: r } };
}
function ix({ x: e, y: t }) {
  return { top: t.min, right: e.max, bottom: t.max, left: e.min };
}
function sx(e, t) {
  if (!t) return e;
  const n = t({ x: e.left, y: e.top }),
    r = t({ x: e.right, y: e.bottom });
  return { top: n.y, left: n.x, bottom: r.y, right: r.x };
}
function jo(e) {
  return e === void 0 || e === 1;
}
function Ya({ scale: e, scaleX: t, scaleY: n }) {
  return !jo(e) || !jo(t) || !jo(n);
}
function Xt(e) {
  return (
    Ya(e) ||
    Sm(e) ||
    e.z ||
    e.rotate ||
    e.rotateX ||
    e.rotateY ||
    e.skewX ||
    e.skewY
  );
}
function Sm(e) {
  return df(e.x) || df(e.y);
}
function df(e) {
  return e && e !== "0%";
}
function Ns(e, t, n) {
  const r = e - n,
    i = t * r;
  return n + i;
}
function pf(e, t, n, r, i) {
  return i !== void 0 && (e = Ns(e, i, r)), Ns(e, n, r) + t;
}
function Xa(e, t = 0, n = 1, r, i) {
  (e.min = pf(e.min, t, n, r, i)), (e.max = pf(e.max, t, n, r, i));
}
function km(e, { x: t, y: n }) {
  Xa(e.x, t.translate, t.scale, t.originPoint),
    Xa(e.y, n.translate, n.scale, n.originPoint);
}
const hf = 0.999999999999,
  mf = 1.0000000000001;
function ox(e, t, n, r = !1) {
  const i = n.length;
  if (!i) return;
  t.x = t.y = 1;
  let s, o;
  for (let a = 0; a < i; a++) {
    (s = n[a]), (o = s.projectionDelta);
    const { visualElement: l } = s.options;
    (l && l.props.style && l.props.style.display === "contents") ||
      (r &&
        s.options.layoutScroll &&
        s.scroll &&
        s !== s.root &&
        An(e, { x: -s.scroll.offset.x, y: -s.scroll.offset.y }),
      o && ((t.x *= o.x.scale), (t.y *= o.y.scale), km(e, o)),
      r && Xt(s.latestValues) && An(e, s.latestValues));
  }
  t.x < mf && t.x > hf && (t.x = 1), t.y < mf && t.y > hf && (t.y = 1);
}
function Dn(e, t) {
  (e.min = e.min + t), (e.max = e.max + t);
}
function gf(e, t, n, r, i = 0.5) {
  const s = G(e.min, e.max, i);
  Xa(e, t, n, s, r);
}
function An(e, t) {
  gf(e.x, t.x, t.scaleX, t.scale, t.originX),
    gf(e.y, t.y, t.scaleY, t.scale, t.originY);
}
function Tm(e, t) {
  return wm(sx(e.getBoundingClientRect(), t));
}
function ax(e, t, n) {
  const r = Tm(e, n),
    { scroll: i } = t;
  return i && (Dn(r.x, i.offset.x), Dn(r.y, i.offset.y)), r;
}
const yf = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  Rn = () => ({ x: yf(), y: yf() }),
  vf = () => ({ min: 0, max: 0 }),
  q = () => ({ x: vf(), y: vf() }),
  Za = { current: null },
  Cm = { current: !1 };
function lx() {
  if (((Cm.current = !0), !!ql))
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-reduced-motion)"),
        t = () => (Za.current = e.matches);
      e.addEventListener("change", t), t();
    } else Za.current = !1;
}
const ux = new WeakMap();
function cx(e, t, n) {
  for (const r in t) {
    const i = t[r],
      s = n[r];
    if (ae(i)) e.addValue(r, i);
    else if (ae(s)) e.addValue(r, dn(i, { owner: e }));
    else if (s !== i)
      if (e.hasValue(r)) {
        const o = e.getValue(r);
        o.liveStyle === !0 ? o.jump(i) : o.hasAnimated || o.set(i);
      } else {
        const o = e.getStaticValue(r);
        e.addValue(r, dn(o !== void 0 ? o : i, { owner: e }));
      }
  }
  for (const r in n) t[r] === void 0 && e.removeValue(r);
  return t;
}
const xf = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete",
];
class fx {
  scrapeMotionValuesFromProps(t, n, r) {
    return {};
  }
  constructor(
    {
      parent: t,
      props: n,
      presenceContext: r,
      reducedMotionConfig: i,
      blockInitialAnimation: s,
      visualState: o,
    },
    a = {}
  ) {
    (this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.KeyframeResolver = gu),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(),
          this.renderInstance(
            this.current,
            this.renderState,
            this.props.style,
            this.projection
          ));
      }),
      (this.renderScheduledAt = 0),
      (this.scheduleRender = () => {
        const d = Ee.now();
        this.renderScheduledAt < d &&
          ((this.renderScheduledAt = d), B.render(this.render, !1, !0));
      });
    const { latestValues: l, renderState: u } = o;
    (this.latestValues = l),
      (this.baseTarget = { ...l }),
      (this.initialValues = n.initial ? { ...l } : {}),
      (this.renderState = u),
      (this.parent = t),
      (this.props = n),
      (this.presenceContext = r),
      (this.depth = t ? t.depth + 1 : 0),
      (this.reducedMotionConfig = i),
      (this.options = a),
      (this.blockInitialAnimation = !!s),
      (this.isControllingVariants = Xs(n)),
      (this.isVariantNode = um(n)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(t && t.current));
    const { willChange: c, ...f } = this.scrapeMotionValuesFromProps(
      n,
      {},
      this
    );
    for (const d in f) {
      const g = f[d];
      l[d] !== void 0 && ae(g) && g.set(l[d]);
    }
  }
  mount(t) {
    var n;
    (this.current = t),
      ux.set(t, this),
      this.projection && !this.projection.instance && this.projection.mount(t),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((r, i) => this.bindToMotionValue(i, r)),
      Cm.current || lx(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === "never"
          ? !1
          : this.reducedMotionConfig === "always"
          ? !0
          : Za.current),
      (n = this.parent) == null || n.addChild(this),
      this.update(this.props, this.presenceContext);
  }
  unmount() {
    var t;
    this.projection && this.projection.unmount(),
      yt(this.notifyUpdate),
      yt(this.render),
      this.valueSubscriptions.forEach((n) => n()),
      this.valueSubscriptions.clear(),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      (t = this.parent) == null || t.removeChild(this);
    for (const n in this.events) this.events[n].clear();
    for (const n in this.features) {
      const r = this.features[n];
      r && (r.unmount(), (r.isMounted = !1));
    }
    this.current = null;
  }
  addChild(t) {
    this.children.add(t),
      this.enteringChildren ?? (this.enteringChildren = new Set()),
      this.enteringChildren.add(t);
  }
  removeChild(t) {
    this.children.delete(t),
      this.enteringChildren && this.enteringChildren.delete(t);
  }
  bindToMotionValue(t, n) {
    this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)();
    const r = er.has(t);
    r && this.onBindTransform && this.onBindTransform();
    const i = n.on("change", (o) => {
      (this.latestValues[t] = o),
        this.props.onUpdate && B.preRender(this.notifyUpdate),
        r && this.projection && (this.projection.isTransformDirty = !0),
        this.scheduleRender();
    });
    let s;
    window.MotionCheckAppearSync &&
      (s = window.MotionCheckAppearSync(this, t, n)),
      this.valueSubscriptions.set(t, () => {
        i(), s && s(), n.owner && n.stop();
      });
  }
  sortNodePosition(t) {
    return !this.current ||
      !this.sortInstanceNodePosition ||
      this.type !== t.type
      ? 0
      : this.sortInstanceNodePosition(this.current, t.current);
  }
  updateFeatures() {
    let t = "animation";
    for (t in Qn) {
      const n = Qn[t];
      if (!n) continue;
      const { isEnabled: r, Feature: i } = n;
      if (
        (!this.features[t] &&
          i &&
          r(this.props) &&
          (this.features[t] = new i(this)),
        this.features[t])
      ) {
        const s = this.features[t];
        s.isMounted ? s.update() : (s.mount(), (s.isMounted = !0));
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  measureViewportBox() {
    return this.current
      ? this.measureInstanceViewportBox(this.current, this.props)
      : q();
  }
  getStaticValue(t) {
    return this.latestValues[t];
  }
  setStaticValue(t, n) {
    this.latestValues[t] = n;
  }
  update(t, n) {
    (t.transformTemplate || this.props.transformTemplate) &&
      this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = t),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = n);
    for (let r = 0; r < xf.length; r++) {
      const i = xf[r];
      this.propEventSubscriptions[i] &&
        (this.propEventSubscriptions[i](),
        delete this.propEventSubscriptions[i]);
      const s = "on" + i,
        o = t[s];
      o && (this.propEventSubscriptions[i] = this.on(i, o));
    }
    (this.prevMotionValues = cx(
      this,
      this.scrapeMotionValuesFromProps(t, this.prevProps, this),
      this.prevMotionValues
    )),
      this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  getVariant(t) {
    return this.props.variants ? this.props.variants[t] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode
      ? this
      : this.parent
      ? this.parent.getClosestVariantNode()
      : void 0;
  }
  addVariantChild(t) {
    const n = this.getClosestVariantNode();
    if (n)
      return (
        n.variantChildren && n.variantChildren.add(t),
        () => n.variantChildren.delete(t)
      );
  }
  addValue(t, n) {
    const r = this.values.get(t);
    n !== r &&
      (r && this.removeValue(t),
      this.bindToMotionValue(t, n),
      this.values.set(t, n),
      (this.latestValues[t] = n.get()));
  }
  removeValue(t) {
    this.values.delete(t);
    const n = this.valueSubscriptions.get(t);
    n && (n(), this.valueSubscriptions.delete(t)),
      delete this.latestValues[t],
      this.removeValueFromRenderState(t, this.renderState);
  }
  hasValue(t) {
    return this.values.has(t);
  }
  getValue(t, n) {
    if (this.props.values && this.props.values[t]) return this.props.values[t];
    let r = this.values.get(t);
    return (
      r === void 0 &&
        n !== void 0 &&
        ((r = dn(n === null ? void 0 : n, { owner: this })),
        this.addValue(t, r)),
      r
    );
  }
  readValue(t, n) {
    let r =
      this.latestValues[t] !== void 0 || !this.current
        ? this.latestValues[t]
        : this.getBaseTargetFromProps(this.props, t) ??
          this.readValueFromInstance(this.current, t, this.options);
    return (
      r != null &&
        (typeof r == "string" && (mh(r) || yh(r))
          ? (r = parseFloat(r))
          : !x1(r) && zt.test(n) && (r = qh(t, n)),
        this.setBaseTarget(t, ae(r) ? r.get() : r)),
      ae(r) ? r.get() : r
    );
  }
  setBaseTarget(t, n) {
    this.baseTarget[t] = n;
  }
  getBaseTarget(t) {
    var s;
    const { initial: n } = this.props;
    let r;
    if (typeof n == "string" || typeof n == "object") {
      const o = Pu(
        this.props,
        n,
        (s = this.presenceContext) == null ? void 0 : s.custom
      );
      o && (r = o[t]);
    }
    if (n && r !== void 0) return r;
    const i = this.getBaseTargetFromProps(this.props, t);
    return i !== void 0 && !ae(i)
      ? i
      : this.initialValues[t] !== void 0 && r === void 0
      ? void 0
      : this.baseTarget[t];
  }
  on(t, n) {
    return this.events[t] || (this.events[t] = new su()), this.events[t].add(n);
  }
  notify(t, ...n) {
    this.events[t] && this.events[t].notify(...n);
  }
  scheduleRenderMicrotask() {
    xu.render(this.render);
  }
}
class Em extends fx {
  constructor() {
    super(...arguments), (this.KeyframeResolver = s1);
  }
  sortInstanceNodePosition(t, n) {
    return t.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(t, n) {
    return t.style ? t.style[n] : void 0;
  }
  removeValueFromRenderState(t, { vars: n, style: r }) {
    delete n[t], delete r[t];
  }
  handleChildMotionValue() {
    this.childSubscription &&
      (this.childSubscription(), delete this.childSubscription);
    const { children: t } = this.props;
    ae(t) &&
      (this.childSubscription = t.on("change", (n) => {
        this.current && (this.current.textContent = `${n}`);
      }));
  }
}
function Pm(e, { style: t, vars: n }, r, i) {
  const s = e.style;
  let o;
  for (o in t) s[o] = t[o];
  i == null || i.applyProjectionStyles(s, r);
  for (o in n) s.setProperty(o, n[o]);
}
function dx(e) {
  return window.getComputedStyle(e);
}
class px extends Em {
  constructor() {
    super(...arguments), (this.type = "html"), (this.renderInstance = Pm);
  }
  readValueFromInstance(t, n) {
    var r;
    if (er.has(n))
      return (r = this.projection) != null && r.isProjecting ? Ua(n) : Cv(t, n);
    {
      const i = dx(t),
        s = (lu(n) ? i.getPropertyValue(n) : i[n]) || 0;
      return typeof s == "string" ? s.trim() : s;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: n }) {
    return Tm(t, n);
  }
  build(t, n, r) {
    Tu(t, n, r.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, n, r) {
    return Mu(t, n, r);
  }
}
const Mm = new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust",
]);
function hx(e, t, n, r) {
  Pm(e, t, void 0, r);
  for (const i in t.attrs) e.setAttribute(Mm.has(i) ? i : Lu(i), t.attrs[i]);
}
class mx extends Em {
  constructor() {
    super(...arguments),
      (this.type = "svg"),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = q);
  }
  getBaseTargetFromProps(t, n) {
    return t[n];
  }
  readValueFromInstance(t, n) {
    if (er.has(n)) {
      const r = Jh(n);
      return (r && r.default) || 0;
    }
    return (n = Mm.has(n) ? n : Lu(n)), t.getAttribute(n);
  }
  scrapeMotionValuesFromProps(t, n, r) {
    return gm(t, n, r);
  }
  build(t, n, r) {
    dm(t, n, this.isSVGTag, r.transformTemplate, r.style);
  }
  renderInstance(t, n, r, i) {
    hx(t, n, r, i);
  }
  mount(t) {
    (this.isSVGTag = hm(t.tagName)), super.mount(t);
  }
}
const gx = (e, t) =>
  Eu(e) ? new mx(t) : new px(t, { allowProjection: e !== T.Fragment });
function bn(e, t, n) {
  const r = e.getProps();
  return Pu(r, t, n !== void 0 ? n : r.custom, e);
}
const Ja = (e) => Array.isArray(e);
function yx(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, dn(n));
}
function vx(e) {
  return Ja(e) ? e[e.length - 1] || 0 : e;
}
function xx(e, t) {
  const n = bn(e, t);
  let { transitionEnd: r = {}, transition: i = {}, ...s } = n || {};
  s = { ...s, ...r };
  for (const o in s) {
    const a = vx(s[o]);
    yx(e, o, a);
  }
}
function wx(e) {
  return !!(ae(e) && e.add);
}
function qa(e, t) {
  const n = e.getValue("willChange");
  if (wx(n)) return n.add(t);
  if (!n && gt.WillChange) {
    const r = new gt.WillChange("auto");
    e.addValue("willChange", r), r.add(t);
  }
}
function Lm(e) {
  return e.props[ym];
}
const Sx = (e) => e !== null;
function kx(e, { repeat: t, repeatType: n = "loop" }, r) {
  const i = e.filter(Sx),
    s = t && n !== "loop" && t % 2 === 1 ? 0 : i.length - 1;
  return i[s];
}
const Tx = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
  Cx = (e) => ({
    type: "spring",
    stiffness: 550,
    damping: e === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  Ex = { type: "keyframes", duration: 0.8 },
  Px = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  Mx = (e, { keyframes: t }) =>
    t.length > 2
      ? Ex
      : er.has(e)
      ? e.startsWith("scale")
        ? Cx(t[1])
        : Tx
      : Px;
function Lx({
  when: e,
  delay: t,
  delayChildren: n,
  staggerChildren: r,
  staggerDirection: i,
  repeat: s,
  repeatType: o,
  repeatDelay: a,
  from: l,
  elapsed: u,
  ...c
}) {
  return !!Object.keys(c).length;
}
const Nu =
  (e, t, n, r = {}, i, s) =>
  (o) => {
    const a = yu(r, e) || {},
      l = a.delay || r.delay || 0;
    let { elapsed: u = 0 } = r;
    u = u - it(l);
    const c = {
      keyframes: Array.isArray(n) ? n : [null, n],
      ease: "easeOut",
      velocity: t.getVelocity(),
      ...a,
      delay: -u,
      onUpdate: (d) => {
        t.set(d), a.onUpdate && a.onUpdate(d);
      },
      onComplete: () => {
        o(), a.onComplete && a.onComplete();
      },
      name: e,
      motionValue: t,
      element: s ? void 0 : i,
    };
    Lx(a) || Object.assign(c, Mx(e, c)),
      c.duration && (c.duration = it(c.duration)),
      c.repeatDelay && (c.repeatDelay = it(c.repeatDelay)),
      c.from !== void 0 && (c.keyframes[0] = c.from);
    let f = !1;
    if (
      ((c.type === !1 || (c.duration === 0 && !c.repeatDelay)) &&
        (Ga(c), c.delay === 0 && (f = !0)),
      (gt.instantAnimations || gt.skipAnimations) &&
        ((f = !0), Ga(c), (c.delay = 0)),
      (c.allowFlatten = !a.type && !a.ease),
      f && !s && t.get() !== void 0)
    ) {
      const d = kx(c.keyframes, a);
      if (d !== void 0) {
        B.update(() => {
          c.onUpdate(d), c.onComplete();
        });
        return;
      }
    }
    return a.isSync ? new Gs(c) : new Gv(c);
  };
function Nx({ protectedKeys: e, needsAnimating: t }, n) {
  const r = e.hasOwnProperty(n) && t[n] !== !0;
  return (t[n] = !1), r;
}
function Nm(e, t, { delay: n = 0, transitionOverride: r, type: i } = {}) {
  let { transition: s = e.getDefaultTransition(), transitionEnd: o, ...a } = t;
  r && (s = r);
  const l = [],
    u = i && e.animationState && e.animationState.getState()[i];
  for (const c in a) {
    const f = e.getValue(c, e.latestValues[c] ?? null),
      d = a[c];
    if (d === void 0 || (u && Nx(u, c))) continue;
    const g = { delay: n, ...yu(s || {}, c) },
      x = f.get();
    if (
      x !== void 0 &&
      !f.isAnimating &&
      !Array.isArray(d) &&
      d === x &&
      !g.velocity
    )
      continue;
    let y = !1;
    if (window.MotionHandoffAnimation) {
      const m = Lm(e);
      if (m) {
        const p = window.MotionHandoffAnimation(m, c, B);
        p !== null && ((g.startTime = p), (y = !0));
      }
    }
    qa(e, c),
      f.start(
        Nu(c, f, d, e.shouldReduceMotion && Yh.has(c) ? { type: !1 } : g, e, y)
      );
    const E = f.animation;
    E && l.push(E);
  }
  return (
    o &&
      Promise.all(l).then(() => {
        B.update(() => {
          o && xx(e, o);
        });
      }),
    l
  );
}
function Dm(e, t, n, r = 0, i = 1) {
  const s = Array.from(e)
      .sort((u, c) => u.sortNodePosition(c))
      .indexOf(t),
    o = e.size,
    a = (o - 1) * r;
  return typeof n == "function" ? n(s, o) : i === 1 ? s * r : a - s * r;
}
function el(e, t, n = {}) {
  var l;
  const r = bn(
    e,
    t,
    n.type === "exit"
      ? (l = e.presenceContext) == null
        ? void 0
        : l.custom
      : void 0
  );
  let { transition: i = e.getDefaultTransition() || {} } = r || {};
  n.transitionOverride && (i = n.transitionOverride);
  const s = r ? () => Promise.all(Nm(e, r, n)) : () => Promise.resolve(),
    o =
      e.variantChildren && e.variantChildren.size
        ? (u = 0) => {
            const {
              delayChildren: c = 0,
              staggerChildren: f,
              staggerDirection: d,
            } = i;
            return Dx(e, t, u, c, f, d, n);
          }
        : () => Promise.resolve(),
    { when: a } = i;
  if (a) {
    const [u, c] = a === "beforeChildren" ? [s, o] : [o, s];
    return u().then(() => c());
  } else return Promise.all([s(), o(n.delay)]);
}
function Dx(e, t, n = 0, r = 0, i = 0, s = 1, o) {
  const a = [];
  for (const l of e.variantChildren)
    l.notify("AnimationStart", t),
      a.push(
        el(l, t, {
          ...o,
          delay:
            n +
            (typeof r == "function" ? 0 : r) +
            Dm(e.variantChildren, l, r, i, s),
        }).then(() => l.notify("AnimationComplete", t))
      );
  return Promise.all(a);
}
function Ax(e, t, n = {}) {
  e.notify("AnimationStart", t);
  let r;
  if (Array.isArray(t)) {
    const i = t.map((s) => el(e, s, n));
    r = Promise.all(i);
  } else if (typeof t == "string") r = el(e, t, n);
  else {
    const i = typeof t == "function" ? bn(e, t, n.custom) : t;
    r = Promise.all(Nm(e, i, n));
  }
  return r.then(() => {
    e.notify("AnimationComplete", t);
  });
}
function Am(e, t) {
  if (!Array.isArray(t)) return !1;
  const n = t.length;
  if (n !== e.length) return !1;
  for (let r = 0; r < n; r++) if (t[r] !== e[r]) return !1;
  return !0;
}
const Rx = ku.length;
function Rm(e) {
  if (!e) return;
  if (!e.isControllingVariants) {
    const n = e.parent ? Rm(e.parent) || {} : {};
    return e.props.initial !== void 0 && (n.initial = e.props.initial), n;
  }
  const t = {};
  for (let n = 0; n < Rx; n++) {
    const r = ku[n],
      i = e.props[r];
    (Zr(i) || i === !1) && (t[r] = i);
  }
  return t;
}
const jx = [...Su].reverse(),
  Vx = Su.length;
function Ox(e) {
  return (t) =>
    Promise.all(t.map(({ animation: n, options: r }) => Ax(e, n, r)));
}
function _x(e) {
  let t = Ox(e),
    n = wf(),
    r = !0;
  const i = (l) => (u, c) => {
    var d;
    const f = bn(
      e,
      c,
      l === "exit"
        ? (d = e.presenceContext) == null
          ? void 0
          : d.custom
        : void 0
    );
    if (f) {
      const { transition: g, transitionEnd: x, ...y } = f;
      u = { ...u, ...y, ...x };
    }
    return u;
  };
  function s(l) {
    t = l(e);
  }
  function o(l) {
    const { props: u } = e,
      c = Rm(e.parent) || {},
      f = [],
      d = new Set();
    let g = {},
      x = 1 / 0;
    for (let E = 0; E < Vx; E++) {
      const m = jx[E],
        p = n[m],
        h = u[m] !== void 0 ? u[m] : c[m],
        v = Zr(h),
        w = m === l ? p.isActive : null;
      w === !1 && (x = E);
      let k = h === c[m] && h !== u[m] && v;
      if (
        (k && r && e.manuallyAnimateOnMount && (k = !1),
        (p.protectedKeys = { ...g }),
        (!p.isActive && w === null) ||
          (!h && !p.prevProp) ||
          Ys(h) ||
          typeof h == "boolean")
      )
        continue;
      const P = Ix(p.prevProp, h);
      let C = P || (m === l && p.isActive && !k && v) || (E > x && v),
        V = !1;
      const A = Array.isArray(h) ? h : [h];
      let F = A.reduce(i(m), {});
      w === !1 && (F = {});
      const { prevResolvedValues: xt = {} } = p,
        Wt = { ...xt, ...F },
        tr = (J) => {
          (C = !0),
            d.has(J) && ((V = !0), d.delete(J)),
            (p.needsAnimating[J] = !0);
          const L = e.getValue(J);
          L && (L.liveStyle = !1);
        };
      for (const J in Wt) {
        const L = F[J],
          R = xt[J];
        if (g.hasOwnProperty(J)) continue;
        let O = !1;
        Ja(L) && Ja(R) ? (O = !Am(L, R)) : (O = L !== R),
          O
            ? L != null
              ? tr(J)
              : d.add(J)
            : L !== void 0 && d.has(J)
            ? tr(J)
            : (p.protectedKeys[J] = !0);
      }
      (p.prevProp = h),
        (p.prevResolvedValues = F),
        p.isActive && (g = { ...g, ...F }),
        r && e.blockInitialAnimation && (C = !1);
      const fi = k && P;
      C &&
        (!fi || V) &&
        f.push(
          ...A.map((J) => {
            const L = { type: m };
            if (
              typeof J == "string" &&
              r &&
              !fi &&
              e.manuallyAnimateOnMount &&
              e.parent
            ) {
              const { parent: R } = e,
                O = bn(R, J);
              if (R.enteringChildren && O) {
                const { delayChildren: H } = O.transition || {};
                L.delay = Dm(R.enteringChildren, e, H);
              }
            }
            return { animation: J, options: L };
          })
        );
    }
    if (d.size) {
      const E = {};
      if (typeof u.initial != "boolean") {
        const m = bn(e, Array.isArray(u.initial) ? u.initial[0] : u.initial);
        m && m.transition && (E.transition = m.transition);
      }
      d.forEach((m) => {
        const p = e.getBaseTarget(m),
          h = e.getValue(m);
        h && (h.liveStyle = !0), (E[m] = p ?? null);
      }),
        f.push({ animation: E });
    }
    let y = !!f.length;
    return (
      r &&
        (u.initial === !1 || u.initial === u.animate) &&
        !e.manuallyAnimateOnMount &&
        (y = !1),
      (r = !1),
      y ? t(f) : Promise.resolve()
    );
  }
  function a(l, u) {
    var f;
    if (n[l].isActive === u) return Promise.resolve();
    (f = e.variantChildren) == null ||
      f.forEach((d) => {
        var g;
        return (g = d.animationState) == null ? void 0 : g.setActive(l, u);
      }),
      (n[l].isActive = u);
    const c = o(l);
    for (const d in n) n[d].protectedKeys = {};
    return c;
  }
  return {
    animateChanges: o,
    setActive: a,
    setAnimateFunction: s,
    getState: () => n,
    reset: () => {
      n = wf();
    },
  };
}
function Ix(e, t) {
  return typeof t == "string" ? t !== e : Array.isArray(t) ? !Am(t, e) : !1;
}
function Gt(e = !1) {
  return {
    isActive: e,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {},
  };
}
function wf() {
  return {
    animate: Gt(!0),
    whileInView: Gt(),
    whileHover: Gt(),
    whileTap: Gt(),
    whileDrag: Gt(),
    whileFocus: Gt(),
    exit: Gt(),
  };
}
class $t {
  constructor(t) {
    (this.isMounted = !1), (this.node = t);
  }
  update() {}
}
class Fx extends $t {
  constructor(t) {
    super(t), t.animationState || (t.animationState = _x(t));
  }
  updateAnimationControlsSubscription() {
    const { animate: t } = this.node.getProps();
    Ys(t) && (this.unmountControls = t.subscribe(this.node));
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: t } = this.node.getProps(),
      { animate: n } = this.node.prevProps || {};
    t !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
    var t;
    this.node.animationState.reset(),
      (t = this.unmountControls) == null || t.call(this);
  }
}
let zx = 0;
class bx extends $t {
  constructor() {
    super(...arguments), (this.id = zx++);
  }
  update() {
    if (!this.node.presenceContext) return;
    const { isPresent: t, onExitComplete: n } = this.node.presenceContext,
      { isPresent: r } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || t === r) return;
    const i = this.node.animationState.setActive("exit", !t);
    n &&
      !t &&
      i.then(() => {
        n(this.id);
      });
  }
  mount() {
    const { register: t, onExitComplete: n } = this.node.presenceContext || {};
    n && n(this.id), t && (this.unmount = t(this.id));
  }
  unmount() {}
}
const Bx = { animation: { Feature: Fx }, exit: { Feature: bx } };
function qr(e, t, n, r = { passive: !0 }) {
  return e.addEventListener(t, n, r), () => e.removeEventListener(t, n);
}
function ci(e) {
  return { point: { x: e.pageX, y: e.pageY } };
}
const Ux = (e) => (t) => wu(t) && e(t, ci(t));
function Lr(e, t, n, r) {
  return qr(e, t, Ux(n), r);
}
const jm = 1e-4,
  $x = 1 - jm,
  Wx = 1 + jm,
  Vm = 0.01,
  Hx = 0 - Vm,
  Kx = 0 + Vm;
function xe(e) {
  return e.max - e.min;
}
function Gx(e, t, n) {
  return Math.abs(e - t) <= n;
}
function Sf(e, t, n, r = 0.5) {
  (e.origin = r),
    (e.originPoint = G(t.min, t.max, e.origin)),
    (e.scale = xe(n) / xe(t)),
    (e.translate = G(n.min, n.max, e.origin) - e.originPoint),
    ((e.scale >= $x && e.scale <= Wx) || isNaN(e.scale)) && (e.scale = 1),
    ((e.translate >= Hx && e.translate <= Kx) || isNaN(e.translate)) &&
      (e.translate = 0);
}
function Nr(e, t, n, r) {
  Sf(e.x, t.x, n.x, r ? r.originX : void 0),
    Sf(e.y, t.y, n.y, r ? r.originY : void 0);
}
function kf(e, t, n) {
  (e.min = n.min + t.min), (e.max = e.min + xe(t));
}
function Qx(e, t, n) {
  kf(e.x, t.x, n.x), kf(e.y, t.y, n.y);
}
function Tf(e, t, n) {
  (e.min = t.min - n.min), (e.max = e.min + xe(t));
}
function Dr(e, t, n) {
  Tf(e.x, t.x, n.x), Tf(e.y, t.y, n.y);
}
function _e(e) {
  return [e("x"), e("y")];
}
const Om = ({ current: e }) => (e ? e.ownerDocument.defaultView : null),
  Cf = (e, t) => Math.abs(e - t);
function Yx(e, t) {
  const n = Cf(e.x, t.x),
    r = Cf(e.y, t.y);
  return Math.sqrt(n ** 2 + r ** 2);
}
class _m {
  constructor(
    t,
    n,
    {
      transformPagePoint: r,
      contextWindow: i = window,
      dragSnapToOrigin: s = !1,
      distanceThreshold: o = 3,
    } = {}
  ) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        const d = Oo(this.lastMoveEventInfo, this.history),
          g = this.startEvent !== null,
          x = Yx(d.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
        if (!g && !x) return;
        const { point: y } = d,
          { timestamp: E } = ce;
        this.history.push({ ...y, timestamp: E });
        const { onStart: m, onMove: p } = this.handlers;
        g ||
          (m && m(this.lastMoveEvent, d),
          (this.startEvent = this.lastMoveEvent)),
          p && p(this.lastMoveEvent, d);
      }),
      (this.handlePointerMove = (d, g) => {
        (this.lastMoveEvent = d),
          (this.lastMoveEventInfo = Vo(g, this.transformPagePoint)),
          B.update(this.updatePoint, !0);
      }),
      (this.handlePointerUp = (d, g) => {
        this.end();
        const { onEnd: x, onSessionEnd: y, resumeAnimation: E } = this.handlers;
        if (
          (this.dragSnapToOrigin && E && E(),
          !(this.lastMoveEvent && this.lastMoveEventInfo))
        )
          return;
        const m = Oo(
          d.type === "pointercancel"
            ? this.lastMoveEventInfo
            : Vo(g, this.transformPagePoint),
          this.history
        );
        this.startEvent && x && x(d, m), y && y(d, m);
      }),
      !wu(t))
    )
      return;
    (this.dragSnapToOrigin = s),
      (this.handlers = n),
      (this.transformPagePoint = r),
      (this.distanceThreshold = o),
      (this.contextWindow = i || window);
    const a = ci(t),
      l = Vo(a, this.transformPagePoint),
      { point: u } = l,
      { timestamp: c } = ce;
    this.history = [{ ...u, timestamp: c }];
    const { onSessionStart: f } = n;
    f && f(t, Oo(l, this.history)),
      (this.removeListeners = oi(
        Lr(this.contextWindow, "pointermove", this.handlePointerMove),
        Lr(this.contextWindow, "pointerup", this.handlePointerUp),
        Lr(this.contextWindow, "pointercancel", this.handlePointerUp)
      ));
  }
  updateHandlers(t) {
    this.handlers = t;
  }
  end() {
    this.removeListeners && this.removeListeners(), yt(this.updatePoint);
  }
}
function Vo(e, t) {
  return t ? { point: t(e.point) } : e;
}
function Ef(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function Oo({ point: e }, t) {
  return {
    point: e,
    delta: Ef(e, Im(t)),
    offset: Ef(e, Xx(t)),
    velocity: Zx(t, 0.1),
  };
}
function Xx(e) {
  return e[0];
}
function Im(e) {
  return e[e.length - 1];
}
function Zx(e, t) {
  if (e.length < 2) return { x: 0, y: 0 };
  let n = e.length - 1,
    r = null;
  const i = Im(e);
  for (; n >= 0 && ((r = e[n]), !(i.timestamp - r.timestamp > it(t))); ) n--;
  if (!r) return { x: 0, y: 0 };
  const s = be(i.timestamp - r.timestamp);
  if (s === 0) return { x: 0, y: 0 };
  const o = { x: (i.x - r.x) / s, y: (i.y - r.y) / s };
  return o.x === 1 / 0 && (o.x = 0), o.y === 1 / 0 && (o.y = 0), o;
}
function Jx(e, { min: t, max: n }, r) {
  return (
    t !== void 0 && e < t
      ? (e = r ? G(t, e, r.min) : Math.max(e, t))
      : n !== void 0 && e > n && (e = r ? G(n, e, r.max) : Math.min(e, n)),
    e
  );
}
function Pf(e, t, n) {
  return {
    min: t !== void 0 ? e.min + t : void 0,
    max: n !== void 0 ? e.max + n - (e.max - e.min) : void 0,
  };
}
function qx(e, { top: t, left: n, bottom: r, right: i }) {
  return { x: Pf(e.x, n, i), y: Pf(e.y, t, r) };
}
function Mf(e, t) {
  let n = t.min - e.min,
    r = t.max - e.max;
  return t.max - t.min < e.max - e.min && ([n, r] = [r, n]), { min: n, max: r };
}
function ew(e, t) {
  return { x: Mf(e.x, t.x), y: Mf(e.y, t.y) };
}
function tw(e, t) {
  let n = 0.5;
  const r = xe(e),
    i = xe(t);
  return (
    i > r
      ? (n = Qr(t.min, t.max - r, e.min))
      : r > i && (n = Qr(e.min, e.max - i, t.min)),
    mt(0, 1, n)
  );
}
function nw(e, t) {
  const n = {};
  return (
    t.min !== void 0 && (n.min = t.min - e.min),
    t.max !== void 0 && (n.max = t.max - e.min),
    n
  );
}
const tl = 0.35;
function rw(e = tl) {
  return (
    e === !1 ? (e = 0) : e === !0 && (e = tl),
    { x: Lf(e, "left", "right"), y: Lf(e, "top", "bottom") }
  );
}
function Lf(e, t, n) {
  return { min: Nf(e, t), max: Nf(e, n) };
}
function Nf(e, t) {
  return typeof e == "number" ? e : e[t] || 0;
}
const iw = new WeakMap();
class sw {
  constructor(t) {
    (this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = q()),
      (this.latestPointerEvent = null),
      (this.latestPanInfo = null),
      (this.visualElement = t);
  }
  start(t, { snapToCursor: n = !1, distanceThreshold: r } = {}) {
    const { presenceContext: i } = this.visualElement;
    if (i && i.isPresent === !1) return;
    const s = (f) => {
        const { dragSnapToOrigin: d } = this.getProps();
        d ? this.pauseAnimation() : this.stopAnimation(),
          n && this.snapToCursor(ci(f).point);
      },
      o = (f, d) => {
        const { drag: g, dragPropagation: x, onDragStart: y } = this.getProps();
        if (
          g &&
          !x &&
          (this.openDragLock && this.openDragLock(),
          (this.openDragLock = u1(g)),
          !this.openDragLock)
        )
          return;
        (this.latestPointerEvent = f),
          (this.latestPanInfo = d),
          (this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          _e((m) => {
            let p = this.getAxisMotionValue(m).get() || 0;
            if (st.test(p)) {
              const { projection: h } = this.visualElement;
              if (h && h.layout) {
                const v = h.layout.layoutBox[m];
                v && (p = xe(v) * (parseFloat(p) / 100));
              }
            }
            this.originPoint[m] = p;
          }),
          y && B.postRender(() => y(f, d)),
          qa(this.visualElement, "transform");
        const { animationState: E } = this.visualElement;
        E && E.setActive("whileDrag", !0);
      },
      a = (f, d) => {
        (this.latestPointerEvent = f), (this.latestPanInfo = d);
        const {
          dragPropagation: g,
          dragDirectionLock: x,
          onDirectionLock: y,
          onDrag: E,
        } = this.getProps();
        if (!g && !this.openDragLock) return;
        const { offset: m } = d;
        if (x && this.currentDirection === null) {
          (this.currentDirection = ow(m)),
            this.currentDirection !== null && y && y(this.currentDirection);
          return;
        }
        this.updateAxis("x", d.point, m),
          this.updateAxis("y", d.point, m),
          this.visualElement.render(),
          E && E(f, d);
      },
      l = (f, d) => {
        (this.latestPointerEvent = f),
          (this.latestPanInfo = d),
          this.stop(f, d),
          (this.latestPointerEvent = null),
          (this.latestPanInfo = null);
      },
      u = () =>
        _e((f) => {
          var d;
          return (
            this.getAnimationState(f) === "paused" &&
            ((d = this.getAxisMotionValue(f).animation) == null
              ? void 0
              : d.play())
          );
        }),
      { dragSnapToOrigin: c } = this.getProps();
    this.panSession = new _m(
      t,
      {
        onSessionStart: s,
        onStart: o,
        onMove: a,
        onSessionEnd: l,
        resumeAnimation: u,
      },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: c,
        distanceThreshold: r,
        contextWindow: Om(this.visualElement),
      }
    );
  }
  stop(t, n) {
    const r = t || this.latestPointerEvent,
      i = n || this.latestPanInfo,
      s = this.isDragging;
    if ((this.cancel(), !s || !i || !r)) return;
    const { velocity: o } = i;
    this.startAnimation(o);
    const { onDragEnd: a } = this.getProps();
    a && B.postRender(() => a(r, i));
  }
  cancel() {
    this.isDragging = !1;
    const { projection: t, animationState: n } = this.visualElement;
    t && (t.isAnimationBlocked = !1),
      this.panSession && this.panSession.end(),
      (this.panSession = void 0);
    const { dragPropagation: r } = this.getProps();
    !r &&
      this.openDragLock &&
      (this.openDragLock(), (this.openDragLock = null)),
      n && n.setActive("whileDrag", !1);
  }
  updateAxis(t, n, r) {
    const { drag: i } = this.getProps();
    if (!r || !Oi(t, i, this.currentDirection)) return;
    const s = this.getAxisMotionValue(t);
    let o = this.originPoint[t] + r[t];
    this.constraints &&
      this.constraints[t] &&
      (o = Jx(o, this.constraints[t], this.elastic[t])),
      s.set(o);
  }
  resolveConstraints() {
    var s;
    const { dragConstraints: t, dragElastic: n } = this.getProps(),
      r =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : (s = this.visualElement.projection) == null
          ? void 0
          : s.layout,
      i = this.constraints;
    t && Nn(t)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : t && r
      ? (this.constraints = qx(r.layoutBox, t))
      : (this.constraints = !1),
      (this.elastic = rw(n)),
      i !== this.constraints &&
        r &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        _e((o) => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(o) &&
            (this.constraints[o] = nw(r.layoutBox[o], this.constraints[o]));
        });
  }
  resolveRefConstraints() {
    const { dragConstraints: t, onMeasureDragConstraints: n } = this.getProps();
    if (!t || !Nn(t)) return !1;
    const r = t.current,
      { projection: i } = this.visualElement;
    if (!i || !i.layout) return !1;
    const s = ax(r, i.root, this.visualElement.getTransformPagePoint());
    let o = ew(i.layout.layoutBox, s);
    if (n) {
      const a = n(ix(o));
      (this.hasMutatedConstraints = !!a), a && (o = wm(a));
    }
    return o;
  }
  startAnimation(t) {
    const {
        drag: n,
        dragMomentum: r,
        dragElastic: i,
        dragTransition: s,
        dragSnapToOrigin: o,
        onDragTransitionEnd: a,
      } = this.getProps(),
      l = this.constraints || {},
      u = _e((c) => {
        if (!Oi(c, n, this.currentDirection)) return;
        let f = (l && l[c]) || {};
        o && (f = { min: 0, max: 0 });
        const d = i ? 200 : 1e6,
          g = i ? 40 : 1e7,
          x = {
            type: "inertia",
            velocity: r ? t[c] : 0,
            bounceStiffness: d,
            bounceDamping: g,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...s,
            ...f,
          };
        return this.startAxisValueAnimation(c, x);
      });
    return Promise.all(u).then(a);
  }
  startAxisValueAnimation(t, n) {
    const r = this.getAxisMotionValue(t);
    return (
      qa(this.visualElement, t), r.start(Nu(t, r, 0, n, this.visualElement, !1))
    );
  }
  stopAnimation() {
    _e((t) => this.getAxisMotionValue(t).stop());
  }
  pauseAnimation() {
    _e((t) => {
      var n;
      return (n = this.getAxisMotionValue(t).animation) == null
        ? void 0
        : n.pause();
    });
  }
  getAnimationState(t) {
    var n;
    return (n = this.getAxisMotionValue(t).animation) == null
      ? void 0
      : n.state;
  }
  getAxisMotionValue(t) {
    const n = `_drag${t.toUpperCase()}`,
      r = this.visualElement.getProps(),
      i = r[n];
    return (
      i ||
      this.visualElement.getValue(t, (r.initial ? r.initial[t] : void 0) || 0)
    );
  }
  snapToCursor(t) {
    _e((n) => {
      const { drag: r } = this.getProps();
      if (!Oi(n, r, this.currentDirection)) return;
      const { projection: i } = this.visualElement,
        s = this.getAxisMotionValue(n);
      if (i && i.layout) {
        const { min: o, max: a } = i.layout.layoutBox[n];
        s.set(t[n] - G(o, a, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const { drag: t, dragConstraints: n } = this.getProps(),
      { projection: r } = this.visualElement;
    if (!Nn(n) || !r || !this.constraints) return;
    this.stopAnimation();
    const i = { x: 0, y: 0 };
    _e((o) => {
      const a = this.getAxisMotionValue(o);
      if (a && this.constraints !== !1) {
        const l = a.get();
        i[o] = tw({ min: l, max: l }, this.constraints[o]);
      }
    });
    const { transformTemplate: s } = this.visualElement.getProps();
    (this.visualElement.current.style.transform = s ? s({}, "") : "none"),
      r.root && r.root.updateScroll(),
      r.updateLayout(),
      this.resolveConstraints(),
      _e((o) => {
        if (!Oi(o, t, null)) return;
        const a = this.getAxisMotionValue(o),
          { min: l, max: u } = this.constraints[o];
        a.set(G(l, u, i[o]));
      });
  }
  addListeners() {
    if (!this.visualElement.current) return;
    iw.set(this.visualElement, this);
    const t = this.visualElement.current,
      n = Lr(t, "pointerdown", (l) => {
        const { drag: u, dragListener: c = !0 } = this.getProps();
        u && c && this.start(l);
      }),
      r = () => {
        const { dragConstraints: l } = this.getProps();
        Nn(l) && l.current && (this.constraints = this.resolveRefConstraints());
      },
      { projection: i } = this.visualElement,
      s = i.addEventListener("measure", r);
    i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()),
      B.read(r);
    const o = qr(window, "resize", () => this.scalePositionWithinConstraints()),
      a = i.addEventListener(
        "didUpdate",
        ({ delta: l, hasLayoutChanged: u }) => {
          this.isDragging &&
            u &&
            (_e((c) => {
              const f = this.getAxisMotionValue(c);
              f &&
                ((this.originPoint[c] += l[c].translate),
                f.set(f.get() + l[c].translate));
            }),
            this.visualElement.render());
        }
      );
    return () => {
      o(), n(), s(), a && a();
    };
  }
  getProps() {
    const t = this.visualElement.getProps(),
      {
        drag: n = !1,
        dragDirectionLock: r = !1,
        dragPropagation: i = !1,
        dragConstraints: s = !1,
        dragElastic: o = tl,
        dragMomentum: a = !0,
      } = t;
    return {
      ...t,
      drag: n,
      dragDirectionLock: r,
      dragPropagation: i,
      dragConstraints: s,
      dragElastic: o,
      dragMomentum: a,
    };
  }
}
function Oi(e, t, n) {
  return (t === !0 || t === e) && (n === null || n === e);
}
function ow(e, t = 10) {
  let n = null;
  return Math.abs(e.y) > t ? (n = "y") : Math.abs(e.x) > t && (n = "x"), n;
}
class aw extends $t {
  constructor(t) {
    super(t),
      (this.removeGroupControls = Ue),
      (this.removeListeners = Ue),
      (this.controls = new sw(t));
  }
  mount() {
    const { dragControls: t } = this.node.getProps();
    t && (this.removeGroupControls = t.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || Ue);
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const Df = (e) => (t, n) => {
  e && B.postRender(() => e(t, n));
};
class lw extends $t {
  constructor() {
    super(...arguments), (this.removePointerDownListener = Ue);
  }
  onPointerDown(t) {
    this.session = new _m(t, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Om(this.node),
    });
  }
  createPanHandlers() {
    const {
      onPanSessionStart: t,
      onPanStart: n,
      onPan: r,
      onPanEnd: i,
    } = this.node.getProps();
    return {
      onSessionStart: Df(t),
      onStart: Df(n),
      onMove: r,
      onEnd: (s, o) => {
        delete this.session, i && B.postRender(() => i(s, o));
      },
    };
  }
  mount() {
    this.removePointerDownListener = Lr(this.node.current, "pointerdown", (t) =>
      this.onPointerDown(t)
    );
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
const qi = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
function Af(e, t) {
  return t.max === t.min ? 0 : (e / (t.max - t.min)) * 100;
}
const cr = {
    correct: (e, t) => {
      if (!t.target) return e;
      if (typeof e == "string")
        if (j.test(e)) e = parseFloat(e);
        else return e;
      const n = Af(e, t.target.x),
        r = Af(e, t.target.y);
      return `${n}% ${r}%`;
    },
  },
  uw = {
    correct: (e, { treeScale: t, projectionDelta: n }) => {
      const r = e,
        i = zt.parse(e);
      if (i.length > 5) return r;
      const s = zt.createTransformer(e),
        o = typeof i[0] != "number" ? 1 : 0,
        a = n.x.scale * t.x,
        l = n.y.scale * t.y;
      (i[0 + o] /= a), (i[1 + o] /= l);
      const u = G(a, l, 0.5);
      return (
        typeof i[2 + o] == "number" && (i[2 + o] /= u),
        typeof i[3 + o] == "number" && (i[3 + o] /= u),
        s(i)
      );
    },
  };
let _o = !1;
class cw extends T.Component {
  componentDidMount() {
    const {
        visualElement: t,
        layoutGroup: n,
        switchLayoutGroup: r,
        layoutId: i,
      } = this.props,
      { projection: s } = t;
    R1(fw),
      s &&
        (n.group && n.group.add(s),
        r && r.register && i && r.register(s),
        _o && s.root.didUpdate(),
        s.addEventListener("animationComplete", () => {
          this.safeToRemove();
        }),
        s.setOptions({
          ...s.options,
          onExitComplete: () => this.safeToRemove(),
        })),
      (qi.hasEverUpdated = !0);
  }
  getSnapshotBeforeUpdate(t) {
    const {
        layoutDependency: n,
        visualElement: r,
        drag: i,
        isPresent: s,
      } = this.props,
      { projection: o } = r;
    return (
      o &&
        ((o.isPresent = s),
        (_o = !0),
        i || t.layoutDependency !== n || n === void 0 || t.isPresent !== s
          ? o.willUpdate()
          : this.safeToRemove(),
        t.isPresent !== s &&
          (s
            ? o.promote()
            : o.relegate() ||
              B.postRender(() => {
                const a = o.getStack();
                (!a || !a.members.length) && this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    const { projection: t } = this.props.visualElement;
    t &&
      (t.root.didUpdate(),
      xu.postRender(() => {
        !t.currentAnimation && t.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    const {
        visualElement: t,
        layoutGroup: n,
        switchLayoutGroup: r,
      } = this.props,
      { projection: i } = t;
    (_o = !0),
      i &&
        (i.scheduleCheckAfterUnmount(),
        n && n.group && n.group.remove(i),
        r && r.deregister && r.deregister(i));
  }
  safeToRemove() {
    const { safeToRemove: t } = this.props;
    t && t();
  }
  render() {
    return null;
  }
}
function Fm(e) {
  const [t, n] = om(),
    r = T.useContext(Jl);
  return S.jsx(cw, {
    ...e,
    layoutGroup: r,
    switchLayoutGroup: T.useContext(vm),
    isPresent: t,
    safeToRemove: n,
  });
}
const fw = {
  borderRadius: {
    ...cr,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius",
    ],
  },
  borderTopLeftRadius: cr,
  borderTopRightRadius: cr,
  borderBottomLeftRadius: cr,
  borderBottomRightRadius: cr,
  boxShadow: uw,
};
function dw(e, t, n) {
  const r = ae(e) ? e : dn(e);
  return r.start(Nu("", r, t, n)), r.animation;
}
const pw = (e, t) => e.depth - t.depth;
class hw {
  constructor() {
    (this.children = []), (this.isDirty = !1);
  }
  add(t) {
    tu(this.children, t), (this.isDirty = !0);
  }
  remove(t) {
    nu(this.children, t), (this.isDirty = !0);
  }
  forEach(t) {
    this.isDirty && this.children.sort(pw),
      (this.isDirty = !1),
      this.children.forEach(t);
  }
}
function mw(e, t) {
  const n = Ee.now(),
    r = ({ timestamp: i }) => {
      const s = i - n;
      s >= t && (yt(r), e(s - t));
    };
  return B.setup(r, !0), () => yt(r);
}
const zm = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
  gw = zm.length,
  Rf = (e) => (typeof e == "string" ? parseFloat(e) : e),
  jf = (e) => typeof e == "number" || j.test(e);
function yw(e, t, n, r, i, s) {
  i
    ? ((e.opacity = G(0, n.opacity ?? 1, vw(r))),
      (e.opacityExit = G(t.opacity ?? 1, 0, xw(r))))
    : s && (e.opacity = G(t.opacity ?? 1, n.opacity ?? 1, r));
  for (let o = 0; o < gw; o++) {
    const a = `border${zm[o]}Radius`;
    let l = Vf(t, a),
      u = Vf(n, a);
    if (l === void 0 && u === void 0) continue;
    l || (l = 0),
      u || (u = 0),
      l === 0 || u === 0 || jf(l) === jf(u)
        ? ((e[a] = Math.max(G(Rf(l), Rf(u), r), 0)),
          (st.test(u) || st.test(l)) && (e[a] += "%"))
        : (e[a] = u);
  }
  (t.rotate || n.rotate) && (e.rotate = G(t.rotate || 0, n.rotate || 0, r));
}
function Vf(e, t) {
  return e[t] !== void 0 ? e[t] : e.borderRadius;
}
const vw = bm(0, 0.5, Eh),
  xw = bm(0.5, 0.95, Ue);
function bm(e, t, n) {
  return (r) => (r < e ? 0 : r > t ? 1 : n(Qr(e, t, r)));
}
function Of(e, t) {
  (e.min = t.min), (e.max = t.max);
}
function Oe(e, t) {
  Of(e.x, t.x), Of(e.y, t.y);
}
function _f(e, t) {
  (e.translate = t.translate),
    (e.scale = t.scale),
    (e.originPoint = t.originPoint),
    (e.origin = t.origin);
}
function If(e, t, n, r, i) {
  return (
    (e -= t), (e = Ns(e, 1 / n, r)), i !== void 0 && (e = Ns(e, 1 / i, r)), e
  );
}
function ww(e, t = 0, n = 1, r = 0.5, i, s = e, o = e) {
  if (
    (st.test(t) &&
      ((t = parseFloat(t)), (t = G(o.min, o.max, t / 100) - o.min)),
    typeof t != "number")
  )
    return;
  let a = G(s.min, s.max, r);
  e === s && (a -= t),
    (e.min = If(e.min, t, n, a, i)),
    (e.max = If(e.max, t, n, a, i));
}
function Ff(e, t, [n, r, i], s, o) {
  ww(e, t[n], t[r], t[i], t.scale, s, o);
}
const Sw = ["x", "scaleX", "originX"],
  kw = ["y", "scaleY", "originY"];
function zf(e, t, n, r) {
  Ff(e.x, t, Sw, n ? n.x : void 0, r ? r.x : void 0),
    Ff(e.y, t, kw, n ? n.y : void 0, r ? r.y : void 0);
}
function bf(e) {
  return e.translate === 0 && e.scale === 1;
}
function Bm(e) {
  return bf(e.x) && bf(e.y);
}
function Bf(e, t) {
  return e.min === t.min && e.max === t.max;
}
function Tw(e, t) {
  return Bf(e.x, t.x) && Bf(e.y, t.y);
}
function Uf(e, t) {
  return (
    Math.round(e.min) === Math.round(t.min) &&
    Math.round(e.max) === Math.round(t.max)
  );
}
function Um(e, t) {
  return Uf(e.x, t.x) && Uf(e.y, t.y);
}
function $f(e) {
  return xe(e.x) / xe(e.y);
}
function Wf(e, t) {
  return (
    e.translate === t.translate &&
    e.scale === t.scale &&
    e.originPoint === t.originPoint
  );
}
class Cw {
  constructor() {
    this.members = [];
  }
  add(t) {
    tu(this.members, t), t.scheduleRender();
  }
  remove(t) {
    if (
      (nu(this.members, t),
      t === this.prevLead && (this.prevLead = void 0),
      t === this.lead)
    ) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(t) {
    const n = this.members.findIndex((i) => t === i);
    if (n === 0) return !1;
    let r;
    for (let i = n; i >= 0; i--) {
      const s = this.members[i];
      if (s.isPresent !== !1) {
        r = s;
        break;
      }
    }
    return r ? (this.promote(r), !0) : !1;
  }
  promote(t, n) {
    const r = this.lead;
    if (t !== r && ((this.prevLead = r), (this.lead = t), t.show(), r)) {
      r.instance && r.scheduleRender(),
        t.scheduleRender(),
        (t.resumeFrom = r),
        n && (t.resumeFrom.preserveOpacity = !0),
        r.snapshot &&
          ((t.snapshot = r.snapshot),
          (t.snapshot.latestValues = r.animationValues || r.latestValues)),
        t.root && t.root.isUpdating && (t.isLayoutDirty = !0);
      const { crossfade: i } = t.options;
      i === !1 && r.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((t) => {
      const { options: n, resumingFrom: r } = t;
      n.onExitComplete && n.onExitComplete(),
        r && r.options.onExitComplete && r.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((t) => {
      t.instance && t.scheduleRender(!1);
    });
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function Ew(e, t, n) {
  let r = "";
  const i = e.x.translate / t.x,
    s = e.y.translate / t.y,
    o = (n == null ? void 0 : n.z) || 0;
  if (
    ((i || s || o) && (r = `translate3d(${i}px, ${s}px, ${o}px) `),
    (t.x !== 1 || t.y !== 1) && (r += `scale(${1 / t.x}, ${1 / t.y}) `),
    n)
  ) {
    const {
      transformPerspective: u,
      rotate: c,
      rotateX: f,
      rotateY: d,
      skewX: g,
      skewY: x,
    } = n;
    u && (r = `perspective(${u}px) ${r}`),
      c && (r += `rotate(${c}deg) `),
      f && (r += `rotateX(${f}deg) `),
      d && (r += `rotateY(${d}deg) `),
      g && (r += `skewX(${g}deg) `),
      x && (r += `skewY(${x}deg) `);
  }
  const a = e.x.scale * t.x,
    l = e.y.scale * t.y;
  return (a !== 1 || l !== 1) && (r += `scale(${a}, ${l})`), r || "none";
}
const Io = ["", "X", "Y", "Z"],
  Pw = 1e3;
let Mw = 0;
function Fo(e, t, n, r) {
  const { latestValues: i } = t;
  i[e] && ((n[e] = i[e]), t.setStaticValue(e, 0), r && (r[e] = 0));
}
function $m(e) {
  if (((e.hasCheckedOptimisedAppear = !0), e.root === e)) return;
  const { visualElement: t } = e.options;
  if (!t) return;
  const n = Lm(t);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: i, layoutId: s } = e.options;
    window.MotionCancelOptimisedAnimation(n, "transform", B, !(i || s));
  }
  const { parent: r } = e;
  r && !r.hasCheckedOptimisedAppear && $m(r);
}
function Wm({
  attachResizeListener: e,
  defaultParent: t,
  measureScroll: n,
  checkIsScrollRoot: r,
  resetTransform: i,
}) {
  return class {
    constructor(o = {}, a = t == null ? void 0 : t()) {
      (this.id = Mw++),
        (this.animationId = 0),
        (this.animationCommitId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          (this.projectionUpdateScheduled = !1),
            this.nodes.forEach(Dw),
            this.nodes.forEach(Vw),
            this.nodes.forEach(Ow),
            this.nodes.forEach(Aw);
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = o),
        (this.root = a ? a.root || a : this),
        (this.path = a ? [...a.path, a] : []),
        (this.parent = a),
        (this.depth = a ? a.depth + 1 : 0);
      for (let l = 0; l < this.path.length; l++)
        this.path[l].shouldResetTransform = !0;
      this.root === this && (this.nodes = new hw());
    }
    addEventListener(o, a) {
      return (
        this.eventHandlers.has(o) || this.eventHandlers.set(o, new su()),
        this.eventHandlers.get(o).add(a)
      );
    }
    notifyListeners(o, ...a) {
      const l = this.eventHandlers.get(o);
      l && l.notify(...a);
    }
    hasListeners(o) {
      return this.eventHandlers.has(o);
    }
    mount(o) {
      if (this.instance) return;
      (this.isSVG = sm(o) && !m1(o)), (this.instance = o);
      const { layoutId: a, layout: l, visualElement: u } = this.options;
      if (
        (u && !u.current && u.mount(o),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        this.root.hasTreeAnimated && (l || a) && (this.isLayoutDirty = !0),
        e)
      ) {
        let c,
          f = 0;
        const d = () => (this.root.updateBlockedByResize = !1);
        B.read(() => {
          f = window.innerWidth;
        }),
          e(o, () => {
            const g = window.innerWidth;
            g !== f &&
              ((f = g),
              (this.root.updateBlockedByResize = !0),
              c && c(),
              (c = mw(d, 250)),
              qi.hasAnimatedSinceResize &&
                ((qi.hasAnimatedSinceResize = !1), this.nodes.forEach(Gf)));
          });
      }
      a && this.root.registerSharedNode(a, this),
        this.options.animate !== !1 &&
          u &&
          (a || l) &&
          this.addEventListener(
            "didUpdate",
            ({
              delta: c,
              hasLayoutChanged: f,
              hasRelativeLayoutChanged: d,
              layout: g,
            }) => {
              if (this.isTreeAnimationBlocked()) {
                (this.target = void 0), (this.relativeTarget = void 0);
                return;
              }
              const x =
                  this.options.transition || u.getDefaultTransition() || bw,
                { onLayoutAnimationStart: y, onLayoutAnimationComplete: E } =
                  u.getProps(),
                m = !this.targetLayout || !Um(this.targetLayout, g),
                p = !f && d;
              if (
                this.options.layoutRoot ||
                this.resumeFrom ||
                p ||
                (f && (m || !this.currentAnimation))
              ) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0));
                const h = { ...yu(x, "layout"), onPlay: y, onComplete: E };
                (u.shouldReduceMotion || this.options.layoutRoot) &&
                  ((h.delay = 0), (h.type = !1)),
                  this.startAnimation(h),
                  this.setAnimationOrigin(c, p);
              } else
                f || Gf(this),
                  this.isLead() &&
                    this.options.onExitComplete &&
                    this.options.onExitComplete();
              this.targetLayout = g;
            }
          );
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const o = this.getStack();
      o && o.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        this.eventHandlers.clear(),
        yt(this.updateProjection);
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return (
        this.isAnimationBlocked ||
        (this.parent && this.parent.isTreeAnimationBlocked()) ||
        !1
      );
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0),
        this.nodes && this.nodes.forEach(_w),
        this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: o } = this.options;
      return o && o.getProps().transformTemplate;
    }
    willUpdate(o = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        (window.MotionCancelOptimisedAnimation &&
          !this.hasCheckedOptimisedAppear &&
          $m(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let c = 0; c < this.path.length; c++) {
        const f = this.path[c];
        (f.shouldResetTransform = !0),
          f.updateScroll("snapshot"),
          f.options.layoutRoot && f.willUpdate(!1);
      }
      const { layoutId: a, layout: l } = this.options;
      if (a === void 0 && !l) return;
      const u = this.getTransformTemplate();
      (this.prevTransformTemplateValue = u ? u(this.latestValues, "") : void 0),
        this.updateSnapshot(),
        o && this.notifyListeners("willUpdate");
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(Hf);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Kf);
        return;
      }
      (this.animationCommitId = this.animationId),
        this.isUpdating
          ? ((this.isUpdating = !1),
            this.nodes.forEach(jw),
            this.nodes.forEach(Lw),
            this.nodes.forEach(Nw))
          : this.nodes.forEach(Kf),
        this.clearAllSnapshots();
      const a = Ee.now();
      (ce.delta = mt(0, 1e3 / 60, a - ce.timestamp)),
        (ce.timestamp = a),
        (ce.isProcessing = !0),
        Po.update.process(ce),
        Po.preRender.process(ce),
        Po.render.process(ce),
        (ce.isProcessing = !1);
    }
    didUpdate() {
      this.updateScheduled ||
        ((this.updateScheduled = !0), xu.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(Rw), this.sharedNodes.forEach(Iw);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0),
        B.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      B.postRender(() => {
        this.isLayoutDirty
          ? this.root.didUpdate()
          : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot ||
        !this.instance ||
        ((this.snapshot = this.measure()),
        this.snapshot &&
          !xe(this.snapshot.measuredBox.x) &&
          !xe(this.snapshot.measuredBox.y) &&
          (this.snapshot = void 0));
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) &&
          !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let l = 0; l < this.path.length; l++) this.path[l].updateScroll();
      const o = this.layout;
      (this.layout = this.measure(!1)),
        (this.layoutCorrected = q()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: a } = this.options;
      a &&
        a.notify(
          "LayoutMeasure",
          this.layout.layoutBox,
          o ? o.layoutBox : void 0
        );
    }
    updateScroll(o = "measure") {
      let a = !!(this.options.layoutScroll && this.instance);
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === o &&
          (a = !1),
        a && this.instance)
      ) {
        const l = r(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: o,
          isRoot: l,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : l,
        };
      }
    }
    resetTransform() {
      if (!i) return;
      const o =
          this.isLayoutDirty ||
          this.shouldResetTransform ||
          this.options.alwaysMeasureLayout,
        a = this.projectionDelta && !Bm(this.projectionDelta),
        l = this.getTransformTemplate(),
        u = l ? l(this.latestValues, "") : void 0,
        c = u !== this.prevTransformTemplateValue;
      o &&
        this.instance &&
        (a || Xt(this.latestValues) || c) &&
        (i(this.instance, u),
        (this.shouldResetTransform = !1),
        this.scheduleRender());
    }
    measure(o = !0) {
      const a = this.measurePageBox();
      let l = this.removeElementScroll(a);
      return (
        o && (l = this.removeTransform(l)),
        Bw(l),
        {
          animationId: this.root.animationId,
          measuredBox: a,
          layoutBox: l,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      var u;
      const { visualElement: o } = this.options;
      if (!o) return q();
      const a = o.measureViewportBox();
      if (
        !(
          ((u = this.scroll) == null ? void 0 : u.wasRoot) || this.path.some(Uw)
        )
      ) {
        const { scroll: c } = this.root;
        c && (Dn(a.x, c.offset.x), Dn(a.y, c.offset.y));
      }
      return a;
    }
    removeElementScroll(o) {
      var l;
      const a = q();
      if ((Oe(a, o), (l = this.scroll) != null && l.wasRoot)) return a;
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u],
          { scroll: f, options: d } = c;
        c !== this.root &&
          f &&
          d.layoutScroll &&
          (f.wasRoot && Oe(a, o), Dn(a.x, f.offset.x), Dn(a.y, f.offset.y));
      }
      return a;
    }
    applyTransform(o, a = !1) {
      const l = q();
      Oe(l, o);
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u];
        !a &&
          c.options.layoutScroll &&
          c.scroll &&
          c !== c.root &&
          An(l, { x: -c.scroll.offset.x, y: -c.scroll.offset.y }),
          Xt(c.latestValues) && An(l, c.latestValues);
      }
      return Xt(this.latestValues) && An(l, this.latestValues), l;
    }
    removeTransform(o) {
      const a = q();
      Oe(a, o);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l];
        if (!u.instance || !Xt(u.latestValues)) continue;
        Ya(u.latestValues) && u.updateSnapshot();
        const c = q(),
          f = u.measurePageBox();
        Oe(c, f),
          zf(a, u.latestValues, u.snapshot ? u.snapshot.layoutBox : void 0, c);
      }
      return Xt(this.latestValues) && zf(a, this.latestValues), a;
    }
    setTargetDelta(o) {
      (this.targetDelta = o),
        this.root.scheduleUpdateProjection(),
        (this.isProjectionDirty = !0);
    }
    setOptions(o) {
      this.options = {
        ...this.options,
        ...o,
        crossfade: o.crossfade !== void 0 ? o.crossfade : !0,
      };
    }
    clearMeasurements() {
      (this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1);
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== ce.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(o = !1) {
      var d;
      const a = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = a.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = a.isTransformDirty),
        this.isSharedProjectionDirty ||
          (this.isSharedProjectionDirty = a.isSharedProjectionDirty);
      const l = !!this.resumingFrom || this !== a;
      if (
        !(
          o ||
          (l && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          ((d = this.parent) != null && d.isProjectionDirty) ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      )
        return;
      const { layout: c, layoutId: f } = this.options;
      if (!(!this.layout || !(c || f))) {
        if (
          ((this.resolvedRelativeTargetAt = ce.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          const g = this.getClosestProjectingParent();
          g && g.layout && this.animationProgress !== 1
            ? ((this.relativeParent = g),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = q()),
              (this.relativeTargetOrigin = q()),
              Dr(
                this.relativeTargetOrigin,
                this.layout.layoutBox,
                g.layout.layoutBox
              ),
              Oe(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
        if (
          !(!this.relativeTarget && !this.targetDelta) &&
          (this.target ||
            ((this.target = q()), (this.targetWithTransforms = q())),
          this.relativeTarget &&
          this.relativeTargetOrigin &&
          this.relativeParent &&
          this.relativeParent.target
            ? (this.forceRelativeParentToResolveTarget(),
              Qx(this.target, this.relativeTarget, this.relativeParent.target))
            : this.targetDelta
            ? (this.resumingFrom
                ? (this.target = this.applyTransform(this.layout.layoutBox))
                : Oe(this.target, this.layout.layoutBox),
              km(this.target, this.targetDelta))
            : Oe(this.target, this.layout.layoutBox),
          this.attemptToResolveRelativeTarget)
        ) {
          this.attemptToResolveRelativeTarget = !1;
          const g = this.getClosestProjectingParent();
          g &&
          !!g.resumingFrom == !!this.resumingFrom &&
          !g.options.layoutScroll &&
          g.target &&
          this.animationProgress !== 1
            ? ((this.relativeParent = g),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = q()),
              (this.relativeTargetOrigin = q()),
              Dr(this.relativeTargetOrigin, this.target, g.target),
              Oe(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
      }
    }
    getClosestProjectingParent() {
      if (
        !(
          !this.parent ||
          Ya(this.parent.latestValues) ||
          Sm(this.parent.latestValues)
        )
      )
        return this.parent.isProjecting()
          ? this.parent
          : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
        this.layout
      );
    }
    calcProjection() {
      var x;
      const o = this.getLead(),
        a = !!this.resumingFrom || this !== o;
      let l = !0;
      if (
        ((this.isProjectionDirty ||
          ((x = this.parent) != null && x.isProjectionDirty)) &&
          (l = !1),
        a &&
          (this.isSharedProjectionDirty || this.isTransformDirty) &&
          (l = !1),
        this.resolvedRelativeTargetAt === ce.timestamp && (l = !1),
        l)
      )
        return;
      const { layout: u, layoutId: c } = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating ||
          (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(u || c))
      )
        return;
      Oe(this.layoutCorrected, this.layout.layoutBox);
      const f = this.treeScale.x,
        d = this.treeScale.y;
      ox(this.layoutCorrected, this.treeScale, this.path, a),
        o.layout &&
          !o.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((o.target = o.layout.layoutBox), (o.targetWithTransforms = q()));
      const { target: g } = o;
      if (!g) {
        this.prevProjectionDelta &&
          (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (_f(this.prevProjectionDelta.x, this.projectionDelta.x),
          _f(this.prevProjectionDelta.y, this.projectionDelta.y)),
        Nr(this.projectionDelta, this.layoutCorrected, g, this.latestValues),
        (this.treeScale.x !== f ||
          this.treeScale.y !== d ||
          !Wf(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !Wf(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners("projectionUpdate", g));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(o = !0) {
      var a;
      if (((a = this.options.visualElement) == null || a.scheduleRender(), o)) {
        const l = this.getStack();
        l && l.scheduleRender();
      }
      this.resumingFrom &&
        !this.resumingFrom.instance &&
        (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      (this.prevProjectionDelta = Rn()),
        (this.projectionDelta = Rn()),
        (this.projectionDeltaWithTransform = Rn());
    }
    setAnimationOrigin(o, a = !1) {
      const l = this.snapshot,
        u = l ? l.latestValues : {},
        c = { ...this.latestValues },
        f = Rn();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !a);
      const d = q(),
        g = l ? l.source : void 0,
        x = this.layout ? this.layout.source : void 0,
        y = g !== x,
        E = this.getStack(),
        m = !E || E.members.length <= 1,
        p = !!(y && !m && this.options.crossfade === !0 && !this.path.some(zw));
      this.animationProgress = 0;
      let h;
      (this.mixTargetDelta = (v) => {
        const w = v / 1e3;
        Qf(f.x, o.x, w),
          Qf(f.y, o.y, w),
          this.setTargetDelta(f),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (Dr(d, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            Fw(this.relativeTarget, this.relativeTargetOrigin, d, w),
            h && Tw(this.relativeTarget, h) && (this.isProjectionDirty = !1),
            h || (h = q()),
            Oe(h, this.relativeTarget)),
          y &&
            ((this.animationValues = c), yw(c, u, this.latestValues, w, p, m)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = w);
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(o) {
      var a, l, u;
      this.notifyListeners("animationStart"),
        (a = this.currentAnimation) == null || a.stop(),
        (u = (l = this.resumingFrom) == null ? void 0 : l.currentAnimation) ==
          null || u.stop(),
        this.pendingAnimation &&
          (yt(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = B.update(() => {
          (qi.hasAnimatedSinceResize = !0),
            this.motionValue || (this.motionValue = dn(0)),
            (this.currentAnimation = dw(this.motionValue, [0, 1e3], {
              ...o,
              velocity: 0,
              isSync: !0,
              onUpdate: (c) => {
                this.mixTargetDelta(c), o.onUpdate && o.onUpdate(c);
              },
              onStop: () => {},
              onComplete: () => {
                o.onComplete && o.onComplete(), this.completeAnimation();
              },
            })),
            this.resumingFrom &&
              (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0);
        }));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      const o = this.getStack();
      o && o.exitAnimationComplete(),
        (this.resumingFrom =
          this.currentAnimation =
          this.animationValues =
            void 0),
        this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(Pw),
        this.currentAnimation.stop()),
        this.completeAnimation();
    }
    applyTransformsToTarget() {
      const o = this.getLead();
      let {
        targetWithTransforms: a,
        target: l,
        layout: u,
        latestValues: c,
      } = o;
      if (!(!a || !l || !u)) {
        if (
          this !== o &&
          this.layout &&
          u &&
          Hm(this.options.animationType, this.layout.layoutBox, u.layoutBox)
        ) {
          l = this.target || q();
          const f = xe(this.layout.layoutBox.x);
          (l.x.min = o.target.x.min), (l.x.max = l.x.min + f);
          const d = xe(this.layout.layoutBox.y);
          (l.y.min = o.target.y.min), (l.y.max = l.y.min + d);
        }
        Oe(a, l),
          An(a, c),
          Nr(this.projectionDeltaWithTransform, this.layoutCorrected, a, c);
      }
    }
    registerSharedNode(o, a) {
      this.sharedNodes.has(o) || this.sharedNodes.set(o, new Cw()),
        this.sharedNodes.get(o).add(a);
      const u = a.options.initialPromotionConfig;
      a.promote({
        transition: u ? u.transition : void 0,
        preserveFollowOpacity:
          u && u.shouldPreserveFollowOpacity
            ? u.shouldPreserveFollowOpacity(a)
            : void 0,
      });
    }
    isLead() {
      const o = this.getStack();
      return o ? o.lead === this : !0;
    }
    getLead() {
      var a;
      const { layoutId: o } = this.options;
      return o
        ? ((a = this.getStack()) == null ? void 0 : a.lead) || this
        : this;
    }
    getPrevLead() {
      var a;
      const { layoutId: o } = this.options;
      return o ? ((a = this.getStack()) == null ? void 0 : a.prevLead) : void 0;
    }
    getStack() {
      const { layoutId: o } = this.options;
      if (o) return this.root.sharedNodes.get(o);
    }
    promote({ needsReset: o, transition: a, preserveFollowOpacity: l } = {}) {
      const u = this.getStack();
      u && u.promote(this, l),
        o && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        a && this.setOptions({ transition: a });
    }
    relegate() {
      const o = this.getStack();
      return o ? o.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: o } = this.options;
      if (!o) return;
      let a = !1;
      const { latestValues: l } = o;
      if (
        ((l.z ||
          l.rotate ||
          l.rotateX ||
          l.rotateY ||
          l.rotateZ ||
          l.skewX ||
          l.skewY) &&
          (a = !0),
        !a)
      )
        return;
      const u = {};
      l.z && Fo("z", o, u, this.animationValues);
      for (let c = 0; c < Io.length; c++)
        Fo(`rotate${Io[c]}`, o, u, this.animationValues),
          Fo(`skew${Io[c]}`, o, u, this.animationValues);
      o.render();
      for (const c in u)
        o.setStaticValue(c, u[c]),
          this.animationValues && (this.animationValues[c] = u[c]);
      o.scheduleRender();
    }
    applyProjectionStyles(o, a) {
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) {
        o.visibility = "hidden";
        return;
      }
      const l = this.getTransformTemplate();
      if (this.needsReset) {
        (this.needsReset = !1),
          (o.visibility = ""),
          (o.opacity = ""),
          (o.pointerEvents = Ji(a == null ? void 0 : a.pointerEvents) || ""),
          (o.transform = l ? l(this.latestValues, "") : "none");
        return;
      }
      const u = this.getLead();
      if (!this.projectionDelta || !this.layout || !u.target) {
        this.options.layoutId &&
          ((o.opacity =
            this.latestValues.opacity !== void 0
              ? this.latestValues.opacity
              : 1),
          (o.pointerEvents = Ji(a == null ? void 0 : a.pointerEvents) || "")),
          this.hasProjected &&
            !Xt(this.latestValues) &&
            ((o.transform = l ? l({}, "") : "none"), (this.hasProjected = !1));
        return;
      }
      o.visibility = "";
      const c = u.animationValues || u.latestValues;
      this.applyTransformsToTarget();
      let f = Ew(this.projectionDeltaWithTransform, this.treeScale, c);
      l && (f = l(c, f)), (o.transform = f);
      const { x: d, y: g } = this.projectionDelta;
      (o.transformOrigin = `${d.origin * 100}% ${g.origin * 100}% 0`),
        u.animationValues
          ? (o.opacity =
              u === this
                ? c.opacity ?? this.latestValues.opacity ?? 1
                : this.preserveOpacity
                ? this.latestValues.opacity
                : c.opacityExit)
          : (o.opacity =
              u === this
                ? c.opacity !== void 0
                  ? c.opacity
                  : ""
                : c.opacityExit !== void 0
                ? c.opacityExit
                : 0);
      for (const x in Jr) {
        if (c[x] === void 0) continue;
        const { correct: y, applyTo: E, isCSSVariable: m } = Jr[x],
          p = f === "none" ? c[x] : y(c[x], u);
        if (E) {
          const h = E.length;
          for (let v = 0; v < h; v++) o[E[v]] = p;
        } else
          m ? (this.options.visualElement.renderState.vars[x] = p) : (o[x] = p);
      }
      this.options.layoutId &&
        (o.pointerEvents =
          u === this ? Ji(a == null ? void 0 : a.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      this.root.nodes.forEach((o) => {
        var a;
        return (a = o.currentAnimation) == null ? void 0 : a.stop();
      }),
        this.root.nodes.forEach(Hf),
        this.root.sharedNodes.clear();
    }
  };
}
function Lw(e) {
  e.updateLayout();
}
function Nw(e) {
  var n;
  const t = ((n = e.resumeFrom) == null ? void 0 : n.snapshot) || e.snapshot;
  if (e.isLead() && e.layout && t && e.hasListeners("didUpdate")) {
    const { layoutBox: r, measuredBox: i } = e.layout,
      { animationType: s } = e.options,
      o = t.source !== e.layout.source;
    s === "size"
      ? _e((f) => {
          const d = o ? t.measuredBox[f] : t.layoutBox[f],
            g = xe(d);
          (d.min = r[f].min), (d.max = d.min + g);
        })
      : Hm(s, t.layoutBox, r) &&
        _e((f) => {
          const d = o ? t.measuredBox[f] : t.layoutBox[f],
            g = xe(r[f]);
          (d.max = d.min + g),
            e.relativeTarget &&
              !e.currentAnimation &&
              ((e.isProjectionDirty = !0),
              (e.relativeTarget[f].max = e.relativeTarget[f].min + g));
        });
    const a = Rn();
    Nr(a, r, t.layoutBox);
    const l = Rn();
    o ? Nr(l, e.applyTransform(i, !0), t.measuredBox) : Nr(l, r, t.layoutBox);
    const u = !Bm(a);
    let c = !1;
    if (!e.resumeFrom) {
      const f = e.getClosestProjectingParent();
      if (f && !f.resumeFrom) {
        const { snapshot: d, layout: g } = f;
        if (d && g) {
          const x = q();
          Dr(x, t.layoutBox, d.layoutBox);
          const y = q();
          Dr(y, r, g.layoutBox),
            Um(x, y) || (c = !0),
            f.options.layoutRoot &&
              ((e.relativeTarget = y),
              (e.relativeTargetOrigin = x),
              (e.relativeParent = f));
        }
      }
    }
    e.notifyListeners("didUpdate", {
      layout: r,
      snapshot: t,
      delta: l,
      layoutDelta: a,
      hasLayoutChanged: u,
      hasRelativeLayoutChanged: c,
    });
  } else if (e.isLead()) {
    const { onExitComplete: r } = e.options;
    r && r();
  }
  e.options.transition = void 0;
}
function Dw(e) {
  e.parent &&
    (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty),
    e.isSharedProjectionDirty ||
      (e.isSharedProjectionDirty = !!(
        e.isProjectionDirty ||
        e.parent.isProjectionDirty ||
        e.parent.isSharedProjectionDirty
      )),
    e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty));
}
function Aw(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function Rw(e) {
  e.clearSnapshot();
}
function Hf(e) {
  e.clearMeasurements();
}
function Kf(e) {
  e.isLayoutDirty = !1;
}
function jw(e) {
  const { visualElement: t } = e.options;
  t && t.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"),
    e.resetTransform();
}
function Gf(e) {
  e.finishAnimation(),
    (e.targetDelta = e.relativeTarget = e.target = void 0),
    (e.isProjectionDirty = !0);
}
function Vw(e) {
  e.resolveTargetDelta();
}
function Ow(e) {
  e.calcProjection();
}
function _w(e) {
  e.resetSkewAndRotation();
}
function Iw(e) {
  e.removeLeadSnapshot();
}
function Qf(e, t, n) {
  (e.translate = G(t.translate, 0, n)),
    (e.scale = G(t.scale, 1, n)),
    (e.origin = t.origin),
    (e.originPoint = t.originPoint);
}
function Yf(e, t, n, r) {
  (e.min = G(t.min, n.min, r)), (e.max = G(t.max, n.max, r));
}
function Fw(e, t, n, r) {
  Yf(e.x, t.x, n.x, r), Yf(e.y, t.y, n.y, r);
}
function zw(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
const bw = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  Xf = (e) =>
    typeof navigator < "u" &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().includes(e),
  Zf = Xf("applewebkit/") && !Xf("chrome/") ? Math.round : Ue;
function Jf(e) {
  (e.min = Zf(e.min)), (e.max = Zf(e.max));
}
function Bw(e) {
  Jf(e.x), Jf(e.y);
}
function Hm(e, t, n) {
  return (
    e === "position" || (e === "preserve-aspect" && !Gx($f(t), $f(n), 0.2))
  );
}
function Uw(e) {
  var t;
  return e !== e.root && ((t = e.scroll) == null ? void 0 : t.wasRoot);
}
const $w = Wm({
    attachResizeListener: (e, t) => qr(e, "resize", t),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  zo = { current: void 0 },
  Km = Wm({
    measureScroll: (e) => ({ x: e.scrollLeft, y: e.scrollTop }),
    defaultParent: () => {
      if (!zo.current) {
        const e = new $w({});
        e.mount(window), e.setOptions({ layoutScroll: !0 }), (zo.current = e);
      }
      return zo.current;
    },
    resetTransform: (e, t) => {
      e.style.transform = t !== void 0 ? t : "none";
    },
    checkIsScrollRoot: (e) => window.getComputedStyle(e).position === "fixed",
  }),
  Ww = {
    pan: { Feature: lw },
    drag: { Feature: aw, ProjectionNode: Km, MeasureLayout: Fm },
  };
function qf(e, t, n) {
  const { props: r } = e;
  e.animationState &&
    r.whileHover &&
    e.animationState.setActive("whileHover", n === "Start");
  const i = "onHover" + n,
    s = r[i];
  s && B.postRender(() => s(t, ci(t)));
}
class Hw extends $t {
  mount() {
    const { current: t } = this.node;
    t &&
      (this.unmount = c1(
        t,
        (n, r) => (qf(this.node, r, "Start"), (i) => qf(this.node, i, "End"))
      ));
  }
  unmount() {}
}
class Kw extends $t {
  constructor() {
    super(...arguments), (this.isActive = !1);
  }
  onFocus() {
    let t = !1;
    try {
      t = this.node.current.matches(":focus-visible");
    } catch {
      t = !0;
    }
    !t ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !0),
      (this.isActive = !0));
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !1),
      (this.isActive = !1));
  }
  mount() {
    this.unmount = oi(
      qr(this.node.current, "focus", () => this.onFocus()),
      qr(this.node.current, "blur", () => this.onBlur())
    );
  }
  unmount() {}
}
function ed(e, t, n) {
  const { props: r } = e;
  if (e.current instanceof HTMLButtonElement && e.current.disabled) return;
  e.animationState &&
    r.whileTap &&
    e.animationState.setActive("whileTap", n === "Start");
  const i = "onTap" + (n === "End" ? "" : n),
    s = r[i];
  s && B.postRender(() => s(t, ci(t)));
}
class Gw extends $t {
  mount() {
    const { current: t } = this.node;
    t &&
      (this.unmount = h1(
        t,
        (n, r) => (
          ed(this.node, r, "Start"),
          (i, { success: s }) => ed(this.node, i, s ? "End" : "Cancel")
        ),
        { useGlobalTarget: this.node.props.globalTapTarget }
      ));
  }
  unmount() {}
}
const nl = new WeakMap(),
  bo = new WeakMap(),
  Qw = (e) => {
    const t = nl.get(e.target);
    t && t(e);
  },
  Yw = (e) => {
    e.forEach(Qw);
  };
function Xw({ root: e, ...t }) {
  const n = e || document;
  bo.has(n) || bo.set(n, {});
  const r = bo.get(n),
    i = JSON.stringify(t);
  return r[i] || (r[i] = new IntersectionObserver(Yw, { root: e, ...t })), r[i];
}
function Zw(e, t, n) {
  const r = Xw(t);
  return (
    nl.set(e, n),
    r.observe(e),
    () => {
      nl.delete(e), r.unobserve(e);
    }
  );
}
const Jw = { some: 0, all: 1 };
class qw extends $t {
  constructor() {
    super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1);
  }
  startObserver() {
    this.unmount();
    const { viewport: t = {} } = this.node.getProps(),
      { root: n, margin: r, amount: i = "some", once: s } = t,
      o = {
        root: n ? n.current : void 0,
        rootMargin: r,
        threshold: typeof i == "number" ? i : Jw[i],
      },
      a = (l) => {
        const { isIntersecting: u } = l;
        if (
          this.isInView === u ||
          ((this.isInView = u), s && !u && this.hasEnteredView)
        )
          return;
        u && (this.hasEnteredView = !0),
          this.node.animationState &&
            this.node.animationState.setActive("whileInView", u);
        const { onViewportEnter: c, onViewportLeave: f } = this.node.getProps(),
          d = u ? c : f;
        d && d(l);
      };
    return Zw(this.node.current, o, a);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u") return;
    const { props: t, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(e2(t, n)) && this.startObserver();
  }
  unmount() {}
}
function e2({ viewport: e = {} }, { viewport: t = {} } = {}) {
  return (n) => e[n] !== t[n];
}
const t2 = {
    inView: { Feature: qw },
    tap: { Feature: Gw },
    focus: { Feature: Kw },
    hover: { Feature: Hw },
  },
  n2 = { layout: { ProjectionNode: Km, MeasureLayout: Fm } },
  r2 = { ...Bx, ...t2, ...Ww, ...n2 },
  N = rx(r2, gx);
function Zs(e) {
  const t = si(() => dn(e)),
    { isStatic: n } = T.useContext(ui);
  if (n) {
    const [, r] = T.useState(e);
    T.useEffect(() => t.on("change", r), []);
  }
  return t;
}
function Gm(e, t) {
  const n = Zs(t()),
    r = () => n.set(t());
  return (
    r(),
    eu(() => {
      const i = () => B.preRender(r, !1, !0),
        s = e.map((o) => o.on("change", i));
      return () => {
        s.forEach((o) => o()), yt(r);
      };
    }),
    n
  );
}
function i2(e) {
  (Mr.current = []), e();
  const t = Gm(Mr.current, e);
  return (Mr.current = void 0), t;
}
function s2(e, t, n, r) {
  if (typeof e == "function") return i2(e);
  const i = g1(t, n, r);
  return Array.isArray(e) ? td(e, i) : td([e], ([s]) => i(s));
}
function td(e, t) {
  const n = si(() => []);
  return Gm(e, () => {
    n.length = 0;
    const r = e.length;
    for (let i = 0; i < r; i++) n[i] = e[i].get();
    return t(n);
  });
}
function Qm(e, t = {}) {
  const { isStatic: n } = T.useContext(ui),
    r = () => (ae(e) ? e.get() : e);
  if (n) return s2(r);
  const i = Zs(r());
  return T.useInsertionEffect(() => y1(i, e, t), [i, JSON.stringify(t)]), i;
}
function o2({ title: e, titleId: t, ...n }, r) {
  return T.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: r,
        "aria-labelledby": t,
      },
      n
    ),
    e ? T.createElement("title", { id: t }, e) : null,
    T.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18",
    })
  );
}
const a2 = T.forwardRef(o2);
function l2({ title: e, titleId: t, ...n }, r) {
  return T.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: r,
        "aria-labelledby": t,
      },
      n
    ),
    e ? T.createElement("title", { id: t }, e) : null,
    T.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z",
    })
  );
}
const u2 = T.forwardRef(l2);
function c2({ title: e, titleId: t, ...n }, r) {
  return T.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: r,
        "aria-labelledby": t,
      },
      n
    ),
    e ? T.createElement("title", { id: t }, e) : null,
    T.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z",
    })
  );
}
const f2 = T.forwardRef(c2);
function d2({ title: e, titleId: t, ...n }, r) {
  return T.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: r,
        "aria-labelledby": t,
      },
      n
    ),
    e ? T.createElement("title", { id: t }, e) : null,
    T.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    })
  );
}
const p2 = T.forwardRef(d2);
function h2({ title: e, titleId: t, ...n }, r) {
  return T.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: r,
        "aria-labelledby": t,
      },
      n
    ),
    e ? T.createElement("title", { id: t }, e) : null,
    T.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z",
    })
  );
}
const m2 = T.forwardRef(h2);
function g2({ title: e, titleId: t, ...n }, r) {
  return T.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: r,
        "aria-labelledby": t,
      },
      n
    ),
    e ? T.createElement("title", { id: t }, e) : null,
    T.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    })
  );
}
const Ym = T.forwardRef(g2);
function y2({ title: e, titleId: t, ...n }, r) {
  return T.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: r,
        "aria-labelledby": t,
      },
      n
    ),
    e ? T.createElement("title", { id: t }, e) : null,
    T.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z",
    }),
    T.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
    })
  );
}
const v2 = T.forwardRef(y2);
function x2({ title: e, titleId: t, ...n }, r) {
  return T.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: r,
        "aria-labelledby": t,
      },
      n
    ),
    e ? T.createElement("title", { id: t }, e) : null,
    T.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
    })
  );
}
const w2 = T.forwardRef(x2);
function S2({ title: e, titleId: t, ...n }, r) {
  return T.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: r,
        "aria-labelledby": t,
      },
      n
    ),
    e ? T.createElement("title", { id: t }, e) : null,
    T.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z",
    })
  );
}
const k2 = T.forwardRef(S2);
function T2({ title: e, titleId: t, ...n }, r) {
  return T.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: r,
        "aria-labelledby": t,
      },
      n
    ),
    e ? T.createElement("title", { id: t }, e) : null,
    T.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z",
    })
  );
}
const C2 = T.forwardRef(T2),
  E2 = { copy: S.jsx(m2, { className: "w-4 h-4" }) },
  P2 = ({ extractionState: e, onCopy: t, copyStatus: n }) =>
    S.jsx(S.Fragment, {
      children: S.jsx(Ms, {
        children:
          e.result &&
          e.result !== "Click a button to extract usernames." &&
          S.jsx("div", {
            className:
              "flex items-center gap-2 sm:gap-3 lg:gap-4 self-start flex-wrap fb-engager-action-buttons",
            children: S.jsxs(
              N.button,
              {
                initial: { opacity: 0, filter: "blur(5px)" },
                animate: { opacity: 1, filter: "blur(0px)" },
                exit: { opacity: 0, filter: "blur(5px)" },
                transition: { duration: 0.3, ease: "easeOut" },
                onClick: t,
                className:
                  "px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-xs font-semibold cursor-pointer flex items-center gap-1.5 sm:gap-2 hover:bg-white/12 transition-colors min-h-[32px] sm:min-h-[36px] w-[80px] bg-white/8 text-white border border-white/20",
                children: [
                  E2.copy,
                  S.jsx(Ms, {
                    mode: "wait",
                    children:
                      n === "Copied!"
                        ? S.jsx(
                            N.span,
                            {
                              initial: { opacity: 0, scale: 0.8 },
                              animate: { opacity: 1, scale: 1 },
                              exit: { opacity: 0, scale: 0.8 },
                              transition: { duration: 0.2, ease: "easeOut" },
                              className: "text-green-400",
                              children: "Copied",
                            },
                            "copied"
                          )
                        : S.jsxs(
                            N.span,
                            {
                              initial: { opacity: 0, scale: 0.8 },
                              animate: { opacity: 1, scale: 1 },
                              exit: { opacity: 0, scale: 0.8 },
                              transition: { duration: 0.2, ease: "easeOut" },
                              children: [
                                S.jsx("span", {
                                  className: "hidden xs:inline",
                                  children: "Copy Usernames",
                                }),
                                S.jsx("span", {
                                  className: "xs:hidden",
                                  children: "Copy",
                                }),
                              ],
                            },
                            "copy-text"
                          ),
                  }),
                ],
              },
              "copy"
            ),
          }),
      }),
    }),
  St = {
    comment: S.jsx(f2, { className: "w-4 h-4" }),
    check: S.jsx(p2, { className: "w-4 h-4" }),
    document: S.jsx(w2, { className: "w-4 h-4" }),
    reset: S.jsx(k2, { className: "w-4 h-4" }),
  },
  M2 = ({
    extractionState: e,
    timerState: t,
    onExtraction: n,
    postState: r,
  }) => {
    const i = () =>
        e.isExtracting
          ? { icon: null, text: "Extracting..." }
          : t.countdownTime > 0
          ? { icon: null, text: `Wait ${t.countdownTime}s` }
          : e.isExtractionDisabled
          ? e.errorType === "no-comments"
            ? { icon: St.check, text: "No Comments Available" }
            : e.errorType === "no-more-uncaptured"
            ? { icon: St.check, text: "No More Available" }
            : { icon: St.check, text: "Extraction Disabled" }
          : e.errorType === "not-on-facebook"
          ? { icon: St.comment, text: "Not on Facebook" }
          : e.errorType === "extension-error"
          ? { icon: St.reset, text: "Extension Error" }
          : r.postTitle
          ? e.capturedUsernames > 0
            ? { icon: St.document, text: "Extract More" }
            : { icon: St.comment, text: "Extract from Comments" }
          : { icon: St.comment, text: "No Post Detected" },
      s = T.useMemo(
        () =>
          e.isExtracting
            ? "extracting"
            : e.isExtractionDisabled
            ? "disabled"
            : e.errorType === "not-on-facebook"
            ? "not-on-facebook"
            : e.errorType === "extension-error"
            ? "extension-error"
            : r.postTitle
            ? e.capturedUsernames > 0
              ? "has-results"
              : "default"
            : "no-post",
        [
          e.isExtracting,
          e.isExtractionDisabled,
          e.capturedUsernames,
          e.errorType,
          r.postTitle,
        ]
      );
    return S.jsx("div", {
      className: "flex flex-col gap-3 sm:gap-4 flex-shrink-0",
      children: S.jsxs(N.button, {
        initial: { opacity: 0, filter: "blur(10px)" },
        animate: { opacity: 1, filter: "blur(0px)" },
        transition: { duration: 0.5, delay: 0.7, ease: "easeOut" },
        onClick: n,
        disabled:
          e.isExtracting ||
          t.countdownTime > 0 ||
          e.isExtractionDisabled ||
          e.errorType === "not-on-facebook" ||
          e.errorType === "extension-error" ||
          !r.postTitle,
        className: `w-full px-3 sm:px-4 py-2.5 sm:py-3 lg:py-3 relative overflow-hidden rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 sm:gap-3 transition-all duration-200 ${
          e.isExtracting ||
          t.countdownTime > 0 ||
          e.isExtractionDisabled ||
          !r.postTitle
            ? "bg-gradient-to-br from-slate-600/50 to-slate-700/50 text-white/60 cursor-not-allowed border border-slate-500/30"
            : "bg-gradient-to-br from-[#00d4ff] to-[#090979] text-white cursor-pointer hover:bg-gradient-to-br hover:from-[#00d4ff]/90 hover:to-[#090979]/90 border border-cyan-400/30"
        }`,
        children: [
          e.isExtracting &&
            S.jsx(S.Fragment, {
              children: S.jsx(N.div, {
                initial: { width: "0%" },
                animate: { width: "100%" },
                transition: { duration: 15, ease: "linear" },
                className:
                  "absolute top-0 left-0 h-full bg-gradient-to-r from-[#00d4ff]/80 to-[#090979]/80 rounded-lg",
              }),
            }),
          S.jsx(Ms, {
            mode: "wait",
            children: S.jsx(
              N.div,
              {
                initial: { opacity: 1, scale: 1 },
                animate: e.isExtracting
                  ? { opacity: [1, 0.8, 1], scale: [1, 1.02, 1] }
                  : { opacity: 1, scale: 1 },
                transition: e.isExtracting
                  ? { duration: 1.5, repeat: 1 / 0, ease: "easeInOut" }
                  : { duration: 0.2, ease: "easeOut" },
                className:
                  "relative z-10 flex items-center gap-2 sm:gap-3 justify-center",
                children: (() => {
                  const { icon: o, text: a } = i();
                  return S.jsxs(S.Fragment, { children: [o, " ", a] });
                })(),
              },
              s
            ),
          }),
        ],
      }),
    });
  },
  L2 = ({ settingsState: e }) =>
    S.jsx(N.div, {
      initial: { opacity: 0, filter: "blur(10px)" },
      animate: { opacity: 1, filter: "blur(0px)" },
      transition: { duration: 0.8, delay: 1.8, ease: "easeOut" },
      className:
        "mt-auto px-3 sm:px-4 lg:px-5 py-3 sm:py-4 text-xs text-white/70 leading-relaxed bg-white/5 rounded-lg text-center flex-shrink-0 fb-engager-footer border border-white/10",
      layout: "position",
      children: S.jsxs(N.div, {
        className: "text-xs flex items-center justify-center gap-2",
        layout: "position",
        children: [
          S.jsxs(
            N.span,
            {
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.3, ease: "easeOut" },
              className: "inline-flex items-center gap-1",
              children: [
                S.jsx(Ym, { className: "w-3 h-3 text-cyan-300" }),
                "Cooldown ",
                e.cooldownSetting,
                "s",
              ],
            },
            `cooldown-${e.cooldownSetting}`
          ),
          S.jsx("span", { className: "text-white/40", children: "•" }),
          S.jsxs(
            N.span,
            {
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.3, ease: "easeOut" },
              className: "inline-flex items-center gap-1",
              children: [
                S.jsx(u2, { className: "w-3 h-3 text-cyan-300" }),
                "Limit ",
                e.extractionCountLimit,
                " usernames",
              ],
            },
            `limit-${e.extractionCountLimit}`
          ),
        ],
      }),
    }),
  N2 = { settings: S.jsx(v2, { className: "w-4 h-4" }) },
  D2 = ({ onSettingsClick: e }) =>
    S.jsxs("div", {
      className:
        "flex items-center justify-between mb-4 sm:mb-5 lg:mb-6 pb-3 sm:pb-4 lg:pb-5 border-b border-white/15 flex-shrink-0 fb-engager-header",
      children: [
        S.jsxs("div", {
          className:
            "flex items-center gap-2 sm:gap-3 fb-engager-title-section",
          children: [
            S.jsx(N.div, {
              initial: { opacity: 0, filter: "blur(10px)" },
              animate: { opacity: 1, filter: "blur(0px)" },
              transition: { duration: 0.8, delay: 0.2, ease: "easeOut" },
              className:
                "w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shadow-lg shadow-black/20 flex-shrink-0 overflow-hidden",
              children: S.jsx("img", {
                src: "icon64.png",
                alt: "FB Engager Logo",
                className: "w-full h-full object-cover rounded-lg",
              }),
            }),
            S.jsxs("div", {
              className: "flex flex-col gap-0.5 min-w-0 flex-1",
              children: [
                S.jsx(N.h1, {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, delay: 0.4, ease: "easeOut" },
                  className:
                    "text-lg sm:text-xl lg:text-xl font-bold text-white m-0 drop-shadow-lg leading-tight fb-engager-title truncate",
                  children: "FB Engager",
                }),
                S.jsx(N.p, {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, delay: 0.5, ease: "easeOut" },
                  className:
                    "text-xs text-white/70 font-normal m-0 leading-relaxed fb-engager-subtitle hidden sm:block",
                  children: "Extract mentionable users from comments",
                }),
              ],
            }),
          ],
        }),
        S.jsx(N.button, {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.6, delay: 0.5, ease: "easeOut" },
          onClick: e,
          className:
            "bg-white/10 border border-white/20 rounded-xl p-2 sm:p-3 text-white flex items-center justify-center flex-shrink-0 hover:bg-white/15 transition-colors min-w-[40px] sm:min-w-[44px] min-h-[40px] sm:min-h-[44px]",
          title: "Open Settings",
          children: N2.settings,
        }),
      ],
    }),
  Bo = al.memo(({ value: e, className: t }) => {
    const n = T.useRef(null),
      r = Zs(0),
      i = Qm(r, { damping: 50, stiffness: 300, mass: 0.5 });
    return (
      T.useEffect(() => {
        r.set(e);
      }, [r, e]),
      T.useEffect(
        () =>
          i.on("change", (o) => {
            n.current &&
              (n.current.textContent = Math.round(o).toLocaleString());
          }),
        [i]
      ),
      S.jsx("span", { className: t, ref: n })
    );
  }),
  A2 = al.memo(
    ({
      postTitle: e,
      posterName: t,
      totalComments: n,
      capturedUsernames: r,
      consecutiveEmptyExtractions: i,
      isExtractionDisabled: s,
    }) =>
      S.jsxs(N.div, {
        initial: { opacity: 0, scale: 0.95, y: -10 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: -10 },
        transition: {
          duration: 0.15,
          ease: [0.4, 0, 0.2, 1],
          exit: { duration: 0.1 },
        },
        className:
          "bg-gradient-to-br from-cyan-400/10 to-blue-900/10 rounded-lg p-3 sm:p-4 lg:p-5 mb-2 sm:mb-3 lg:mb-4 border border-cyan-400/20 backdrop-blur-sm",
        layout: !0,
        children: [
          S.jsxs(N.div, {
            className:
              "text-xs text-cyan-400 font-semibold mb-2 sm:mb-3 flex items-center gap-1 uppercase tracking-wider",
            layout: "position",
            children: [
              S.jsx(N.span, {
                className: "text-xs sm:text-sm",
                animate: { rotate: [0, 10, 0] },
                transition: { duration: 0.5, delay: 0.1 },
                children: "📄",
              }),
              S.jsx(N.span, {
                className: "truncate",
                layout: "position",
                children: t ? `${t}'s Post` : "Facebook Post",
              }),
            ],
          }),
          S.jsx(N.div, {
            className:
              "text-xs sm:text-sm text-white font-medium leading-relaxed mb-2 sm:mb-3 lg:mb-4 line-clamp-3",
            layout: "position",
            children: e || "Loading post information...",
          }),
          S.jsxs(N.div, {
            className:
              "flex flex-wrap gap-2 sm:gap-3 lg:gap-4 text-xs text-white/80",
            layout: "position",
            children: [
              S.jsxs(N.div, {
                className: "flex items-center gap-1",
                layout: "position",
                initial: { opacity: 0, x: -10 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: 0.05 },
                children: [
                  S.jsx("span", { children: "💬" }),
                  S.jsx(Bo, { value: n, className: "font-medium" }),
                  " ",
                  "comments",
                ],
              }),
              S.jsxs(N.div, {
                className: "flex items-center gap-1",
                layout: "position",
                initial: { opacity: 0, x: -10 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: 0.1 },
                children: [
                  S.jsx("span", { children: "👥" }),
                  S.jsx(Bo, {
                    value: r,
                    className: `font-medium ${
                      r === 0 ? "text-orange-400 font-bold" : ""
                    }`,
                  }),
                  " ",
                  "usernames captured",
                ],
              }),
              i > 0 &&
                S.jsxs(N.div, {
                  className: `flex items-center gap-1 ${
                    i >= 2 ? "text-red-400" : "text-amber-400"
                  }`,
                  layout: "position",
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { delay: 0.15 },
                  children: [
                    S.jsx(N.span, {
                      animate: i >= 2 ? { rotate: [0, -10, 10, 0] } : {},
                      transition: { duration: 0.5 },
                      children: "⚠️",
                    }),
                    S.jsx(Bo, { value: i, className: "font-medium" }),
                    " ",
                    "empty",
                  ],
                }),
              s &&
                S.jsxs(N.div, {
                  className: "flex items-center gap-1 text-red-400",
                  layout: "position",
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { delay: 0.2 },
                  children: [
                    S.jsx(N.span, {
                      animate: { rotate: [0, -5, 5, 0] },
                      transition: {
                        duration: 0.3,
                        repeat: 1 / 0,
                        repeatDelay: 2,
                      },
                      children: "🚫",
                    }),
                    S.jsx("span", {
                      className: "font-medium",
                      children: "Disabled",
                    }),
                  ],
                }),
            ],
          }),
        ],
      })
  );
function R2({ value: e, direction: t = "up", className: n }) {
  const r = T.useRef(null),
    i = Zs(t === "down" ? e : 0),
    s = Qm(i, { damping: 80, stiffness: 100 });
  return (
    T.useEffect(() => {
      i.set(e);
    }, [i, e]),
    T.useEffect(() => {
      r.current &&
        (r.current.textContent = Intl.NumberFormat("en-US").format(
          e.toFixed(0)
        ));
    }, [e]),
    T.useEffect(
      () =>
        s.on("change", (o) => {
          r.current &&
            (r.current.textContent = Intl.NumberFormat("en-US").format(
              o.toFixed(0)
            ));
        }),
      [s]
    ),
    S.jsx("span", { className: n, ref: r })
  );
}
const j2 = ({ postState: e, extractionState: t }) => {
    const [n, r] = T.useState([]),
      [i, s] = T.useState(!1),
      o = T.useRef(t.result),
      a = T.useRef(!0),
      l = (c) =>
        !c ||
        c === "Click a button to extract usernames." ||
        c === "0 usernames captured"
          ? []
          : c
              .split(
                `
`
              )
              .filter((f) => f.trim());
    T.useEffect(() => {
      const c = t.result,
        f = o.current;
      if (a.current) {
        (a.current = !1), (o.current = c);
        return;
      }
      if (c !== f && c !== "Click a button to extract usernames.") {
        const d = l(c),
          g = f === "Click a button to extract usernames." ? [] : l(f),
          x = d.filter((y) => !g.includes(y));
        x.length > 0
          ? (s(!0),
            x.forEach((y, E) => {
              setTimeout(() => {
                r((m) => [...m, y]),
                  E === x.length - 1 && setTimeout(() => s(!1), 300);
              }, E * 100);
            }))
          : s(!1);
      } else c === "Click a button to extract usernames." && (r([]), s(!1));
      o.current = c;
    }, [t.result]);
    const u = l(t.result);
    return S.jsx(N.div, {
      className: "flex flex-col flex-1 min-h-0 gap-2 sm:gap-3",
      layout: "position",
      children: S.jsx(N.div, {
        className: "flex-1 flex flex-col min-h-0",
        layout: "position",
        children: S.jsxs(N.div, {
          initial: { opacity: 0, filter: "blur(10px)" },
          animate: { opacity: 1, filter: "blur(0px)" },
          transition: { duration: 0.6, delay: 1.2, ease: "easeOut" },
          className:
            "p-3 sm:p-4 lg:p-5 bg-white/5 border border-white/10 rounded-lg flex-1 text-xs sm:text-sm leading-relaxed whitespace-pre-line break-all text-white overflow-y-auto min-h-[200px] sm:min-h-[250px] lg:min-h-[300px] relative fb-engager-results font-mono",
          layout: "position",
          children: [
            S.jsx("style", {
              children: `
          div::-webkit-scrollbar {
            display: none;
          }
        `,
            }),
            t.result === "Click a button to extract usernames."
              ? S.jsx(N.div, {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, delay: 1.8, ease: "easeOut" },
                  className:
                    "flex flex-col items-center justify-center h-full text-white/60 text-center gap-2 sm:gap-3",
                  layout: "position",
                  children: e.postTitle
                    ? S.jsxs(N.div, {
                        layout: "position",
                        className: "flex flex-col items-center gap-2 sm:gap-3",
                        children: [
                          S.jsx(N.div, {
                            animate: {
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, -5, 0],
                            },
                            transition: {
                              duration: 2,
                              repeat: 1 / 0,
                              repeatDelay: 3,
                              ease: "easeInOut",
                            },
                            className: "text-2xl sm:text-3xl",
                            children: "👥",
                          }),
                          S.jsx(N.div, {
                            layout: "position",
                            className: "text-sm sm:text-base font-medium",
                            children:
                              "Ready to extract usernames from comments",
                          }),
                          S.jsx(N.div, {
                            layout: "position",
                            className:
                              "text-xs sm:text-sm text-white/50 max-w-[280px] sm:max-w-[300px] px-2",
                            children:
                              'Click "Extract from Comments" to start collecting usernames from the current post',
                          }),
                        ],
                      })
                    : S.jsxs(N.div, {
                        layout: "position",
                        className:
                          "flex flex-col items-center pt-16 sm:pt-20 lg:pt-24 gap-2 sm:gap-3",
                        children: [
                          S.jsx(N.div, {
                            animate: {
                              scale: [1, 1.05, 1],
                              opacity: [0.7, 1, 0.7],
                            },
                            transition: {
                              duration: 3,
                              repeat: 1 / 0,
                              ease: "easeInOut",
                            },
                            className: "text-2xl sm:text-3xl",
                            children: "📄",
                          }),
                          S.jsx(N.div, {
                            layout: "position",
                            className: "text-sm sm:text-base font-medium",
                            children: "No post detected",
                          }),
                          S.jsx(N.div, {
                            layout: "position",
                            className:
                              "text-xs sm:text-sm text-white/50 max-w-[280px] sm:max-w-[300px] px-2",
                            children:
                              "Open a Facebook post to start extracting usernames from comments",
                          }),
                        ],
                      }),
                })
              : t.result === "0 usernames captured"
              ? S.jsxs(N.div, {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.4, ease: "easeOut" },
                  className:
                    "flex flex-col items-center justify-center h-full text-white/60 text-center gap-3 sm:gap-4",
                  layout: "position",
                  children: [
                    S.jsx(N.div, {
                      animate: { scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] },
                      transition: {
                        duration: 2,
                        repeat: 1 / 0,
                        ease: "easeInOut",
                      },
                      className: "text-3xl sm:text-4xl",
                      children: "🔍",
                    }),
                    S.jsx(N.div, {
                      layout: "position",
                      className:
                        "text-base sm:text-lg font-medium text-orange-300",
                      children: "0 usernames captured",
                    }),
                    S.jsx(N.div, {
                      layout: "position",
                      className:
                        "text-xs sm:text-sm text-white/50 max-w-[280px] sm:max-w-[300px] px-2",
                      children:
                        "No comments were found on this post, or the comments haven't loaded yet. Try scrolling down to load more comments.",
                    }),
                  ],
                })
              : S.jsxs(N.div, {
                  layout: "position",
                  className: "flex flex-col h-full",
                  children: [
                    S.jsxs(N.div, {
                      initial: { opacity: 0, scale: 0.9 },
                      animate: { opacity: 1, scale: 1 },
                      transition: {
                        duration: 0.4,
                        delay: 0.2,
                        ease: "easeOut",
                      },
                      className:
                        "absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 text-xs text-white/50 bg-cyan-400/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-cyan-400/20 flex items-center gap-1 z-10",
                      layout: "position",
                      children: [
                        S.jsx(R2, {
                          value: t.capturedUsernames,
                          className: "font-medium",
                        }),
                        " ",
                        "total",
                      ],
                    }),
                    S.jsxs(N.div, {
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      transition: {
                        duration: 0.6,
                        delay: 0.4,
                        ease: "easeOut",
                      },
                      className: "pt-8 sm:pt-10 space-y-1",
                      layout: "position",
                      children: [
                        u.map((c, f) => {
                          const d = n.includes(c);
                          return S.jsx(
                            N.div,
                            {
                              initial: d
                                ? {
                                    opacity: 0,
                                    x: -20,
                                    scale: 0.8,
                                    filter: "blur(4px)",
                                  }
                                : {
                                    opacity: 1,
                                    x: 0,
                                    scale: 1,
                                    filter: "blur(0px)",
                                  },
                              animate: {
                                opacity: 1,
                                x: 0,
                                scale: 1,
                                filter: "blur(0px)",
                              },
                              transition: d
                                ? {
                                    duration: 0.4,
                                    delay: f * 0.05,
                                    ease: "easeOut",
                                    layout: { duration: 0.3 },
                                  }
                                : { duration: 0.2, ease: "easeOut" },
                              layout: "position",
                              className:
                                "text-cyan-300 hover:text-cyan-200 transition-colors duration-200",
                              children: c,
                            },
                            c
                          );
                        }),
                        i &&
                          S.jsxs(N.div, {
                            initial: { opacity: 0 },
                            animate: { opacity: 1 },
                            exit: { opacity: 0 },
                            className:
                              "flex items-center gap-2 text-cyan-400 text-xs mt-2",
                            children: [
                              S.jsx(N.div, {
                                animate: { rotate: 360 },
                                transition: {
                                  duration: 1,
                                  repeat: 1 / 0,
                                  ease: "linear",
                                },
                                className:
                                  "w-3 h-3 border border-cyan-400 border-t-transparent rounded-full",
                              }),
                              "Adding new usernames...",
                            ],
                          }),
                      ],
                    }),
                  ],
                }),
          ],
        }),
      }),
    });
  },
  Uo = {
    back: S.jsx(a2, { className: "w-4 h-4" }),
    clock: S.jsx(Ym, { className: "w-5 h-5" }),
    list: S.jsx(C2, { className: "w-5 h-5" }),
  };
function nd({ icon: e, title: t, description: n, children: r, delay: i = 0 }) {
  return S.jsxs(N.div, {
    ...me.slideIn(i),
    className: "bg-white/5 border border-white/10 rounded-lg p-5 setting-card",
    children: [
      S.jsxs("div", {
        className: "flex items-center gap-3 mb-4",
        children: [
          S.jsx(N.div, {
            ...me.fadeIn(i + 0.1),
            className:
              "w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-900 rounded-lg flex items-center justify-center shadow-[0_6px_20px_rgba(0,212,255,0.3)]",
            children: e,
          }),
          S.jsxs("div", {
            children: [
              S.jsx(N.h3, {
                ...me.stagger(i + 0.2),
                className: "text-lg font-semibold text-white mb-1 m-0",
                children: t,
              }),
              S.jsx(N.p, {
                ...me.stagger(i + 0.3),
                className: "text-sm text-white/70 m-0",
                children: n,
              }),
            ],
          }),
        ],
      }),
      r,
    ],
  });
}
const me = {
  page: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: "easeOut" },
  },
  stagger: (e = 0) => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: e, ease: "easeOut" },
  }),
  slideIn: (e = 0) => ({
    initial: { opacity: 0, filter: "blur(5px)", x: -30 },
    animate: { opacity: 1, filter: "blur(0px)", x: 0 },
    transition: { duration: 0.5, delay: e, ease: "easeOut" },
  }),
  fadeIn: (e = 0) => ({
    initial: { opacity: 0, filter: "blur(10px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    transition: { duration: 0.8, delay: e, ease: "easeOut" },
  }),
};
function V2({ onBack: e }) {
  const [t, n] = T.useState({ cooldownSetting: 25, extractionCountLimit: 50 });
  T.useEffect(() => {
    var i;
    typeof chrome < "u" &&
      (i = chrome.storage) != null &&
      i.local &&
      chrome.storage.local.get(
        ["cooldownSetting", "extractionCountLimit"],
        (s) => {
          n({
            cooldownSetting: s.cooldownSetting ?? 25,
            extractionCountLimit: s.extractionCountLimit ?? 50,
          });
        }
      );
  }, []);
  const r = async (i, s) => {
    var o;
    try {
      const a = { ...t, [i]: s };
      n(a),
        await chrome.storage.local.set({ [i]: s }),
        i === "extractionCountLimit" &&
          typeof chrome < "u" &&
          (o = chrome.tabs) != null &&
          o.query &&
          chrome.tabs.query({ active: !0, currentWindow: !0 }, (l) => {
            var u, c;
            (c = (u = l == null ? void 0 : l[0]) == null ? void 0 : u.url) !=
              null &&
              c.includes("facebook.com") &&
              chrome.tabs.sendMessage(
                l[0].id,
                { action: "setExtractionCountLimit", limit: s },
                () => {
                  chrome.runtime.lastError &&
                    console.warn(
                      "Could not update content script:",
                      chrome.runtime.lastError.message
                    );
                }
              );
          });
    } catch (a) {
      console.error("Failed to save setting:", a);
    }
  };
  return S.jsxs(N.div, {
    ...me.page,
    className:
      "w-full h-screen p-5 bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900 text-white relative m-0 border-none flex flex-col overflow-hidden settings-container",
    children: [
      S.jsxs(N.div, {
        ...me.stagger(0.1),
        className:
          "flex items-center justify-between mb-8 pb-4 border-b border-white/15 settings-header",
        children: [
          S.jsx(N.button, {
            ...me.stagger(0.2),
            onClick: e,
            className:
              "bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white cursor-pointer flex items-center gap-2 text-sm",
            children: Uo.back,
          }),
          S.jsx(N.h1, {
            ...me.stagger(0.3),
            className:
              "text-2xl font-bold text-white m-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] settings-title",
            children: "Settings",
          }),
          S.jsx("div", { className: "w-[60px]" }),
          " ",
        ],
      }),
      S.jsxs(N.div, {
        ...me.stagger(0.4),
        className: "flex-1 flex flex-col gap-5",
        children: [
          S.jsxs(nd, {
            icon: Uo.clock,
            title: "Extraction Cooldown",
            description: "Time to wait between extractions",
            delay: 0.5,
            children: [
              S.jsxs(N.div, {
                ...me.fadeIn(0.9),
                className: "flex items-center gap-4",
                children: [
                  S.jsx("input", {
                    type: "range",
                    min: "5",
                    max: "300",
                    value: t.cooldownSetting,
                    onChange: (i) =>
                      r("cooldownSetting", parseInt(i.target.value)),
                    className:
                      "flex-1 h-1.5 bg-white/20 rounded appearance-none outline-none cursor-pointer slider transition-all duration-200 hover:bg-white/30",
                  }),
                  S.jsxs(N.span, {
                    className: "text-sm text-white/70 min-w-[50px]",
                    children: [t.cooldownSetting, "s"],
                  }),
                ],
              }),
              S.jsx(N.div, {
                ...me.stagger(1),
                className: "mt-2.5 text-xs text-white/60 text-center",
                children: "Range: 5 seconds to 5 minutes",
              }),
            ],
          }),
          S.jsxs(nd, {
            icon: Uo.list,
            title: "Extraction Count Limit",
            description: "Maximum usernames to extract per session",
            delay: 1.1,
            children: [
              S.jsxs(N.div, {
                ...me.fadeIn(1.5),
                className: "flex items-center gap-4",
                children: [
                  S.jsx("input", {
                    type: "range",
                    min: "50",
                    max: "2000",
                    step: "50",
                    value: t.extractionCountLimit,
                    onChange: (i) =>
                      r("extractionCountLimit", parseInt(i.target.value)),
                    className:
                      "flex-1 h-1.5 bg-white/20 rounded appearance-none outline-none cursor-pointer slider transition-all duration-200 hover:bg-white/30",
                  }),
                  S.jsx(N.span, {
                    className: "text-sm text-white/70 min-w-[60px]",
                    children: t.extractionCountLimit,
                  }),
                ],
              }),
              S.jsx(N.div, {
                ...me.stagger(1.6),
                className: "mt-2.5 text-xs text-white/60 text-center",
                children: "Range: 50 to 2000 usernames",
              }),
            ],
          }),
        ],
      }),
      S.jsxs(N.div, {
        ...me.stagger(1.5),
        className: "mt-auto pt-5 text-center border-t border-white/10",
        children: [
          S.jsx(N.div, {
            ...me.stagger(1.6),
            className: "text-xs text-white/50 mb-1.5",
            children: "Developed by",
          }),
          S.jsx(N.button, {
            ...me.stagger(1.7),
            onClick: () => window.open("https://wa.me/8801890228914", "_blank"),
            className:
              "bg-none border-none text-cyan-400 text-base font-semibold drop-shadow-[0_1px_3px_rgba(0,212,255,0.3)] cursor-pointer px-4 py-2 no-underline",
            children: "Minhajul Hasan",
          }),
        ],
      }),
      S.jsx("style", {
        children: `
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #00d4ff 0%, #090979 100%);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 212, 255, 0.3);
        }

        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #00d4ff 0%, #090979 100%);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 212, 255, 0.3);
        }

        /* Responsive Design for Sidebar */
        @media (max-width: 400px) {
          .settings-container {
            padding: 16px !important;
          }

          .settings-header {
            margin-bottom: 20px !important;
            padding-bottom: 12px !important;
          }

          .settings-title {
            font-size: 20px !important;
          }

          .setting-card {
            padding: 16px !important;
          }
        }

        @media (max-height: 500px) {
          .settings-container {
            padding: 16px !important;
          }

          .settings-header {
            margin-bottom: 16px !important;
            padding-bottom: 8px !important;
          }

          .settings-title {
            font-size: 20px !important;
          }

          .setting-card {
            padding: 16px !important;
          }
        }

        /* Sidebar-specific optimizations */
        @media (max-width: 480px) {
          .settings-container {
            padding: 20px !important;
          }

          .setting-card {
            padding: 20px !important;
          }

          .settings-title {
            font-size: 24px !important;
          }
        }
      `,
      }),
    ],
  });
}
async function _i() {
  if (typeof chrome < "u" && chrome.tabs && chrome.tabs.query)
    try {
      const e = await new Promise((t, n) => {
        chrome.tabs.query({ active: !0, currentWindow: !0 }, (r) => {
          chrome.runtime.lastError
            ? n(new Error(chrome.runtime.lastError.message))
            : t(r);
        });
      });
      if (e && e.length > 0) return e[0];
      throw new Error("No active tab found");
    } catch (e) {
      throw (console.error("Error querying active tab:", e), e);
    }
  else throw new Error("Chrome tabs API not available");
}
async function jn(e, t, n = 5e3, r = 2) {
  if (typeof chrome < "u" && chrome.tabs && chrome.tabs.sendMessage) {
    let i = null;
    for (let s = 0; s <= r; s++)
      try {
        return await new Promise((a, l) => {
          const u = setTimeout(() => {
            l(
              new Error(
                `Message timeout after ${n}ms - content script not responding`
              )
            );
          }, n);
          chrome.tabs.sendMessage(e, t, (c) => {
            clearTimeout(u),
              chrome.runtime.lastError
                ? l(new Error(chrome.runtime.lastError.message))
                : a(c);
          });
        });
      } catch (o) {
        if (
          ((i = o),
          o.message.includes("Extension context invalidated") ||
            o.message.includes("Receiving end does not exist"))
        ) {
          console.warn(`Message failed (attempt ${s + 1}):`, o.message);
          break;
        }
        s < r &&
          (await new Promise((a) => setTimeout(a, Math.pow(2, s) * 500)));
      }
    throw i || new Error("Chrome APIs not available");
  } else throw new Error("Chrome APIs not available");
}
async function Ii(e, t = 3e3) {
  try {
    const n = await jn(e, { action: "ping" }, t, 0);
    return n && n.pong === !0
      ? n.initialized === !0 && n.readyState === "complete"
      : !1;
  } catch (n) {
    if (
      n.message.includes("Receiving end does not exist") ||
      n.message.includes("Could not establish connection")
    )
      try {
        if (
          typeof chrome < "u" &&
          chrome.scripting &&
          chrome.scripting.executeScript
        ) {
          const r = await new Promise((i) => {
            chrome.tabs.get(e, (s) => {
              chrome.runtime.lastError ? i(null) : i(s);
            });
          });
          if (!r || !r.url || !r.url.includes("facebook.com"))
            return (
              console.warn(
                "Not injecting content script - tab is not on Facebook"
              ),
              !1
            );
          await new Promise((i) => setTimeout(i, 2e3));
          try {
            const i = await jn(e, { action: "ping" }, 1e3, 0);
            if (i && i.pong === !0)
              return i.initialized === !0 && i.readyState === "complete";
          } catch {}
          return !1;
        }
      } catch (r) {
        return console.warn("Failed to inject content script:", r), !1;
      }
    return !1;
  }
}
function O2() {
  const [e, t] = T.useState({
      currentPage: "main",
      status: "",
      copyStatus: "",
      isLoading: !1,
    }),
    [n, r] = T.useState({
      postTitle: null,
      posterName: null,
      totalComments: 0,
    }),
    [i, s] = T.useState({
      result: "Click a button to extract usernames.",
      capturedUsernames: 0,
      isExtracting: !1,
      isExtractionDisabled: !1,
      consecutiveEmptyExtractions: 0,
      errorType: null,
      errorMessage: null,
    }),
    [o, a] = T.useState({ cooldownSetting: 25, extractionCountLimit: 50 }),
    [l, u] = T.useState({
      countdown: null,
      countdownTime: 0,
      lastExtractTime: 0,
    });
  T.useEffect(() => {
    const y = (m) => {
        if (e.isLoading)
          return (
            m.preventDefault(),
            (m.returnValue =
              "Extraction is in progress. Are you sure you want to close the sidebar?"),
            "Extraction is in progress. Are you sure you want to close the sidebar?"
          );
      },
      E = (m) => {
        if (e.isLoading)
          return (
            m.preventDefault(),
            m.stopPropagation(),
            m.stopImmediatePropagation(),
            !1
          );
      };
    return (
      e.isLoading &&
        (window.addEventListener("beforeunload", y),
        window.addEventListener("pagehide", E),
        window.addEventListener("visibilitychange", E),
        document.addEventListener("contextmenu", E)),
      () => {
        window.removeEventListener("beforeunload", y),
          window.removeEventListener("pagehide", E),
          window.removeEventListener("visibilitychange", E),
          document.removeEventListener("contextmenu", E);
      }
    );
  }, [e.isLoading]),
    T.useEffect(() => {
      var y;
      if (typeof chrome < "u" && (y = chrome.runtime) != null && y.onMessage) {
        let E = 0;
        const m = (h, v, w) => {
          if (h.action === "statsUpdate") {
            const k = Date.now();
            if (k - E < 300) return !1;
            E = k;
          }
          return h.action === "getStorageData"
            ? (chrome.storage.local.get(
                ["extractedUsernames", "lastExtractionTime", "extractionCount"],
                (k) => {
                  w(k);
                }
              ),
              !0)
            : h.action === "updateStorageData"
            ? (chrome.storage.local.set(h.data, () => {
                w({ success: !0 });
              }),
              !0)
            : h.action === "postChanged"
            ? (r((k) => {
                var P, C;
                return {
                  ...k,
                  postTitle:
                    ((P = h.newPost) == null ? void 0 : P.title) || null,
                  posterName:
                    ((C = h.newPost) == null ? void 0 : C.posterName) || null,
                  totalComments: 0,
                };
              }),
              s((k) => ({
                ...k,
                isExtractionDisabled: !1,
                consecutiveEmptyExtractions: 0,
                errorType: null,
                errorMessage: null,
              })),
              t((k) => ({ ...k, isDropdownOpen: !1 })),
              !1)
            : h.action === "modalClosed"
            ? (s({
                result: "Click a button to extract usernames.",
                capturedUsernames: 0,
                isExtracting: !1,
                isExtractionDisabled: !1,
                consecutiveEmptyExtractions: 0,
                errorType: null,
                errorMessage: null,
              }),
              r({ postTitle: null, posterName: null, totalComments: 0 }),
              u((k) => ({ ...k, countdown: null, countdownTime: 0 })),
              t((k) => ({ ...k, isDropdownOpen: !1, copyStatus: "" })),
              !1)
            : h.action === "modalOpened"
            ? ((async () => {
                try {
                  const k = await _i();
                  if (
                    k &&
                    k.url &&
                    k.url.includes("facebook.com") &&
                    (await Ii(k.id, 200))
                  ) {
                    const C = await jn(
                      k.id,
                      { action: "checkModalStatus" },
                      800,
                      0
                    );
                    C &&
                      C.modalType &&
                      C.postTitle &&
                      (r((V) => ({
                        ...V,
                        postTitle: C.postTitle,
                        posterName: C.posterName || null,
                        totalComments: C.totalComments || V.totalComments,
                      })),
                      C.totalExtracted !== void 0 &&
                        s((V) => ({
                          ...V,
                          capturedUsernames: C.totalExtracted,
                        })));
                  }
                } catch {}
              })(),
              !1)
            : (h.action === "statsUpdate" &&
                (r((k) => ({
                  ...k,
                  totalComments:
                    h.totalComments !== void 0
                      ? h.totalComments
                      : k.totalComments,
                })),
                h.totalExtracted !== void 0 &&
                  s((k) => ({ ...k, capturedUsernames: h.totalExtracted }))),
              !1);
        };
        chrome.runtime.onMessage.addListener(m),
          chrome.storage.local.get(
            ["cooldownSetting", "extractionCountLimit"],
            (h) => {
              a((v) => ({
                ...v,
                cooldownSetting:
                  h.cooldownSetting !== void 0
                    ? h.cooldownSetting
                    : v.cooldownSetting,
                extractionCountLimit:
                  h.extractionCountLimit !== void 0
                    ? h.extractionCountLimit
                    : v.extractionCountLimit,
              }));
            }
          ),
          chrome.storage.local.get(
            ["extractedUsernames", "lastExtractionTime"],
            (h) => {
              if (
                h.extractedUsernames &&
                Array.isArray(h.extractedUsernames) &&
                h.extractedUsernames.length > 0
              ) {
                const v = h.extractedUsernames.map((w) => `@${w}`).join(`
`);
                s((w) => ({
                  ...w,
                  result: v,
                  capturedUsernames: h.extractedUsernames.length,
                }));
              }
              h.lastExtractionTime &&
                u((v) => ({ ...v, lastExtractTime: h.lastExtractionTime }));
            }
          );
        const p = (h, v) => {
          if (v === "local") {
            const w = {};
            if (
              (h.cooldownSetting &&
                (w.cooldownSetting = h.cooldownSetting.newValue),
              h.extractionCountLimit &&
                (w.extractionCountLimit = h.extractionCountLimit.newValue),
              Object.keys(w).length > 0 && a((k) => ({ ...k, ...w })),
              h.extractedUsernames)
            ) {
              const k = h.extractedUsernames.newValue;
              if (Array.isArray(k)) {
                const P =
                  k.length > 0
                    ? k.map((C) => `@${C}`).join(`
`)
                    : "Click a button to extract usernames.";
                s((C) => ({ ...C, result: P, capturedUsernames: k.length }));
              }
            }
            h.lastExtractionTime &&
              u((k) => ({
                ...k,
                lastExtractTime: h.lastExtractionTime.newValue || 0,
              }));
          }
        };
        return (
          chrome.storage.onChanged.addListener(p),
          () => {
            chrome.runtime.onMessage.removeListener(m),
              chrome.storage.onChanged.removeListener(p);
          }
        );
      }
    }, []),
    T.useEffect(() => {
      let y = null,
        E = !1;
      const m = async () => {
        if (!E) {
          E = !0;
          try {
            const p = await _i();
            if (!p || !p.url || !p.url.includes("facebook.com")) {
              r((w) => ({ ...w, postTitle: null }));
              return;
            }
            if (!(await Ii(p.id, 200))) return;
            const v = await jn(p.id, { action: "checkModalStatus" }, 500, 0);
            v && v.modalType && v.postTitle
              ? r((w) => ({
                  ...w,
                  postTitle: v.postTitle,
                  posterName: v.posterName || null,
                  totalComments:
                    v.totalComments !== void 0
                      ? v.totalComments
                      : w.totalComments,
                }))
              : r((w) => ({ ...w, postTitle: null }));
          } catch {
            r((p) => ({ ...p, postTitle: null }));
          } finally {
            E = !1;
          }
        }
      };
      return (
        m(),
        (y = setInterval(m, 2e3)),
        () => {
          y && clearInterval(y);
        }
      );
    }, []);
  const c = (y, E = 3e3) => {
      t((m) => ({ ...m, status: y })),
        setTimeout(() => t((m) => ({ ...m, status: "" })), E);
    },
    f = (y, E) => {
      l.countdown && clearInterval(l.countdown);
      let m = Math.ceil(y / 1e3);
      u((v) => ({ ...v, countdownTime: m, countdown: null }));
      const p = () => {
        if ((m--, u((v) => ({ ...v, countdownTime: m })), m <= 0)) {
          u(
            (v) => (
              v.countdown && clearInterval(v.countdown),
              { ...v, countdown: null, countdownTime: 0 }
            )
          );
          return;
        }
      };
      p();
      const h = setInterval(p, 1e3);
      u((v) => ({ ...v, countdown: h }));
    },
    d = async () => {
      if (i.isExtractionDisabled || i.isExtracting) return;
      const y = Date.now(),
        E = y - l.lastExtractTime,
        m = o.cooldownSetting * 1e3;
      if (E < m) {
        const p = m - E;
        f(p);
        return;
      }
      s((p) => ({ ...p, isExtracting: !0 })),
        t((p) => ({
          ...p,
          status: "Extracting usernames...",
          copyStatus: "",
          isLoading: !0,
        }));
      try {
        const p = await _i();
        if (!p || !p.url || !p.url.includes("facebook.com"))
          throw new Error("Not on Facebook");
        if (!(await Ii(p.id, 400)))
          throw new Error(
            "Content script not ready. Please refresh the page and try again."
          );
        const v = await jn(p.id, { action: "extractComments" }, 15e3, 0);
        if (!v) throw new Error("No response from content script");
        if (v.error) {
          c(`Error: ${v.error}`, 3e3);
          return;
        } else if (v.mentions && v.mentions.length > 0) {
          s((F) => ({ ...F, consecutiveEmptyExtractions: 0 }));
          const w =
              i.result === "Click a button to extract usernames."
                ? []
                : i.result
                    .split(
                      `
`
                    )
                    .filter((F) => F.trim()),
            k = new Set(w),
            P = v.mentions.filter((F) => !k.has(F)),
            C = [...w, ...P],
            V = C.join(`
`);
          s((F) => ({
            ...F,
            result: V,
            capturedUsernames: v.totalExtracted || C.length,
          })),
            r((F) => ({ ...F, totalComments: v.totalComments || 0 }));
          const A = o.cooldownSetting * 1e3;
          f(A, "normal"),
            u((F) => ({ ...F, lastExtractTime: y })),
            c(`Successfully extracted ${P.length} new usernames!`, 2e3);
        } else {
          const w = v.totalComments && v.totalComments > 0,
            k = v.processedComments !== void 0;
          if (!w && k)
            s((P) => ({
              ...P,
              isExtractionDisabled: !0,
              errorType: "no-comments",
              errorMessage: "No comments available on this post",
            })),
              c("No comments available on this post", 3e3);
          else {
            const P = i.consecutiveEmptyExtractions + 1;
            s((C) => ({ ...C, consecutiveEmptyExtractions: P })),
              P >= 2
                ? (s((C) => ({
                    ...C,
                    isExtractionDisabled: !0,
                    errorType: "no-more-uncaptured",
                    errorMessage: "No more uncaptured usernames available",
                  })),
                  c(
                    "No more uncaptured usernames available for this post",
                    3e3
                  ))
                : c("No new usernames found", 2e3);
          }
        }
        setTimeout(() => {
          s((w) => ({ ...w, isExtracting: !1 })),
            t((w) => ({ ...w, isLoading: !1 }));
        }, 50);
      } catch (p) {
        let h = "unknown",
          v = "An unexpected error occurred";
        p.message.includes("Not on Facebook")
          ? ((h = "not-on-facebook"),
            (v = "Please navigate to Facebook to use this extension"))
          : p.message.includes("Content script not ready")
          ? ((h = "content-script-error"),
            (v = "Extension not ready. Please refresh the page and try again"))
          : p.message.includes("timeout") || p.message.includes("Timeout")
          ? ((h = "timeout"), (v = "Request timed out. Please try again"))
          : p.message.includes("Extension context invalidated") ||
            p.message.includes("Receiving end does not exist") ||
            p.message.includes("Could not establish connection")
          ? ((h = "content-script-error"),
            (v =
              "Content script not loaded. Please refresh the page and try again."))
          : p.message.includes("No response from content script")
          ? ((h = "communication-error"),
            (v = "Communication error. Please try again"))
          : p.message.includes(
              "The message port closed before a response was received"
            )
          ? ((h = "timeout"),
            (v =
              "⚠️ Extraction took longer than expected due to large comment count. The process completed in the background - check your results in a moment."))
          : (console.error("Unexpected extraction error:", p),
            (h = "extraction-error"),
            (v = `Extraction failed: ${p.message || "Unknown error"}`)),
          s((w) => ({
            ...w,
            errorType: h,
            errorMessage: v,
            isExtractionDisabled:
              h === "not-on-facebook" || h === "content-script-error",
          })),
          c(v, 3e3),
          setTimeout(() => {
            s((w) => ({ ...w, isExtracting: !1 })),
              t((w) => ({ ...w, isLoading: !1 }));
          }, 50);
      }
    },
    g = async () => {
      if (!(!i.result || i.result === "Click a button to extract usernames."))
        try {
          await navigator.clipboard.writeText(i.result),
            t((y) => ({ ...y, copyStatus: "Copied!" })),
            setTimeout(() => t((y) => ({ ...y, copyStatus: "" })), 2e3);
        } catch (y) {
          console.error("Copy failed:", y),
            t((E) => ({ ...E, copyStatus: "Failed" })),
            setTimeout(() => t((E) => ({ ...E, copyStatus: "" })), 2e3);
        }
    },
    x = async () => {
      if (
        window.confirm(
          "This will reset ALL extension data including settings. Are you sure?"
        )
      ) {
        s({
          result: "Click a button to extract usernames.",
          capturedUsernames: 0,
          isExtracting: !1,
          isExtractionDisabled: !1,
          consecutiveEmptyExtractions: 0,
          errorType: null,
          errorMessage: null,
        }),
          r({ postTitle: null, posterName: null, totalComments: 0 }),
          u({ countdown: null, countdownTime: 0, lastExtractTime: 0 }),
          a({ cooldownSetting: 25, extractionCountLimit: 50 }),
          t({ currentPage: "main", status: "" }),
          typeof chrome < "u" &&
            chrome.storage &&
            chrome.storage.local &&
            chrome.storage.local.clear(() => {
              if (chrome.runtime.lastError)
                console.error(
                  "Error clearing storage:",
                  chrome.runtime.lastError
                );
              else {
                const y = {
                  debugMode: !1,
                  cooldownSetting: 25,
                  extractionCountLimit: 50,
                  extractedUsernames: [],
                  extractionCount: 0,
                  lastExtractionTime: 0,
                };
                chrome.storage.local.set(y, () => {
                  chrome.runtime.lastError
                    ? console.error(
                        "Error setting default storage values:",
                        chrome.runtime.lastError
                      )
                    : console.log("Storage reset to default values");
                });
              }
            });
        try {
          const y = await _i();
          y &&
            y.url &&
            y.url.includes("facebook.com") &&
            ((await Ii(y.id, 1e3)) &&
              (await jn(y.id, { action: "globalReset" }, 3e3, 1)),
            setTimeout(() => {
              chrome.tabs.reload(y.id);
            }, 1e3));
        } catch (y) {
          console.warn("Could not perform global reset:", y.message);
        }
        c(
          "Extension reset successfully - all states restored to initial values!"
        );
      }
    };
  return S.jsxs("div", {
    className:
      "w-full min-h-screen max-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900 relative overflow-hidden",
    children: [
      e.isLoading &&
        S.jsx("div", {
          className:
            "absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4",
          children: S.jsxs("div", {
            className:
              "bg-slate-800/95 border-2 border-cyan-400/50 rounded-xl p-6 max-w-md mx-4 text-center shadow-2xl",
            children: [
              S.jsx("div", {
                className:
                  "animate-spin w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-6",
              }),
              S.jsx("h3", {
                className: "text-white font-bold text-lg mb-3",
                children: "🔄 Extracting Usernames",
              }),
              S.jsxs("p", {
                className: "text-white/90 text-sm mb-4 leading-relaxed",
                children: [
                  S.jsx("strong", { children: "⚠️ IMPORTANT:" }),
                  " Please keep this sidebar open while we extract usernames from comments. Closing it will interrupt the process.",
                ],
              }),
              S.jsx("div", {
                className: "w-full bg-slate-700/50 rounded-full h-2 mb-4",
                children: S.jsx(N.div, {
                  initial: { width: "0%" },
                  animate: { width: "100%" },
                  transition: { duration: 15, ease: "linear" },
                  className:
                    "bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full",
                }),
              }),
              S.jsx("div", {
                className: "text-xs text-cyan-300 mb-2",
                children: "⏱️ This may take up to 15 seconds",
              }),
              S.jsx("div", {
                className: "text-xs text-white/60",
                children: "Do not close this window or navigate away",
              }),
            ],
          }),
        }),
      e.currentPage === "main"
        ? S.jsxs("div", {
            className:
              "w-full min-h-screen max-h-screen p-4 sm:p-5 lg:p-6 text-white flex flex-col overflow-hidden fb-engager-container",
            children: [
              S.jsx(D2, {
                onSettingsClick: () =>
                  t((y) => ({ ...y, currentPage: "settings" })),
              }),
              S.jsxs("div", {
                className:
                  "flex flex-col flex-1 gap-3 sm:gap-4 overflow-hidden min-h-0",
                children: [
                  S.jsx(Ms, {
                    children:
                      n.postTitle &&
                      S.jsx(A2, {
                        postTitle: n.postTitle,
                        posterName: n.posterName,
                        totalComments: n.totalComments,
                        capturedUsernames: i.capturedUsernames,
                        consecutiveEmptyExtractions:
                          i.consecutiveEmptyExtractions,
                        isExtractionDisabled: i.isExtractionDisabled,
                      }),
                  }),
                  S.jsx(M2, {
                    extractionState: i,
                    timerState: l,
                    onExtraction: d,
                    postState: n,
                  }),
                  S.jsx(j2, { postState: n, extractionState: i }),
                  S.jsx(P2, {
                    extractionState: i,
                    onCopy: g,
                    copyStatus: e.copyStatus,
                  }),
                  S.jsxs(N.button, {
                    initial: { opacity: 0, filter: "blur(5px)" },
                    animate: { opacity: 1, filter: "blur(0px)" },
                    transition: { duration: 0.3, delay: 1, ease: "easeOut" },
                    onClick: x,
                    className:
                      "bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-4",
                    title: "Reset all extension data and settings",
                    children: [
                      S.jsx("span", { children: "🔄" }),
                      "Reset Extension",
                    ],
                  }),
                ],
              }),
              S.jsx(L2, { settingsState: o }),
              S.jsx("style", {
                children: `
        /* Comprehensive Responsive Design for Side Panel */
        @media (max-width: 360px) {
          .fb-engager-container {
            padding: 12px !important;
          }

          .fb-engager-header {
            margin-bottom: 16px !important;
            padding-bottom: 12px !important;
          }

          .fb-engager-title-section {
            gap: 8px !important;
          }

          .fb-engager-title {
            font-size: 16px !important;
          }

          .fb-engager-subtitle {
            font-size: 10px !important;
          }

          .fb-engager-results {
            min-height: 180px !important;
            font-size: 11px !important;
            padding: 12px !important;
          }

          .fb-engager-action-buttons {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 8px !important;
          }

          .fb-engager-footer {
            padding: 8px 12px !important;
            font-size: 10px !important;
          }
        }

        @media (min-width: 361px) and (max-width: 480px) {
          .fb-engager-container {
            padding: 16px !important;
          }

          .fb-engager-header {
            margin-bottom: 20px !important;
            padding-bottom: 16px !important;
          }

          .fb-engager-title {
            font-size: 18px !important;
          }

          .fb-engager-subtitle {
            font-size: 11px !important;
          }

          .fb-engager-results {
            min-height: 220px !important;
            font-size: 12px !important;
          }

          .fb-engager-action-buttons {
            flex-wrap: wrap !important;
            justify-content: flex-start !important;
            gap: 8px !important;
          }

          .fb-engager-footer {
            padding: 10px 16px !important;
            font-size: 11px !important;
          }
        }

        @media (min-width: 481px) and (max-width: 640px) {
          .fb-engager-container {
            padding: 20px !important;
          }

          .fb-engager-header {
            margin-bottom: 24px !important;
            padding-bottom: 20px !important;
          }

          .fb-engager-title {
            font-size: 20px !important;
          }

          .fb-engager-subtitle {
            font-size: 12px !important;
          }

          .fb-engager-results {
            min-height: 280px !important;
            font-size: 13px !important;
          }

          .fb-engager-action-buttons {
            gap: 12px !important;
          }

          .fb-engager-footer {
            padding: 12px 20px !important;
            font-size: 12px !important;
          }
        }

        @media (min-width: 641px) {
          .fb-engager-container {
            padding: 24px !important;
          }

          .fb-engager-header {
            margin-bottom: 28px !important;
            padding-bottom: 24px !important;
          }

          .fb-engager-title {
            font-size: 22px !important;
          }

          .fb-engager-subtitle {
            font-size: 13px !important;
          }

          .fb-engager-results {
            min-height: 320px !important;
            font-size: 14px !important;
          }

          .fb-engager-action-buttons {
            gap: 16px !important;
          }

          .fb-engager-footer {
            padding: 14px 24px !important;
            font-size: 13px !important;
          }
        }

        /* Height-based responsive adjustments */
        @media (max-height: 500px) {
          .fb-engager-container {
            padding: 12px !important;
          }

          .fb-engager-header {
            margin-bottom: 12px !important;
            padding-bottom: 8px !important;
          }

          .fb-engager-title {
            font-size: 16px !important;
          }

          .fb-engager-subtitle {
            font-size: 10px !important;
            display: none !important; /* Hide subtitle on very short screens */
          }

          .fb-engager-results {
            min-height: 120px !important;
            max-height: 200px !important;
          }

          .fb-engager-footer {
            padding: 6px 12px !important;
            font-size: 10px !important;
          }
        }

        @media (min-height: 501px) and (max-height: 700px) {
          .fb-engager-results {
            min-height: 200px !important;
            max-height: 300px !important;
          }
        }

        @media (min-height: 701px) {
          .fb-engager-results {
            min-height: 300px !important;
            max-height: 500px !important;
          }
        }

        /* Orientation-based adjustments */
        @media (orientation: landscape) and (max-height: 500px) {
          .fb-engager-container {
            flex-direction: row !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
          }

          .fb-engager-header {
            flex: 0 0 auto !important;
            margin-bottom: 0 !important;
            margin-right: 16px !important;
            padding-bottom: 0 !important;
            border-bottom: none !important;
            border-right: 1px solid rgba(255, 255, 255, 0.1) !important;
            padding-right: 16px !important;
          }

          .fb-engager-title-section {
            flex-direction: column !important;
            align-items: center !important;
          }

          .fb-engager-main-content {
            flex: 1 !important;
            overflow-y: auto !important;
            padding-right: 8px !important;
          }

          .fb-engager-results {
            min-height: 200px !important;
            max-height: none !important;
          }
        }

        /* Touch-friendly interactions for mobile */
        @media (max-width: 640px) {
          button {
            min-height: 44px !important; /* iOS touch target minimum */
            min-width: 44px !important;
          }

          .fb-engager-results {
            -webkit-overflow-scrolling: touch !important;
          }
        }

        /* Prevent horizontal overflow */
        .fb-engager-container * {
          max-width: 100% !important;
          box-sizing: border-box !important;
        }

        /* Custom scrollbar for results area */
        .fb-engager-results::-webkit-scrollbar {
          width: 6px;
        }

        .fb-engager-results::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        .fb-engager-results::-webkit-scrollbar-thumb {
          background: rgba(0, 212, 255, 0.3);
          border-radius: 3px;
        }

        .fb-engager-results::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 212, 255, 0.5);
        }

        /* Smooth transitions for responsive changes */
        .fb-engager-container,
        .fb-engager-container * {
          transition: all 0.3s ease !important;
        }

        /* Prevent text selection issues */
        .fb-engager-results {
          -webkit-user-select: text !important;
          -moz-user-select: text !important;
          -ms-user-select: text !important;
          user-select: text !important;
        }

        /* Ensure proper text wrapping */
        .fb-engager-results {
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
          hyphens: auto !important;
        }
      `,
              }),
            ],
          })
        : S.jsx("div", {
            className: "w-full min-h-screen max-h-screen absolute top-0 left-0",
            children: S.jsx(V2, {
              onBack: () => t((y) => ({ ...y, currentPage: "main" })),
            }),
          }),
    ],
  });
}
$o.createRoot(document.getElementById("root")).render(
  S.jsx(al.StrictMode, { children: S.jsx(O2, {}) })
);
