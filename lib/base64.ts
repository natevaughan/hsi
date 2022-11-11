// modified from source https://github.com/dominictarr/d64/blob/master/index.js

const CHARS = "-PYFGCRLAOEUIDHTNSQJKXBMWVZ_pyfgcrlaoeuidhtnsqjkxbmwvz1234567890".split('').sort().join('')

const codeToIndex = new Buffer(128)
codeToIndex.fill(0)

for(let i = 0; i < 64; i++) {
  var code = CHARS.charCodeAt(i)
  codeToIndex[code] = i
}

export function b64Encode(data: ArrayLike<number>) {
  let s = "", l = data.length, hang = 0;
  for (let i = 0; i < l; i++) {
    let v = data[i];

    switch (i % 3) {
      case 0:
        s += CHARS[v >> 2];
        hang = (v & 3) << 4;
        break;
      case 1:
        s += CHARS[hang | v >> 4];
        hang = (v & 0xf) << 2;
        break;
      case 2:
        s += CHARS[hang | v >> 6];
        s += CHARS[v & 0x3f];
        hang = 0;
        break;
    }

  }
  if (l % 3) s += CHARS[hang];
  return s;
}

export function b64Decode(str: string) {
  let l = str.length, j = 0;
  let b = new Buffer(~~((l / 4) * 3)), hang = 0;

  for (let i = 0; i < l; i++) {
    let v = codeToIndex[str.charCodeAt(i)];

    switch (i % 4) {
      case 0:
        hang = v << 2;
        break;
      case 1:
        b[j++] = hang | v >> 4;
        hang = (v << 4) & 0xff;
        break;
      case 2:
        b[j++] = hang | v >> 2;
        hang = (v << 6) & 0xff;
        break;
      case 3:
        b[j++] = hang | v;
        break;
    }

  }
  return b;
}
