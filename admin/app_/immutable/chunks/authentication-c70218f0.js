const t="authToken";async function s(e){const o={method:"POST",headers:new Headers({"Content-Type":"application/json"}),body:JSON.stringify(e)};return(await(await fetch("https://recipes-api.kurpuis.com/login",o)).json()).token}function a(e){localStorage.setItem(t,e)}function p(){localStorage.getItem(t)}function i(){const e=new URLSearchParams(window.location.search).get("redirect");window.location.href=e||"/admin"}async function d(e){const n=await s(e);a(n),i()}export{p as g,d as l};
