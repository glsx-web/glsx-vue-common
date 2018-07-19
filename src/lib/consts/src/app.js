export default {
  Key: 'app',
  States: {
    CLOSE: 1,
    OPEN: 2
  },
  Visibility: {
    HIDDEN: 1,
    VISIBLE: 2
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
    }
  },
  Axios: {
    Key: 'app_axios',
    BaseURL: { Key: 'app_axios_baseURL' },
    WhiteList: { Key: 'app_axios_whiteList' },
    Timeout: {
      Key: 'app_axios_timeout'
    }
  }
}
