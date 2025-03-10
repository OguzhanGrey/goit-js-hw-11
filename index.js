import{S as f,i as p}from"./assets/vendor-5ObWk2rO.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const n of e.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function i(t){if(t.ep)return;t.ep=!0;const e=o(t);fetch(t.href,e)}})();const m=document.querySelector("#button"),a=document.querySelector("#input"),c=document.querySelector(".gallery"),y="49258483-ada97ff0ca07db67d4b766dd0",u=document.querySelector(".loader");let d=1,l;m.addEventListener("click",()=>{u.style.display="block";const s=a.value.trim();if(s==="")return;c.innerHTML="";const r=`https://pixabay.com/api/?key=${y}&q=${encodeURIComponent(s)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${d}`;fetch(r).then(o=>{if(!o.ok)throw new Error("Sorry, there are no images matching your search query. Please try again!");return o.json()}).then(o=>{u.style.display="none";const i=o.hits;if(i.length===0)throw new Error("Sorry, there are no images matching your search query. Please try again!");const t=i.map(e=>`<li class="gallery-item">
          <div class="photo-cards">
            <ul class="photo-information">
            <li class="photo-information-list"><b>Likes:</b>  ${e.likes}</li>
            <li class="photo-information-list"><b>Views:</b>  ${e.views}</li>
            <li class="photo-information-list"><b>Comments:</b> ${e.comments}</li>
            <li class="photo-information-list"><b>Downloads:</b> ${e.downloads}</li>
            </ul>
          </div>
        <a class="gallery-link" href="${e.largeImageURL}">
            <img
                 class="gallery-image"
                 src="${e.webformatURL}"
                data-source="${e.largeImageURL}"
               alt="${e.tags}"
            />
        </a>
     </li>`).join("");c.innerHTML=t,d++,a.value="",l?l.refresh():l=new f(".gallery a",{captionDelay:250,captionsData:"alt"})}).catch(o=>p.error({title:"Error",message:o.message,position:"topRight",timeout:5e3}))});
//# sourceMappingURL=index.js.map
