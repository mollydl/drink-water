function setLoacl({key='', val='', isObj=true}){
  const newVal = isObj ? JSON.stringify(val) : val
  localStorage.setItem(key, newVal)
}
function getLoacl({key='', isObj=true}){
  const val = localStorage.getItem(key)
  const newVal = isObj ? JSON.parse(val) : val
  return newVal
}
function delLoacl(key=''){
  localStorage.removeItem(key)
}
