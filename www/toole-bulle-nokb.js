/* TÕÕLé : dans la bulle uniquement, jamais de clavier Android */
(function(){try{if(new URLSearchParams(location.search).get("bulle")!=="1")return;
function fix(){["txt","gTxt"].forEach(function(i){var e=document.getElementById(i);if(e&&!e.__nk){e.__nk=1;e.setAttribute("inputmode","none");e.setAttribute("autocomplete","off");e.setAttribute("autocorrect","off");e.setAttribute("spellcheck","false")}})}
fix();setInterval(fix,400);
}catch(e){}})();
