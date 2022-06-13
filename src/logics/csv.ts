// Converts a table of strings to a csv-formatted string and downloads it.
// If useSemicolon is set to true then separates the cells using a semicolon instead
// of a comma.
// Doesn't handle cells containing commas or semicolons.
export function downloadCsv(data: string[][], useSemicolon: boolean = false): void {
  let csv = "data:text/csv;charset=utf-8,";
  data.forEach((row) => {
    csv += row.join(useSemicolon ? ";" : ",") + "\n";
  });
  window.open(encodeURI(csv), "_blank");
}
