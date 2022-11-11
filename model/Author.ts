export default interface Author {
  id?: string
  dateCreated?: string
  lastModified?: string
  name: string
  email: string
  about?: string
  optIntoNewsletter: boolean
  mobile?: string
  exposeMyMobile: boolean
}
