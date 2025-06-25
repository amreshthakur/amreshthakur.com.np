var TopNavBar = {
    defaultHeight: '88px',
    mainNavHeightPx: 56,
    secondaryNavHeightPx: 32,
    fullHeight: '100vh',
    element: document.getElementById('nav-bar'),
    // searchFromBox: false,
    // fullScreenNav: false,
    // fullScreenSearchResults: false,
    parentLayoutNotifier: null,
    inIframe: null,
    location: null,
    env: null,
    loggedIn: null,
    configured: false,
    hasNetworkSecondaryNav: false,
    mobileNavScrollInterval: null,
    _debug: null,
  };


  
  
  window.TopNavBar = TopNavBar;
  
  TopNavBar._menuSectionsInTab = {
    'Courses': [
      'Courses_html_css_links_list',
      'Courses_data_analytics_links_list_desktop',
      'Courses_web_building_links_list_desktop',
      'Courses_javascript_links_list',
      'Courses_backend_links_list'
    ],
    'Notes': [
      'Notes_html_css_links_list',
      'Notes_data_analytics_links_list_desktop',
      'Notes_javascript_links_list',
      'Notes_backend_links_list'
    ],
    'certified': [
      'certified_html_css_links_list',
      'certified_data_analytics_links_list_desktop',
      'certified_programs_links_list_desktop',
      'certified_javascript_links_list',
      'certified_backend_links_list'
    ]
  };
  
  TopNavBar._findInnerElements = function (parentElement, queryStr, callback) {
    var output = [];
  
    var hasCallback = typeof callback !== 'undefined';
  
    var elements = parentElement.querySelectorAll(queryStr);
  
    for (var index = 0; index < elements.length; index++) {
      output.push(elements[index]);
  
      if (hasCallback) {
        callback(elements[index], index);
      }
    }
  
    return output;
  };
  
  TopNavBar._loopArray = function (arr, callback) {
    for (var index = 0; index < arr.length; index++) {
      callback(arr[index], index);
    }
  };
  
  TopNavBar._loopObj = function (obj, callback) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        callback(obj[key], key);
      }
    }
  };
  
  TopNavBar._inIframe = function () {
    if (TopNavBar.inIframe !== null) {
      return TopNavBar.inIframe;
    }
  
    try {
      TopNavBar.inIframe = window.self !== window.top;
    } catch (e) {
      TopNavBar.inIframe = true;
    }
  
    return TopNavBar.inIframe;
  }
  
  TopNavBar._isDebugMode = function () {
    if (TopNavBar._debug !== null) {
      return TopNavBar._debug;
    }
  
    if (
      localStorage.getItem('TopNavBar.debug') === 'true'
    ) {
      TopNavBar._debug = true;
    } else {
      TopNavBar._debug = false;
    }
  
    return TopNavBar._debug;
  };
  
  TopNavBar._logDebug = function (message, data) {
    if (!TopNavBar._isDebugMode()) {
      return;
    }
  
    if (typeof data === 'undefined') {
      console.log('TopNavBar -> ' + message);
    } else {
      console.log('TopNavBar -> ' + message, data);
    }
  }
  
  TopNavBar._logWarning = (message, data) => {
    if (typeof data === 'undefined') {
      console.warn('TopNavBar -> ' + message);
    } else {
      console.warn('TopNavBar -> ' + message, data);
    }
  }
  
  TopNavBar.isExpanded = function () {
    var navs = [
      '#nav_Courses',
      '#nav_Notes',
      '#nav_certified',
      '#nav_Books',
      // '.tnb-mobile-nav',
    ];
  
    for (var i = 0; i < navs.length; i++) {
      var element = TopNavBar.element.querySelector(navs[i]);
  
      if (
        element
        && element.style.display !== 'none'
        && element.style.display !== ''
      ) {
        return true;
      };
    }
  
    if (TopNavBar.element.querySelector('.tnb-mobile-nav').classList.contains('tnb-active')) {
      return true;
    }
  
    return TopNavBar.googleSearchResultsShown();
  };
  
  TopNavBar._sendParentInitMessage = function () {
    window.parent.postMessage({
      'action': 'INIT',
      'expanded': false,
      'initHeight': TopNavBar.defaultHeight, // legacy
      'fullHeight': TopNavBar.fullHeight,
      'mainNavHeightPx': TopNavBar.mainNavHeightPx,
      'secondaryNavHeightPx': TopNavBar.secondaryNavHeightPx
    }, '*');
  };
  
  TopNavBar._patchNetworkLoginSignupLinks = function () {
    if (TopNavBar.env !== 'network') {
      return;
    }
  
    TopNavBar._findInnerElements(TopNavBar.element, '.tnb-login-btn', function (loginLinkElm) {
      loginLinkElm.href = 'https://profile.Piparaacademy.com/log-in?redirect_url=' + encodeURIComponent(TopNavBar.location.href);
    });
  
    TopNavBar._findInnerElements(TopNavBar.element, '.tnb-signup-btn', function (signupLinkElm) {
      signupLinkElm.href = 'https://profile.Piparaacademy.com/sign-up?redirect_url=' + encodeURIComponent(TopNavBar.location.href);
    });
  }



  
  TopNavBar._applyNoUpsellUiTweaks = function () {
    // action can't be reverted
  
    TopNavBar._findInnerElements(TopNavBar.element, '.pipara-academy-paid-service', function (paidServiceElm) {
      paidServiceElm.remove();
    });
  
    TopNavBar._findInnerElements(TopNavBar.element, '.tnb-upgrade', function (upgradeElm) {
      upgradeElm.classList.add('PAN-hide');
    });
  }
  
  TopNavBar.postInitConfig = function (prs) {
    TopNavBar._logDebug('postInitConfig');
    // return;
  
    // can be checked to avoid configuring twice
    TopNavBar.configured = true;
  
    if (
      typeof prs.sendParentInitMessage !== 'undefined'
      && prs.sendParentInitMessage === true
    ) { // optional prop required in billing setup
      TopNavBar._sendParentInitMessage();
    }
  
    TopNavBar.env = prs.env;
  
    TopNavBar.location = prs.location; // location required fields: href, hostname, pathname
  
    // secondary top nav bar local development
    // TopNavBar.hasNetworkSecondaryNav = true;
    TopNavBar.hasNetworkSecondaryNav = TopNavBar.env === 'network' && !TopNavBar.lite;
  
    if (TopNavBar.hasNetworkSecondaryNav) {
      SecondaryTopNavBar.postInitConfig(prs);
    }
  
    // execution order priority: high
    TopNavBar._applyUserSessionUiTweaks({
      loggedIn: prs.loggedIn,
      subscriptionPlan: prs.subscriptionPlan
    });
  
    // execution order priority: low
    TopNavBar._patchNetworkLoginSignupLinks();
  
    var featureFlags = prs.featureFlags;
  
    if (typeof featureFlags === 'undefined') {
      featureFlags = {
        'noUpsell': false,
      };
    }
  
    // execution order priority: low
    if (featureFlags.noUpsell) {
      TopNavBar._applyNoUpsellUiTweaks();
    }
  }
  
  TopNavBar._applyUserSessionUiTweaks = function (prs) {
    TopNavBar._logDebug('_applyUserSessionUiTweaks -> prs: ', prs);
  
    var loggedIn = prs.loggedIn;
    var subscriptionPlan = prs.subscriptionPlan;
    var initialLoggedInState = TopNavBar.loggedIn;
    var loggedInStateChanged = TopNavBar.loggedIn !== loggedIn;
    TopNavBar.loggedIn = loggedIn;
  
    TopNavBar._logDebug('_applyUserSessionUiTweaks -> state: ', {
      'loggedIn': loggedIn,
      'initialLoggedInState': initialLoggedInState,
      'loggedInStateChanged': loggedInStateChanged,
      'subscriptionPlan': subscriptionPlan
    });
  
    if (loggedIn) {
      TopNavBar._findInnerElements(document, '.user-authenticated', function (elm) {
        elm.classList.remove('PAN-hide');
      });
  
      TopNavBar._findInnerElements(document, '.user-anonymous', function (elm) {
        elm.classList.add('PAN-hide');
      });
  
      if (subscriptionPlan === 'diamond') {
        TopNavBar._findInnerElements(TopNavBar.element, '.tnb-upgrade', function (elm) {
          elm.classList.add('PAN-hide');
        });
      } else { // free | pro
        TopNavBar._findInnerElements(TopNavBar.element, '.tnb-upgrade', function (elm) {
          elm.classList.remove('PAN-hide');
        });
      }
    } else { // anonymous
      TopNavBar._findInnerElements(document, '.user-authenticated', function (elm) {
        elm.classList.add('PAN-hide');
      });
  
      TopNavBar._findInnerElements(document, '.user-anonymous', function (elm) {
        elm.classList.remove('PAN-hide');
      });
  
      TopNavBar._findInnerElements(TopNavBar.element, '.tnb-upgrade', function (elm) {
        elm.classList.add('PAN-hide');
      });
    }
  };
  
  TopNavBar.init = function () {
    TopNavBar._logDebug('init');
  
    TopNavBar.location = window.location;
  
    // execution order priority: high
    TopNavBar.initUserPreferredTheme();
  
    // blind lookup
    var subscriptionPlan = UserSession.getUserSubscriptionPlan(null);
  
    var loggedIn = subscriptionPlan !== null;
  
    TopNavBar.loggedIn = loggedIn;
  
    if (subscriptionPlan === null) {
      subscriptionPlan = 'free';
    }
  
    // execution order priority: high
    TopNavBar._applyUserSessionUiTweaks({
      loggedIn: loggedIn,
      subscriptionPlan: subscriptionPlan
    });
  
    // execution order priority: high
    if (TopNavBar._inIframe()) {
      TopNavBar._iframeInit();
    }
  
    // execution order priority: low
    TopNavBar._attachMenuSortLogic();
  
    // execution order priority: low
    TopNavBar._attachNavEscapeListeners();
  };
  
  TopNavBar._callFunc = function (funcName, funcArgs) {
    if (funcName.indexOf('_') === 0) { // private function/method
      TopNavBar._logWarning('Function call forbidden -> funcName, funcArgs: ', {
        'funcName': funcName,
        'funcArgs': funcArgs,
      });
  
      return false;
    }
  
    if (typeof TopNavBar[funcName] !== 'function') {
      TopNavBar._logWarning('Function doesn\'t exist -> funcName, funcArgs: ', {
        'funcName': funcName,
        'funcArgs': funcArgs,
      });
  
      return false;
    }
  
    if (typeof funcArgs !== 'undefined') {
      return TopNavBar[funcName].apply(null, funcArgs);
    } else {
      return TopNavBar[funcName]();
    }
  };
  
  TopNavBar._iframeInit = function () {
    window.addEventListener('message', function (message) {
      TopNavBar._logDebug('message: ', message);
  
      var whitelistedOrigins = [
        'https://profile.Piparaacademy.com',
        'https://my-learning.Piparaacademy.com',
        'https://spaces.Piparaacademy.com',
        'https://billing.Piparaacademy.com',
        'https://campus.Piparaacademy.com',
      ];
  
      if (!whitelistedOrigins.includes(message.origin)) {
        return;
      }
  
      var action = '';
      var data = null;
  
      if (typeof message.data.type !== 'undefined') {
        action = message.data.type;
        data = message.data.value;
      } else if (typeof message.data.action !== 'undefined') {
        action = message.data.action;
        data = message.data.data;
      }
  
      TopNavBar._logDebug('message -> action, data: ', {
        action: action,
        data: data,
      });
  
      if (action === 'CONFIG') {
        TopNavBar.postInitConfig(data);
      } else if (action === 'CALL_FUNCTION') { // TODO: (high) tighten security belt
        TopNavBar._callFunc(data.funcName, data.funcArgs);
      }
    });
  
    TopNavBar._sendParentInitMessage();
  
    TopNavBar.element.addEventListener('click', function (event) {
      TopNavBar.notifyParentAboutLayout('on click', event);
    });
  
    TopNavBar.element.addEventListener('keyup', function (event) {
      TopNavBar.notifyParentAboutLayout('on keyup', event);
    });
  
    TopNavBar.element.addEventListener('resize', function (event) {
      TopNavBar.notifyParentAboutLayout('on resize', event);
    });
  }
  
  TopNavBar.notifyParentAboutLayout = function (context, event) {
    if (!TopNavBar._inIframe()) {
      return;
    }
  
    TopNavBar._logDebug('notifyParentAboutLayout -> context, event: ', {
      'context': context,
      'event': event
    });
  
    clearTimeout(TopNavBar.parentLayoutNotifier);
  
    TopNavBar.parentLayoutNotifier = setTimeout(function () {
      var expanded = TopNavBar.isExpanded();
  
      window.parent.postMessage({
        'context': context,
        'action': 'LAYOUT',
        'expanded': expanded,
        'iframeHeight': expanded ? TopNavBar.fullHeight : TopNavBar.defaultHeight, // legacy
        'placeholderHeight': TopNavBar.defaultHeight, // legacy
        'fullHeight': TopNavBar.fullHeight,
        'mainNavHeightPx': TopNavBar.mainNavHeightPx,
        'secondaryNavHeightPx': TopNavBar.secondaryNavHeightPx
      }, '*');
    }, 100);
  };
  
  TopNavBar._attachNavEscapeListeners = function () {
    var navIds = [
      'Courses',
      'Notes',
      'certified',
      'Books'
    ];
  
    TopNavBar._loopArray(navIds, function (navId) {
      document.getElementById('nav_' + navId).addEventListener('keydown', function (event) {
        if (event.code === 'Escape') {
          TopNavBar.closeNavItem(navId);
        }
      });
    });
  };
  
  // < Google Search
  
  TopNavBar.googleSearchInit = function () {
    TopNavBar._logDebug('googleSearchInit');
  
    var gSearchScriptElm = document.getElementById('gSearch');
  
    if (gSearchScriptElm == null) {
      var cx = uic_r_y();
      var gSearchScriptElmToInject = document.createElement('script');
      gSearchScriptElmToInject.id = 'gSearch';
      gSearchScriptElmToInject.type = 'text/javascript';
      gSearchScriptElmToInject.async = true;
      gSearchScriptElmToInject.src = 'https://www.google.com/cse/cse.js?cx=' + cx;
  
      var firstScriptElm = document.getElementsByTagName('script')[0];
      firstScriptElm.parentNode.insertBefore(gSearchScriptElmToInject, firstScriptElm);
    }
  
    TopNavBar.googleSearchFocusInput();
  };
  
  TopNavBar.googleSearchFocusInput = function () {
    TopNavBar._logDebug('googleSearchFocusInput');
  
    document.getElementById('tnb-google-search-input').focus();
  };
  
  TopNavBar.googleSearchResultsShown = function () {
    var googleSearchResults = TopNavBar.element.querySelector('.gsc-results-wrapper-overlay.gsc-results-wrapper-visible');
  
    return !!googleSearchResults;
  };
  
  TopNavBar.googleSearchResultsShownCallback = function (callback) {
    if (TopNavBar.googleSearchResultsShown()) {
      return callback();
    }
  
    var lookupAttempts = 512; // ~ 1 minute
  
    var lookupInterval = setInterval(function () {
      if (TopNavBar.googleSearchResultsShown()) {
        clearInterval(lookupInterval);
  
        return callback();
      }
  
      lookupAttempts--;
  
      if (!lookupAttempts) {
        console.error('TopNavBar -> googleSearchResultsShownCallback -> timeout');
  
        return clearInterval(lookupInterval);
      }
    }, 100);
  };
  
  TopNavBar._googleSearchPatchResultLinks = function () {
    TopNavBar._findInnerElements(document.getElementById('googleSearch'), '.gsc-results a', function (linkElm) {
      linkElm.setAttribute('target', '_blank');
    });
  };
  
  TopNavBar.googleSearchShowMobileContainer = function () {
    document.getElementById('tnb-google-search-container').classList.add('tnb-mobile-active');
  };
  
  TopNavBar.googleSearchHideMobileContainer = function () {
    document.getElementById('tnb-google-search-container').classList.remove('tnb-mobile-active');
  };
  
  TopNavBar._getElementPos = function (elm) {
    var rect = elm.getBoundingClientRect();
  
    return {
      'left': rect.left + window.scrollX,
      'top': rect.top + window.scrollY
    };
  }
  
  TopNavBar._iframeProxyFloatingComponent = function (context, id, action, prs) {
    if (!(TopNavBar.env === 'network' || TopNavBar._inIframe())) {
      return;
    }
  
    if (typeof prs === 'undefined') {
      prs = {};
    }
  
    var floatingComponent = prs;
  
    floatingComponent.id = id;
    floatingComponent.action = action;
  
    window.parent.postMessage({
      'context': context,
      'action': 'PROXY_FLOATING_COMPONENT',
      'floatingComponent': floatingComponent,
    }, '*');
  };
  
  TopNavBar.mountSearchSuggestionsLogic = function () {
    var searchSuggestionsElm = document.getElementById('pipara-acadeny-search-suggestions');
  
    if (!searchSuggestionsElm) {
      return;
    }
  
    var searchEntirePiparaacademyBtn = searchSuggestionsElm.querySelector('#search-entire-Piparaacademy-btn');
  
    if (searchEntirePiparaacademyBtn) {
      searchEntirePiparaacademyBtn.addEventListener('click', TopNavBar.googleSearchSubmit);
    }
  };
  
  TopNavBar.unmountSearchSuggestionsLogic = function () {
    var searchSuggestionsElm = document.getElementById('pipara-acadeny-search-suggestions');
  
    if (!searchSuggestionsElm) {
      return;
    }
  
    var searchEntirePiparaacademyBtn = searchSuggestionsElm.querySelector('#search-entire-Piparaacademy-btn');
  
    if (searchEntirePiparaacademyBtn) {
      searchEntirePiparaacademyBtn.removeEventListener('click', TopNavBar.googleSearchSubmit);
    }
  };
  
  TopNavBar.searchWithSuggestions = function (inp) {
    var searchSuggestionsElm, val, i, l, resultIndexes = [], resultTexts = [], html = "", classAtt = "", pos1, posNext, cc, c0, c1, c2, stillgo, needle;
  
    val = inp.value.trim().toUpperCase();
  
    if (val == "") {
      TopNavBar.closeSearchSuggestions();
  
      return false;
    };
  
    TopNavBar.unmountSearchSuggestionsLogic();
  
    searchSuggestionsElm = document.getElementById('pipara-acadeny-search-suggestions');

    
    // searchSuggestionsElm.innerHTML = '';
    // searchSuggestionsElm.style.display = 'none';
  
    for (i = 0; i < array_search_suggestions.length; i++) {
    
  
      if (array_search_suggestions[i][3]) {
          stillgo = false;
          needle = array_search_suggestions[i][3];
          if (!Array.isArray(needle)) needle = [needle];
          for (let y in needle) {
            if (val.indexOf(needle[y].toUpperCase()) > -1) stillgo = true;
          }
          if (stillgo == false) continue;
      }
  
    
      if (array_search_suggestions[i][0].toUpperCase().substr(0, val.length) == val || array_search_suggestions[i][2].toUpperCase().substr(0, val.length) == val) {
        if (resultTexts.indexOf(array_search_suggestions[i][2]) == -1) {
          resultIndexes.push(i);
          resultTexts.push(array_search_suggestions[i][2]);
          if (resultIndexes.length > 5) break;
        }
      }
    }
    for (i = 0; i < array_search_suggestions.length; i++) {
  
      if (array_search_suggestions[i][3]) {
          stillgo = false;
          needle = array_search_suggestions[i][3];
          if (!Array.isArray(needle)) needle = [needle];
          for (let y in needle) {
            if (val.indexOf(needle[y].toUpperCase()) > -1) stillgo = true;
          }
          if (stillgo == false) continue;
      }
    
      if (resultIndexes.indexOf(i) == -1 && (array_search_suggestions[i][0].toUpperCase().indexOf(val) > -1 || array_search_suggestions[i][2].toUpperCase().indexOf(val) > -1)) {
        if (resultTexts.indexOf(array_search_suggestions[i][2]) == -1) {
          resultIndexes.push(i);
          resultTexts.push(array_search_suggestions[i][2]);
          if (resultIndexes.length > 5) break;
        }
      }
    }
  
    for (i = 0; i < resultIndexes.length; i++) {
      cc = array_search_suggestions[resultIndexes[i]][2];
      pos1 = cc.toUpperCase().indexOf(val);
      dd = "";
      while (pos1 > -1) {
        c0 = cc.substr(0, pos1);
        c1 = '<span class="span_search">' + cc.substr(pos1, val.length) + '</span>';
        c2 = cc.substr(pos1 + val.length);
        dd += c0 + c1;
        posNext = c2.toUpperCase().indexOf(val);
        if (posNext > -1) {
          cc = c2;
          pos1 = posNext;
        } else {
          cc = dd + c2;
          pos1 = -1;
        }
      }
      classAtt = "";
      if (html == "") classAtt = " search_active";
      html += '<a class="search_item' + classAtt + '" href="' + array_search_suggestions[resultIndexes[i]][1] + '">' + cc + '</a>';
    }
    classAtt = "";
    if (html == "") classAtt = " search_active";
    // html += '<button class="search_item' + classAtt + '" id="search-entire-Piparaacademy-btn" style="border-top:1px solid #ddd;">Search Piparaacademy</button>';
  
    searchSuggestionsElm.innerHTML = html;
  
    if (TopNavBar.env === 'network' || TopNavBar._inIframe()) {
      searchSuggestionsElm.style.opacity = '0';
    }
  
    searchSuggestionsElm.style.display = 'block';
  
    TopNavBar.mountSearchSuggestionsLogic();
  
    TopNavBar._iframeProxyFloatingComponent(
      'TopNavBar.searchWithSuggestions',
      'pipara-acadeny-search-suggestions',
      'UPSERT',
      {
        'tagName': searchSuggestionsElm.tagName.toLowerCase(),
        'class': searchSuggestionsElm.getAttribute('class'),
        'innerHtml': html,
        'styles': {
          'display': 'block',
        },
        'mountFuncName': 'mountSearchSuggestionsLogic',
        'unmountFuncName': 'unmountSearchSuggestionsLogic',
        // 'pos': TopNavBar._getElementPos(searchSuggestionsElm)
      }
    );
  }
  
  TopNavBar.searchFieldLostFocus = function (event) {
    window.setTimeout(function () {
      TopNavBar.closeSearchSuggestions();
    }, 500);
  }
  
  TopNavBar.googleSearchAttachKeyPressHandler = function (event) {
  
    var x, n, nn, i, cc = 0, dd;
  
    var keycode = event.keyCode;
    if (keycode === 38 || keycode === 40) { //up || down
      //x = TopNavBar.element.getElementsByClassName("search_item");
      x = document.getElementsByClassName("search_item");
      for (i = 0; i < x.length; i++) {
        if (x[i].className.indexOf("search_active") > -1) {
          x[i].className = "search_item";
          n = i;
          break;
        }
      }
      if (keycode === 38) {
        nn = n - 1;
        if (nn < 0) nn = 0;
      }
      if (keycode === 40) {
        nn = n + 1;
        if (nn >= x.length) nn = nn - 1;
      }
      x[nn].className = "search_item search_active";
    }
    if (keycode === 13) {  //enter
      event.preventDefault();
      //x = TopNavBar.element.getElementsByClassName("search_item");
      x = document.getElementsByClassName("search_item");
      if (x.length === 0) {
        cc = 1;
      }
      for (i = 0; i < x.length; i++) {
        if (x[i].className.indexOf("search_active") > -1) {
          n = x[i].getAttribute('href');
          // if (n.indexOf("#search-entire-Piparaacademy") > -1) {
          if (x[i].getAttribute('id') === 'search-entire-Piparaacademy-btn') {
            cc = 1;
          }
          break;
        }
      }
      if (cc === 1) {
        TopNavBar.googleSearchSubmit();
        TopNavBar.closeSearchSuggestions();
      } else {
        if (n !== null) {
          window.location = n;
        }
      }
    }
  };
  
  TopNavBar.googleSearchInitializedCallback = function (callback) {
    if (typeof google == 'object') {
      return callback();
    }
  
    var lookupAttempts = 512; // ~ 1 minute
  
    var lookupInterval = setInterval(function () {
      if (typeof google == 'object') {
        clearInterval(lookupInterval);
  
        return callback();
      }
  
      lookupAttempts--;
  
      if (!lookupAttempts) {
        console.error('TopNavBar -> googleSearchInitializedCallback -> timeour');
  
        return clearInterval(lookupInterval);
      }
    }, 100);
  }
  
  TopNavBar.googleSearchGetInputValue = function () {
    return document.getElementById('tnb-google-search-input').value;
  }
  
  TopNavBar.googleSearchSubmit = function () {
    TopNavBar._logDebug('googleSearchSubmit');
  
    TopNavBar.googleSearchInit();
  
    if (!TopNavBar.googleSearchGetInputValue()) {
      TopNavBar._logDebug('googleSearchSubmit -> empty input');
  
      return;
    }
  
    TopNavBar.googleSearchInitializedCallback(TopNavBar.googleSearchExecute);
  };
  
  TopNavBar.googleSearchExecute = function () {
    var googleSearchInputValue = TopNavBar.googleSearchGetInputValue();
    var googleSearchExecuteRes = google.search.cse.element.getElement('standard0').execute(googleSearchInputValue);
  
    TopNavBar._logDebug('googleSearchExecute -> googleSearchInputValue, googleSearchExecuteRes: ', {
      'googleSearchInputValue': googleSearchInputValue,
      'googleSearchExecuteRes': googleSearchExecuteRes,
    });
  
    TopNavBar.googleSearchResultsShownCallback(function () {
      TopNavBar._googleSearchPatchResultLinks();
  
      if (TopNavBar._inIframe()) {
        TopNavBar.notifyParentAboutLayout('on google search results', {
          'inputValue': googleSearchInputValue,
        });
      }
    });
  };
  
  // > Google Search
  
  TopNavBar.openMenu = function () {
    var accordionNavElm = TopNavBar.element.querySelector('.tnb-mobile-nav');
    var accordionNavBtnElm = TopNavBar.element.querySelector('.top-nav-bar-menu-btn');
  
    if (accordionNavElm.classList.contains('tnb-active')) {
      accordionNavElm.classList.remove('tnb-active');
      accordionNavBtnElm.getElementsByTagName('i')[0].style.display = 'inline';
      accordionNavBtnElm.getElementsByTagName('i')[1].style.display = 'none';
      TopNavBar.closeAllNavItems();
      TopNavBar.closeMenu();
    } else {
      accordionNavElm.classList.add('tnb-active');
      accordionNavBtnElm.getElementsByTagName('i')[0].style.display = 'none';
      accordionNavBtnElm.getElementsByTagName('i')[1].style.display = 'inline';
    }
  
    TopNavBar.notifyParentAboutLayout('on menu open (toggle)');
  };
  
  TopNavBar.closeMenu = function () {
    TopNavBar.element.querySelector('.tnb-mobile-nav').classList.remove('tnb-active');
  
    var accordionNavBtnElm = TopNavBar.element.querySelector('.top-nav-bar-menu-btn');
    accordionNavBtnElm.getElementsByTagName('i')[0].style.display = 'inline';
    accordionNavBtnElm.getElementsByTagName('i')[1].style.display = 'none';
  
    TopNavBar.notifyParentAboutLayout('on menu close');
  };
  
  TopNavBar._closeMobileNav = function (sectionWrapperElm) {
    sectionWrapperElm.classList.remove('tnb-active');
  
    sectionWrapperElm.querySelector('.tnb-mobile-nav-section-body').innerHTML = '';
  
    var sectionToggleBtnElm = sectionWrapperElm.querySelector('.tnb-mobile-nav-section-toggle-btn');
  
    sectionToggleBtnElm.classList.remove('tnb-active');
  
    var sectionToggleBtnIconElm = sectionToggleBtnElm.querySelector('.tnb-icon');
  
    sectionToggleBtnIconElm.classList.remove('fa-caret-up');
    sectionToggleBtnIconElm.classList.add('fa-caret-down');
  };
  



  TopNavBar._openMobileNav = function (sectionWrapperElm, sectionId) {
    var sectionBodyElm = sectionWrapperElm.querySelector('.tnb-mobile-nav-section-body');
  
    sectionBodyElm.innerHTML = TopNavBar.element.querySelector('#nav_' + sectionId).innerHTML;
  
    var sectionFilterInputElm = sectionBodyElm.querySelector('.filter-input');
  
    if (sectionFilterInputElm) {
      sectionFilterInputElm.removeAttribute('oninput');
      sectionFilterInputElm.addEventListener('input', function (event) {
        TopNavBar.filter(event, 'sectionxs_' + sectionId);
      });
    }




  
    var sectionFilterClearBtnElm = sectionBodyElm.querySelector('.filter-clear-btn');
  
    if (sectionFilterClearBtnElm) {
      sectionFilterClearBtnElm.removeAttribute('onclick');
      sectionFilterClearBtnElm.addEventListener('click', function (event) {
        TopNavBar.clearFilter(event, 'sectionxs_' + sectionId);
      });
    }
  
    var sectionToggleBtnElm = sectionWrapperElm.querySelector('.tnb-mobile-nav-section-toggle-btn');
  
    sectionToggleBtnElm.classList.add('tnb-active');
  
    var sectionToggleBtnIconElm = sectionToggleBtnElm.querySelector('.tnb-icon');
  
    sectionToggleBtnIconElm.classList.remove('fa-caret-down');
    sectionToggleBtnIconElm.classList.add('fa-caret-up');
  
    sectionWrapperElm.classList.add('tnb-active');
  
    setTimeout(function () {
      TopNavBar._scrollMobileNav(sectionWrapperElm);
    }, 50);
  };


  
  TopNavBar._scrollMobileNav = function (targetElm, smoothScroll, scrollTopValue) {
    clearInterval(TopNavBar.mobileNavScrollInterval);
  
    var scrollElm = TopNavBar.element.querySelector('#tnb-mobile-nav');
  
    var scrollElmOffset = scrollElm.getBoundingClientRect();
  
    var targetElmOffset = targetElm.getBoundingClientRect();
  
    TopNavBar._logDebug('_scrollMobileNav: ', {
      'scrollElm': scrollElm,
      'scrollElm.scrollTop': scrollElm.scrollTop,
      'scrollElmOffset': scrollElmOffset,
      'targetElmOffset': targetElmOffset,
      'scrollTopValue': scrollTopValue,
    });
  
    if (typeof smoothScroll === 'undefined') {
      smoothScroll = true;
    }
  
    if (typeof scrollTopValue === 'undefined') {
      scrollTopValue = targetElmOffset.top + scrollElm.scrollTop - scrollElmOffset.top - 1;
    }
  
    TopNavBar._logDebug('_scrollMobileNav -> scrollTopValue: ', scrollTopValue);
    TopNavBar._logDebug('_scrollMobileNav -> scrollElm.scrollTop: ', scrollElm.scrollTop);
    TopNavBar._logDebug('_scrollMobileNav -> scrollTopValue - scrollElm.scrollTop: ', scrollTopValue - scrollElm.scrollTop);
  
    if (scrollTopValue === scrollElm.scrollTop) {
      return;
    }
  
    if (!smoothScroll) {
      scrollElm.scrollTop = scrollTopValue;
      return;
    }
  
    var scrollIntervalDelay = 2;
    var scrollAmount = 0;
    var scrollAmountPerIntervalTick = 0;
  
    if (scrollElm.scrollTop < scrollTopValue) {
      scrollAmount = scrollTopValue - scrollElm.scrollTop;
      scrollAmountPerIntervalTick = (scrollAmount / 50) + 10;
  
      TopNavBar._logDebug('_scrollMobileNav -> scrollAmount (add): ', scrollAmount);
      TopNavBar._logDebug('_scrollMobileNav -> scrollAmountPerIntervalTick (add): ', scrollAmountPerIntervalTick);
  
      TopNavBar.mobileNavScrollInterval = setInterval(function () {
        scrollElm.scrollTop += scrollAmountPerIntervalTick;
  
        if (scrollElm.scrollTop >= scrollTopValue) {
          scrollElm.scrollTop = scrollTopValue;
          clearInterval(TopNavBar.mobileNavScrollInterval);
        }
      }, scrollIntervalDelay);
    } else {
      scrollAmount = scrollElm.scrollTop - scrollTopValue;
      scrollAmountPerIntervalTick = (scrollAmount / 50) + 10;
  
      TopNavBar._logDebug('_scrollMobileNav -> scrollAmount (sub): ', scrollAmount);
      TopNavBar._logDebug('_scrollMobileNav -> scrollAmountPerIntervalTick (sub): ', scrollAmountPerIntervalTick);
  
      TopNavBar.mobileNavScrollInterval = setInterval(function () {
        scrollElm.scrollTop -= scrollAmountPerIntervalTick;
  
        if (scrollElm.scrollTop <= scrollTopValue) {
          scrollElm.scrollTop = scrollTopValue;
          clearInterval(TopNavBar.mobileNavScrollInterval);
        }
      }, scrollIntervalDelay);
    }
  }
  
  TopNavBar.toggleMobileNav = function (event, sectionId) {
    var sectionToggleBtnElm = event.target.classList.contains('PAN-button') ? event.target : event.target.parentElement;
    var sectionWrapperElm = sectionToggleBtnElm.parentElement;
  
    if (sectionWrapperElm.classList.contains('tnb-active')) { // close current section
      TopNavBar._closeMobileNav(sectionWrapperElm);
  
      setTimeout(function () {
        // TopNavBar._scrollMobileNav(sectionWrapperElm, false, 0);
        TopNavBar._scrollMobileNav(sectionWrapperElm, true, 0);
      }, 50);
    } else { // open section
      // check/close other open sections
      TopNavBar._findInnerElements(TopNavBar.element, '.tnb-mobile-nav-section.tnb-active', function (sectionWrapperElm) {
        TopNavBar._closeMobileNav(sectionWrapperElm);
      });
  
      TopNavBar._openMobileNav(sectionWrapperElm, sectionId);
    }
  };
  
  TopNavBar.openNavItem = function (navId) {
    if (TopNavBar.element.querySelector('#nav_' + navId).style.display === 'block') {
      TopNavBar.closeNavItem(navId);
  
      TopNavBar.element.classList.remove('full-screen');
    } else {
      TopNavBar.closeAllNavItems();
  
      TopNavBar.element.classList.add('full-screen');
  
      TopNavBar.element.querySelector('#nav_' + navId).style.display = 'block';
      TopNavBar.element.querySelector('#nav_' + navId).focus();
  
      if (TopNavBar.element.querySelector('#navbtn_' + navId)) {
        TopNavBar.element.querySelector('#navbtn_' + navId).getElementsByTagName('i')[0].style.display = 'none';
        TopNavBar.element.querySelector('#navbtn_' + navId).getElementsByTagName('i')[1].style.display = 'inline';
        TopNavBar.element.querySelector('#navbtn_' + navId).classList.add('mystyle');
      }
  
      TopNavBar.notifyParentAboutLayout('on nav item open', {
        'navId': navId,
      });
    }
  };
  
  TopNavBar.closeNavItem = function (navId) {
    var navItemElm = TopNavBar.element.querySelector('#nav_' + navId)
  
    if (!navItemElm) {
      return;
    }
  
    navItemElm.style.display = 'none';
  
    TopNavBar.element.classList.remove('full-screen');
  
    if (navId !== 'Books') {
      try {
        var inputAltEvent = new Event('input', {
          'bubbles': true,
          'cancelable': true
        });
  
        navItemElm.querySelector('input').value = ''
        navItemElm.querySelector('input').dispatchEvent(inputAltEvent)
      } catch (exc) {
        console.error(exc);
      }
    }
  
    if (TopNavBar.element.querySelector('#navbtn_' + navId)) {
      TopNavBar.element.querySelector('#navbtn_' + navId).getElementsByTagName('i')[0].style.display = 'inline';
      TopNavBar.element.querySelector('#navbtn_' + navId).getElementsByTagName('i')[1].style.display = 'none';
      TopNavBar.element.querySelector('#navbtn_' + navId).classList.remove('mystyle');
    }
  
    TopNavBar.notifyParentAboutLayout('on nav item close', {
      'navId': navId,
    });
  };
  
  TopNavBar.closeSearchSuggestions = function () {
    TopNavBar.unmountSearchSuggestionsLogic();
  
    var searchSuggestionsElm = document.getElementById('pipara-acadeny-search-suggestions');
    searchSuggestionsElm.style.display = 'none';
    searchSuggestionsElm.innerHTML = '';
  
    TopNavBar._iframeProxyFloatingComponent(
      'TopNavBar.closeSearchSuggestions',
      'pipara-acadeny-search-suggestions',
      'REMOVE',
      {
        // 'mountFuncName': 'mountSearchSuggestionsLogic',
        'unmountFuncName': 'unmountSearchSuggestionsLogic',
      }
    );
  };
  
  // < menu filter
  TopNavBar.allMenuItemsInCategoryAreHidden = function (menu, category) {
    var elements = menu.querySelectorAll(`[data-category="${category}"]`);
  
    for (var i = 0; i < elements.length; i++) {
      if (!elements[i].classList.contains('d-none')) {
        return false;
      }
    }
  
    return true;
  };
  
  TopNavBar.clearFilter = function (event, sectionId) {
    var filterInnerWrapperElm = event.target.classList.contains('filter-clear-btn') ? event.target.parentElement : event.target.parentElement.parentElement;
  
    var filterInputElm = filterInnerWrapperElm.querySelector('.filter-input');
    // console.log('filterInputElm: ', filterInputElm);
  
    if (filterInputElm) {
      filterInputElm.value = '';
    }
  
    TopNavBar.filter(event, sectionId, '');
  }
  
  TopNavBar._filterBooks = function (event, sectionId, filterValue) {
    // TopNavBar._logDebug('filterValue: ', filterValue);
  
    var sectionElm = TopNavBar.element.querySelector('#' + sectionId);
  
    var serviceboxesElm = sectionElm.querySelector('.serviceboxes');
  
    var noMatchElm = serviceboxesElm.querySelector('#no-match');
  
    if (noMatchElm) {
      noMatchElm.remove();
    }
  
    if (!filterValue) {
      TopNavBar._findInnerElements(serviceboxesElm, '.servicebox', function (elm) {
        elm.style.display = 'block';
      });
    } else {
      var matchFound = false;
  
      TopNavBar._findInnerElements(serviceboxesElm, '.servicebox', function (elm) {
        // TopNavBar._logDebug('elm.textContent: ', elm.textContent);
        if (elm.textContent.toLowerCase().indexOf(filterValue) !== -1) {
          elm.style.display = 'block';
  
          matchFound = true;
        } else {
          elm.style.display = 'none';
        }
      });
  
      if (!matchFound) {
        var noMatchMessage = document.createElement('div');
        noMatchMessage.id = 'no-match';
        noMatchMessage.textContent = 'No matches found';
        noMatchMessage.style.marginTop = '25px';
        noMatchMessage.style.textAlign = 'center';
        serviceboxesElm.appendChild(noMatchMessage);
      }
    }
  }
  
  TopNavBar.filter = function (event, sectionId, altValue) {
    var filterValue = typeof altValue !== 'undefined' ? altValue : event.target.value.toLowerCase();
  
    if (sectionId === 'nav_Books' || sectionId === 'sectionxs_Books') {
      return TopNavBar._filterBooks(event, sectionId, filterValue);
    }
  
    var sectionElm = TopNavBar.element.querySelector('#' + sectionId);
  
    var noMatchElm = sectionElm.querySelector('#no-match');
  
    if (noMatchElm) {
      noMatchElm.remove();
    }
  
    if (sectionId !== 'nav_Courses' && sectionId !== 'sectionxs_Courses') {
      TopNavBar._findInnerElements(sectionElm, '.black-box-container', function (elm) {
        elm.style.display = 'block';
      });
    }
  
    var uniqueCategoriesDeduplicator = {};
  
    TopNavBar._findInnerElements(sectionElm, '[data-category]', function (elm) {
      uniqueCategoriesDeduplicator[elm.getAttribute('data-category')] = true;
    });
  
    var uniqueCategories = Object.keys(uniqueCategoriesDeduplicator);
  
    TopNavBar._findInnerElements(sectionElm, '[data-name]', function (elm) {
      var dataName = elm.getAttribute('data-name');
  
      if (!dataName.includes(filterValue)) {
        elm.classList.remove('d-block');
        elm.classList.add('d-none');
      } else {
        elm.classList.remove('d-none');
        elm.classList.add('d-block');
      }
    });
  
    var emptyCategories = [];
  
    uniqueCategories.forEach(function (category) {
      var allHidden = TopNavBar.allMenuItemsInCategoryAreHidden(sectionElm, category);
  
      if (allHidden) {
        emptyCategories.push(category);
      }
  
      // hide section heading element if all inner items are hidden
      TopNavBar._findInnerElements(sectionElm, `[data-heading="${category}_title"]`, function (headingElm) {
        if (allHidden) {
          headingElm.classList.add('d-none');
        } else {
          headingElm.classList.remove('d-none');
        }
      });
    });
  
    // Checks if all categories are empty, if true displays a message "No match found..."
    if (emptyCategories.length === uniqueCategories.length) {
      var noMatchMessage = document.createElement('div');
      noMatchMessage.id = 'no-match';
      noMatchMessage.textContent = 'No matches found';
      noMatchMessage.style.marginTop = '25px';
      noMatchMessage.style.textAlign = 'center';
      sectionElm.querySelector('.PAN-content').appendChild(noMatchMessage);
  
      if (sectionId !== 'nav_Courses' && sectionId !== 'sectionxs_Courses') {
        TopNavBar._findInnerElements(sectionElm, '.black-box-container', function (elm) {
          elm.style.display = 'none';
        });
      }
    }
  };
  
  // > menu filter
  TopNavBar.sortMenu = function (sectionId, type) {
    var section = TopNavBar.element.querySelector('#nav_' + sectionId);
  
    var linkLists = TopNavBar._menuSectionsInTab[sectionId].map(function (listId) {
      return section.querySelector(`#${listId}`);
    });
  
    if (type.toLowerCase() === 'alphabetically') {
      linkLists.forEach(function (list) {
        var divsArray = TopNavBar._findInnerElements(list, 'div');
  
        // Sort the child divs.
        divsArray.sort(function (a, b) {
          var aText = a.querySelector('a').innerText;
          var bText = b.querySelector('a').innerText;
          return aText.toLowerCase().localeCompare(bText.toLowerCase());
        });
  
        // Append each sorted div back into the parent.
        divsArray.forEach(function (div) {
          list.appendChild(div);
        });
      });
    } else {
      linkLists.forEach(function (section) {
        var divsArray = TopNavBar._findInnerElements(section, 'div');
        // Sort based on original index.
        divsArray.sort(function (a, b) {
          return a.dataset.originalIndex - b.dataset.originalIndex;
        });
        // Append each sorted div back into the parent.
        divsArray.forEach(function (div) {
          section.appendChild(div);
        });
      });
    }
  };
  
  TopNavBar.closeAllNavItems = function () {
    TopNavBar.closeNavItem("Courses");
    TopNavBar.closeNavItem("Notes");
    TopNavBar.closeNavItem("certified");
    TopNavBar.closeNavItem("Books");
    TopNavBar.element.classList.remove('full-screen');
    TopNavBar.closeSearchSuggestions();
  };
  
  TopNavBar.initUserPreferredTheme = function () {
    TopNavBar.toggleUserPreferredTheme(true);
  };
  
  TopNavBar.toggleUserPreferredTheme = function (init) {
    if (typeof init === 'undefined') {
      init = false;
    }
  
    // var codeTheme = localStorage.getItem('preferredmode');
    var pageTheme = localStorage.getItem('preferredpagemode');
  
    if (!init) {
      if (pageTheme == 'dark') {
        pageTheme = 'light';
      } else {
        pageTheme = 'dark';
      }
    }
  
    var bodyClassName = document.body.className
      .replace('darktheme', '')
      .replace('darkpagetheme', '')
      .replace('  ', ' ');
  
    if (pageTheme == 'dark') {
      bodyClassName += ' darktheme';
      bodyClassName += ' darkpagetheme';
    }
  
    document.body.className = bodyClassName;
    localStorage.setItem('preferredmode', pageTheme);
    localStorage.setItem('preferredpagemode', pageTheme);
  };
  
  // generic one
  TopNavBar.mouseHandler = function (event, elm, closingOrExtra) {
    TopNavBar._logDebug('mouseHandler -> args: ', arguments);
  
    if (typeof closingOrExtra === 'undefined') {
      closingOrExtra = false;
    }
  
    var icon = elm.querySelector('i');
    if (event.type === 'keydown') {
      if (event.code !== 'Enter') return;
      if (event.code === 'Enter') {
        if (elm.id.includes('close-nav-x')) {
          TopNavBar.closeNavItem(closingOrExtra); // closingOrExtra in this case is 'Courses' | 'Notes' | 'certified' | 'Books'
          return;
        }
        var modalonEnter = elm.nextElementSibling;
        icon.className = modalonEnter.style.display === 'block' ? 'fa fa-caret-down filter-caret' : 'fa fa-caret-up filter-caret';
        modalonEnter.style.display = modalonEnter.style.display === 'block' ? 'none' : 'block';
      } else {
        event.preventDefault();
      }
    } else if (elm.id.includes('close-nav-x')) {
      TopNavBar.closeNavItem(closingOrExtra); // closingOrExtra in this case is 'Courses' | 'Notes' | 'certified' | 'Books'
    } else {
      var modalonKeydown = elm.querySelector(".filter-modal-container");
      icon.className = closingOrExtra ? 'fa fa-caret-down filter-caret' : 'fa fa-caret-up filter-caret';
      modalonKeydown.style.display = closingOrExtra ? 'none' : 'block';
    }
  };
  
  TopNavBar._attachMenuSortLogic = function () {
    TopNavBar._logDebug('_attachMenuSortLogic');
  
    // used for restoring original sort order
    var storeOriginalSortIndexes = function () {
      var menus = [];
  
      TopNavBar._loopObj(TopNavBar._menuSectionsInTab, function (tabListIds, tabId) {
        menus.push(
          tabListIds.map(function (listId) {
            return TopNavBar.element.querySelector(`#nav_${tabId}`).querySelector(`#${listId}`);
          })
        );
      });
  
      menus.forEach(function (lists) {
        lists.forEach(function (list) {
          TopNavBar._findInnerElements(list, 'div', function (divElm, divElmIndex) {
            divElm.dataset.originalIndex = divElmIndex;
          });
        })
      });
    };
  
    storeOriginalSortIndexes();
  
    var attachSortBtnEventListeners = function (sortBtnElm) {
      sortBtnElm.addEventListener('mouseenter', function (event) {
        TopNavBar.mouseHandler(event, sortBtnElm, false);
      });
  
      sortBtnElm.addEventListener('mouseleave', function (event) {
        TopNavBar.mouseHandler(event, sortBtnElm, true);
      });
  
      sortBtnElm.addEventListener('focusout', function (event) {
        var isClickInside = sortBtnElm.contains(event.relatedTarget);
  
        if (!isClickInside) {
          sortBtnElm.querySelector('.filter-modal-container').style.display = 'none';
        }
      })
    };
  
    var enabledSortNavs = ['Courses', 'Notes', 'certified'];
  
    TopNavBar._loopArray(enabledSortNavs, function (sortNav) {
      var sortBtnElm = TopNavBar.element.querySelector('#' + sortNav + '-sort-btn');
  
      if (sortBtnElm) {
        attachSortBtnEventListeners(sortBtnElm);
  
        var sortFilterContainer = sortBtnElm.querySelector(".filter-modal");
        TopNavBar._logDebug('sortNav, sortFilterContainer: ', {
          sortNav: sortNav,
          sortFilterContainer: sortFilterContainer
        });
  
        if (sortFilterContainer) {
          TopNavBar._findInnerElements(sortFilterContainer, 'button', function (buttonElm) {
            buttonElm.addEventListener('click', function (event) {
              TopNavBar._logDebug('sortNav click: ', {
                sortNav: sortNav,
                eventTarget: event.target
              });
  
              var sortBy = event.target.innerText;
              TopNavBar.element.querySelector(`#${sortNav}-active-sorting`).textContent = sortBy;
  
              var sortByBtn = sortFilterContainer.querySelector(`#${sortNav}-${sortBy.toLowerCase()}`);
              sortFilterContainer.querySelector('.PAN-button.active').classList.remove('active');
  
              sortByBtn.classList.add('active');
              TopNavBar.sortMenu(sortNav, sortBy);
            });
          });
        }
      }
    });
  };
  
  // < legacy mapping
  window.PAN_open = TopNavBar.openMenu;
  window.PAN_close = TopNavBar.closeMenu;
  window.PAN_open_nav = TopNavBar.openNavItem;
  window.PAN_close_nav = TopNavBar.closeNavItem;
  window.PAN_close_all_topnav = TopNavBar.closeAllNavItems;
  window.open_search = TopNavBar.googleSearchFocusInput;
  window.gSearch = TopNavBar.googleSearchInit;
  // > legacy mapping
  
  TopNavBar.init();




