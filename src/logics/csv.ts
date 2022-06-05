// Converts a table of strings to a csv-formatted string and downloads it.
// Doesn't handle cells containing commas.
export function downloadCsv(data: string[][]): void {
  let csv = "data:text/csv;charset=utf-8,";
  data.forEach((row) => {
    csv += row.join(",") + "\n";
  });
  window.open(encodeURI(csv), "_blank");
}
