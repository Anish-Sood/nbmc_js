let departmentData=[]
let notificationData=[]
const departmentName=document.getElementById('departmentName')
const departmentForm=document.getElementById('departmentForm')


document.addEventListener('DOMContentLoaded', (e)=>{
    fetchdepartment();
    document.getElementById('GazetteType').parentElement.style.display = 'none';
})

async function fetchdepartment(){
    try{
        const response = await fetch('https://dsa.punjab.gov.in/egazette/api/Department/DepartmentList')
        if (!response.ok) throw new Error('Failed to fetch departments');
        const result =await response.json();
    
        if(result.response===1 &&result.data){
            departmentData=result.data;

        const select = document.getElementById('departmentName');
            
        departmentData.forEach(department => {
            const option = document.createElement('option');
            option.value = department.Dept_Id;
            option.textContent = department.Dept_Name;  
            select.appendChild(option);
        });
    }
    } catch(error){
        console.error('Error:', error);
        alert('Could not load departments. Please check your connection.');
    }
}

departmentName.addEventListener('change',(e)=>{
    const prevdiv=document.getElementById('notificationMessage')
    if(prevdiv)
        prevdiv.remove();
    const prevButton = document.getElementById('downloadbutton');
    if(prevButton) 
        prevButton.remove();

    const gazette_parent = document.getElementById('GazetteType').parentElement
    console.log(gazette_parent)
    if(e.target.value){
        gazette_parent.style.display='block'
    }
})

departmentForm.addEventListener('submit',async (e)=>{
    e.preventDefault();

    const prevdiv=document.getElementById('notificationMessage')
    if(prevdiv)
        prevdiv.remove();
    const prevButton = document.getElementById('downloadbutton');
    if(prevButton) 
        prevButton.remove();

    const newdiv=document.createElement('div')
    newdiv.id="notificationMessage"

    const total_notifications = await fetchnotifications();
    if (!total_notifications){
        newdiv.textContent=`No notifications present`
        document.body.appendChild(newdiv);
    }
    else{
        newdiv.textContent=`${total_notifications} notifications fetched successfully`
        document.body.appendChild(newdiv);
        downloadnotifications();
    }
})

async function fetchnotifications(){
    const deptId=document.getElementById('departmentName').value;
    const startDate = document.getElementById('startDate').value;
    let endDate = document.getElementById('endDate').value;

    if(!endDate){
        endDate=new Date().toISOString().substring(0,10)
    }

    try{
        const response=await fetch('https://dsa.punjab.gov.in/egazette/api/Final/FinalFilter',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Dept_Id': deptId
        },
        body : JSON.stringify({
            'Dept_Id': deptId,
            fromdate: startDate,
            todate: endDate
        })
    })
    const result = await response.json();
    // console.log('Notifications:', result);
    if(result.response === 1 && result.data){
        notificationData = result.data.map(notification => ({
            id: notification.Request_Id,
            gazette_date: notification.Gazette_Date.substring(0, 10).replace(/\//g,'_'),
            title: notification.Notification_Title.substring(0, 80)
        }));
    }

    // console.log(notificationData)

    const total_notifications=result.data.length;
    return total_notifications;
    } catch (error) {
        console.log(`error: `,error)
    }
}

function downloadnotifications(){
    const newbutton=document.createElement('button')
    newbutton.id="downloadbutton";
    newbutton.textContent="Download Notifications"
    document.body.appendChild(newbutton);
    
    newbutton.addEventListener('click',async (e)=>{
        const zip = new JSZip();
        let downloadCount=0;
        for(const notification of notificationData){
            const response=await fetch("https://dsa.punjab.gov.in/egazette/api/Final/Output_Copy",{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "Request_Id": `${notification.id}`
                })
            })
            console.log(notification.id)
            const result=await response.json();
            if(result.response === 1 && result.data && result.data[0].Output_File){
                const base64Data = result.data[0].Output_File;
                const binaryString = atob(base64Data);
                const bytes = new Uint8Array(binaryString.length);
                    
                for(let i = 0; i < binaryString.length; i++){
                    bytes[i] = binaryString.charCodeAt(i);
                }
                // binarystring= "ABC"
                // charCodeAt:   65, 66, 67
                // bytes array:  [65, 66, 67]      
                // file to zip
                // console.log(`${notification.gazette_date}`)
                const filename = `${notification.gazette_date}_${notification.title}_${notification.id}.pdf`;
                zip.file(filename, bytes);
                downloadCount++;
                    
                console.log(`added: ${filename}`);
            }
        }
        if(downloadCount > 0){
            zip.generateAsync({type: 'blob'}).then((blob)=>{
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `notifications_${new Date().toLocaleTimeString()}.zip`;
                link.click();
                URL.revokeObjectURL(url);
            });
        } else {
            alert('No PDFs downloaded');
        }
    })
}