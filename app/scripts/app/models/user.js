ShareDrop.App.User = ShareDrop.App.Peer.extend({
    label: function () {
        var email = this.get('email'),
            local_ip = this.get('local_ip'),
            label;

        if (email && local_ip) {
            label = email + ' (' + local_ip + ')';
        } else if (local_ip) {
            label = local_ip;
        } else if (email) {
            label = email;
        } else {
            label = null;
        }

        return label;
    }.property('email', 'local_ip'),

    serialize: function () {
        return {
            uuid: this.get('uuid'),
            email: this.get('email'),
            public_ip: this.get('public_ip'),
            local_ip: this.get('local_ip'),
            peer: {
                id: this.get('peer.id')
            }
        };
    },

    // Make user's email available after page reload,
    // by storing it in local storage.
    userEmailDidChange: function () {
        var email = this.get('email');

        if (email) {
            localStorage.email = email;
        } else {
            localStorage.removeItem('email');
        }
    }.observes('email')
});
