function myFunction() {
  let fileId = "1yxtcZjfzkH31lKNPHXzfF5t61V4XtLCIezuO1OZTMrA";
  let fileObject = DriveApp.getFileById(fileId);
}

function createFileNames(n, startingDate) {
  // this is where we will push all the filenames to
  // and the function will return this array
  let outputArray = [];

  // first we turn our string into a javascript Date object
  // and we make a second one for 4 days after
  let dateObj = new Date(startingDate);
  let dateObj2 = new Date(startingDate);

  // this adds 4 to the date obj
  dateObj2.setDate(dateObj2.getDate() + 4);

  // this loops n number of times
  for (let i = 0; i < n; i++) {
    // this is a template string that basically formats the two date objs in
    // MM-DD > MM2-DD2
    let filename = `${String(dateObj.getMonth()+1).padStart(2,'0')}-${String(dateObj.getDate()).padStart(2,'0')} > ${String(dateObj2.getMonth()+1).padStart(2,'0')}-${String(dateObj2.getDate()).padStart(2,'0')}`;

    // then we append it to the outputArray
    outputArray.push(filename);

    // and we add 7 days to each date object
    dateObj.setDate(dateObj.getDate() + 7);
    dateObj2.setDate(dateObj2.getDate() + 7);
  }

  return outputArray;
}