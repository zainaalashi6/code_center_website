// courses data
const courses = [
  {id:'c1', name:'مقدمة في تطوير الويب', desc:'HTML, CSS, JavaScript - للمبتدئين', duration:'4 أسابيع', price:'مجانًا'},
  {id:'c2', name:'Front-End متقدم (React)', desc:'React + Hooks + Projects', duration:'6 أسابيع', price:'مجانًا'}
];

function renderCourses(targetId='coursesList'){
  const el = document.getElementById(targetId);
  if(!el) return;
  el.innerHTML = '';
  courses.forEach(c=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h3>${c.name}</h3><p>${c.desc}</p><div class="meta">المدة: ${c.duration} • السعر: ${c.price}</div><button class="btn" onclick="openBooking('${c.id}')">احجز الآن</button>`;
    el.appendChild(card);
  });
}

/* booking */
function openBooking(courseId){
  const modal = document.getElementById('bookingModal');
  if(!modal) return;
  modal.style.display = 'flex';
  const sel = document.getElementById('book-course');
  if(sel){
    sel.innerHTML = courses.map(c=>`<option value="${c.id}">${c.name} - ${c.duration}</option>`).join('');
    sel.value = courseId || '';
  }
}
function closeBooking(){ const modal = document.getElementById('bookingModal'); if(modal) modal.style.display='none' }
function submitBooking(e){
  e.preventDefault();
  const name = document.getElementById('book-name').value.trim();
  const phone = document.getElementById('book-phone').value.trim();
  if(!name||!phone){ alert('الرجاء تعبئة الاسم ورقم الجوال'); return; }
  const bookings = JSON.parse(localStorage.getItem('cc_bookings')||'[]');
  bookings.push({id:Date.now(), name, phone, email:document.getElementById('book-email').value||'', course:document.getElementById('book-course').value||'', created:new Date().toISOString()});
  localStorage.setItem('cc_bookings', JSON.stringify(bookings));
  closeBooking();
  alert('تم إرسال الحجز بنجاح ✅');
  document.getElementById('bookingForm')?.reset();
  renderBookingsList();
}

/* portfolio modal */
function openImage(src){
  const modal = document.getElementById('imgModal');
  const img = document.getElementById('imgModalImg');
  if(!modal||!img){ console.error('Modal missing'); return; }
  img.src = src;
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeImage(){
  const modal = document.getElementById('imgModal');
  if(!modal) return;
  modal.classList.remove('show');
  document.body.style.overflow = '';
  const img = document.getElementById('imgModalImg');
  if(img) img.src = '';
}

/* bookings list */
function renderBookingsList(){
  const el = document.getElementById('bookingsList');
  if(!el) return;
  const bookings = JSON.parse(localStorage.getItem('cc_bookings') || '[]');
  if(bookings.length===0){ el.innerHTML = '<p>لا توجد حجوزات حتى الآن.</p>'; return; }
  el.innerHTML = '<ul style="list-style:none;padding:0;">' + bookings.map(b=>`<li style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.03)"><strong>${b.name}</strong> — ${b.phone} — ${(courses.find(c=>c.id===b.course)||{}).name || b.course} <br><small style="color:var(--muted)">${new Date(b.created).toLocaleString()}</small></li>`).join('') + '</ul>';
}

/* contact form placeholder */
function submitContact(e){ e.preventDefault(); alert('تم إرسال الرسالة!'); document.getElementById('contactForm')?.reset(); }

document.addEventListener('DOMContentLoaded', ()=>{
  renderCourses();
  renderBookingsList();
  document.getElementById('imgModalClose')?.addEventListener('click', closeImage);
  document.getElementById('imgModal')?.addEventListener('click', (e)=>{ if(e.target===document.getElementById('imgModal')) closeImage(); });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeImage(); });
});
