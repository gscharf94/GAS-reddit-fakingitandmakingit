# GAS-reddit-fakingitandmakingit

Ok, so here is the prompt that reddit user /u/fakingitandmakingit requested help with

>About three times a year, I need to duplicate a master GSheet 18 times and rename each new sheet for a span of time. After doing it today, it occured to me it might be possible to do this via app script.

>The naming scheme goes like this:

>>08-17 > 08-21

>>08-24 > 08-28

>>08-31 > 09-04

>>etc.

>I don't mind having to create a reference sheet which pulls the file names, that's easy enough to do in a sheet, but the duplicating and renaming is the tedious part.

>In addition to being able to duplicate it, I would like the script to either prompt how many times to duplicate the file, or duplicate it as many times as I have in the name reference.

>I hope this makes sense, and, while I'm very comfortable with google sheet formulas, appscript is pretty new to me. Any help will help point me in the right direction.

>Lemme know if any more details are needed

---------

So from what I understand, he has a file that he wants to copy n amount of times and each filename will be a ```date -> date + 4 format```, increasing by a week.

So the first step we will do is we need the file ID for the file that is going to be duplicated. To find the file ID for a file, we can go to that file in drive and then look at the URL.

I have created a file for this demonstration. Here is where you can find the URL

![Image1](/images/1.png)

Now that we have a file ID we can associate a variable with it in our Code.gs and then do things to it (like copy it a bunch of time, for example)

```javascript
function myFunction() {
  const fileId = "1yxtcZjfzkH31lKNPHXzfF5t61V4XtLCIezuO1OZTMrA";
}
```

In order to work with files, we need to first call the ```DriveApp``` class and then run the ```.getFileById()``` method.

```javascript
function myFunction() {
  const fileId = "1yxtcZjfzkH31lKNPHXzfF5t61V4XtLCIezuO1OZTMrA";
  let fileObject = DriveApp.getFileById(fileId);
}
```

Now before we continue, we should run the function by going to the Google script editor and going to Run -> Run Function -> myFunction. We should do this now because it's going to ask us for permissions and we'll have to click through a prompt telling Google that yes, dad. It's ok for my own script to edit my own files.

![Image2](/images/2.png)

![Image3](/images/3.png)

Choose the appropriate account (whichever the file is stored on) and then clicked advanced to give permissions

![Image4](/images/4.png)

Give it access and now our script will be able to do it's job.

-------

Ok, now let's create a function that returns n number of file names. This function will take an input n, and a string in the format 'MM-DD-YYYY' that will define the starting date. Then it will output an array with a list of filenames in the format that our friend /u/fakingitandmakingit specified

```javascript
function createFileNames(n, startingDate) {
  // this is where we will push all the filenames to
  // and the function will return this array
  let outputArray = [];

  // first we turn our string into a javascript Date object
  // and we make a second one for 4 days after
  let dateObj = new Date(startingDate);
  let dateObj2 = new Date(startingDate);

  // this adds 4 days to the date obj
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
```

So now we just have to call the function ```createFileNames()``` with how many files we want to copy and then what is the starting date, in 'MM-DD-YYYY' format and it will output an array for us. That was the hardest part, we are almost done.

-----

Now we will edit our ```myFunction()```
```javascript
function myFunction() {
  const numberOfFiles = 10; // Change this here to change how many files get copied
  const startingDate = '08-30-2020'; // Change this here to control the starting date

  const fileId = "1yxtcZjfzkH31lKNPHXzfF5t61V4XtLCIezuO1OZTMrA";
  let fileObject = DriveApp.getFileById(fileId);

  // we get the array of filenames from our previous function
  let filenames = createFileNames(numberOfFiles, startingDate);

  // we loop through the array
  for (const filename of filenames) {
    // and we make the copies with the appropriate filename
    fileObject.makeCopy(filename);
  }

}
```

You may have to give the script more permissions, but you just go back to the script editor and run ```myFunction()``` and it will copy it based on the constants you set (```numberOfFiles``` & ```startingDate```)

![Image5](/images/5.png)


If you wanna copy the code, open the "Code.js" file up on the top of this page and just copy that text into your script editor. Make sure you change the fileId, numberOfFiles, and startingDate variables.