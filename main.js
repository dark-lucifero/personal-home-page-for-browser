const searchContainer = document.querySelector('.searchContainer');

searchContainer.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = e.target[0].value
    
    const url = `https://www.google.com/search?q=${inputValue}&oq=${inputValue}&gs_lcrp=EgZjaHJvbWUqDAgAECMYJxiABBiKBTIMCAAQIxgnGIAEGIoFMgoIARAuGLEDGIAEMgoIAhAuGLEDGIAEMgoIAxAuGLEDGIAEMg0IBBAuGIMBGLEDGIAEMg0IBRAuGMcBGNEDGIAEMgoIBhAAGLEDGIAEMgcIBxAAGIAEMgcICBAuGIAEMgcICRAAGIAEMgcIChAuGIAEMgcICxAAGIAEMgcIDBAuGIAEMgcIDRAuGIAEMgcIDhAAGIAE0gEHODYxajBqMagCALACAA&sourceid=chrome-mobile&ie=UTF-8&hl=en`
    window.open(url)
})


const commonUsedContainer = document.querySelector('.commonUsed-container');


function getUrls() {
  const urls = JSON.parse(localStorage.getItem('urls')) || [];
   
   let html = ""; 
   
    urls.forEach((urlString) => {
        const url = new URL(urlString)
        const websiteName = url.host.replace(/\.\w+$/i, '').replace(/^www\./, "");
        
        
        
        html += `
        <div class="commonUsed" data-url='${urlString}'>
            <img src="https://logo.clearbit.com/${url.hostname}" class="logo">
            <div class="name">${websiteName}</div>
        </div>`
        
    })
    
    html += addButton();
    commonUsedContainer.innerHTML = html
    
}

getUrls()

const addButtonHtml = document.querySelector('.addButton');
const dialog = document.querySelector('.addCommonUsedDailog');

addButtonHtml.addEventListener('click', () => {
    dialog.showModal();
})


const closeDialog = document.querySelector('.closeDialog');

closeDialog.addEventListener('click', () => {
    dialog.close()
});


const addUrls = document.querySelector('.addUrls');


addUrls.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = e.target[0].value;
    
    const urls = JSON.parse(localStorage.getItem('urls')) || [];
    urls.push(inputValue);
    
    localStorage.setItem("urls", JSON.stringify(urls));
    dialog.close()
});



function addButton() {
     const html = `
        <div class="addButton commonUsed" >
            <svg xmlns="http://www.w3.org/2000/svg" class="logo" viewBox="0 0 512 512"><path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 112v288M400 256H112"/></svg>
            <div class="name">addUrl</div>
        </div>`
    return html;
}



if (commonUsedContainer.children.length % 2 !== 0) {
    commonUsedContainer.classList.add('odd-children');
}
