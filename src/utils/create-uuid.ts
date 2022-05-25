import { v4 as uuidV4 } from 'uuid'

export function createUuid() {
  return uuidV4().replace(/-/g, '')
}