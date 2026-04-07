const u=document.getElementById("libros-grid"),g=document.getElementById("loading"),b=document.getElementById("error"),h=document.getElementById("sin-resultados"),x=document.getElementById("resultados-count"),d=document.getElementById("paginacion"),m=6;let v=[],i=[],l=1;const E=e=>new RegExp(e.trim().replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"i");function p(e){return e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}function c(){const e=document.getElementById("buscador").value.trim(),a=document.getElementById("filtro-tradicion").value,s=document.getElementById("ordenacion").value;let n=[...v];if(e){const t=E(p(e));n=n.filter(o=>t.test(p(o.titulo))||t.test(p(o.autor)))}a&&(n=n.filter(t=>t.tradicion_rel?.nombre===a)),n.sort((t,o)=>{switch(s){case"titulo-asc":return t.titulo.localeCompare(o.titulo);case"titulo-desc":return o.titulo.localeCompare(t.titulo);case"precio-asc":return t.precio-o.precio;case"precio-desc":return o.precio-t.precio;case"valoracion-desc":return o.valoracion-t.valoracion;default:return 0}}),i=n,l=1,C()}function C(){const e=(l-1)*m,a=e+m,s=i.slice(e,a);if(x.textContent=`${i.length} libro${i.length!==1?"s":""} encontrado${i.length!==1?"s":""}`,x.classList.remove("hidden"),i.length===0){u.classList.add("hidden"),h.classList.remove("hidden"),d.classList.add("hidden");return}h.classList.add("hidden"),u.classList.remove("hidden"),u.innerHTML=s.map(t=>`
      <div class="card overflow-hidden flex flex-col">
        ${t.portada?.url?`<img src="http://18.201.196.247:1337${t.portada.url}" alt="${t.titulo}" class="w-full h-48 object-cover"/>`:'<div class="w-full h-48 bg-[#0B0F2A] flex items-center justify-center text-4xl">✦</div>'}
        <div class="p-6 flex flex-col flex-1">
          <h3 class="text-xl font-bold text-white mb-1">${t.titulo}</h3>
          <p class="text-gray-400 text-sm mb-3">por ${t.autor}</p>
          <p class="text-gray-300 text-sm mb-4 line-clamp-3">${t.sinopsis}</p>
          <div class="space-y-1 text-sm mb-6 mt-auto">
            <p><span class="text-[#FACC15]">✦ Nivel:</span> <span class="text-gray-300">${t.nivel}</span></p>
            <p><span class="text-[#FACC15]">⭐ Valoración:</span> <span class="text-gray-300">${t.valoracion}/5</span></p>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-[#FACC15] font-bold text-xl">${t.precio}€</span>
            <button onclick="añadirAlCarrito('${t.slug}', '${t.titulo}', '${t.autor}', '${t.precio}', 'http://18.201.196.247:1337${t.portada?.url||""}', '${t.stock}')" class="border border-white/20 text-gray-400 hover:border-[#FACC15] hover:text-[#FACC15] px-4 py-2 rounded-lg transition-all duration-300 text-sm">
              + Carrito
            </button>
            <a href="/libros/${t.slug}" class="border border-[#FACC15] text-[#FACC15] hover:bg-[#FACC15] hover:text-black px-4 py-2 rounded-lg transition-all duration-300 text-sm font-semibold">
              Ver más
            </a>
          </div>
        </div>
      </div>
    `).join("");const n=Math.ceil(i.length/m);n<=1?d.classList.add("hidden"):(d.classList.remove("hidden"),d.innerHTML=Array.from({length:n},(t,o)=>o+1).map(t=>`
        <button onclick="cambiarPagina(${t})" class="px-4 py-2 rounded-lg border transition-all duration-300 ${t===l?"bg-[#FACC15] text-black border-[#FACC15] font-bold":"border-white/10 text-gray-400 hover:border-[#FACC15] hover:text-[#FACC15]"}">
          ${t}
        </button>
      `).join(""))}window.cambiarPagina=e=>{l=e,C(),window.scrollTo({top:0,behavior:"smooth"})};fetch("http://18.201.196.247:1337/api/tradicions").then(e=>e.json()).then(e=>{const a=e.data??[],s=document.getElementById("filtro-tradicion");a.forEach(o=>{const r=document.createElement("option");r.value=o.nombre,r.textContent=o.nombre,s.appendChild(r)});const t=new URLSearchParams(window.location.search).get("tradicion");t&&(s.value=t,c())}).catch(()=>{console.error("Error al cargar las tradiciones")});fetch("http://18.201.196.247:1337/api/libros?populate[0]=portada&populate[1]=tradicion_rel&pagination[limit]=100").then(e=>e.json()).then(e=>{v=e.data??[],g.classList.add("hidden"),c()}).catch(()=>{g.classList.add("hidden"),b.classList.remove("hidden")});document.getElementById("buscador").addEventListener("input",c);document.getElementById("filtro-tradicion").addEventListener("change",c);document.getElementById("ordenacion").addEventListener("change",c);function f(e){const a=document.getElementById("toast"),s=document.getElementById("toast-mensaje");s.textContent=e,a.classList.remove("hidden"),setTimeout(()=>a.classList.add("hidden"),3e3)}window.añadirAlCarrito=(e,a,s,n,t,o)=>{const r=JSON.parse(localStorage.getItem("carrito")||"[]");if(r.find(y=>y.slug===e)){f("Este libro ya está en tu carrito");return}r.push({slug:e,titulo:a,autor:s,precio:n,portada:t,cantidad:1,stock:parseInt(o)}),localStorage.setItem("carrito",JSON.stringify(r)),window.dispatchEvent(new Event("carritoActualizado")),f(`✦ "${a}" añadido al carrito`)};
