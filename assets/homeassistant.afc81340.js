import{a2 as z,r as g,a8 as x,a as J,a3 as R,a9 as E}from"./index.b5beb44c.js";const w=[],$="KEY_MQTT_CONFIG",k=z("mqtt",()=>{const v=localStorage.getItem($);let c={url:"",username:"",password:""};if(v)try{c=JSON.parse(v)}catch{}const l=g(c),u=g({}),h=g([{label:"",children:[],selectable:!1,id:"__ROOT__"}]);x(()=>{h.value[0].label=l.value.url});function q(e,n){const t=e.split("/");let s=h.value[0],_=[];t.forEach((m,f)=>{const p=f===t.length-1;if(_.push(m),p&&m==="config"&&t[0]==="homeassistant"){const r=JSON.parse(u.value[e]);r.device.identifiers[0].startsWith("zigbee2mqtt")&&(s.parent.avatar="logos/zigbee2mqtt.png",s.parent.type="zigbee2mqtt",s.type="zigbee2mqtt"),s.parent.header="homeassistant-discovery",s.parent.label=`${r.device.name} - ${r.device.manufacturer} ${r.device.model} [${s.parent.labelPart}]`}if(p&&m==="config"&&t[0]==="tasmota"){const r=JSON.parse(u.value[e]);s.header="tasmota-discovery",s.body="tasmota-discovery",s.device=r}const C=s.children.find(r=>r.labelPart===m);if(C)s=C,p&&(s.selectable=p);else{const r={label:m,labelPart:m,children:[],selectable:p,id:_.join("/"),parent:s,type:s.type};r.id==="zigbee2mqtt"&&(r.avatar="logos/zigbee2mqtt.png",r.type="zigbee2mqtt"),r.id==="homeassistant"&&(r.avatar="logos/homeassistant.svg"),["tasmota","tele","cmnd","stat"].includes(r.id)&&(r.avatar="logos/tasmota.svg"),s.children.push(r),s.children.sort((j,D)=>j.label.localeCompare(D.label)),s=r}})}function N(e){const n=e.split("/");let t=h.value[0];n.forEach((s,_)=>{if(_===n.length-1)for(t.children=t.children.filter(f=>f.id!==e);t.parent;)t.children.length===0&&(t.parent.children=t.parent.children.filter(f=>f.id!==t.id)),t=t.parent;else{const f=t.children.find(p=>p.labelPart===s);f&&(t=f)}})}const b=g(!1),y=g(null);function T(){localStorage.setItem($,JSON.stringify(l.value)),window.mqtt.connect({url:l.value.url,username:l.value.username,password:l.value.password},(e,n)=>{if(e===null){Object.prototype.hasOwnProperty.call(n,"connected")&&(b.value=n.connected,b.value&&(y.value=null)),Object.prototype.hasOwnProperty.call(n,"error")&&(y.value=n.error,i());return}n?(u.value[e]=n,q(e)):(N(e),delete u.value[e]),w.forEach(t=>{e.match(t.topic)&&t.callback(e,n)})})}function O(e){return Object.keys(u.value).filter(n=>n.match(e))}function i(){window.mqtt.disconnect()}function a(e,n,t={}){window.mqtt.publish(e,n,t)}function o(e,n){const t={topic:e,callback:n};return w.push(t),t}function d(e){w.splice(w.indexOf(e),1)}const S=J(()=>O("zigbee2mqtt/").reduce((e,n)=>{const t=n.split("/").slice(0,2).join("/");return e.includes(t)||e.push(t),e},[]).length),P=J(()=>O("homeassistant/").reduce((e,n)=>{const t=n.split("/")[2];return e.includes(t)||e.push(t),e},[]).length);return{config:l,isConnected:b,topics:u,topicsTree:h,zigbee2mqttCount:S,homeassistantCount:P,error:y,connect:T,disconnect:i,publish:a,subscribe:o,unsubscribe:d,searchTopics:O}}),M=z("homeassistant",()=>{const v=k(),c=g([]);function l(i){const a=JSON.parse(JSON.stringify(i.config));return i.entities.map(o=>{const d=JSON.parse(JSON.stringify(o.config));return d.device=a,{topic:`homeassistant/${o.type}/${i.id}/${o.id}/config`,message:JSON.stringify(d,null,2)}})}function u(i){l(i).forEach(({topic:a,message:o})=>{v.publish(a,o,{retain:!0})})}function h(){c.value.forEach(u)}function q(i){const a=`0x${Math.random().toString(36).substring(2,15)}`,o={id:a,config:{identifiers:[`mqtt_${a}`],manufacturer:"",model:"",name:""},entities:[]};c.value.push(i||o)}function N(i,a){const o={type:"sensor",id:"temperature",config:{name:"",state_topic:"",state_class:"measurement",device_class:"temperature",unit_of_measurement:"\xB0C",value_template:`{% if value_json.temperature is defined %}
  {{ value_json.temperature }}
{% else %}
  {{ states(entity_id) }}
{% endif %}
`}};a.entities||(a.entities=[]),a.entities.push(i||o)}function b(i){c.value=[];const a={id:i,entities:[]};c.value.push(a),v.searchTopics(new RegExp(`homeassistant/.*/${i}/.*/config`)).forEach(o=>{const d=JSON.parse(v.topics[o]);a.config=d.device,delete d.device;const S=o.split("/");a.entities.push({type:S[1],id:S[3],config:d})}),R.push("/discovery-generator")}function y(){E.create({title:"Confirm",message:"Remove all devices and entities?",cancel:!0,persistent:!0}).onOk(()=>{c.value=[]})}function T(i){E.create({title:"Confirm",message:"Remove device and entities?",cancel:!0,persistent:!0}).onOk(()=>{c.value.splice(c.value.indexOf(i),1)})}function O(i,a){E.create({title:"Confirm",message:"Remove entity?",cancel:!0,persistent:!0}).onOk(()=>{i.entities.splice(i.entities.indexOf(a),1)})}return{devices:c,addDevice:q,addEntityToDevice:N,reverseEntity:b,removeAll:y,removeDevice:T,removeDeviceEntity:O,toDiscoveryEntries:l,publishDevice:u,publishAllDevices:h}});export{M as a,k as u};
