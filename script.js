//7c2f86f88c4549e4995f633fddd0c25a

const API_KEY="7c2f86f88c4549e4995f633fddd0c25a";
const url="https://newsapi.org/v2/everything?q=";


//by default the news related to india will be fetched
window.addEventListener('load',()=>{
    fetchNews("india")
})

async function fetchNews(query){
    const result=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await result.json();
    console.log(data);
    collectData(data.articles);
}

function collectData(articles){
    const cards_Container=document.querySelector("#cards-container");
    console.log(cards_Container);
    const news_tempate=document.querySelector("#template-news-card");
    //This statement will clear the previous fetched ttemplates
    cards_Container.innerHTML='';
    articles.forEach((article)=> {
        //This will help to filter all those fetched data that donot contain any imag url
        if(!article.urlToImage)  return;
        //deep cloning i.e each div inside it will be clone recursively
        const card_clone=news_tempate.content.cloneNode(true);
        //console.log(card_clone);
        fillDataInCard(card_clone,article);
        cards_Container.appendChild(card_clone);
    
    });
}

function fillDataInCard(card_clone,article){
    const newsImg=card_clone.querySelector('.news-img');
    const newsTitle=card_clone.querySelector('#news-title');
    const newsSource=card_clone.querySelector('#news-source');
    const newsDesc=card_clone.querySelector('#news-desc');
    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    newsSource.innerHTML = `${article.source.name} · ${date}`;

    card_clone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
    //if anybody click on the the img

  card_clone.firstElementChild.addEventListener('click',()=>{
    window.open(article.url,"_blank");
  })
}
//diffrent call form the nav bar 
let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

//search button handle search
const searchBtn=document.querySelector("#search-button");
const searchTxt=document.querySelector("#search-text");
searchBtn.addEventListener('click',()=>{
    const query =searchTxt.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
})
//dark mode button
let btn = document.querySelector("#mode");
let mode = "light-mode";
let originalNavColor; // Variable to store the original navigation bar color
let originalFont;
btn.addEventListener("click", () => {
    if (mode == "light-mode") {
        mode = "dark-mode";
        document.querySelector("body").style.backgroundColor = "black";
        document.querySelector("body").style.color="black";
        originalNavColor = document.querySelector("nav").style.backgroundColor;
        originalFont = document.querySelector("nav").style.color;
        // Store original navigation bar color
        document.querySelector("nav").style.backgroundColor = "black";
        document.querySelector("nav").style.color = "white";
 

    } else {
        mode = "light-mode";
        document.querySelector("body").style.backgroundColor = "white";
        document.querySelector("nav").style.backgroundColor = originalNavColor;
        document.querySelector("body").style.color=originalFont;
        // Restore original navigation bar color
        document.querySelector("nav").style.color = "#1e7e3b"; 
      
    }
});
