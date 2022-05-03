export const fileUpload = async(file) => {
    	
    const cloudUrl = `https://api.cloudinary.com/v1_1/df8kdhurj/upload`

    //tenemos que crear body/form-data
    const formData = new FormData()
    //agregar datos de file y upload_preset
    formData.append('upload_preset', 'react-journal')
    formData.append('file', file)

    //esto es muy probable que falle
    try {
        //por defecto esto es un get, quiero que sea un post, el segundo argumento 
        //es la configuracion del fetch
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        })

        if  (resp.ok){
            const cloudResp = await resp.json()
            return cloudResp.secure_url
        } else {
            return null
        }
        
    } catch (error) {
        throw error
    }

}
