var journal = [];
function addEntry(events, didITurnIntoASquirrel){
    journal.push({events: events, squirrel: didITurnIntoASquirrel});
}

function phi(table){
    return (table[3]*table[0]-table[1]*table[2])/
        (Math.sqrt((table[2]+table[3])*
                   (table[0]+table[1])*
                   (table[1]+table[3])*
                   (table[0]+table[2])));
}

function hasEvent(event, entry){
    return entry.events.indexOf(event) != -1;
}

function tableFor(event, journal){
    var table = [0,0,0,0];
    for (var i=0; i<journal.length; i++){
        var entry = journal[i], index = 0;
        if (hasEvent(event,entry)) index += 1;
        if (entry.squirrel) index += 2;
        table[index] += 1;
    }
    return table;
}

function gatherCorrelation(journal){
    var phis = {};
    for (var entry = 0; entry <journal.length; entry++){
        var events = journal[entry].events;
        for (var i=0; i < events.length; i++){
            var event = events[i];
            if (!(event in phis))
                phis[event] = phi(tableFor(event, journal));
        }
    }
    return phis;
}

var correlations = gatherCorrelation(JOURNAL);
for (var event in correlations){
    if (correlations[event]>0.1 || correlations[event]<-0.1)
        console.log(event + ' : ' + correlations[event]);
}