// ======================================================================

const subjectUnits = {
    "Introduction to Information Technology": [
        {
            title: "Introduction to Computer",
            description: "Learn the history, evolution, and fundamental concepts of computing technology",
            topics: ["Computer generations", "Computer classification", "Basic computer architecture"]
        },
        {
            title: "The Computer System Hardware",
            description: "Explore the physical components that make up a computer system",
            topics: ["CPU architecture", "Motherboard components", "Storage devices", "Peripherals"]
        },
        {
            title: "Computer Memory",
            description: "Understand different types of memory and their roles in computer systems",
            topics: ["RAM vs ROM", "Cache memory", "Virtual memory", "Storage hierarchies"]
        },
        {
            title: "Input and Output Devices",
            description: "",
            topics: []
        },
        {
            title: "Data Representation",
            description: "",
            topics: []
        },
        {
            title: "Computer Software",
            description: "",
            topics: []
        },
        {
            title: "Data Communication and Computer Network",
            description: "",
            topics: []
        },
        {
            title: "The Internet and Internet Services",
            description: "",
            topics: []
        },
        {
            title: "Fundamentals of Database",
            description: "",
            topics: []
        },
        {
            title: "Multimedia",
            description: "",
            topics: []
        },
        {
            title: "Computer Security",
            description: "",
            topics: []
        }
    ],
    "C Programming": [
        {
            title: "Problem Solving with Computer",
            description: "Learn algorithmic thinking and problem-solving techniques",
            topics: ["Algorithm design", "Flowcharts", "Pseudocode", "Problem decomposition"]
        },
        {
            title: "Elements of C",
            description: "Master the fundamental building blocks of the C programming language",
            topics: ["Data types", "Variables", "Operators", "Control structures"]
        },
        {
            title: "Input and Output",
            description: "",
            topics: []
        },
        {
            title: "Operators and Expression",
            description: "",
            topics: []
        },
        {
            title: "Control Statement",
            description: "",
            topics: []
        },
        {
            title: "Arrays",
            description: "",
            topics: []
        },
        {
            title: "Functions",
            description: "Understand function design, implementation, and usage in C",
            topics: ["Function declaration", "Parameters", "Recursion", "Scope rules"]
        },
        {
            title: "Structure and Union",
            description: "",
            topics: []
        },
        {
            title: "Pointers",
            description: "",
            topics: []
        },
        {
            title: "File Handling in C",
            description: "",
            topics: []
        },
        {
            title: "Introduction to Graphics",
            description: "",
            topics: []
        }
    ],
    "Digital Logic": [
        {
            title: "Binary Systems",
            description: "Explore the foundation of digital computing with binary numbers",
            topics: ["Binary arithmetic", "Number conversions", "Signed numbers", "Binary codes"]
        },
        {
            title: "Boolean Algebra and Logic Gates",
            description: "Learn the mathematical foundation of digital circuit design",
            topics: ["Boolean operators", "Logic gates", "Truth tables", "Boolean laws"]
        },
        {
            title: "Simplification of Boolean Functions",
            description: "",
            topics: []
        },
        {
            title: "Combinational Logic",
            description: "Design and analyze circuits with outputs based solely on current inputs",
            topics: ["Adders", "Multiplexers", "Decoders", "Combinational circuit design"]
        },
        {
            title: "Combinational Logic with MSI and LSI",
            description: "",
            topics: []
        },
        {
            title: "Synchronous and Asynchronous Sequential Logic",
            description: "",
            topics: []
        },
        {
            title: "Registers and Counters",
            description: "",
            topics: []
        }
    ],
    "Mathematics I (Calculus)": [
        {
            title: "Function of One Variable",
            description: "Explore mathematical functions and their properties",
            topics: ["Domain and range", "Graphs of functions", "Composite functions", "Inverse functions"]
        },
        {
            title: "Limits and Continuity",
            description: "Understand the fundamental concepts of calculus",
            topics: ["Limit definitions", "Continuity tests", "Discontinuities", "Intermediate value theorem"]
        },
        {
            title: "Derivatives",
            description: "Master the concept of rates of change and slopes of curves",
            topics: ["Derivative rules", "Chain rule", "Implicit differentiation", "Applications"]
        },
        {
            title: "Applications of Derivatives",
            description: "",
            topics: []
        },
        {
            title: "Antiderivatives",
            description: "",
            topics: []
        },
        {
            title: "Applications of Antiderivatives",
            description: "",
            topics: []
        },
        {
            title: "Ordinary Differential Equations",
            description: "",
            topics: []
        },
        {
            title: "Infinite Sequence and Series",
            description: "",
            topics: []
        },
        {
            title: "Plane and Space Vectors",
            description: "",
            topics: []
        },
        {
            title: "Partial Derivatives and Multiple Integrals",
            description: "",
            topics: []
        },
        {
            title: "Old Syllabus",
            description: "",
            topics: []
        }
    ],
    "Physics": [
        {
            title: "Rotational Dynamics and Oscillatory Motion",
            description: "Study motion of rigid bodies and periodic oscillations",
            topics: ["Torque", "Moment of inertia", "Simple harmonic motion", "Pendulum motion"]
        },
        {
            title: "Electric and Magnetic Field",
            description: "Explore the fundamental forces of electromagnetism",
            topics: ["Coulomb's law", "Gauss's law", "Magnetic fields", "Electromagnetic induction"]
        },
        {
            title: "Fundamentals of Atomic Theory",
            description: "",
            topics: []
        },
        {
            title: "Methods of Quantum Mechanics",
            description: "",
            topics: []
        },
        {
            title: "Fundamentals of Solid State Physics",
            description: "",
            topics: []
        },
        {
            title: "Semiconductor and Semiconductor devices",
            description: "Understand the physics behind modern electronic components",
            topics: ["Band theory", "Diodes", "Transistors", "Integrated circuits"]
        },
        {
            title: "Universal Gates and Physics of Integrated Circuits",
            description: "",
            topics: []
        }
    ],
    "Discrete Structures": [
        {
            title: "Basic Discrete Structures",
            description: "",
            topics: []
        },
        {
            title: "Integers and Matrices",
            description: "",
            topics: []
        },
        {
            title: "Logic and Proof Methods",
            description: "",
            topics: []
        },
        {
            title: "Induction and Recursion",
            description: "",
            topics: []
        },
        {
            title: "Counting and Discrete Probability",
            description: "",
            topics: []
        },
        {
            title: "Relations and Graphs",
            description: "",
            topics: []
        }
    ],
    "Object Oriented Programming": [
        {
            title: "Introduction to Object Oriented Programming",
            description: "Learn the fundamental principles of object-oriented programming",
            topics: ["Classes and objects", "Encapsulation", "Abstraction", "OOP vs procedural"]
        },
        {
            title: "Basics of C++ programming",
            description: "",
            topics: []
        },
        {
            title: "Classes & Objects",
            description: "Master the building blocks of OOP systems",
            topics: ["Class definition", "Constructors", "Methods", "Access modifiers"]
        },
        {
            title: "Operator Overloading",
            description: "",
            topics: []
        },
        {
            title: "Inheritance",
            description: "Understand how classes can inherit properties from other classes",
            topics: ["Superclass/subclass", "Method overriding", "Abstract classes", "Inheritance hierarchies"]
        },
        {
            title: "Virtual Function, Polymorphism, and miscellaneous",
            description: "",
            topics: []
        },
        {
            title: "Function Templates and Exception Handling",
            description: "",
            topics: []
        },
        {
            title: "File handling",
            description: "",
            topics: []
        }
    ],
    "Microprocessor": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "Basic Architecture",
            description: "",
            topics: []
        },
        {
            title: "Instruction Cycle",
            description: "",
            topics: []
        },
        {
            title: "Basic I/O, Memory R/W and Interrupt Operations",
            description: "",
            topics: []
        },
        {
            title: "Assembly Language Programming",
            description: "",
            topics: []
        },
        {
            title: "Input/ Output Interfaces",
            description: "",
            topics: []
        },
        {
            title: "Advanced Microprocessors",
            description: "",
            topics: []
        }
    ],
    "Statistics I": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "Descriptive Statistics",
            description: "",
            topics: []
        },
        {
            title: "Introduction to Probability",
            description: "",
            topics: []
        },
        {
            title: "Sampling",
            description: "",
            topics: []
        },
        {
            title: "Random Variables and Mathematical Expectation",
            description: "",
            topics: []
        },
        {
            title: "Probability Distributions",
            description: "",
            topics: []
        },
        {
            title: "Correlation and Linear Regression",
            description: "",
            topics: []
        }
    ],
    "Mathematics II": [
        {
            title: "Linear Equations in Linear Algebra",
            description: "",
            topics: []
        },
        {
            title: "Transformation",
            description: "",
            topics: []
        },
        {
            title: "Matrix Algebra",
            description: "",
            topics: []
        },
        {
            title: "Determinants",
            description: "",
            topics: []
        },
        {
            title: "Vector Spaces",
            description: "",
            topics: []
        },
        {
            title: "Vector Space Continued",
            description: "",
            topics: []
        },
        {
            title: "Eigenvalues and Eigen Vectors",
            description: "",
            topics: []
        },
        {
            title: "Orthogonality and Least Squares",
            description: "",
            topics: []
        },
        {
            title: "Groups and Subgroups",
            description: "",
            topics: []
        },
        {
            title: "Rings and Fields",
            description: "",
            topics: []
        }
    ],
    "Data Structures and Algorithms": [
        {
            title: "Introduction to Data Structures & Algorithms",
            description: "Learn to analyze the efficiency of algorithms",
            topics: ["Time complexity", "Space complexity", "Big O notation", "Algorithm efficiency"]
        },
        {
            title: "Stack",
            description: "",
            topics: []
        },
        {
            title: "Queue",
            description: "",
            topics: []
        },
        {
            title: "Recursion",
            description: "",
            topics: []
        },
        {
            title: "Lists",
            description: "",
            topics: []
        },
        {
            title: "Sorting",
            description: "",
            topics: []
        },
        {
            title: "Searching and Hashing",
            description: "",
            topics: []
        },
        {
            title: "Trees and Graphs",
            description: "Understand hierarchical data structures and their applications",
            topics: ["Tree terminology", "Binary trees", "BST operations", "Tree traversals"]
        }
    ],
    "Numerical Method": [
        {
            title: "Solution of Nonlinear Equations",
            description: "",
            topics: []
        },
        {
            title: "Interpolation and Regression",
            description: "",
            topics: []
        },
        {
            title: "Numerical Differentiation and Integration",
            description: "",
            topics: []
        },
        {
            title: "Solving System of Linear Equations",
            description: "",
            topics: []
        },
        {
            title: "Solution of Ordinary Differential Equations",
            description: "",
            topics: []
        },
        {
            title: "Solution of Partial Differential Equations",
            description: "",
            topics: []
        }
    ],
    "Computer Architecture": [
        {
            title: "Data Representation",
            description: "",
            topics: []
        },
        {
            title: "Register Transfer and Microoperations",
            description: "",
            topics: []
        },
        {
            title: "Basic Computer Organization and Design",
            description: "",
            topics: []
        },
        {
            title: "Microprogrammed Control",
            description: "",
            topics: []
        },
        {
            title: "Central Processing Unit",
            description: "",
            topics: []
        },
        {
            title: "Pipelining",
            description: "",
            topics: []
        },
        {
            title: "Computer Arithmetic",
            description: "",
            topics: []
        },
        {
            title: "Input Output Organization",
            description: "",
            topics: []
        },
        {
            title: "Memory Organization",
            description: "",
            topics: []
        }
    ],
    "Computer Graphics": [
        {
            title: "Introduction of Computer Graphics",
            description: "",
            topics: []
        },
        {
            title: "Scan Conversion Algorithm",
            description: "",
            topics: []
        },
        {
            title: "Two-Dimensional Geometric Transformations",
            description: "",
            topics: []
        },
        {
            title: "Three-Dimensional Geometric Transformation",
            description: "",
            topics: []
        },
        {
            title: "3D Objects Representation",
            description: "",
            topics: []
        },
        {
            title: "Solid Modeling",
            description: "",
            topics: []
        },
        {
            title: "Visible Surface Detections",
            description: "",
            topics: []
        },
        {
            title: "Illumination Models and Surface Rendering Techniq",
            description: "",
            topics: []
        },
        {
            title: "Introduction to Virtual Reality",
            description: "",
            topics: []
        },
        {
            title: "Introduction to OpenGL",
            description: "",
            topics: []
        }
    ],
    "Statistics II": [
        {
            title: "Sampling Distribution and Estimation",
            description: "",
            topics: []
        },
        {
            title: "Testing of hypothesis",
            description: "",
            topics: []
        },
        {
            title: "Non parametric test",
            description: "",
            topics: []
        },
        {
            title: "Multiple correlation and regression",
            description: "",
            topics: []
        },
        {
            title: "Design of experiment",
            description: "",
            topics: []
        },
        {
            title: "Stochastic Process",
            description: "",
            topics: []
        }
    ],
    "Theory of Computation": [
        {
            title: "Basic Foundations",
            description: "",
            topics: []
        },
        {
            title: "Introduction to Finite Automata",
            description: "",
            topics: []
        },
        {
            title: "Regular Expressions",
            description: "",
            topics: []
        },
        {
            title: "Context Free Grammar",
            description: "",
            topics: []
        },
        {
            title: "Push Down Automata",
            description: "",
            topics: []
        },
        {
            title: "Turing Machines",
            description: "",
            topics: []
        },
        {
            title: "Undecidability and Intractability",
            description: "",
            topics: []
        }
    ],
    "Computer Networks": [
        {
            title: "Introduction to Computer Network",
            description: "Understand the basic concepts of computer networking",
            topics: ["Network types", "Topologies", "Protocols", "OSI model"]
        },
        {
            title: "Physical Layer and Network Media",
            description: "",
            topics: []
        },
        {
            title: "Data Link Layer",
            description: "",
            topics: []
        },
        {
            title: "Network Layer",
            description: "",
            topics: []
        },
        {
            title: "Transport Layer",
            description: "Learn about end-to-end communication services",
            topics: ["TCP", "UDP", "Flow control", "Congestion control"]
        },
        {
            title: "Application Layer",
            description: "Explore network applications and their protocols",
            topics: ["HTTP", "FTP", "SMTP", "DNS"]
        },
        {
            title: "Multimedia &Future Networking",
            description: "",
            topics: []
        }
    ],
    "Operating Systems": [
        {
            title: "Operating System Overview",
            description: "Explore the fundamental concepts of operating systems",
            topics: ["OS functions", "Kernel types", "System calls", "OS evolution"]
        },
        {
            title: "Process Management",
            description: "Understand how operating systems manage program execution",
            topics: ["Process states", "Context switching", "Scheduling algorithms", "Inter-process communication"]
        },
        {
            title: "Process Deadlocks",
            description: "",
            topics: []
        },
        {
            title: "Memory Management",
            description: "Learn how operating systems manage computer memory",
            topics: ["Paging", "Segmentation", "Virtual memory", "Memory allocation"]
        },
        {
            title: "File Management",
            description: "",
            topics: []
        },
        {
            title: "Device Management",
            description: "",
            topics: []
        },
        {
            title: "Linux Case Study",
            description: "",
            topics: []
        }
    ],
    "Database Management System": [
        {
            title: "Database and Database Users",
            description: "Learn the fundamental principles of database systems",
            topics: ["Data models", "Database architecture", "DBMS components", "Data independence"]
        },
        {
            title: "Database System – Concepts and Architecture",
            description: "",
            topics: []
        },
        {
            title: "Data Modeling Using the Entity-Relational Model",
            description: "",
            topics: []
        },
        {
            title: "The Relational Data Model and Relational Database",
            description: "Master the most widely used database model",
            topics: ["Relations and tuples", "Keys and constraints", "Relational algebra", "Normalization"]
        },
        {
            title: "The Relational Algebra and Relational Calculus",
            description: "",
            topics: []
        },
        {
            title: "SQL",
            description: "Learn to interact with databases using SQL",
            topics: ["DDL commands", "DML commands", "Queries", "Joins and subqueries"]
        },
        {
            title: "Relational Database Design",
            description: "",
            topics: []
        },
        {
            title: "Introduction to Transaction Processing Concepts an",
            description: "",
            topics: []
        },
        {
            title: "Concurrency Control Techniques",
            description: "",
            topics: []
        },
        {
            title: "Database Recovery Techniques",
            description: "",
            topics: []
        }
    ],
    "Artificial Intelligence": [
        {
            title: "Introduction",
            description: "Fundamentals of AI and machine learning",
            topics: ["AI history", "AI approaches", "Applications of AI"]
        },
        {
            title: "Intelligent Agents",
            description: "",
            topics: []
        },
        {
            title: "Problem Solving by Searching",
            description: "",
            topics: []
        },
        {
            title: "Knowledge Representation",
            description: "",
            topics: []
        },
        {
            title: "Machine Learning",
            description: "",
            topics: []
        },
        {
            title: "Applications of AI",
            description: "",
            topics: []
        }
    ],
    "Microprocessor Based Design": [
        {
            title: "Introduction to Microcontroller",
            description: "",
            topics: []
        },
        {
            title: "Sensors and Actuators",
            description: "",
            topics: []
        },
        {
            title: "Bus and Communication Technology",
            description: "",
            topics: []
        },
        {
            title: "Introduction to 8051 Microcontroller and Programming",
            description: "",
            topics: []
        },
        {
            title: "Electromagnetic Interference and Compatibility",
            description: "",
            topics: []
        }
    ],
    "Wireless Networking": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "Wireless Channel Characterization",
            description: "",
            topics: []
        },
        {
            title: "Wireless Communication Techniques",
            description: "",
            topics: []
        },
        {
            title: "Fundamental of Cellular Communications",
            description: "",
            topics: []
        },
        {
            title: "Mobility Management in Wireless Networks",
            description: "",
            topics: []
        },
        {
            title: "Overview of Mobile Network and Transport Layer",
            description: "",
            topics: []
        },
        {
            title: "Advances in Wireless Networking",
            description: "",
            topics: []
        }
    ],
    "Multimedia Computing": [
        {
            title: "Introduction to Computers",
            description: "",
            topics: []
        },
        {
            title: "Sound Audio System",
            description: "",
            topics: []
        },
        {
            title: "Images and Graphics",
            description: "",
            topics: []
        },
        {
            title: "Video and Animation",
            description: "",
            topics: []
        },
        {
            title: "Data Compression",
            description: "",
            topics: []
        },
        {
            title: "User Interfaces",
            description: "",
            topics: []
        },
        {
            title: "Abstractions for programming",
            description: "",
            topics: []
        },
        {
            title: "Multimedia Application",
            description: "",
            topics: []
        }
    ],
    "Web Technology": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "Hyper Text Markup Language",
            description: "",
            topics: []
        },
        {
            title: "Cascading Style Sheets",
            description: "",
            topics: []
        },
        {
            title: "Client Side Scripting with JavaScript",
            description: "",
            topics: []
        },
        {
            title: "AJAX and XML",
            description: "",
            topics: []
        },
        {
            title: "Server Side Scripting using PHP",
            description: "",
            topics: []
        }
    ],
    "System Analysis and Design": [
        {
            title: "Foundations for Systems Development",
            description: "",
            topics: []
        },
        {
            title: "Planning",
            description: "",
            topics: []
        },
        {
            title: "Analysis",
            description: "",
            topics: []
        },
        {
            title: "Design",
            description: "",
            topics: []
        },
        {
            title: "Implementation and Maintenance",
            description: "",
            topics: []
        },
        {
            title: "Introduction to Object-Oriented Development",
            description: "",
            topics: []
        }
    ],
    "Society and Ethics in Information Technology": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "Social and cultural change",
            description: "",
            topics: []
        },
        {
            title: "Understanding development",
            description: "",
            topics: []
        },
        {
            title: "Process of transformation",
            description: "",
            topics: []
        },
        {
            title: "Ethics and Ethical Analysis",
            description: "",
            topics: []
        },
        {
            title: "Intellectual Property Rights and Computer Technology",
            description: "",
            topics: []
        },
        {
            title: "Social Context of Computing",
            description: "",
            topics: []
        },
        {
            title: "Software Issues",
            description: "",
            topics: []
        },
        {
            title: "New Frontiers for Computer Ethics",
            description: "",
            topics: []
        }
    ],
    "Knowledge Management": [],
    "Design and Analysis of Algorithms": [
        {
            title: "Foundation of Algorithm Analysis",
            description: "",
            topics: []
        },
        {
            title: "Iterative Algorithms",
            description: "",
            topics: []
        },
        {
            title: "Divide and Conquer Algorithms",
            description: "",
            topics: []
        },
        {
            title: "Greedy Algorithms",
            description: "",
            topics: []
        },
        {
            title: "Dynamic Programming",
            description: "",
            topics: []
        },
        {
            title: "Backtracking",
            description: "",
            topics: []
        },
        {
            title: "Number Theoretic Algorithms",
            description: "",
            topics: []
        },
        {
            title: "NP Completeness",
            description: "",
            topics: []
        }
    ],
    "Simulation and Modelling": [
        {
            title: "Introduction to Simulation",
            description: "",
            topics: []
        },
        {
            title: "Simulation of Continuous and Discrete System",
            description: "",
            topics: []
        },
        {
            title: "Queuing System",
            description: "",
            topics: []
        },
        {
            title: "Markov Chains",
            description: "",
            topics: []
        },
        {
            title: "Random Numbers",
            description: "",
            topics: []
        },
        {
            title: "Verification and Validation",
            description: "",
            topics: []
        },
        {
            title: "Analysis of Simulation Output",
            description: "",
            topics: []
        },
        {
            title: "Simulation of Computer Systems",
            description: "",
            topics: []
        }
    ],
    "Image Processing": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "Image Enhancement and Filter in Spatial Domain",
            description: "",
            topics: []
        },
        {
            title: "Introduction to Morphological Image Processing",
            description: "",
            topics: []
        },
        {
            title: "Image Segmentation",
            description: "",
            topics: []
        },
        {
            title: "Representations, Description and Recognition",
            description: "",
            topics: []
        }
    ],
    "Cryptography": [
        {
            title: "Introduction and Classical Ciphers",
            description: "",
            topics: []
        },
        {
            title: "Symmetric Ciphers",
            description: "",
            topics: []
        },
        {
            title: "Asymmetric Ciphers",
            description: "",
            topics: []
        },
        {
            title: "Cryptographic Hash Functions and Digital Signature",
            description: "",
            topics: []
        },
        {
            title: "Authentication",
            description: "",
            topics: []
        },
        {
            title: "Malicious Logic",
            description: "",
            topics: []
        },
        {
            title: "Network Security and Public Key Infrastructure",
            description: "",
            topics: []
        }
    ],
    "Software Engineering": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "Software Processes",
            description: "",
            topics: []
        },
        {
            title: "Agile Software Development",
            description: "",
            topics: []
        },
        {
            title: "Requirements Engineering",
            description: "",
            topics: []
        },
        {
            title: "System Modeling",
            description: "",
            topics: []
        },
        {
            title: "Architectural Design",
            description: "",
            topics: []
        },
        {
            title: "Design and Implementation",
            description: "",
            topics: []
        },
        {
            title: "Software Testing",
            description: "",
            topics: []
        },
        {
            title: "Software Evolution",
            description: "",
            topics: []
        },
        {
            title: "Software Management",
            description: "",
            topics: []
        }
    ],
    "Compiler Design and Construction": [
        {
            title: "Unit 1",
            description: "",
            topics: []
        },
        {
            title: "Unit 2",
            description: "",
            topics: []
        },
        {
            title: "Unit 3",
            description: "",
            topics: []
        },
        {
            title: "Unit 4",
            description: "",
            topics: []
        }
    ],
    "E-Governance": [
        {
            title: "Introduction to E-Government and E-Governance",
            description: "",
            topics: []
        },
        {
            title: "Models of E-Governance",
            description: "",
            topics: []
        },
        {
            title: "E-Government Infrastructure Development",
            description: "",
            topics: []
        },
        {
            title: "Security for e-Government",
            description: "",
            topics: []
        },
        {
            title: "Applications of Data Warehousing and Data Mining in Government",
            description: "",
            topics: []
        },
        {
            title: "Case Studies",
            description: "",
            topics: []
        }
    ],
    "NET Centric Computing": [
        {
            title: "Language Preliminaries",
            description: "",
            topics: []
        },
        {
            title: "Introduction to ASP.NET",
            description: "",
            topics: []
        },
        {
            title: "HTTP and ASP.NET Core",
            description: "",
            topics: []
        },
        {
            title: "Creating ASP.NET core MVC applications",
            description: "",
            topics: []
        },
        {
            title: "Working with Database",
            description: "",
            topics: []
        },
        {
            title: "State Management on ASP.NET Core Application",
            description: "",
            topics: []
        },
        {
            title: "Client-side Development in ASP.NET Core",
            description: "",
            topics: []
        },
        {
            title: "Securing in ASP.NET Core Application",
            description: "",
            topics: []
        },
        {
            title: "Hosting and Deploying ASP.NET Core Application",
            description: "",
            topics: []
        }
    ],
    "Technical Writing": [
        {
            title: "What Is Technical Writing",
            description: "",
            topics: []
        },
        {
            title: "Audience and Purpose",
            description: "",
            topics: []
        },
        {
            title: "Writing Process",
            description: "",
            topics: []
        },
        {
            title: "Brief Correspondence",
            description: "",
            topics: []
        },
        {
            title: "Document Design and Graphics",
            description: "",
            topics: []
        },
        {
            title: "Writing for the Web",
            description: "",
            topics: []
        },
        {
            title: "Information Reports",
            description: "",
            topics: []
        },
        {
            title: "Employment Communication",
            description: "",
            topics: []
        },
        {
            title: "Presentations",
            description: "",
            topics: []
        },
        {
            title: "Recommendation Reports",
            description: "",
            topics: []
        },
        {
            title: "Proposals",
            description: "",
            topics: []
        },
        {
            title: "Ethics in the Workplace",
            description: "",
            topics: []
        }
    ],
    "Applied Logic": [
        {
            title: "Argument Analysis",
            description: "",
            topics: []
        },
        {
            title: "Categorical Propositions and Syllogisms",
            description: "",
            topics: []
        },
        {
            title: "Symbolic Logic",
            description: "",
            topics: []
        },
        {
            title: "Quantification Theory",
            description: "",
            topics: []
        },
        {
            title: "Fallacies",
            description: "",
            topics: []
        },
        {
            title: "Analogical and Casual Reasoning",
            description: "",
            topics: []
        }
    ],
    "E-commerce": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "E-commerce Business Model",
            description: "",
            topics: []
        },
        {
            title: "Electronic Payment System",
            description: "",
            topics: []
        },
        {
            title: "Building E-commerce System",
            description: "",
            topics: []
        },
        {
            title: "Security in E-Commerce",
            description: "",
            topics: []
        },
        {
            title: "Digital Marketing",
            description: "",
            topics: []
        },
        {
            title: "Optimizing E-commerce Systems",
            description: "",
            topics: []
        }
    ],
    "Automation and Robotics": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "Power Sources and Sensors",
            description: "",
            topics: []
        },
        {
            title: "Manipulators, Actuators, and Grippers",
            description: "",
            topics: []
        },
        {
            title: "Kinematics and Path Planning",
            description: "",
            topics: []
        },
        {
            title: "Process Control",
            description: "",
            topics: []
        },
        {
            title: "Case Studies",
            description: "",
            topics: []
        }
    ],
    "Neural Networks": [
        {
            title: "Introduction to Neural Network",
            description: "",
            topics: []
        },
        {
            title: "Rosenblatt’s Perceptron",
            description: "",
            topics: []
        },
        {
            title: "Model Building through Regression",
            description: "",
            topics: []
        },
        {
            title: "The Least-Mean-Square Algorithm",
            description: "",
            topics: []
        },
        {
            title: "Multilayer Perceptron",
            description: "",
            topics: []
        },
        {
            title: "Kernel Methods and Radial-Basis Function Networks",
            description: "",
            topics: []
        },
        {
            title: "Self-Organizing Maps",
            description: "",
            topics: []
        },
        {
            title: "Dynamic Driven Recurrent Networks",
            description: "",
            topics: []
        }
    ],
    "Computer Hardware Design": [
        {
            title: "Computer Abstractions and Technology",
            description: "",
            topics: []
        },
        {
            title: "Instructions: Language of the Computer",
            description: "",
            topics: []
        },
        {
            title: "Arithmetic for Computers",
            description: "",
            topics: []
        },
        {
            title: "The Processor",
            description: "",
            topics: []
        },
        {
            title: "Large and Fast: Exploiting Memory Hierarchy",
            description: "",
            topics: []
        },
        {
            title: "Storage and Other I/O Topics",
            description: "",
            topics: []
        },
        {
            title: "Multicores, Multiprocessors, and Clusters",
            description: "",
            topics: []
        }
    ],
    "Cognitive Science": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "Precursors of Cognitive Science",
            description: "",
            topics: []
        },
        {
            title: "Psycological Perspective of Cognition",
            description: "",
            topics: []
        },
        {
            title: "Physical Symbol System and Language of Thought",
            description: "",
            topics: []
        },
        {
            title: "Cognitive System",
            description: "",
            topics: []
        },
        {
            title: "Brain Mapping",
            description: "",
            topics: []
        },
        {
            title: "Mind Reading",
            description: "",
            topics: []
        },
        {
            title: "Neural Networks and Distributed Information Processing",
            description: "",
            topics: []
        }
    ],
    "Advanced Java Programming": [
        {
            title: "Programming in Java",
            description: "",
            topics: []
        },
        {
            title: "User Interface Components with Swing",
            description: "",
            topics: []
        },
        {
            title: "Event Handling",
            description: "",
            topics: []
        },
        {
            title: "Database Connectivity",
            description: "",
            topics: []
        },
        {
            title: "Network Programming",
            description: "",
            topics: []
        },
        {
            title: "GUI with JavaFX",
            description: "",
            topics: []
        },
        {
            title: "Servlets and Java Server pages",
            description: "",
            topics: []
        },
        {
            title: "RMI and CORBA",
            description: "",
            topics: []
        }
    ],
    "Data Warehousing and Data Mining": [
        {
            title: "Introduction to Data Warehousing",
            description: "",
            topics: []
        },
        {
            title: "Introduction to Data Mining",
            description: "",
            topics: []
        },
        {
            title: "Data Preprocessing",
            description: "",
            topics: []
        },
        {
            title: "Data Cube Technology",
            description: "",
            topics: []
        },
        {
            title: "Mining Frequent Patterns",
            description: "",
            topics: []
        },
        {
            title: "Classification and Prediction",
            description: "",
            topics: []
        },
        {
            title: "Cluster Analysis",
            description: "",
            topics: []
        },
        {
            title: "Graph Mining and Social Network Analysis",
            description: "",
            topics: []
        },
        {
            title: "Mining Spatial, Multimedia, Text and Web Data",
            description: "",
            topics: []
        }
    ],
    "Principles of Management": [
        {
            title: "The Nature of Organizations",
            description: "",
            topics: []
        },
        {
            title: "Introduction to Management",
            description: "",
            topics: []
        },
        {
            title: "Evolution of Management Thought",
            description: "",
            topics: []
        },
        {
            title: "Environmental Context of Management",
            description: "",
            topics: []
        },
        {
            title: "Planning and Decision Making",
            description: "",
            topics: []
        },
        {
            title: "Organizing Function",
            description: "",
            topics: []
        },
        {
            title: "Leadership & Conflict",
            description: "",
            topics: []
        },
        {
            title: "Motivation",
            description: "",
            topics: []
        },
        {
            title: "Communication",
            description: "",
            topics: []
        },
        {
            title: "Control and Quality Management",
            description: "",
            topics: []
        },
        {
            title: "Global Context of Management",
            description: "",
            topics: []
        },
        {
            title: "Management Trends and Scenario in Nepal",
            description: "",
            topics: []
        }
    ],
    "Project Work": [],
    "Information Retrieval": [
        {
            title: "Introduction to IR and Web Search",
            description: "",
            topics: []
        },
        {
            title: "Text properties, operations and preprocessing",
            description: "",
            topics: []
        },
        {
            title: "Basic IR Models",
            description: "",
            topics: []
        },
        {
            title: "Evaluation of IR",
            description: "",
            topics: []
        },
        {
            title: "Query Operations and Languages",
            description: "",
            topics: []
        },
        {
            title: "Web Search",
            description: "",
            topics: []
        },
        {
            title: "Text Categorization",
            description: "",
            topics: []
        },
        {
            title: "Text Clustering",
            description: "",
            topics: []
        },
        {
            title: "Recommender System",
            description: "",
            topics: []
        },
        {
            title: "Question Answering",
            description: "",
            topics: []
        },
        {
            title: "Advanced IR Models",
            description: "",
            topics: []
        }
    ],
    "Database Administration": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "Tablespace and Storage management",
            description: "",
            topics: []
        },
        {
            title: "Managing Database Objects",
            description: "",
            topics: []
        },
        {
            title: "Database Backup, Restore, and Recovery",
            description: "",
            topics: []
        },
        {
            title: "Database Security and Auditing",
            description: "",
            topics: []
        },
        {
            title: "Multitenant Database Architecture",
            description: "",
            topics: []
        },
        {
            title: "Database Tuning",
            description: "",
            topics: []
        }
    ],
    "Software Project Management": [
        {
            title: "Introduction to Software Project Management",
            description: "",
            topics: []
        },
        {
            title: "Project Analysis",
            description: "",
            topics: []
        },
        {
            title: "Activity Planning and Scheduling",
            description: "",
            topics: []
        },
        {
            title: "Risk Management",
            description: "",
            topics: []
        },
        {
            title: "Resource allocation",
            description: "",
            topics: []
        },
        {
            title: "Monitoring and control",
            description: "",
            topics: []
        },
        {
            title: "Managing Contracts and people",
            description: "",
            topics: []
        },
        {
            title: "Software quality assurance and testing",
            description: "",
            topics: []
        },
        {
            title: "Software Configuration Management",
            description: "",
            topics: []
        }
    ],
    "Network Security": [
        {
            title: "Computer Network Security Fundamentals",
            description: "",
            topics: []
        },
        {
            title: "User Authentication",
            description: "",
            topics: []
        },
        {
            title: "Transport Level Security",
            description: "",
            topics: []
        },
        {
            title: "Wireless Network Security",
            description: "",
            topics: []
        },
        {
            title: "Electronic Mail Security",
            description: "",
            topics: []
        },
        {
            title: "IP Security",
            description: "",
            topics: []
        },
        {
            title: "Network Endpoint Security",
            description: "",
            topics: []
        },
        {
            title: "Cloud and Internet of Things (IOT) Security",
            description: "",
            topics: []
        }
    ],
    "Digital System Design": [
        {
            title: "Unit 1",
            description: "",
            topics: []
        },
        {
            title: "Unit 2",
            description: "",
            topics: []
        },
        {
            title: "Unit 3",
            description: "",
            topics: []
        },
        {
            title: "Unit 4",
            description: "",
            topics: []
        },
        {
            title: "Unit 5",
            description: "",
            topics: []
        },
        {
            title: "Unit 6",
            description: "",
            topics: []
        },
        {
            title: "Unit 7",
            description: "",
            topics: []
        },
        {
            title: "Unit 8",
            description: "",
            topics: []
        }
    ],
    "Network and System Administration": [
        {
            title: "Networking Overview",
            description: "",
            topics: []
        },
        {
            title: "Server Administration Basics",
            description: "",
            topics: []
        },
        {
            title: "Network Configuration Basics",
            description: "",
            topics: []
        },
        {
            title: "Dynamic Host Configuration Protocol (DHCP)",
            description: "",
            topics: []
        },
        {
            title: "Name Server and Configuration",
            description: "",
            topics: []
        },
        {
            title: "Web and Proxy Server Configuration",
            description: "",
            topics: []
        },
        {
            title: "FTP, File and Print Server",
            description: "",
            topics: []
        },
        {
            title: "Mail Server basics",
            description: "",
            topics: []
        },
        {
            title: "Remote Administration and Management",
            description: "",
            topics: []
        }
    ],
    "International Marketing": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "International Marketing Environment",
            description: "",
            topics: []
        },
        {
            title: "International Marketing Research Global Marketing Information System",
            description: "",
            topics: []
        },
        {
            title: "International Marketing Management",
            description: "",
            topics: []
        },
        {
            title: "Nepal’s International Trade",
            description: "",
            topics: []
        }
    ],
    "Advanced Database": [
        {
            title: "Enhanced Entity Relationship Model and Relational Model",
            description: "",
            topics: []
        },
        {
            title: "Object and Object Relational Databases",
            description: "",
            topics: []
        },
        {
            title: "Query Processing and Optimization",
            description: "",
            topics: []
        },
        {
            title: "Distributed Databases, NOSQL Systems, and BigData",
            description: "",
            topics: []
        },
        {
            title: "Advanced Database Models, Systems, and Applications",
            description: "",
            topics: []
        }
    ],
    "Internship": [
        {
            title: "Nature of Internship",
            description: "",
            topics: []
        },
        {
            title: "Phases of Internship",
            description: "",
            topics: []
        },
        {
            title: "Provision of Supervision",
            description: "",
            topics: []
        },
        {
            title: "Provision of Mentorship",
            description: "",
            topics: []
        },
        {
            title: "Evaluation Scheme",
            description: "",
            topics: []
        },
        {
            title: "Report Contents",
            description: "",
            topics: []
        },
        {
            title: "Citation and Referencing",
            description: "",
            topics: []
        },
        {
            title: "Report Format Standards",
            description: "",
            topics: []
        },
        {
            title: "Final Report Binding and Submission",
            description: "",
            topics: []
        }
    ],
    "Advanced Networking with IPv6": [
        {
            title: "Networking Protocols",
            description: "",
            topics: []
        },
        {
            title: "Introduction to Networking",
            description: "",
            topics: []
        },
        {
            title: "Next Generation Internet",
            description: "",
            topics: []
        },
        {
            title: "ICMPv6 and Neighbor Discovery",
            description: "",
            topics: []
        },
        {
            title: "Security and Quality of Service in IPv6",
            description: "",
            topics: []
        },
        {
            title: "IPv6 Routing",
            description: "",
            topics: []
        },
        {
            title: "IPv4/IPv6 Transition Mechanisms",
            description: "",
            topics: []
        },
        {
            title: "IPv6 Network and Server Deployment",
            description: "",
            topics: []
        }
    ],
    "Distributed Networking": [
        {
            title: "Protocols-functions",
            description: "",
            topics: []
        },
        {
            title: "Network Design",
            description: "",
            topics: []
        },
        {
            title: "Inter-process Communication",
            description: "",
            topics: []
        },
        {
            title: "Distributed Objects and Remote Invocation",
            description: "",
            topics: []
        },
        {
            title: "Distributed OS",
            description: "",
            topics: []
        },
        {
            title: "Advance Application",
            description: "",
            topics: []
        }
    ],
    "Game Technology": [],
    "Distributed and Object Oriented Database": [
        {
            title: "Introduction to Distributed Database,Distributed Database Architectures,Distributed Database Design",
            description: "",
            topics: []
        },
        {
            title: "Distributed Query Processing,Distributed Transaction Management, Distributed Concurrency Control,Reliability of Distributed DBMS and Recovery",
            description: "",
            topics: []
        },
        {
            title: "Object Oriented Database Concept, OODBMS Architecture Approach,The Object Oriented DBMS Architecture",
            description: "",
            topics: []
        }
    ],
    "Introduction to Cloud Computing": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "Cloud Service Models",
            description: "",
            topics: []
        },
        {
            title: "Building Cloud Networks",
            description: "",
            topics: []
        },
        {
            title: "Security in Cloud Computing",
            description: "",
            topics: []
        }
    ],
    "Geographical Information System": [
        {
            title: "Introduction",
            description: "",
            topics: []
        },
        {
            title: "Digital mapping concept",
            description: "",
            topics: []
        },
        {
            title: "spatial data modeling and database design",
            description: "",
            topics: []
        },
        {
            title: "capturing the real world",
            description: "",
            topics: []
        },
        {
            title: "spatial analysis and visualization",
            description: "",
            topics: []
        },
        {
            title: "introduction to spatial data infrastructure",
            description: "",
            topics: []
        },
        {
            title: "Open GIS",
            description: "",
            topics: []
        }
    ],
    "Decision Support System and Expert System": [
        {
            title: "Decision Making and Computerized Support",
            description: "",
            topics: []
        },
        {
            title: "Decision Support Systems",
            description: "",
            topics: []
        },
        {
            title: "Knowledge Management",
            description: "",
            topics: []
        },
        {
            title: "Intelligent Decision Support Systems",
            description: "",
            topics: []
        }
    ],
    "Mobile Application Development": [],
    "Embedded Systems Programming": [],
    "International Business Management": []
};

