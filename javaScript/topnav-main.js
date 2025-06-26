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








  // ==================================================================================================================================================================================


  const semesterGrid = document.querySelector('.pipara-academy-course-semester-grid');
const filterBtns = document.querySelectorAll('.pipara-academy-course-filter-btn');
const overlay = document.getElementById('pipara-academy-course-overlay');
const unitOverlay = document.getElementById('pipara-academy-course-unit-overlay');
const subjectList = document.getElementById('pipara-academy-course-subject-list');
const unitList = document.getElementById('pipara-academy-course-unit-list');

// Helper function to generate slugs
function generateSlug(text) {
    return encodeURIComponent(text.toLowerCase().replace(/\s+/g, '-'));
}

// Store current state
let currentSubject = "";
let currentSemesterTitle = "";
let currentUnits = [];

// Filter initialization
document.querySelectorAll('.pipara-academy-course-filter-btn').forEach(button => {
    button.addEventListener('click', function () {
        // Remove active class from all buttons
        document.querySelectorAll('.pipara-academy-course-filter-btn').forEach(btn => {
            btn.classList.remove('pipara-academy-course-active');
        });

        // Add active class to clicked button
        this.classList.add('pipara-academy-course-active');

        // Get filter type
        const filterValue = this.dataset.filter;

        // Show/hide courses based on filter
        document.querySelectorAll('.pipara-academy-course-card').forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
            } else {
                // Filter based on subject type
                const semesterIndex = Array.from(semesterGrid.children).indexOf(card);
                const semester = semesterData[semesterIndex];
                const hasElectives = semester.subjects.some(s => s.elective && filterValue === 'elective');
                const hasCore = semester.subjects.some(s => !s.elective && filterValue === 'core');

                if (filterValue === 'elective') {
                    card.style.display = hasElectives ? 'block' : 'none';
                } else if (filterValue === 'core') {
                    card.style.display = hasCore ? 'block' : 'none';
                }
            }
        });
    });
});

// Initialize semester cards
function initSemesterCards() {
    semesterGrid.innerHTML = '';

    semesterData.forEach((semester, index) => {
        // Calculate core and elective counts
        const coreCount = semester.subjects.filter(s => !s.elective).length;
        const electiveCount = semester.subjects.filter(s => s.elective).length;

        const card = document.createElement('div');
        card.className = 'pipara-academy-course-card';
        if (electiveCount > 0) {
            card.classList.add('elective');
        }
        card.style.setProperty('--delay', index);

        card.innerHTML = `
                    <div class="pipara-academy-course-semester-number">${index + 1}</div>
                    <h2>${semester.title}</h2>
                    <p>${semester.description}</p>
                    <span class="pipara-academy-course-subjects-count">${semester.subjects.length} Subjects</span>
                    <div class="pipara-academy-course-subject-breakdown">
                        <span class="pipara-academy-course-core-count">${coreCount} Core</span>
                        <span class="pipara-academy-course-elective-count">${electiveCount} Electives</span>
                    </div>
                `;

        card.addEventListener('click', () => openOverlay(semester.title, semester.subjects));
        semesterGrid.appendChild(card);
    });
}

