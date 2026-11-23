const fs=require('fs');
const T={light:{ink:'#3A2619',bg:'#FBF3E6',sun:'#E08A4B',gold:'#F2B962',sky1:'#F9D9B4',sky2:'#FBF3E6',leaf:'#6F7F52',sub:'#7A5A44'},
         dark:{ink:'#FBF3E6',bg:'#24170F',sun:'#E8955A',gold:'#F2B962',sky1:'#5A3523',sky2:'#24170F',leaf:'#A3B07F',sub:'#D9C3A8'}};
const font='@import url("https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;1,9..144,300;1,9..144,500&amp;family=DM+Sans:wght@600&amp;display=swap");';
// mark in a 240x240 box
const mark=(c,id)=>{
 const spec=['#C8553D','#E07A3F','#EBA94A','#8FA66B','#4F9A94','#5B7DB1','#7F68AE','#B0608F'];
 const angs=[16,34,52,68,112,128,146,164];
 const rays=angs.map((d,i)=>{const a=d*Math.PI/180,r1=52,r2=i%2?66:74;
  return `<path d="M${(120-Math.cos(a)*r1).toFixed(1)} ${(150-Math.sin(a)*r1).toFixed(1)}L${(120-Math.cos(a)*r2).toFixed(1)} ${(150-Math.sin(a)*r2).toFixed(1)}" stroke="${spec[i]}" stroke-width="3.2" stroke-linecap="round"/>`;}).join('');
 return `<defs>
  <linearGradient id="sky${id}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${c.sky1}"/><stop offset="1" stop-color="${c.sky2}"/></linearGradient>
  <clipPath id="arch${id}"><path d="M62 206V112a58 58 0 0 1 116 0v94z"/></clipPath></defs>
 <g clip-path="url(#arch${id})">
  <rect x="50" y="40" width="140" height="170" fill="url(#sky${id})"/>
  ${rays}
  <g transform="rotate(-28 120 166)"><ellipse cx="120" cy="166" rx="28" ry="40" fill="${c.sun}"/>
   <path d="M120 128c-12 14 12 24 0 38s12 24 0 38" fill="none" stroke="${c.gold}" stroke-width="4" stroke-linecap="round"/></g>
  <path d="M50 160c30-8 50 4 70 0s44-10 70-2v60H50z" fill="${c.bg}"/>
  <path d="M50 160c30-8 50 4 70 0s44-10 70-2" fill="none" stroke="${c.ink}" stroke-width="1.6" opacity=".5"/>
  <path d="M84 72l2 5 5 2-5 2-2 5-2-5-5-2 5-2zM156 92l1.4 3.6 3.6 1.4-3.6 1.4-1.4 3.6-1.4-3.6-3.6-1.4 3.6-1.4z" fill="${c.gold}"/>
 </g>
 <path d="M62 206V112a58 58 0 0 1 116 0v94" fill="none" stroke="${c.ink}" stroke-width="6" stroke-linecap="round"/>
 <path d="M54 206V112a66 66 0 0 1 44-62.2M142 49.8A66 66 0 0 1 186 112v94" fill="none" stroke="${c.ink}" stroke-width="1.6" stroke-linecap="round"/>
 <path d="M120 164c-9-9 9-15 0-26" fill="none" stroke="${c.bg}" stroke-width="7" stroke-linecap="round"/>
 <path d="M120 164c-9-9 9-15 0-26" fill="none" stroke="${c.ink}" stroke-width="3" stroke-linecap="round"/>
 <path d="M120 132c-17-10-22-23-13-30 5-4 11-2 13 4 2-6 8-8 13-4 9 7 4 20-13 30z" fill="${c.sun2||'#C8553D'}" stroke="${c.ink}" stroke-width="3" stroke-linejoin="round"/>
 <path d="M90 168h60c0 22-12 34-30 34s-30-12-30-34z" fill="${c.ink}"/>
 <path d="M149 174c14-1 15 17-3 19" fill="none" stroke="${c.ink}" stroke-width="5" stroke-linecap="round"/>
 <path d="M30 210h180" stroke="${c.ink}" stroke-width="6" stroke-linecap="round"/>
 <path d="M58 200c-10-20-12-48 2-74" fill="none" stroke="${c.leaf}" stroke-width="2.2" stroke-linecap="round"/>
 <path d="M56 176c-14-2-20-12-20-20 12 0 20 8 20 20zM55 152c-12-6-14-18-12-24 10 4 15 14 12 24zM59 130c4-12 14-16 20-16-2 10-10 16-20 16z" fill="${c.leaf}"/>
 <circle cx="66" cy="190" r="4.5" fill="${c.sun}"/><circle cx="72" cy="196" r="3.5" fill="${c.sun}"/>`;};
