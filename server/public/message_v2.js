import { alerter } from './index';

// New Message
  class Message {

    constructor() {
        console.log("Collecting data");
        this.clientID = "1";
        this.recipient = "Richard";
        this.docRef = db.doc("Users/" + this.recipient + "/Messages/" + this.autoID(10) );
        console.log(this.docRef);

        this.name = this.value('#name');
        this.message = this.value('#message');
        this.email = this.value('#email');
        this.phone = this.value('#phone');
        this.date = new Date();
        this.completed = false;

        this.state = {
            notifications: [],
        }

        //React Bindings
        this.handleChange = this.handleChange.bind(this);
        
        this.send();
    }
    
    autoID(length) {
        console.log("Generating autoID")
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let autoId = '';
        for (let i = 0; i < length; i++) {
            autoId += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        console.log(autoId);
        return autoId;
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    addNotif(type, message) {
        const notifications = this.state.notifications;
        const newNotif = {
            type,
            message,
        }
        const newNotificationState = notifications.unshift(newNotif);
        this.setState({
            notifications: newNotificationState,
        });
    }

    getNotifications() {
        return this.state.notifications.map(notif => (
            <div className={`notification ${notif.type}`}>{notif.message}</div>
        ));
    }

    value(element){
        console.log("Parsing form data")
        return document.querySelector(element).value;
    }

    send() {
        console.log("Sending message")
        this.docRef.set({
            name: this.name,
            message: this.message,
            email: this.email,
            phone: this.phone,
            date: this.date,
            clientID: this.clientID
        }).then(function() {
            console.log("Document successfully written!");
            alerter(true);
        }).catch(function(error){
            console.error("Error writing document: " + error);
            alerter(false);
        })
    }

    handleSend() {
        this.docRef.set({
            name: this.state.name,
        }).then(() => {
            this.addNotif('success', 'Sent successfully');
        }).catch(err => {
            this.addNotif('error', 'We did an oopsie whoopsie:'+err);
        })
    }

    render() {
        return (
            <div>
                {addNotif()}
                <form>
                    <input type="text" name="email" onChange={handleChange} value={this.state.email}/>
                    <input type="submit" onClick={handleSend}/>
                </form>
            </div>
        )
    }
  
}
