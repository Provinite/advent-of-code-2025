const DEBUG = false;

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
  return Number(resultIndexes.map(input).join(""));
}