function openOverlay(title, subjects) {
    currentSemesterData = subjects;
    currentSemesterTitle = title;
    document.getElementById("pipara-academy-course-semester-title").textContent = title;

    renderSubjectCards();

    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function renderSubjectCards() {
    subjectList.innerHTML = "";

    const subjectIcons = [
        "fa-book", "fa-laptop-code", "fa-calculator",
        "fa-network-wired", "fa-microchip", "fa-database",
        "fa-code", "fa-brain", "fa-server", "fa-cloud",
        "fa-shield-alt", "fa-mobile-alt", "fa-globe", "fa-cogs"
    ];

    currentSemesterData.forEach((subject, index) => {
        const unitCount = subjectUnits[subject.name] ? subjectUnits[subject.name].length : 0;
        const iconIndex = index % subjectIcons.length;

        const card = document.createElement("div");
        card.className = "pipara-academy-course-unit-card";
        card.style.animationDelay = `${index * 0.05}s`;
        card.innerHTML = `
                    <div class="pipara-academy-course-unit-header">
                        <div class="pipara-academy-course-unit-icon">
                            <i class="fas ${subjectIcons[iconIndex]}"></i>
                        </div>
                        <div class="pipara-academy-course-unit-title-container">
                            <h4>${subject.name}</h4>
                            ${subject.elective ? '<span class="pipara-academy-course-resource-badge">ELECTIVE</span>' : ''}
                        </div>
                    </div>
                    <p>${subject.description}</p>
                    <div class="pipara-academy-course-units-count">${unitCount} Units</div>
                `;
        card.addEventListener('click', () => openUnitOverlay(subject.name));
        subjectList.appendChild(card);
    });
}

function closeOverlay() {
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
}

function openUnitOverlay(subjectName) {
    currentSubject = subjectName;
    document.getElementById("pipara-academy-course-subject-title").textContent = subjectName;
    document.getElementById("pipara-academy-course-overlay-subtitle").textContent = "Select a unit to view content";

    // Get units for this subject
    currentUnits = subjectUnits[subjectName] || [];

    // Render unit cards
    renderUnitCards();

    unitOverlay.style.display = "flex";
    overlay.style.display = "none";
}

function renderUnitCards() {
    unitList.innerHTML = "";
    const unitIcons = [
        "fa-book-open", "fa-laptop-code", "fa-shapes",
        "fa-calculator", "fa-network-wired", "fa-chart-line",
        "fa-database", "fa-microchip", "fa-code", "fa-brain",
        "fa-cogs", "fa-server", "fa-cloud", "fa-shield-alt",
        "fa-lock", "fa-mobile-alt", "fa-globe", "fa-sitemap"
    ];

    if (currentUnits.length > 0) {
        currentUnits.forEach((unit, index) => {
            const unitNumber = index + 1;
            // Generate slugs for subject and unit title
            const subjectSlug = generateSlug(currentSubject);
            const unitSlug = generateSlug(unit.title);
            // FIXED: Use relative paths instead of absolute URLs
            const unitLink = `${subjectSlug}/${unitSlug}/`;
            const resourceType = "Tutorial";
            const iconIndex = index % unitIcons.length;

            const unitCard = document.createElement("div");
            unitCard.className = "pipara-academy-course-unit-card";
            unitCard.style.animationDelay = `${index * 0.05}s`;
            unitCard.innerHTML = `
                        <div class="pipara-academy-course-unit-header">
                            <div class="pipara-academy-course-unit-icon">
                                <i class="fas ${unitIcons[iconIndex]}"></i>
                            </div>
                            <div class="pipara-academy-course-unit-title-container">
                                <div class="pipara-academy-course-unit-number">Unit ${unitNumber}</div>
                                <h4>${unit.title}</h4>
                            </div>
                        </div>
                        <p>${unit.description}</p>
                        <a href="${unitLink}" target="_blank">
                            <i class="fas fa-external-link-alt"></i> Open ${resourceType}
                        </a>
                        <span class="pipara-academy-course-resource-badge">${resourceType.toUpperCase()}</span>
                        <div class="pipara-academy-course-unit-progress">
                            <div class="pipara-academy-course-unit-progress-bar" style="width: ${Math.floor(Math.random() * 100)}%"></div>
                        </div>
                    `;
            unitCard.addEventListener('click', () => showUnitDetails(unit, unitNumber));
            unitList.appendChild(unitCard);
        });
    } else {
        // Fallback to default units if no external data
        const unitThemes = [
            "Fundamentals and Introduction",
            "Core Concepts and Principles",
            "Advanced Techniques",
            "Practical Applications",
            "Case Studies and Real-world Examples"
        ];

        // Create 5 units for each subject
        for (let i = 1; i <= 5; i++) {
            const themeIndex = (i - 1) % unitThemes.length;
            const unitTitle = unitThemes[themeIndex];
            
            // Generate slugs for subject and unit title
            const subjectSlug = generateSlug(currentSubject);
            const unitSlug = generateSlug(unitTitle);
            // FIXED: Use relative paths instead of absolute URLs
            const unitLink = `${subjectSlug}/${unitSlug}/`;
            const resourceType = "Tutorial";
            const iconIndex = (i - 1) % unitIcons.length;

            const unitCard = document.createElement("div");
            unitCard.className = "pipara-academy-course-unit-card";
            unitCard.style.animationDelay = `${i * 0.05}s`;
            unitCard.innerHTML = `
                        <div class="pipara-academy-course-unit-header">
                            <div class="pipara-academy-course-unit-icon">
                                <i class="fas ${unitIcons[iconIndex] || 'fa-book'}"></i>
                            </div>
                            <div class="pipara-academy-course-unit-title-container">
                                <div class="pipara-academy-course-unit-number">Unit ${i}</div>
                                <h4>${unitTitle}</h4>
                            </div>
                        </div>
                        <p>${getUnitDescription(i, currentSubject)}</p>
                        <a href="${unitLink}" target="_blank">
                            <i class="fas fa-external-link-alt"></i> Open ${resourceType}
                        </a>
                        <span class="pipara-academy-course-resource-badge">${resourceType.toUpperCase()}</span>
                        <div class="pipara-academy-course-unit-progress">
                            <div class="pipara-academy-course-unit-progress-bar" style="width: ${Math.floor(Math.random() * 100)}%"></div>
                        </div>
                    `;
            unitCard.addEventListener('click', () => showUnitDetails({
                title: unitTitle,
                description: getUnitDescription(i, currentSubject)
            }, i));
            unitList.appendChild(unitCard);
        }
    }
}

function showUnitDetails(unit, unitNumber) {
    // Update the overlay to show unit details
    document.getElementById("pipara-academy-course-subject-title").textContent = unit.title;
    document.getElementById("pipara-academy-course-overlay-subtitle").textContent = `Unit ${unitNumber} of ${currentSubject}`;

    // Generate slugs for subject and unit title
    const subjectSlug = generateSlug(currentSubject);
    const unitSlug = generateSlug(unit.title);
    // FIXED: Use relative paths instead of absolute URLs
    const unitLink = `${subjectSlug}/${unitSlug}/`;

    // Hide the unit list and show the unit details
    document.getElementById("pipara-academy-course-unit-content").innerHTML = `
                <button class="pipara-academy-course-back-btn" onclick="goBackToUnitList()">
                    <i class="fas fa-arrow-left"></i> Back to Units
                </button>
                
                <div class="pipara-academy-course-unit-card" style="animation: none; padding: 2rem;">
                    <div class="pipara-academy-course-unit-header">
                        <div class="pipara-academy-course-unit-icon" style="width: 60px; height: 60px; font-size: 1.8rem; margin-right: 1.2rem;">
                            <i class="fas fa-book-open"></i>
                        </div>
                        <div class="pipara-academy-course-unit-title-container">
                            <div class="pipara-academy-course-unit-number" style="font-size: 1.1rem;">Unit ${unitNumber} of ${currentUnits.length || 5}</div>
                            <h4 style="font-size: 1.5rem; margin-bottom: 0.8rem;">${unit.title}</h4>
                        </div>
                    </div>
                    <p style="font-size: 1.1rem; line-height: 1.7; margin-bottom: 1.5rem;">${unit.description}</p>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="font-size: 1.2rem; margin-bottom: 1rem; color: #4facfe;">Topics Covered</h4>
                        <ul style="list-style: none; display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 0.8rem;">
                            ${unit.topics ? unit.topics.map(topic => `
                                <li style="background: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 0.8rem; border-left: 3px solid #3498db;">
                                    ${topic}
                                </li>
                            `).join('') : `
                                <li style="background: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 0.8rem; border-left: 3px solid #3498db;">
                                    Introduction to ${unit.title}
                                </li>
                                <li style="background: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 0.8rem; border-left: 3px solid #3498db;">
                                    Core concepts and principles
                                </li>
                                <li style="background: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 0.8rem; border-left: 3px solid #3498db;">
                                    Advanced techniques
                                </li>
                                <li style="background: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 0.8rem; border-left: 3px solid #3498db;">
                                    Practical applications
                                </li>
                            `}
                        </ul>
                    </div>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="font-size: 1.2rem; margin-bottom: 1rem; color: #4facfe;">Learning Resources</h4>
                        <div class="resource-links">
                            <a href="${unitLink}" class="resource-btn" target="_blank">
                                <i class="fas fa-book"></i> Study Material
                            </a>
                            <a href="${unitLink}" class="resource-btn" target="_blank">
                                <i class="fas fa-video"></i> Video Lectures
                            </a>
                            <a href="${unitLink}" class="resource-btn" target="_blank">
                                <i class="fas fa-tasks"></i> Practice Exercises
                            </a>
                            <a href="${unitLink}" class="resource-btn" target="_blank">
                                <i class="fas fa-question-circle"></i> Unit Quiz
                            </a>
                        </div>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem;">
                        <a href="${unitLink}" style="display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(46, 204, 113, 0.2); color: white; padding: 0.8rem 1.5rem; border-radius: 50px; text-decoration: none; transition: all 0.3s ease; font-size: 1rem;" target="_blank">
                            <i class="fas fa-external-link-alt"></i> Open Full Unit
                        </a>
                        <span class="pipara-academy-course-resource-badge" style="position: static; font-size: 0.9rem;">TUTORIAL</span>
                    </div>
                </div>
            `;
}

function goBackToUnitList() {
    // Restore the unit list view
    document.getElementById("pipara-academy-course-unit-content").innerHTML = `
                <button class="pipara-academy-course-back-btn" onclick="goBackToSubjects()">
                    <i class="fas fa-arrow-left"></i> Back to Subjects
                </button>
                <div class="pipara-academy-course-unit-list" id="pipara-academy-course-unit-list"></div>
            `;

    // Render the units again
    renderUnitCards();
}

function getUnitDescription(unit, subject) {
    const topics = [
        "Introduction, history, and fundamental concepts",
        "Core principles, theories, and methodologies",
        "Advanced techniques, algorithms, and implementations",
        "Practical applications, case studies, and real-world examples",
        "Emerging trends, research directions, and future outlook"
    ];

    const topicIndex = (unit - 1) % topics.length;
    return `${topics[topicIndex]}`;
}

function closeUnitOverlay() {
    unitOverlay.style.display = "none";
    document.body.style.overflow = "auto";
}

function goBackToSubjects() {
    unitOverlay.style.display = "none";
    overlay.style.display = "flex";
}

// Close overlays when clicking outside the container
overlay.addEventListener('click', function (e) {
    if (e.target === this) {
        closeOverlay();
    }
});

unitOverlay.addEventListener('click', function (e) {
    if (e.target === this) {
        closeUnitOverlay();
    }
});

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initSemesterCards();
});

// Expose navigation functions to global scope
window.goBackToUnitList = goBackToUnitList;
window.goBackToSubjects = goBackToSubjects;