/* EDIT THESE: your details for the contact form and footer */
var EMAIL='sibabalwejantjies24@gmail.com'; /* Contact form submissions are delivered through FormSubmit. */
var PHONE='+27 83 518 8069';
var SOCIAL=[['behance','https://www.behance.net/sibabaljantjie'],['linkedin','https://www.linkedin.com/in/sibabalwe-jantjies-563a622b2'],['tiktok','https://www.tiktok.com/@sibabalwej']];
/* PASTE your Figma prototype links between the quotes. A "View prototype" button appears on any project that has a link. */
var PROTOTYPES={mywallet:'https://www.figma.com/design/qhYZpUDCpQ4M9zNkTOtFWO/Untitled?node-id=0-1&t=yjJUJGXVhUiSq3YB-1',redesigns:'https://www.figma.com/design/UI440AdvRlxGLOVBvVMGyW/Untitled?node-id=0-1&t=lMFCyQkBMxs5jp7z-1',branding:''};
/* Which frame each project opens in: 'phone' (app) or 'browser' (website). */
var KIND={mywallet:'phone',redesigns:'browser',branding:'browser'};
function embedUrl(link,kind){
  try{
    var u=new URL(link);
    if(u.hostname.indexOf('figma.com')<0)return link;
    u.hostname='embed.figma.com';
    u.searchParams.set('embed-host','share');
    if(u.pathname.indexOf('/proto/')===0){
      u.searchParams.set('scaling',kind==='phone'?'scale-down':'scale-down-width');
      u.searchParams.set('hide-ui','1');
    }
    return u.toString();
  }catch(err){return link}
}
document.querySelectorAll('[data-proto]').forEach(function(a){var u=PROTOTYPES[a.dataset.proto];if(u){a.href=u;a.hidden=false}});
var dlg=document.getElementById('dlg');
if(dlg){
var shell=document.getElementById('shell'),fr=document.getElementById('fr');
document.querySelectorAll('[data-try]').forEach(function(b){
  var key=b.dataset.try,link=PROTOTYPES[key];
  if(!link)return;
  b.hidden=false;
  b.addEventListener('click',function(){
    if(!dlg.showModal){window.open(link,'_blank','noopener');return}
    shell.className=KIND[key]||'browser';
    fr.src=embedUrl(link,KIND[key]);
    dlg.showModal();
  });
});
function closeDlg(){dlg.close();fr.src='about:blank'}
document.getElementById('dx').addEventListener('click',closeDlg);
dlg.addEventListener('click',function(e){if(e.target===dlg)closeDlg()});
dlg.addEventListener('cancel',function(){fr.src='about:blank'});
}

document.getElementById('yr').textContent=new Date().getFullYear();
var SOCIAL_LABELS={linkedin:['LinkedIn','in'],behance:['Behance','Bē'],tiktok:['TikTok','Ti'],github:['GitHub','Gh'],instagram:['Instagram','Ig'],whatsapp:['WhatsApp','Wa'],facebook:['Facebook','f'],x:['X','X'],youtube:['YouTube','Yt']};
var SOCIAL_ICONS={behance:'images/behance.png',linkedin:'images/linkedin.png',tiktok:'images/tik-tok.png'};
if(SOCIAL.length){document.getElementById('soc').innerHTML='<p>Follow us:</p>'+SOCIAL.map(function(s){var key=String(s[0]).toLowerCase(),L=SOCIAL_LABELS[key]||[s[0],String(s[0]).slice(0,2)],icon=SOCIAL_ICONS[key];return '<a class="si" href="'+s[1]+'" target="_blank" rel="noopener" aria-label="'+L[0]+'" title="'+L[0]+'">'+(icon?'<img src="'+icon+'" alt="">':L[1])+'</a>'}).join('')}
if(EMAIL||PHONE){document.getElementById('chh').hidden=false;document.getElementById('ch').innerHTML=[EMAIL,PHONE].filter(Boolean).join('<br>')}

var home=document.getElementById('v-home'),port=document.getElementById('v-portfolio');
function showBrand(on,scroll){
  var s=document.getElementById('brand'),b=document.getElementById('bt');
  if(!s)return;
  s.hidden=!on;
  if(b){b.textContent=on?'Hide project':'View project';b.setAttribute('aria-expanded',on?'true':'false')}
  if(on&&scroll)s.scrollIntoView({behavior:'smooth',block:'start'});
}
document.getElementById('bt').addEventListener('click',function(){showBrand(document.getElementById('brand').hidden,true)});
document.getElementById('bt2').addEventListener('click',function(){showBrand(false);document.getElementById('bt').scrollIntoView({block:'center'})});
function showLogofolio(on,scroll){
  var s=document.getElementById('logofolio'),b=document.getElementById('logoBtn');
  if(!s)return;
  s.hidden=!on;
  if(b){b.textContent=on?'Hide project':'View project';b.setAttribute('aria-expanded',on?'true':'false')}
  if(on&&scroll)s.scrollIntoView({behavior:'smooth',block:'start'});
}
document.getElementById('logoBtn').addEventListener('click',function(){showLogofolio(document.getElementById('logofolio').hidden,true)});
document.getElementById('logoBtn2').addEventListener('click',function(){showLogofolio(false);document.getElementById('logoBtn').scrollIntoView({block:'center'})});
function route(){
  var t=(location.hash||'#home').slice(1);
  var el=document.getElementById(t);
  var isP=t==='portfolio'||!!(el&&port.contains(el));
  if(t==='brand'){showBrand(true);}
  if(t==='logofolio'){showLogofolio(true);}
  home.hidden=isP;port.hidden=!isP;
  if(t==='portfolio'||t==='home'||!el){window.scrollTo(0,0);return}
  el.scrollIntoView();
}
window.addEventListener('hashchange',route);
document.addEventListener('click',function(e){
  var a=e.target.closest('a[href^="#"]');
  if(a&&('#'+(location.hash||'#home').slice(1))===a.getAttribute('href')){e.preventDefault();route()}
});
route();

document.getElementById('f').addEventListener('submit',function(e){
  e.preventDefault();
  var form=e.currentTarget,ok=document.getElementById('ok'),button=form.querySelector('button[type="submit"]');
  button.disabled=true;
  ok.textContent='Sending your message...';
  fetch('https://formsubmit.co/ajax/'+encodeURIComponent(EMAIL),{
    method:'POST',
    body:new FormData(form),
    headers:{Accept:'application/json'}
  }).then(function(response){
    return response.json().then(function(result){
      if(!response.ok||result.success!=='true')throw new Error(result.message||'The message could not be sent.');
      return result;
    });
  }).then(function(){
    ok.textContent='Thanks! Your message has been submitted. If this is the first submission, confirm the activation email sent to the site owner to enable delivery.';
    form.reset();
  }).catch(function(err){
    var name=document.getElementById('n').value,email=document.getElementById('e').value,message=document.getElementById('m').value;
    ok.textContent='The online form service is unavailable. An email draft is opening; press Send in your email app to deliver your message.';
    window.location.href='mailto:'+EMAIL+'?subject='+encodeURIComponent('Portfolio enquiry from '+name)+'&body='+encodeURIComponent(message+'\n\nFrom: '+name+' ('+email+')');
    console.error('Contact form submission failed:',err);
  }).then(function(){button.disabled=false});
});

/* Behance project link: paste it between the quotes. The "View on Behance" buttons appear once it is set. */
var BEHANCE='';
document.querySelectorAll('[data-behance]').forEach(function(a){if(BEHANCE){a.href=BEHANCE;a.hidden=false}});
