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

![Image1](/images/1.png)

