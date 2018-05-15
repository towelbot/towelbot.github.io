"use strict";



define('rarwe/app', ['exports', 'rarwe/resolver', 'ember-load-initializers', 'rarwe/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('rarwe/helpers/app-version', ['exports', 'rarwe/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;

    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('rarwe/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('rarwe/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('rarwe/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'rarwe/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('rarwe/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('rarwe/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('rarwe/initializers/export-application-global', ['exports', 'rarwe/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define("rarwe/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('rarwe/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('rarwe/router', ['exports', 'rarwe/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('bands', function () {
      this.route('band', { path: ':slug' }, function () {
        this.route('songs');
      });
    });
  });

  exports.default = Router;
});
define('rarwe/routes/bands', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let Band = Ember.Object.extend({
    name: '',

    slug: Ember.computed('name', function () {
      return Ember.String.dasherize(this.get('name'));
    })
  });

  let Song = Ember.Object.extend({
    title: '',
    band: '',
    rating: 0
  });

  exports.default = Ember.Route.extend({
    model() {
      let blackDog = Song.create({
        title: 'Black Dog',
        band: 'Led Zeppelin',
        rating: 3
      });

      let yellowLedbetter = Song.create({
        title: 'Yellow Ledbetter',
        band: 'Pearl Jam',
        rating: 4
      });

      let pretender = Song.create({
        title: 'Pretender',
        band: 'Foo Fighters',
        rating: 2
      });

      let daughter = Song.create({
        title: 'Daughter',
        band: 'Pearl Jam',
        rating: 5
      });

      let ledZeppelin = Band.create({ name: 'Led Zeppelin', songs: Ember.A([blackDog]) });
      let pearlJam = Band.create({ name: 'Pearl Jam', songs: Ember.A([yellowLedbetter, daughter]) });
      let fooFighters = Band.create({ name: 'Foo Fighters', songs: Ember.A([pretender]) });

      return Ember.A([ledZeppelin, pearlJam, fooFighters]);
    }
  });
});
define('rarwe/routes/bands/band', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model(params) {
      let bands = this.modelFor('bands');
      return bands.findBy('slug', params.slug);
    }
  });
});
define('rarwe/routes/bands/band/songs', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function () {
      return this.modelFor('bands.band');
    }
  });
});
define('rarwe/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("rarwe/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "wqTNA0Fj", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"rr-container\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"rr-page-header\"],[8],[0,\"\\n    \"],[6,\"h1\"],[10,\"class\",\"rr-app-title\"],[8],[0,\"Rock & Roll\"],[6,\"small\"],[10,\"class\",\"rr-subtitle\"],[8],[0,\" with Ember.js\"],[9],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"rr-main-content\"],[8],[0,\"\\n\\n    \\n    \"],[1,[20,\"outlet\"],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "rarwe/templates/application.hbs" } });
});
define("rarwe/templates/bands", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "JKigE2X4", "block": "{\"symbols\":[\"band\"],\"statements\":[[6,\"div\"],[10,\"class\",\"rr-sidebar\"],[8],[0,\"\\n  \"],[6,\"ul\"],[10,\"class\",\"rr-list\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[6,\"li\"],[10,\"class\",\"rr-list-item\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"bands.band.songs\",[21,1,[]]],[[\"class\"],[\"rr-band-link\"]],{\"statements\":[[0,\"      \"],[1,[21,1,[\"name\"]],false],[0,\"\\n      \"],[6,\"span\"],[10,\"class\",\"rr-pointer\"],[8],[0,\"\\n        \"],[6,\"i\"],[10,\"class\",\"fa fa-angle-right\"],[10,\"aria-hidden\",\"true\"],[8],[9],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"rr-main-panel\"],[8],[0,\"\\n  \"],[1,[20,\"outlet\"],false],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "rarwe/templates/bands.hbs" } });
});
define("rarwe/templates/bands/band", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "/GBaw7hH", "block": "{\"symbols\":[],\"statements\":[[1,[20,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "rarwe/templates/bands/band.hbs" } });
});
define("rarwe/templates/bands/band/songs", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "8jC3eojm", "block": "{\"symbols\":[\"song\"],\"statements\":[[6,\"ul\"],[10,\"class\",\"rr-list\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"songs\"]]],null,{\"statements\":[[0,\"  \"],[6,\"li\"],[10,\"class\",\"rr-list-item\"],[8],[0,\"\\n    \"],[1,[21,1,[\"title\"]],false],[0,\" \"],[6,\"span\"],[10,\"class\",\"rr-rating fr\"],[8],[1,[21,1,[\"rating\"]],false],[9],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[1]},{\"statements\":[[0,\"  \"],[6,\"li\"],[10,\"class\",\"rr-empty-message\"],[8],[0,\"\\n    No \"],[1,[22,[\"model\",\"name\"]],false],[0,\" songs yet.\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[]}],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "rarwe/templates/bands/band/songs.hbs" } });
});
define("rarwe/templates/bands/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Tze3UG7k", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"rr-empty-message\"],[8],[0,\"\\nSelect a band.\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "rarwe/templates/bands/index.hbs" } });
});


define('rarwe/config/environment', [], function() {
  var prefix = 'rarwe';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("rarwe/app")["default"].create({"name":"rarwe","version":"0.0.0+4cd4a35b"});
}
//# sourceMappingURL=rarwe.map
