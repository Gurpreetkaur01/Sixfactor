Firebase-keen is a system used for displaying data of the Firebase database using Epoch's real-time charts. 
The source code and tutorial are on github at https://github.com/markoshust/firebase-keen

For more info, please read the complete tutorial at https://www.airpair.com/firebase/posts/making-a-keenio-dashboard-realtime-by-integrating-it-with-firebase--d3js

Test out the real-time stream using following three Node.js command prompt commands:

•	eventJobQueueWorker module, Reading Firebase database and starting event job queue worker using Keen online streamer;

•	eventJobQueueGenerator module, creating new events;

•	keenCacheWorker, streaming data from Keen.io back into Firebase db.

Then the visualized data could be seen on the index.html page opened in the web browser.

To update  Firebase version to the latest one, do some modifications to resolve issues.
To resilve intialization issue create new file to do Firebase initialization, and modify index.html file.
then update Firebase properties  in the 'workers' modules.
then run all the node.js commands simultaneously to visualize data in real time.

To view the data in different real-time charts , index.html and dashboard.js files were modified.
