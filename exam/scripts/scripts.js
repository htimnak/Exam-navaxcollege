let  dataTab ;
let request = new XMLHttpRequest();
request.onload =function (){
    let response = JSON.parse(this.response);
    const tabs = response.data;
    console.log(tabs);
    for (const key of Object.keys(tabs)) {
        dataTab = tabs[key];
        BuildContent();
        TabActive();
    }
}
request.open("Get","https://lms.navaxcollege.com/exam.php");
request.send();
///////////////////////////////////////////////////////////////////////////////
function  BuildContent(){
    dataTab.forEach((item,index) =>{
        buildButton(item,index);
        buildTabs(item,index);


    });
}
function buildButton(item,index){
    let Button = document.createElement("Button");
    Button.classList.add("tabs__button");
    Button.setAttribute("data-for-tab",index);
    const textNode = document.createTextNode(item.title.length > 8 ? item.title.substring(0,6) + "..." : item.title);
    Button.appendChild(textNode);
    document.getElementById('tabs__sidebar').appendChild(Button);
    console.log(Button);
    console.log(item.title);
    if(item.is_active === true){
        Button.classList.add("tabs__button--active");
    }
}
function buildTabs(item,index){
    let tabContent = document.createElement("div");
    tabContent.classList.add("tabs__content");
    tabContent.setAttribute("data-tab",index);
    let MtabContent = document.createElement("div");
    MtabContent.classList.add("row");
    tabContent.appendChild(MtabContent);
    item.body.forEach(text => {
        let contentPiece = document.createElement("div");
        contentPiece.classList.add("col-12");
        contentPiece.classList.add("col-md");
        contentPiece.classList.add("py-3");
        contentPiece.innerText = text;
        MtabContent.appendChild(contentPiece);
    })
    document.getElementById('tabs').appendChild(tabContent);
    if(item.is_active === true){
        tabContent.classList.add("tabs__content--active");
    }

}
function TabActive(){
    const tabsButton = document.querySelectorAll(`.tabs__button`);
    tabsButton.forEach(Button=>{
        Button.addEventListener("click", ()=>{
            const Sidebar = Button.parentElement;
            const tabContainer = Sidebar.parentElement;
            const  tabNumber = Button.dataset.forTab;
            const tabToActive = tabContainer.querySelector(`.tabs__content[data-tab="${tabNumber}"]`);
            Sidebar.querySelectorAll(`.tabs__button`).forEach(button =>{
                button.classList.remove("tabs__button--active");
            });
            tabContainer.querySelectorAll(`.tabs__content`).forEach(tab=>{
                tab.classList.remove("tabs__content--active");
            });
            Button.classList.add("tabs__button--active");
            tabToActive.classList.add("tabs__content--active");
        });

    });
}
