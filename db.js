const DB = (()=>{
  const KEYS = {
    requests: 'tn_requests',
    donations: 'tn_donations',
    partners: 'tn_partners'
  };
  const read = (k)=>JSON.parse(localStorage.getItem(k)||'[]');
  const write = (k,v)=>localStorage.setItem(k, JSON.stringify(v));
  const uid = ()=>('TN'+Date.now().toString(36)+Math.random().toString(36).slice(2,7)).toUpperCase();

  function addRequest(data){
    const rec = { id: uid(), createdAt: new Date().toISOString(), status:'open', ...data };
    const items = read(KEYS.requests);
    items.unshift(rec); write(KEYS.requests, items);
    return rec;
  }
  function addDonation(data){
    const rec = { id: uid(), createdAt: new Date().toISOString(), ...data };
    const items = read(KEYS.donations);
    items.unshift(rec); write(KEYS.donations, items);
    return rec;
  }
  function listRequests(){ return read(KEYS.requests); }
  function listDonations(){ return read(KEYS.donations); }
  function updateRequest(id,patch){
    const items = read(KEYS.requests);
    const i = items.findIndex(r=>r.id===id);
    if(i>=0){ items[i] = {...items[i], ...patch}; write(KEYS.requests, items); return items[i]; }
    return null;
  }
  function exportCSV(){
    const reqs = listRequests();
    const dons = listDonations();
    function toCSV(rows){
      if(!rows.length) return '';
      const cols = Array.from(new Set(rows.flatMap(r=>Object.keys(r))));
      const header = cols.join(',');
      const body = rows.map(r=>cols.map(c=>JSON.stringify(r[c]??'')).join(',')).join('\n');
      return header+'\n'+body;
    }
    return {requests: toCSV(reqs), donations: toCSV(dons)};
  }

  return { addRequest, addDonation, listRequests, listDonations, updateRequest, exportCSV };
})();