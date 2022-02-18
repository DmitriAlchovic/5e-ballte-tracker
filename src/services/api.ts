
 class Service {

_apiBase = "https://www.dnd5eapi.co/api/";

 async getResource(url:string)  {
     const res :Response= await fetch(`${this._apiBase}${url}`);

     if(!res.ok) {
         throw new Error ("Could not fetch"+`${res.status}`)
     } 



 return await (res.json()); 
}

 async getMonstersList() {
    const res= await this.getResource(`/monsters/`);
    return (res.results);
} 
/* async getMonstersList() {
    const res= await axios.get(`${this._apiBase}/monsters/`) 
   console.log(res.data.results.results);
    
    return await (res);
} */
getMonster (index:string){
    return this.getResource(`/monsters/${index}`);
}



}
export default (new Service);