// ============================================================================



// ==========================footer code starting tag===============================
// / ==========================footer code starting tag===============================

// ==================================footer code ending tag========================================


// ===========================================social media open=============================================

     function openYouTubeApp() {
                        const app = "vnd.youtube://channel/UCl2IeC8anS0ae_nOYYkjSFg";
                        const web = "https://www.youtube.com/channel/UCl2IeC8anS0ae_nOYYkjSFg";
                        openApp(app, web);
                    }

                    function openGitHub() {
                        const app = "github://user?username=yourusername"; // Custom URI not standard
                        const web = "https://github.com/yourusername";
                        openApp(app, web);
                    }

                    function openTwitter() {
                        const app = "twitter://user?screen_name=yourusername";
                        const web = "https://twitter.com/yourusername";
                        openApp(app, web);
                    }

                    function openLinkedIn() {
                        const app = "linkedin://in/yourusername";
                        const web = "https://www.linkedin.com/in/yourusername";
                        openApp(app, web);
                    }

                    function openDiscord() {
                        const app = "discord://discordapp.com/users/yourid"; // Not supported by all browsers
                        const web = "https://discord.gg/yourserver";
                        openApp(app, web);
                    }

                    function openApp(appLink, webLink) {
                        window.location.href = appLink;
                        setTimeout(function () {
                            window.location.href = webLink;
                        }, 500); // Fallback to web link after 500ms
                    }


