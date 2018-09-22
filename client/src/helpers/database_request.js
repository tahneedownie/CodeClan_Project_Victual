const DatabaseRequest = function(url){
    this.url = url;
}

DatabaseRequest.prototype.get = function () {
    return fetch(this.url)
        .then((response) => response.json());
};

DatabaseRequest.prototype.post = function (payload) {
    return fetch(this.url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json());
};

DatabaseRequest.prototype.delete = function (id) {
    return fetch(`${this.url}/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json());
  };

  DatabaseRequest.prototype.deleteAll = function () {
      return fetch(this.url, {
          method: 'DELETE'
      })
      .then((response) => response.json());
  };
  
DatabaseRequest.prototype.put = function (payload, id) {
    return fetch(`${this.url}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json());
  };

module.exports = DatabaseRequest;