<script>
/* ====== Shared helpers & language ====== */
const WA = "201050072527";
const ICON = "https://i.top4top.io/p_3520bchvg0.png";
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

/* Contact dropdown (exists on all pages) */
(function initContact(){
  const btn = document.getElementById('contactBtn');
  const menu = document.getElementById('contactMenu');
  if(!btn || !menu) return;
  btn.addEventListener('click',e=>{
    e.stopPropagation();
    menu.style.display = menu.style.display==='block'?'none':'block';
  });
  document.addEventListener('click',()=> menu.style.display='none');
})();

/* i18n */
const T={
  ar:{brand:"إسلام",home:"الرئيسية",projects:"المشاريع",contact:"التواصل",lang:"AR / EN",
      hero_h1:"حوِّل استثمارك العقاري إلى تجربة من الفخامة والرقّي",
      hero_sub:"خدمة خاصة للبيع والشراء والاستثمار في المواقع الراقية",
      hero_areas:"العين السخنة • الساحل الشمالي • القاهرة الجديدة",
      call:"اتصال مباشر",wa:"استشارة واتساب",mail:"Email ✉️",
      resale_title:"ريسيل — اختر المنطقة واكتب المكان",
      resale_hint:"بعد «التالي» هتدخل نوع الوحدة والغرف والدور والميزانية ثم نرسلها على واتساب.",
      next:"إرسال / التالي »",
      cap_north:"الساحل الشمالي 🌊", cap_sokhna:"العين السخنة 🏖️", cap_cairo:"القاهرة الجديدة 🏡",
      unit_details:"تفاصيل الوحدة",unit_type:"نوع الوحدة",rooms:"عدد الغرف",floor:"الدور المفضل",budget:"الميزانية (جنيه)",
      send_wa:"إرسال إلى واتساب",back:"رجوع",
      p_north:"مشاريع الساحل الشمالي",p_sokhna:"مشاريع العين السخنة",p_cairo:"مشاريع القاهرة الجديدة",
      ask:"اسأل", cant_find:"مش لاقي مشروعك؟ ابعتلنا:"},
  en:{brand:"Eslam",home:"Home",projects:"Projects",contact:"Contact",lang:"AR / EN",
      hero_h1:"Turn your property investment into a luxury experience",
      hero_sub:"Private service for buying, selling & investing in prime locations",
      hero_areas:"Ain Sokhna • North Coast • New Cairo",
      call:"Call Now",wa:"WhatsApp Advice",mail:"Email ✉️",
      resale_title:"Resale — choose area & type location",
      resale_hint:"After next, choose unit, rooms, floor & budget, then we'll send it on WhatsApp.",
      next:"Send / Next »",
      cap_north:"North Coast 🌊", cap_sokhna:"Ain Sokhna 🏖️", cap_cairo:"New Cairo 🏡",
      unit_details:"Unit details",unit_type:"Unit type",rooms:"Bedrooms",floor:"Preferred floor",budget:"Budget (EGP)",
      send_wa:"Send to WhatsApp",back:"Back",
      p_north:"North Coast Projects",p_sokhna:"Ain Sokhna Projects",p_cairo:"New Cairo Projects",
      ask:"Ask", cant_find:"Can't find your project? Tell us:"}
};

function setLang(lang){
  localStorage.setItem('lang',lang);
  document.documentElement.dir = (lang==='ar')?'rtl':'ltr';
  document.documentElement.lang = lang;
  const t=T[lang];
  // generic nav
  const brand=$('#brand'); if(brand) brand.textContent=t.brand;
  const navHome=$('#navHome'); if(navHome) navHome.textContent=t.home;
  const navProj=$('#navProjects'); if(navProj) navProj.textContent=t.projects;
  const contactBtn=$('#contactBtn'); if(contactBtn) contactBtn.textContent=t.contact;
  const langBtn=$('#langToggle'); if(langBtn) langBtn.textContent=t.lang;

  // page-specific keys by data-i18n
  $$('[data-i18n]').forEach(el=>{
    const key=el.getAttribute('data-i18n');
    if(t[key]) el.textContent=t[key];
  });
  // update all ask buttons
  $$('.ask').forEach(b=> b.textContent=t.ask);
}

/* init language */
const CUR = localStorage.getItem('lang') || 'ar';
window.addEventListener('DOMContentLoaded',()=>{
  setLang(CUR);
  const langBtn=$('#langToggle');
  if(langBtn) langBtn.onclick=()=> setLang((localStorage.getItem('lang')||'ar')==='ar'?'en':'ar');
  const y=document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
});

/* ========= Resale mini flow (only on index) ========= */
function initResale(){
  const next=document.getElementById('goNext'); if(!next) return;
  next.addEventListener('click',()=>{
    sessionStorage.setItem('r_area',document.getElementById('resaleArea').value);
    sessionStorage.setItem('r_place',document.getElementById('resalePlace').value.trim());
    window.location.href='resale.html';
  });
}
initResale();

/* ========= Draw project cards (used in pages) ========= */
function drawProjects(list,wrapId,{sea=false}={}){
  const wrap=document.getElementById(wrapId); if(!wrap) return;
  wrap.innerHTML='';
  list.forEach(name=>{
    const add = sea ? "/شاليه" : "";
    const msg=`استفسار عن مشروع: ${name} | احتياجي (شقة/فيلا/استوديو/بنتهاوس/دوبلكس/روف${sea?add:""}) + عدد الغرف + الدور + الميزانية. برجاء إرسال الأسعار والتفاصيل.`;
    const card=document.createElement('div');
    card.className='card';
    card.innerHTML=`