// ===========================================social media open=============================================


// Footer script to set current year and extract title
// This script sets the current year in the footer and extracts the main title from the document title.
// Footer.js
document.addEventListener('DOMContentLoaded', function () {
    // Set current year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Get <title> text
    const titleText = document.title;

    // Example: "BSc CSIT Notes - All Semesters | Pipara Academy"
    // Split to get the part before '|'
    const [beforePipe, afterPipe] = titleText.split('|').map(part => part.trim());

    // From beforePipe, get the part before '-'
    const mainTitle = beforePipe.split('-')[0].trim(); // "BSc CSIT Notes"



    // Set site name in footer
    const siteNameElement = document.getElementById('websiteName');
    if (siteNameElement && afterPipe) {
        siteNameElement.textContent = afterPipe;
    }
});







// ==================================footer code ending tag========================================



// ========================================================================================
// Search functionality for curriculum
// ========================================================================================



// Search functionality for curriculum
// This script provides a search functionality for the curriculum, allowing users to search through subjects and units.
// Curriculum.js
// Curriculum search functionality
 // DOM handling
document.addEventListener('DOMContentLoaded', () => {
    // Overlay functionality
    const searchTrigger = document.getElementById('searchTrigger');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeOverlay = document.getElementById('closeOverlay');
    const searchInput = document.getElementById('biru-nepal-search-input');

    // Open overlay when search area is clicked
    searchTrigger.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        searchInput.focus();
    });

    // Close overlay when X is clicked
    closeOverlay.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
    });

    // Close overlay when pressing Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
        }
    });

    // Close overlay when clicking outside content
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
        }
    });

    // DOM Elements for search functionality
    const searchBox = document.getElementById('biru-nepal-search-box-inner');
    const resultsContainer = document.getElementById('biru-nepal-results-grid');
    const resultCount = document.getElementById('biru-nepal-result-count');
    const searchTime = document.getElementById('biru-nepal-search-time');
    const filterButtons = document.querySelectorAll('.biru-nepal-filter-btn');
    const resultsTitle = document.getElementById('biru-nepal-results-title');

    let currentFilter = "all";

    // Search input event handler
    searchInput.addEventListener('input', function() {
        const query = this.value;
        const { results, searchTime: time } = searchCurriculum(query, currentFilter);

        // Update stats
        resultCount.textContent = results.length;
        searchTime.textContent = time;

        // Show/hide results title
        if (query.trim() && results.length > 0) {
            resultsTitle.style.display = "block";
        } else {
            resultsTitle.style.display = "none";
        }

        // Render results
        renderSearchResults(results, query);
    });

    // Search box focus effect
    searchInput.addEventListener('focus', () => {
        searchBox.classList.add('focused');
    });

    searchInput.addEventListener('blur', () => {
        searchBox.classList.remove('focused');
    });

    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Update current filter
            currentFilter = this.dataset.filter;

            // Perform new search with current query
            const query = searchInput.value;
            const { results, searchTime: time } = searchCurriculum(query, currentFilter);

            // Update stats
            resultCount.textContent = results.length;
            searchTime.textContent = time;

            // Show/hide results title
            if (query.trim() && results.length > 0) {
                resultsTitle.style.display = "block";
            } else {
                resultsTitle.style.display = "none";
            }

            // Render results
            renderSearchResults(results, query);
        });
    });

    // Quick search links
    document.querySelectorAll('.biru-nepal-quick-link').forEach(link => {
        link.addEventListener('click', function() {
            searchInput.value = this.textContent;
            const event = new Event('input', { bubbles: true });
            searchInput.dispatchEvent(event);
        });
    });

    // URL formatting helper function
    function toHyphenatedURL(str) {
        return str.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')  // Remove special characters
            .replace(/\s+/g, '-')           // Replace spaces with hyphens
            .replace(/-+/g, '-');            // Remove consecutive hyphens
    }

    // Helper function to get semester slug from title
    function getSemesterSlug(title) {
        const semesterMap = {
            "BSc.CSIT : First Semester": "first-semester",
            "BSc.CSIT : Second Semester": "second-semester",
            "BSc.CSIT : Third Semester": "third-semester",
            "BSc.CSIT : Fourth Semester": "fourth-semester",
            "BSc.CSIT : Fifth Semester": "fifth-semester",
            "BSc.CSIT : Sixth Semester": "sixth-semester",
            "BSc.CSIT : Seventh Semester": "seventh-semester",
            "BSc.CSIT : Eighth Semester": "eighth-semester"
        };
        return semesterMap[title] || toHyphenatedURL(title);
    }

    // Highlight matching text
    function highlightText(text, query) {
        if (!query || !text) return text;
        const regex = new RegExp(`(${query})`, "gi");
        return text.replace(regex, '<span class="biru-nepal-highlight">$1</span>');
    }

    // Main search function
    function searchCurriculum(query, filter = "all") {
        const startTime = performance.now();
        if (!query.trim()) return { results: [], searchTime: 0 };

        const normalizedQuery = query.toLowerCase().trim();
        const results = [];

        // Helper function to check matches
        const matches = (text) => text && text.toLowerCase().includes(normalizedQuery);

        // Search through semesters
        semesterData.forEach(semester => {
            const semesterSlug = getSemesterSlug(semester.title);

            if ((filter === "all" || filter === "semester") &&
                (matches(semester.title) || matches(semester.description))) {
                // Calculate core and elective counts
                const coreCount = semester.subjects.filter(s => !s.elective).length;
                const electiveCount = semester.subjects.filter(s => s.elective).length;

                results.push({
                    type: 'semester',
                    title: semester.title,
                    description: semester.description,
                    subjects: semester.subjects.length,
                    core: coreCount,
                    electives: electiveCount,
                    link: `csit/${semesterSlug}/`,
                    semesterIndex: semesterData.indexOf(semester)
                });
            }

            // Search through subjects in semester
            semester.subjects.forEach(subject => {
                const subjectSlug = toHyphenatedURL(subject.name);

                if ((filter === "all" || filter === "subject") &&
                    (matches(subject.name) || matches(subject.description))) {
                    results.push({
                        type: 'subject',
                        title: subject.name,
                        description: subject.description,
                        semester: semester.title,
                        link: `csit/${semesterSlug}/${subjectSlug}/`
                    });
                }

                // Search through units in subject
                const units = subjectUnits[subject.name] || [];
                if (filter === "all" || filter === "unit") {
                    units.forEach(unit => {
                        // Check for matches in title, description, or topics
                        const topicMatch = unit.topics
                            ? unit.topics.find(topic => matches(topic))
                            : null;

                        if (matches(unit.title) ||
                            (unit.description && matches(unit.description)) ||
                            topicMatch) {

                            const unitSlug = toHyphenatedURL(unit.title);
                            results.push({
                                type: 'unit',
                                title: unit.title,
                                description: unit.description,
                                matchingTopic: topicMatch,
                                topics: unit.topics,
                                subject: subject.name,
                                semester: semester.title,
                                link: `csit/${semesterSlug}/${subjectSlug}/${unitSlug}`
                            });
                        }
                    });
                }
            });
        });

        const endTime = performance.now();
        return {
            results: results.slice(0, 8), // Limit to 8 results
            searchTime: (endTime - startTime).toFixed(2)
        };
    }

    // Render search results function
    function renderSearchResults(results, query) {
        resultsContainer.innerHTML = '';

        if (results.length === 0 && query.length > 0) {
            resultsContainer.innerHTML =
                `<div class="biru-nepal-no-results">
                    <i class="fas fa-frown"></i>
                    <h3>No results found</h3>
                    <p>We couldn't find any matches for "${query}". Try different keywords or check your spelling.</p>
                    
                    <div class="biru-nepal-quick-links">
                        <div class="biru-nepal-quick-link">Computer Networks</div>
                        <div class="biru-nepal-quick-link">Algorithms</div>
                        <div class="biru-nepal-quick-link">Database</div>
                        <div class="biru-nepal-quick-link">Fourth Semester</div>
                    </div>
                </div>`;

            // Re-attach quick link listeners
            document.querySelectorAll('.biru-nepal-quick-link').forEach(link => {
                link.addEventListener('click', function() {
                    searchInput.value = this.textContent;
                    const event = new Event('input', { bubbles: true });
                    searchInput.dispatchEvent(event);
                });
            });

            return;
        }

        if (results.length === 0) {
            resultsContainer.innerHTML =
                `<div class="biru-nepal-no-results">
                    <i class="fas fa-search"></i>
                    <h3>Search the Curriculum</h3>
                    <p>Enter keywords related to semesters, subjects, units, or topics in the search box above to get started.</p>
                    
                    <div class="biru-nepal-quick-links">
                        <div class="biru-nepal-quick-link">Computer Networks</div>
                        <div class="biru-nepal-quick-link">Algorithms</div>
                        <div class="biru-nepal-quick-link">Database</div>
                        <div class="biru-nepal-quick-link">Fourth Semester</div>
                    </div>
                </div>`;

            // Re-attach quick link listeners
            document.querySelectorAll('.biru-nepal-quick-link').forEach(link => {
                link.addEventListener('click', function() {
                    searchInput.value = this.textContent;
                    const event = new Event('input', { bubbles: true });
                    searchInput.dispatchEvent(event);
                });
            });

            return;
        }

        results.forEach((result, index) => {
            // Add result number to all cards
            const resultNumber = document.createElement('div');
            resultNumber.className = 'biru-result-number';
            resultNumber.textContent = index + 1;

            // Use semester card design for semester results
            if (result.type === 'semester') {
                const card = document.createElement('div');
                card.className = 'biru-course-card';
                if (result.electives > 0) {
                    card.classList.add('elective');
                }
                card.style.setProperty('--delay', result.semesterIndex);

                // Add result number to card
                card.appendChild(resultNumber);

                card.innerHTML += `
                    <div class="biru-course-semester-number">${result.semesterIndex + 1}</div>
                    <h2>${highlightText(result.title, query)}</h2>
                    <p>${highlightText(result.description, query)}</p>
                    <span class="biru-course-subjects-count">${result.subjects} Subjects</span>
                    <div class="biru-course-subject-breakdown">
                        <span class="biru-course-core-count">${result.core} Core</span>
                        <span class="biru-course-elective-count">${result.electives} Electives</span>
                    </div>
                `;

                // Find the actual semester data
                const semester = semesterData.find(s => s.title === result.title);
                if (semester) {
                    card.addEventListener('click', () => {
                        window.location.href = result.link;
                    });
                }

                resultsContainer.appendChild(card);
            }
            // Subject result card
            else if (result.type === 'subject') {
                const card = document.createElement('div');
                card.className = 'biru-nepal-result-card';
                card.style.position = 'relative';

                // Add result number to card
                card.appendChild(resultNumber);

                card.innerHTML +=
                    `<div style="display: flex; align-items: center; margin-bottom: 20px;">
                        <div style="background: rgba(74, 105, 189, 0.2); width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px;">
                            <i class="fas fa-book" style="color: #4a69bd; font-size: 1.8rem;"></i>
                        </div>
                        <div>
                            <div style="font-size: 1.1rem; font-weight: 600; color: #4a69bd; margin-bottom: 5px;">Subject</div>
                            <h3 style="margin: 0;">${highlightText(result.title, query)}</h3>
                        </div>
                    </div>
                    <p>${result.description ? highlightText(result.description, query) : 'Detailed content and resources for this subject'}</p>
                    <div class="meta" style="margin-top: 15px; display: flex; gap: 15px; color: #a0a0d0; font-size: 0.95rem;">
                        ${result.semester ? `<span><i class="fas fa-calendar-alt"></i> ${highlightText(result.semester, query)}</span>` : ''}
                    </div>
                    <a href="${result.link}" class="biru-nepal-view-link">View Subject Details</a>`;

                card.addEventListener('click', (e) => {
                    if (e.target.tagName !== 'A') {
                        window.location.href = result.link;
                    }
                });

                resultsContainer.appendChild(card);
            }
            // Unit result card
            else if (result.type === 'unit') {
                const card = document.createElement('div');
                card.className = 'biru-nepal-result-card';
                card.style.position = 'relative';

                // Add result number to card
                card.appendChild(resultNumber);

                // Prepare topics HTML if available
                let topicsHTML = '';
                if (result.topics && result.topics.length > 0) {
                    topicsHTML = `<div class="biru-nepal-topics-container">
                        <strong>Topics:</strong>
                        <div class="biru-nepal-topics-list">
                            ${result.topics.map(topic => {
                                const highlighted = highlightText(topic, query);
                                return `<span class="biru-nepal-topic">${highlighted}</span>`;
                            }).join('')}
                        </div>
                    </div>`;
                }

                // Show matching topic in description if found
                let descriptionContent = result.description || 'Detailed content and resources for this topic';
                if (result.matchingTopic) {
                    descriptionContent = `Topic found: <strong>"${highlightText(result.matchingTopic, query)}"</strong>`;
                } else {
                    descriptionContent = highlightText(descriptionContent, query);
                }

                card.innerHTML +=
                    `<div style="display: flex; align-items: center; margin-bottom: 20px;">
                        <div style="background: rgba(178, 31, 31, 0.2); width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px;">
                            <i class="fas fa-file-alt" style="color: #b21f1f; font-size: 1.8rem;"></i>
                        </div>
                        <div>
                            <div style="font-size: 1.1rem; font-weight: 600; color: #b21f1f; margin-bottom: 5px;">Unit</div>
                            <h3 style="margin: 0;">${highlightText(result.title, query)}</h3>
                        </div>
                    </div>
                    <p>${descriptionContent}</p>
                    ${topicsHTML}
                    <div class="meta" style="margin-top: 15px; display: flex; gap: 15px; color: #a0a0d0; font-size: 0.95rem;">
                        ${result.semester ? `<span><i class="fas fa-calendar-alt"></i> ${highlightText(result.semester, query)}</span>` : ''}
                        ${result.subject ? `<span><i class="fas fa-book"></i> ${highlightText(result.subject, query)}</span>` : ''}
                    </div>
                    <a href="${result.link}" class="biru-nepal-view-link">View Unit Details</a>`;

                card.addEventListener('click', (e) => {
                    if (e.target.tagName !== 'A') {
                        window.location.href = result.link;
                    }
                });

                resultsContainer.appendChild(card);
            }
        });
    }
});

