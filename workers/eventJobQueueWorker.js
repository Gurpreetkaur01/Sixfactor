require('./firebaseapp.js');
var Firebase = require('firebase'),
    Keen = require('keen.io'),
    WorkQueue = require('./workqueue-advanced.js'),
    eventJobQueueRef = new Firebase('https://sixfactor-95332.firebaseio.com/keen/event-job-queue'),
    keenClient = Keen.configure({
        projectId: '58e2939a95cfc9addc246ebe',
        writeKey: '00F039FB18DED50113DA4906886AA6FE89E9D9C907B250734A5B73AABB6EC7C8A4264222A10D8CED5C4FE4235A91F5988CF51A5D7FBA6DEB198D794F7EF8DB7C8D6AE6FE184EA47555EAEAFB92D308374B7FC0D0E11A128595F0FDD6D9385948'
    });

function processQueue(data, whenFinished) {
    var eventName = data.eventName;

    data.keen = {timestamp: new Date(data.createdAt).toISOString()};

    // Remove data we don't want in Keen.io
    delete data.createdAt;
    delete data.eventName;
    delete data.status;
    delete data.statusChanged;

    keenClient.addEvent(eventName, data, function(err) {
        if (err) console.log('Error adding event to Keen.io', err);

        console.log('Event data record added to Keen.io')

        whenFinished();
    });
}

new WorkQueue(eventJobQueueRef, processQueue);

console.log('Listening for event data...');