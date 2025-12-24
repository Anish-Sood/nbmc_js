async function createAndDownloadZip(notificationData) {
    const zip = new JSZip();
    let downloadCount = 0;
    const filenameSet = new Set();
    
    for(const notification of notificationData){
        try {
            const response = await fetch("https://dsa.punjab.gov.in/egazette/api/Final/Output_Copy",{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "Request_Id": `${notification.id}`
                })
            })
            
            console.log(notification.id)
            const result = await response.json();
            
            if(result.response === 1 && result.data && result.data[0].Output_File){
                const base64Data = result.data[0].Output_File;
                const binaryString = atob(base64Data);
                const bytes = new Uint8Array(binaryString.length);
                    
                for(let i = 0; i < binaryString.length; i++){
                    bytes[i] = binaryString.charCodeAt(i);
                }
                
                // Handle duplicate filenames
                let filename = `${notification.gazette_date}_${notification.title}_${notification.id}.pdf`;
                let counter = 1;
                
                while(filenameSet.has(filename)){
                    filename = `${notification.gazette_date}_${notification.title}_${notification.id}_${counter}.pdf`;
                    counter++;
                }
                
                filenameSet.add(filename);
                zip.file(filename, bytes);
                downloadCount++;
                    
                console.log(`added: ${filename}`);
            }
        } catch(error) {
            console.error(`Error processing ${notification.id}:`, error);
        }
    }
    
    if(downloadCount > 0){
        zip.generateAsync({type: 'blob'}).then((blob)=>{
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `notifications_${new Date().getTime()}.zip`;
            link.click();
            URL.revokeObjectURL(url);
        });
    } else {
        alert('No PDFs downloaded');
    }
}