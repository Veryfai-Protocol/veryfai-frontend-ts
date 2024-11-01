/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Cast object to a specific class
 * Usage: ```
    // somewhere your class:
    class YourActualClass {
        @JsonProperty('myProperty') // does the magic
        myProperty: string;
        
        constructor(){ 
            // important to "see" the property-keys i.e. in Object.keys(..)
            this.myProperty = undefined; 
        }
    }
    
    // somewhereelse your http-query:
    http.get('/some-url')
        .map(jsonObj => MapUtils.deserialize(YourActualClass, jsonObj))
        .subscribe(realObj => console.info(realObj instanceof YourActualClass))
```
 * @source http://cloudmark.github.io/Json-Mapping/
 */

import 'reflect-metadata';

function getClazz(target: any, propertyKey: string): any {
  return Reflect.getMetadata('design:type', target, propertyKey);
}

function getJsonProperty<T>(
  target: any,
  propertyKey: string
): IJsonMetaData<T> {
  return Reflect.getMetadata(jsonMetadataKey, target, propertyKey);
}

export interface IJsonMetaData<T> {
  name?: string;
  clazz?: { new (): T };
}

const jsonMetadataKey = 'jsonProperty';

export function JsonProperty<T>(metadata?: IJsonMetaData<T> | string): any {
  if (metadata instanceof String || typeof metadata === 'string') {
    return Reflect.metadata(jsonMetadataKey, {
      name: metadata,
      clazz: undefined,
    });
  } else {
    const metadataObj = <IJsonMetaData<T>>metadata;
    return Reflect.metadata(jsonMetadataKey, {
      name: metadataObj ? metadataObj.name : undefined,
      clazz: metadataObj ? metadataObj.clazz : undefined,
    });
  }
}
export default class MapUtils {
  static isPrimitive(
    obj: StringConstructor | NumberConstructor | BooleanConstructor
  ) {
    switch (typeof obj) {
      case 'string':
      case 'number':
      case 'boolean':
        return true;
    }
    return !!(
      obj instanceof String ||
      obj === String ||
      obj instanceof Number ||
      obj === Number ||
      obj instanceof Boolean ||
      obj === Boolean
    );
  }

  static isArray(object: ArrayConstructor) {
    if (object === Array) {
      return true;
    } else if (typeof Array.isArray === 'function') {
      return Array.isArray(object);
    } else {
      return !!(object instanceof Array);
    }
  }

  static deserialize<T>(clazz: { new (): T }, jsonObject: any) {
    if (clazz === undefined || jsonObject === undefined) return undefined;
    const obj: any = new clazz();
    Object.keys(obj).forEach((key) => {
      const propertyMetadataFn: (IJsonMetaData: any) => any = (
        propertyMetadata
      ) => {
        const propertyName = propertyMetadata.name || key;
        const innerJson = jsonObject ? jsonObject[propertyName] : undefined;
        const clazz = getClazz(obj, key);
        if (MapUtils.isArray(clazz)) {
          const metadata: any = getJsonProperty(obj, key);
          if (metadata.clazz || MapUtils.isPrimitive(clazz)) {
            if (innerJson && MapUtils.isArray(innerJson)) {
              return innerJson.map((item: any) =>
                MapUtils.deserialize(metadata.clazz, item)
              );
            } else {
              return undefined;
            }
          } else {
            return innerJson;
          }
        } else if (!MapUtils.isPrimitive(clazz)) {
          return MapUtils.deserialize(clazz, innerJson);
        } else {
          return jsonObject ? jsonObject[propertyName] : undefined;
        }
      };

      const propertyMetadata = getJsonProperty(obj, key);
      if (propertyMetadata) {
        obj[key] = propertyMetadataFn(propertyMetadata);
      } else {
        if (jsonObject && jsonObject[key] !== undefined) {
          obj[key] = jsonObject[key];
        }
      }
    });
    return obj;
  }
}

export { MapUtils };
