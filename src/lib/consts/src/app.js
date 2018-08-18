export default {
  Key: 'app',
  States: {
    CLOSE: 1,
    OPEN: 2
  },
  MainVisible: {
    Key: 'app_mainVisible'
  },
  Visibility: {
    HIDDEN: false,
    VISIBLE: true
  },
  Device: {
    Key: 'app_device',
    Types: {
      MINSIZE: 'minsize',
      DESKTOP: 'desktop'
    }
  },
  ClientHeight: {
    Key: 'app_clientHeight'
  },
  DefaultColor: {
    Key: 'app_defaultColor'
  },
  Auth: {
    Key: 'app_auth',
    Resources: {
      Key: 'app_auth_resources'
    },
    Roles: {
      Key: 'app_auth_roles'
    },
    Token: {
      Key: 'app_auth_token'
    },
    Admin: {
      Key: 'admin'
    },
    Navs: {
      Key: 'app_auth_navs',
      First: {
        Key: 'app_auth_navs_first'
      },
      Second: {
        Key: 'app_auth_navs_second'
      },
      Third: {
        Key: 'app_auth_navs_third'
      },
      Fourth: {
        Key: 'app_auth_navs_fourth'
      },
      Fifth: {
        Key: 'app_auth_navs_fifth'
      }
    },
    CurNav: {
      Key: 'app_auth_curnav',
      First: {
        Key: 'app_auth_curnav_first'
      },
      Second: {
        Key: 'app_auth_curnav_second'
      },
      Third: {
        Key: 'app_auth_curnav_third'
      },
      Fourth: {
        Key: 'app_auth_curnav_fourth'
      },
      Fifth: {
        Key: 'app_auth_curnav_fifth'
      }
    },
    SubLoaded: {
      Key: 'app_auth_sub_loaded',
      Types: {
        LOADED: '1',
        UNLOADED: '0'
      }
    }
  },
  Axios: {
    Key: 'app_axios',
    BaseURL: {
      Key: 'app_axios_baseURL'
    },
    WhiteList: {
      Key: 'app_axios_whiteList'
    },
    Timeout: {
      Key: 'app_axios_timeout'
    }
  }
}
