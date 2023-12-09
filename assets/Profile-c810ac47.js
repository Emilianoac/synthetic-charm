import{d as I,u as w,r as x,a as k,b as E,c as i,e as t,t as o,f as v,w as S,F as h,n as f,g as $,h as C,q as P,i as M,j as L,k as B,l as N,m as R,o as d,p as y,s as b}from"./index-96b8d0d7.js";function T(u,c){if(!/^#[0-9a-fA-F]{6}$/.test(u))throw new Error("El color proporcionado no es un valor hexadecimal válido.");if(!Number.isInteger(c))throw new Error("El valor de modificación debe ser un número entero.");const e=parseInt(u.slice(1,3),16),m=parseInt(u.slice(3,5),16),g=parseInt(u.slice(5,7),16),p=Math.min(255,Math.max(0,e+c)),_=Math.min(255,Math.max(0,m+c)),s=Math.min(255,Math.max(0,g+c));return`#${p.toString(16).padStart(2,"0")}${_.toString(16).padStart(2,"0")}${s.toString(16).padStart(2,"0")}`}const q="/synthetic-charm/assets/play-ff2500cf.svg",D="/synthetic-charm/assets/pause-2c984325.svg",F={class:"container my-4"},V={key:0},A={class:"text-center"},G={class:"fw-bold text-uppercase"},j=t("i",{class:"fas fa-arrow-left"},null,-1),z={class:"row mb-4"},H={class:"col-12"},J=t("i",{class:"fas fa-arrow-left"},null,-1),K={class:"perfil-musico"},O={class:"perfil-musico__imagen"},Q={class:"fw-bold text-uppercase mb-1"},U={class:"mb-3"},W=["src","title"],X={class:"perfil-musico__informacion"},Y={class:"musico-datos"},Z={class:""},ee=t("dt",null,"Country",-1),te=t("dt",null,"Age",-1),se=t("dt",null,"Instrument",-1),ne=t("dt",null,"Biography",-1),oe=t("dt",null,"Facts",-1),re={class:"perfil-musico__albumes"},ae={class:"album"},le={class:"album__header"},ce={class:"album__info"},ie={class:"fw-bold mb-1"},de={class:"mb-1"},ue={class:"small"},me=["src"],_e={class:"album__canciones mt-2"},ge=t("li",{class:"canciones__header"},[t("p",null,"#"),t("p",null,"Name"),t("p",null,"Duration")],-1),pe={class:"cancion__btn d-flex align-items-center"},he=["onClick"],fe=t("p",null,"00:30",-1),ve=["id","src"],be=I({__name:"Profile",setup(u){const c=w(),e=x({data:null,currentSong:{progressIntervalId:0,element:null,id:null,progressPercentage:0},error:{message:"Error",state:!1},profileImageLoaded:!1}),m=k({});async function g(){try{const s=P(M(L,"musicians"),B("slug","==",c.params.id)),r=await N(s);if(!r.empty)r.forEach(l=>{let a={...l.data(),id:l.id};if(R(a)){e.data=a,document.title=`${e.data.name} | Synthethic Charm`,document.documentElement.style.setProperty("--color-musico-1",e.data.color),document.documentElement.style.setProperty("--color-musico-2",T(e.data.color,-130)),document.documentElement.style.setProperty("--bg-image",`url(${e.data.profileImage.url})`);let n=document.querySelector("meta[name=theme-color]");n&&n.setAttribute("content",e.data.color)}else throw new Error("Musician data is incomplete.")});else throw new Error("That musician does not exist.")}catch(s){e.error.state=!0,e.error.message=s.message,console.log(s)}}g();function p(s,r){e.currentSong.id=r,s.volume=.5;const l=Math.ceil(s.duration);let a=0,n=0;e.currentSong.progressIntervalId&&clearInterval(e.currentSong.progressIntervalId),e.currentSong.progressIntervalId=setInterval(()=>{a++,n=a/l*100,e.currentSong.progressPercentage=n,n>100&&(e.currentSong.progressPercentage=0,clearInterval(e.currentSong.progressIntervalId))},1e3),e.currentSong.element&&e.currentSong.element!==s&&(e.currentSong.element.pause(),e.currentSong.element.currentTime=0,e.currentSong.progressPercentage=0),e.currentSong.element&&e.currentSong.element.removeEventListener("ended",_),s.paused?(s.play(),s.addEventListener("ended",_)):(clearInterval(e.currentSong.progressIntervalId),e.currentSong.progressPercentage=0,s.pause(),s.currentTime=0,e.currentSong.id=null),e.currentSong.element=s.paused?null:s,e.currentSong.id=s.paused?null:r}function _(){e.currentSong.element=null,e.currentSong.id=null}return(s,r)=>{const l=E("RouterLink");return d(),i("div",F,[e.error.state?(d(),i("div",V,[t("div",A,[t("h1",G,o(e.error.message),1),v(l,{class:"btn btn-link text-light p-0",to:"/"},{default:S(()=>[j,y(" Go to home")]),_:1})])])):(d(),i(h,{key:1},[e.data?(d(),i(h,{key:0},[t("div",z,[t("div",H,[v(l,{class:"btn btn-link p-0 text-light",to:"/"},{default:S(()=>[J,y(" Back to home")]),_:1})])]),t("div",K,[t("div",O,[t("h1",Q,o(e.data.name),1),t("p",U,o(e.data.musical_genre),1),t("img",{class:"gato-imagen img-fluid",style:f(`border: 5px solid ${e.data.color} `),src:e.data.profileImage.url,title:e.data.name,onLoad:r[0]||(r[0]=a=>e.profileImageLoaded=!0)},null,44,W)]),t("div",X,[t("div",Y,[t("dl",Z,[ee,t("dd",null,o(e.data.country),1),te,t("dd",null,o(e.data.age),1),se,t("dd",null,o(e.data.instrument),1),ne,t("dd",null,o(e.data.bio),1),oe,t("dd",null,o(e.data.fun_fact),1)])])]),t("div",re,[t("div",ae,[t("div",le,[t("div",ce,[t("p",ie,o(e.data.name),1),t("p",de,o(e.data.albums[0].title),1),t("p",ue,o(e.data.albums[0].year),1)]),t("img",{class:"album__cover img-fluid",src:e.data.albums[0].cover.url},null,8,me)]),t("ul",_e,[ge,(d(!0),i(h,null,$(e.data.albums[0].songs,(a,n)=>(d(),i("li",null,[t("div",pe,[t("button",{onClick:Se=>p(m.value[n],n),style:f(`background-image: url(${e.currentSong.id==n?b(D):b(q)})`)},null,12,he)]),t("p",null,o(a.title),1),fe,t("audio",{id:`song-${n+1}`,ref_for:!0,ref_key:"songRefs",ref:m,hidden:"",controls:"",src:a.audio.url},null,8,ve),t("div",{style:f(`width:${e.currentSong.id==n?e.currentSong.progressPercentage:0}%`),class:"progress-percentage"},null,4)]))),256))])])])])],64)):C("",!0)],64))])}}});export{be as default};
