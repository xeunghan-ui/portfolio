(function(){
  var body=document.querySelector('.case-body'); if(!body) return;
  var secs=[].slice.call(body.querySelectorAll(':scope > .case-sec'));
  if(secs.length<3) return;
  var nav=document.createElement('nav'); nav.className='case-nav';
  var inner=document.createElement('div'); inner.className='case-nav-inner';
  secs.forEach(function(sec,i){
    var h=sec.querySelector('h2'); if(!h) return;
    var label=h.textContent.replace(/^\s*\/\/\s*/,'').trim();
    if(!sec.id) sec.id='sec-'+i;
    var a=document.createElement('a');
    a.href='#'+sec.id; a.textContent=label; a.setAttribute('data-t',sec.id);
    a.addEventListener('click',function(e){
      e.preventDefault();
      var y=sec.getBoundingClientRect().top+window.scrollY-108;
      window.scrollTo({top:y,behavior:'smooth'});
    });
    inner.appendChild(a);
  });
  nav.appendChild(inner);
  body.parentNode.insertBefore(nav, body);
  var links=[].slice.call(inner.querySelectorAll('a'));
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){
        links.forEach(function(a){a.classList.toggle('active', a.getAttribute('data-t')===e.target.id);});
        var act=inner.querySelector('a.active');
        if(act) act.scrollIntoView({block:'nearest',inline:'center'});
      }
    });
  },{rootMargin:'-25% 0px -65% 0px'});
  secs.forEach(function(s){io.observe(s);});
})();
