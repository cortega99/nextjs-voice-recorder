export async function POST(request) {
    try {
        console.log('entering api route...');
        const formData = await request.formData();
        const file = formData.get('file');
        if (!file) {
            console.log('no file found in server....');
            return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
        }
        console.log('Before making the request to the microservice...');
        console.log('File:', file);
        const data = new FormData();
        data.append('file', file, 'audio.wav');
        console.log(data);
        const microResponse = await fetch('http://localhost:5000/api/convert-to-text', {
          method: 'POST',
          body: data,
        });

        console.log('Microservice Response:', microResponse);
    
        if (microResponse.ok) {
            console.log('respuesta ok');
            const result = await microResponse.json();
            return Response.json(result);
        } else {
            console.log('error en respuesta');
            // Handle any errors that the microservice responds with
            const errorResult = await microResponse.text();
            return Response.json({ message: errorResult });
        }
    } catch (error) {
        // Catch any errors that occur during the fetch request
        return Response.json({ message: error.message });
    }
}
