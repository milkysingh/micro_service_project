interface varaintInf {
  fluoride_mint: Number;
  fluoride_juniper: Number;
  natural_mint: Number;
  natural_juniper: Number;
}
interface colorInf {
  black: varaintInf;
  white: varaintInf;
  rose: varaintInf;
}
const variantsConfig: colorInf = {
  black: {
    fluoride_mint: 1,
    fluoride_juniper: 2,
    natural_mint: 3,
    natural_juniper: 4,
  },
  white: {
    fluoride_mint: 1,
    fluoride_juniper: 2,
    natural_mint: 3,
    natural_juniper: 4,
  },
  rose: {
    fluoride_mint: 1,
    fluoride_juniper: 2,
    natural_mint: 3,
    natural_juniper: 4,
  },
};
let colorSelected: 'black' | 'white' | 'rose' = 'black';
let varaintSelected: string = 'fluoride_mint';
console.log(variantsConfig[colorSelected]);
// console.log(variantsConfig[colorSelected]);
