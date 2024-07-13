import{a as ee}from"./app-D9qsDB_S.js";import{a as te}from"./analyze-dM62DaH1.js";function k(i,s,t,c,b,p,v,r=0){const l=Math.round(i/s);let d=[],o=[],L=[],T=[],M=[];for(let e=0;e<l+1;e++){const y=e*s,O=(v-p)/i,u=p+O*y;d.push([r+y,0,u])}for(let e=0;e<l+1;e++){const y=e*s,O=(b-c)/i,u=c+O*y,n=(v-p)/i,g=p+n*y;d.push([r+y,0,g+u]),L.push(d.length-1)}if(t===1)for(let e=0;e<l;e++)o.push([e,e+1],[l+1+e,l+1+e+1],[e,l+1+e],[e,l+1+e+1]),T.push(o.length-3,o.length-4),M.push(o.length-1,o.length-2);if(t===2)for(let e=0;e<l;e++)o.push([e,e+1],[l+1+e,l+1+e+1],[e,l+1+e],[e+1,l+1+e]),T.push(o.length-3,o.length-4),M.push(o.length-1,o.length-2);if(t===3)for(let e=0;e<l;e++)o.push([e,e+1],[l+1+e,l+1+e+1],[e,l+1+e],[e,l+1+e+1],[e+1,l+1+e]),T.push(o.length-4,o.length-5),M.push(o.length-1,o.length-2,o.length-3);return o.push([l,2*l+1]),M.push(o.length-1),{nodes:d,elements:o,topNodesIndices:L,chordsIndices:T,websIndices:M}}const se={span:{value:20,min:1,max:25,label:"Span (m)",folder:"Geometry"},spacing:{value:2.5,min:1,max:5,label:"Spacing (m)",folder:"Geometry"},webType:{value:1,min:1,max:3,step:1,label:"Web type",folder:"Geometry"},trimType:{value:1,min:1,max:3,step:1,label:"Trim type",folder:"Geometry"},leftHeight:{value:2.5,min:1,max:10,step:.1,label:"Left height (m)",folder:"Geometry"},midHeight:{value:2.5,min:1,max:10,step:.1,label:"Mid height (m)",folder:"Geometry"},rightHeight:{value:2.5,min:1,max:10,step:.1,label:"Right height (m)",folder:"Geometry"},leftOffset:{value:0,min:0,max:10,step:.1,label:"Left offset (m)",folder:"Geometry"},midOffset:{value:5,min:0,max:10,step:.1,label:"Mid offset (m)",folder:"Geometry"},rightOffset:{value:0,min:0,max:10,step:.1,label:"Right offset (m)",folder:"Geometry"},supportType:{value:1,min:1,max:2,step:1,label:"Support type",folder:"Supports"},uniformLoad:{value:300,min:0,max:1e3,step:1,label:"Uniform load (KN/m)",folder:"Loads"},chordsArea:{value:50,min:1,max:100,step:1,label:"Chords area (cm2)",folder:"Sections & Materials"},chordsElasticity:{value:10,min:1,max:250,step:1,label:"Chords elasticity (gpa)",folder:"Sections & Materials"},websArea:{value:50,min:1,max:100,step:1,label:"Webs area (cm2)",folder:"Sections & Materials"},websElasticity:{value:10,min:1,max:250,step:1,label:"Webs elasticity (gpa)",folder:"Sections & Materials"}},le=i=>{let s=i.span.value,t=i.spacing.value;const c=i.webType.value,b=i.trimType.value,p=i.leftHeight.value,v=i.midHeight.value,r=i.rightHeight.value,l=i.leftOffset.value,d=i.midOffset.value,o=i.rightOffset.value,L=i.supportType.value,T=i.uniformLoad.value,M=i.chordsArea.value*1e-4,e=i.chordsElasticity.value*1e6,y=i.websArea.value*1e-4,O=i.websElasticity.value*1e6;let u=[],n=[],g=[],E=[],m=[],x=[];if(t=s/Math.round(s/t),Math.abs(v-.5*(p+r))>.3||Math.abs(d-.5*(l+o))>.3){s=s/2,t=s/Math.round(s/t);const a=Math.round((s-2*t)/t),h=b>=2&&a>=1,f=(p-v)/s,C=p-f*t,S=(l-d)/s,z=l-S*t,{nodes:w,elements:K,topNodesIndices:P,chordsIndices:V,websIndices:X}=k(h?s-t:s,t,c,h?C:p,v,h?z:l,d,h?t:0);u.push(...w),n.push(...K),E.push(...P),m.push(...V),x.push(...X);const B=(v-r)/s,F=(d-o)/s;let U=c;c===1&&(U=2),c===2&&(U=1);const{nodes:D,elements:Y,topNodesIndices:Z,chordsIndices:_,websIndices:$}=k(h?s-2*t:s-t,t,U,v-B*t,h?r+B*t:r,d-F*t,h?o+F*t:o,s+t);if(m.push(...q(_,n.length)),x.push(...q($,n.length)),n.push(...ne(Y,u.length)),E.push(...q(Z,u.length)),u.push(...D),h){u.push([0,0,b==3?p+l:l],[2*s,0,b==3?r+o:o]),E.push(u.length-2,u.length-1);const H=(a+1+1)*2,J=(a+1)*2,j=H+J;n.push([0,j],[a+2,j],[H+a,j+1],[H+J-1,j+1]),m.push(n.length-1,n.length-2,n.length-3,n.length-4)}const R=Math.round(h?(s-1*t)/t:s/t),G=R,W=(R+1)*2,N=(R+1)*2-1,A=N+R+1;if(c===1&&(n.push([G,W],[N,A],[N,W]),m.push(n.length-3,n.length-2),x.push(n.length-1)),c===2&&(n.push([G,W],[N,A],[G,A]),m.push(n.length-3,n.length-2),x.push(n.length-1)),c===3&&(n.push([G,W],[N,A],[G,A],[N,W]),m.push(n.length-4,n.length-3),x.push(n.length-2,n.length-1)),h){const H=w.length+D.length;g.push(H,H+1)}else L===1?g.push(0,w.length+D.length/2-1):g.push(w.length/2,w.length+D.length-1)}else{const a=Math.round((s-2*t)/t),h=b>=2&&a>=1,f=(p-r)/s,C=(l-o)/s,{nodes:S,elements:z,topNodesIndices:w,chordsIndices:K,websIndices:P}=k(h?s-2*t:s,t,c,h?p-f*t:p,h?r+f*t:r,h?l-C*t:l,h?o+C*t:o,h?t:0);u.push(...S),n.push(...z),E.push(...w),m.push(...K),x.push(...P),h&&(u.push([0,0,b==3?p+l:l],[s,0,b==3?r+o:o]),E.push(u.length-2,u.length-1),n.push([0,(a+1)*2],[a+1,(a+1)*2],[a,(a+1)*2+1],[a*2+1,(a+1)*2+1]),m.push(n.length-1,n.length-2,n.length-3,n.length-4)),h?g.push(S.length,S.length+1):L===1?g.push(0,S.length/2-1):g.push(S.length/2,S.length-1)}const I={materials:new Map,sections:new Map,pointSupports:new Map,pointLoads:new Map};g.forEach(a=>{var h;return(h=I.pointSupports)==null?void 0:h.set(a,[!0,!0,!0,!0,!0,!0])}),E.forEach(a=>{var h;return(h=I.pointLoads)==null?void 0:h.set(a,[0,0,-T*t,0,0,0])}),m.forEach(a=>{var h,f;(h=I.materials)==null||h.set(a,{elasticity:e}),(f=I.sections)==null||f.set(a,{area:M})}),x.forEach(a=>{var h,f;(h=I.materials)==null||h.set(a,{elasticity:y}),(f=I.sections)==null||f.set(a,{area:O})});const Q=te(u,n,I);return{nodes:u,elements:n,analysisInputs:I,analysisOutputs:Q}},ne=(i,s)=>i.map(([t,c])=>[t+s,c+s]),q=(i,s)=>i.map(t=>t+s);ee({parameters:se,onParameterChange:le,settings:{deformedShape:!0,loads:!1}});
