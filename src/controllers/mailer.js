const axios = require('axios');

function postSuscriptorVenta(req, res) {
    try{
        console.log("LLEGUE !!!!")
        const { id_group, email, phone, name, lastName, address } = req.body;
    
        const data = {
            email,
            fields:{
                phone,
                city: address
            },
            name,
            lastName,
            type: 'active',
            resubscribe: false, 
            autoresponders: true,
        }

        let config = {
            headers: {
                Accept: 'application/json',
                'X-MailerLite-ApiDocs': 'true',
                'Content-Type': 'application/json',
                'X-MailerLite-ApiKey': '741b2851dc3b0d51041e5c338ec52378'
            }
        }

        axios.post(`https://api.mailerlite.com/api/v2/groups/${id_group}/subscribers`, JSON.stringify(data), config)
        .then(response => {
            console.log(response);
            return res.status(200).json({
                ok:true,
                message:'Cliente agregado correctamente'
            });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                ok:false,
                message: err
            });
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            ok:false,
            message: err
        });
    }
}

module.exports = {
    postSuscriptorVenta,
}