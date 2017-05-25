require('./firebaseapp.js');
var Firebase = require('firebase'),
    Keen = require('keen.io'),
    cacheRef = new Firebase('https://sixfactor-95332.firebaseio.com/keen/cache'),
    client = Keen.configure({
         projectId: '58e2939a95cfc9addc246ebe',
        writeKey: '00F039FB18DED50113DA4906886AA6FE89E9D9C907B250734A5B73AABB6EC7C8A4264222A10D8CED5C4FE4235A91F5988CF51A5D7FBA6DEB198D794F7EF8DB7C8D6AE6FE184EA47555EAEAFB92D308374B7FC0D0E11A128595F0FDD6D9385948',
        readKey: 'B2EDB9D1BE6C47FE2C4850CCFC4943315F8FD97BB05FFE08ADE1A92DE89A94E447419C92BEEDC5E22DFA94CB6D2EA5DC9221B2A2DE106C8D1D1F6AB5611BFF95A43E6BB803505167B6BE16A68240F1F3EE0CA7349D32482AD26D5DC06B84BCEF'
    }),
    checkInterval = 5000, // get new data from Keen.io every 5 seconds
    dataDelay = 20000, // allow 20 seconds of delay for data to start showing from Keen.io
    checkKeen = function() {
        var dateNow = new Date(),
            startDate = new Date(dateNow.getTime() - dataDelay),
            endDate = new Date(dateNow.getTime() - dataDelay + checkInterval),
            avgCostByGender = new Keen.Query('average', {
                eventCollection: 'Purchases',
                targetProperty: 'cost',
                groupBy: 'customer.gender',
                filters: [
                    {
                        property_name: 'keen.timestamp',
                        operator: 'gte',
                        property_value: startDate.toISOString()
                    },
                    {
                        property_name: 'keen.timestamp',
                        operator: 'lt',
                        property_value: endDate.toISOString()
                    }
                ]
            });

        client.run(avgCostByGender, function(err, res) {
            if (err) {
                console.log('error:', err);
                return;
            }

            cacheRef.child('avgCostByGender').push({
                payload: JSON.stringify(res),
                timestamp: parseInt(startDate.getTime() / 1000)
            });
        });

    };

checkKeen();

setInterval(checkKeen, checkInterval);