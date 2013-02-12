
module.exports.parse = function fn(str){
  var o = {},c='',v='',k='',i,state='key';
  if(!str) return o;
  for(i=0;i<str.length;i++){
    c = str[i];
    if(c === '&') {
      if(k !== '') {
        if(o[k]){
          if(!hasOwnProperty(o,k)) o[k] = [];
          if(Array.isArray(o[k])) o[k].push(v);
          else o[k] = [o[k],v];
        } else {
          o[k] = v;
        }
      }
      k = '';
      v = '';
      state = 'key';
      continue;  
    } else if(c === "=" && state != 'value'){
      state = 'value';
      continue;
    } else if(c === "+"){
      c = " ";
    } if(c === '%'){
      if(i+2 < str.length){
        c = String.fromCharCode(parseInt(str[++i]+str[++i],16));
      }
    }
    if(state === 'key'){
      k += c;
    } else {
      v += c;
    }	
  }

  if(state === 'value'){
    o[k] = v;
  }

  return o;
};

module.exports.stringify = function(){
  throw "not implemented";
}

module.exports.escape = function fn(v){
  throw "not implemented";
}

module.exports.unescape = function fn(v){
  var out = '',i,c;
  for(i=0;i<v.length;++i){
    c = v[i];
    if(c === '+') {
      out += ' ';
    }else if(c === '%' && i+2<v.length) {
      out += String.fromCharCode(parseInt(v[++i]+v[++i],16));
    } else{
      out += v[i];
    }
  }
  return out;
}

module.exports.escape = encodeURIComponent

function hasOwnProperty(obj,v){
  return Object.prototype.hasOwnProperty.call(obj,v)
}

