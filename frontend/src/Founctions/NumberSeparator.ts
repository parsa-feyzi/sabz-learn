export const numberSeparator = (num: number): string => {
  let mainNum = num.toString();
  let exportNum:(string[] | string) = [];
  
  mainNum.length <= 3 && (exportNum = mainNum)

  while (mainNum.length > 3) {
    const lastFigures = mainNum.slice(mainNum.length - 3, mainNum.length);
    (exportNum as string[]).unshift(lastFigures);

    mainNum = mainNum.slice(0, mainNum.length - 3);
    mainNum.length <= 3 && (exportNum as string[]).unshift(mainNum);
  }

  return exportNum.toString();
}
