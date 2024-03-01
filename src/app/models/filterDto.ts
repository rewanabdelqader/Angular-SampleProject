export interface FilterDto {
  model: string
  orderBy: string
  isDesc: boolean
  groupBy: string[]
  pageInfo: PageInfo
  conditions: Condition[]
}

export interface PageInfo {
  pageNo: number
  resultsPerPage: number
  totalResults: number
}

export interface Condition {
  column: string
  oprator: number
  value: string
  then: number
}
