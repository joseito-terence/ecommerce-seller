const searchTableAndFilter = searchKey => {
  const table = document.querySelector('table');
  const rows = table.tBodies[0].childNodes;         // get only the rows from the tbody.

  rows.forEach(row => {
    let td_string = Array.from(row.cells).map(td => td.innerText).join(' ').toLowerCase();

    // row.style.display = td_string.indexOf(searchKey) === -1 ? 'none' : 'block';
    if(td_string.indexOf(searchKey) === -1)
      row.classList.add('d-none');
    else
      row.classList.remove('d-none');
  })
}

export default searchTableAndFilter;
