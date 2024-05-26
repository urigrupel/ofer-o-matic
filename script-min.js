async function copyToClipboard(t){text=document.getElementById(t).textContent;try{await navigator.clipboard.writeText(text),showTooltip("Copied",document.getElementById(t))}catch(t){}}function getAdvice(){document.getElementById("bet-result").classList.remove("hidden")}function getNumbers(){let t=range(1,37),e=range(1,7),n=[];for(let o=0;o<6;o++){const o=randInt(0,t.length),i=t.splice(o,1)[0];n.push(i),o<e.length&&e.splice(o,1)}const o=randInt(0,e.length),i=e.splice(o,1)[0];document.getElementById("lottory-numbers").textContent=n.join(", ").concat(`, (${i})`),copyToClipboard("lottory-numbers")}function range(t,e,n=1){return Array.from({length:(e-t)/n+1},((e,o)=>t+o*n))}function randInt(t,e){return diff=e-t,diff<=0?t:t+Math.floor(Math.random()*diff)}function showTooltip(t,e){const n=parseFloat(getComputedStyle(document.documentElement).fontSize),o=document.getElementById("tooltip");o.textContent=t,o.style.opacity="1",o.style.pointerEvents="auto";const i=e.getBoundingClientRect(),s=window.scrollX+i.right-o.getBoundingClientRect().width,c=i.bottom+window.scrollY+n;o.style.top=`${c}px`,o.style.left=`${s}px`,setTimeout((()=>{o.style.opacity="0",o.style.pointerEvents="none"}),1e3)}function translate(t,e){const n="zxcvbnm,./asdfghjkl;'qwertyuiop[]",o="זסבהנמצתץ.שדגכעיחלךף,/'קראטוןםפ][";let i=n,s=o;"en"===e&&(i=o,s=n);let c="";for(const e in t){const n=i.search(t[e].toLowerCase());c=-1===n?c.concat(t[e]):c.concat(s[n])}return c}function getTranslation(){const t=document.querySelectorAll("#lang-choices input");let e="";for(const n of t)n.checked&&(e=n.value);const n=document.getElementById("input-message").value,o=document.getElementById("output-message");""===e&&(e=findTargetLang(n)),o.textContent=translate(n,e),copyToClipboard("output-message")}function findTargetLang(t){const e="zxcvbnm,./asdfghjkl;'qwertyuiop[]",n="זסבהנמצתץ.שדגכעיחלךף,/'קראטוןםפ][";let o=0,i=0;for(const s in t){let c=e.search(t[s].toLowerCase());-1!=c&&i++,c=n.search(t[s].toLowerCase()),-1!=c&&o++}return o<i?"he":"en"}function getReason(){const t=[{alt:"Dancing Bear",src:"images/bear.webp",width:450,height:500},{alt:"Bling Bling",src:"images/bling.webp",width:500,height:500},{alt:"Stevie Wonder",src:"images/stevie.webp",width:500,height:333},{alt:"The Frankenstein",src:"images/frankenstein.webp",width:401,height:500}],e=document.getElementById("reason-img");e.classList.remove("hidden"),index=randInt(0,t.length),Object.entries(t[index]).forEach((([t,n])=>{e.setAttribute(t,n)}))}document.getElementById("input-message").addEventListener("keydown",(t=>{"Enter"===t.key&&getTranslation()}));