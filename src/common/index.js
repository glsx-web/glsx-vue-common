/*
 * @Author: limin
 * @Date: 2018-06-23 11:57:23
 * @Last Modified by: limin
 * @Last Modified time: 2018-08-21 10:20:57
 */
import { GenerateTitle } from './src/i18n'
import { setSession, getSession, removeSession, get, set, remove } from './src/storage'
import { recursionGet, recursionSet, firstUpperCase, debounce, merge } from './src/functions'
import {
  SetConfig,
  GetConfig,
  GetToken,
  RemoveToken,
  SetConfigByKey,
  GetConfigByKey,
  GetSessionConfigByKey,
  SetSessionConfigByKey,
  GetSessionConfig,
  SetSessionConfig,
  RemoveSessionConfig,
  RemoveConfig,
  GetMenus,
  Penpal
  // _
} from '@/lib/prototypes'
import uuid from 'uuid/v1'
export {
  setSession,
  getSession,
  removeSession,
  remove,
  get,
  set,
  recursionGet,
  recursionSet,
  firstUpperCase,
  SetConfig,
  GetConfig,
  GetToken,
  RemoveToken,
  SetConfigByKey,
  GetConfigByKey,
  GetSessionConfigByKey,
  SetSessionConfigByKey,
  GetSessionConfig,
  SetSessionConfig,
  RemoveSessionConfig,
  RemoveConfig,
  GenerateTitle,
  GetMenus,
  debounce,
  uuid,
  Penpal,
  merge
  // _
}
