(this.webpackJsonppetition_app=this.webpackJsonppetition_app||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var i=n(1),a=n.n(i),c=n(8),s=n.n(c),r=(n(13),n(14),n(2)),o=n(7),l=n(5),u=n(0),d=function(e){var t=e.index,n=e.fieldInfo,i=e.setText;return"text_area"==n.inputType?Object(u.jsx)("textarea",{className:"form_text_area",cols:"30",rows:"10",placeholder:n.placeholder,value:n.value,onChange:function(e){return i(t,e.target.value)}}):Object(u.jsx)("input",{className:"form_text_input",type:n.inputType,placeholder:n.placeholder,value:n.value,onChange:function(e){return i(t,e.target.value)}})};d.defaultProps={placeholderText:"Type Something",isPassword:!1};var j=d,b=function(e){var t=e.formFields,n=e.submitBtnLabel,a=e.submitEvent,c=Object(i.useState)(t),s=Object(r.a)(c,2),d=s[0],b=s[1],p=function(e,t){var n=Object(l.a)(d);n[e]=Object(o.a)(Object(o.a)({},n[e]),{},{value:t}),b(n)};return Object(u.jsxs)("form",{onSubmit:function(e){e.preventDefault();var n=d.filter((function(e){return!e.isValid(e)}));if(n.length>0)alert("enter a ".concat(n[0].name));else{var i={};d.forEach((function(e){return i[e.name]=e.value})),a(i),b(t)}},className:"input_form",children:[d.map((function(e,t){return Object(u.jsx)(j,{index:t,fieldInfo:e,setText:p},t)})),Object(u.jsx)("input",{type:"submit",value:n,className:"form_submit_btn"})]})},p=function(e,t){var n=Object(i.useState)(null),a=Object(r.a)(n,2),c=a[0],s=a[1],o=Object(i.useState)(!0),u=Object(r.a)(o,2),d=u[0],j=u[1];Object(i.useEffect)((function(){b()}),[]);var b=function(){j(!0),fetch(e).then((function(e){return e.json()})).then((function(e){s(e),j(!1)}))};return[c,b,function(e){j(!0),fetch(t,{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(e)}).then((function(e){return e.json()})).then((function(e){console.log(e),s([].concat(Object(l.a)(c),[e])),j(!1)}))},d]};var h=function(e){var t=e.name,n=void 0===t?"name":t,i=e.inputType,a=void 0===i?"text":i,c=e.value,s=void 0===c?"":c,r=e.placeholder,o=void 0===r?null:r,l=e.isValid,u=void 0===l?null:l;this.name=n,this.value=s,this.placeholder=o||n,this.inputType=a,this.isValid=u||function(e){return console.log(e.name+": "+e.value),""!==e.value}},m=function(){var e=p("/api/get_users","/api/add_user"),t=Object(r.a)(e,4),n=t[0],i=(t[1],t[2]),a=t[3],c=[new h({name:"username"}),new h({name:"password",inputType:"password"})];return Object(u.jsxs)("section",{children:[Object(u.jsx)("h2",{children:"Users"}),Object(u.jsx)(b,{formFields:c,submitBtnLabel:"Add User",submitEvent:i}),Object(u.jsx)("div",{className:"loading_box",children:a&&Object(u.jsx)("p",{children:"Loading..."})}),Object(u.jsx)("ul",{children:n&&n.map((function(e){return Object(u.jsxs)("li",{children:[" ",Object(u.jsx)("strong",{children:"id:"})," ",e.id," ",Object(u.jsx)("strong",{children:"username:"})," ",e.name,">"]},e.id)}))})]})},x=function(){var e=p("/api/get_petitions","/api/add_petition"),t=Object(r.a)(e,4),n=t[0],i=(t[1],t[2]),a=t[3],c=[new h({name:"text",inputType:"text_area",placeholder:"petition text..."}),new h({name:"email_domain",placeholder:"email domain"}),new h({name:"max_users",inputType:"number",placeholder:"max users for this petition"})];return Object(u.jsxs)("section",{children:[Object(u.jsx)("h2",{children:"Petitions"}),Object(u.jsx)(b,{formFields:c,submitBtnLabel:"Add Petition",submitEvent:i}),Object(u.jsx)("div",{className:"loading_box",children:a&&Object(u.jsx)("p",{children:"Loading..."})}),Object(u.jsx)("ul",{children:n&&n.map((function(e){return Object(u.jsxs)("li",{children:[Object(u.jsx)("strong",{children:"id:"})," ",e.id,Object(u.jsx)("br",{}),Object(u.jsx)("strong",{children:"email_domain:"})," ",e.email_domain,Object(u.jsx)("br",{}),Object(u.jsx)("strong",{children:"max_users:"})," ",e.max_users,Object(u.jsx)("br",{}),Object(u.jsx)("strong",{children:"text:"})," ",e.text]},e.id)}))})]})},f=function(){return Object(u.jsxs)("div",{className:"App",children:[Object(u.jsx)("h1",{children:"Petition App Debug UI"}),Object(u.jsx)(x,{}),Object(u.jsx)(m,{})]})},O=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(t){var n=t.getCLS,i=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),i(e),a(e),c(e),s(e)}))};s.a.render(Object(u.jsx)(a.a.StrictMode,{children:Object(u.jsx)(f,{})}),document.getElementById("root")),O()}},[[16,1,2]]]);
//# sourceMappingURL=main.a3cf4fe5.chunk.js.map