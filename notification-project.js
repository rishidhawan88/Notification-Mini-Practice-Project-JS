
const arr= JSON.parse(localStorage.getItem('arr'))||[];

const notificationCount= JSON.parse(localStorage.getItem('count'))||
{
    count: 0
}

let notificationDisplay=false;



function addNotification(){
    const tempObject={
        string : document.querySelector('.notification-input-box').value,
        read: false
    };
    arr.push(tempObject);
    
    updateNotificationCount();
    displayNotification();
    updateNotificationToLocalStorage();
    setPlaceholder();



}

function updateNotificationCount(){
    let tempCount=0;

    for(let i=0;i<arr.length;i++){
        if(arr[i].read===false)
        tempCount++;
    }

    notificationCount.count=tempCount;

    document.querySelector('.notification-button').innerHTML=notificationCount.count;
    localStorage.setItem('count',JSON.stringify(notificationCount));

}
function notificationButtonToggle(){
    if(notificationDisplay===false){
        notificationDisplay=true;
        displayNotification();
    }
    else{
        notificationDisplay=false;
        document.querySelector('.notification-display').innerHTML="";
    }

    
}



function displayNotification(){
    if(notificationDisplay==true){

        let str="";
        for(let i=0;i<arr.length;i++){
            
            let tempString=arr[i].read===false?'Mark as read':'Unread';
            str=str + `<p>${arr[i].string} </p> 
                        <button onclick="markAsRead(${i});
                        ">${tempString}</button>
                        <button onclick="deleteNotification(${i});
                        ">Remove</button>`;
        }
        document.querySelector('.notification-display').innerHTML=str;
    }
    
    

}

function markAsRead(index){
    arr[index].read=arr[index].read==true?false:true;
    updateNotificationCount();
    displayNotification()
    updateNotificationToLocalStorage();
 
}

function deleteNotification(index){
    arr.splice(index,1);
    updateNotificationCount();
    displayNotification()
    updateNotificationToLocalStorage();
    
}

function updateNotificationToLocalStorage(){
    localStorage.setItem('arr',JSON.stringify(arr));
}

function setPlaceholder(){
    let temp='Enter the notification here';
    console.log('placeholder function called');
    console.log( document.querySelector('.notification-input-box'));
    document.querySelector('.notification-input-box').value='';
    document.querySelector('.notification-input-box').setAttribute("placeholder",temp);
}