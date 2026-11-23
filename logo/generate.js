const fs=require('fs');
const T={light:{ink:'#3A2619',bg:'#FBF3E6',sun:'#E08A4B',gold:'#F2B962',sky1:'#F9D9B4',sky2:'#FBF3E6',leaf:'#6F7F52',sub:'#7A5A44'},
         dark:{ink:'#FBF3E6',bg:'#24170F',sun:'#E8955A',gold:'#F2B962',sky1:'#5A3523',sky2:'#24170F',leaf:'#A3B07F',sub:'#D9C3A8'}};
const font='@import url("https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;1,9..144,300;1,9..144,500&amp;family=DM+Sans:wght@600&amp;display=swap");';
// mark in a 240x240 box
// clean line-art mark in a 300x300 box: sunrise arc, rainbow steam, outlined cup and saucer
const SPEC=['#D0533F','#E5853D','#E8B847','#7FA868','#4F86B8','#8A64AE'];
const mark=(c)=>{
 const rays=[];for(let i=0;i<13;i++){const a=Math.PI*(0.12+0.76*i/12),r1=86,r2=i%2?96:102;
  rays.push(`M${(150-Math.cos(a)*r1).toFixed(1)} ${(125-Math.sin(a)*r1).toFixed(1)}L${(150-Math.cos(a)*r2).toFixed(1)} ${(125-Math.sin(a)*r2).toFixed(1)}`);}
 const tops=[128,110,98,92,104,120];
 const steam=SPEC.map((col,i)=>{const x=122+i*11.2,y0=184,h=y0-tops[i],q=h/4;
  return `<path d="M${x.toFixed(1)} ${y0}c-9 ${-q*0.5} -9 ${-q*1.2} 0 ${-q*2}s9 ${-q*1.5} 0 ${-q*2}" fill="none" stroke="${col}" stroke-width="5" stroke-linecap="round"/>`;}).join('');
 return `<path d="M${(150-Math.cos(Math.PI*0.12)*78).toFixed(1)} ${(125-Math.sin(Math.PI*0.12)*78).toFixed(1)}A78 78 0 0 1 ${(150+Math.cos(Math.PI*0.12)*78).toFixed(1)} ${(125-Math.sin(Math.PI*0.12)*78).toFixed(1)}" fill="none" stroke="${c.sun}" stroke-width="3" stroke-linecap="round"/>
 <path d="${rays.join('')}" stroke="${c.sun}" stroke-width="3" stroke-linecap="round"/>
 ${steam}
 <path d="M92 196H208C208 248 182 270 150 270S92 248 92 196Z" fill="${c.bg}" stroke="${c.ink}" stroke-width="7" stroke-linejoin="round"/>
 <path d="M206 208c26-6 34 28-8 40" fill="none" stroke="${c.ink}" stroke-width="7" stroke-linecap="round"/>
 <path d="M70 280H230" stroke="${c.ink}" stroke-width="7" stroke-linecap="round"/>
 <path d="M90 288c14 12 106 12 120 0" fill="none" stroke="${c.ink}" stroke-width="5" stroke-linecap="round"/>`;};
const style=c=>`<style>${font}
 .the{font-family:Fraunces,Georgia,serif;font-style:italic;font-weight:300;fill:${c.sub}}
 .morning{font-family:Fraunces,Georgia,serif;font-style:italic;font-weight:500;fill:${c.sun}}
 .nook{font-family:Fraunces,Georgia,serif;font-weight:600;fill:${c.ink};letter-spacing:-1px}
 .sub{font-family:"DM Sans",Helvetica,Arial,sans-serif;font-weight:600;fill:${c.ink};letter-spacing:7px}
 .tag{font-family:Fraunces,Georgia,serif;font-style:italic;font-weight:300;fill:${c.sub}}</style>`;
const divider=(c,cx,y,w)=>`<defs><linearGradient id="spec" gradientUnits="userSpaceOnUse" x1="${cx-w}" x2="${cx+w}" y1="0" y2="0"><stop offset="0" stop-color="#C8553D"/><stop offset=".2" stop-color="#E07A3F"/><stop offset=".35" stop-color="#EBA94A"/><stop offset=".5" stop-color="#8FA66B"/><stop offset=".65" stop-color="#4F9A94"/><stop offset=".8" stop-color="#5B7DB1"/><stop offset="1" stop-color="#B0608F"/></linearGradient></defs><path d="M${cx-w} ${y}H${cx-24}M${cx+24} ${y}H${cx+w}" stroke="url(#spec)" stroke-width="7" stroke-linecap="round"/>
 <g transform="rotate(-30 ${cx} ${y})"><ellipse cx="${cx}" cy="${y}" rx="8" ry="12" fill="${c.ink}"/><path d="M${cx} ${y-11}c-4 5 4 7 0 11s4 7 0 11" stroke="${c.bg}" stroke-width="1.4" fill="none"/></g>`;
const stacked=(c,id)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="640" height="640">${style(c)}
 <rect width="640" height="640" fill="${c.bg}"/>
 <g transform="translate(200 6) scale(.8)">${mark(c,id)}</g>
 <text class="the" x="320" y="294" font-size="28" text-anchor="middle">the</text>
 <text class="morning" x="320" y="368" font-size="76" text-anchor="middle">Morning</text>
 <text class="nook" x="320" y="446" font-size="84" text-anchor="middle">Nook</text>
 <text class="sub" x="324" y="494" font-size="16" text-anchor="middle">CAFE &amp; LOUNGE</text>
 ${divider(c,320,532,160)}
 <text class="tag" x="320" y="582" font-size="22" text-anchor="middle">come for the coffee, stay for the nook.</text></svg>`;
const horiz=(c,id)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 280" width="960" height="280">${style(c)}
 <rect width="960" height="280" fill="${c.bg}"/>
 <g transform="translate(10 -6) scale(.92)">${mark(c,id)}</g>
 <text class="the" x="284" y="82" font-size="24">the</text>
 <text class="morning" x="280" y="150" font-size="70">Morning</text>
 <text class="nook" x="560" y="150" font-size="70">Nook</text>
 <text class="sub" x="285" y="192" font-size="15">CAFE &amp; LOUNGE</text>
 <text class="tag" x="284" y="236" font-size="21">come for the coffee, stay for the nook.</text></svg>`;
const icon=(c,id)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260" width="260" height="260">
 <rect width="260" height="260" rx="56" fill="${c.bg}"/><g transform="translate(13 -8) scale(.78)">${mark(c,id)}</g></svg>`;
const w=(n,s)=>fs.writeFileSync(n,s);
w('morning-nook-logo.svg',stacked(T.light,'a'));w('morning-nook-logo-dark.svg',stacked(T.dark,'b'));
w('morning-nook-logo-horizontal.svg',horiz(T.light,'c'));
w('morning-nook-icon.svg',icon(T.light,'d'));w('morning-nook-icon-dark.svg',icon(T.dark,'e'));