// ======================================================================================



 


// Sample Semester Data
const semesterData = [
    {
        title: "BSc.CSIT : First Semester",
        description: "Build a strong foundation in programming and computer science principles.",
        subjects: [
            {
                name: "Introduction to Information Technology",
                description: "Fundamentals of computer systems, IT components, and applications.",
                elective: false
            },
            {
                name: "C Programming",
                description: "Programming basics using C, including data types, control structures, and functions.",
                elective: false
            },
            {
                name: "Digital Logic",
                description: "Study of logic gates, Boolean algebra, and digital circuit design.",
                elective: false
            },
            {
                name: "Mathematics I (Calculus)",
                description: "Differential and integral calculus relevant to computer science.",
                elective: false
            },
            {
                name: "Physics",
                description: "Mechanics, electricity, and magnetism in the context of computing.",
                elective: false
            }
        ]
    },
    {
        title: "BSc.CSIT : Second Semester",
        description: "Advance programming and understanding of discrete systems and microprocessors.",
        subjects: [
            {
                name: "Discrete Structures",
                description: "Sets, relations, functions, graphs, and combinatorics in computing.",
                elective: false
            },
            {
                name: "Object Oriented Programming",
                description: "Concepts like classes, inheritance, and polymorphism using Java/C++.",
                elective: false
            },
            {
                name: "Microprocessor",
                description: "Architecture and assembly-level programming of Intel 8085/8086.",
                elective: false
            },
            {
                name: "Mathematics II",
                description: "Linear algebra, matrices, and numerical solutions for equations.",
                elective: false
            },
            {
                name: "Statistics I",
                description: "Probability theory, data analysis, and statistical distributions.",
                elective: false
            }
        ]
    },
    {
        title: "BSc.CSIT : Third Semester",
        description: "Core CS topics including algorithms, graphics, and architecture.",
        subjects: [
            {
                name: "Data Structures and Algorithms",
                description: "Linear/nonlinear data structures, searching, sorting, and recursion.",
                elective: false
            },
            {
                name: "Numerical Method",
                description: "Solutions for nonlinear equations, interpolation, and numerical integration.",
                elective: false
            },
            {
                name: "Computer Architecture",
                description: "Internal organization of computer systems and instruction cycles.",
                elective: false
            },
            {
                name: "Computer Graphics",
                description: "2D/3D transformations, viewing, and graphics programming using OpenGL.",
                elective: false
            },
            {
                name: "Statistics II",
                description: "Statistical inference, hypothesis testing, regression, and correlation.",
                elective: false
            }
        ]
    },
    {
        title: "BSc.CSIT : Fourth Semester",
        description: "System-level computing, network fundamentals, and theory of computation.",
        subjects: [
            {
                name: "Theory of Computation",
                description: "Automata theory, grammars, and Turing machines.",
                elective: false
            },
            {
                name: "Computer Networks",
                description: "OSI model, IP addressing, switching, and routing basics.",
                elective: false
            },
            {
                name: "Operating Systems",
                description: "Processes, memory management, file systems, and concurrency.",
                elective: false
            },
            {
                name: "Database Management System",
                description: "SQL, ER modeling, relational algebra, normalization.",
                elective: false
            },
            {
                name: "Artificial Intelligence",
                description: "Search algorithms, expert systems, and machine learning basics.",
                elective: false
            }
        ]
    },
    {
        title: "BSc.CSIT : Fifth Semester",
        description: "Web technology, project design, ethics, and technical elective options.",
        subjects: [
            {
                name: "Microprocessor Based Design",
                description: "Design of digital systems using microprocessors/microcontrollers.",
                elective: false
            },
            {
                name: "Web Technology",
                description: "HTML, CSS, JavaScript, server-side scripting, and web frameworks.",
                elective: false
            },
            {
                name: "System Analysis and Design",
                description: "Requirement analysis, system modeling, and software specification.",
                elective: false
            },
            {
                name: "Society and Ethics in Information Technology",
                description: "IT laws, digital ethics, and social implications of technology.",
                elective: false
            },
            {
                name: "Design and Analysis of Algorithms",
                description: "Divide-and-conquer, greedy algorithms, dynamic programming.",
                elective: true
            },
            {
                name: "Cryptography",
                description: "Symmetric/asymmetric encryption, hashing, digital signatures.",
                elective: true
            },
            {
                name: "Image Processing",
                description: "Image enhancement, filtering, compression, and segmentation.",
                elective: true
            },
            {
                name: "Knowledge Management",
                description: "Processes and systems to manage organizational knowledge.",
                elective: true
            },
            {
                name: "Simulation and Modeling",
                description: "Modeling of systems using discrete-event simulation techniques.",
                elective: true
            }
        ]
    },
    {
        title: "BSc.CSIT : Sixth Semester",
        description: "Advanced software development and NET-centric computing.",
        subjects: [
            {
                name: "Software Engineering",
                description: "Agile models, design patterns, testing, and project lifecycle.",
                elective: false
            },
            {
                name: "Compiler Design and Construction",
                description: "Lexical, syntax, and semantic analysis; code generation.",
                elective: false
            },
            {
                name: "E-Governance",
                description: "Use of ICT in public service delivery and governance.",
                elective: false
            },
            {
                name: "NET Centric Computing",
                description: "Distributed apps, web services, and .NET framework.",
                elective: false
            },
            {
                name: "Technical Writing",
                description: "Writing reports, documentation, and academic content.",
                elective: false
            },
            {
                name: "E-commerce",
                description: "Online business models, security, payment systems.",
                elective: true
            },
            {
                name: "Neural Networks",
                description: "ANN architectures, backpropagation, and training algorithms.",
                elective: true
            },
            {
                name: "Computer Hardware Design",
                description: "Designing computer components using VHDL or Verilog.",
                elective: true
            },
            {
                name: "Automation and Robotics",
                description: "Sensors, actuators, control systems in robotics.",
                elective: true
            },
            {
                name: "Cognitive Science",
                description: "Study of mind, perception, and decision-making models.",
                elective: true
            }
        ]
    },
    {
        title: "BSc.CSIT : Seventh Semester",
        description: "Specialization electives and real-world project implementation.",
        subjects: [
            {
                name: "Advanced Java Programming",
                description: "Swing, JDBC, multi-threading, and networking in Java.",
                elective: false
            },
            {
                name: "Data Warehousing and Data Mining",
                description: "Data cubes, OLAP, clustering, classification algorithms.",
                elective: false
            },
            {
                name: "Principles of Management",
                description: "Basics of organizational structure, leadership, and HRM.",
                elective: false
            },
            {
                name: "Project Work",
                description: "Capstone project solving real-world computing problems.",
                elective: false
            },
            {
                name: "Information Retrieval",
                description: "Search engines, indexing, relevance ranking.",
                elective: false
            },
            {
                name: "Software Project Management",
                description: "Planning, risk analysis, cost estimation, and tracking.",
                elective: true
            },
            {
                name: "Network Security",
                description: "Firewalls, IDS, VPNs, and security protocols.",
                elective: true
            },
            {
                name: "Network and System Administration",
                description: "Linux/Windows system setup, backup, configuration.",
                elective: true
            },
            {
                name: "Digital System Design",
                description: "Designing digital circuits and systems using HDL.",
                elective: true
            },
            {
                name: "Database Administration",
                description: "Backup, recovery, tuning, and security in DBMS.",
                elective: true
            },
            {
                name: "International Marketing",
                description: "Global market analysis and international trade strategies.",
                elective: true
            }
        ]
    },
    {
        title: "BSc.CSIT : Eighth Semester",
        description: "Emerging computing fields, advanced networks, and internship.",
        subjects: [
            {
                name: "Advanced Database",
                description: "Object-relational databases, indexing, and query optimization.",
                elective: false
            },
            {
                name: "Advanced Networking with IPv6",
                description: "IPv6 architecture, transition techniques, and routing protocols.",
                elective: false
            },
            {
                name: "Internship",
                description: "Industrial experience in real IT environment.",
                elective: false
            },
            {
                name: "Distributed Networking",
                description: "Peer-to-peer, client-server, and cloud-based networks.",
                elective: true
            },
            {
                name: "Game Technology",
                description: "Game design, development platforms, and game physics.",
                elective: true
            },
            {
                name: "Distributed and Object Oriented Database",
                description: "Advanced database structures and distributed queries.",
                elective: true
            },
            {
                name: "Introduction to Cloud Computing",
                description: "Cloud services, virtualization, SaaS/PaaS/IaaS.",
                elective: true
            },
            {
                name: "Geographical Information System",
                description: "Mapping, GPS, and spatial data visualization.",
                elective: true
            },
            {
                name: "Decision Support System and Expert System",
                description: "AI systems aiding decision-making in enterprises.",
                elective: true
            },
            {
                name: "Mobile Application Development",
                description: "Developing Android/iOS applications using Flutter/React Native.",
                elective: true
            },
            {
                name: "Embedded Systems Programming",
                description: "Programming microcontrollers for hardware-level tasks.",
                elective: true
            },
            {
                name: "International Business Management",
                description: "Global business strategies and foreign trade management.",
                elective: true
            }
        ]
    }
];
// Export the semester data for use in other modules
// export default semesterData;
//             {
//                 title: "Discrete Structures",
//                 description: "Sets, relations, functions, graphs, and combinatorics in computing.",
//                 subjects: [
//                     {
//                         name: "Discrete Structures",
//                         description: "Sets, relations, functions, graphs, and combinatorics in computing.",
//                         elective: false
//                     },
//                     {
//                         name: "Object Oriented Programming",
//                         description: "Concepts like classes, inheritance, and polymorphism using Java/C++",
//                         elective: false
//                     },
//                     {
//                         name: "Microprocessor",
//                         description: "Architecture and assembly-level programming of Intel 8085/8086",
//                         elective: false
//                     },
//                     {
//                         name: "Mathematics II",
//                         description: "Linear algebra, matrices, and numerical solutions for equations",
//                         elective: false
//                     },
//                     {
//                         name: "Statistics I",
//                         description: "Probability theory, data analysis, and statistical distributions",
//                         elective: false


