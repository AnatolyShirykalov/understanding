import { escapeRegExp, sortBy } from "lodash";
export const toOffsets = (text, ptrn, blacklist, obj = {}) => {
  const pt = new RegExp(escapeRegExp(ptrn), "g");
  const ret = [];
  let i = 0;
  let match;
  while ((match = pt.exec(text))) {
    i += 1;
    if (i > 1000000) throw new Error("iteration limit exceed");
    if (blacklist[i]) continue;
    ret.push({
      ...obj,
      start_offset: match.index,
      end_offset: match.index + ptrn.length
    });
  }
  return ret;
};

export const offsetsBuilder = (text, offsets) => args => {
  let ret = "";
  sortBy(offsets, "start_offset").forEach((offset, i, sorted) => {
    let m = args[offset.name];
    if (offset.arg_names) {
      m = m(...offset.arg_names.map(n => args[n]));
    }
    const prefix = text.slice(
      i === 0 ? 0 : sorted[i - 1].end_offset,
      offset.start_offset
    );
    ret += prefix + m;
    if (i + 1 < sorted.length) return;
    ret += text.slice(offset.end_offset);
  });
  return ret;
};
