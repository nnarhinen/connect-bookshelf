var debug = require('debug')('connect:bookshelf');

module.exports = function(session) {

  var Store = session.Store;

  function BookshelfStore(opts) {
    opts = opts || {};

    Store.call(this, opts);

    this.model = opts.model;
  }

  BookshelfStore.prototype.__proto__ = Store.prototype;

  BookshelfStore.prototype.get = function(sid, cb) {
    debug('fetching session with sid "%s"', sid);
    this.model.forge({sid: sid}).fetch().then(function(model) {
      try {
        cb(null, model && JSON.parse(model.get('data')));
      } catch (err) {
        cb(err);
      }
    }).catch(cb);
  };


  BookshelfStore.prototype.set = function(sid, session, cb) {
    var model = this.model.forge({sid: sid});
    model.fetch().then(function(existing) {
      model = existing || model;
      model.set('data', JSON.stringify(session));
      return model.save().then(function() {
        cb();
      });
    }).catch(cb);
  };

  BookshelfStore.prototype.destroy = function(sid, cb) {
    this.model.query().where({sid: sid}).del().then(function() { cb && cb(); }).catch(cb);
  };

  return BookshelfStore;

};

