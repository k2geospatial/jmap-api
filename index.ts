import { Action, Store } from "redux"

// API
export interface JAPI {
  Extensions: JAPIExtention
  Data: JAPIData
  Application: JAPIApplication
  Components: JAPIComponents
  Services: JAPIService
  Config: JAPIConfig
}

// API OPTIONS
export interface JAPIOptions {
  application?: JAPIApplicationOptions,
  server?: {
    baseUrl?: string
  }
}

// API DATA
export interface JAPIData {
  Store: Store<JAPIState>|undefined
  Getters: JStoreGetter
}

export interface JStoreGetter {
  getProjectId(): string
  getUserLocale(): string
  getUserToken(): string
  getUserIdentity(): JUserIdentity
  getUserLogin(): string
}

export interface JAPIState {
  project: JProjectState
  user: JUserState
  external?: any
}

export interface JProjectState {
  id: string
}

// API DATA -> USER
export interface JUserState {
  identity: JUserIdentity
  token: string
  locale: string
}

export interface JUserIdentity {
  firstName: string
  lastName: string
  login: string
}

// API APPLICATION
export interface JAPIApplication {
  ContainerId: string
  Instance: any
  start(containerId?: string, initOptions?: JAPIApplicationOptions): void
}

export interface JAPIApplicationOptions {
  start: boolean
  containerId: string
}

// API CONFIG
export interface JAPIConfig {
  startApplicationAtStartup(): boolean
  getApplicationContainerId(): string
  getBaseUrl(): string
  getOldJmapConfig(): JAPIConfigOldJmap // @Deprecated
}

// @Deprecated : will be removed when old jmap will be retired
export interface JAPIConfigOldJmap {
  needSplitMouseOverElementsData(): boolean
}

// API SERVICE
export interface JAPIService {
  Project: JProjectService
  User: JUserService
}

// API SERVICE -> PROJECT
export interface JProjectService {
  setId(projectId: string): void
  getId(): string
}

// API SERVICE -> USER
export interface JUserService {
  setToken(token: string): void
  login(login: string, password: string): Promise<JLoginData>
  logout(): Promise<void>
}

export interface JLoginData {
  token: string
  user: JUserPublicData
}

export interface JUserPublicData {
  login: string,
  firstname: string,
  lastname: string,
  admin: boolean
}

// API COMPONENTS
export interface JAPIComponents {
  UserSession: JAPIComponent<JUserSessionCmp>
}

export interface JAPIComponent<C extends React.Component> {
  create(containerId: string, options: any): React.Component
  destroy(containerId: string): void
  getInstance(containerId: string): React.Component
}

// API COMPONENTS -> USER_SESSION CMP
export interface JUserSessionCmp extends React.Component<JUserSessionProps, {}>{}
export interface JUserSessionProps {
  user?: JUserState
}

// API EXTENSION
export interface JAPIExtention {
  Document?: JDocumentService
  register(extensionModel: JExtensionModel): void
  isRegistered(extensionId: string): boolean
  isValidExtension(extensionId: string): boolean
  renderMouseOver(layerId: string, elementId: string): JExtensionMouseOver[]
}

export interface JExtensionModel {
  id: string
  initFn: (options: any) => void
  storeReducer?: (reducerState: any, action: Action) => any
  serviceToExpose?: any
  renderMouseOver?(layerId: string, elementId: string): JExtensionMouseOver
}

export interface JExtensionMouseOver {
  html: string  // static html content
  js?: string   // javascript that will be evaluated after html rendered
}

// @Deprecated will be removed when old jmap will be retired
export interface JDocumentServiceUiController {
  createDocumentIcon(layerId: string, elementId: string): void
  displayElementDocuments(layerId: string, elementId: string): void
}

export interface JDocumentService {
  ui_controller: JDocumentServiceUiController // @Deprecated
  selectElement(layer: string, element: string): Promise<void>
  getElementDocuments(toSelectObjectId: JObjectId): Promise<JDocumentDescriptor[]>
  selectDocuments(documents: JDocumentDescriptor[]): void
  filter(filterValue: string | undefined): void
}

export interface JDocumentDescriptor {
  identifier: number
  title: string
  description: string
  fileName: string
  creation: number // timestamp
  depositName: string
}

// MIS
export interface JObjectId {
  project: string
  layer: string
  element: string
}

// TODO
export interface JPopupService {
  popInfo(message: string): void
  popWarning(message: string): void
  popError(message: string): void
  popConfirm(message: string, confirmCallback: (() => any), cancelCallback?: (() => any)): void
}
