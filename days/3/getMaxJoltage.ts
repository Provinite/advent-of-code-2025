const DEBUG = true;

export function getMaxJoltage(inputs: string, switchCount: number): number {
  let resultIndexes: number[] = [];
  const input = (idx: number) => Number(inputs[idx]);
  const output = (idx: number) =>
    typeof resultIndexes[idx] === "number"
      ? input(resultIndexes[idx])
      : undefined;
  for (let i = 0; i < inputs.length; i++) {
    const minCandidateIdx = Math.max(0, i - (inputs.length - switchCount));
    for (
      let candidateIdx = minCandidateIdx;
      candidateIdx < switchCount;
      candidateIdx++
    ) {
      if (input(i) > (output(candidateIdx) ?? -1)) {
        resultIndexes[candidateIdx] = i;
        resultIndexes.length = candidateIdx + 1;
        break;
      }
    }
  }
  let inputStr = "";
  let caretStr = " ".repeat(inputs.length);
  let bold = (str: string) => `\x1b[1m${str}\x1b[0m`;
  for (let i = 0; i < inputs.length; i++) {
    if (resultIndexes.includes(i)) {
      inputStr += bold(inputs[i]!);
      caretStr = caretStr.substring(0, i) + "^" + caretStr.substring(i + 1);
    } else {
      inputStr += inputs[i];
    }
  }
  const res = Number(resultIndexes.map(input).join(""));
  if (DEBUG) {
    console.log(inputStr + ` => ${res}`);
    console.log(caretStr);
  }
  return res;
}
