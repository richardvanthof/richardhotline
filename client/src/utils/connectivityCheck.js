const isConnected = () => {
    require('dns').resolve('www.google.com', function(err) {
        if (err) {
           return true;
        } else {
           return false;
        }
    });
}

export default isConnected;
