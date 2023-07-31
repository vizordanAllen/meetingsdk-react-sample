import { KJUR } from 'jsrsasign';

// eslint-disable-next-line max-params
export function generateVideoToken(meetingNumber,role=0) {
  let signature = '';

  try {
    // const iat = Math.round(new Date().getTime() / 1000) - 30;
    // const exp = iat + 60 * 60 * 2;
  
    // const oHeader = { alg: 'HS256', typ: 'JWT' }
  
    // const oPayload = {
    //   sdkKey: process.env.REACT_APP_ZOOM_MEETING_SDK_KEY,
    //   mn: meetingNumber,
    //   role: role,
    //   iat: iat,
    //   exp: exp,
    //   appKey: process.env.REACT_APP_ZOOM_MEETING_SDK_KEY,
    //   tokenExp: iat + 60 * 60 * 2
    // }
  
    // const sHeader = JSON.stringify(oHeader)
    // const sPayload = JSON.stringify(oPayload)
    // console.log(oPayload)
    // const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, process.env.REACT_APP_ZOOM_MEETING_SDK_SECRET)
    // return signature
    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 2;
    // Header
    const oHeader = { alg: 'HS256', typ: 'JWT' };
    // Payload
    const oPayload = {
      sdkKey: process.env.REACT_APP_ZOOM_MEETING_SDK_KEY,
      mn: meetingNumber,
      role: role,
      iat: iat,
      exp: exp,
      appKey: process.env.REACT_APP_ZOOM_MEETING_SDK_KEY,
      tokenExp: iat + 60 * 60 * 2
    }
   
    // Sign JWT
    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, process.env.REACT_APP_ZOOM_MEETING_SDK_SECRET);
    return signature
  
  } catch (e) {
    console.log("err",e)
  }
  return signature;
}

export function isShallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (!objA || !objB) {
    return false;
  }

  const aKeys = Object.keys(objA);
  const bKeys = Object.keys(objB);
  const len = aKeys.length;

  if (bKeys.length !== len) {
    return false;
  }

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < len; i++) {
    const key = aKeys[i];

    if (objA[key] !== objB[key] || !Object.hasOwn(objB, key)) {
      return false;
    }
  }

  return true;
}

export function b64EncodeUnicode(str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(('0x' + p1) );
    })
  );
}

export function b64DecodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(str)
      .split('')
      .map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
}
