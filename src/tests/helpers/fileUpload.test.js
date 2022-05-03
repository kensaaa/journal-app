const cloudinary = require('cloudinary')
import {fileUpload} from "../../helpers/fileUpload"

cloudinary.config({ 
// lo sacamos de nuestro dashboard
  cloud_name: 'df8kdhurj', 
  api_key: '135166956449747', 
  api_secret: 'YAzlpSw4fq2C3ndm0ZqamK732tI',
});

describe('Prueba en fileUpload', () => {

    test('debe de cargar un archivo y retornar el url', async( done ) => {

        const resp = await fetch('https://imagekit.androidphoria.com/wp-content/uploads/como-buscar-una-imagen-en-facebook-con-una-foto.jpg')
        const blob = await resp.blob()
        
        const file = new File([blob],'foto.png')
        const url = await fileUpload(file)

        expect(typeof url).toBe('string')
        //cada vez que corro esta prueba se crea en cloudinary,
        //para hacer una limpieza de la imagen creada por el test
        //
        //borrar img por id
        const segments = url.split('/')
        const imageId = segments[ segments.length -1 ].replace('.png','')
        cloudinary.v2.api.delete_resources(imageId, {}, () => {
            done()
        });

    })


    test('debe de retornar un error', async() => {

        
        const file = new File([],'foto.png')
        const url = await fileUpload(file)

        expect( url).toBe(null)

    })
})
