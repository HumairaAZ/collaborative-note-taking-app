"use strict";(self.webpackChunkcollaborative_note_taking_app=self.webpackChunkcollaborative_note_taking_app||[]).push([[175],{175:(e,t,n)=>{n.r(t),n.d(t,{default:()=>m});var a=n(4848),o=n(6540),i=n(7606),r=n(3182),c=n(5834),s=n(8419),l=n(2460),p=n(6746),d=n(7315),u=n(944);n(1392);u.A.apps.length||u.A.initializeApp({apiKey:"AIzaSyCs1dXhSoIe9fretf-Tn38XSbsSGyzDxes",authDomain:"collaborative-note-taking-app1.firebaseapp.com",projectId:"collaborative-note-taking-app1",storageBucket:"collaborative-note-taking-app1.appspot.com",messagingSenderId:"504934917091",appId:"1:504934917091:web:87056f4980cbcba5f7f6d6",measurementId:"G-R34PEFWXXR"});const f=u.A.firestore();var v=function(){return v=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},v.apply(this,arguments)};const m=function(){var e=(0,o.useState)([]),t=e[0],n=e[1],m=(0,o.useState)(!0),h=m[0],A=m[1];return(0,o.useEffect)((function(){var e=f.collection("notes").orderBy("timestamp","asc").onSnapshot((function(e){var t=e.docs.map((function(e){return{id:e.id,content:e.data().content||""}}));n(t),A(!1)}));return function(){return e()}}),[]),(0,a.jsxs)(i.A,v({container:!0,spacing:2},{children:[h&&(0,a.jsx)(r.A,{}),t.map((function(e){return(0,a.jsx)(c.A,v({in:!h},{children:(0,a.jsxs)(i.A,v({item:!0,xs:12,sm:6,md:4},{children:[(0,a.jsx)(s.A,{fullWidth:!0,variant:"outlined",value:e.content,onChange:function(t){return n=e.id,a=t.target.value,void f.collection("notes").doc(n).update({content:a});var n,a}}),(0,a.jsx)(l.A,v({"aria-label":"delete",onClick:function(){return t=e.id,void f.collection("notes").doc(t).delete();var t}},{children:(0,a.jsx)(d.A,{})}))]}))}),e.id)})),(0,a.jsx)(i.A,v({item:!0,xs:12},{children:(0,a.jsx)(p.A,v({variant:"contained",color:"primary",onClick:function(){f.collection("notes").add({content:"",timestamp:u.A.firestore.FieldValue.serverTimestamp()})}},{children:"Add Note"}))}))]}))}}}]);