const style=c=>`<style>${font}
 .the{font-family:Fraunces,Georgia,serif;font-style:italic;font-weight:300;fill:${c.sub}}
 .morning{font-family:Fraunces,Georgia,serif;font-style:italic;font-weight:500;fill:${c.sun}}
 .nook{font-family:Fraunces,Georgia,serif;font-weight:600;fill:${c.ink};letter-spacing:-1px}
 .sub{font-family:"DM Sans",Helvetica,Arial,sans-serif;font-weight:600;fill:${c.ink};letter-spacing:7px}
 .tag{font-family:Fraunces,Georgia,serif;font-style:italic;font-weight:300;fill:${c.sub}}</style>`;
const divider=(c,cx,y,w)=>`<defs><linearGradient id="spec" gradientUnits="userSpaceOnUse" x1="${cx-w}" x2="${cx+w}" y1="0" y2="0"><stop offset="0" stop-color="#C8553D"/><stop offset=".2" stop-color="#E07A3F"/><stop offset=".35" stop-color="#EBA94A"/><stop offset=".5" stop-color="#8FA66B"/><stop offset=".65" stop-color="#4F9A94"/><stop offset=".8" stop-color="#5B7DB1"/><stop offset="1" stop-color="#B0608F"/></linearGradient></defs><path d="M${cx-w} ${y}h${2*w}" stroke="url(#spec)" stroke-width="2.5" stroke-linecap="round"/><circle cx="${cx}" cy="${y}" r="15" fill="${c.bg}"/>
 <g transform="rotate(-30 ${cx} ${y})"><ellipse cx="${cx}" cy="${y}" rx="6" ry="9" fill="${c.ink}"/><path d="M${cx} ${y-8}c-3 4 3 5 0 8s3 5 0 8" stroke="${c.bg}" stroke-width="1.4" fill="none"/></g>`;
const stacked=(c,id)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="640" height="640">${style(c)}
 <rect width="640" height="640" fill="${c.bg}"/>
 <g transform="translate(200 16)">${mark(c,id)}</g>
 <text class="the" x="320" y="294" font-size="28" text-anchor="middle">the</text>
 <text class="morning" x="320" y="368" font-size="76" text-anchor="middle">Morning</text>
 <text class="nook" x="320" y="446" font-size="84" text-anchor="middle">Nook</text>
 <text class="sub" x="324" y="494" font-size="16" text-anchor="middle">CAFE &amp; LOUNGE</text>
 ${divider(c,320,532,120)}
 <text class="tag" x="320" y="582" font-size="22" text-anchor="middle">come for the coffee, stay for the nook.</text></svg>`;
const horiz=(c,id)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 280" width="960" height="280">${style(c)}
 <rect width="960" height="280" fill="${c.bg}"/>
 <g transform="translate(20 22)">${mark(c,id)}</g>
 <text class="the" x="284" y="82" font-size="24">the</text>
 <text class="morning" x="280" y="150" font-size="70">Morning</text>
 <text class="nook" x="560" y="150" font-size="70">Nook</text>
 <text class="sub" x="285" y="192" font-size="15">CAFE &amp; LOUNGE</text>
 <text class="tag" x="284" y="236" font-size="21">come for the coffee, stay for the nook.</text></svg>`;
const icon=(c,id)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260" width="260" height="260">
 <rect width="260" height="260" rx="56" fill="${c.bg}"/><g transform="translate(10 6)">${mark(c,id)}</g></svg>`;
const w=(n,s)=>fs.writeFileSync(n,s);
w('morning-nook-logo.svg',stacked(T.light,'a'));w('morning-nook-logo-dark.svg',stacked(T.dark,'b'));
w('morning-nook-logo-horizontal.svg',horiz(T.light,'c'));
w('morning-nook-icon.svg',icon(T.light,'d'));w('morning-nook-icon-dark.svg',icon(T.dark,'e'));
