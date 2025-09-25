const $ = (sel, root=document)=>root.querySelector(sel);
const $$ = (sel, root=document)=>Array.from(root.querySelectorAll(sel));

function toast(msg, cls='notice'){
  const el = document.createElement('div');
  el.className = cls; el.textContent = msg;
  const wrap = $('.container') || document.body;
  wrap.prepend(el);
  setTimeout(()=>el.remove(), 3500);
}

function registerPWA(){
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('service-worker.js');
  }
}

function formatCurrency(v){
  const n = Number(v||0);
  return isNaN(n) ? '$0.00' : n.toLocaleString(undefined,{style:'currency',currency:'USD'});
}

function createReceipt(data){
  const lines = [
    'TRUE NORTH v2.2 RECEIPT',
    'ID: '+data.id,
    'Date: '+new Date(data.createdAt).toLocaleString(),
    'Item: '+data.item,
    'Quantity: '+data.quantity,
    'Fair Market Value (ea): '+formatCurrency(data.fmv),
    'Total Value: '+formatCurrency((Number(data.fmv)||0)*(Number(data.quantity)||0)),
    data.donorName ? 'Donor: '+data.donorName : '',
  ].filter(Boolean).join('\n');
  return lines;
}

function downloadText(filename, text){
  const blob = new Blob([text], {type:'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', registerPWA);