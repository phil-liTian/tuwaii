export {
	isArguments,
	isArrayBuffer,
	isArrayLike,
	isArrayLikeObject,
	isBuffer,
	isBoolean,
	isDate,
	isElement,
	isEmpty,
	isEqual,
	isEqualWith,
	isError,
	isFunction,
	isFinite,
	isLength,
	isMap,
	isMatch,
	isMatchWith,
	isNative,
	isNil,
	isNumber,
	isNull,
	isObjectLike,
	isPlainObject,
	isRegExp,
	isSafeInteger,
	isSet,
	isString,
	isSymbol,
	isTypedArray,
	isUndefined,
	isWeakMap,
	isWeakSet
} from 'lodash';

export function isArray(val: any): val is Array<any> {
	return val && Array.isArray(val);
}
