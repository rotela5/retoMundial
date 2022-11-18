const { Router } = require('express');
const { Equipo,Seguidor } = require('../db.js');

const {API_KEY}=process.env;
const axios = require('axios')

const router = Router();


const getApiInfo = async () =>{
    const apiUrl = await axios.get(`https://api.cup2022.ir/api/v1/user=${API_KEY}`);
    const apiInfo = await apiUrl.data.map(el =>{
        return {
            id:el.id,
            name_en: el.name_en,
            name_fa: el.name_fa,
            flag:el.flag,
            iso2:el.ise2,
            grupo:el.grupo,
            
            golesEncontra: el.golesEncontra,
            seguidor:el.seguidor,
        };
    });
    return apiInfo;
};


/*const getDBInfo = async () => {
    return await Raza.findAll({
       include:{
           model: Seguidor,
           attributes: ['name'], //no me traigo Id porque viene con "name"
           through:{
               attributes:[],
           },
       } 
    })
};*/

const getAllEquipo = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDBInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

router.get('/equipo', async (req, res) => {
    const {name} = req.query;
    let equipoTotal = await getAllEquipo();
    if(name){
        let equipoName = await equipoTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        equipoName.length ?  //pregunto si se encontro un name
        res.status(200).send(equipoName) : 
        res.status(404).send('no se encontr el equipo!');
    }else{  //sino hubo un query
        res.status(200).send(equipoTotal); //manda todo
     }
});
  router.get('/equipo/:id', async (req, res) =>{
    const id = req.params.id;
    const equipoTotal = await getAllEquipo()
    if(id){
        let equipoId = await equipoTotal.filter(el => el.id ==id)
        equipoId.length?
        res.status(200).json(equipoId) :
        res.status(400).send('no se encontro equipo');
    }
});




module.exports = router;
