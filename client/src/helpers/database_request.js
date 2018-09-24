const DatabaseRequest = function (url) {
    this.url = url;
}

DatabaseRequest.prototype.get = function () {
    return fetch(this.url)
        .then((response) => response.json());
};

DatabaseRequest.prototype.getForDate = function (date) {
    return fetch(`${this.url}/${date}`)
        .then((response) => response.json());
};

DatabaseRequest.prototype.post = function (payload, date) {
    return fetch(`${this.url}/${date}`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json());
};

DatabaseRequest.prototype.delete = function (id, date) {
    return fetch(`${this.url}/${id}/${date}`, {
        method: 'DELETE'
    })
        .then((response) => response.json());
};

DatabaseRequest.prototype.deleteAll = function (date) {
    return fetch(`${this.url}/${date}`, {
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