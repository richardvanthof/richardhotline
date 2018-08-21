// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
};
db.settings(settings);

var id = (element) => {
    return document.getElementById( element );
}

export const alerter = completed => {
    if( completed ){
        alert("message sent!")
    } else {
        alert("whoops, something went wrong")
    }
}


  // Event Listeners

  // SUBMIT BUTTON
  let submitBtn = id( 'submit' );
  
  submitBtn.addEventListener("click", async function(){
    console.log("Submit triggered");
    
    let m = new Message();
    // let completed = await m.send();
    // if( m.completed ){
    //     alert("message sent!")
    // } else {
    //     alert("whoops, something went wrong")
    // }
  });

