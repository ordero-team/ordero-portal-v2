export const getNextKey = (str: string | number) => {
  str = typeof str === 'number' ? String(str) : str;

  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const length = alphabet.length;
  let result = str;
  let i = str.length;

  while (i >= 0) {
    const last: any = str.charAt(--i);
    let next: any = '';
    let carry = false;

    if (isNaN(last)) {
      const index = alphabet.indexOf(last.toLowerCase());

      if (index === -1) {
        next = last;
        carry = true;
      } else {
        const isUpperCase = last === last.toUpperCase();
        next = alphabet.charAt((index + 1) % length);
        if (isUpperCase) {
          next = next.toUpperCase();
        }

        carry = index + 1 >= length;
        if (carry && i === 0) {
          const added = isUpperCase ? 'A' : 'a';
          result = added + next + result.slice(1);
          break;
        }
      }
    } else {
      next = +last + 1;
      if (next > 9) {
        next = 0;
        carry = true;
      }

      if (carry && i === 0) {
        result = '1' + next + result.slice(1);
        break;
      }
    }

    result = result.slice(0, i) + next + result.slice(i + 1);
    if (!carry) {
      break;
    }
  }

  return result;
};

export interface SyncCallback {
  (response: any): void;
}
