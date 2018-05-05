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

const resolveName = (offset, all_offsets, args) => {
  const offsets = sortBy(
    all_offsets.filter(off => {
      return (
        off.start_offset >= offset.start_offset &&
        off.end_offset <= offset.end_offset
      );
    }),
    "start_offset"
  );
  let m = args[offset.name];
  if (offset.arg_names) {
    const arg_offsets = offsets.filter(off =>
      offset.arg_names.find(n => n === off.name)
    );
    m = m(...arg_offsets.map(off => resolveName(off, offsets, args)));
  }
  return m;
};

export const offsetsBuilder = (text, offsets) => args => {
  try {
    let ret = "";
    sortBy(offsets.filter(offset => !offset.ignore), "start_offset").forEach(
      (offset, i, sorted) => {
        const m = resolveName(offset, offsets, args);
        const prefix = text.slice(
          i === 0 ? 0 : sorted[i - 1].end_offset,
          offset.start_offset
        );
        ret += prefix + m;
        if (i + 1 < sorted.length) return;
        ret += text.slice(offset.end_offset);
      }
    );
    return ret === "" ? text : ret;
  } catch (error) {
    console.log(text, offsets, args);
    console.error(error);
  }
};

export const selects = {
  vector: [
    { name: "overline", func: arg => `\\overline{${arg}}` },
    { name: "vec", func: arg => `\\vec{${arg}}` },
    { name: "boldsymbol", func: arg => `\\boldsymbol{${arg}}` }
  ],
  diff: [
    { name: "italic frac", func: (f, x) => `\\frac{d ${f}}{ d ${x}}` },
    {
      name: "roman frac",
      func: (f, x) => `\\frac{\\mathrm{d} ${f}}{\\mathrm{d} ${x}}`
    },
    {
      name: "partial subscript",
      func: (f, x) => `\\partial_{${x}} ${f}`
    },
    {
      name: "comma",
      func: (f, x) => `${f}{}_{,${x}}`
    }
  ]
};
