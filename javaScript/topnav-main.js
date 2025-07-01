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




  // ---====================================================================================



document.addEventListener('DOMContentLoaded', function() {
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






// Lesson 1: Introduction to Computer
const lesson1Data = {
  // Unit 1: Introduction to Computer (3 Hours)



  
  
  'intro-overview': {
    title: 'Introduction',
    content: `



    
                <h1>Chapter 1: Introduction to Computers</h1>
    
    <h2>Introduction</h2>
    <p>
        The word "computer" originates from the Latin term "computare," meaning 'to calculate.' 
        While basic calculations are a familiar part of daily life, complex mathematical operations 
        can be time-consuming and prone to error. To achieve faster and perfectly accurate calculations, 
        humans developed a machine called the 'computer.'
    </p>
    
    <h2>What is a Computer?</h2>
    <p>
        A computer is an electronic device that operates under the control of instructions (programs) 
        stored in its own memory. It functions by:
    </p>
    <ul>
        <li>Accepting data (<b>input</b>) from users via input devices.</li>
        <li>Processing that data according to predefined rules.</li>
        <li>Producing results (<b>output</b>).</li>
        <li>Storing both data and results for future use.</li>
    </ul>
    
    <p>
        In essence, a computer is a programmable machine capable of:
    </p>
    <ul>
        <li><b>Taking Input:</b> Receiving raw data through input devices (e.g., keyboard, mouse).</li>
        <li><b>Storing Data:</b> Holding input data, programs, and results in memory (e.g., RAM) and on storage media (e.g., hard disk, CD).</li>
        <li><b>Processing Data:</b> Executing instructions and manipulating data via the Central Processing Unit (CPU).</li>
        <li><b>Producing Output:</b> Presenting the processed results via output devices (e.g., screen, printer).</li>
    </ul>
        `
  },
  'intro-digital-analog': {
    title: 'Digital and Analog Computers',
    content: `


    <h1>Digital and Analog Computers</h1>

    <h2>Digital Computer</h2>
    <p>
      A digital computer is one that works with binary digits (0s and 1s). It is based on digital signals, i.e., discrete signals.
    </p>
    <p>
      Digital computers do not measure physical values. They operate on data—including magnitudes, letters, and symbols—expressed in binary form (0 and 1).
    </p>
    <p>
      A digital machine is usually a general-purpose device, dedicated to multiple tasks. These computers are mostly used in the preparation of reports and results.
    </p>
    <p>
      Early digital computers were large machines, consuming large amounts of electric power and hence were expensive. Mechanical computers had an advantage over digital computers at the time.
    </p>
    <p>
      Most computers today are digital computers. Examples include IBM PC, Apple/Macintosh, etc.
    </p>

    <h2>Analog Computer</h2>
    <p>
      An analog computer operates on continuous data, usually of a physical nature such as length, voltage, or current.
    </p>
    <p>
      It is usually a special-purpose computer dedicated to a single task. Analog computers are based on continuous (analog) signals rather than discrete values.
    </p>
    <p>
      These computers do not use exact values but rather approximate values. As a result, their processes cannot be reproduced with exact equivalence like digital (Turing) machines.
    </p>
    <p>
      Analog computers were widely used in scientific and industrial applications when digital computers lacked sufficient performance.
    </p>
    <p>
      They are used in hospitals to measure kidney stone size and in mental health diagnostics (e.g., CT scans). Analog computers are also powerful in solving differential equations.
    </p>
    <p>
      They represent physical quantities in wave or continuous form. Examples include Plesley, slide rule, speedometer, thermometer, barometer, lactometer, seismograph, etc.
    </p>

    <h2>Difference Between Analog and Digital Computers</h2>
    <table border="1" cellpadding="8" cellspacing="0">
      <thead>
        <tr>
          <th>Analog Computer</th>
          <th>Digital Computer</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>These computers work with physical values such as temperature, pressure, etc.</td>
          <td>These computers work with binary digits (0s and 1s).</td>
        </tr>
        <tr>
          <td>These computers are based on continuous data.</td>
          <td>These computers are based on discrete data.</td>
        </tr>
        <tr>
          <td>It has very low accuracy.</td>
          <td>It has high accuracy.</td>
        </tr>
        <tr>
          <td>Based on similarity measurement principle.</td>
          <td>Based on counting principle.</td>
        </tr>
        <tr>
          <td>These are faster than digital computers.</td>
          <td>Slower than analog computers.</td>
        </tr>
        <tr>
          <td>It has no or limited storage capacity.</td>
          <td>It has high storage capacity.</td>
        </tr>
        <tr>
          <td>It does single-purpose jobs.</td>
          <td>It does multi-purpose jobs.</td>
        </tr>
        <tr>
          <td>No possibility of reprogramming.</td>
          <td>It can be reprogrammed.</td>
        </tr>
        <tr>
          <td>The cost is low and it is portable.</td>
          <td>The cost is high and it is not easily portable.</td>
        </tr>
        <tr>
          <td>Analog signal processing can be done in real time and consumes less bandwidth.</td>
          <td>Digital signal processing may not be in real time and consumes more bandwidth for the same information.</td>
        </tr>
      </tbody>
    </table>



    
        `
  },
  'intro-characteristics': {
    title: 'Characteristics of Computer',
    content: `
 <h1>Characteristics of a Computer</h1>
  <p>
    As we know, a computer is a powerful electronic device. It is used to process large amounts of data and information.
    A computer never gets tired and can perform repetitive tasks efficiently.
  </p>
  <h2>
    The main characteristics of a computer are given below:
  </h2>
  <ul>
    <li><strong>Speed:</strong> A computer can perform millions of instructions per second.</li>
    <li><strong>Accuracy:</strong> It performs operations with high precision and minimal errors.</li>
    <li><strong>Diligence:</strong> It does not get tired or bored. It can work continuously without loss of performance.</li>
    <li><strong>Automation:</strong> Once programmed, it can perform tasks automatically without human intervention.</li>
    <li><strong>Storage:</strong> It can store vast amounts of data for future use and quick retrieval.</li>
    <li><strong>Versatility:</strong> It can be used for a wide range of tasks, from calculations to multimedia processing.</li>
    <li><strong>Multitasking:</strong> It can handle multiple tasks simultaneously.</li>
    <li><strong>Communication:</strong> Computers can connect and communicate over networks globally.</li>
  </ul>

   <h3>1. Speed</h3>
  <p>
    The time taken to perform any task by a computer is called its speed. Computers can work very fast, completing in seconds what humans might take hours to do. The speed of a computer is measured in microseconds (10<sup>-6</sup>), nanoseconds (10<sup>-9</sup>), or even picoseconds (10<sup>-12</sup>).
  </p>
  <table border="1" cellpadding="8" cellspacing="0">
    <thead>
      <tr>
        <th>Unit of Time</th>
        <th>Part of a Second</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Milliseconds (ms)</td>
        <td>1/1,000</td>
      </tr>
      <tr>
        <td>Microseconds (µs)</td>
        <td>1/1,000,000</td>
      </tr>
      <tr>
        <td>Nanoseconds (ns)</td>
        <td>1/1,000,000,000</td>
      </tr>
      <tr>
        <td>Picoseconds (ps)</td>
        <td>1/1,000,000,000,000</td>
      </tr>
    </tbody>
  </table>

  <h3>2. Accuracy</h3>
  <p>
    Computers are extremely accurate machines. Every calculation is performed with a high degree of precision. However, if incorrect input is given, the output will also be incorrect — a concept known as GIGO (Garbage In, Garbage Out). Computers can also perform calculations to many decimal places, depending on the requirement.
  </p>

  <h3>3. Diligence</h3>
  <p>
    The capacity of the performing repetitive task free from tiredness, lack of concentration and fatigue
is called diligence capacity of computer. It can work for hours without creating any error. If millions
of calculations are to be performed, a computer will perform every calculation with the same
accuracy. Due to this capability it overpowers human being in routine type of work.
  </p>

  <h3>4. Versatility</h3>
  <p>
    A computer is versatile, meaning it can perform a wide variety of tasks. From mathematical calculations to graphic design, from word processing to playing games, a computer can handle many different jobs depending on the software or program it is running.
  </p>

  <h3>5. Storage</h3>
  <p>
    Computers have mass storage devices to store large volumes of data for future use. This stored data is easily retrievable. Common storage devices include magnetic disks, optical disks, and solid-state drives. Storage capacity is measured in bytes.
  </p>
  <table border="1" cellpadding="8" cellspacing="0">
    <thead>
      <tr>
        <th>Storage Term</th>
        <th>Approximate Number of Bytes</th>
        <th>Exact Number of Bytes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Kilobyte (KB)</td>
        <td>1 thousand</td>
        <td>2<sup>10</sup> or 1,024</td>
      </tr>
      <tr>
        <td>Megabyte (MB)</td>
        <td>1 million</td>
        <td>2<sup>20</sup> or 1,048,576</td>
      </tr>
      <tr>
        <td>Gigabyte (GB)</td>
        <td>1 billion</td>
        <td>2<sup>30</sup> or 1,073,741,824</td>
      </tr>
      <tr>
        <td>Terabyte (TB)</td>
        <td>1 trillion</td>
        <td>2<sup>40</sup> or 1,099,511,627,776</td>
      </tr>
      <tr>
        <td>Petabyte (PB)</td>
        <td>1 quadrillion</td>
        <td>2<sup>50</sup> or 1,125,899,906,842,624</td>
      </tr>
      <tr>
        <td>Exabyte (EB)</td>
        <td>1 quintillion</td>
        <td>2<sup>60</sup> or 1,152,921,504,606,846,976</td>
      </tr>
      <tr>
        <td>Zettabyte (ZB)</td>
        <td>1 sextillion</td>
        <td>2<sup>70</sup> or 1,180,591,620,717,411,303,424</td>
      </tr>
      <tr>
        <td>Yottabyte (YB)</td>
        <td>1 septillion</td>
        <td>2<sup>80</sup> or 1,208,925,819,614,629,174,706,176</td>
      </tr>
    </tbody>
  </table>

  <h3>6. Automatic</h3>
  <p>
    A computer is an automatic machine. Once instructions and data are fed into it, the computer automatically processes the information and delivers the output without further human intervention.
  </p>


            
        `
  },
  'intro-history': {
    title: 'History of Computer',
    content: `


  <h1>History of Computer</h1>
  <p>
    There is a long development history of the computer and computing devices.
    Generally, the history of a computer development can be categorized into the following three different Eras:
  </p>
  <ul>
    <li>Mechanical Calculating Era</li>
    <li>Electromechanical Era</li>
    <li>Electronic Computer Era</li>
  </ul>

  <h2>Mechanical Calculating Era</h2>
  <p>
    The mechanical calculating devices were based on the counting principles.
    They were based on the decimal number system. These devices were constructed
    with the mechanical part for computing that is the counting.
  </p>

  <h3>The Abacus</h3>
  <p>
    The abacus, a simple counting device invented in Babylonia in the fourth century BC,
    is considered by many to be the first computing device. Abacus is made of a wooden frame
    with strings and beads. It is divided into two parts: heaven and earth. Each bead in heaven
    is equivalent to 5 and each bead in earth is equivalent to 1. Calculation is done by sliding
    the beads in both sections.
  </p>
  <p>
    Early merchants used the abacus to keep trading transactions. But as the use of paper and pencil spread,
    particularly in Europe, the abacus lost its importance. It took nearly 12 centuries, however,
    for the next significant advance in computing devices to emerge.
  </p>
  <p><strong>Figure:</strong> Abacus Device</p>

  <h3>Napier's Bones</h3>
  <p>
    Napier's bones was invented by John Napier (1550–1617), a Scottish mathematician and scientist in 1614.
    In this device, the bone rods are vertically arranged in a rectangular shape.
  </p>
  <p>
    The Napier's bones, also called Napier's rods, are numbered rods which can be used to perform multiplication
    of any number by a number 2–9. By placing "bones" corresponding to the multiplier on the left side and the bones
    corresponding to the digits of the multiplicand next to it to the right, the product can be read off simply
    by adding pairs of numbers (with appropriate carries as needed) in the row determined by the multiplier.
  </p>
  <p>
    There are ten bones corresponding to the digits 0–9, and a special eleventh bone that is used to represent the multiplier.
    The multiplier bone is simply a list of the digits 1–9 arranged vertically downward. The remainder of the bones
    each has a digit written in the top square, with the multiplication table for that digit written downward,
    with the digits split by a diagonal line going from the lower left to the upper right.
  </p>
  <p>
    In practice, multiple sets of bones were needed for multiplication of numbers containing repeated digits.
  </p>

    <h3>Pascaline</h3>
  <p>
    In 1642, Blaise Pascal, the 18-year-old son of a French tax collector, invented what he called a
    numerical wheel calculator to help his father with his duties. This brass rectangular box,
    also called a Pascaline, used eight movable dials to add sums up to eight figures long.
  </p>
  <p>
    Pascal's device used a base of ten to accomplish this. For example, as one dial moved ten notches,
    or one complete revolution, it moved the next dial — which represented the ten's column — one place.
    When the ten's dial moved one revolution, the dial representing the hundred's place moved one notch, and so on.
    The drawback to the Pascaline, of course, was its limitation to addition.
  </p>
  <p><strong>Figure:</strong> Pascaline</p>

  <h3>Leibniz Machine</h3>
  <p>
    In 1694, a German mathematician and philosopher, Gottfried Wilhelm von Leibniz, improved the
    Pascaline by creating a machine that could also multiply. Like its predecessor, Leibniz's mechanical
    multiplier worked by a system of gears and dials.
  </p>
  <p>
    Partly by studying Pascal's original notes and drawings, Leibniz was able to refine his machine.
    The centerpiece of the machine was its stepped-drum gear design, which offered an elongated
    version of the simple flat gear.
  </p>
  <p>
    It wasn't until 1820, however, that mechanical calculators began to see widespread use.
  </p>

    <h3>Charles Babbage Machines</h3>
  <p>
    The real beginnings of computers as we know them today, however, lay with an English mathematics professor,
    Charles Babbage. He is known as the <strong>father of the computer</strong>. He invented mainly two devices:
    the <strong>Difference Engine</strong> and the <strong>Analytical Engine</strong>. These devices could perform
    methodical calculations more accurately and quickly.
  </p>

  <h4>Difference Engine</h4>
  <p>
    Babbage first proposed a machine to perform differential equations, called a <strong>Difference Engine</strong>.
    Powered by steam and large as a locomotive, the machine would have a stored program and could perform
    calculations and print the results automatically.
  </p>
  <p><strong>Figure:</strong> Difference Engine</p>

  <h4>Analytical Engine</h4>
  <p>
    In 1833, Charles Babbage, an English mathematician, developed the <strong>Analytical Engine</strong>,
    which was a kind of general-purpose computer designed to solve any arithmetical problems. 
    It was significant in a way because it included concepts that are fundamental to today’s computers,
    such as the use of punched cards, a control unit, memory, and a central processing unit (CPU).
  </p>

  <p>
    The Analytical Engine had most of the elements present in today's digital computer systems, 
    which is why Charles Babbage is called the <strong>"Father of modern computer science."</strong>
    It incorporated the following components for computation (counting, storing):
  </p>
  <ul>
    <li><strong>The Input:</strong> The punch card was used as an input device.</li>
    <li><strong>The Mill:</strong> Equivalent to today's CPU, it was used for processing.</li>
    <li><strong>The Output:</strong> The result was given in punch cards.</li>
    <li><strong>The Storage:</strong> The punch card was also used as storage — an equivalent to memory in today's computers.</li>
  </ul>
  <p><strong>Figure:</strong> Analytical Engine</p>

  <p>
    <strong>Lady Ada Augusta</strong>, a disciple of Charles Babbage, developed several programs for 
    performing mathematical calculations on the Analytical Engine after his demise. She is considered 
    the <strong>first programmer in history</strong> and has to her credit a programming language 
    named after her called <strong>ADA</strong>.
  </p>
  <p><strong>Figure:</strong> Lady Ada Augusta</p>

  <h3>Hollerith Machine</h3>
  <p>
    In 1889, an American inventor, <strong>Herman Hollerith</strong>, applied the Jacquard loom concept 
    to computing. His first task was to find a faster way to compute the U.S. census. The previous census 
    in 1880 had taken nearly seven years to count, and with an expanding population, the bureau feared 
    it would take ten years to count the latest census.
  </p>

    <h2>Summary of the Mechanical Calculating Era</h2>

  <h3>Abacus</h3>
  <p>
    A simple counting device invented in Babylonia in the fourth century BC, 
    is considered by many to be the first computing device.
  </p>

  <h3>Napier's Bone</h3>
  <p>
    Invented by John Napier, a Scottish mathematician and scientist in 1614, 
    the bone rods are vertically arranged in a rectangular shape.
  </p>

  <h3>Slide Rule</h>
  <p>
    A mathematical calculating device used for performing numerical 
    computations such as multiplication, division, powers, and roots.
  </p>

  <h3>Blaise Pascal</h3>
<p>
  Created a machine called the <strong>Pascaline</strong> that could add and subtract numbers. Dials were used to enter the numbers. 
  It also correctly handled carries, such as when the numbers 19 and 13 are added. The machine would produce the correct answer of 32 
  since it correctly carried the 1 from adding 9 and 3.
</p>

<h3>Charles Babbage</h3>
<p>
  Designed a machine called the <strong>Difference Engine</strong> whose goal was to automatically calculate entries in navigation 
  and other tables in order to produce these tables more quickly and with fewer errors. It was never fully completed due to its complexity 
  and Babbage losing interest when he came up with a better idea.
</p>
<p>
  He then designed a machine called the <strong>Analytical Engine</strong>. The design had all the basic components of a modern-day computer. 
  In addition, it was designed to be programmable using punched cards. This way, it could perform many tasks, not just a single task 
  like calculating entries for tables. Though never fully completed, Babbage is still called the <strong>"Father of the Computer"</strong>. 
  He had the right ideas, but the technology of the time was not advanced enough to fully realize them.
</p>

<h3>Ada Lovelace</h3>
<p>
  Charles Babbage's assistant, Ada Lovelace, wrote programs for the Analytical Engine using punched cards. 
  She is considered the <strong>world's first programmer</strong>.
</p>

<h3>Herman Hollerith</h3>
<p>
  Created a <strong>punched card tabulating machine</strong> for use in the <strong>1890 U.S. Census</strong>.
</p>

<h3>The Electro-Mechanical Era</h3>
<p>
  In the Electromechanical Era, computational devices were composed of mechanical and electrical parts and used electricity 
  for operation. These devices were partially programmable. The most notable computer of this era is:
</p>

<h3>Mark I</h3>
<p>
  In 1944, <strong>Howard Aiken</strong> completed the Mark I, also called the <strong>IBM Automatic Sequence Controlled Calculator (ASCC)</strong>. 
  It was an electromechanical computer which was 51 ft long, 8 ft high, and 3 ft wide. It consisted of 18,000 vacuum tubes.
</p>
<p>
  The Mark I was the first programmable digital computer made in the U.S., but it was not purely electronic. 
  Instead, it was constructed out of switches, relays, rotating shafts, and clutches.
</p>
<ul>
  <li>It was the first machine to successfully perform a long series of arithmetic and logical operations automatically.</li>
  <li>It is considered a <strong>First Generation Computer</strong>.</li>
  <li>Built as a partnership between <strong>Harvard University and IBM</strong> in 1944.</li>
  <li>The machine weighed 5 tons, incorporated 500 miles of wire, was 8 feet tall and 51 feet long.</li>
  <li>It had a 50-foot rotating shaft running its length, turned by a 5-horsepower electric motor.</li>
</ul>







        `
  },
  'intro-generations': {
    title: 'Generations of Computer',
    content: `


            <h1>Generation of Computers</h1>
<p>
  The history of computers is often referred to in terms of different generations of computing devices. 
  In computer terminology, a "generation" is described as a stage of technological development or innovation. 
  Each generation of computers is characterized by a major technological advancement that has fundamentally changed 
  the way computers operate—resulting in devices that are smaller, cheaper, faster, more powerful, efficient, and reliable.
</p>
<p>
  Based on the type of processor and other core technologies, the development of computers can be divided into 
  <strong>five distinct generations</strong>. Each generation brought a significant transformation in hardware, software, 
  and computing capabilities.
</p>

<h2>First Generation Computers (1945–1954)</h2>
<p>
  The first generation of computers used <strong>vacuum tubes</strong> or <strong>thermionic valves</strong> for circuitry 
  and magnetic drums for memory. Input was given using punched cards and paper tape, and output was displayed via printouts.
</p>

<h3>Hardware Technology</h3>
<ul>
  <li>Based on vacuum tube technology.</li>
  <li>Thousands of vacuum tubes were used, which generated a lot of heat.</li>
  <li>Required large air-cooling systems due to overheating issues.</li>
  <li>Punched cards used for input; printouts used for output.</li>
  <li>Used acoustic delay lines as main memory and magnetic drums for secondary storage.</li>
</ul>

<h3>Software Technology</h3>
<ul>
  <li>Programming was done in <strong>machine language</strong> (binary: 0s and 1s).</li>
  <li>Programs were difficult to write, debug, and maintain.</li>
  <li>No high-level programming languages or operating systems were available.</li>
  <li>Only one problem could be solved at a time (no multitasking).</li>
</ul>

<h3>Computing Characteristics</h3>
<ul>
  <li>Processing speed was in <strong>kilohertz</strong> (KHz).</li>
  <li>Computation time was in <strong>milliseconds</strong>.</li>
  <li>Extremely large in size and consumed a lot of power.</li>
  <li>Very limited memory and processing capacity.</li>
</ul>

<h3>Examples of First Generation Computers</h3>
<ul>
  <li>ENIAC (Electronic Numerical Integrator and Computer)</li>
  <li>EDVAC (Electronic Discrete Variable Automatic Computer)</li>
  <li>UNIVAC I (Universal Automatic Computer)</li>
  <li>IBM-701</li>
</ul>

<h3>Physical Appearance</h3>
<ul>
  <li>First generation computers were enormous in size and required large rooms for installation.</li>
</ul>

<h3>Application</h3>
<ul>
  <li>Used mainly for scientific applications, as they were the fastest computing devices of their time.</li>
  <li>Lacked versatility and were not available for commercial use.</li>
</ul>

<h3>Examples</h3>
<ul>
  <li>UNIVAC (Universal Automatic Computer)</li>
  <li>ENIAC (Electronic Numerical Integrator and Calculator)</li>
  <li>EDVAC (Electronic Discrete Variable Automatic Computer)</li>
</ul>

<p><strong>Figure:</strong> First Generation Computer</p>
<p><strong>Figure:</strong> Vacuum Tube</p>

<h2>Second Generation Computers (1955–1964)</h2>
<p>
  The second generation of computers used <strong>transistors</strong> instead of vacuum tubes, 
  making them smaller, faster, cheaper, more energy-efficient, and more reliable. Transistors 
  are made from semiconductor materials like germanium and silicon and have three leads. 
  They perform electronic functions such as amplification and switching.
</p>
<p>
  These computers used <strong>magnetic core memory</strong> as primary memory and 
  <strong>magnetic disks</strong> for secondary storage. Although input and output were still 
  handled via punched cards and printouts, this generation marked a shift from machine 
  language to <strong>assembly language</strong>.
</p>

<h3>Hardware Technology</h3>
<ul>
  <li>Based on transistor technology instead of vacuum tubes.</li>
  <li>Smaller, faster, more energy-efficient, and more reliable than first generation computers.</li>
  <li>Used magnetic core memory for primary storage.</li>
  <li>Used magnetic tapes and magnetic disks for secondary storage.</li>
  <li>Input was still via punched cards; output was through printouts.</li>
  <li>Used the concept of stored program—instructions stored in memory.</li>
</ul>

<h3>Software Technology</h3>
<ul>
  <li>Programs were written in <strong>assembly language</strong>.</li>
  <li>Used mnemonics like <code>ADD</code> for addition and <code>SUB</code> for subtraction.</li>
</ul>

<h3>Batch Operating System</h3>
<ul>
  <li>Batch operating system was used in the second generation computers.</li>
</ul>

<h3>Computing Characteristics (Second Generation)</h3>
<ul>
  <li>Computational time improved from milliseconds to microseconds.</li>
</ul>

<h3>Physical Appearance (Second Generation)</h3>
<ul>
  <li>Transistors were much smaller than vacuum tubes, so computers were smaller in size.</li>
  <li>These computers had better portability and generated less heat than first-generation computers but still required air conditioning.</li>
</ul>

<h3>Application (Second Generation)</h3>
<ul>
  <li>Although the cost of commercial production was very high, it was less expensive compared to first generation.</li>
  <li>Examples include PDP-8, IBM 1401, and CDC 1604.</li>
</ul>

<h2>Third Generation Computers (1965–1979)</h2>
<p>In the third generation, integrated circuits (ICs) replaced transistors as the main component. An IC is a tiny silicon wafer containing numerous transistors, registers, capacitors, and other electronic circuits. This replacement made computers smaller, more reliable, and more efficient. Users interacted with these computers using keyboards and monitors instead of punched cards and printouts.</p>

<h3>Main Characteristics of Third Generation Computers</h3>

<h3>Hardware Technology</h3>
<ul>
  <li>Based on integrated circuit (IC) technology with multiple transistors on a single silicon chip.</li>
  <li>Keyboards and monitors were used for input and output instead of punched cards and printouts.</li>
  <li>Semiconductor memory was used for internal storage, and magnetic disks were used for auxiliary storage.</li>
</ul>

<h3>Software Technology</h3>
<ul>
  <li>Operating systems allowed interaction between the keyboard, monitor, and computer.</li>
  <li>Multiprogramming operating systems like UNIX and MULTICS were introduced.</li>
  <li>High-level programming languages were extensively used, replacing machine and assembly languages.</li>
</ul>

<h3>Computing Characteristics</h3>
<ul>
  <li>Computational speed increased significantly, reducing processing time from microseconds to nanoseconds (around 12 MHz).</li>
</ul>

<h3>Physical Appearance</h3>
<ul>
  <li>Much smaller in size compared to second generation computers.</li>
  <li>More portable and reliable.</li>
  <li>Produced much less heat, eliminating the need for dedicated cooling systems.</li>
</ul>

<h3>Application</h3>
<ul>
  <li>Computers became more accessible to the general public.</li>
  <li>They were commercially produced, smaller, and cheaper than earlier generations.</li>
</ul>



        `
  },
  'intro-classification': {
    title: 'Classification of Computer',
    content: `
            <p>Content will be displayed here. in HTML format</p>
        `
  },
  'intro-system': {
    title: 'The Computer System',
    content: `
            <p>Content will be displayed here. in HTML format</p>
        `
  },
  'intro-application': {
    title: 'Application of Computers',
    content: `
            <p>Content will be displayed here. in HTML format</p>
        `
  }
};
