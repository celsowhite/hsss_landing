/**
 * Created by Skynet on 12/16/15.
 */

var Tracker = function (trackerName, trackerData) {
  this.name = trackerName;
  this.data = trackerData;
  this.setTrackerSession = function () { this.sessionId = storage.getItem('uuid')};
  this.setTrackerSession();
};

Tracker.prototype.sendData = (function () {
  this.executed = false;
  return function () {
    var packet = {
      name: this.name,
      data: this.data,
      sessionId: this.sessionId
    };
    if (!this.executed) {
      this.executed = true;
      $.ajax({
        type: "POST",
        url: "http://localhost:5000/api/datapoints/",
        data: packet,
        success: function() {
          console.log('called')
        },
        error: function () {
          console.log('fail')
        },
        dataType: 'json'
      });
    }
  };
})();

Tracker.prototype.getAllData = function() {
  return {
    data: this.data,
    name: this.name
  }
};

Tracker.prototype.updateData = function(data) {
  this.data = data;
};



//GUID GENERATION
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

// CHECK IF WE HAVE LOCAL STORAGE CAPABILITIES
var storage;
var fail;
var uid;
try {
  uid = new Date;
  (storage = window.localStorage).setItem(uid, uid);
  fail = storage.getItem(uid) != uid;
  storage.removeItem(uid);
  fail && (storage = false);
} catch (exception) {
}

if (storage) {
  // GET PREVIOUS
  var previousUuid = storage.getItem('uuid');
  //IF WE DONT HAVE PREVIOUS MAKE ONE
  if (!previousUuid) {
    var uuid = guid();
    console.log(uuid);
    storage.setItem('uuid', uuid);
  } else {
    console.log('has UUID', previousUuid)
  }
}