// ===================================================================================================

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const contentDisplay = document.getElementById('contentDisplay');
    const menuToggle = document.getElementById('menuToggle');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const leftSidebar = document.getElementById('leftSidebar');
    const rightSidebar = document.getElementById('rightSidebar');

    // 1. Populate Mobile Sidebar (if elements exist)
    if (leftSidebar && rightSidebar && mobileSidebar) {
        mobileSidebar.innerHTML = leftSidebar.innerHTML + rightSidebar.innerHTML;
    }

    // 2. Combine Content Data from All Lessons using object spread
    const allContentData = {
        ...(typeof lesson1Data !== 'undefined' ? lesson1Data : {}),
        ...(typeof lesson2Data !== 'undefined' ? lesson2Data : {}),
        ...(typeof lesson3Data !== 'undefined' ? lesson3Data : {}),
        ...(typeof lesson4Data !== 'undefined' ? lesson4Data : {}),
        ...(typeof lesson5Data !== 'undefined' ? lesson5Data : {}),
        ...(typeof lesson6Data !== 'undefined' ? lesson6Data : {}),
        ...(typeof lesson7Data !== 'undefined' ? lesson7Data : {}),
        ...(typeof lesson8Data !== 'undefined' ? lesson8Data : {}),
        ...(typeof lesson9Data !== 'undefined' ? lesson9Data : {}),
        ...(typeof lesson10Data !== 'undefined' ? lesson10Data : {}),
        ...(typeof lesson11Data !== 'undefined' ? lesson11Data : {}),
        ...(typeof lesson12Data !== 'undefined' ? lesson12Data : {}),
    };

    // 3. Content Loading Function
    function loadContent(contentId) {
        // Show loading state
        contentDisplay.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Loading content...</p>
            </div>
        `;

        setTimeout(() => {
            const content = allContentData[contentId];
            
            if (content) {
                contentDisplay.innerHTML = `
                    <div class="content-card">
                        ${content.content}
                    </div>
                `;
                document.title = `${content.title} | Pipara Academy`;
            } else {
                contentDisplay.innerHTML = `
                    <div class="content-card">
                        <h1>Content Not Found</h1>
                        <p>The requested content could not be loaded.</p>
                        <p>Please select another topic from the menu.</p>
                    </div>
                `;
            }

            // Update active state for all menu links
            document.querySelectorAll('.menu-link').forEach(link => {
                link.classList.toggle('active-link', link.dataset.content === contentId);
            });
        }, 600);
    }

    // 4. Menu Click Handler
    function handleMenuClick(e) {
        e.preventDefault();
        const contentId = this.dataset.content;
        
        // Update URL and load content
        window.location.hash = contentId;
        loadContent(contentId);
        
        // Close mobile menu if open
        if (mobileSidebar && mobileSidebar.classList.contains('active')) {
            mobileSidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // 5. Event Listeners
    // Menu links
    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', handleMenuClick);
    });

    // Mobile menu toggle
    if (menuToggle && mobileSidebar && sidebarOverlay) {
        menuToggle.addEventListener('click', () => {
            mobileSidebar.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
            document.body.style.overflow = mobileSidebar.classList.contains('active') 
                ? 'hidden' : '';
        });

        sidebarOverlay.addEventListener('click', () => {
            mobileSidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // 6. Initial Content Load
    // const initialContentId = window.location.hash.substring(1) || 'intro-overview';
    // if (allContentData[initialContentId]) {
    //     loadContent(initialContentId);
    // } else {
    //     // Load default content if hash is invalid
    //     loadContent('intro-overview');
    //     window.location.hash = 'intro-overview';
    // }
});

// ======================================================================================
