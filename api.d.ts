//type JObjectId 
declare namespace JMAP_API {
  namespace Extensions {
    namespace Document {
      const ui_controller: any // @Deprecated
      //function selectElement(toSelectedObjectId: JObjectId): Promise<JDocumentDescriptor[]>
      //function selectElements(toSelectedObjectIds: JObjectId[]): Promise<JDocumentDescriptor[]>
      function filter(filterValue: string | undefined): void
    }
    function register(extensionModel: any): void
    function isRegistered(extensionId: string): boolean
    function isValidExtension(extensionId: string): boolean
    //function renderMouseOver(layerId: string, elementId: string): JExtensionMouseOver[]
  }
  namespace Data {
    const Store: any|undefined
    namespace Getters {
      function getUserLocale(): string
      function getUserToken(): string
      //function getUserIdentity(): JUserIdentity
      function getUserLogin(): string
    }
  }
  namespace Application {
    const ContainerId: string
    const Instance: React.Component<any, React.ComponentState> | Element | void
    //function start(containerId?: string, initOptions?: JAPIApplicationOptions): void
  }
  namespace Components {
    //const UserSession: JAPIComponent<UserSession>
  }
  namespace Services {
    namespace User {
      //function login(login: string, password: string): Promise<JLoginData>
      function logout(): Promise<void>
    }
  }
  namespace Config {
    function startApplicationAtStartup(): boolean
    function getApplicationContainerId(): string
    function getBaseUrl(): string
    //function getOldJmapConfig(): JAPIConfigOldJmap // DEPRECATED
  }
}

declare interface Window {
  JMAP_API_OPTIONS?: any //JAPIOptions
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
}