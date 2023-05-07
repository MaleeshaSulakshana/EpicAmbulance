// eslint-disable-next-line @typescript-eslint/naming-convention
import { environment } from '../../../environments/environment';


export enum httpMethods {
  post = 'post',
  put = 'put',
  get = 'get',
  delete = 'delete',
  patch = 'patch',
}

export enum AutoCapitalizeTypes {
  none = 'none',
  sentences = 'sentences',
  words = 'words',
  characters = 'characters',
}

export enum KeyBoardTypes {
  default = 'default',
  email = 'email-address',
  numeric = 'numeric',
  phone = 'phone-pad',
  url = 'url',
  number = 'number-pad',
  unset = 'unset',
}

export enum ReturnKeyTypes {
  none = 'none',
  done = 'done',
  search = 'search',
  default = 'default',
  go = 'go',
  next = 'next',
  send = 'send',
  previous = 'previous',
  emergency = 'emergency-call',
}

export enum PasswordErrorTypes {
  LOWERCASE = 'lowercase',
  UPPERCASE = 'uppercase',
  NUMBER = 'number',
  LENGTH = 'length',
  SYMBOL = 'symbol',
}

export enum ValidationTypes {
  required = 'required',
  email = 'email',
  mobile = 'mobile',
  name = 'name',
  number = 'number',
  income = 'income',
  date = 'date',
  currency = 'currency',
  password = 'password',
}

export enum ResizeModes {
  contain = 'contain',
  cover = 'cover',
  stretch = 'stretch',
  repeat = 'repeat',
  center = 'center',
}

export enum ToastType{
  success = 'success',
  info = 'info',
  error = 'error',
  warning = 'warning',
}

export enum AlertType {
  popup = 'POPUP',
  toast = 'TOAST',
}

