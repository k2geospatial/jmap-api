import { Action, Store } from "redux"

export type UIComponent = void | Element | React.Component

// API
export interface JAPI {
  Extension: JAPIExtention
  Data: JAPIData
  Application: JAPIApplication
  Component: JAPIComponent
  Service: JAPIService
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
  getStore(): Store<JAPIState> | undefined
  Project: JStoreGetterProject
  User: JStoreGetterUser
  Selection: JStoreGetterSelection
  Statistics: JStoreGetterStatistics
}

export interface JStoreGetterProject {
  getId(): string
}

export interface JStoreGetterStatistics {
  getOpenedProjects(): number[],
  getViewedLayers(): number[],
  getViewedContext(): number[]
}

export interface JStoreGetterUser {
  getLocale(): string
  getSessionId(): string
  getIdentity(): JUserIdentity
  getLogin(): string
}

export interface JStoreGetterSelection {
  getSelection(): JElementSelection
}

export interface JAPIState {
  project: JProjectState
  user: JUserState
  selection: JSelectionState
  form: any
  statistics: JStatisticsState
  external?: any
}

// API DATA -> PROJECT

export interface JProjectState {
  id: string
}

// API DATA -> USER

export interface JUserState {
  identity: JUserIdentity
  sessionId: string
  locale: string
}

export interface JUserIdentity {
  firstName: string
  lastName: string
  login: string
}

// API DATA -> SELECTION

export interface JSelectionState {
  current: JElementSelection
}

// API DATA -> STATISTICS

export interface JStatisticsState {
  openedProjects: number[]
  viewedLayers: number[]
  viewedContexts: number[]
}

// API APPLICATION
export interface JAPIApplication {
  needToStart(): boolean
  getDomContainerId(): string
  getInstance(): UIComponent
  start(containerId?: string, initOptions?: JAPIApplicationOptions): void
}

export interface JAPIApplicationOptions {
  start: boolean
  containerId: string
}

// API SERVICE
export interface JAPIService {
  Language: JAPILanguageService
  Project: JProjectService
  User: JUserService
  Selection: JSelectionService
  Statistics: JStatisticsService
}

// API SERVICE -> LANGUAGE
export interface JAPILanguageService {
  getLocale(): string
  setLocale(locale: string): void
  translate(key: string, params?: string | string[], locale?: string): string
}

// API SERVICE -> PROJECT
export interface JProjectService {
  setId(projectId: string): void
}

// API SERVICE -> USER
export interface JUserService {
  setSessionId(token: string): void
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

// API SERVICE -> STATISTICS

export interface JStatisticsService {
  addProjectOpened(layerIds: number[]): Promise<void>
  addLayerViewed(layerId: number): Promise<void>
  addContextViewed(contextId: number): Promise<void>
}

// API SERVICE -> SELECTION

export interface JSelectionService {
  getCurrentSelection(): JElementSelection
  addSelection(selection: JElementSelection): void
  removeSelection(selection: JElementSelection): void
  clearSelection(): void
  setSelection(association: JElementSelectionWithAttribute[]): Promise<any[]>
  zoomToSelection(elements: any): void
  initializeElementAttributesPanel(selectedElements: any[]): void
}

export interface JElementSelection {
  [layerId: number]: number[]
}

// API COMPONENTS
export interface JAPIComponent {
  FormFlat: JAPIComponentItem<JFormCmp, JFormProps>
}

// P for react props
export interface JAPIComponentItem<C extends UIComponent, P> {
  create(containerId: string, props?: P): C
  destroy(containerId: string): void
  getInstance(containerId: string): C
}

// API COMPONENTS -> FORM CMP
export interface JFormCmp extends React.Component<JFormProps, {}> { }
export interface JFormProps {
  idPrefix: string
  formDescriptor: JFormDescriptor,
  buttonLabelSubmit?: string
  buttonLabelCancel?: string
  buttonLabelClear?: string
  hideClearButton?: boolean
  onSubmit: (values: any) => void,
  onCancel?: () => void
  onClear?: () => void
}

// API EXTENSION
export interface JAPIExtention {
  Document?: JDocumentService
  register(extensionModel: JExtensionModel): void
  isRegistered(extensionId: string): boolean
  getAllRegistered(): string[]
  renderMouseOver(layerId: string, elementId: string): JExtensionMouseOver[]
  hasMouseOver(): boolean // @Deprecated should not be used in JMap Web NG
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
  createDocumentIcon(layerId: string,
    elementId: string): void
  displayElementDocuments(layerId: string, elementId: string): void
}

export interface JDocumentService {
  ui_controller: JDocumentServiceUiController // @Deprecated

  setMode(newMode: JDocumentMode): void

  selectMapElement(layer: string, element: string): Promise<void>
  unSelectMapElement(): void
  getElementDocuments(toSelectObjectId: JObjectId): Promise<JAllDocumentDescriptors>

  getAndSetDeposits(): Promise<JDepositDescriptor[]>
  setDeposits(deposits: JDepositDescriptor[]): void

  setSelectionDocuments(descriptors: JAllDocumentDescriptors): void
  filterSelectionResult(filterValue: string | undefined): void
  showOnMap(document: JDocumentDescriptor): void

  setSearchBasicDeposit(depositId: number): void
  setSearchBasicTextInput(filter: string): void
  setSearchBasicOptionRegion(selected: boolean): void
  setSearchBasicOptionElementSelected(selected: boolean): void
  resetSearchBasic(textInput?: string): void
  filterSearchBasicResult(filterValue: string | undefined): void
  clearSearchBasicResult(): void
  launchSearchBasic(): Promise<JDocumentDescriptor[]>

  getAndSetSearchAdvancedDepositForms(depositId: number): Promise<JFormDescriptor[]>
  selectSearchAdvancedDepositForm(formId: number): void
  setSearchAdvancedDeposit(depositId: number): void
  setSearchAdvancedOptionRegion(selected: boolean): void
  setSearchAdvancedOptionElementSelected(selected: boolean): void
  filterSearchAdvancedResult(filterValue: string | undefined): void
  clearSearchAdvancedResult(): void
  launchSearchAdvanced(valuesByAttributeName: { [attributeName: string]: any }): void

  getRichPreview(websiteUrl: string): void
}

export enum JDocumentMode {
  MENU, SELECTION, SEARCH_BASIC, SEARCH_ADVANCED
}

export interface JAllDocumentDescriptors {
  documents: JDocumentDescriptor[]
  hyperlinks: JHyperLinkDescriptor[]
}

export interface JDocumentDescriptor {
  identifier: number
  title: string
  description: string
  fileName: string
  creation: number // timestamp
  depositName: string
  depositId: number
  hasDownloadPermission: boolean
  documentAssociations: JElementSelectionWithAttribute[]
  metadataList: JDocumentMetadata[]
}

export interface JDocumentMetadata {
  name: string
  values: (string | number)[]
}

export interface JHyperLinkDescriptor {
  id: number
  url: string
  depositName: string
  depositId: number
  linkDescription: string
  linkImageLocation: string
  linkTitle: string
  linkFavicon: string
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
  popConfirm(message: string, confirmCallback: (() => any), cancelCallback?: (() => any)): void
}

export interface JDocumentSearchParams {
  searchCriteria: JDocumentSearchCriteria[]
  isAssociated?: boolean
  searchRegion?: JDocumentSearchRegion
  elementIdsByLayerId?: {
    [layerId: number]: number[]
  }
}

export interface JDocumentSearchCriteria {
  attName: string
  value: any
  type: string
  operatorValue: string
}

export interface JDocumentSearchRegion {
  coordX: number
  coordY: number
  width: number
  height: number
}
