// Here the JMAP API namespace definition
// It will enable to call the API like that in your code :
// Ex: JMAP_API.Services.User.logout()
// This is the API contract, if changed it has impact on customers

declare namespace JMAP_API {
  namespace Extensions {
    namespace Document {
      const ui_controller: any // @Deprecated
      function selectElement(toSelectedObjectId: JObjectId): Promise<JDocumentDescriptor[]>
      function selectElements(toSelectedObjectIds: JObjectId[]): Promise<JDocumentDescriptor[]>
      function filter(filterValue: string | undefined): void
    }
    function register(extensionModel: any): void
    function isRegistered(extensionId: string): boolean
    function isValidExtension(extensionId: string): boolean
    function renderMouseOver(layerId: string, elementId: string): JExtensionMouseOver[]
  }
  namespace Data {
    const Store: any|undefined
    namespace Getters {
      function getUserLocale(): string
      function getUserToken(): string
      function getUserIdentity(): JUserIdentity
      function getUserLogin(): string
    }
  }
  namespace Application {
    const ContainerId: string
    const Instance: React.Component<any, React.ComponentState> | Element | void
    function start(containerId?: string, initOptions?: JAPIApplicationOptions): void
  }
  namespace Components {
    const UserSession: JAPIComponent<JUserSessionCmp>
  }
  namespace Services {
    namespace User {
      function login(login: string, password: string): Promise<JLoginData>
      function logout(): Promise<void>
    }
  }
  namespace Config {
    function startApplicationAtStartup(): boolean
    function getApplicationContainerId(): string
    function getBaseUrl(): string
    function getOldJmapConfig(): any // @Deprecated
  }
}

declare interface Window {
  JMAP_API_OPTIONS?: any //JAPIOptions
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
}

interface JDocumentDescriptor {
  id: string
  title: string
  description: string
  objectIds: JObjectId[]
}

interface JExtensionMouseOver {
  html: string  // static html content
  js?: string   // javascript that will be evaluated after html rendered
}

interface JObjectId {
  project: number
  layer: number
  element: number
}

interface JUserIdentity {
  firstName: string
  lastName: string
  login: string
}

interface JLoginData {
  token: string
  user: JUserPublicData
}

interface JUserPublicData {
  login: string,
  firstname: string,
  lastname: string,
  admin: boolean
}

interface JAPIApplicationOptions {
  start: boolean
  containerId: string
}

interface JAPIComponent<C extends React.Component> {
  create(containerId: string, options: any): React.Component
  destroy(containerId: string): void
  getInstance(containerId: string): React.Component
}

interface JUserSessionCmp extends React.Component<JUserSessionProps, {}>{}
interface JUserSessionProps {
  user?: JUserState
}

interface JUserState {
  identity: JUserIdentity
  token: string
  locale: string
}

interface JUserIdentity {
  firstName: string
  lastName: string
  login: string
}
